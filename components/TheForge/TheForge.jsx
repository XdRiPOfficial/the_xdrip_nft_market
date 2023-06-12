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
            title: "RARE ",
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
            title: "EPIC ",
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
            title: "LEGENDARY ",
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

    const mint = async (medalType, ipfsHash) => {
        try {
            if (!address) {
                window.ethereum.enable();
                return;
            }
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = fetchMohContract(signer);

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

            const price = ethers.utils.parseUnits(
                mohData[idNumber].price.split(" ")[0],
                "ether"
            );
            const transaction = await mintFunction(ipfsHash, {
                value: price,
                gasLimit: 500000,
            });
            await transaction.wait();
            alert("Your Medal Of Honor was minted successfully!");
        } catch (error) {
            console.error("Minting failed", error);
            alert("Minting failed. Please try again.");
        }
    };

    return (
        <div className={Style.theForge_container}>
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
                                    width='100%'
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
                                            <p>{item.inventory.forged}</p>
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