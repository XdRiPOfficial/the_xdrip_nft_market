import React, { useState, useEffect, useContext, useRef } from "react";
import { Loader } from "../../components/componentsindex";
import Style from "./BigNFTSlider.module.css";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";
import images from "../../img";
import Image from "next/image";
import ReactPlayer from "react-player";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Link from "next/link";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import { getUserProfile, getCollectionName } from "../../firebase/services";

const BigNFTSlider = () => {
  const [fileTypes, setFileTypes] = useState({});
  const [loading, setLoading] = useState(true);
  const { fetchNFTs, setError } = useContext(NFTMarketplaceContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nfts, setNfts] = useState([]);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [profilePic, setProfilePic] = useState(null);
  const [collectionName, setCollectionName] = useState(null);




  useEffect(() => {
    const fetchCollectionName = async () => {
      try {
        const tokenData = await getCollectionName(nfts[currentIndex].tokenId);
        setCollectionName(tokenData);
      } catch (error) {
        setError("Please reload the browser", error);
      }
    };

    fetchCollectionName();
  }, [nfts, currentIndex]);





  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex + 1 < nfts.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 10000); // Change slide every 10 seconds

    return () => clearInterval(interval);
  }, [currentIndex, nfts.length]);





  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchNFTs();
        setNfts(items.reverse());
      } catch (error) {
        setError("Please reload the browser", error);
      }
    };
    fetchData();
  }, []);






  useEffect(() => {
    const fetchFileTypes = async () => {
      let fileTypesObj = {};

      const savedData = localStorage.getItem("fileTypesObj");
      if (savedData) {
        fileTypesObj = JSON.parse(savedData);
      }

      for (const el of nfts) {
        if (!fileTypesObj[el.image]) {
          try {
            const response = await fetch(el.image);
            const contentType = response.headers.get("content-type");
            fileTypesObj[el.image] = contentType;
          } catch (error) {
            console.log(error);
          }
        }
      }

      localStorage.setItem("fileTypesObj", JSON.stringify(fileTypesObj));

      setFileTypes(fileTypesObj);
      setLoading(false);
    };

    fetchFileTypes();
  }, [nfts]);





  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const userProfile = await getUserProfile(nfts[currentIndex].seller);
        if (userProfile && userProfile.profilePictureUrl) {
          setProfilePic(userProfile.profilePictureUrl);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfilePic();
  }, [nfts, currentIndex]);





  const RenderDefault = () => (
    <Image
      src={images.invalidImage}
      alt="NFT"
      /*fill="true"*/
      objectFit="cover"
      className={Style.bigNFTSlider_box_img_img}
      controls
    />
  );

  const RenderMedia = ({ el }) => {
    const fileType = fileTypes[el.image];
    const isImage = fileType && fileType.startsWith("image");
    const isAudio = fileType && fileType.startsWith("audio");
    const isVideo = fileType && fileType.startsWith("video");





    return (
      <LazyLoadComponent>
        {isImage ? (
          <LazyLoadImage
            src={el.image}
            alt="NFT"
            /*fill="true"*/
            objectFit="cover"
            effect="blur"
            className={Style.bigNFTSlider_box_img_img}
          />
        ) : isAudio ? (
          <div className={Style.bigNFTSlider_box_audio}>
            <div className={Style.bigNFTSlider_box_img}>
              <Image
                src={images.audio_image2}
                alt="Default"
                width="760"
                height="450"
                objectFit="cover"
                className={Style.bigNFTSlider_box_img_img}
              />
              <div className={Style.bigNFTSlider_box_audio_controls_wrapper}>
                <audio
                  src={el.image}
                  ref={audioRef}
                  className={Style.bigNFTSlider_box_audio}
                  muted={muted}
                />
                <button onClick={togglePlay} className={Style.audioControlButton}>
                  {isPlaying ? (
                    <Image
                      src={images.play}
                      width={175}
                      height={175}
                      alt="Pause"
                    />
                  ) : (
                    <Image
                      src={images.playW}
                      width={175}
                      height={175}
                      alt="Play"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : isVideo ? (
          <div className={Style.bigNFTSlider_box_img_rp_wrapper}>
            <ReactPlayer
              url={el.image}
              playing={true}
              muted={muted}
              width="100%" /*"765px"*/
              height="100%" /*"700px"*/
              className={Style.bigNFTSlider_box_img_rp}
            />
            <div className={Style.bigNFTSlider_box_video_controls_wrapper}>
              <button onClick={handleToggleMute} className={Style.videoControlButton}>
                {muted ? (
                  <Image
                    src={images.unmute}
                    width={25}
                    height={25}
                    alt="Pause"
                  />
                ) : (
                  <Image
                    src={images.mute}
                    width={25}
                    height={25}
                    alt="Play"
                  />
                )}
              </button>
            </div>
          </div>
        ) : (
          <div>{ }</div>
        )}
      </LazyLoadComponent>
    );
  };

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = () => {
    setMuted(!muted);
  };

  const renderFilePreview = (el) => {
    const fileType = fileTypes[el.image];

    return fileType ? <RenderMedia el={el} /> : <RenderDefault />;
  };

  const inc = () => {
    if (currentIndex + 1 < nfts.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const dec = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(nfts.length - 1);
    }
  };

  return (
    <div className={Style.bigNFTSlider}>
      {nfts.length > 0 && (
        <div
          key={`${nfts[currentIndex].tokenId}-${currentIndex}`}
          className={Style.bigNFTSlider_box}
        >
          <div className={Style.bigNFTSlider_box_left}>
            <div className={Style.bigNFTSlider_box_left_id}>
              <p>TOKEN ID #{nfts[currentIndex].tokenId}</p>
            </div>
            <div className={Style.bigNFTSlider_box_left_name}>
              <h2>{nfts[currentIndex].name}</h2>
            </div>
            <div className={Style.bigNFTSlider_box_left_creator}>
              <div className={Style.bigNFTSlider_box_left_creator_profile}>
                <div className={Style.bigNFTSlider_box_left_creator_profile_info}>
                  <p>SELLER ID</p>
                  <div className={Style.bigNFTSlider_box_left_creator_profile_info_img_wrapper}>
                    <img
                      src={profilePic}
                      alt="Profile Pic"
                      width={50}
                      height={50}
                      className={Style.bigNFTSlider_box_left_creator_profile_img}
                    />
                  </div>
                </div>
                <div className={Style.bigNFTSlider_box_left_creator_profile_info_middle}>
                  <p>CATEGORY</p>
                  <h4>{nfts[currentIndex].category}</h4>
                </div>
                <div className={Style.bigNFTSlider_box_left_creator_profile_info_right}>
                  <p>COLLECTION</p>
                  <h4>{collectionName || "N/A"}</h4>
                </div>

              </div>
            </div>

            <div className={Style.bigNFTSlider_box_left_bidding}>
              <div className={Style.bigNFTSlider_box_left_bidding_box}>
                <small>CURRENT PRICE:</small>
                <p>{parseFloat(nfts[currentIndex].price) * 10 ** 9} BNB</p>
              </div>
              <div className={Style.bigNFTSlider_box_left_bidding_box_auction}>
                <p>DESCRIPTION:</p>
              </div>
              <div className={Style.description}>
                <p>{nfts[currentIndex].description}</p>
              </div>
              <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
                <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                  <p></p>
                  <span></span>
                </div>
                <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                  <p></p>
                  <span></span>
                </div>
              </div>
              <div className={Style.bigNFTSlider_box_left_button}>
                <div className={Style.sliderCard_box_price_box_btn_btn}>
                  <Link
                    href={{ pathname: "/NFTDetails", query: nfts[currentIndex] }}
                    key={`${nfts[currentIndex].tokenId}`}
                  >
                    <button className={Style.detailsButton}>NFT DETAILS</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={Style.bigNFTSlider_box_right}>
            <div className={Style.bigNFTSlider_box_right_box}>
              {renderFilePreview(nfts[currentIndex])}

              <div className={Style.sliderBtnContainer}>
                <button
                  className={Style.bigNFTSlider_box_left_sliderBtn_icon}
                  onClick={dec}
                >
                  <Image
                    src={images.left_arrow}
                    width={25}
                    height={25}
                    alt="Previous"
                  />
                </button>
                <button
                  className={Style.bigNFTSlider_box_left_sliderBtn_icon}
                  onClick={inc}
                >
                  <Image
                    src={images.right_arrow}
                    width={25}
                    height={25}
                    alt="Next"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BigNFTSlider;
