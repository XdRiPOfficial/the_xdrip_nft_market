
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import Img from "next/image";
//INTRNAL IMPORT
import Style from "./DropZone.module.css";
import images from "../../img";



const DropZone = ({
  title,
  heading,
  subHeading,
  name,
  website,
  description,
  royalties,
  fileSize,
  setFileSize,
  properties,
  price,
  uploadToIPFS,
  category,
  setImage,
  setFileType,
  fileType,
  setPreviewMedia, 
  setPreviewFileType,
  editions,
}) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [localFileSize, setLocalFileSize] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  const onDrop = useCallback(
  async (acceptedFile) => {
    console.log(acceptedFile);
    const file = acceptedFile[0];
    setIsLoading(true);
    setLocalFileSize(file.size);

    const url = await uploadToIPFS(file);
    setFileUrl(url);
    setImage(url, file.type);
    setImagePreview(URL.createObjectURL(file));
    setFileType(file.type);   
   
    console.log(url);
    setIsLoading(false);
  },
  [setImage, 
  setImagePreview, 
  uploadToIPFS, 
  setFileType, 
  setFileSize, 
  setPreviewMedia, 
  setPreviewFileType]
);

 
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
     accept: "image/*,video/mp4,video/webm,video/mpeg,video/mpg,video/wmv,video/quicktime,video/ogg,audio/*",

    maxSize: 250000000,
  });
  
  
  const handleInputValue = (input) => {
  if (typeof input === "string" && input.endsWith("%")) {
    return parseFloat(input.slice(0, -1)) / 100;
  } else {
    return parseFloat(input);
  }
};

const formatFileSize = (size) => {
  if (!size) return null;
  if (size < 1024) return `${size} bytes`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};
  
  
  
  const renderMediaPreview = () => {
  if (!fileType) {
    return null;
  }

  if (fileType.startsWith("image")) {
    return (
      <img
        src={imagePreview}
        alt="nft preview"
        style={{
          maxWidth: "400px",
          maxHeight: "400px",
          width: "auto",
          height: "auto",
        }}
        className={Style.DropZone_box_input_img_img}
      />
    );
  } else if (fileType.startsWith("video")) {
    return (
      <video
        src={imagePreview}
        type={fileType}
        controls
        style={{
          maxWidth: "400px",
          maxHeight: "400px",
          width: "auto",
          height: "auto",
        }}
        className={Style.DropZone_box_input_img_img}
      />
    );
  } else if (fileType.startsWith("audio")) {
    return (
      <>
        <img
          src="/mp3.jpg"
          alt="mp3 preview"
          style={{
            maxWidth: "400px",
            maxHeight: "400px",
            width: "auto",
            height: "auto",
          }}
          className={Style.DropZone_box_input_img_img}
        />
        <audio
          src={imagePreview}
          controls
          
          style={{
            maxWidth: "400px",
            maxHeight: "400px",
            width: "auto",
            height: "auto",
          }}
          className={Style.DropZone_box_input_img_img}
        />
      </>
    );
  } else {
    return <div>Invalid file type</div>;
  }
};


  return (
  <div className={Style.DropZone}>
    <div className={Style.DropZone_box} {...getRootProps()}>
      <input {...getInputProps()} />
      <div className={Style.DropZone_box_input}>
        <p>{title}</p>
        <div className={Style.DropZone_box_input_img}>
          <Image
            src={images.upload}
            alt="upload"
            width={100}
            height={100}
            style={{ objectFit: "cover" }}
            className={Style.DropZone_box_input_img_img}
          />
        </div>
        <p>{heading}</p>
        <p>{subHeading}</p>
      </div>
    </div>

{/*
{isLoading && (
  <div >
    Loading...
  </div>
)}
*/}



 {isLoading && (
  <div className={Style.loadingContainer}>
    <img
      src="/loading-spinner.gif"
      alt="Loading..."
      className={Style.loadingSpinner}
    />
    <p className={Style.loadingText}>Loading...</p>
  </div>
)}



    {imagePreview && (
      <aside className={Style.DropZone_box_aside}>
        <div className={Style.DropZone_box_aside_box}>
          
        {/*}
          <img
            src={imagePreview}
            alt="nft preview"
            style={{
              maxWidth: "400px",
              maxHeight: "400px",
              width: "auto",
              height: "auto",
            }}
            className={Style.DropZone_box_input_img_img}
          />
        */}
          
          
          {renderMediaPreview()}         
          

          <div className={Style.DropZone_box_aside_box_preview}>
            <div className={Style.DropZone_box_aside_box_preview_one}>
              <p>NFT Name : {name || ""}</p>
              <p>CATEGORY : {category || ""}</p>
            </div>

            <div className={Style.DropZone_box_aside_box_preview_two}>
              <p>Royalties : {royalties ? handleInputValue(royalties) : ""}</p>
              <p>Price : {price ? handleInputValue(price) : ""}</p>
              <p>FileSize : {formatFileSize(localFileSize)}</p>
              <p>Properties : {properties || ""}</p>
              <p>Website : {website || ""}</p>
            </div>

            <div className={Style.DropZone_box_aside_box_preview_three}>
              <p>Description : {description || ""}</p>
            </div>
          </div>
        </div>
      </aside>
    )}
  </div>
);

};

export default DropZone;