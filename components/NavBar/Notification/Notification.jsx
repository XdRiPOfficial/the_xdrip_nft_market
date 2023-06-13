import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Notification.module.css";
import images from "../../../img";


const Notification = ({
  isNavbarDocked,
}) => {

  return (
    <div className={`${Style.notification} ${isNavbarDocked ? "" : Style.notificationUndocked}`}>
      {/*<p>NOTIFICATION</p>*/}
      <div className={Style.notification_box}>
        <div className={Style.notification_box_img}>
          <div className={Style.notification_img_wrapper}>
            <Image
              src={images.user1}
              alt="profile image"
              width={50}
              height={50}
              className={Style.notification_box_img}
            />
          </div>
        </div>
        <div className={Style.notification_box_info}>
          <h4>XDRIPPER</h4>
          <p>LAST USER ACTION</p>
          <small>3 MINUTES AGO</small>
        </div>
        <span className={Style.notification_box_new}></span>
      </div>
    </div>
  );
};

export default Notification;