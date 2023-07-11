
/* org FAQ 
import React, { useState } from 'react';
import Style from "../styles/faqs.module.css";
import { Brand } from "../components/componentsindex";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const onQuestionClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqItems = [
        {
            question: 'What is an NFT?',
            answer: 'An NFT (Non-Fungible Token) is a unique digital asset that is stored on a blockchain.'
        },
        {
            question: 'How do I buy an NFT?',
            answer: 'To buy an NFT, you will need to have a cryptocurrency wallet and enough funds to purchase the NFT. You can then find and purchase the NFT on an NFT marketplace.'
        },
        {
            question: 'Can I buy an NFT with fiat currency?',
            answer: 'Most NFT marketplaces require payment in cryptocurrency, but some may allow payment with fiat currency.'
        },
        {
            question: 'How do I sell an NFT?',
            answer: 'To sell an NFT, you need to create an account on an NFT marketplace and list your NFT for sale. You can set a fixed price or put it up for auction.'
        },
        {
            question: 'What is an NFT marketplace?',
            answer: 'An NFT marketplace is an online platform that allows users to buy, sell, and trade non-fungible tokens.'
        },
        {
            question: 'What can I do with an NFT?',
            answer: 'You can hold an NFT as a digital collectible or sell it on an NFT marketplace. Some NFTs also provide access to exclusive content or events.'
        },
        {
            question: 'How do I create an NFT?',
            answer: 'You can create an NFT by uploading a digital file, such as an image or video, to a platform that supports NFTs.'
        },
        {
            question: 'How do I store my NFTs?',
            answer: 'NFTs can be stored in a digital wallet that supports the blockchain on which the NFT was created.'
        },
        {
            question: 'What is gas fee and why do I need to pay it?',
            answer: 'Gas fees are a form of transaction fee required to process transactions on a blockchain. They are paid in cryptocurrency and vary based on network congestion and the complexity of the transaction.'
        },
        {
            question: 'How do royalties work for NFTs?',
            answer: 'Royalties are automatic payments made to the original creator of an NFT every time it is resold on an NFT marketplace. The percentage of the royalty and the length of time it is in effect can vary depending on the NFT marketplace.'
        },
        {
            question: 'How do I store my NFTs?',
            answer: 'NFTs can be stored in a digital wallet that supports the blockchain on which the NFT was created.'
        },
        {
            question: 'What happens if I lose my NFT?',
            answer: 'If you lose your NFT, it may be difficult or impossible to recover it. It is important to keep your digital wallet and private keys secure to avoid losing your NFT.'
        },
    ];

    const renderedItems = faqItems.map((item, index) => {
        const isActive = index === activeIndex;

        return (
            <React.Fragment key={index}>
                <div
                    className={Style.ui_accordion_title}
                    onClick={() => onQuestionClick(index)}
                >
                    {item.question}

                    {isActive ? <i className="dropdown_icon active">&#45;</i> : <i className="dropdown_icon">&#43;</i>}

                </div>
                <div className={`${Style.ui_accordion_content} ${isActive ? Style.active : ''}`}>
                    <p>{item.answer}</p>
                </div>
            </React.Fragment>
        );
    });

    return (
        <div className={Style.ui_styled_accordion}>
                      <h1>XMARKET FAQS</h1>
                      <h3>IF YOU HAVE ANY OTHER QUESTIONS YOU FIND RELEVENT PLEASE CONTACT THE DEVELOPERS</h3>
                      <div className={Style.ui_styled_accordion_box}>
                {renderedItems}
            </div>
            <div className={Style.brand}></div>
            <Brand />
        </div>
    );
};

export default FAQ;

*/

