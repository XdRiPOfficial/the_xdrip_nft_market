import React, { useState, useEffect, useContext } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
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
  const [myNFTs, setMyNFTs] = useState([]);
  const { fetchMyNFTsOrListedNFTs } = useContext(NFTMarketplaceContext);
  const [fileTypes, setFileTypes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (address) {
        const nfts = await fetchMyNFTsOrListedNFTs(address);
        setMyNFTs(nfts);
      }
    };

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

    fetchData();
  }, [address]);

  const followerArray = [];

  const followingArray = [];

  return (
    <div className={Style.AuthorNFTCardBox}>
      {collectiables && <NFTCardTwo NFTData={nfts} />}
      {created && <NFTCardTwo NFTData={myNFTS} />}
      {like && <NFTCardTwo NFTData={nfts} />}
      {follower && (
        <div className={Style.AuthorNFTCardBox_box}>
          {followerArray.map((el, i) => (
            <FollowerTabCard key={i} el={el} />
          ))}
        </div>
      )}
      {following && (
        <div className={Style.AuthorNFTCardBox_box}>
          {followingArray.map((el, i) => (
            <FollowerTabCard key={i} el={el} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthorNFTCardBox;
