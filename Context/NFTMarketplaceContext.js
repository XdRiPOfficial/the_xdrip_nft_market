
import React, { useState, useEffect } from "react";
//import { create as ipfsHttpClient } from "ipfs-http-client";
import Web3Modal from "web3modal";
import { NFTStorage, Blob } from 'nft.storage';
import marketplaceCA_ABI from "./marketplaceCA_ABI.json";
import mohCA_ABI from "./mohCA_ABI.json";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import {uploadToIPFS } from "../UploadNFT/UploadNFT"
import Web3 from 'web3';
import { firebaseApp, db } from '../firebase/config';
import { addNFT } from '../firebase/services';
import { getDocs, collection, query, where } from 'firebase/firestore';

const web3 = new Web3(Web3.givenProvider);

const apiKey = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY;
const client = new NFTStorage({ token: apiKey });


const NFTMarketplaceAddress = marketplaceCA_ABI.address;
const NFTMarketplaceABI = marketplaceCA_ABI.abi;
const MohAddress = mohCA_ABI.address;
const MohABI = mohCA_ABI.abi;

import { useRouter } from "next/router";
import axios from "axios";
import { ethers } from "ethers";
import {
  useSDK,
  useConnect,
  useAddress,
  useConnectionStatus,
} from "@thirdweb-dev/react";

// we use thirdweb for wallets 
const connectingWithSmartContract = async () => {
  try {
    const sdk = new ThirdwebSDK();
    await sdk.connect();
    const signer = sdk.getSigner();
    const contract = fetchMarketplaceContract(signer);
    return contract;
  } catch (error) {
    console.log("Something went wrong while connecting with contract", error);
  }
};


const fetchMarketplaceContract = (signerOrProvider) =>
  new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
  );


const fetchMohContract = (signerOrProvider) =>
  new ethers.Contract(MohAddress, MohABI, signerOrProvider);

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
  const titleData = "Discover, collect, and sell NFTs";
  const sdk = useSDK();
  const connect = useConnect();
  const address = useAddress();
  const connectionStatus = useConnectionStatus();
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const router = useRouter();
  const [nfts, setNfts] = useState([]);


  const disconnectWallet = () => {
    setCurrentAccount(null);
  };

  useEffect(() => {
    if (address) {
      setCurrentAccount(address);
      updateBalance();
    }
  }, [address]);

  const updateBalance = async () => {
    if (sdk.provider && currentAccount) {
      const ethProvider = new ethers.providers.Web3Provider(sdk.provider);
      const getBalance = await ethProvider.getBalance(currentAccount);
      const bal = ethers.utils.formatEther(getBalance);
      setAccountBalance(bal);
    }
  };

  const checkIfWalletConnected = async () => {
    if (address) {
      setCurrentAccount(address);
      updateBalance();
    } else {
      console.log("No account");
    }
  };

  useEffect(() => {
    if (connectionStatus === "connected") {
      checkIfWalletConnected();
    }
  }, [connectionStatus]);

  const handleConnect = async () => {
    await connect();
  };





async function createNFT(name, price, description, category, website, royalties, properties, image,  walletAddress, collectionName ) {
  if (!name || !description || !price || !image)
    return setError("Data Is Missing"), setOpenError(true);
    console.log('Incoming Data:', {
      name,
      price,
      description,
      category,
      website,
      royalties,
      properties,
      image,
      collectionName,
      walletAddress,
    });


    const data = JSON.stringify({ name, price, description, category, website, royalties, properties, image, });
    console.log('Incoming Data:', {
      walletAddress: address,
      collectionName: collectionName,    
      
    })
  try {
    const cid = await client.storeBlob(new Blob([data]));
    const url = `https://${cid}.ipfs.nftstorage.link`; // Updated base URL

    // convert the price to gwei before passing it to createSale
    const priceInGwei = ethers.utils.parseUnits(price.toString(), "gwei");
    //const priceInWei = ethers.utils.parseUnits(price.toString(), "wei");


    await createSale(url, priceInGwei, currentAccount, collectionName); 
    router.push("/myProfile");
  } catch (error) {
     if (error.code === 4001) {
       
    setError("Transaction rejected by the user");
     } else {
    setError("Error while creating NFT");
     }
    setOpenError(true);
  }
}


