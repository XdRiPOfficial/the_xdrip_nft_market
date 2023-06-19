import React from "react";

// INTERNAL IMPORT

import TheForge from "../components/TheForge/TheForge";
import NFTWallet from "../components/NFTWallet/NFTWallet";
import MyNFTData from "../Context/MyNFTDataContext";
import Style from "../styles/theForge.module.css";
import videos from "../public/videos";

const theForge = () => {
  return (
    <div className={Style.theForge}>
      <div className={Style.videoContainer}>
        <video
          className={Style.video}
          src={videos.Forge1}
          width="100%"          
          loop
          muted
          autoPlay
          preload="auto"
          playsInline
        />
      </div>
      <div className={Style.theForge_content}>
        <h1 className={Style.medalsTitle}>MEDALS OF HONOR</h1>
        <p className={Style.medalsText}>
          In the legendary land of Xdripia, a place of unmatched courage and determination exists, known as "The Forge of Destiny". This hallowed place serves as the ultimate proving ground for the mightiest and most valiant warriors of the realm. It is here that they must face a series of dangerous trials and extreme physical tests to demonstrate their unyielding dedication to XdRiPia, its people, their unwavering loyalty, and their ultimate power and skill in the art of combat.
          <br /><br />
          Hidden deep within the treacherous, jagged peaks of XdriPia's IronForge Mountains, the Forge of Titans is surrounded by mystery and awe, making it a revered and sacred location in Xdripia.
          <br /><br />
          The difficult journey to reach the Forge itself serves as the first trial, as only those with the strength and resilience to travel the treacherous terrain can hope to prove their worth within its sacred halls.
          <br /><br />
          Once inside the Forge of Titans, the warriors face a series of formidable challenges, each one more extreme than the last. A champion emerging victorious from this gauntlet of trials earns the highest of honors, the right to forge the Medal of Honor, demonstrating the ultimate achievement a warrior can receive in Xdripia.
          <br /><br />
          This cherished reward symbolizes their unwavering commitment to protecting their land and their people, and signifies their place among the most uncommon, rare, epic, and legendary heroes of all time.
        </p>
      </div>
      <h1 className={Style.medalsTitle}>FORGE YOUR MEDAL</h1>
      <TheForge />
      <MyNFTData>
        <NFTWallet />
      </MyNFTData>
    </div>
  );
};

export default theForge;
