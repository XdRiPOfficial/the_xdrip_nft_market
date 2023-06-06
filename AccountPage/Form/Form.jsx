import React, { useState } from "react";

import { useAddress } from "@thirdweb-dev/react";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineHttp, MdOutlineContentCopy } from "react-icons/md";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

import Style from "./Form.module.css";
import { Button } from "../../components/componentsindex.js";

const Form = (props) => {

  const [isCreator, setIsCreator] = useState(false); 
  const [showTooltip, setShowTooltip] = useState(false); 
  const connectedWalletAddress = useAddress();
  const handleCreatorChange = (event) => {
    setIsCreator(event.target.checked);
  };

  return (
  <div className={Style.Form}>
    <div className={Style.Form_box}>
      <form>
        <div className={Style.Form_box_input}>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            placeholder={props.username} // Set username as placeholder
            className={Style.Form_box_input_userName}
          />
        </div>

        <div className={Style.Form_box_input}>
          <label htmlFor="email">EMAIL</label>
          <div className={Style.Form_box_input_box}>
            <div className={Style.Form_box_input_box_icon}>
              <HiOutlineMail />
            </div>
            <input
              type="text"
              placeholder={props.email} // Set email as placeholder
            />
          </div>
        </div>

        <div className={Style.Form_box_input_creator}>
  <label htmlFor="creator">
    <span
      className={Style.tooltip}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      BECOME A CREATOR
      {showTooltip && (
        <span className={Style.tooltipText}>
          Unleash your creative potential, connect with a global audience, and monetize your unique content.
        </span>
      )}
    </span>
    <input
      type="checkbox"
      id="creator"
      checked={isCreator}
      onChange={handleCreatorChange}
    />
  </label>
</div>

        <div className={Style.Form_box_input}>
          <label htmlFor="website">WEBSITE</label>
          <div className={Style.Form_box_input_box}>
            <div className={Style.Form_box_input_box_icon}>
              <MdOutlineHttp />
            </div>
            <input type="text" placeholder="website" />
          </div>
        </div>

        <div className={Style.Form_box_input_social}>
          <div className={Style.Form_box_input}>
            <label htmlFor="facebook">FACEBOOK</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <FaFacebookF />
              </div>
              <input type="text" placeholder="http://facebook" />
            </div>
          </div>
          <div className={Style.Form_box_input}>
            <label htmlFor="Twitter">TWITTER</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <FaTwitter />
              </div>
              <input type="text" placeholder="http://twitter" />
            </div>
          </div>
          <div className={Style.Form_box_input}>
            <label htmlFor="Instagram">INSTAGRAM</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <FaInstagram />
              </div>
              <input type="text" placeholder="http://instagram" />
            </div>
          </div>
          <div className={Style.Form_box_input}>
            <label htmlFor="Tiktok">TIKTOK</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <FaInstagram />
              </div>
              <input type="text" placeholder="http://tiktok" />
            </div>
          </div>
        </div>

        <div className={Style.Form_box_input}>
          <label htmlFor="wallet">WALLET ADDRESS</label>
          <div className={Style.Form_box_input_box}>
            <div className={Style.Form_box_input_box_icon}>
              <MdOutlineHttp />
            </div>
            <input
              type="text"
              placeholder={connectedWalletAddress || "Connect your wallet"}
            />
            <div className={Style.Form_box_input_box_icon}>
              <MdOutlineContentCopy />
            </div>
          </div>
        </div>

        <div className={Style.Form_box_btn}>
          <Button
            btnName="UPDATE PROFILE INFORMATION"
            handleClick={() => {}}
            classStyle={Style.button}
          />
        </div>
      </form>
    </div>
  </div>
);

};

export default Form;