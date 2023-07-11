import React, { useState, useEffect, useContext } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import Style from "./AuthorNFTCardBox.module.css";
import images from "../../img";
import { AuthorNFTCard, AuthorCollections, FollowCard } from "../componentIndex";
import FollowerTabCard from "../../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import { Loader } from "../../components/componentsindex";
import { getUserCollections, getFollowingAndFollowers } from "../../firebase/services";

const AuthorNFTCardBox = ({
  owned,
  collections,
  created,
  listed,
  sold,
  like,
  follower,
  following,
  followingUser,
  nftsOwned,
  collectionsCreated,
  collectionsData,
  nftsCreated,
  nftsListed,
  nftsSold,
  nftsLiked,
  myFollowing,
  myFollowers,
}) => {
  const [user, setUser] = useState(null);
  const [share, setShare] = useState(false);
  const [report, setReport] = useState(false);
  const address = useAddress();
  const [fileTypes, setFileTypes] = useState({});
  const [loading, setLoading] = useState(true);
  const [followerData, setFollowerData] = useState([]);
  const [followingData, setFollowingData] = useState([]);

  useEffect(() => {
    console.log("owned:", owned);
    console.log("collections:", collections);
    console.log("created:", created);
    console.log("listed:", listed);
    console.log("sold:", sold);
    console.log("like:", like);
    console.log("follower:", follower);
    console.log("followingUser:", followingUser);
    console.log("nftsOwned:", nftsOwned);
    console.log("collectionsCreated:", collectionsCreated);
    console.log("collectionsData:", collectionsData);
    console.log("nftsCreated:", nftsCreated);
    console.log("nftsListed:", nftsListed);
    console.log("nftsSold:", nftsSold);
    console.log("nftsLiked:", nftsLiked);
    console.log("myFollowing:", myFollowing);
    console.log("myFollowers:", myFollowers);
  }, [
    owned,
    collections,
    created,
    listed,
    sold,
    like,
    follower,
    following,
    followingUser,
    nftsOwned,
    collectionsData,
    nftsCreated,
    nftsListed,
    nftsSold,
    nftsLiked,
    myFollowing,
    myFollowers,
  ]);


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

  return (
    <div className={Style.AuthorNFTCardBox}>
      {owned && (
        <div>
          {nftsOwned.length > 0 ? (
            <AuthorNFTCard NFTData={nftsOwned} />
          ) : (
            <p className={Style.NoDataMessage}>NO PURCHASED NFTS FROM XMARKET</p>
          )}
        </div>
      )}
      {created && (
        <div>
          {nftsCreated.length > 0 ? (
            <AuthorNFTCard NFTData={nftsCreated} />
          ) : (
            <p className={Style.NoDataMessage}>NO CREATED NFTS ON XMARKET</p>
          )}
        </div>
      )}
      {collectionsCreated && (
        <div>
          {collectionsData.length > 0 ? (
            <AuthorCollections CollectionData={collectionsData} />
          ) : (
            <p className={Style.NoDataMessage}>NO CREATED COLLECTIONS ON XMARKET</p>
          )}
        </div>
      )}
      {listed && (
        <div>
          {nftsListed.length > 0 ? (
            <AuthorNFTCard NFTData={nftsListed} />
          ) : (
            <p className={Style.NoDataMessage}>NO LISTED NFTS ON XMARKET</p>
          )}
        </div>
      )}
      {sold && (
        <div>
          {nftsSold.length > 0 ? (
            <AuthorNFTCard NFTData={nftsSold} />
          ) : (
            <p className={Style.NoDataMessage}>NO SOLD NFTS ON XMARKET</p>
          )}
        </div>
      )}


      {like && (
        <div>
          {nftsLiked.length > 0 ? (
            <AuthorNFTCard NFTData={nftsLiked} />
          ) : (
            <p className={Style.NoDataMessage}>NO LIKED NFTS ON XMARKET</p>
          )}
        </div>
      )}

      {follower && (
        <div>
          {myFollowers.length > 0 ? (
            myFollowers.map((user, i) => (
              <FollowCard key={i + 1} user={user} />
            ))
          ) : (
            <p className={Style.NoDataMessage}>YOU ARE NOT BEING FOLLOWED YET</p>
          )}
        </div>
      )}

      {following && (
        <div className={Style.FollowerTabCard_box}>
          {myFollowing.length > 0 ? (
            myFollowing.map((user, i) => (
              <FollowCard key={i + 1} user={user} />
            ))
          ) : (
            <p className={Style.NoDataMessage}>YOU ARE NOT BEING FOLLOWED YET</p>
          )}
        </div>
      )}




    </div>
  );
};

export default AuthorNFTCardBox;