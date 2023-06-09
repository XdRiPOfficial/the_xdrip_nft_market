import { getFirestore, collection, query, where, addDoc, getDocs, getDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { firestore, db } from "./config";





/*****************************************************************************************************************************************************************************************
                                                                                
                                                                                 ADD USER FUNCTION 

******************************************************************************************************************************************************************************************/

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
    followers: [],
    following: [],
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





/*****************************************************************************************************************************************************************************************
                                                                                
                                                                              GET UPDATE USER FUNCTION 

******************************************************************************************************************************************************************************************/

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





/*****************************************************************************************************************************************************************************************
                                                                                
                                                                        UPDATE USERS PROFILE PICTURE FUNCTION

******************************************************************************************************************************************************************************************/

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





/*****************************************************************************************************************************************************************************************
                                                                                
                                                                   GET USER USING THE LOGGED IN USER FUNCTION

******************************************************************************************************************************************************************************************/


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





/*****************************************************************************************************************************************************************************************
                                                                                
                                                                   GET USER PROFILE FUNCTION CALLED FOR PROFILE DATA 

******************************************************************************************************************************************************************************************/

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





/*****************************************************************************************************************************************************************************************
                                                                                
                                                                   ADD A FOLLOWER TO THE USER FOLLOWERS AND FOLLOWERS FOLLOWING FIELDS

******************************************************************************************************************************************************************************************/

export const addFollower = async (userAddress, followerAddress) => {
  try {
    console.log('Adding follower...');
    console.log('User Address:', userAddress);
    console.log('Follower Address:', followerAddress);

    const firestore = getFirestore();
    const usersCollection = collection(firestore, "users");

    // Get the user document based on user address
    const userQuery = query(usersCollection, where('walletAddress', '==', userAddress));
    const userQuerySnapshot = await getDocs(userQuery);
    const userDocs = userQuerySnapshot.docs;
    const userDoc = userDocs[0];
    const userId = userDoc.id;
    console.log('User ID:', userId);

    // Get the follower document based on follower address
    const followerQuery = query(usersCollection, where('walletAddress', '==', followerAddress));
    const followerQuerySnapshot = await getDocs(followerQuery);
    const followerDocs = followerQuerySnapshot.docs;
    const followerDoc = followerDocs[0];
    const followerId = followerDoc.id;
    console.log('Follower ID:', followerId);

    // Check if the user is already following the follower
    if (userDoc.data().following.includes(userId)) {
      console.log('User is already following the follower.');
      toast.error('You are already following this user.');
      return;
    }

    // Get the current following and followers arrays
    const userFollowing = userDoc.data().following || [];
    const userFollowers = userDoc.data().followers || [];
    const followerFollowing = followerDoc.data().following || [];
    const followerFollowers = followerDoc.data().followers || [];

    // Update the arrays with the new IDs
    const updatedUserFollowers = [...userFollowers, followerId];
    const updatedFollowerFollowing = [...followerFollowing, userId];

    // Add follower to the user's followers field
    await updateDoc(doc(firestore, "users", userId), {
      followers: updatedUserFollowers,
    });
    console.log('Follower added to user followers field.');

    // Add the user to the follower's following field
    await updateDoc(doc(firestore, "users", followerId), {
      following: updatedFollowerFollowing,
    });
    console.log('User added to follower following field.');

    console.log('Follower added successfully!');
  } catch (error) {
    console.error('Error adding follower:', error);
    toast.error('Error adding follower. Please try again.');
  }
};







/*****************************************************************************************************************************************************************************************
                                                                                
                                                                                 IS FOLLOWING USER FUNCTION

******************************************************************************************************************************************************************************************/

export const isFollowingUser = async (userAddress, followerAddress) => {
  try {
    console.log('Checking following status...');
    console.log('User Address:', userAddress);
    console.log('Follower Address:', followerAddress);

    const firestore = getFirestore();
    const usersCollection = collection(firestore, "users");

    // Get the user document based on user address
    const userQuery = query(usersCollection, where('walletAddress', '==', userAddress));
    const userQuerySnapshot = await getDocs(userQuery);
    const userDocs = userQuerySnapshot.docs;
    const userDoc = userDocs[0];
    const userId = userDoc.id;
    console.log('User ID:', userId);

    // Get the follower document based on follower address
    const followerQuery = query(usersCollection, where('walletAddress', '==', followerAddress));
    const followerQuerySnapshot = await getDocs(followerQuery);
    const followerDocs = followerQuerySnapshot.docs;
    const followerDoc = followerDocs[0];
    const followerId = followerDoc.id;
    console.log('Follower ID:', followerId);

    // Check if the user's followers array includes the followerId
    const isFollowing = userDoc.data().followers.includes(followerId);

    console.log('Following status:', isFollowing);
    return isFollowing;
  } catch (error) {
    console.error('Error checking following status:', error);
    throw error;
  }
};





/*****************************************************************************************************************************************************************************************
                                                                                
                                                                   GET THE CONNECTED WALLETS FOLLOWING AND FOLLOWERS DATA

******************************************************************************************************************************************************************************************/

export const getFollowingAndFollowers = async (currentAccount) => {
  try {
    const firestore = getFirestore();
    const usersCollection = collection(firestore, "users");
    console.log('Wallet Address Coming In From MyProfile:', currentAccount);

    // Get the user document based on wallet address
    const userQuery = query(usersCollection, where('walletAddress', '==', currentAccount));
    const userQuerySnapshot = await getDocs(userQuery);
    const userDocs = userQuerySnapshot.docs;
    const userDoc = userDocs[0];
    const userId = userDoc.id;

    // Retrieve the user's following and followers arrays
    const userData = userDoc.data();
    const followingIds = userData.following;
    const followerIds = userData.followers;

    console.log('Following IDs FB FUNCTION:', followingIds);
    console.log('Follower IDs FB FUNCTION:', followerIds);

    // Get the following users' documents
    const followingDocsPromises = followingIds.map(async (followingId) => {
      const followingDocRef = doc(usersCollection, followingId);
      const followingDocSnapshot = await getDoc(followingDocRef);
      const followingUser = followingDocSnapshot.data();
      return followingUser;
    });

    const followingUsers = await Promise.all(followingDocsPromises);

    console.log('Following Users FB FUNCTION:', followingUsers);

    // Get the follower users' documents
    const followerDocsPromises = followerIds.map(async (followerId) => {
      const followerDocRef = doc(usersCollection, followerId);
      const followerDocSnapshot = await getDoc(followerDocRef);
      const followerUser = followerDocSnapshot.data();
      return followerUser;
    });

    const followerUsers = await Promise.all(followerDocsPromises);

    console.log('Follower Users FB FUNCTION:', followerUsers);

    return {
      myFollowing: followingUsers.filter((user) => user !== null),
      myFollowers: followerUsers.filter((user) => user !== null),
      
    };
  } catch (error) {
    console.error('Error retrieving following and followers:', error);
    throw error;
  }
};







/*****************************************************************************************************************************************************************************************
                                                                                
                                                                   REMOVE A FOLLOWER FROM THE USER FOLLOWERS AND FOLLOWERS FOLLOWING FIELDS

******************************************************************************************************************************************************************************************/

export const removeFollower = async (userAddress, followerAddress) => {
  try {
    console.log('Removing follower...');
    console.log('User Address:', userAddress);
    console.log('Follower Address:', followerAddress);

    const firestore = getFirestore();
    const usersCollection = collection(firestore, "users");

    // Get the user document based on user address
    const userQuery = query(usersCollection, where('walletAddress', '==', userAddress));
    const userQuerySnapshot = await getDocs(userQuery);
    const userDocs = userQuerySnapshot.docs;
    const userDoc = userDocs[0];
    const userId = userDoc.id;
    console.log('User ID:', userId);

    // Get the follower document based on follower address
    const followerQuery = query(usersCollection, where('walletAddress', '==', followerAddress));
    const followerQuerySnapshot = await getDocs(followerQuery);
    const followerDocs = followerQuerySnapshot.docs;
    const followerDoc = followerDocs[0];
    const followerId = followerDoc.id;
    console.log('Follower ID:', followerId);

    // Remove follower from the user's followers field
    await updateDoc(doc(firestore, "users", userId), {
      followers: userDoc.data().followers.filter(id => id !== followerId),
    });
    console.log('Follower removed from user followers field.');

    // Remove the user from the follower's following field
    await updateDoc(doc(firestore, "users", followerId), {
      following: followerDoc.data().following.filter(id => id !== userId),
    });
    console.log('User removed from follower following field.');

    console.log('Follower removed successfully!');
  } catch (error) {
    console.error('Error removing follower:', error);
  }
};






/*****************************************************************************************************************************************************************************************
                                                                                
                                                              CREATE COLLECTION FUNCTION CALLED FROM CREATE COLLECTION PAGE

******************************************************************************************************************************************************************************************/

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





/*****************************************************************************************************************************************************************************************
                                                                                
                                                                 UPDATE COLLECTION FUNTION CALLED WHEN COLLECTION CREATED

******************************************************************************************************************************************************************************************/

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





/*****************************************************************************************************************************************************************************************
                                                                                
                                                                                    GET USER COLLECTIONS FUNCTION 

******************************************************************************************************************************************************************************************/

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





/*****************************************************************************************************************************************************************************************

                                                                              GET USER COLLECTION DATA FUNCTION

******************************************************************************************************************************************************************************************/

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





/*****************************************************************************************************************************************************************************************
                                                                                
                                                 UPDATE TOKEN ID FUNCTION, CALLED WHEN NFT MINTED INTO USERS DOCID AND COLLECTION CREATED  

******************************************************************************************************************************************************************************************/

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





/*****************************************************************************************************************************************************************************************
                                                                                
                                                            ADD NFT TO FIREBASE FUNCTION DONE AT INITIAL NFT CREATION IN MO CONTEXT 

******************************************************************************************************************************************************************************************/

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





/*****************************************************************************************************************************************************************************************
                                                                                
                                                                                GET MY NFTS + DATA FUNCTION

******************************************************************************************************************************************************************************************/

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





/*****************************************************************************************************************************************************************************************
                                                                                
                                                                               GET NFT DATA FUNCTION

******************************************************************************************************************************************************************************************/

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





/*****************************************************************************************************************************************************************************************
                                                                                
                                                                          GET ALL USERS DATA IN XMARKET FUNCTION

******************************************************************************************************************************************************************************************/

export const getAllUsers = async () => {
  const firestore = getFirestore();
  const q = collection(firestore, "users");

  const querySnapshot = await getDocs(q);
  const users = [];

  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });

  return users;
};





