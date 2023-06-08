import React, { useState, useEffect, useContext } from "react";
import {
  FaFilter,
  FaAngleDown,
  FaAngleUp,
  FaWallet,
  FaMusic,
  FaVideo,
  FaImages,
  FaUserAlt,
} from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import Style from "./Filter2.module.css";
import Loader from "../Loader/Loader";
import NFTCardTwo from "../../collectionPage/NFTCardTwo/NFTCardTwo";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import images from "../../img";
import Image from "next/image";

const Filter2 = () => {
  const [filter, setFilter] = useState(true);
  const [image, setImage] = useState(true);
  const [video, setVideo] = useState(true);
  const [music, setMusic] = useState(true);
  const [priceRange, setPriceRange] = useState("");
  const { fetchNFTs, setError, currentAccount } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [category, setCategory] = useState("nfts");
  const [selectedCategoryData, setSelectedCategoryData] = useState([]);
  const [fileTypes, setFileTypes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchNFTs();
        setNfts(items.reverse());
        setNftsCopy(items);
        setSelectedCategoryData(items);
      } catch (error) {
        setError("Please reload the browser", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchFileTypes = async () => {
      let fileTypesObj = {};

      const savedData = localStorage.getItem("fileTypesObj");
      if (savedData) {
        fileTypesObj = JSON.parse(savedData);
      }

      for (const el of selectedCategoryData) {
        if (!fileTypesObj[el.image]) {
          try {
            const response = await fetch(el.image);
            const contentType = response.headers.get("content-type");
            fileTypesObj[el.image] = contentType;
          } catch (error) {
            console.log(error);
          }
        }
      }

      localStorage.setItem("fileTypesObj", JSON.stringify(fileTypesObj));

      setFileTypes(fileTypesObj);
      setLoading(false);
    };

    fetchFileTypes();
  }, [selectedCategoryData]);

  useEffect(() => {
    switch (category) {
      case "nfts":
        setSelectedCategoryData(nftsCopy);
        break;
      case "ART":
        setSelectedCategoryData(nfts.filter((nft) => nft.category === "ART"));
        break;
      case "GAMING":
        setSelectedCategoryData(nfts.filter((nft) => nft.category === "GAMING"));
        break;
      case "SPORTS":
        setSelectedCategoryData(nfts.filter((nft) => nft.category === "SPORTS"));
        break;
      case "METAVERSE":
        setSelectedCategoryData(nfts.filter((nft) => nft.category === "METAVERSE"));
        break;
      case "PHOTOGRAPHY":
        setSelectedCategoryData(nfts.filter((nft) => nft.category === "PHOTOGRAPHY"));
        break;
      default:
        setSelectedCategoryData(nftsCopy);
    }
  }, [category, nfts, nftsCopy]);

  const priceRanges = [
    { label: "0.0 - .20 BNB", min: 0.0, max: .20 },
    { label: ".20 - .50 BNB", min: .20, max: .50 },
    { label: ".50 - 1.0 BNB", min: .50, max: 1.00 },
    { label: "1.0 - 5.0 BNB", min: 1.00, max: 5.00 },
    { label: "5.0 - 10.0 BNB", min: 5.00, max: 10.00 },
  ];


  return (
    <div className={Style.filter2}>
      <div className={Style.filter2_box}>
        <div className={Style.filter2_box_left}>
          <button onClick={() => setCategory("nfts")}>ALL NFTs</button>
          <button onClick={() => setCategory("ART")}>ART</button>
          <button onClick={() => setCategory("GAMING")}>GAMING</button>
          <button onClick={() => setCategory("SPORTS")}>SPORTS</button>
          <button onClick={() => setCategory("METAVERSE")}>METAVERSE</button>
          <button onClick={() => setCategory("PHOTOGRAPHY")}>PHOTOGRAPHY</button>
        </div>

        <div className={Style.filter2_box_right}>
          <div className={Style.filter2_box_right_box} onClick={() => setFilter(!filter)}>
            <FaFilter />
            <span>FILTER</span> {filter ? <FaAngleDown /> : <FaAngleUp />}
          </div>
        </div>
      </div>

      {filter && (
        <div className={Style.filter2_box_items}>
          <div className={Style.filter2_box_items_box}>
            
              <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                <option value="">Select Price Range (ALL)</option>
                {priceRanges.map((range) => (
                  <option key={range.label} value={range.label}>
                    {range.label}
                  </option>
                ))}
              </select>

            
          </div>





          <div className={Style.filter2_box_items_box}>
            <div className={Style.filter2_box_items_box_item_trans} onClick={() => setImage(!image)}>
              <FaImages /> <small>IMAGES</small>
              {image ? <TiTick /> : <AiFillCloseCircle />}
            </div>
          </div>

          <div className={Style.filter2_box_items_box}>
            <div className={Style.filter2_box_items_box_item_trans} onClick={() => setVideo(!video)}>
              <FaVideo /> <small>VIDEOS</small>
              {video ? <TiTick /> : <AiFillCloseCircle />}
            </div>
          </div>

          <div className={Style.filter2_box_items_box}>
            <div
              className={Style.filter2_box_items_box_item_trans}
              onClick={() => setMusic(!music)}
            >
              <FaMusic /> <small>MUSIC</small>
              {music ? <TiTick /> : <AiFillCloseCircle />}
            </div>
          </div>

          <div className={Style.filter2_box_items_box}>
            <div className={Style.filter2_box_items_box_item}>
              <span>VERIFIED</span>
              <Image
                src={images.xm2}
                alt="NFT"
                width={25}
                height={25}
                objectFit="cover"
                className={Style.verified_img}
                controls
              />
            </div>
          </div>
        </div>
      )}


      <div className={Style.category_section}>
        {selectedCategoryData.length === 0 ? (
          <Loader />
        ) : (
          <NFTCardTwo
            NFTData={selectedCategoryData.filter((nft) => {
              const fileType = fileTypes[nft.image];
              if (!fileType) {
                return true;
              }
              const fileExtension = fileType.split("/")[1];
              if (
                (image &&
                  (fileExtension === "png" ||
                    fileExtension === "jpeg" ||
                    fileExtension === "bmp" ||
                    fileExtension === "tiff" ||
                    fileExtension === "xml" ||
                    fileExtension === "webp")) ||

                (video &&
                  (fileExtension === "mp4" ||
                    fileExtension === "gif" ||
                    fileExtension === "avi" ||
                    fileExtension === "mov" ||
                    fileExtension === "webm" ||
                    fileExtension === "wmv" ||
                    fileExtension === "flv" ||
                    fileExtension === "mkv" ||
                    nft.category === "VIDEO" ||
                    fileExtension === "m4v" ||
                    fileExtension === "3gp")) ||

                (music &&
                  (fileExtension === "mp3" ||
                    fileExtension === "ogg" ||
                    fileExtension === "wma" ||
                    fileExtension === "aac" ||
                    fileExtension === "wav" ||
                    fileExtension === "mpeg" ||
                    fileExtension === "mpg" ||
                    nft.category === "MUSIC" ||
                    fileExtension === "flac"))
              ) {
                  if (
                    !priceRange || // If no price range is selected
                    (priceRange === "All") || 
                  priceRange &&
                  parseFloat(nft.price) * 10 ** 9 >= priceRanges.find((range) => range.label === priceRange).min &&
                  parseFloat(nft.price) * 10 ** 9 <= priceRanges.find((range) => range.label === priceRange).max
                ) {
                  return true;
                }
              }
              return false;
            })}
          />
        )}
      </div>

    </div>
  );
};

export default Filter2;

