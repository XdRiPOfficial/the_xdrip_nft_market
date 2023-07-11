import React, { useState, useEffect } from "react";
import axios from "axios";

import mohCA_ABI from "../Context/mohCA_ABI.json";
import ipfsHashes from "../Context/ipfsHashes";

const MohAddress = mohCA_ABI.address;
const MohABI = mohCA_ABI.abi;
const apiKey = 'J2IMU8X7M74PMUWS8Y6M6DU37DYQG68H4A';

const MohContractInfo = () => {
  const [totalSupply, setTotalSupply] = useState(0);
  const [availableNFTs, setAvailableNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchContractInfo();
  }, []);

  const fetchContractInfo = async () => {
  try {
    // Fetch total supply
    const totalSupplyUrl = `https://api.bscscan.com/api?module=token&action=tokeninfo&contractaddress=${MohAddress}&apikey=${apiKey}`;
    const totalSupplyResponse = await axios.get(totalSupplyUrl);
    const totalSupplyData = totalSupplyResponse.data.result;
    const totalSupply = parseFloat(totalSupplyData.totalSupply);
    setTotalSupply(totalSupply);

    // Fetch available NFTs
    const availableNFTsUrl = `https://api.bscscan.com/api?module=account&action=tokennfttx&contractaddress=${MohAddress}&address=${MohAddress}&page=1&offset=1000&sort=asc&apikey=${apiKey}`;
    const availableNFTsResponse = await axios.get(availableNFTsUrl);
    const availableNFTsData = availableNFTsResponse.data.result;
    const availableNFTs = availableNFTsData.map((nft) => ({
      tokenId: nft.tokenID,
      from: nft.from,
      to: nft.to,
      timestamp: new Date(parseInt(nft.timeStamp) * 1000).toLocaleString(),
      tokenUri: nft.tokenURI,
    }));
    setAvailableNFTs(availableNFTs);

    setIsLoading(false);
  } catch (error) {
    console.error("Error retrieving MOH contract information:", error);
    setIsLoading(false);
  }
};

  return (
    <div>
      <h2>MOH Contract Information</h2>
      <p>Total Supply: {totalSupply}</p>
      <h3>Available NFTs:</h3>
      {availableNFTs.length > 0 ? (
        <ul>
          {availableNFTs.map((nft) => (
            <li key={nft.tokenId}>
              <p>Token ID: {nft.tokenId}</p>
              <p>From: {nft.from}</p>
              <p>To: {nft.to}</p>
              <p>Timestamp: {nft.timestamp}</p>
              <p>Token URI: {nft.tokenUri}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No available NFTs</p>
      )}
    </div>
  );
};

export default MohContractInfo;
