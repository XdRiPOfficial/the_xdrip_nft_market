import React, { useState, useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";
import Style from "./CreateCollection.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import { Button } from "../components/componentsindex.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addCollection, updateCollection } from "../firebase/services";



const CreateCollection = ({ currentAccount }) => {
  const [collectionImage, setCollectionImage] = useState(null);
  const [collectionName, setCollectionName] = useState("");
  const [website, setWebsite] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [discord, setDiscord] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [description, setDescription] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const connectedWalletAddress = useAddress();
  const address = useAddress();

  useEffect(() => {
    if (address) {
      setWalletAddress(address);
    }
  }, [address]);

  useEffect(() => {
    if (currentAccount) {
      setWalletAddress(currentAccount);
    }
  }, [currentAccount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const walletAddress = connectedWalletAddress;
    const collectionData = {
      collectionName,
      website,
      walletAddress,
      description,
      socials: {
        twitter,
        facebook,
        instagram,
        tiktok,
        discord,
      },
    };

    try {
      await addCollection(collectionData);

      
      setMessage("Collection added successfully!");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleImageUpload = (e) => {
    setCollectionImage(e.target.files[0]);
  };

  return (
    <div className={Style.container}>
      <div className={Style.CreateCollection}>
        <div className={Style.CreateCollection_box}>
          <div className={Style.right_box}>
            <div className={Style.upload_details_title}>
              <h2>COLLECTION DETAILS + SOCIALS</h2>
            </div>
            <div className={Style.upload_box}>
              <div className={formStyle.Form_box_input}>
                <label htmlFor="nft">NEW COLLECTION'S NAME</label>
                <input
                  type="text"
                  placeholder="ENTER COLLECTION NAME"
                  className={formStyle.Form_box_input_userName}
                  onChange={(e) => setCollectionName(e.target.value)}
                  value={collectionName}
                  name="collectionName"
                />
              </div>
              <div className={formStyle.Form_box_input}>
                <label htmlFor="website">YOUR COLLECTIONS WEBSITE</label>
                <div className={formStyle.Form_box_input_box}>
                  <input
                    type="text"
                    placeholder="ENTER YOUR COLLECTIONS WEBSITE"
                    onChange={(e) => setWebsite(e.target.value)}
                    value={website}
                    name="website"
                  />
                </div>

                <p className={Style.upload_box_input_para}>
                  A link to this URL will be included on the collections.
                </p>
              </div>


                        <div className={formStyle.Form_box_input}>
                            <label htmlFor="facebook">FACEBOOK</label>
                            <div className={formStyle.Form_box_input_box}>
                                <input
                                    type="text"
                                    placeholder="ENTER YOUR FACEBOOK LINK"
                                    onChange={(e) => setFacebook(e.target.value)}
                                    value={facebook}
                                    name="facebook"
                                />
                            </div>
                        </div>

                        <div className={formStyle.Form_box_input}>
                            <label htmlFor="tiktok">TikTok</label>
                            <div className={formStyle.Form_box_input_box}>
                                <input
                                    type="text"
                                    placeholder="ENTER YOUR Tiktok LINK"
                                    onChange={(e) => setTiktok(e.target.value)}
                                    value={tiktok}
                                    name="tiktok"
                                />
                            </div>
                        </div>

                        <div className={formStyle.Form_box_input}>
                            <label htmlFor="twitter">TWITTER</label>
                            <div className={formStyle.Form_box_input_box}>
                                <input
                                    type="text"
                                    placeholder="ENTER YOUR TWITTER LINK"
                                    onChange={(e) => setTwitter(e.target.value)}
                                    value={twitter}
                                    name="twitter"
                                />
                            </div>
                        </div>

                        <div className={formStyle.Form_box_input}>
                            <label htmlFor="instagram">INSTAGRAM</label>
                            <div className={formStyle.Form_box_input_box}>
                                <input
                                    type="text"
                                    placeholder="ENTER YOUR INSTAGRAM LINK"
                                    onChange={(e) => setInstagram(e.target.value)}
                                    value={instagram}
                                    name="instagram"
                                />
                            </div>
                        </div>

                        <div className={formStyle.Form_box_input}>
                            <label htmlFor="discord">DISCORD</label>
                            <div className={formStyle.Form_box_input_box}>
                                <input
                                    type="text"
                                    placeholder="ENTER YOUR DISCORD LINK"
                                    onChange={(e) => setDiscord(e.target.value)}
                                    value={discord}
                                    name="discord"
                                />
                            </div>
                        </div>

                        <div className={formStyle.Form_box_input}>
                            <label htmlFor="description">DESCRIBE YOUR COLLECTION</label>
                            <textarea
                                name="description"
                                id=""
                                cols="30"
                                rows="6"
                                placeholder="TELL US ABOUT YOUR NFT AND WHAT MAKES IT XCELLENT"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                
                            ></textarea>
                            <p>
                                This description will be displayed on the collections page. Markdown syntex is supported.             </p>
                        </div>

                        <div className={Style.user_box_input_box}>
                <label htmlFor="walletAddress">WALLET ADDRESS</label>
                <input
                  type="text"
                  placeholder="Enter your wallet address"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  name="walletAddress"
                />
              </div>
            </div>
          </div>
          <div className={Style.upload_dropzone}>
            <div className={Style.upload_dropzone_title}>
              <h2> LOGO + FEATURED + BANNER IMAGES</h2>
            </div>
            <div className={Style.dropzone_container}>
              <label htmlFor="profilePicture">PROFILE PICTURE</label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={(e) => handleImageUpload(e)}
              />
            </div>
            <div className={Style.upload_box_btn}>
              <Button
                btnName="CREATE YOUR NEW COLLECTION"
                onClick={handleSubmit}
                classStyle={Style.upload_box_btn_style}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCollection;