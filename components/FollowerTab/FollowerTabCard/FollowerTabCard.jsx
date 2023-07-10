import React, { useState } from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";

// INTERNAL IMPORT
import Style from "./FollowerTabCard.module.css";
import images from "../../../img";

const FollowerTabCard = ({ i, user }) => {
  const [following, setFollowing] = useState(false);

  const followMe = () => {
    if (!following) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  };

  console.log("FollowerTabCard Data:", user);

  return (
    <div className={Style.FollowerTabCard}>
       <div className={Style.FollowerTabCard_box}>
        <div className={Style.FollowerTabCard_box_img}>
          <Image
            className={Style.FollowerTabCard_box_img_img}
            src={user.profilePictureUrl}
            alt="profile background"
            width={150}
            height={150}
            objectFit="cover"
          />
        </div>

        <div className={Style.FollowerTabCard_box_username}>
          <h4>
            {user.username}
            {""}{" "}
            <span>
              <MdVerified />
            </span>
          </h4>
        </div>

        <div className={Style.FollowerTabCard_box_info}>
          <div className={Style.FollowerTabCard_box_info_following}>
            {following ? (
              <a onClick={() => followMe()}>
                FOLLOWING{""}{" "}
                <span>
                  <TiTick />
                </span>
              </a>
            ) : (
              <a onClick={() => followMe()}>MY PROFILE</a>
            )}
          </div>

          <div className={Style.FollowerTabCard_box_info_following}>
            {following ? (
              <a onClick={() => followMe()}>
                FOLLOWING{""}{" "}
                <span>
                  <TiTick />
                </span>
              </a>
            ) : (
              <a onClick={() => followMe()}>FOLLOW ME</a>
            )}
          </div>
        </div>
      </div>

      {/* New grid of three boxes */}
      <div className={Style.FollowerTabCard_stats}>
        <div className={Style.FollowerTabCard_stats_box}>
          <p>Collections </p>
          <span>{user.collectionsCreated.length}</span>
        </div>
        <div className={Style.FollowerTabCard_stats_box}>
          <p>NFTs </p>
          <span>{user.nftsCreated.length}</span>
        </div>
        <div className={Style.FollowerTabCard_stats_box}>
          <p>Followers</p>
          <a>100</a>
        </div>
      </div>
    </div>
  );
};

export default FollowerTabCard;