import React, { useState } from 'react';
import Style from "../styles/faqs.module.css";
import { Brand } from "../components/componentsindex";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const onQuestionClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqItems = [
        {
            question: 'What is XMARKET?',
            answer: 'XMARKET is a Binance Smart Chain-based NFT marketplace that allows users to create, buy, sell, and trade unique digital assets known as Non-Fungible Tokens (NFTs). By utilizing the power of blockchain technology, XMARKET ensures the provenance, scarcity, and ownership of these digital assets.'
        },
        {
            question: 'What is a Non-Fungible Token (NFT)?',
            answer: 'A Non-Fungible Token (NFT) is a unique digital asset that represents ownership of a specific item or piece of content, such as artwork, music, or virtual real estate. Unlike cryptocurrencies like Bitcoin or Ethereum, NFTs are not interchangeable, as each one has a unique value and cannot be exchanged one-to-one.'
        },
        {
            question: 'How do I get started on XMARKET?',
            answer: 'To get started on XMARKET, you need to: a. Install a Binance Smart Chain-compatible wallet, such as MetaMask or Trust Wallet. b. Add the Binance Smart Chain network to your wallet. c. Fund your wallet with Binance Coin (BNB) to pay for transactions. d. Connect your wallet to XMARKET and start exploring the marketplace.'
        },
        {
            question: 'How do I create an NFT on XMARKET?',
            answer: 'To create an NFT on XMARKET, follow these steps: a. Click the "Create" option, then choose "Create an NFT" or "Create a Collection" button on the XMARKET website. b. Upload your digital file (image, video, or audio). c. Provide a title, description, and any additional details for your NFT. d. Set the initial price, royalties, and other parameters. e. Confirm the details and pay the associated fees in BNB to mint your NFT.'
        },
        {
            question: 'How do I buy an NFT on XMARKET?',
            answer: 'To buy an NFT on XMARKET: a. Browse the marketplace for an NFT you\'re interested in. b. Click on the NFT to view its details and click "Buy Now" or "Place a Bid." c. Confirm the transaction details and pay the associated fees in BNB. d. The NFT will be transferred to your connected wallet upon successful transaction.'
        },
        {
            question: 'How do I sell an NFT on XMARKET?',
            answer: 'To sell an NFT on XMARKET: Your NFT creations are automatically listed for sale on the marketplace.'
        },
        {
            question: 'Can I trade NFTs from other blockchains on XMARKET?',
            answer: 'Currently, XMARKET only supports NFTs created on the Binance Smart Chain. However, future updates may include support for cross-chain trading of NFTs from other networks like Ethereum or Solana.'
        },
        {
            question: 'How does XMARKET ensure the authenticity and provenance of NFTs?',
            answer: 'XMARKET leverages blockchain technology to provide a transparent and immutable record of each NFT\'s creation, ownership, and transaction history. This ensures the authenticity and provenance of NFTs traded on the platform.'
        },
        {
            question: 'What fees does XMARKET charge?',
            answer: 'Fees can vary depending on whether you are buying or selling. Please refer to our fee structure page for detailed information.'
        },
        {
            question: 'What is Binance Smart Chain (BSC)?',
            answer: 'Binance Smart Chain is a blockchain network built for running smart contract-based applications. It aims to ensure fast, high-performance transactions and is compatible with the Ethereum Virtual Machine (EVM).'
        },
        {
            question: 'What wallets are compatible with XMARKET?',
            answer: 'XMARKET is compatible with a range of BSC-compatible wallets such as MetaMask, Trust Wallet, and Binance Chain Wallet. Always ensure that your wallet is configured for the Binance Smart Chain network.'
        },
        {
            question: 'Can I cancel a purchase or sale?',
            answer: 'Once a transaction is confirmed on the blockchain, it is permanent and cannot be reversed. Please make sure to double-check all details before confirming a transaction.'
        },
        {
            question: 'How do I know the NFT I\'m buying is authentic?',
            answer: 'Every NFT listed on XMARKET is associated with a unique token on the blockchain, which verifies its authenticity. However, buyers should still do their own research to ensure the NFT\'s value.'
        },
        {
            question: 'What happens if I lose access to my wallet?',
            answer: 'If you lose access to your wallet, XMARKET cannot recover your assets. It\'s crucial to keep your wallet\'s private keys or recovery phrases in a secure place.'
        },
        {
            question: 'Can I interact with XMARKET without a wallet?',
            answer: 'You can browse NFTs on XMARKET without a wallet. However, to buy, sell, or trade NFTs, a digital wallet is required.'
        },
        {
            question: 'What can I do if I encounter a problem or need support?',
            answer: 'If you encounter any issues or require assistance, please visit our support page and submit a ticket. Our team will get back to you as soon as possible.'
        },
        {
            question: 'Why is my transaction taking so long?',
            answer: 'Transactions on the Binance Smart Chain are usually fast. However, in times of high network congestion, transactions can take longer than usual. If a transaction is pending for a long time, it may be worth considering increasing the gas fee.'
        },
        {
            question: 'Can I list any type of NFT on XMARKET?',
            answer: 'You can list any type of NFT as long as it\'s compatible with the Binance Smart Chain and adheres to our community guidelines and terms of service. Please ensure the content does not infringe on the rights of others and is not offensive or illegal.'
        },
        {
            question: 'How can I trust the seller?',
            answer: 'While blockchain transactions are secure, it\'s always important to do your due diligence. Check the seller\'s history and reviews where available, and always be cautious of deals that seem too good to be true.'
        },
        {
            question: 'What are "gas fees" and why do I have to pay them?',
            answer: '"Gas fees" are transaction costs on the Binance Smart Chain network. They are paid to incentivize miners to process and validate your transaction. The amount varies based on network congestion.'
        },
        {
            question: 'Can I preview an NFT before buying it?',
            answer: 'Most NFTs on XMARKET should have preview images or descriptions, but the level of detail depends on the seller. Always ensure you have sufficient information before making a purchase.'
        },
        {
            question: 'What forms of payment does XMARKET accept?',
            answer: 'XMARKET currently accepts BNB (Binance Coin) for transactions. You need to have BNB in your connected wallet to buy, sell, or create NFTs on XMARKET.'
        },
  
        {
            question: 'How do I connect my wallet to XMARKET?',
            answer: 'You can connect your wallet by clicking on the "Connect Wallet" button on the top right corner of the XMARKET homepage. XMARKET supports various wallets such as MetaMask, Trust Wallet, and WalletConnect. Follow the prompts to complete the connection process.'
        },
        {
            question: 'How is the value of an NFT determined on XMARKET?',
            answer: 'The value of an NFT on XMARKET is primarily determined by the seller. However, factors such as the artist\'s reputation, the uniqueness of the token, and the demand in the marketplace can influence its value.'
        },
        {
            question: 'Is my transaction on XMARKET secure?',
            answer: 'Yes, transactions on XMARKET are secured by the Binance Smart Chain. However, like all online transactions, users should take certain precautions, like verifying the identity of the buyer/seller and the details of the transaction.'
        },
        {
            question: 'What can I do if I have issues or need support while using XMARKET?',
            answer: 'If you encounter any issues or need assistance while using XMARKET, you can reach out to the customer support team through the "Help Center" section.'
        }
    ];

    const renderedItems = faqItems.map((item, index) => {
        const isActive = index === activeIndex;

        return (
            <React.Fragment key={index}>
                <div
                    className={Style.ui_accordion_title}
                    onClick={() => onQuestionClick(index)}
                >
                    {item.question}

                    {isActive ? <i className="dropdown_icon active">&#45;</i> : <i className="dropdown_icon">&#43;</i>}

                </div>
                <div className={`${Style.ui_accordion_content} ${isActive ? Style.active : ''}`}>
                    <p>{item.answer}</p>
                </div>
            </React.Fragment>
        );
    });

    return (
        <div className={Style.ui_styled_accordion}>
            <h1>XMARKET FAQS</h1>
            <h3>IF YOU HAVE ANY OTHER QUESTIONS YOU FIND RELEVANT PLEASE CONTACT THE DEVELOPERS</h3>
            <div className={Style.ui_styled_accordion_box}>
                {renderedItems}
            </div>
            <div className={Style.brand}></div>
            <Brand />
        </div>
    );
};

export default FAQ;
