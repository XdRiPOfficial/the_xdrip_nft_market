import React from "react";

//INTERNAL IMPORT

import TheForge from "../components/TheForge/TheForge";
import  NFTWallet  from '../components/NFTWallet/NFTWallet';
import MyNFTData from '../Context/MyNFTDataContext';
import { Slider, Brand, Loader, Title } from "../components/componentsindex";
import Style from "../styles/theForge.module.css";
const theForge = () => {
  return (
    <div className={Style.theForge}>
      <div>
      <div className={Style.theForge_cont}>
      <div className={Style.theForge_container}>
        <h1>THE MEDALS OF HONOR FORGE</h1>
        </div>
        </div>
        <TheForge />        
        <MyNFTData>
          <NFTWallet />
        </MyNFTData>
        
      </div>
    </div>
  );
};

export default theForge;