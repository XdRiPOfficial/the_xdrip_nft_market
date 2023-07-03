import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useAddress } from "@thirdweb-dev/react";
import { getStorage, } from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaFacebookF, FaTwitter, FaInstagram, FaTiktok, FaDiscord } from "react-icons/fa";


import Style from "../styles/editProfile.module.css";
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
  const [message, setMessage] = useState("");


  const handleClick = async (event) => {
    event.preventDefault();

    try {
      if (selectedFile) {
        await updateUserProfilePicture(address, selectedFile);
        toast.success('Profile picture updated successfully', {

        });
      } else {
        toast.error('No image selected', {

        });
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
      toast.error('Error updating profile picture', {
        
      });
    }
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
          setWebsite(userProfile.website)
          setFacebook(userProfile.socials.facebook);
          setTikTok(userProfile.socials.tiktok);
          setInstagram(userProfile.socials.instagram);
          setTwitter(userProfile.socials.twitter);
          setDiscord(userProfile.socials.discord);
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
          {message && <div className={Style.message}>{message}</div>}
          <div className={Style.pfp_button}>
            <button className={Style.pfp_button_button} onClick={handleClick}>UPDATE IMAGE</button>
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
            <div className={Style.account_website}>
              <p>WEBSITE</p>
              <small>{website}</small>
            </div>
            <div className={Style.account_socials}>
              <p>SOCIALS</p>
              <div className={Style.social_icons}>
                {facebook && (
                  <a href={facebook} target="_blank" rel="noopener noreferrer">
                    <FaFacebookF />
                  </a>
                )}
                {twitter && (
                  <a href={twitter} target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                  </a>
                )}
                {instagram && (
                  <a href={instagram} target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                  </a>
                )}
                {tiktok && (
                  <a href={tiktok} target="_blank" rel="noopener noreferrer">
                    <FaTiktok />
                  </a>
                )}
                {discord && (
                  <a href={discord} target="_blank" rel="noopener noreferrer">
                    <FaDiscord />
                  </a>
                )}
              </div>
            </div>


            <div className={Style.account_wallet}>
              <p>CONNECTED WALLET</p>
              <small
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
              username={username}
              email={email}
              website={website}
              facebook={facebook}
              twitter={twitter}
              instagram={instagram}
              tiktok={tiktok}
              discord={discord}
              isCreator={isCreator}


            />
          </div>
        </div>
      </div>
      <ToastContainer
        position={toast.POSITION.TOP_CENTER}
        className={Style.toast_container_center}
      />
    </div>
  );
};

export default Account;
