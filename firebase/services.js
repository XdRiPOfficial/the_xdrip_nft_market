import { getFirestore, collection, query, where, addDoc, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { firestore, db } from "./config";


const storage = getStorage();
//const db = firebase.firestore();

export const addUser = async (username, email, website, walletAddress, profilePicture, isCreator, creatorPage, socials) => {
  const userRef = collection(firestore, "users");
  const newUser = {
    email,
    username,
    website,
    walletAddress,
    profilePictureUrl: "",
    isCreator: isCreator || false,
    creatorPage: creatorPage || "",
    nftsCreated: [],
    nftsListed: [],
    nftsSold: [],
    socials: socials || {
      twitter: "",
      facebook: "",
      instagram: "",
      tiktok: "",
      discord: "",
    },
    collectionsCreated: [],
  };

  try {
    const docRef = await addDoc(userRef, newUser);
    
    if (profilePicture) {
      // Upload the profile image to Firebase Storage
      const storage = getStorage();
      const profilePictureRef = ref(storage, `users/${docRef.id}/profileImages`);
      await uploadBytes(profilePictureRef, profilePicture);
      const profilePictureUrl = await getDownloadURL(profilePictureRef);

      // Update the user's profile picture in the Firebase Firestore database
      await updateDoc(doc(firestore, "users", docRef.id), {
        profilePictureUrl: profilePictureUrl,
      });
    }

  } catch (error) {
    console.error("Error adding user: ", error);
  }
};


export const updateUser = async (walletAddress, updates) => {

  try {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("walletAddress", "==", walletAddress));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userRef = doc(db, "users", userDoc.id);
      await updateDoc(userRef, updates);
      console.log("User document updated successfully");
    } else {
      console.error("User does not exist");
      throw new Error("User does not exist"); // Throw an error to handle the case where the user does not exist
    }
  } catch (error) {
    console.error("Error updating user: ", error);
    throw error; // Throw the error to handle it in the calling code
  }
};






export const updateUserProfilePicture = async (walletAddress, profilePicture) => {
  const db = getFirestore();
  const storage = getStorage();
  try {
    if (profilePicture) {
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, where("walletAddress", "==", walletAddress));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userRef = doc(db, "users", userDoc.id);
        const userData = userDoc.data();

        const profilePictureRef = ref(storage, `users/${userDoc.id}/profilePicture.jpg`);

        await uploadBytes(profilePictureRef, profilePicture);
        const profilePictureUrl = await getDownloadURL(profilePictureRef);

        await updateDoc(userRef, { profilePictureUrl });
        console.log("User document updated successfully");
      } else {
        console.error("User does not exist");
        throw new Error("User does not exist"); // Throw an error to handle the case where the user does not exist
      }
    } else {
      console.error("Profile picture is missing");
      throw new Error("Profile picture is missing"); // Throw an error to handle the case where the profile picture is missing
    }
  } catch (error) {
    console.error("Error updating user profile picture: ", error);
    throw error; // Throw the error to handle it in the calling code
  }
};

  


export const addNft = async (userId, tokenURI) => {
  const userRef = doc(firestore, "users", userId);

  try {
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const nft = {
        tokenURI,
        likes: 0,
      };
      userData.nftsListed.push(nft);
      await updateDoc(userRef, { nftsListed: userData.nftsListed });
    } else {
      console.error("User does not exist");
    }
  } catch (error) {
    console.error("Error adding NFT: ", error);
  }
};

export const updateNftLikes = async (userId, nftIndex, likes) => {
  const userRef = doc(firestore, "users", userId);

  try {
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      if (nftIndex >= 0 && nftIndex < userData.nftsListed.length) {
        userData.nftsListed[nftIndex].likes = likes;
        await updateDoc(userRef, { nftsListed: userData.nftsListed });
      } else {
        console.error("Invalid NFT index");
      }
    } else {
      console.error("User does not exist");
    }
  } catch (error) {
    console.error("Error updating NFT likes: ", error);
  }
};

export const getUser = async (userId) => {
  const userRef = doc(firestore, "users", userId);

  try {
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const { username, email, walletAddress, profilePictureUrl, isCreator } = userData;
      return { id: userSnapshot.id, username, email, walletAddress, profilePictureUrl, isCreator };
    } else {
      console.error("User does not exist");
    }
  } catch (error) {
    console.error("Error getting user: ", error);
  }
};




export const getUserProfile = async (walletAddress) => {
  const firestore = getFirestore();
  const q = query(collection(firestore, "users"), 
    where("walletAddress", "==", walletAddress));

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    let userProfile = null;
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      userProfile = {id: doc.id, ...doc.data()};
    });
    return userProfile;
  } else {
    console.error("No user found with the given wallet address");
    return null;
  }
};


export const addCollection = async (collectionName, website, walletAddress, logoPicture, socials) => {
  const userRef = collection(firestore, "userCollections");
  const newCollection = {
      collectionName,
      website,
      walletAddress,
      logoImageUrl: "",
      bannerImageUrl: "",
      featuredImageUrl: "",
      socials: socials || {
        twitter: "",
        facebook: "",
        instagram: "",
        tiktok: "",
        discord: "",
        description: "",
      },
  };

  try {
    const docRef = await addDoc(userRef, newCollection);
    
    if (logoPicture) {
      const storage = getStorage();
      const logoPictureRef = ref(storage, `userCollectionImages/${docRef.id}/collectionImages`);
      await uploadBytes(logoPictureRef, logoPicture);
      const logoPictureUrl = await getDownloadURL(logoPictureRef);
      
      await updateDoc(doc(firestore, "userCollections", docRef.id), {
        logoPictureUrl: logoPictureUrl,
      });
    }

  } catch (error) {
    console.error("Error adding Collection: ", error);
    throw error;
  }
};


    

export const updateCollection = async (walletAddress, updates) => {

  try {
    const usersCollection = collection(db, "userCollections");
    const q = query(usersCollection, where("walletAddress", "==", walletAddress));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userRef = doc(db, "userCollections", userDoc.id);
      await updateDoc(userRef, updates);
      console.log("User document updated successfully");
    } else {
      console.error("User does not exist");
      throw new Error("User does not exist"); // Throw an error to handle the case where the user does not exist
    }
  } catch (error) {
    console.error("Error updating user: ", error);
    throw error; // Throw the error to handle it in the calling code
  }
};

