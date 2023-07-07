import { getFirestore, collection, query, where, addDoc, getDocs, getDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { firestore, db } from "./config";







// **************************************************************************ADD USER FUNCTION *********************************************************************************************


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
    nftsOwned: [],
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





//************************************************************************ GET UPDATE USER FUNCTION ****************************************************************************************


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





//**************************************************************** GET UPDATE USERS PROFILE PICTURE FUNCTION *******************************************************************************


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





//******************************************************************************* GET USER FUNCTION ****************************************************************************************


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





//****************************************************************** GET USER PROFILE FUNCTION CALLED FOR PROFILE DATA *********************************************************************


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






//****************************************************** CREATE COLLECTION FUNCTION CALLED FROM CREATE COLLECTION PAGE ********************************************************************


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
    tokenIds: [],
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





//************************************************************** UPDATE COLLECTION FUNTION CALLED WHEN COLLECTION CREATED *****************************************************************


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






//**************************************************************************** GET USER COLLECTIONS FUNCTION *******************************************************************************

export const getUserCollections = async (currentAddress) => {
  console.log("currentAddress:", currentAddress);
  try {
    const userProfile = await getUserProfile(currentAddress);

    if (userProfile) {
      const { collectionsCreated } = userProfile;

      console.log("collectionsCreated:", collectionsCreated);

      const firestore = getFirestore();
      const usersCollections = collection(firestore, "userCollections");

      const collectionsCreatedData = await Promise.all(
        collectionsCreated.map(async (docId) => {
          const docRef = doc(usersCollections, docId);
          const docSnapshot = await getDoc(docRef);

          if (docSnapshot.exists()) {
            const nftData = { id: docSnapshot.id, ...docSnapshot.data() };
            console.log("Fetched collection data for docId:", docId, nftData);
            return nftData;
          } else {
            console.log("No matching collection found for docId:", docId);
            return null;
          }
        })
      );

      console.log("collectionsCreatedData:", collectionsCreatedData);

      return {
        collectionsCreated: collectionsCreatedData.filter((collection) => collection !== null),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user NFTs:", error);
    throw error;
  }
}




//**************************************************************************** GET USER COLLECTION DATA FUNCTION *******************************************************************************

export const getCollectionsData = async (currentAddress) => {
  try {
    const collectionsData = await getUserCollections(currentAddress);

    if (collectionsData) {
      const { collectionsCreated } = collectionsData;
      const collectionsCreatedData = [];

      for (const collection of collectionsCreated) {
        const {
          bannerImageUrl,
          collectionImageUrl,
          collectionName,
          featuredImageUrl,
          socials,
          tokenIds,
          walletAddress,
          website,
        } = collection;

        // Additional processing or data manipulation can be done here

        const collectionData = {
          bannerImageUrl,
          collectionImageUrl,
          collectionName,
          featuredImageUrl,
          socials,
          tokenIds,
          walletAddress,
          website,
        };

        collectionsCreatedData.push(collectionData);
      }

      console.log("collectionsCreatedData:", collectionsCreatedData);
      return collectionsCreatedData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching collections data:", error);
    throw error;
  }
};






//********************************************** UPDATE TOKEN ID FUNCTION, CALLED WHEN NFT MINTED INTO USERS DOCID AND COLLECTION CREATED **************************************************


export async function updateTokenId(walletAddress, tokenId, collectionName) {
  try {
    console.log('Wallet Address:', walletAddress);
    console.log('Collection Name:', collectionName);

    const usersRef = collection(db, "users");
    const usersQuerySnapshot = await getDocs(
      query(usersRef, where("walletAddress", "==", walletAddress))
    );

    if (!usersQuerySnapshot.empty && collectionName) {
      const usersDoc = usersQuerySnapshot.docs[0];
      const usersRef = doc(db, "users", usersDoc.id);

      await updateDoc(usersRef, {
        nftsCreated: [tokenId, ...usersDoc.data().nftsCreated],
        nftsListed: [tokenId, ...usersDoc.data().nftsListed],
      });

      console.log("Token ID updated successfully in users document");
      console.log("Updated Users Doc ID:", usersDoc.id);
      console.log("Updated Token IDs in users:", [tokenId, ...usersDoc.data().nftsCreated]);
    }

    if (collectionName) {

      const userCollectionsRef = collection(db, "userCollections");
      const q = query(
        userCollectionsRef,
        where("walletAddress", "==", walletAddress),
        where("collectionName", "==", collectionName)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("Collection does not exist");
      }

      const collectionDoc = querySnapshot.docs[0];
      const collectionRef = doc(db, "userCollections", collectionDoc.id);

      await updateDoc(collectionRef, {
        tokenIds: [tokenId, ...collectionDoc.data().tokenIds],
      });

      console.log("Token ID updated successfully in collection document");
      console.log("Updated Collection Doc ID:", collectionDoc.id);
      console.log("Updated Token IDs:", [tokenId, ...collectionDoc.data().tokenIds]);

      return collectionDoc.id;
    }

  } catch (error) {
    console.error("Error updating token ID:", error);
    throw error;
  }
}





//***************************************************** GET TOKENID FUNCTION TO PULL OTHER DATA FROM DOCUMENTS THE TOKENID RESIDES IN ******************************************************

/*
export async function getTokenId(tokenId) {
  try {
    console.log("Searching for tokenId:", tokenId);
    const firestore = getFirestore();

    console.log("Firestore instance:", firestore);

    const userCollectionsRef = collection(firestore, "userCollections");
    console.log("Collection reference:", userCollectionsRef);

    const querySnapshot = await getDocs(userCollectionsRef);
    console.log("Query Snapshot:", querySnapshot);

    let foundDocument = null;

    querySnapshot.forEach((doc) => {
      console.log("Current Document:", doc.data());
      const collectionData = doc.data();
      if (collectionData.tokenIds && collectionData.tokenIds.includes(tokenId)) {
        foundDocument = doc;
      }
    });

    if (foundDocument) {
      const collectionData = foundDocument.data();
      const collectionName = collectionData.collectionName;
      const walletAddress = collectionData.walletAddress;

      console.log("Collection Document:", collectionData);
      console.log("Collection Name:", collectionName);
      console.log("Wallet Address:", walletAddress);

      return {
        collectionName,
        walletAddress,
      };
    } else {
      console.log("No collection found with the given token ID");
      return null;
    }
  } catch (error) {
    console.error("Error getting token information:", error);
    throw error;
  }
} */




//********************************************************* ADD NFT TO FIREBASE FUNCTION DONE AT INITIAL NFT CREATION IN MO CONTEXT *******************************************************

export async function addNFT(collectionName, walletAddress, createNFTData, tokenId) {
  try {
    const firestore = getFirestore();
    const nftDataRef = collection(firestore, "nfts");
    const newNFT = {
      ...createNFTData, // Assigning all properties from createNFTData prop to newNFT
      collectionName,
      tokenId
    };

    console.log("Created newNFT:", newNFT);

    const docRef = await addDoc(nftDataRef, newNFT);
    const docId = docRef.id;

    const usersRef = collection(firestore, "users");
    const userQuerySnapshot = await getDocs(query(usersRef, where("walletAddress", "==", walletAddress)));

    if (!userQuerySnapshot.empty) {
      const userDoc = userQuerySnapshot.docs[0];
      const userRef = doc(firestore, "users", userDoc.id);

      await updateDoc(userRef, {
        nftsCreated: [...userDoc.data().nftsCreated, docId],
        nftsListed: [...userDoc.data().nftsListed, docId],
      });
    }

    if (collectionName) {

      const userCollectionsRef = collection(db, "userCollections");
      const q = query(
        userCollectionsRef,
        where("walletAddress", "==", walletAddress),
        where("collectionName", "==", collectionName)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("Collection does not exist");
      }

      const collectionDoc = querySnapshot.docs[0];
      const collectionRef = doc(db, "userCollections", collectionDoc.id);

      await updateDoc(collectionRef, {
        tokenIds: [docId, ...collectionDoc.data().tokenIds],
      });

      console.log("Token ID updated successfully in collection document");
      console.log("Updated Collection Doc ID:", collectionDoc.id);
      console.log("Updated Token IDs:", [tokenId, ...collectionDoc.data().tokenIds]);

      return collectionDoc.id;
    }

    console.log("NFT data added successfully");
  } catch (error) {
    console.error("Error adding NFT data to Firebase:", error);
    throw error;
  }
}





//************************************************************************* GET MY NFTS + DATA FUNCTION *****************************************************************************************

export async function getMyNFTs(currentAddress) {
  console.log("currentAddress:", currentAddress);
  try {
    const userProfile = await getUserProfile(currentAddress);

    if (userProfile) {
      const { nftsCreated, nftsListed, nftsSold } = userProfile;

      console.log("nftsCreated:", nftsCreated);
      console.log("nftsListed:", nftsListed);
      console.log("nftsSold:", nftsSold);

      const firestore = getFirestore();
      const userCollections = collection(firestore, "nfts");

      const nftsCreatedData = await Promise.all(
        nftsCreated.map(async (docId) => {
          const docRef = doc(userCollections, docId);
          const docSnapshot = await getDoc(docRef);

          if (docSnapshot.exists()) {
            const nftData = { id: docSnapshot.id, ...docSnapshot.data() };
            console.log("Fetched NFT data for docId:", docId, nftData);
            return nftData;
          } else {
            console.log("No matching NFT found for docId:", docId);
            return null;
          }
        })
      );

      const nftsListedData = await Promise.all(
        nftsListed.map(async (docId) => {
          const docRef = doc(userCollections, docId);
          const docSnapshot = await getDoc(docRef);
          return docSnapshot.exists() ? { id: docSnapshot.id, ...docSnapshot.data() } : null;
        })
      );

      const nftsSoldData = await Promise.all(
        nftsSold.map(async (docId) => {
          const docRef = doc(userCollections, docId);
          const docSnapshot = await getDoc(docRef);
          return docSnapshot.exists() ? { id: docSnapshot.id, ...docSnapshot.data() } : null;
        })
      );

      console.log("nftsCreatedData:", nftsCreatedData);
      console.log("nftsListedData:", nftsListedData);
      console.log("nftsSoldData:", nftsSoldData);

      return {
        nftsCreated: nftsCreatedData.filter((nft) => nft !== null),
        nftsListed: nftsListedData.filter((nft) => nft !== null),
        nftsSold: nftsSoldData.filter((nft) => nft !== null),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user NFTs:", error);
    throw error;
  }
}







//************************************************************************* GET NFT DATA FUNCTION *****************************************************************************************

export async function getNFTData(tokenId, name) {
  try {
    const firestore = getFirestore();
    const q = query(collection(firestore, "nfts"), where("tokenId", "==", Number(tokenId)));

    console.log("tokenId FB:", tokenId); // Log the tokenId
    console.log("name FB:", name);

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      let nftData = null;
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        nftData = { id: doc.id, ...doc.data() };
      });
      console.log("Fetched NFT data FB:", nftData); // Log the fetched NFT data
      return nftData;
    } else {
      console.log("No matching NFT found for tokenId:", tokenId);
      return null;
    }
  } catch (error) {
    console.error("Error retrieving NFTs from Firebase:", error);
    throw error;
  }
}



