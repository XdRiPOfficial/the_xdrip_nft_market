import React, { createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import marketplaceAbi from './marketplaceV2CA_ABI.json';

export const MyMPNFTContext = createContext([]);

const MyMPNFTContextProvider = ({ children }) => {
  const [marketItems, setMarketItems] = useState([]);



  useEffect(() => {
    const fetchMarketItems = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contractAddress = marketplaceAbi.address;
        const contract = new ethers.Contract(contractAddress, marketplaceAbi.abi, provider);

        const items = await contract.fetchMarketItems();

        setMarketItems(items);
      } catch (error) {
        console.error('Error retrieving market items:', error);
      }
    };

    fetchMarketItems();
  }, []);



/*
useEffect(() => {
  const fetchWalletItems = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();

      const contractAddress = marketplaceAbi.address;
      const contract = new ethers.Contract(contractAddress, marketplaceAbi.abi, provider);

      // Instead of fetchMarketItems, use a method like balanceOf or tokensOfOwner
      // For instance, if we had a balanceOf method in the NFT contract
      const balance = await contract.balanceOf(userAddress);
      
      const items = [];
      // Now we iterate over the balance to get the tokenIds of the NFTs
      for(let i = 0; i < balance; i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(userAddress, i);
        const item = await contract.tokenURI(tokenId);
        items.push(item);
      }

      setMarketItems(items);
    } catch (error) {
      console.error('Error retrieving wallet items:', error);
    }
  };

  fetchWalletItems();
}, []);

*/

  return (
    <MyMPNFTContext.Provider value={marketItems}>
      {children}
    </MyMPNFTContext.Provider>
  );
};

export default MyMPNFTContextProvider;
