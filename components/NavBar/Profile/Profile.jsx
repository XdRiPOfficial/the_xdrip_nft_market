import dynamic from "next/dynamic";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { FaUserAlt, FaRegImage, FaUserEdit, FaPlus } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { TbDownloadOff, TbDownload } from "react-icons/tb";
import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import { ConnectWallet } from "@thirdweb-dev/react";

import styles from "./Profile.module.css";
import LoginAndSignUp from "../../../loginAndSignUp/LoginAndSignUp.jsx";

const Profile = ({
  isNavbarDocked,
  currentAccount,
  closeMenu,
  isWalletConnected,
  disconnectWallet,
  setIsProfileMenuOpen,
  setProfileImageSrc,
  isLoginAndSignUpOpen,
  setIsLoginAndSignUpOpen,
}) => {

  const { account, library } = useWeb3React();

  const handleProfilePictureChange = async (file) => {
    try {
      const url = await uploadProfilePicture(file);
      setProfileImageSrc(url);
      setMessage("Profile picture uploaded successfully!");

      // Update user's profile picture in the Firebase database
      await updateUser(currentAccount, { profilePicture: url });
    } catch (error) {
      console.log(error);
      setMessage("Failed to upload profile picture!");
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setIsProfileMenuOpen(false); // close the profile menu
    if (closeMenu) closeMenu(); // close the parent menu if it exists
    setProfileImageSrc("/default-user.png"); // Set the default image when wallet disconnects
  };
  const [balance, setBalance] = React.useState("0");

  React.useEffect(() => {
    if (account && library) {
      library
        .getBalance(account)
        .then((balance) => {
          setBalance(library.utils.fromWei(balance));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [account, library]);

  return (
    <>
      {isLoginAndSignUpOpen && (
        <LoginAndSignUp
          currentAccount={currentAccount}
          setProfileImageSrc={setProfileImageSrc} // pass the function as a prop
        />
      )}
      <div className={`${styles.profile} ${isNavbarDocked ? "" : styles.profileUndocked}`}>
        <div className={styles.profileContainer}>
          <div className={styles.profileBox}>
            <div className={styles.profileItems}>
              <div className={styles.linkContainer}>
                <Link href={isWalletConnected ? "/author" : "/loginandsignup"}>
                  <a onClick={() => setIsProfileMenuOpen(false)} className={styles.linkA}>
                    <span className={styles.linkText}>{isWalletConnected ? 'My Profile' : 'Login'}</span>
                    <FaUserAlt className={styles.icon}/>
                  </a>
                </Link>
              </div>
              {isWalletConnected && (
                <div className={styles.linkContainer}>
                  <Link href="/account">
                    <a onClick={() => setIsProfileMenuOpen(false)} className={styles.linkA}>
                      <span className={styles.linkText}>Edit Profile</span>
                      <FaUserEdit className={styles.icon} />
                    </a>
                  </Link>
                </div>
              )}
              <div className={styles.linkContainer}>
                <Link href="/createButtonsPage">
                  <a onClick={() => setIsProfileMenuOpen(false)} className={styles.linkA}>
                    <span className={styles.linkText}>Create NFT/Collection</span>
                    <FaPlus className={styles.icon} />
                  </a>
                </Link>
              </div>
            {isWalletConnected && (
              <div className={styles.linkContainer} onClick={handleDisconnect}>
                <a className={styles.linkA}>
                  <span className={styles.linkText}>
                    Disconnect Wallet
                  </span>
                  <TbDownloadOff className={styles.icon} />
                </a>
              </div>
            )}
            </div>
          </div>
          <div className={styles.profileUpgrade}>
            {isWalletConnected && (
              <div>{/* Render wallet information */}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;