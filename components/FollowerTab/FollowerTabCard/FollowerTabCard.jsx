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
      <div className={Style.FollowerTabCard_rank}>
        <p>
          #{i + 1} <span>🥇</span>
        </p>
      </div>

      <div className={Style.FollowerTabCard_box}>
        <div className={Style.FollowerTabCard_box_img}>
          <Image
            className={Style.FollowerTabCard_box_img_img}
            src={images.xmarket_ped}
            alt="profile background"
            width={500}
            height={300}
            objectFit="cover"
          />
        </div>

        <div className={Style.FollowerTabCard_box_profile}>
          <Image
            className={Style.FollowerTabCard_box_profile_img}
            alt="profile picture"
            width={80}
            height={80}
            src={user.profilePictureUrl || images[`user${i + 1}`]}
          />
        </div>

        <div className={Style.FollowerTabCard_box_info}>
          <div className={Style.FollowerTabCard_box_info_name}>
            <h4>
              {user.username }
              {""}{" "}
              <span>
                <MdVerified />
              </span>
            </h4>
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
    </div>
  );
};

export default FollowerTabCard;
