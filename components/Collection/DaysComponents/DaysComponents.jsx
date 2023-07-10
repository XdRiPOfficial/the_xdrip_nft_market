import React from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";

// INTERNAL IMPORT
import Style from "./DaysComponents.module.css";
import images from "../../../img";

const DaysComponents = ({ data: { collection, user, nfts }, i }) => {
  console.log({ data: { collection, user, nfts }, i });

  if (!collection) {
    return null;
  }

  const { bannerImageUrl, collectionName } = collection;

  return (
    <div className={Style.daysComponent}>
      <div className={Style.daysComponent_box_box}>
        <div className={Style.daysComponent_box}>
          <div className={Style.daysComponent_box_img}>
            <Image
              src={bannerImageUrl}
              className={Style.daysComponent_box_img_img}
              alt="profile background"
              width={378}
              height={378}
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className={Style.daysComponent_box_profile}>
            {nfts.slice(0, 3).map((nft, index) => (
              <img
                key={index}
                src={nft.image}
                alt={"COMING SOON!"}
                width={126}
                height={125}
                className={Style[`daysComponent_box_img_${index + 1}`]}
                style={{ objectFit: "cover" }}
              />
            ))}
          </div>

          <div className={Style.daysComponent_box_titles}>
            <div className={Style.daysComponent_box_title}>
              <h2>{collectionName}</h2>

              <div className={Style.daysComponent_box_title_info}>
                <div className={Style.daysComponent_box_title_info_profile}>
                  <Image
                    src={user.profilePictureUrl}
                    alt="profile"
                    width={40}
                    height={40}
                    style={{ objectFit: "cover" }}
                    className={Style.daysComponent_box_title_info_profile_img}
                  />

                  <p>
                    Creator
                    <span>
                      {user.username}
                      <small>
                        <MdVerified />
                      </small>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaysComponents;
