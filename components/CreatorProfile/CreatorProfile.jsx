import React, { useEffect, useState } from 'react';
import { getUser, getUserCollections } from 'firebase/services';

const CreatorProfile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [userCollections, setUserCollections] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUser(userId);
      setUserData(user);
    };

    const fetchUserCollections = async () => {
      const collections = await getUserCollections(userId);
      setUserCollections(collections);
    };

    fetchUserData();
    fetchUserCollections();
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{userData.username}</h1>
      <p>Email: {userData.email}</p>
      <p>Wallet Address: {userData.walletAddress}</p>
      <p>Profile Picture: <img src={userData.profilePictureUrl} alt="Profile" /></p>
      
      <h2>Collections Created:</h2>
      {userCollections.length > 0 ? (
        <ul>
          {userCollections.map((collection) => (
            <li key={collection.id}>
              Collection Name: {collection.collectionName}
              {/* Display other fields from the collection as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No collections created</p>
      )}
    </div>
  );
};

export default CreatorProfile;
