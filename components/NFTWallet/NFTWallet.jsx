import React, { useContext } from "react";
import Style from "./NFTWallet.module.css";
import images from "../../img";
import videos from "../../public/videos";
import NFTWalletCard from "./NFTWalletCard/NFTWalletCard";

import MyNFTData, { MyNFTDataContext } from '../../Context/MyNFTDataContext';



const NFTWallet = () => {
  const { nfts } = useContext(MyNFTDataContext);

  const renderMedia = (url, metadata) => {
    if (!url) {
      return <p>No media found</p>;
    }
  
    const fileExtension = url.split('.').pop().toLowerCase();
  
    if (['mp4', 'webm', 'ogg'].includes(fileExtension)) {
      return <video                 
      src={metadata.animation_url}
      alt={metadata.name}
      autoPlay={true}
      controls={true}
      loop={true}
      muted={true}
      width={300}
      height={300}
      controlsList="nodownload"
      style={{ objectFit: "cover" }}
      className={Style.NFTWalletCard_box_img_vid}/>;
    } else if (['mp3', 'wav', 'ogg'].includes(fileExtension)) {
      return <audio src={url} controls />;
    } else {
      return <img src={url} alt="NFT" width="150" />;
    }
  };
  
  return (
    <div className={Style.nft_wallet}>
      
      <h1 className={Style.page_title}>MY MEDALS OF HONOR</h1>
      
      <NFTWalletCard nfts={nfts} renderMedia={renderMedia} />   
     
    </div>
  );
};

export default NFTWallet;