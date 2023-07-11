import React, { useState, useEffect, useContext } from "react";
import Style from "../styles/myProfile.module.css";
import { Banner } from "../collectionPage/collectionIndex";
import {
  AuthorProfileCard,
  AuthorTaps,
  AuthorNFTCardBox,
} from "../authorPage/componentIndex";
import { getMyNFTs, getCollectionsData, getFollowingAndFollowers } from "../firebase/services";
import { useAddress } from "@thirdweb-dev/react";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const Author = () => {
  const address = useAddress();
  const { currentAccount } = useContext(NFTMarketplaceContext);
  const [owned, setOwned] = useState(false);
  const [created, setCreated] = useState(false);
  const [collectionsCreated, setCollectionsCreated] = useState([]);
  const [listed, setListed] = useState(false);
  const [sold, setSold] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);
  const [nftsOwned, setNftsOwned] = useState(false);
  const [collections, setCollections] = useState(false);
  const [nftsCreated, setNftsCreated] = useState([]);
  const [nftsListed, setNftsListed] = useState([]);
  const [nftsSold, setNftsSold] = useState([]);
  const [nftsLiked, setNftsLiked] = useState([]);
  const [collectionsData, setCollectionsData] = useState([]);
  const [myFollowers, setMyFollowers] = useState([]);
  const [myFollowing, setMyFollowing] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);

  useEffect(() => {
    const fetchUserCollections = async () => {
      try {
        console.log("Fetching user collections for account My Profile:", currentAccount);
        const collections = await getCollectionsData(currentAccount);
        setCollectionsData(collections);
        console.log("Fetched user collections My Profile:", collections);
      } catch (error) {
        console.error("Error fetching user collections My Profile:", error);
      }
    };

    if (currentAccount) {
      fetchUserCollections();
    }
  }, [currentAccount]);

  useEffect(() => {
    const fetchMyNFTsData = async () => {
      try {
        console.log("Fetching user NFTs for account MY PROFILE:", currentAccount);
        const myNFTsData = await getMyNFTs(currentAccount);
        console.log("Fetched user NFTs MY PROFILE:", myNFTsData);
        setNftsCreated(myNFTsData.nftsCreated);
        setNftsListed(myNFTsData.nftsListed);
        setNftsSold(myNFTsData.nftsSold);
      } catch (error) {
        console.error("Error fetching user NFTs:", error);
      }
    };

    const fetchFollowingAndFollowersData = async () => {
      try {
        console.log("Fetching following and followers for account MY PROFILE:", currentAccount);
        const myFollowData = await getFollowingAndFollowers(currentAccount);
        console.log("Fetched following and followers MY PROFILE:", myFollowData);
        setMyFollowing(myFollowData.myFollowing);
        setMyFollowers(myFollowData.myFollowers);
      } catch (error) {
        console.error("Error fetching following and followers MY PROFILE:", error);
      }
    };

    if (currentAccount) {
      fetchMyNFTsData();
      fetchFollowingAndFollowersData();
    }
  }, [currentAccount]);

  return (
    <div className={Style.author}>
      <Banner />
      <div className={Style.author_box_author}>
        <div className={Style.author_box_profile}>
          <AuthorProfileCard currentAccount={currentAccount} />
        </div>
        <div className={Style.author_box_taps_cards}>
          <div className={Style.author_box_taps}>
            <AuthorTaps
              setOwned={setOwned}
              setCollectionsCreated={setCollectionsCreated}
              setCreated={setCreated}
              setListed={setListed}
              setSold={setSold}
              setLike={setLike}
              setFollower={setFollower}
              setFollowing={setFollowing}
              currentAccount={currentAccount}
              nftsOwned={nftsOwned}
              nftsCreated={nftsCreated}
              nftsListed={nftsListed}
              nftsSold={nftsSold}
              nftsLiked={nftsLiked}
              collections={collections}
              collectionsData={collectionsData}
              myFollowing={myFollowing}
              myFollowers={myFollowers}
              follower={follower}
              following={following}
            />

            <div className={Style.author_box_cards}>
              <AuthorNFTCardBox
                owned={owned}
                collectionsCreated={collectionsCreated}
                created={created}
                listed={listed}
                sold={sold}
                like={like}
                follower={follower}
                following={following}
                collections={collections}
                nftsOwned={nftsOwned}
                nftsCreated={nftsCreated}
                nftsListed={nftsListed}
                nftsSold={nftsSold}
                nftsLiked={nftsLiked}
                collectionsData={collectionsData}
                currentAccount={currentAccount}
                myFollowers={myFollowers}
                myFollowing={myFollowing}
                followingUsers={followingUsers}
              />

            </div>
          </div>
        </div>
      </div>
      {console.log("COLLECTION DATA MY PROFILE:", myFollowers)}
    </div>
  );
};

export default Author;