/*****************************************************************************************************************************************************************************************
                                                                                
                                                                        GET ALL USER COLLECTIONS DATA IN XMARKET FUNCTION

******************************************************************************************************************************************************************************************/

export const getAllCollections = async () => {
  const firestore = getFirestore();
  const userCollectionsRef = collection(firestore, "userCollections");
  const usersRef = collection(firestore, "users");
  const nftsRef = collection(firestore, "nfts");

  const querySnapshot = await getDocs(userCollectionsRef);
  const collections = [];

  for (const doc of querySnapshot.docs) {
    const collectionData = doc.data();
    const walletAddress = collectionData.walletAddress;

    // Fetch corresponding user data
    const userQuerySnapshot = await getDocs(query(usersRef, where("walletAddress", "==", walletAddress)));
    const userDoc = userQuerySnapshot.docs[0];
    const userData = userDoc.exists ? userDoc.data() : null;

    // Fetch corresponding NFT data
    const collectionName = collectionData.collectionName;
    const nftQuerySnapshot = await getDocs(query(nftsRef, where("collectionName", "==", collectionName)));
    const nftData = nftQuerySnapshot.docs.map(nftDoc => nftDoc.data());


    console.log("NFT Data:", nftData);


    collections.push({
      id: doc.id,
      collection: collectionData,
      user: userData,
      nfts: nftData,
    });
  }

  return collections;
};





/*****************************************************************************************************************************************************************************************
                                                                                
                                                                               GET ALL NFTS DATA IN XMARKET FUNCTION

******************************************************************************************************************************************************************************************/

export const getAllNFTs = async () => {
  const firestore = getFirestore();
  const q = collection(firestore, "nfts");

  const querySnapshot = await getDocs(q);
  const nfts = [];

  querySnapshot.forEach((doc) => {
    nfts.push({ id: doc.id, ...doc.data() });
  });

  return nfts;
};
