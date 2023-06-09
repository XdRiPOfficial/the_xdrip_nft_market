import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../componentsindex";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./CreateButtons.module.css";
import images from "../../img";
import videos from "../../public/videos"

const CreateButtons = () => {
    const router = useRouter();
  return (
    <div className={Style.createButtons}>

      <div className={Style.service_box}>
      <div className={Style.service_box_btn}>
      <video
            src={videos.create_select}
            alt="Stay Updated"
            height={400}
            width={400}
            autoPlay 
            loop
            className={Style.subscribe_box_right_img}
            
          />
          <div className={Style.service_box_btn_btn}>
        <Button btnName="CREATE YOUR NFT" handleClick={() => router.push("/uploadNFT")} />
        <p>Create a single NFT or mint into your existing collection.</p>
        </div>
        </div>
        <div className={Style.service_box_btn}>
        <video
            src={videos.create_select_2}
            alt="Stay Updated"
            height={400}
            width={400}
            autoPlay 
            loop
            className={Style.subscribe_box_right_img}
            
          />
          <div className={Style.service_box_btn_btn}>
        <Button btnName="CREATE A COLLECTION" handleClick={() => router.push("/createCollectionPage")} />
        <p>Create your new collection and begin minting your NFTs</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CreateButtons;
