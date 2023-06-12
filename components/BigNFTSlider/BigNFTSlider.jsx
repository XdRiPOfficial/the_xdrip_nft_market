import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import Style from "./BigNFTSlider.module.css";
import images from "../../img";
import Button from "../Button/Button";
import Link from "next/link";
import ReactPlayer from "react-player";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const mp3Image = "/mp3.jpg";

const BigNFTSlider = () => {
  const { fetchNFTS, setError } = useContext(NFTMarketplaceContext);
  const [nfts, setNFTs] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [fileTypes, setFileTypes] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchNFTS();
        setNFTs(items.reverse());
        setCurrentItemIndex(0);
      } catch (error) {
        setError("Please reload the browser", error);
      }
    };

    fetchData();
  }, [fetchNFTS, setError]);

  useEffect(() => {
    const fetchFileTypes = async () => {
      let fileTypesObj = {};

      const savedData = localStorage.getItem("fileTypesObj");
      if (savedData) {
        fileTypesObj = JSON.parse(savedData);
      }

      const newFileTypesObj = await nfts.reduce(async (acc, el) => {
        const response = await fetch(el.image);
        const contentType = response.headers.get("content-type");
        return { ...(await acc), [el.image]: contentType };
      }, Promise.resolve(fileTypesObj));

      localStorage.setItem("fileTypesObj", JSON.stringify(newFileTypesObj));
      setFileTypes(newFileTypesObj);
    };

    fetchFileTypes();
  }, [nfts, setFileTypes]);

  const renderFilePreview = (nft) => {
    if (!nft || !nft.image) {
      return (
        <Image
          src={images.invalidImage}
          alt="NFT"
          width={350}
          height={300}
          objectFit="cover"
          className={Style.NFTCard_box_img_img}
          controls
        />
      );
    }
  
    const fileType = fileTypes[nft.image];
  
    const RenderDefault = () => (
      <Image
        src={images.invalidImage}
        alt="NFT"
        width={350}
        height={300}
        objectFit="cover"
        className={Style.NFTCard_box_img_img}
        controls
      />
    );
  
    const RenderMedia = ({ src }) => {
      const isImage = fileType && fileType.startsWith("image");
      const isAudio = fileType && fileType.startsWith("audio");
  
      return (
        <LazyLoadImage
          src={src}
          alt="NFT"
          width={350}
          height={300}
          effect="blur"
          className={Style.NFTCardTwo_box_img_img}
          placeholderSrc={images.placeholderImage}
        />
      );
    };
  
    return fileType ? <RenderMedia src={nft.image} /> : <RenderDefault />;
  };
  

  const handleNext = () => {
    setCurrentItemIndex((prevIndex) => (prevIndex + 1) % nfts.length);
  };

  const handlePrevious = () => {
    setCurrentItemIndex((prevIndex) =>
      prevIndex === 0 ? nfts.length - 1 : prevIndex - 1
    );
  };

  const currentNFT = nfts[currentItemIndex];

  return (
    <div className={Style.bigNFTSlider}>
      <div className={Style.bigNFTSlider_box}>
        <div className={Style.bigNFTSlider_box_left}>
          <h2>{currentNFT?.name}</h2>
          <div className={Style.bigNFTSlider_box_left_creator}>
            <div className={Style.bigNFTSlider_box_left_creator_profile}>
              {renderFilePreview(currentNFT)}
              <div className={Style.bigNFTSlider_box_left_creator_profile_info}>
                <p>CREATOR</p>
                <h4>
                  {currentNFT?.name}{" "}
                  <span>
                    <MdVerified />
                  </span>
                </h4>
              </div>
            </div>
            <div className={Style.bigNFTSlider_box_left_creator_collection}>
              <Image
                src={images.xm2}
                alt="Logo"
                width={50}
                height={50}
                className={Style.bigNFTSlider_box_left_creator_collection_icon}
              />
              <div className={Style.bigNFTSlider_box_left_creator_collection_info}>
                <p>COLLECTION</p>
                <h4>{currentNFT?.collection}</h4>
              </div>
            </div>
          </div>
          <div className={Style.bigNFTSlider_box_left_bidding}>
            <div className={Style.bigNFTSlider_box_left_bidding_box}>
              <small>CURRENT PRICE</small>
              <p>{currentNFT?.price}</p>
            </div>
            <div className={Style.bigNFTSlider_box_left_bidding_box_auction}>
              {currentNFT?.description}
            </div>
            <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
              <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                <p>{currentNFT?.inventory}</p>
                <span>TOTAL FORGED</span>
              </div>
              <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                <p>{currentNFT?.inventory}</p>
                <span>TOTAL AVAILABLE</span>
              </div>
            </div>
            <div className={Style.bigNFTSlider_box_left_button}>
              <Button
                btnName="BUY"
                handleClick={() =>
                  mint(currentNFT?.title, currentNFT?.ipfsHash)
                }
              />
              <div className={Style.sliderCard_box_price_box_btn_btn}>
                <Link
                  href={{ pathname: "/NFTDetails", query: currentNFT }}
                  key={`${currentNFT?.tokenId}`}
                >
                  <button className={Style.detailsButton}>DETAILS</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={Style.bigNFTSlider_box_right}>
          <div className={Style.bigNFTSlider_box_right_box}>
            {renderFilePreview(currentNFT)}
            <div className={Style.sliderBtnContainer}>
              <button className={Style.sliderBtn} onClick={handlePrevious}>
                Prev
              </button>
              <button className={Style.sliderBtn} onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigNFTSlider;
