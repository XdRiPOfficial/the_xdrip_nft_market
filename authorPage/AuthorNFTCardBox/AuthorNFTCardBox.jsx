import React, { useState, useEffect, useContext } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import Style from "./AuthorNFTCardBox.module.css";
import images from "../../img";
import { AuthorNFTCard } from "../componentIndex";
import FollowerTabCard from "../../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import { Loader } from "../../components/componentsindex";
import { getUserProfile, getMyNFTs } from "../../firebase/services";

const AuthorNFTCardBox = ({
  owned,
  created,
  listed,
  sold,
  like,
  follower,
  following,
  nftsOwned,
  nftsCreated,
  nftsListed,
  nftsSold,
  nftsLiked,
}) => {
  const [user, setUser] = useState(null);
  const [share, setShare] = useState(false);
  const [report, setReport] = useState(false);
  const address = useAddress();
  const { fetchMyNFTsOrListedNFTs } = useContext(NFTMarketplaceContext);
  const [fileTypes, setFileTypes] = useState({});
  const [loading, setLoading] = useState(true);



    const RenderDefault = () => (
      <img
        src={images.invalidImage}
        alt="NFT"
        width={350}
        height={300}
        className={Style.NFTCard_box_img_img}
      />
    );

    const RenderMedia = ({ src }) => {
      const fileType = fileTypes[src];

      const isImage = fileType && fileType.startsWith("image");
      const isAudio = fileType && fileType.startsWith("audio");

      return (
        <div>
          {isImage ? (
            <img
              src={src}
              alt="NFT"
              width={350}
              height={300}
              className={Style.NFTCardTwo_box_img_img}
            />
          ) : isAudio ? (
            <div className={Style.NFTCardTwo_box_audio}>
              <img
                src={images.audio_image}
                alt="Default"
                width={350}
                height={255}
                className={Style.NFTCardTwo_box_img_audio}
              />
              <audio
                src={src}
                controls
                className={Style.NFTCardTwo_box_audio_controls}
              />
            </div>
          ) : (
            <video
              src={src}
              controls
              width="350px"
              height="300px"
              className={Style.NFTCardTwo_box_img_img}
            />
          )}
        </div>
      );
    };

    const renderFilePreview = (el) => {
      const fileType = fileTypes[el.image];

      return fileType ? <RenderMedia src={el.image} /> : <RenderDefault />;
    };

 

  const followerArray = [];

  const followingArray = [];

  return (
    <div className={Style.AuthorNFTCardBox}>
      {owned && (
        <div>
          {nftsOwned.length > 0 ? (
            <AuthorNFTCard NFTData={nftsCreated} />
          ) : (
            <p className={Style.NoDataMessage}>NO OWNED NFTS FROM THE XMARKET</p>
          )}
        </div>
      )}
      {created && (
        <div>
          {nftsCreated.length > 0 ? (
            <AuthorNFTCard NFTData={nftsCreated} />
          ) : (
            <p className={Style.NoDataMessage}>NO CREATED NFTS ON THE XMARKET</p>
          )}
        </div>
      )}
      {listed && (
        <div>
          {nftsListed.length > 0 ? (
            <AuthorNFTCard NFTData={nftsListed} />
          ) : (
            <p className={Style.NoDataMessage}>NO LISTED NFTS ON THE XMARKET</p>
          )}
        </div>
      )}
      {sold && (
        <div>
          {nftsSold.length > 0 ? (
            <AuthorNFTCard NFTData={nftsSold} />
          ) : (
            <p className={Style.NoDataMessage}>NO SOLD NFTS ON THE XMARKET</p>
          )}
        </div>
      )}
      {like && (
        <div>
          {nftsLiked.length > 0 ? (
            <AuthorNFTCard NFTData={nftsLiked} />
          ) : (
            <p className={Style.NoDataMessage}>NO LIKED NFTS ON THE XMARKET</p>
          )}
        </div>
      )}
      {follower && (
        <div className={Style.AuthorNFTCardBox_box}>
          {followerArray.length > 0 ? (
            followerArray.map((el, i) => <FollowerTabCard key={i} el={el} />)
          ) : (
            <p className={Style.NoDataMessage}>YOU ARE NOT BEING FOLLOWED BY ANY USERS</p>
          )}
        </div>
      )}
      {following && (
        <div className={Style.AuthorNFTCardBox_box}>
          {followingArray.length > 0 ? (
            followingArray.map((el, i) => <FollowerTabCard key={i} el={el} />)
          ) : (
            <p className={Style.NoDataMessage}>YOU ARE NOT FOLLOWING ANY CREATORS </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthorNFTCardBox;