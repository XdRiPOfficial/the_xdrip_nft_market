import React, { useEffect } from 'react';
import axios from 'axios';

import xdripCA_ABI from "../Context/xdripCA_ABI.json";

const XdRiPContractAddress = xdripCA_ABI.address;
const XdRiPContractABI = xdripCA_ABI.abi;

const apiKey = "23D4NWWSUB2WH7FJCDP55DPRVG2BPTVHE5";


const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider);

const XdRiPContract = new web3.eth.Contract(XdRiPContractABI, XdRiPContractAddress);


async function checkRewardDistribution() {
  try {
    // Retrieve the necessary information from the XdRiP contract
    const storageSlot = web3.utils.soliditySha3("lastRewardBlock").substring(2, 10);
    const data = `0x${storageSlot}`;
    const result = await XdRiPContract.methods.getStorageAt(XdRiPContractAddress, data).call();

    // Convert the result to a number
    const lastRewardBlock = web3.utils.hexToNumber(result);

    const currentBlock = await web3.eth.getBlockNumber();

    // Compare the block numbers to check if a reward distribution has occurred
    if (currentBlock > lastRewardBlock) {
      // Reward distribution has occurred
      console.log('Reward distribution: Distributed');
    } else {
      console.log('Reward distribution: Not yet distributed');
    }

    // Make an API call to BscScan using the apiKey
    const bscScanUrl = `https://api.bscscan.com/api?module=account&action=balance&address=${XdRiPContractAddress}&apikey=${apiKey}`;
    const response = await axios.get(bscScanUrl);
    console.log('BscScan API response:', response.data.result);
  } catch (error) {
    console.error('Error retrieving reward distribution:', error);
  }
}

function RewardStatus() {
  useEffect(() => {
    console.log('Calling checkRewardDistribution');
    checkRewardDistribution();
  }, []);

  console.log('Rendering RewardStatus component');

  return (
    <div>
      <h1>Reward Status</h1>
      {/* Additional components or content */}
    </div>
  );
}

export default RewardStatus;
