import React, { useState, useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import { TiArrowSortedDown, TiArrowSortedUp, TiTick } from "react-icons/ti";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import { getUserProfile } from "../../firebase/services";

//INTERNAL IMPORT
import Style from "./AuthorTaps.module.css";

const AuthorTaps = ({
  setCollectionsCreated,
  setCollections,
  setCreated,
  setListed,
  setOwned,
  setSold,
  setLike,
  setFollower,
  setFollowing,
  currentAccount,
  collectionsData,
}) => {
  const [openList, setOpenList] = useState(false);
  const [activeBtn, setActiveBtn] = useState(1);
  const [selectedMenu, setSelectedMenu] = useState("Most Recent");
  const [user, setUser] = useState(null);
  const [share, setShare] = useState(false);
  const [report, setReport] = useState(false);

  const listArray = [
    "Created By Admin",
    "Most Appreciated",
    "Most Discussed",
    "Most Viewed",
  ];

  const openDropDownList = () => {
    setOpenList(!openList);
  };

  const openTab = (e) => {
    const btnText = e.target.innerText;
    console.log(btnText);
    if (btnText === "Created Collections") {
      setCollectionsCreated(true);
      setCreated(false);
      setListed(false);
      setOwned(false);
      setSold(false);
      setFollower(false);
      setFollowing(false);
      setLike(false);
      setActiveBtn(1);
    } else if (btnText === "Created NFTs") {
      setCollectionsCreated(false);
      setCreated(true);
      setListed(false);
      setOwned(false);
      setSold(false);
      setFollower(false);
      setFollowing(false);
      setLike(false);
      setActiveBtn(2);
    } else if (btnText === "Listed NFTs") {
      setCollectionsCreated(false);
      setCreated(false);
      setListed(true);
      setOwned(false);
      setSold(false);
      setFollower(false);
      setFollowing(false);
      setLike(false);
      setActiveBtn(3);
    } else if (btnText === "Owned NFTs") {
      setCollectionsCreated(false);
      setCreated(false);
      setListed(false);
      setOwned(true);
      setSold(false);
      setFollower(false);
      setFollowing(false);
      setLike(false);
      setActiveBtn(4);
    } else if (btnText === "Sold NFTs") {
      setCollectionsCreated(false);
      setCreated(false);
      setListed(false);
      setOwned(false);
      setSold(true);
      setFollower(false);
      setFollowing(false);
      setLike(false);
      setActiveBtn(5);
    } else if (btnText === "Liked NFTs") {
      setCollectionsCreated(false);
      setCreated(false);
      setListed(false);
      setOwned(false);
      setSold(false);
      setFollower(false);
      setFollowing(false);
      setLike(true);
      setActiveBtn(6);
    } else if (btnText === "Your Followers") {
      setCollectionsCreated(false);
      setCreated(false);
      setListed(false);
      setOwned(false);
      setSold(false);
      setFollower(true);
      setFollowing(false);
      setLike(false);
      setActiveBtn(7);
    } else if (btnText === "You're Following") {
      setCollectionsCreated(false);
      setCreated(false);
      setListed(false);
      setOwned(false);
      setSold(false);
      setFollower(false);
      setFollowing(true);
      setLike(false);
      setActiveBtn(8);
    }
  };

  return (
    <div className={Style.AuthorTaps}>
      <div className={Style.AuthorTaps_box}>
        <div className={Style.AuthorTaps_box_left}>
          <div className={Style.AuthorTaps_box_left_btn}>
            <button
              className={`${activeBtn === 1 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Created Collections
            </button>
            <button
              className={`${activeBtn === 2 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Created NFTs
            </button>
            <button
              className={`${activeBtn === 3 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Listed NFTs
            </button>
            <button
              className={`${activeBtn === 4 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Owned NFTs
            </button>
            <button
              className={`${activeBtn === 5 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Sold NFTs
            </button>
            <button
              className={`${activeBtn === 6 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Liked NFTs
            </button>
            <button
              className={`${activeBtn === 7 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Your Followers
            </button>
            <button
              className={`${activeBtn === 8 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              You're Following
            </button>
          </div>
        </div>

        <div className={Style.AuthorTaps_box_right}>
          <div
            className={Style.AuthorTaps_box_right_para}
            onClick={() => openDropDownList()}
          >
            <p>{selectedMenu}</p>
            {openList ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </div>

          {openList && (
            <div className={Style.AuthorTaps_box_right_list}>
              {listArray.map((el, i) => (
                <div
                  key={i + 1}
                  onClick={() => setSelectedMenu(el)}
                  className={Style.AuthorTaps_box_right_list_item}
                >
                  <p>{el}</p>
                  <span>{selectedMenu === el && <TiTick />}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorTaps;
