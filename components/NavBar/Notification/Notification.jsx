import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useAddress } from "@thirdweb-dev/react";
import Img from "next/image";

//INTERNAL IMPORT
import Style from "./Notification.module.css";
import images from "../../../img";
import { getUserProfile } from '../../../firebase/services';


const Notification = ({
  isNavbarDocked,
  currentAccount
}) => {

  const address = useAddress();
  const [user, setUser] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      if (address) { 
        const userData = await getUserProfile(address); 
        setUser(userData);
      }
    }
    
    fetchUserData();
  }, [address]); 


  return (
    <div className={`${Style.notification} ${isNavbarDocked ? "" : Style.notificationUndocked}`}>
      
      <div className={Style.notification_box}>
        <div className={Style.notification_box_img}>
          <div className={Style.notification_img_wrapper}>
          {user && (
            <Img
              src={user.profilePictureUrl}
              className={Style.notification_img_wrapper_img}
              alt="User Profile"
              width={50}
              height={50}
            />
          )}
          </div>
        </div>
        <div className={Style.notification_box_info}>
          <h4>{user.username}</h4>
          <p>Not Sleeping</p>
          <small>24hrs a day</small>
        </div>
        <span className={Style.notification_box_new}></span>
      </div>
    </div>
  );
};

export default Notification;