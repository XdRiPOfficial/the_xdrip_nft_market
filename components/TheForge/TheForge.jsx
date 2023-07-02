import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ReactPlayer from 'react-player';


import { useAddress } from "@thirdweb-dev/react"

// INTERNAL IMPORT
import Style from "./TheForge.module.css";
import images from "../../img";
import videos from "../../public/videos";
import Button from "../Button/Button";
import Link from "next/link";

import { ethers } from "ethers";
import mohCA_ABI from "../../Context/mohCA_ABI.json";
import ipfsHashes from "../../Context/ipfsHashes";

const MohAddress = mohCA_ABI.address;
const MohABI = mohCA_ABI.abi;

const fetchMohContract = (signerOrProvider) =>
    new ethers.Contract(MohAddress, MohABI, signerOrProvider);

const TheForge = () => {
    
    const [idNumber, setIdNumber] = useState(0);
    const address = useAddress();
    const [errorMessage, setErrorMessage] = useState("");
    const [openError, setOpenError] = useState(false);
    const [error, setError] = useState("");
    const [mintedCounts, setMintedCounts] = useState({
    COMMON: 0,
    UNCOMMON: 0,
    RARE: 0,
    EPIC: 0,
    LEGENDARY: 0,
  });
  
  


    const mohData = [
        {
            title: "COMMON",
            id: 1,
            name: "XDRIP OFFICIAL",
            collection: "MEDALS OF HONOR",
            price: "0.25 BNB",
            like: 1,
            image: images.user1,
            nftVideo: videos.common,
            description:
                "Common Medal, forged in the fires of battle, this medal represents the courage and determination of the XdRiP warrior.",
            ipfsHash: ipfsHashes.find((hash) => hash.title === "COMMON").url,
            inventory: {
                forged: 0,
                available: 100,
            },
        },
        {
            title: "UNCOMMON",
            id: 2,
            name: "XDRIP OFFICIAL",
            collection: "MEDALS OF HONOR",
            price: "0.50 BNB",
            like: 369,
            image: images.user1,
            nftVideo: videos.uncommon,
            description:
                "Uncommon Medal, crafted by the most skilled, this medal is a symbol of the exceptional strength and valor possessed by those who rise above the rest.",
            ipfsHash: ipfsHashes.find((hash) => hash.title === "UNCOMMON").url,
            inventory: {
                forged: 0,
                available: 80,
            },
        },
        {
            title: "RARE",
            id: 3,
            name: "XDRIP OFFICIAL",
            collection: "MEDALS OF HONOR",
            price: "0.75 BNB",
            like: 1,
            image: images.user1,
            nftVideo: videos.rare,
            description:
                "Rare Medal, forged from rare and precious metals, this medal is a testament to the elite few who have demonstrated unparalleled bravery and honor.",
            ipfsHash: ipfsHashes.find((hash) => hash.title === "RARE").url,
            inventory: {
                forged: 0,
                available: 60,
            },
        },
        {
            title: "EPIC",
            id: 4,
            name: "XDRIP OFFICIAL",
            collection: "MEDALS OF HONOR",
            price: "1.0 BNB",
            like: 1,
            image: images.user1,
            nftVideo: videos.epic,
            description:
                "Epic Medal, wrought with mystical powers, this medal is a sign of the legendary feats accomplished by only the most heroic and mighty of warriors.",
            ipfsHash: ipfsHashes.find((hash) => hash.title === "EPIC").url,
            inventory: {
                forged: 0,
                available: 40,
            },
        },
        {
            title: "LEGENDARY",
            id: 5,
            name: "XDRIP OFFICIAL",
            collection: "MEDALS OF HONOR",
            price: "1.5 BNB",
            like: 1,
            image: images.user1,
            nftVideo: videos.legendary,
            description:
                "Legendary Medal, forged by the XdRiP Gods, this medal is a symbol of the ultimate achievement in battle, an honor bestowed only upon the greatest of heroes. ",
            ipfsHash: ipfsHashes.find((hash) => hash.title === "LEGENDARY").url,
            inventory: {
                forged: 0,
                available: 20,
            },
        },
    ];
    
    
    
    const fetchMohContract = useCallback(async (signerOrProvider) => {
    const contract = new ethers.Contract(MohAddress, MohABI, signerOrProvider);

    const mintedCountsPromises = mohData.map(async (item) => {
      const mintedCount = await contract[`minted${item.title}`]();
      return { [item.title]: mintedCount.toNumber() };
    });

    const mintedCountsData = await Promise.all(mintedCountsPromises);
    const mergedCounts = Object.assign({}, ...mintedCountsData);
    setMintedCounts(mergedCounts);

    return contract;
  }, []);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    fetchMohContract(provider.getSigner());
  }, [fetchMohContract]);
    
    

        const mint = async (medalType, ipfsHash) => {
        try {
            console.log('Minting medal of type:', medalType);
            
            if (!address) {
                console.log('No address found, enabling Ethereum.');
                window.ethereum.enable();
                return;
            }
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = fetchMohContract(signer);
            console.log('Connected to contract at:', MohAddress);

            let mintFunction;
            switch (medalType) {
                case "COMMON":
                    mintFunction = contract.mintCommon;
                    break;
                case "UNCOMMON":
                    mintFunction = contract.mintUncommon;
                    break;
                case "RARE":
                    mintFunction = contract.mintRare;
                    break;
                case "EPIC":
                    mintFunction = contract.mintEpic;
                    break;
                case "LEGENDARY":
                    mintFunction = contract.mintLegendary;
                    break;
                default:
                    throw new Error("Invalid medal type");
            }

            console.log('Selected mint function:', mintFunction);

            const itemPrice = mohData.find((item) => item.title === medalType).price.split(" ")[0];
            console.log('Item price:', itemPrice);
            
            const price = ethers.utils.parseUnits(
                itemPrice,
                "ether"
            );
            
            console.log('Converted price:', price.toString());

            const transaction = await mintFunction(ipfsHash, {
            value: price,
            gasLimit: 650000,
        });
        
        console.log('Transaction sent:', transaction);
        
         const receipt = await transaction.wait();
    console.log('Transaction confirmed:', receipt);

    alert("Your Medal Of Honor was forged successfully!");

  } catch (error) {
    console.error("Forge failed", error);
    console.log("Error object:", error);

    if (error.code === 4001) {
      // denied transaction signature
      setError("You rejected the transaction, signature denied.");
      
    } else {
      setError("Error while forging Medal");
    }
    setOpenError(true);
  }
};
 


 return (
  <div className={Style.theForge_container}>
    {openError && (
      <div className={Style.errorMessage}>
        {errorMessage}
        <button onClick={() => setOpenError(false)}>Close</button>
      </div>
    )}

    <div className={Style.theForge}>
      {mohData.map((item, index) => (
        <div key={index} className={Style.card}>
          <div className={Style.card_left}>
            <h2>{item.title}</h2>
          </div>

          <div className={Style.card_right}>
            <div className={Style.card_right_top}>
              <ReactPlayer
                url={item.nftVideo}
                alt="NFT Video"
                muted
                width="100%"
                loop
                controls
                className={Style.card_right_top_video}
              />
            </div>

            <div className={Style.card_right_bottom}>
              <div className={Style.card_right_bottom_bidding}>
                <div className={Style.card_right_bottom_bidding_box_timer}>
                  <div className={Style.card_right_bottom_bidding_box_timer_item}>
                    <span>FORGED</span>
                    <p>{mintedCounts[item.title]}</p>
                  </div>

                  <div className={Style.card_right_bottom_bidding_box_timer_item}>
                    <span>AVAILABLE</span>
                    <p>{item.inventory.available}</p>
                  </div>
                </div>
                <div className={Style.car_right_box_price}>
                  <div className={Style.card_right_box_price_box}>
                    <small>FORGE PRICE</small>
                    <p>{item.price}</p>
                  </div>
                </div>

                <div className={Style.card_right_bottom_button}>
                  <Button
                    btnName="FORGE"
                    handleClick={() => mint(item.title, item.ipfsHash)}
                  />

                  <div className={Style.sliderCard_box_price_box_btn_btn}>
                    <Link href={{ pathname: "/NFTDetails", query: idNumber }} key={`${idNumber}`}>
                      <button className={Style.detailsButton}>DETAILS</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);



};

export default TheForge;