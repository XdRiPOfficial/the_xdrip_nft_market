import { getFirestore, collection, query, where, addDoc, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { firestore, db } from "./config";







// *******************ALL FIREBASE FUNCTIONS FOR USERS *******************



//GET ADD USER
const storage = getStorage();
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



//GET UPDATE USER
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



//GET UPDATE USERS PROFILE PICTURE
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
        throw new Error("User does not exist");
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



//GET USER 
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



//  GET USER PROFILE
export const getUserProfile = async (walletAddress) => {
  const firestore = getFirestore();
  const q = query(collection(firestore, "users"),
    where("walletAddress", "==", walletAddress));

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    let userProfile = null;
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      userProfile = { id: doc.id, ...doc.data() };
    });
    return userProfile;
  } else {
    console.error("No user found with the given wallet address");
    return null;
  }
};






//******************* ALL FIREBASE FUNCTIONS FOR COLLECTIONS *******************



//CREATE COLLECTION
export const createCollection = async (collectionData, collectionImage, bannerImage, featuredImage) => {
  const firestore = getFirestore();
  const userCollectionsRef = collection(firestore, "userCollections");
  const newCollection = {
    collectionName: collectionData.collectionName,
    website: collectionData.website,
    walletAddress: collectionData.walletAddress,
    collectionImageUrl: "",
    bannerImageUrl: "",
    featuredImageUrl: "",
    socials: collectionData.socials || {
      twitter: "",
      facebook: "",
      instagram: "",
      tiktok: "",
      discord: "",      
    },
    
  };
  console.log("Created newCollection:", newCollection);

  try {
    const docRef = await addDoc(userCollectionsRef, newCollection);
    const docId = docRef.id;

    if (collectionImage) {
      const storage = getStorage();
      const collectionImageRef = ref(storage, `collectionImages/${docId}/logoImages`);
      console.log("collectionImageRef:", collectionImageRef);

      await uploadBytes(collectionImageRef, collectionImage);
      console.log("Image uploaded successfully.");

      const collectionImageUrl = await getDownloadURL(collectionImageRef);
      console.log("collectionImageUrl:", collectionImageUrl);

      await updateDoc(doc(firestore, "userCollections", docId), {
        collectionImageUrl: collectionImageUrl,
      });
      console.log("Collection image updated successfully.");
    }

    if (bannerImage) {
      const storage = getStorage();
      const bannerImageRef = ref(storage, `collectionImages/${docId}/bannerImages`);
      console.log("bannerImageRef:", bannerImageRef);

      await uploadBytes(bannerImageRef, bannerImage);
      console.log("Banner image uploaded successfully.");

      const bannerImageUrl = await getDownloadURL(bannerImageRef);
      console.log("bannerImageUrl:", bannerImageUrl);

      await updateDoc(doc(firestore, "userCollections", docId), {
        bannerImageUrl: bannerImageUrl,
      });
      console.log("Banner image updated successfully.");
    }

    if (featuredImage) {
      const storage = getStorage();
      const featuredImageRef = ref(storage, `collectionImages/${docId}/featuredImages`);
      console.log("featuredImageRef:", featuredImageRef);

      await uploadBytes(featuredImageRef, featuredImage);
      console.log("Featured image uploaded successfully.");

      const featuredImageUrl = await getDownloadURL(featuredImageRef);
      console.log("featuredImageUrl:", featuredImageUrl);

      await updateDoc(doc(firestore, "userCollections", docId), {
        featuredImageUrl: featuredImageUrl,
      });
      console.log("Featured image updated successfully.");
    }

    console.log("Collection added successfully!");
    const usersRef = collection(firestore, "users");
    const userQuerySnapshot = await getDocs(query(usersRef, where("walletAddress", "==", collectionData.walletAddress)));

    if (!userQuerySnapshot.empty) {
      const userDoc = userQuerySnapshot.docs[0];
      const userRef = doc(firestore, "users", userDoc.id);

      await updateDoc(userRef, {
        collectionsCreated: [...userDoc.data().collectionsCreated, docId],
      });

      console.log("Updated 'users' collection with the new docId");
    } else {
      console.error("User does not exist");
      
    }

    return docId; // Return the docId
  } catch (error) {
    console.error("Error adding collection: ", error);
    throw error;
  }
};





//******************* ALL FIREBASE FUNCTIONS FOR UPDATING COLLECTIONS *******************


export const updateCollection = async (walletAddress, updates, bannerImage, featuredImage, docId) => {
  try {
    const userCollectionsRef = collection(db, "userCollections");
    const q = query(userCollectionsRef, where("walletAddress", "==", walletAddress));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const collectionDoc = querySnapshot.docs[0];
      const collectionRef = doc(db, "userCollections", collectionDoc.id);

      if (bannerImage) {
        const storage = getStorage();
        const bannerImageRef = ref(storage, `collectionImages/${collectionDoc.id}/bannerImages`);
        console.log("bannerImageRef:", bannerImageRef);

        await uploadBytes(bannerImageRef, bannerImage);
        console.log("Banner image uploaded successfully.");

        const bannerImageUrl = await getDownloadURL(bannerImageRef);
        console.log("bannerImageUrl:", bannerImageUrl);

        updates.bannerImageUrl = bannerImageUrl;
      }

      if (featuredImage) {
        const storage = getStorage();
        const featuredImageRef = ref(storage, `collectionImages/${collectionDoc.id}/featuredImages`);
        console.log("featuredImageRef:", featuredImageRef);

        await uploadBytes(featuredImageRef, featuredImage);
        console.log("Featured image uploaded successfully.");

        const featuredImageUrl = await getDownloadURL(featuredImageRef);
        console.log("featuredImageUrl:", featuredImageUrl);

        updates.featuredImageUrl = featuredImageUrl;
      }

      await updateDoc(collectionRef, updates);
      console.log("Collection document updated successfully");

      // Check if the 'users' collection document exists
      const usersRef = collection(db, "users");
      const userQuerySnapshot = await getDocs(query(usersRef, where("walletAddress", "==", walletAddress)));

      if (!userQuerySnapshot.empty) {
        // If the 'users' collection document exists, update the 'collectionsCreated' field
        const userDoc = userQuerySnapshot.docs[0];
        const userRef = doc(db, "users", userDoc.id);

        await updateDoc(userRef, {
          collectionsCreated: [...userDoc.data().collectionsCreated, docId],
        });

        console.log("Updated 'users' collection with the new docId");
      } 
     
    } else {
      console.error("Collection does not exist");
      throw new Error("Collection does not exist");
    }
  } catch (error) {
    console.error("Error updating collection: ", error);
    throw error;
  }
};



//GET USER COLLECTIONS
export const getUserCollections = async (walletAddress) => {
  const firestore = getFirestore();
  const q = query(
    collection(firestore, "userCollections"),
    where("walletAddress", "==", walletAddress)
  );

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userCollections = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const collection = { id: doc.id, ...doc.data() };
      userCollections.push(collection);
    });
    return userCollections;
  } else {
    console.error("No Collection found with the given wallet address");
    return null;
  }
};
