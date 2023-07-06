import React, { useState, useEffect, useContext } from "react";
import Style from "../styles/myProfile.module.css";
import { Banner } from "../collectionPage/collectionIndex";
import {
  AuthorProfileCard,
  AuthorTaps,
  AuthorNFTCardBox,
} from "../authorPage/componentIndex";
import { getMyNFTs } from "../firebase/services";
import { useAddress } from "@thirdweb-dev/react";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const Author = () => {
  const address = useAddress();
  const { currentAccount } = useContext(NFTMarketplaceContext);
  const [owned, setOwned] = useState(true);
  const [created, setCreated] = useState(false);
  const [listed, setListed] = useState(false);
  const [sold, setSold] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);
  const [nftsOwned, setNftsOwned] = useState(false);
  const [nftsCreated, setNftsCreated] = useState([]);
  const [nftsListed, setNftsListed] = useState([]);
  const [nftsSold, setNftsSold] = useState([]);
  const [nftsLiked, setNftsLiked] = useState([]);

  useEffect(() => {
    const fetchMyNFTsData = async () => {
      try {
        console.log("Fetching user NFTs for account:", currentAccount);
        const myNFTsData = await getMyNFTs(currentAccount);
        console.log("Fetched user NFTs:", myNFTsData);
        setNftsCreated(myNFTsData.nftsCreated);
        setNftsListed(myNFTsData.nftsListed);
        setNftsSold(myNFTsData.nftsSold);
      } catch (error) {
        console.error("Error fetching user NFTs:", error);
      }
    };
  
    if (currentAccount) {
      fetchMyNFTsData();
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
          />
          <div className={Style.author_box_cards}>
          <AuthorNFTCardBox
            owned={owned}
            created={created}
            listed={listed}
            sold={sold}
            like={like}
            follower={follower}
            following={following}
            nftsOwned={nftsOwned}
            nftsCreated={nftsCreated}
            nftsListed={nftsListed}
            nftsSold={nftsSold}
            nftsLiked={nftsLiked}
            currentAccount={currentAccount}         
          />
           </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Author;
