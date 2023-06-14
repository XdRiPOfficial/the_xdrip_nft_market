import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// INTERNAL IMPORT
import Style from "./MOH.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex.js";

const MOH = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/theForge");
  };

  return (
    <div className={Style.Brand}>
      <div className={Style.Brand_box}>
        <div className={Style.Brand_box_left}>
        <Image
            src={images.bullet_12}
            alt="MOH IMAGE"
            width={550}
            height={70}
            className={Style.Brand_box_left_img}
          />
          <h2>XDRIP MEDALS OF HONOR</h2>
          

          <div className={Style.Brand_box_left_box}>
            <small>Embark on a perilous journey to the Forge of Destiny, 
                hidden within Xdripia's treacherous IronForge Mountains. 
                Only the mightiest warriors dare to face its trials, proving their courage, 
                strength, and unwavering loyalty. Become a legend and forge THE Medals of Honor, 
                from common to legendary, representing your unparalleled bravery and honor. 
                Will you rise above the rest and claim your place among the greatest heroes of all time?
            </small>
          </div>

          <div className={Style.Brand_box_left_btn}>
            <Button btnName="ENTER" handleClick={handleButtonClick} />
          </div>
        </div>
        <div className={Style.Brand_box_right}>
          <Image
            src={images.moh_entry}
            alt="MOH IMAGE"
            width={700}
            height={750}
            className={Style.Brand_box_right_img}
          />
        </div>
      </div>
    </div>
  );
};

export default MOH;
