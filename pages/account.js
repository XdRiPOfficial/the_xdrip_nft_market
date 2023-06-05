
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useAddress } from "@thirdweb-dev/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from '../firebase/config';

//import { getFirestore, doc, updateDoc, collection, query, where, getDocs, getDoc } from "firebase/firestore"; 
//import { firestore } from "../firebase/config";
import { updateUserProfilePicture, getUserProfile } from '../firebase/services';  // Import the getUserProfile function

import Style from "../styles/account.module.css";
import images from "../img";
import Form from "../AccountPage/Form/Form";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const Account = () => {
  const { currentAccount, connectWallet, openError } = useContext(NFTMarketplaceContext);
  const [profileImage, setProfileImage] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const address = useAddress();

  const uploadNewProfilePicture = async () => {
    if (!selectedFile) return;

    const fileRef = ref(storage, `profileImages/${selectedFile.name}`);
    await uploadBytes(fileRef, selectedFile);
    const imageUrl = await getDownloadURL(fileRef);
    await updateUserProfilePicture(address, imageUrl);

    setProfilePictureUrl(imageUrl);
  };

  const onDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
    setProfilePictureUrl(URL.createObjectURL(acceptedFiles[0]));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      if (address) {
        const userProfile = await getUserProfile(address);

        if (userProfile) {
          setUsername(userProfile.username);
          setEmail(userProfile.email);
          if (userProfile.profilePictureUrl) {
            setProfilePictureUrl(userProfile.profilePictureUrl);
          } else {
            setProfilePictureUrl(null);
          }
        }
      }
    };

    fetchProfileData().catch(error => {
      console.error("An error occurred while fetching profile data:", error);
    });
  }, [address]);

  return (
    <div className={Style.account}>
      <div className={Style.account_info}>
        <h1>PROFILE SETTINGS</h1>
        <p>Connected Wallet : {address}</p>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>CHOOSE A USER NAME, CONNECT YOUR WEBSITE, AND MANAGE PROFILE INFORMATION.</p>
        <button onClick={uploadNewProfilePicture}>Update Profile</button>
      </div>

      <div className={Style.account_box}>
        <div className={Style.account_box_img} {...getRootProps()}>
          <input {...getInputProps()} />
          {profilePictureUrl ? (
            <img src={profilePictureUrl} alt="profile" className={Style.account_box_img_img} />
          ) : (
            <Image
              src={images.user1}
              alt="account upload"
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>

        <Form setUsername={setUsername} setEmail={setEmail} />
      </div>
    </div>
  );
};

export default Account;
