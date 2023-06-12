import React, { useState, useEffect } from "react";
import Style from "./NFTDetailsImg.module.css";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ReactPlayer from 'react-player';
import "react-lazy-load-image-component/src/effects/blur.css";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/config";
import { getUserProfile } from '../../firebase/services';

const NFTDetailsImg = ({ nft }) => {
  const [information, setInformation] = useState(true);
  const [details, setDetails] = useState(true);
  const [fileType, setFileType] = useState("");
  const [profilePic, setProfilePic] = useState(null);




  useEffect(() => {
    const fetchFileType = async () => {
      try {
        const response = await fetch(nft.image);
        const contentType = response.headers.get("content-type");
        setFileType(contentType);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFileType();
  }, [nft.image]);

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const userProfile = await getUserProfile(nft.seller);
        if (userProfile && userProfile.profilePictureUrl) {
          setProfilePic(userProfile.profilePictureUrl);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfilePic();
  }, [nft.seller]);

  const isImage = fileType.startsWith("image");
  const isAudio = fileType.startsWith("audio");

  const openInformation = () => setInformation(!information);
  const openDetails = () => setDetails(!details);

  return (
    <div className={Style.NFTDetailsImg}>
      <div className={Style.NFTDetailsImg_box}>
        <div className={Style.NFTDetailsImg_box_NFT}>
          <div className={Style.NFTDetailsImg_box_NFT_img}>
            {isImage ? (
              <LazyLoadImage
                src={nft.image}
                alt="NFT image"
                width={800}
                height={800}
                effect="blur"
                className={Style.NFTDetailsImg_box_NFT_img_img}
              />
            ) : isAudio ? (
              <div>
                <img 
                  src="default-audio-thumbnail.png" 
                  alt="audio thumbnail"
                  className={Style.NFTDetailsImg_box_NFT_img_img}
                />
                <audio
                  src={nft.image}
                  controls
                  className={Style.NFTDetailsImg_box_NFT_audio}
                />
              </div>
            ) : (
              <ReactPlayer
                url={nft.image}
                width="100%"
                height="100%"
                className={Style.NFTDetailsImg_box_NFT_img_img}
                controls
              />
            )}
          </div>
        </div>

        <div
          className={Style.NFTDetailsImg_box_description}
          onClick={() => openInformation()}
        >
          <p>NFT Contract</p>
          {information ? <FaArrowUp /> : <FaArrowDown />}
        </div>

        {information && (
          <div className={Style.NFTDetailsImg_box_description_box}>
            <p>{nft.owner}</p>
          </div>
        )}

        <div
          className={Style.NFTDetailsImg_box_details}
          onClick={() => openDetails()}
        >
          <p>Seller Details</p>
          {details ? <FaArrowUp /> : <FaArrowDown  />}
        </div>

        {details && (
          <div className={Style.NFTDetailsImg_box_details_box}>
            {/*
            <small>2000 x 2000 px.IMAGE(685KB)</small>
            */}
            
            <div className={Style.NFTDetailsImg_box_details_box_profile}>
              <img
                src={profilePic}
                alt="Profile Pic"
                className={Style.NFTDetailsImg_box_details_box_profile_img}
              />
              <p>{nft.seller}</p>
            </div>
            <p>
              <small>SELLER ROYALTIES</small>
              &nbsp; &nbsp; {nft.royalties}
            </p>
            <p>
              <small>TOKEN ID</small>
              &nbsp; &nbsp; {nft.tokenId}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTDetailsImg;

  
  
  /*

import React, { useState, useEffect, useContext } from "react";
import Style from "./NFTDetailsImg.module.css";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ReactPlayer from 'react-player';
import "react-lazy-load-image-component/src/effects/blur.css";



const NFTDetailsImg = ({ nft }) => {
  const [information, setInformation] = useState(true);
  const [details, setDetails] = useState(true);
  const [fileType, setFileType] = useState("");

  useEffect(() => {
    const fetchFileType = async () => {
      try {
        const response = await fetch(nft.image);
        const contentType = response.headers.get("content-type");
        setFileType(contentType);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFileType();
  }, [nft.image]);

  const isImage = fileType.startsWith("image");
  const isAudio = fileType.startsWith("audio");

  const openInformation = () => setInformation(!information);
  const openDetails = () => setDetails(!details);


  return (
    <div className={Style.NFTDetailsImg}>
      <div className={Style.NFTDetailsImg_box}>
        <div className={Style.NFTDetailsImg_box_NFT}>
          <div className={Style.NFTDetailsImg_box_NFT_img}>
            {isImage ? (
              <LazyLoadImage
                src={nft.image}
                alt="NFT image"
                width={800}
                height={800}
                effect="blur"
                className={Style.NFTDetailsImg_box_NFT_img_img}
              />
            ) : isAudio ? (
              <div>
                <img 
                  src="default-audio-thumbnail.png" 
                  alt="audio thumbnail"
                  className={Style.NFTDetailsImg_box_NFT_img_img}
                />
                <audio
                  src={nft.image}
                  controls
                  className={Style.NFTDetailsImg_box_NFT_audio}
                />
              </div>
            ) : (
              <ReactPlayer
                url={nft.image}
                width="100%"
                height="100%"
                className={Style.NFTDetailsImg_box_NFT_img_img}
                controls
              />
            )}
          </div>
        </div>

        <div
          className={Style.NFTDetailsImg_box_description}
          onClick={() => openInformation()}
        >
          <p>NFT Contract</p>
          {information ? <FaArrowUp /> : <FaArrowDown />}
        </div>

        {information && (
          <div className={Style.NFTDetailsImg_box_description_box}>
            <p>{nft.owner}</p>
          </div>
        )}

        <div
          className={Style.NFTDetailsImg_box_details}
          onClick={() => openDetails()}
        >
          <p>Details</p>
          {details ? <FaArrowUp /> : <FaArrowDown  />}
        </div>

        {details && (
          <div className={Style.NFTDetailsImg_box_details_box}>
            <small>2000 x 2000 px.IMAGE(685KB)</small>
            <p>
              <small>Owner</small>
              <br></br>
              {nft.seller}
            </p>
            <p>
              <small>SELLER ROYALTIES</small>
              &nbsp; &nbsp; {nft.royalties}
            </p>
            <p>
              <small>TOKEN ID</small>
              &nbsp; &nbsp; {nft.tokenId}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTDetailsImg;
*/