async function createSale(tokenURI, price, walletAddress, collectionName, tokenId) {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  const nftMarketplaceContract = new web3.eth.Contract(NFTMarketplaceABI, NFTMarketplaceAddress);
  const transactionParameters = {
    to: NFTMarketplaceAddress,
    from: account,
    data: nftMarketplaceContract.methods.createToken(tokenURI, price).encodeABI(),
    value: web3.utils.toHex(web3.utils.toWei('0.025', 'ether')) // Assuming the listing price is 0.025 ETH
  };
  
  console.log('Incoming Data 2:', {
    tokenURI, 
    collectionName  
  });
  console.log('Transaction Parameters:', transactionParameters);

  async function createNFTDataFromTokenURI(tokenURI) {
    const response = await fetch(tokenURI);
    const data = await response.json();
    const createNFTData = {
      name: data.name,
      price: data.price,
      description: data.description,
      category: data.category,
      website: data.website,
      royalties: data.royalties,
      properties: data.properties,
      image: data.image,
    };
    return createNFTData;
  }
  
  const createNFTData = await createNFTDataFromTokenURI(tokenURI);
  console.log('Extracted Data:', createNFTData);
  
  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });

    let receipt = null;
    let retryCount = 0;
    const maxRetryCount = 10;
    const delay = 5000; // Delay in milliseconds between retries

    // Retry until the receipt is available or the maximum retry count is reached
    while (receipt === null && retryCount < maxRetryCount) {
      await new Promise(resolve => setTimeout(resolve, delay)); // Delay between retries

      receipt = await web3.eth.getTransactionReceipt(txHash);
      retryCount++;
    }

    if (receipt === null) {
      throw new Error('Transaction receipt not available');
    }
    console.log('Transaction Logs:', receipt.logs); // Log the transaction logs

    if (receipt.logs.length === 0) {
      throw new Error('No logs in the transaction receipt');
    }

    const transferEventSignature = web3.eth.abi.encodeEventSignature('Transfer(address,address,uint256)');

    let tokenId = null;

    // Find the Transfer event logs and extract the tokenId
    for (const log of receipt.logs) {
      if (log.topics.length > 0 && log.topics[0] === transferEventSignature) {
        const tokenIdTopic = log.topics[3];
        tokenId = web3.utils.toDecimal(tokenIdTopic);
        break;
      }
    }

    console.log('Token ID:', tokenId);
    if (tokenId === null) {
      throw new Error('Token ID not found in the transaction logs');
    }

    console.log('Before Update TokenId:', {
      walletAddress: account,
      tokenIds: tokenId,
      collectionName: collectionName,
    });

        
    await addNFT( collectionName, walletAddress, createNFTData, tokenId);
    
    console.log('Final Token ID:', tokenId);

    return txHash;
  } catch (error) {
    console.error('Error creating NFT:', error);
    throw error;
  }
}










 //--FETCHNFTS FUNCTION

  const loadNFTs = async () => {
   
    try {
      if (currentAccount) {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://binance-testnet.rpc.thirdweb.com/"
      );
      const contract = connectingWithSmartContract(provider);
      const data = await contract.fetchMarketItems();
      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI, {});
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "bnb"
            );

            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
              category,
            };
          }        
        )
      );
      return items;

      }
    } catch (error) {
      
      setError("Error while fetching NFTS");
      setOpenError(true);
      
      console.log(error);
    }
     return [];
  };
  


async function fetchNFTs() {
  try {
    const nftMarketplaceContract = new web3.eth.Contract(NFTMarketplaceABI, NFTMarketplaceAddress);
    const data = await nftMarketplaceContract.methods.fetchMarketItems().call();

    console.log("Data fetched from smart contract:", data);

    const items = await Promise.all(data.map(async ({ tokenId, seller, owner, price }) => {
      const tokenURI = await nftMarketplaceContract.methods.tokenURI(tokenId).call();
      console.log("Token URI:", tokenURI);
      const { data: { name, description, image, category } } = await axios.get(tokenURI, {});
      console.log("NFT Item:", { tokenId, seller, owner, price, name, description, image, tokenURI, category });
      return {
        tokenId,
        
        seller,
        owner,
        price: web3.utils.fromWei(price, 'ether'),
        name,
        description,
        image,
        tokenURI,
        category,
      }
    }));
    return items;
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return [];
  }
}


  //--FETCHING MY NFT OR LISTED NFTs
  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      if (currentAccount) {
        const contract = await connectingWithSmartContract();

        const data =
          type == "fetchItemsListed"
            ? await contract.fetchItemsListed()
            : await contract.fetchMyNFTs();

        const items = await Promise.all(
          data.map(
            async ({ tokenId, seller, owner, price: unformattedPrice }) => {
              const tokenURI = await contract.tokenURI(tokenId);
              const {
                data: { image, name, description, category },
              } = await axios.get(tokenURI);
              const price = ethers.utils.formatUnits(
                unformattedPrice.toString(),
                "ether"
              );

              return {
                price,
                tokenId: tokenId.toNumber(),
                seller,
                owner,
                image,
                name,
                description,
                tokenURI,
                category,
              };
            }
          )
        );
        return items;
      }
    } catch (error) {
      setError("Error while fetching listed NFTs");
      setOpenError(true);
    }
  };

  useEffect(() => {
    fetchMyNFTsOrListedNFTs();
  }, []);
  
  

