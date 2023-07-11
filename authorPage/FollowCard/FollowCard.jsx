import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { addFollower, removeFollower, isFollowingUser } from "../../firebase/services";
import { useAddress } from "@thirdweb-dev/react";
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// INTERNAL IMPORT
import Style from "./FollowCard.module.css";
import images from "../../img";

const FollowCard = ({ i, user }) => {
  const [following, setFollowing] = useState(user.isFollowing);
  const followerAddress = useAddress();
  const userAddress = user.walletAddress;

  useEffect(() => {
    const checkFollowingStatus = async () => {
      try {
        const isFollowing = await isFollowingUser(userAddress, followerAddress);
        setFollowing(isFollowing);
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    };

    checkFollowingStatus();
  }, [userAddress, followerAddress]);

  const followMe = async () => {
    try {
      if (!following) {
        await addFollower(user.walletAddress, followerAddress);
        setFollowing(true);
        toast.success(`You successfully followed ${user.username}.`);
      } else {
        await removeFollower(user.walletAddress, followerAddress);
        setFollowing(false);
        toast.success(`You successfully unfollowed ${user.username}.`);
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
      toast.error("Error toggling follow status. Please try again.");
    }
  };

  console.log("FollowCard Data:", user);

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
            {user.username}{" "}
            <span>
              <MdVerified />
            </span>
          </h4>
        </div>

        <div className={Style.FollowerTabCard_box_info}>
          <div className={Style.FollowerTabCard_box_info_following}>
            <Link href="/creatorProfile">
              <a>MY PROFILE</a>
            </Link>
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
          <a>{user.followers.length} </a>
        </div>
      </div>
      <ToastContainer
        position={toast.POSITION.TOP_CENTER}
        className={Style.toast_container_center}
      />
    </div>
  );
};

export default FollowCard;
