import React, { useState, useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineHttp, MdOutlineContentCopy } from "react-icons/md";
import { FaFacebookF, FaTwitter, FaInstagram, FaTiktok, FaDiscord } from "react-icons/fa";

import Style from "./Form.module.css";
import { Button } from "../../components/componentsindex.js";
import { updateUser,} from "../../firebase/services";


const Form = (props) => {
  const [isCreator, setIsCreator] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [website, setWebsite] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const connectedWalletAddress = useAddress();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  const handleCreatorChange = (event) => {
    setIsCreator(event.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const walletAddress = connectedWalletAddress; // Use the connectedWalletAddress value
    const updatedData = {
      email: e.target.elements.email.value || props.email,
      username: e.target.elements.username.value || props.username,
      website: e.target.elements.website.value || props.website,
      walletAddress: walletAddress,
      isCreator: isCreator || false,
      socials: {
        twitter: e.target.elements.twitter.value || props.twitter,
        facebook: e.target.elements.facebook.value || props.facebook,
        instagram: e.target.elements.instagram.value || props.instagram,
        tiktok: e.target.elements.tiktok.value || props.tiktok,
        discord: e.target.elements.discord.value || props.discord,
      },
    };
  
    try {
      await updateUser(walletAddress, updatedData);
  
      setSuccess(true);
      setError(null);
    } catch (error) {
      setSuccess(false);
      setError("Error updating user profile: " + error.message);
      if (error.message === "User does not exist") {
        }
    }
  };
  
  



  return (
    <div className={Style.Form}>
      <div className={Style.Form_box}>
        <form onSubmit={handleSubmit}>
          <div className={Style.Form_box_input}>
            <label htmlFor="name">Username</label>
            <input
              type="text"
              placeholder={props.username}
              className={Style.Form_box_input_userName}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username" 
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
                placeholder={props.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email" 
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
                    XPLORE YOUR UNTAPPED XCELLENCE, SHOWCASE YOUR TALENTS, AND BUILD GENERATIONAL INCOME!
                  </span>
                )}
              </span>
              <input
                type="checkbox"
                id="creator"
                checked={props.isCreator}                
                onChange={handleCreatorChange}
              />
            </label>
          </div>

          <div className={Style.Form_box_input_social}>
            <div className={Style.Form_box_input}>
              <label htmlFor="website">WEBSITE</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <MdOutlineHttp />
                </div>
                <input 
                type="text" 
                placeholder={props.website}
                value={website}
                onChange={(e) => setWebsite(e.target.value)} 
                name="website" 
                />
              </div>
            </div>

            <div className={Style.Form_box_input}>
              <label htmlFor="Twitter">TWITTER</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <FaTwitter />
                </div>
                <input 
                type="text" 
                placeholder={props.twitter}
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)} 
                name="twitter" 
                />
              </div>
            </div>

            <div className={Style.Form_box_input}>
              <label htmlFor="Tiktok">TIKTOK</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <FaTiktok />
                </div>
                <input 
                type="text"              
                placeholder={props.instagram}
                value={tiktok}
                onChange={(e) => setTiktok(e.target.value)}
                name="tiktok" 
                />
              </div>
            </div>

            <div className={Style.Form_box_input}>
              <label htmlFor="facebook">FACEBOOK</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <FaFacebookF />
                </div>
                <input 
                type="text" 
                placeholder={props.facebook}
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)} 
                name="facebook" 
                />
              </div>
            </div>

            <div className={Style.Form_box_input}>
              <label htmlFor="Instagram">INSTAGRAM</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <FaInstagram />
                </div>
                <input 
                type="text" 
                placeholder={props.instagram}
                 value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                name="instagram" 
                />
              </div>
            </div>

            <div className={Style.Form_box_input}>
              <label htmlFor="Tiktok">DISCORD</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <FaDiscord />
                </div>
                <input 
                type="text" 
                placeholder={props.discord}
                value={discord}
                onChange={(e) => setDiscord(e.target.value)} 
                name="discord" 
                />
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
                name="walletAddress"
              />
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineContentCopy />
              </div>
            </div>
          </div>

          <div className={Style.Form_box_btn}>
            <Button
              btnName="UPDATE PROFILE INFORMATION"
              type="submit"
              onClick={handleSubmit}
              classStyle={Style.button}
            />
          </div>
        </form>
        {success && (
          <div className={Style.successMessage}>
            User Profile Updated Successfully
          </div>
        )}
        {error && <div className={Style.errorMessage}>{error}</div>}
      </div>
      
    </div>
  );
};

export default Form;
