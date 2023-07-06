import React, { useState, useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { getUserProfile } from "../../firebase/services";
import { MdVerified } from "react-icons/md";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaDiscord,
} from "react-icons/fa";
import Style from "./AuthorProfileCard.module.css";

const AuthorProfileCard = ({currentAccount}) => {
  const [user, setUser] = useState(null);
  const [share, setShare] = useState(false);
  const [report, setReport] = useState(false);
  const address = useAddress();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [facebook, setFacebook] = useState(null);
  const [tiktok, setTikTok] = useState(null);
  const [instagram, setInstagram] = useState(null);
  const [twitter, setTwitter] = useState(null);
  const [discord, setDiscord] = useState(null);
  const [website, setWebsite] = useState("");
  const [isCreator, setIsCreator] = useState("");
  const [showFullAddress, setShowFullAddress] = useState(false); // New state variable

  useEffect(() => {
    const fetchUserData = async () => {
      if (address) {
        const userData = await getUserProfile(address);
        console.log("Fetched user data:", userData); // Log the fetched user data
        setUser(userData);
        
        if (userData && userData.socials) {
          const { facebook, twitter, instagram, tiktok, discord } = userData.socials;
          setFacebook(facebook);
          setTwitter(twitter);
          setInstagram(instagram);
          setTikTok(tiktok);
          setDiscord(discord);
        }
      }
    };

    fetchUserData();
  }, [address]);

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

  return (
    <div className={Style.AuthorProfileCard}>
      <div className={Style.AuthorProfileCard_box}>
        <div className={Style.AuthorProfileCard_box_img}>
          {user && (
            <img
              src={user.profilePictureUrl}
              className={Style.AuthorProfileCard_box_img_img}
              alt="User Profile"
            />
          )}
          
        </div>
        {user && (
            <>
        <div className={Style.AuthorProfileCard_username}>
    
                <h2>
                  {user.username}{" "}
                  <span>
                    <MdVerified />
                  </span>{" "}
                </h2>
              </div>
                      </>
          )}
        <div className={Style.settings}>
          <h1>MY PROFILE</h1>
        </div>

        <div className={Style.AuthorProfileCard_box_info}>
          {user && (
            <>
              
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

              <div className={Style.account_email}>
                <p>EMAIL</p>
                <small>{user.email} </small>
              </div>

              <div className={Style.account_email}>
                <p>CREATOR</p>
                <small>{user.isCreator ? "Yes" : "No"}</small>
              </div>

              <div className={Style.account_email}>
                <p>COLLECTIONS CREATED</p>
                <small>{user.collectionsCreated.length}</small>
              </div>

              <div className={Style.account_email}>
                <p>NFTS LISTED</p>
                <small>{user.nftsListed.length}</small>
              </div>

              <div className={Style.account_email}>
                <p>NFTS SOLD</p>
                <small>{user.nftsSold.length || 0}</small>
              </div>

              <div className={Style.account_email}>
                <p>WEBSITE</p>
                <small>{user.website}</small>
              </div>

              <div className={Style.account_socials}>
                <p>SOCIALS</p>
                <div className={Style.social_icons}>
                  {facebook && (
                    <a
                      href={facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebookF />
                    </a>
                  )}
                  {twitter && (
                    <a
                      href={twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitter />
                    </a>
                  )}
                  {instagram && (
                    <a
                      href={instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
              <div className={Style.account_blank}>
        
              </div>

            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfileCard;
