import React, { useState, useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";
import {
    getAuth,
    createKYCUser,
    updateKYCUser,
    uploadProfileImage,
} from "../../firebase/services";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import Style from "./KYC.module.css";
import { Button } from "../../components/componentsindex.js";

const KYC = ({ currentAccount, KYCSrc }) => {
    const [idFrontImage, setIdFrontImage] = useState(null);
    const [idBackImage, setIdBackImage] = useState(null);
    const [proofOfAddressImage, setProofOfAddressImage] = useState(null);
    const [activeBtn, setActiveBtn] = useState(1);
    const [legalName, setLegalName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [message, setMessage] = useState("");

    const address = useAddress();

    const [legalAddress, setLegalAddress] = useState({
        address1: "",
        address2: "",
        country: "",
        city: "",
        state: "",
        zipCode: "",
    });

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setLegalAddress((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

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
        try {
            const auth = getAuth();
            const { kyc } = await createKYCUser(auth, email);
            const user = await updateKYCUser(kyc.uid, {
                legalName,
                phoneNumber,
                email,
                walletAddress,
                legalAddress,
            });

            if (proofOfAddressImage) {
                const storage = getStorage();
                const fileRef = ref(
                    storage,
                    `proofOfAddressImages/${proofOfAddressImage.name}`
                );
                await uploadBytes(fileRef, proofOfAddressImage);
                const imageUrl = await getDownloadURL(fileRef);

                await updateKYCUser(kyc.uid, {
                    proofOfAddressImageUrl: imageUrl,
                });
            }

            if (idFrontImage) {
                const storage = getStorage();
                const fileRef = ref(storage, `idFrontImages/${idFrontImage.name}`);
                await uploadBytes(fileRef, idFrontImage);
                const imageUrl = await getDownloadURL(fileRef);

                await updateKYCUser(kyc.uid, {
                    idFrontImageUrl: imageUrl,
                });
            }

            if (idBackImage) {
                const storage = getStorage();
                const fileRef = ref(storage, `idBackImages/${idBackImage.name}`);
                await uploadBytes(fileRef, idBackImage);
                const imageUrl = await getDownloadURL(fileRef);

                await updateKYCUser(kyc.uid, {
                    idBackImageUrl: imageUrl,
                });
            }

            setMessage("User added successfully!");
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    const handleImageUpload = (e, setImage) => {
        const file = e.target.files[0];
        setImage(file);

        const reader = new FileReader();
        reader.onload = (event) => {
            const imgPreview = document.getElementById(`${setImage.name}-preview`);
            imgPreview.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className={Style.user}>
            <div className={Style.user_box}>
                <div className={Style.form_box}>
                    <form onSubmit={handleSubmit} className={Style.user_box_input}>
                        <div className={Style.user_box_input_box}>
                            <label htmlFor="legalName">LEGAL NAME</label>
                            <input
                                type="text"
                                placeholder="Enter Legal Name"
                                name="legalName"
                                value={legalName}
                                onChange={(e) => setLegalName(e.target.value)}
                            />
                        </div>
                        <div className={Style.user_box_input_box}>
                            <label htmlFor="address1">ADDRESS 1</label>
                            <input
                                type="text"
                                placeholder="Enter Address 1"
                                name="address1"
                                value={legalAddress.address1}
                                onChange={handleAddressChange}
                            />
                        </div>
                        <div className={Style.user_box_input_box}>
                            <label htmlFor="address2">ADDRESS 2</label>
                            <input
                                type="text"
                                placeholder="Enter Address 2"
                                name="address2"
                                value={legalAddress.address2}
                                onChange={handleAddressChange}
                            />
                        </div>
                        <div className={Style.user_box_input_box}>
                            <label htmlFor="country">COUNTRY</label>
                            <input
                                type="text"
                                placeholder="Enter Country"
                                name="country"
                                value={legalAddress.country}
                                onChange={handleAddressChange}
                            />
                        </div>
                        <div className={Style.user_box_input_box}>
                            <label htmlFor="city">CITY</label>
                            <input
                                type="text"
                                placeholder="Enter City"
                                name="city"
                                value={legalAddress.city}
                                onChange={handleAddressChange}
                            />
                        </div>
                        <div className={Style.user_box_input_box}>
                            <label htmlFor="state">STATE/PROVINCE</label>
                            <input
                                type="text"
                                placeholder="Enter State/Province"
                                name="state"
                                value={legalAddress.state}
                                onChange={handleAddressChange}
                            />
                        </div>
                        <div className={Style.user_box_input_box}>
                            <label htmlFor="zipCode">LOCATOR / ZIP CODE</label>
                            <input
                                type="text"
                                placeholder="Enter Locator / ZIP Code"
                                name="zipCode"
                                value={legalAddress.zipCode}
                                onChange={handleAddressChange}
                            />
                        </div>
                        <div className={Style.user_box_input_box}>
                            <label htmlFor="phoneNumber">PHONE NUMBER</label>
                            <input
                                type="tel"
                                placeholder="Enter Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div className={Style.user_box_input_box}>
                            <label htmlFor="email">EMAIL ADDRESS</label>
                            <input
                                type="email"
                                placeholder="example@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className={Style.user_box_input_box}>
                            <label htmlFor="walletAddress">WALLET ADDRESS</label>
                            <input
                                type="text"
                                placeholder="Enter your wallet address"
                                value={walletAddress}
                                onChange={(e) => setWalletAddress(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
                <p className={Style.user_box_or}></p>
                <div className={Style.user_box_social}>
                    <div className={Style.user_box_input_box_img}>
                        <label htmlFor="proofOfAddressImage">PROOF OF ADDRESS</label>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.gif"
                            onChange={(e) => handleImageUpload(e, setProofOfAddressImage, 'proofOfAddressImage')}
                        />

                        {proofOfAddressImage && (
                            <img
                                src={URL.createObjectURL(proofOfAddressImage)}
                                alt="Proof of Address Preview"
                                id="proofOfAddressImage-preview"
                            />
                        )}

                    </div>

                    <div className={Style.user_box_input_box_img}>
                        <label htmlFor="idFrontImage">ID PICTURE (FRONT)</label>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.gif"
                            onChange={(e) => handleImageUpload(e, setIdFrontImage, 'idFrontImage')}
                        />

                        {idFrontImage && (
                            <img
                                src={URL.createObjectURL(idFrontImage)}
                                alt="ID Picture (Front) Preview"
                                id="idFrontImage-preview"
                            />
                        )}

                    </div>
                    <div className={Style.user_box_input_box_img}>
                        <label htmlFor="idBackImage">ID PICTURE (BACK)</label>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.gif"
                            onChange={(e) => handleImageUpload(e, setIdBackImage, 'idBackImage')}
                        />

                        {idBackImage && (
                            <img
                                src={URL.createObjectURL(idBackImage)}
                                alt="ID Picture (Back) Preview"
                                id="idBackImage-preview"
                            />
                        )}

                    </div>
                    {message && <div className={Style.message}>{message}</div>}
                    <div className={Style.continue_button_box}>
                        <Button btnName="SUBMIT FORM" classStyle={Style.continue_button} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KYC;
