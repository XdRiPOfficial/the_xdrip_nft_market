import React, { useContext } from 'react';
import { MyMPNFTContext } from '../Context/MyMPNFTContext';

const MPNFTPage = () => {
  const marketItems = useContext(MyMPNFTContext);

  return (
    <div>
      <h2>MPNFT Page</h2>
      {marketItems.map((item) => (
        <div key={item.tokenId}>
          <p>Token ID: {item.tokenId}</p>
          <p>Seller: {item.seller}</p>
          <p>Owner: {item.owner}</p>
          <p>Price: {item.price}</p>
          <p>Sold: {item.sold ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
};

export default MPNFTPage;
