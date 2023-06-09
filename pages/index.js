import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  BigNFTSlider,
  Slider,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  AudioLive,
  FollowerTab,
  MOH,
  Brand,
  Video,
  Loader,
} from "../components/componentsindex";
import { getTopCreators } from "../TopCreators/TopCreators";

//IMPORTING CONTRCT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const Home = () => {
  const { checkIfWalletConnected, currentAccount } = useContext(
    NFTMarketplaceContext
  );
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    if (currentAccount) {
      fetchNFTs().then((items) => {
        console.log(nfts);
        setNfts(items.reverse());
        setNftsCopy(items);
      });
    }
  }, []);

  //CREATOR LIST

  const creators = getTopCreators(nfts);
  console.log(creators);

  const [selectedCategoryData, setSelectedCategoryData] = useState([]);

  return (
    <div className={Style.homePage}>
      <div id="hero-section" className={Style.section}>
        <HeroSection />
      </div>

      <div id="service" className={Style.section}>
        <MOH />
      </div>

      <div id="forge" className={Style.section}>
        <Title
          heading="XMARKET FEATURED NFTS"
          paragraph="SHINING THE LIGHT ON XCEPTIONAL ASSETS"
        />
        <BigNFTSlider />
      </div>

      <div id="audio" className={Style.section}>
        <Title
          heading="AUDIO XCELLENCE"
          paragraph="XCELLENT CREATIONS DESIGNED TO TEASE YOUR EAR HOLES."
        />
        <AudioLive />
      </div>

      <div id="creators" className={Style.section}>
        <Title
          heading="XMARKET'S TOP CREATORS"
          paragraph="CREATORS RAISING THE STANDARD OF XCELLENCE."
        />
        <FollowerTab />
      </div>

      <div id="slider" className={Style.section}>
        <Title
          heading="XPLORE VIDEO NFTS"
          paragraph="XCELLENT VIDEOS DESIGNED FOR YOUR VISUAL PLEASURE."
        />
        <Slider />
      </div>

      <div id="collections" className={Style.section}>
        <Title
          heading="XMARKET'S TOP COLLECTIONS"
          paragraph="THE MOST XCELLENT NFTS FEATURED JUST FOR YOU."
        />
        <Collection />
      </div>

      <div id="filter" className={Style.section}>
        <Title
          heading="XPLORE THE XMARKET"
          paragraph="THE MOST XCELLENT NFTS FEATURED JUST FOR YOU."
        />
        <Filter />
      </div>

      <div id="category" className={Style.section}>
        <Title
          heading="XPLORE BY CATEGORY"
          paragraph="CATEGORIES READY FOR YOU TO XPLORE."
    />
        <Category />
      </div>

      <div id="subscribe" className={Style.section}>
        <Subscribe />
      </div>

      <div id="brand" className={Style.section}>
        <Brand />
      </div>

      <div id="video" className={Style.section}>
        <Video />
      </div>
    </div>
  );
};

export default Home;
