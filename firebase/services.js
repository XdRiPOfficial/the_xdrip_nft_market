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



const updateUserProfilePicture = async (userId, profilePictureUrl) => {
  const db = getFirestore();
  const userRef = doc(db, "users", userId);
  await updateDoc(doc(firestore, "users", docRef.id), {
    profilePictureUrl: profilePictureUrl,
  });
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



export const createCollection = async (userId, collectionData) => {
  const userRef = doc(firestore, "users", userId);

  try {
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const collectionRef = collection(firestore, "collections");
      const collectionDocRef = await addDoc(collectionRef, collectionData);
      userData.collectionsCreated.push(collectionDocRef.id);

      // Update the minted NFTs with the collection tag
      for (const nftId of userData.nftsListed) {
        const nftRef = doc(firestore, "nfts", nftId);
        await updateDoc(nftRef, { collectionId: collectionDocRef.id });
      }

      await updateDoc(userRef, { collectionsCreated: userData.collectionsCreated });
    } else {
      console.error("User does not exist");
    }
  } catch (error) {
    console.error("Error creating collection: ", error);
  }
};



export const saveCollectionDetails = async (collectionName, website, description, facebook, twitter, instagram, discord, logoImage, featuredImage, bannerImage) => {
  const collectionData = {
    collectionName,
    website,
    description,
    facebook,
    twitter,
    instagram,
    discord,
  };

  // Upload logo image
  const logoImageRef = ref(storage, `collectionImages/${collectionName}/logoImage.jpg`);
  await uploadBytes(logoImageRef, logoImage);
  const logoImageUrl = await getDownloadURL(logoImageRef);
  collectionData.logoImageUrl = logoImageUrl;

  // Upload featured image
  const featuredImageRef = ref(storage, `collectionImages/${collectionName}/featuredImage.jpg`);
  await uploadBytes(featuredImageRef, featuredImage);
  const featuredImageUrl = await getDownloadURL(featuredImageRef);
  collectionData.featuredImageUrl = featuredImageUrl;

  // Upload banner image
  const bannerImageRef = ref(storage, `collectionImages/${collectionName}/bannerImage.jpg`);
  await uploadBytes(bannerImageRef, bannerImage);
  const bannerImageUrl = await getDownloadURL(bannerImageRef);
  collectionData.bannerImageUrl = bannerImageUrl;

  try {
    await createCollection(collectionData);
    console.log("Collection created successfully");
  } catch (error) {
    console.error("Error creating collection: ", error);
  }
};
