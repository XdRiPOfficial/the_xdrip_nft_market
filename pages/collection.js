import React from "react";

//INTERNAL IMPORT
import Style from "../styles/collection.module.css";
import images from "../img";
import videos from "../public/videos"

import {
  Banner,
  CollectionProfile,
  NFTCardTwo,
} from "../collectionPage/collectionIndex";
import { Slider, Brand } from "../components/componentsindex";
import Filter from "../components/Filter/Filter";

const collection = () => {

  
  return (
    <div className={Style.collection}>
      <Banner bannerVideo={videos.bannerVideo} />
      <CollectionProfile />
      <Filter />
      

      <Slider />
      <Brand />
    </div>
  );
};

export default collection;