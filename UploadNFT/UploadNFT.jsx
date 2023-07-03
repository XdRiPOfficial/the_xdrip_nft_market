import React, { useState, useEffect } from "react";
import { MdOutlineHttp, MdOutlineAttachFile } from "react-icons/md";
import { FaPercent } from "react-icons/fa";
import { AiTwotonePropertySafety } from "react-icons/ai";
import { useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import { NFTStorage } from "nft.storage";

//INTERNAL IMPORT
import Style from "./Upload.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import images from "../img";
import { Button } from "../components/componentsindex.js";
import { DropZone } from "./uploadNFTIndex.js";
import { getUserCollections } from "../firebase/services";
import NFTPreview from "./NFTPreview";
import { useRouter } from 'next/router';

const UploadNFT = ({ createNFT, connectedWallet }) => {
  const [price, setPrice] = useState("");
  const [active, setActive] = useState(0);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [royalties, setRoyalties] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [category, setCategory] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");
  const [collectionName, setCollectionName] = useState(0);
  const [properties, setProperties] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [fileType, setFileType] = useState(null);
  const [userCollections, setUserCollections] = useState([]);
  const walletAddress = useAddress();
  const router = useRouter();


  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  useEffect(() => {
    const fetchUserCollections = async () => {
      if (walletAddress) {
        const userCollections = await getUserCollections(walletAddress);
        setUserCollections(userCollections);
      }
    };

    fetchUserCollections();
  }, [walletAddress]);

  const categoryArry = [
    {
      image: images.category_art,
      category: "ART",
    },
    {
      image: images.category_gaming,
      category: "GAMING",
    },
    {
      image: images.category_metaverse,
      category: "METAVERSE",
    },
    {
      image: images.category_photography,
      category: "PHOTOGRAPHY",
    },
    {
      image: images.category_sports,
      category: "SPORTS",
    },
  ];

  const [isLoading, setIsLoading] = useState(false);

  const uploadToIPFS = async (file) => {
    const apiKey = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY;
    const client = new NFTStorage({ token: apiKey });

    try {
      console.log("Uploading to nft.storage...");
      const content = await client.storeBlob(new Blob([file], { type: file.type }));

      console.log("Upload complete, content:", content);
      console.log("Content CID:", content);

      const ipfsMediaUrl = `https://${content}.ipfs.nftstorage.link`;

      console.log("Generated IPFS Media URL:", ipfsMediaUrl);
      if (ipfsMediaUrl.includes("undefined")) {
        console.error("Error: IPFS URL contains 'undefined'");
      } else {
        setImage(ipfsMediaUrl);
        setImagePreview(URL.createObjectURL(file)); // set image preview

        return ipfsMediaUrl;
      }
    } catch (error) {
      console.error("Error uploading Media to nft.storage:", error);
    }
  };




  return (
    <div className={Style.upload}>
      <div className={Style.right_box}>
        <div className={Style.upload_box}>
          <div className={formStyle.Form_box_input}>
            <label htmlFor="nft">NFT NAME</label>
            <input
              type="text"
              placeholder="ENTER NFT NAME"
              className={formStyle.Form_box_input_userName}
              onChange={(e) => setName(e.target.value)}
            />
          </div>


          <div className={formStyle.Form_box_input}>
            <label htmlFor="name">CHOOSE CATEGORY</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">SELECT A CATEGORY FOR YOUR NFT</option>
              {categoryArry.map((el, i) => (
                <option key={i} value={el.category}>
                  {el.category}
                </option>
              ))}
            </select>

          </div>
          <div className={formStyle.Form_box_input}>
            <label htmlFor="name">CHOOSE COLLECTION</label>
            <select
              value={collectionName}
              onChange={(e) => {
                const selectedValue = e.target.value;
                if (selectedValue === 'new') {
                  router.push('/createCollectionPage');
                } else if (selectedValue === 'start' || selectedValue === 'none') {
                  setCollectionName(null);
                } else {
                  setCollectionName(selectedValue);
                }
              }}
            >
              <option value="start">SELECT AN EXISTING COLLECTION OR CREATE A NEW ONE</option>
              <option value="new">CREATE A NEW COLLECTION</option>
              <option value="none">NO COLLECTION</option>
              {userCollections &&
              userCollections.map((userCollection, i) => (
                <option key={i} value={userCollection.collectionName}>
                  {userCollection.collectionName}
                </option>
              ))}
            </select>
          </div>




          <div className={formStyle.Form_box_input}>
            <label htmlFor="website">YOUR WEBSITE</label>
            <div className={formStyle.Form_box_input_box}>


              <input
                type="text"
                placeholder="ENTER YOUR WEBSITE"
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <p className={Style.upload_box_input_para}>
              A link to this URL will be included on this items detail page.
            </p>
          </div>

          <div className={formStyle.Form_box_input}>
            <label htmlFor="description">NFT DESCRIPTION</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="6"
              placeholder="TELL US ABOUT YOUR NFT AND WHAT MAKES IT XCELLENT"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <p>
              This description will be displayed on your NFT card and NFT detail page. Markdown syntex is supported.             </p>
          </div>



          <div className={formStyle.Form_box_input_social}>
            <div className={formStyle.Form_box_input}>
              <label htmlFor="Royalties">ROYALTIES</label>
              <div className={formStyle.Form_box_input_box}>
                <div className={formStyle.Form_box_input_box_icon}>
                  <FaPercent />
                </div>
                <input
                  type="text"
                  placeholder="%"
                  onChange={(e) => setRoyalties(e.target.value)}
                />
              </div>
            </div>

            <div className={formStyle.Form_box_input}>
              <label htmlFor="size">FILE SIZE</label>
              <div className={formStyle.Form_box_input_box}>
                <div className={formStyle.Form_box_input_box_icon}>
                  <MdOutlineAttachFile />
                </div>
                <input
                  type="text"
                  placeholder="MB"
                  onChange={(e) => setFileSize(e.target.value)}
                />
              </div>
            </div>
            <div className={formStyle.Form_box_input}>
              <label htmlFor="Properties">NFT PROPERTIES</label>
              <div className={formStyle.Form_box_input_box}>
                <div className={formStyle.Form_box_input_box_icon}>
                  <AiTwotonePropertySafety />
                </div>
                <input
                  type="text"
                  placeholder="Properties"
                  onChange={(e) => setProperties(e.target.value)}
                />
              </div>
            </div>

            <div className={formStyle.Form_box_input}>
              <label htmlFor="Price">PRICE</label>
              <div className={formStyle.Form_box_input_box}>
                <div className={formStyle.Form_box_input_box_icon}>
                  <AiTwotonePropertySafety />
                </div>
                <input
                  type="text"
                  placeholder="Price in BNB"
                  value={price}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Only allow numeric and decimal point characters
                    const newValue = value.replace(/[^0-9.]/g, "");
                    // Ensure that there is only one decimal point
                    const decimalIndex = newValue.indexOf(".");
                    if (decimalIndex !== -1) {
                      const decimalCount = newValue.slice(
                        decimalIndex + 1
                      ).length;
                      if (decimalCount > 4) {
                        return;
                      }
                    }
                    setPrice(newValue.toString());
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={Style.upload_dropzone}>
        <div className={Style.upload_dropzone_title}>
          <h2> IMAGE, VIDEO, AUDIO, OR 3D MODEL</h2>
        </div>
        <DropZone
          title="JPG, GIF, PNG, MP4, MP3, MOV, WMV, MPEG, WEBM, MAX 250MB"
          heading="DRAG AND DROP VIDEO / AUDIO MEDIA FILE OR"
          subHeading="CLICK TO BROWSE YOUR DEVICE"
          name={name}
          price={price}
          description={description}
          category={category}
          collectionName={collectionName}
          website={website}
          royalties={royalties}
          properties={properties}
          setImage={setImage}
          uploadToIPFS={uploadToIPFS}
          setImagePreview={setImagePreview}
          imagePreview={imagePreview}
          fileSize={fileSize}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setFileType={setFileType}
          fileType={fileType}
        />
        <NFTPreview
          show={showPreview}
          onClose={togglePreview}
          imagePreview={imagePreview}
          name={name}
          collection={collectionName}
          category={category}
          royalties={royalties}
          price={price}
          fileSize={fileSize}
          properties={properties}
          website={website}
          description={description}
          mediaPreview={imagePreview}
          fileType={fileType}
        />
      </div>
      <div className={Style.upload_box_btn}>
        <Button
          btnName="UPLOAD YOUR NFT"
          handleClick={async () => {
            console.log('Data being sent to createNFT:', {
              name,
              price,
              description,
              category,
              website,
              royalties,
              properties,
              image,
              collectionName,
              walletAddress,
            });

            createNFT(
              name,
              price,
              description,
              category,
              website,
              royalties,
              properties,
              image,
              walletAddress,
              collectionName,

            );
          }}
          classStyle={Style.upload_box_btn_style}
        />
        <Button
          btnName="PREVIEW YOUR NFT"
          handleClick={togglePreview}
          classStyle={Style.upload_box_btn_style}
        />
      </div>
    </div>
  );
};


export default UploadNFT;