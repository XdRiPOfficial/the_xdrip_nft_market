import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import Style from "./AuthorCollections.module.css";
import images from "../../img";
import { Carousel } from 'react-round-carousel';
import { getUserProfile } from "../../firebase/services";

const AuthorCollections = ({ CollectionData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;
  const [fileTypes, setFileTypes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFileTypes = async () => {
      let fileTypesObj = {};

      const savedData = localStorage.getItem("fileTypesObj");
      if (savedData) {
        fileTypesObj = JSON.parse(savedData);
      }

      for (const el of CollectionData) {
        if (!fileTypesObj[el.featuredImageUrl]) {
          try {
            const response = await fetch(el.featuredImageUrl);
            const contentType = response.headers.get("content-type");
            fileTypesObj[el.featuredImageUrl] = contentType;
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
  }, [CollectionData]);

  useEffect(() => {
    const fetchUserProfiles = async () => {
      for (const el of CollectionData) {
        const userProfile = await getUserProfile(el.walletAddress);
        el.user = userProfile;
      }
    };

    fetchUserProfiles();
  }, [CollectionData]);

  const RenderDefault = () => (
    <Image
      src={images.invalidImage}
      alt="NFT"
      width={350}
      height={300}
      objectFit="cover"
      className={Style.NFTCardTwo_box_img_img}
      controls
    />
  );

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const collectionsData = CollectionData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className={Style.daysComponent}>
      {loading ? (
        <div className={Style.loading}>
          <p
            className={`${Style["loading-message"]} ${Style["loading-message-animate"]}`}
          >
            Loading XMARKET NFTs...
          </p>
        </div>
      ) : (
        <>
          <div className={Style.NFTCardTwo}>
            {collectionsData.map((el, i) => (
              <div className={Style.daysComponent_box} key={el.collectionName}>
                <div className={Style.daysComponent_box_img}>
                  <Image
                    src={el.featuredImageUrl}
                    alt="NFT"
                    width={300}
                    height={300}
                    className={Style.NFTCardTwo_box_img_img}
                  />
                </div>

                <div className={Style.daysComponent_box_titles}>
                  <div className={Style.daysComponent_box_title}>
                    <h2>{el.collectionName}</h2>
                    <div className={Style.daysComponent_box_title_info}>
                    <div className={Style.daysComponent_box_title_info_profile}>
                      <p> 
                        NFTS In Collection
                        <span>
                          <>
                            {el.tokenIds.length}
                          </>
                        </span>
                      </p>
                    </div>
                    </div>
                    <div className={Style.daysComponent_box_title_info}>
                      <div className={Style.daysComponent_box_title_info_profile}>
                        <p>
                          Creator
                          <span>
                            <>
                              {el.user.username}
                            </>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={Style.pagination}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>
            <span>
              {currentPage} of {Math.ceil(CollectionData.length / ITEMS_PER_PAGE)}
            </span>
            <button
              disabled={
                currentPage === Math.ceil(CollectionData.length / ITEMS_PER_PAGE)
              }
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthorCollections;
