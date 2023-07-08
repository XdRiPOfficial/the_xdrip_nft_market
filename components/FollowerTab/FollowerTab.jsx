import React, { useState, useEffect } from "react";
import { RiUserFollowFill, RiAwardLine } from "react-icons/ri";

// INTERNAL IMPORT
import Style from "./FollowerTab.module.css";
import FollowerTabCard from "./FollowerTabCard/FollowerTabCard";
import { getAllUsers } from "../../firebase/services";

const FollowerTab = ({ TopCreator }) => {
  const [followingData, setFollowingData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [all, setAll] = useState(true);
  const [following, setFollowing] = useState(false);
  const [popular, setPopular] = useState(false);

  const openAll = () => {
    if (!all) {
      setAll(true);
      setFollowing(false);
      setPopular(false);
    }
  };

  const openFollower = () => {
    if (!following) {
      setAll(false);
      setFollowing(true);
      setPopular(false);
    }
  };

  const openPopular = () => {
    if (!popular) {
      setAll(false);
      setFollowing(false);
      setPopular(true);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getAllUsers();
      setFollowingData(userData);
      setNewsData(userData);
    };

    fetchUserData();
  }, []);

  return (
    <div className={Style.followerTab}>
      <div className={Style.followerTab_title}>
        <div className={Style.followerTab_tabs}>
          <div className={Style.followerTab_tabs_btn}>
            <button onClick={openAll}>
              <RiUserFollowFill /> ALL CREATORS
            </button>
            <button onClick={openFollower}>
              <RiUserFollowFill /> FOLLOWED CREATORS
            </button>
            <button onClick={openPopular}>
              <RiAwardLine /> POPULAR CREATORS
            </button>
          </div>
        </div>
      </div>

      {all && (
        <div className={Style.followerTab_box}>
          {followingData.map((user, i) => (
            <FollowerTabCard key={i + 1} user={user} />
          ))}
        </div>
      )}

      {following && (
        <div className={Style.followerTab_box}>
          {followingData.map((user, i) => (
            <FollowerTabCard key={i + 1} user={user} />
          ))}
        </div>
      )}

      {popular && (
        <div className={Style.followerTab_box}>
          {newsData.map((user, i) => (
            <FollowerTabCard key={i + 1} user={user} />
          ))}
        </div>
      )}

      <div className={Style.followerTab_member}>
        <div className={Style.followerTab_member_box}>
          <a href="#">SHOW ME MORE</a>
          <a href="#">BECOME A CREATOR</a>
        </div>
      </div>
    </div>
  );
};

export default FollowerTab;
