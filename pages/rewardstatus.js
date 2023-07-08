
/* this gets ALL transaciotns
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAddress } from '@thirdweb-dev/react';

const XRPContractAddress = '0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe';
const apiKey = 'J2IMU8X7M74PMUWS8Y6M6DU37DYQG68H4A';

function RewardStatus() {
  const connectedWalletAddress = useAddress();
  const [walletAddress, setWalletAddress] = useState('');
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    if (connectedWalletAddress) {
      setWalletAddress(connectedWalletAddress);
    }
  }, [connectedWalletAddress]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${XRPContractAddress}&address=${walletAddress}&page=1&offset=1000&sort=desc&apikey=${apiKey}`;

      const response = await axios.get(url);
      const data = response.data.result;

      const rewardsData = data.map((item) => {
        const distDate = new Date(item.timeStamp * 1000);
        const rewardAmount = parseFloat(item.value) / 10 ** parseInt(item.tokenDecimal);

        return {
          date: distDate.toLocaleDateString(),
          reward: rewardAmount,
        };
      });

      setRewards(rewardsData);
    } catch (error) {
      console.error('Error retrieving reward information:', error);
      setRewards([]);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Reward Status</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="Enter wallet address"
            required
          />
          <button type="submit">Check Rewards</button>
        </form>
        {rewards.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h3>Total Rewards Received:</h3>
            <p>{rewards.reduce((total, reward) => total + reward.reward, 0)} XRP</p>
            <h3>Distribution Dates:</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 3fr)', fontSize: '12px', textAlign: 'left' }}>
              {rewards.map((reward, index) => (
                <div key={index}>
                  {reward.date} - {reward.reward} XRP
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RewardStatus;
*/


/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAddress } from "@thirdweb-dev/react";

const XRPContractAddress = '0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe';
const apiKey = 'J2IMU8X7M74PMUWS8Y6M6DU37DYQG68H4A';

function RewardStatus() {
  const connectedWalletAddress = useAddress();
  const [walletAddress, setWalletAddress] = useState('');
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    if (connectedWalletAddress) {
      setWalletAddress(connectedWalletAddress);
    }
  }, [connectedWalletAddress]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${XRPContractAddress}&address=${walletAddress}&page=1&offset=1000&sort=desc&apikey=${apiKey}`;

      const response = await axios.get(url);
      const data = response.data.result;

      const rewardsData = data.reduce((acc, item) => {
        if (item.to.toLowerCase() === walletAddress.toLowerCase()) {
          const distDate = new Date(item.timeStamp * 1000);
          const rewardAmount = parseFloat(item.value) / 10 ** parseInt(item.tokenDecimal);

          acc.push({
            date: distDate.toLocaleDateString(),
            reward: rewardAmount,
          });
        }

        return acc;
      }, []);

      setRewards(rewardsData);
    } catch (error) {
      console.error('Error retrieving reward information:', error);
      setRewards([]);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div>
        <h1>Reward Status</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="Enter wallet address"
            required
          />
          <button type="submit">Check Rewards</button>
        </form>
        {rewards.length > 0 && (
          <div>
            <h3>Total Rewards Received:</h3>
            <p>
              {rewards.reduce((total, reward) => total + reward.reward, 0)} XRP
            </p>
            <h3>Distribution Dates:</h3>
            <div style={{ columns: '3', fontSize: '12px' }}>
              {rewards.map((reward, index) => (
                <div key={index}>
                  {reward.date} - {reward.reward} XRP
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RewardStatus;
*/


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAddress } from "@thirdweb-dev/react";

const XRPContractAddress = '0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe';
const apiKey = 'J2IMU8X7M74PMUWS8Y6M6DU37DYQG68H4A';

function RewardStatus() {
  const connectedWalletAddress = useAddress();
  const [walletAddress, setWalletAddress] = useState('');
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    if (connectedWalletAddress) {
      setWalletAddress(connectedWalletAddress);
    }
  }, [connectedWalletAddress]);

  const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const url = `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${XRPContractAddress}&address=${walletAddress}&page=1&offset=1000&sort=desc&apikey=${apiKey}`;

    const response = await axios.get(url);
    const data = response.data.result;

    const rewardsData = data.reduce((acc, item) => {
      if (item.from.toLowerCase() === '0x2178571986e20db00b003e6b66ea53e8ca5edfc0' && item.to.toLowerCase() === walletAddress.toLowerCase()) {
        const distDate = new Date(item.timeStamp * 1000);
        const rewardAmount = parseFloat(item.value) / 10 ** parseInt(item.tokenDecimal);

        acc.push({
          date: distDate.toLocaleDateString(),
          reward: rewardAmount,
          from: item.from,
        });
      }

      return acc;
    }, []);

    const lastThreeDistributions = rewardsData.slice(Math.max(rewardsData.length - 3, 0));
    setRewards(lastThreeDistributions);
  } catch (error) {
    console.error('Error retrieving reward information:', error);
    setRewards([]);
  }
};




  return (
    <div style={{ marginTop: '100px', textAlign: 'center' }}>
      <h1>Reward Status</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="Enter wallet address"
          required
        />
        <button type="submit">Check Rewards</button>
      </form>
      {rewards.length > 0 ? (
        <div style={{ marginTop: '20px' }}>
          <h3>Total Rewards Received:</h3>
          <p>
            {rewards.reduce((total, reward) => total + reward.reward, 0)} XRP
          </p>
          <h3>Distribution Dates:</h3>
          <div style={{ columns: '3', fontSize: '12px', textAlign: 'left' }}>
            {rewards.map((reward, index) => (
              <div key={index}>
                {reward.date} - {reward.reward} XRP (from: {reward.from})
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No rewards found</p>
      )}
    </div>
  );
}

export default RewardStatus;