const buyNFT = async (nft) => {
  try {
    console.log("Gettin' Access to Your Account...");
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    console.log(`Account: ${account}`);

    console.log("Getting the Marketplace Contract...");
    const nftMarketplaceContract = new web3.eth.Contract(NFTMarketplaceABI, NFTMarketplaceAddress);

    console.log("Retrieving NFT data from IPFS...");
    const response = await fetch(nft.tokenURI);
    const data = await response.json();
    console.log(`Data: ${JSON.stringify(data)}`);
    console.log("NFT Metadata Price: ", data.price);

    console.log("Converting Price To Wei...");
    const priceInWei = web3.utils.toWei(data.price.split(" ")[0]);
    console.log(`Price in Wei: ${priceInWei}`);

    console.log("Gettin Your Deal Put Together...");
    const transactionParameters = {
      to: NFTMarketplaceAddress,
      from: account,
      data: nftMarketplaceContract.methods.createMarketSale(nft.tokenId).encodeABI(),
      value: web3.utils.toHex(web3.utils.toWei(data.price, 'ether')), //priceInWei
    };

    console.log("Gonna Need Some Gas ...");
    const gasEstimate = await window.ethereum.request({
      method: 'eth_estimateGas',
      params: [{...transactionParameters}],
    });
    console.log(`Gas Estimate : ${gasEstimate}`);

    // add gas estimate 
    transactionParameters.gas = gasEstimate;

    console.log(`Transaction Parameters: ${JSON.stringify(transactionParameters)}`);

    console.log("Ok, Let's Do It!");
    const txReceipt = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
    console.log(`Transaction Receipt:`, txReceipt);

    const msgValueWei = txReceipt.value;

    console.log("Sent :", msgValueWei);

    console.log("Redirecting to /author");
    router.push("/author");
  } catch (error) {
    console.error("Error while buying NFT", error);
    if (error.code === 4001) {
      // denied transaction signature
      setError("You rejected the transaction, signature denied.");
    } else {
      setError("Error while buying NFT");
    }
    setOpenError(true);
  }
};




  //----TRANSFER FUNDS

  const fetchTransferFundsContract = (signerOrProvider) =>
    new ethers.Contract(
      transferFundsAddress,
      transferFundsABI,
      signerOrProvider
    );

  const connectToTransferFunds = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchTransferFundsContract(signer);
      return contract;
    } catch (error) {
      console.log(error);
    }
  };
  //---TRANSFER FUNDS
  const [transactionCount, setTransactionCount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const transferEther = async (address, ether, message) => {
    try {
      if (currentAccount) {
        const contract = await connectToTransferFunds();
        console.log(address, ether, message);

        const unFormatedPrice = ethers.utils.parseEther(ether);
        // //FIRST METHOD TO TRANSFER FUND
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: address,
              gas: "0x5208",
              value: unFormatedPrice._hex,
            },
          ],
        });

        const transaction = await contract.addDataToBlockchain(
          address,
          unFormatedPrice,
          message
        );

        console.log(transaction);

        setLoading(true);
        transaction.wait();
        setLoading(false);

        const transactionCount = await contract.getTransactionCount();
        setTransactionCount(transactionCount.toNumber());
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //FETCH ALL TRANSACTION
  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const contract = await connectToTransferFunds();

        const avaliableTransaction = await contract.getAllTransactions();

        const readTransaction = avaliableTransaction.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        }));

        setTransactions(readTransaction);
        console.log(transactions);
      } else {
        console.log("On Ethereum");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <NFTMarketplaceContext.Provider
      value={{
        nfts,
        handleConnect,
        checkIfWalletConnected,
        uploadToIPFS,
        createNFT,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        createSale,
        currentAccount,
        titleData,
        setOpenError,
        openError,
        setError,
        error,
        transferEther,
        getAllTransactions,
        loading,
        accountBalance,
        transactionCount,
        transactions,
        disconnectWallet,
      }}
    >
      
      {children}
    </NFTMarketplaceContext.Provider>
  );
};