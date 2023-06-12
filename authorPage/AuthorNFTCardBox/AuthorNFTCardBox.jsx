import React, { useState, useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";

//INTERNAL IMPORT
import Style from "./AuthorNFTCardBox.module.css";
import images from "../../img";
import { NFTCardTwo } from "../../collectionPage/collectionIndex";
import FollowerTabCard from "../../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import { Loader } from "../../components/componentsindex";

import { getUserProfile } from "../../firebase/services";

const AuthorNFTCardBox = ({
  collectiables,
  created,
  like,
  follower,
  following,
  nfts,
  myNFTS,
  NFTData,
}) => {
 
  const [user, setUser] = useState(null);
  const [share, setShare] = useState(false);
  const [report, setReport] = useState(false);
  const address = useAddress(); 

  const [fileTypes, setFileTypes] = useState({});
  const [loading, setLoading] = useState(true);

  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem("nftLikes");
    return savedLikes ? JSON.parse(savedLikes) : {};
  });

  const likeNFT = (tokenId, ratingValue) => {
    setLikes((prevState) => {
      const newLikes = { ...prevState };
      if (!newLikes[tokenId]) {
        newLikes[tokenId] = { count: 0, liked: false, rating: 0 };
      }
      newLikes[tokenId].liked = !newLikes[tokenId].liked;
      if (newLikes[tokenId].liked) {
        newLikes[tokenId].count++;
        newLikes[tokenId].rating = ratingValue;
      } else {
        newLikes[tokenId].count--;
        newLikes[tokenId].rating = 0;
      }
      localStorage.setItem("nftLikes", JSON.stringify(newLikes));
      return newLikes;
    });
  };


useEffect(() => {
  const fetchFileTypes = async () => {
    let fileTypesObj = {};

    const savedData = localStorage.getItem('fileTypesObj');
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

    localStorage.setItem('fileTypesObj', JSON.stringify(fileTypesObj));

    setFileTypes(fileTypesObj);
    setLoading(false);
  };

  fetchFileTypes();
}, [NFTData]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (address) { 
        const userData = await getUserProfile(address); 
        setUser(userData);
      }
    }
    
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
      const fileType = fileTypes[src];
      
      const isImage = fileType && fileType.startsWith("image");
      const isAudio = fileType && fileType.startsWith("audio");
      
      return (
        <LazyLoadComponent>
          {isImage ? (
            <LazyLoadImage
              src={src}
              alt="NFT"
              width={350}
              height={300}
              effect="blur"
              className={Style.NFTCardTwo_box_img_img}
            />
          ) : isAudio ? (
            <div className={Style.NFTCardTwo_box_audio}>
              <Image
                src={images.audio_image}
                alt="Default"
                width={350}
                height={255}
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
              width='350px'
              height='300px'
              className={Style.NFTCardTwo_box_img_img}
            />
          )}
        </LazyLoadComponent>
      );
    };
    
    const renderFilePreview = (el) => {
      const fileType = fileTypes[el.image];
    
      return fileType ? <RenderMedia src={el.image} /> : <RenderDefault />;
    };

    fetchUserData();
  }, [address]); 


  const followerArray = [
 
  ];

  const followingArray = [

  ];
  return (
    <div className={Style.AuthorNFTCardBox}>
      {collectiables && <NFTCardTwo NFTData={nfts} />}
      {created && <NFTCardTwo NFTData={myNFTS} />}
      {like && <NFTCardTwo NFTData={nfts} />}
      {follower && (
        <div className={Style.AuthorNFTCardBox_box}>
          {followerArray.map((el, i) => (
            <FollowerTabCard i={i} el={el} />
          ))}
        </div>
      )}
      {following && (
        <div className={Style.AuthorNFTCardBox_box}>
          {followingArray.map((el, i) => (
            <FollowerTabCard i={i} el={el} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthorNFTCardBox;