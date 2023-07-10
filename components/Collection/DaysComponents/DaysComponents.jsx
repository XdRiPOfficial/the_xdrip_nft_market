import React, { useState } from "react";
import Image from "next/image";
import { TiTick } from "react-icons/ti";
import { useRouter } from "next/router";

// INTERNAL IMPORT
import Style from "./DaysComponents.module.css";
import images from "../../../img";

const DaysComponents = ({ data: { collection, user, nfts }, i }) => {
  console.log({ data: { collection, user, nfts }, i });

  const router = useRouter();
  if (!collection) {
    return null;
  }

  const { bannerImageUrl, collectionName } = collection;
  const [following, setFollowing] = useState(false);

  const followMe = () => {
    if (!following) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  };

  return (
    <div className={Style.DaysComponents_main}>
    <div className={Style.DaysComponents}>
    <div className={Style.DaysComponents_box}>
      <div className={Style.DaysComponents_box_img}>
        <Image
          src={bannerImageUrl}
          className={Style.DaysComponent_box_img_img}
          alt="profile background"
          width={400}
          height={350}
          style={{ objectFit: "cover" }}
        />
      </div>
  
      <div className={Style.DaysComponents_box_username}>
        <h4>
          {collectionName}
          {""}{" "}  
        </h4>
      </div>
      <div className={Style.DaysComponents_box_by}>    
      <p>BY:</p>
      </div>
      <div className={Style.DaysComponents_box_creator}>        
            <h4>{user.username}</h4>
            </div>
      <div className={Style.DaysComponents_box_info}>
        <div className={Style.DaysComponents_box_info_following}>
          {following ? (
            <a onClick={() => followMe()}>
              FOLLOWING{""}{" "}
              <span>
                <TiTick />
              </span>
            </a>
          ) : (
            <a onClick={() => followMe()}>MORE INFO</a>
          )}
        </div>

        <div className={Style.DaysComponents_box_info_following}>
          {following ? (
            <a onClick={() => followMe()}>
              FOLLOWING{""}{" "}
              <span>
                <TiTick />
              </span>
            </a>
          ) : (
            <a onClick={() => followMe()}>THE CREATOR</a>
          )}
        </div>
      </div>
    </div>
  
    {/* New grid of three boxes */}
    <div className={Style.DaysComponents_stats}>
    <div className={Style.DaysComponents_stats_img}>
        {nfts.slice(0, 3).map((nft, index) => (
          <img
            key={index}
            src={nft.image}
            alt={""}
            width={126}
            height={114}
            className={Style[`daysComponent_box_img_${index + 1}`]}
            style={{ objectFit: "cover" }}
          />
        ))}
       </div>
    </div>
  </div>
  </div>
  );
  };

export default DaysComponents;



