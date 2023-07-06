
import React, { useState, useEffect, useCallback } from "react";
import Style from "./AuthorNFTCard.module.css";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";
import images from "../../img";
import Image from "next/image";
import {
  doc,
  updateDoc,
  getFirestore,
  getDoc,
  setDoc,
} from "firebase/firestore";
import ReactPlayer from "react-player";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useAddress } from "@thirdweb-dev/react";
import Link from "next/link";

const AuthorNFTCard = ({ NFTData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;
  const [fileTypes, setFileTypes] = useState({});
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(() => {
    if (typeof window !== "undefined") {
      const savedLikes = localStorage.getItem("nftLikes");
      return savedLikes ? JSON.parse(savedLikes) : {};
    }
    return {};
  });

  const firestore = getFirestore();
  const walletAddress = useAddress();

  useEffect(() => {
    const fetchLikesAndRatings = async () => {
      try {
        let likesObj = {};
        const promises = NFTData.map((el) => {
          console.log("tokenId:", el.tokenId); // Log the tokenId
          const tokenId = el.tokenId.toString(); // Convert tokenId to string
          const nftRef = doc(firestore, "likes", tokenId);
          return getDoc(nftRef);
        });
        const snapshots = await Promise.all(promises);
        console.log("snapshots:", snapshots); // Log the snapshots array
    
        snapshots.forEach((snapshot, index) => {
          console.log("snapshot:", snapshot);
          console.log("index:", index);
          const nft = NFTData[index];
          console.log("nft:", nft);
    
          if (snapshot.exists()) {
            const data = snapshot.data();
            likesObj[nft.tokenId] = {
              count: data.count || 0,
              rating: data.rating || 0,
              liked: data.wallets && data.wallets[walletAddress] ? true : false,
              wallets: data.wallets || {},
              
            };
            console.log("data2:", data);
          }
        });
    
        setLikes(likesObj);
      } catch (error) {
        console.error("Error fetching likes and ratings:", error);
      }
    };    

    fetchLikesAndRatings();
  }, [NFTData, walletAddress]);


  

  const likeNFT = useCallback(
    async (tokenId, ratingValue, walletAddress) => {
      setLikes((prevState) => {
        const newLikes = { ...prevState };
        if (!newLikes[tokenId]) {
          newLikes[tokenId] = {
            count: 0,
            liked: false,
            rating: 0,
            wallets: {},
          };
        }
  
        // check if wallets property exists and is an object
        if (
          !newLikes[tokenId].wallets ||
          typeof newLikes[tokenId].wallets !== "object"
        ) {
          newLikes[tokenId].wallets = {};
        }
  
        // check if this wallet has already liked/rated
        if (newLikes[tokenId].wallets[walletAddress]) {
          newLikes[tokenId].liked = false;
          newLikes[tokenId].count--;
          delete newLikes[tokenId].wallets[walletAddress];
        } else {
          newLikes[tokenId].liked = true;
          newLikes[tokenId].count++;
          newLikes[tokenId].rating = ratingValue;
          newLikes[tokenId].wallets[walletAddress] = true;
        }
  
        if (typeof window !== "undefined") {
          localStorage.setItem("nftLikes", JSON.stringify(newLikes));
        }
  
        // Store likes and rating in Firebase Firestore by tokenId
        const updateLikesAndRating = async () => {
          const likesRef = doc(firestore, "likes", tokenId.toString()); // Convert tokenId to string
          const likesSnapshot = await getDoc(likesRef);
          if (likesSnapshot.exists()) {
            await updateDoc(likesRef, {
              count: newLikes[tokenId].count,
              rating: newLikes[tokenId].rating,
              wallets: newLikes[tokenId].wallets,
            });
          } else {
            await setDoc(likesRef, {
              count: newLikes[tokenId].count,
              rating: newLikes[tokenId].rating,
              wallets: newLikes[tokenId].wallets,
            });
          }
        };
  
        updateLikesAndRating();
  
        return newLikes;
      });
    },
    [firestore, walletAddress]
  );
  
  useEffect(() => {
    const fetchFileTypes = async () => {
      let fileTypesObj = {};

      const savedData = localStorage.getItem("fileTypesObj");
      if (savedData) {
        fileTypesObj = JSON.parse(savedData);
      }

      for (const el of NFTData) {
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
  }, [NFTData]);

  const RenderDefault = () => (
    <Image
      src={images.invalidImage}
      alt="NFT"
      width={350}
      height={300}
      objectFit="cover"
      className={Style.NFTCardTwo_box_img_img}
      controls
    />
  );

  const RenderMedia = ({ src }) => {
    const isImage = fileTypes[src] && fileTypes[src].startsWith("image");
    const isAudio = fileTypes[src] && fileTypes[src].startsWith("audio");

    return (
      <LazyLoadComponent>
        {isImage ? (
          <LazyLoadImage
            src={src}
            alt="NFT"
            width={300}
            height={300}
            effect="blur"
            className={Style.NFTCardTwo_box_img_img}
          />
        ) : isAudio ? (
          <div className={Style.NFTCardTwo_box_audio}>
            <Image
              src={images.audio_image}
              alt="Default"
              width={300}
              height={300}
              objectFit="cover"
              className={Style.NFTCardTwo_box_img_audio}
            />
            <audio
              src={src}
              controls
              className={Style.NFTCardTwo_box_audio_controls}
            />
          </div>
        ) : (
          <ReactPlayer
            url={src}
            controls
            width={300}
            height={300}
            className={Style.NFTCardTwo_box_img_img}
          />
        )}
      </LazyLoadComponent>
    );
  };

  const renderFilePreview = (el) => {
    const fileType = fileTypes[el.image];

    if (fileType) {
      return <RenderMedia src={el.image} />;
    } else {
      return <RenderDefault />;
    }
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = NFTData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={Style.NFTCardTwo_container}>
      {loading ? (
        <div className={Style.loading}>
          <p
            className={`${Style["loading-message"]} ${Style["loading-message-animate"]}`}
          >
            Loading XMARKET NFTs...
          </p>
        </div>
      ) : (
        <>
          <div className={Style.NFTCardTwo}>
            {currentItems.map((el, i) => (
              <Link
                href={{ pathname: "/NFTDetails", query: el }}
                key={`${el.tokenId}-${i}`}
              >
                <div className={Style.NFTCardTwo_box}>
                  <div className={Style.NFTCardTwo_box_img}>
                    {renderFilePreview(el)}
                  </div>
                  <div className={Style.NFTCardTwo_box_info}>
                    <div className={Style.NFTCardTwo_box_info_left}>
                      <p>{el.name}</p>
                    </div>
                  </div>
                  <div className={Style.NFTCardTwo_box_tokenid}>
                    <small> # {el.tokenId}</small>
                  </div>

                  <div className={Style.NFTCardTwo_box_price}>
                    <div className={Style.likesContainer}>
                      <div className={Style.NFTCardTwo_box_like_box}></div>
                    </div>
                    <div className={Style.NFTCardTwo_box_price_box}>
                      <small>CURRENT PRICE</small>
                      <p>{el.price} BNB</p>
                    </div>
                    <p className={Style.NFTCardTwo_box_price_stock}>


                      {/* future auciton functionality 
                    <MdTimer /> <span>{i + 1} HOURS LEFT</span>
                    */}

                      {/*
                      <Rating
                        emptySymbol={
                          <FaRegStar style={{ marginRight: "5px" }} />
                        }
                        fullSymbol={<FaStar style={{ marginRight: "5px" }} />}
                        onClick={(value) => likeNFT(el.tokenId, value, walletAddress)}
                        initialRating={
                          likes[el.tokenId] ? likes[el.tokenId].rating : 0
                        }
                      />
                      */}


                      <Rating
                        emptySymbol={
                          <FaRegStar style={{ marginRight: "1px", fontSize:"1rem" }} />
                        }
                        fullSymbol={<FaStar style={{ marginRight: "1px", fontSize:"1rem" }} />}
                        onClick={(value) =>
                          likeNFT(el.tokenId, value, walletAddress)
                        }
                        initialRating={
                          likes[el.tokenId] ? likes[el.tokenId].rating : 0
                        }
                      />

                      <div className={Style.likesNumber}>
                        <span>
                          {likes[el.tokenId] ? likes[el.tokenId].count : 0}
                        </span>
                      </div>

                      
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className={Style.pagination}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>
            <span>
              {currentPage} of {Math.ceil(NFTData.length / ITEMS_PER_PAGE)}
            </span>
            <button
              disabled={
                currentPage === Math.ceil(NFTData.length / ITEMS_PER_PAGE)
              }
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>

        </>
      )}
    </div>
  );
};

export default AuthorNFTCard;
