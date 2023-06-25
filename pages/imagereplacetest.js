

import React, { useState, useEffect } from "react";
import { getFirestore, collection, query, where, doc, updateDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { useAddress } from "@thirdweb-dev/react";

const TestProfileImageReplace = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [oldProfilePictureUrl, setOldProfilePictureUrl] = useState("");
  const [newProfilePictureUrl, setNewProfilePictureUrl] = useState("");
  const [message, setMessage] = useState("");
  const walletAddress = useAddress();

  const pfpChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  useEffect(() => {
    if (oldProfilePictureUrl && newProfilePictureUrl) {
      setOldProfilePictureUrl("");
      setNewProfilePictureUrl("");
    }
  }, [walletAddress]);

  const pfpUpdate = async (e) => {
    e.preventDefault();

    if (!walletAddress) {
      setMessage("no connected wallet ");
      return;
    }

    const db = getFirestore();
    const storage = getStorage();

    try {
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, where("walletAddress", "==", walletAddress));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userRef = doc(db, "users", userDoc.id);
        const userData = userDoc.data();
        setOldProfilePictureUrl(userData?.profilePictureUrl);

        const profilePictureRef = ref(storage, `users/${userDoc.id}/profilePicture.jpg`);

        await uploadBytes(profilePictureRef, profilePicture);
        const profilePictureUrl = await getDownloadURL(profilePictureRef);
        setNewProfilePictureUrl(profilePictureUrl);

        if (oldProfilePictureUrl) {
          const oldProfilePictureRef = ref(storage, oldProfilePictureUrl);
          await deleteObject(oldProfilePictureRef);
        }

        await updateDoc(userRef, { profilePictureUrl });

        setMessage("It fuckin worked!");
        setTimeout(() => {
          router.reload();
        }, 3000);
        window.location.reload();
      } else {
        setMessage("no user w that wallet");
      }
    } catch (error) {
      setMessage(`didnt work for some reason: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>change pfp test</h1>
      <div>
        <div className="profile-picture-container">
          {oldProfilePictureUrl && (
            <img src={oldProfilePictureUrl} alt="old pfp" className="profile-picture" />
          )}
        </div>
        <div className="profile-picture-container">
          {newProfilePictureUrl && (
            <img src={newProfilePictureUrl} alt="new pfp" className="profile-picture" />
          )}
        </div>
      </div>
      <div className="form-container">
        <form onSubmit={pfpUpdate}>
          <div>
            <label>  <h2>  Profile Picture: </h2> </label>
            <br/>
            <br/>
            <input type="file" accept="image/*" onChange={pfpChange} />
             <br/>
            <br/>
          </div>
          <div>
            <button type="submit">  <h2>  Update Profile Picture  </h2>  </button>
            <br/>
            <br/>
          </div>
        </form>
        <p>{message}</p>
      </div>
      <style jsx>{`
        .profile-picture-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 10px;
        }

        .profile-picture {
          width: 150px;
          height: auto;
        }

        .form-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default TestProfileImageReplace;