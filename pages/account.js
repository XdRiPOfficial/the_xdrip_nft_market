import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useAddress } from "@thirdweb-dev/react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase/config';
import { doc, updateDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/config";
import { addUser, getUser, updateUser } from "../firebase/services";


import Style from "../styles/account.module.css";
import images from "../img";
import Form from "../AccountPage/Form/Form";

import { updateUserProfilePicture, getUserProfile } from '../firebase/services';

const Account = () => {
  const storage = getStorage();
  const [profileImage, setProfileImage] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [facebook, setFacebook] = useState("");
  const [tiktok, setTikTok] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [website, setWebsite] = useState("");
  const [isCreator, setIsCreator] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showFullAddress, setShowFullAddress] = useState(false); // New state variable
  const address = useAddress();
  const [isAddressCopied, setIsAddressCopied] = useState(false);
 
  

  const uploadNewProfilePicture = async () => {
    if (!selectedFile) return;

    const fileRef = ref(storage, `profileImages/${selectedFile.name}`);
    await uploadBytes(fileRef, profileImage);
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

  const handleMouseEnter = () => {
    setShowFullAddress(true);
  };

  const handleMouseLeave = () => {
    setShowFullAddress(false);
  };

  const truncateAddress = (address) => {
    if (!address) return ""; // Add a check to handle undefined address
    if (showFullAddress) return address;

    const firstSix = address.substring(0, 6);
    const lastFour = address.substring(address.length - 4);
    return `${firstSix}...${lastFour}`;
  };

  const handleAddressClick = () => {
    navigator.clipboard.writeText(address);
    setIsAddressCopied(true);
  };


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
          setIsCreator(userProfile.isCreator);
        }


      }
    };

    fetchProfileData().catch(error => {
      console.error("An error occurred while fetching profile data:", error);
    });
  }, [address]);

 
  
  
  return (
    <div className={Style.account}>
      <div className={Style.account_box_box}>
        <div className={Style.account_info}>
          <div className={Style.account_pfp} {...getRootProps()}>
            <input {...getInputProps()} />
            {profilePictureUrl ? (
              <img src={profilePictureUrl} alt="profile" className={Style.account_box_pfp} />
            ) : (
              <Image
                src={images.user1}
                alt="account upload"
                objectFit="cover"
              />
            )}
          </div>
          <div className={Style.pfp_button}>
            <button className={Style.pfp_button_button} onClick={uploadNewProfilePicture}>UPDATE IMAGE</button>
          </div>
          <div className={Style.settings}>
            <h1>CURRENT SETTINGS</h1>
          </div>
          <div className={Style.account_info_box}>
            <div className={Style.account_username}>
              <p>USERNAME</p>
              <small>{username}</small>
            </div>
            <div className={Style.account_email}>
              <p>EMAIL</p>
              <small>{email}</small>
            </div>
            <div className={Style.account_email}>
              <p>CREATOR</p>
              <small>{isCreator ? "Yes" : "No"}</small>
            </div>
            <div className={Style.account_email}>
              <p>WEBSITE</p>
              <small>{website}</small>
            </div>
            <div className={Style.account_socials}>
              <p>SOCIALS</p>
              <small>{facebook}</small>
              <small>{twitter}</small>
              <small>{instagram}</small>
              <small>{tiktok}</small>
              <small>{discord}</small>
            </div>
            <div className={Style.account_wallet}>
              <p>CONNECTED WALLET</p>
              <small
                className={isAddressCopied ? Style.address_copied : null}
                onClick={handleAddressClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {showFullAddress ? address : truncateAddress(address)}
              </small>

            </div>
          </div>
        </div>

        <div className={Style.account_box}>
          <div className={Style.account_box_box_box}>
            <div className={Style.profile}>
              <h1>UPDATE PROFILE INFORMATION</h1>
            </div>


            <Form
            
              setUsername={setUsername}
              setEmail={setEmail}
              username={username}
              email={email}
              website={website}
              facebook={facebook}
              twitter={twitter}
              instagram={instagram}
              tiktok={tiktok}
              discord={discord}
              setWebsite={setWebsite}
              setFacebook={setFacebook}
              setTwitter={setTwitter}
              setInstagram={setInstagram}
              setTikTok={setTikTok}
              setDiscord={setDiscord}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
