import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Style from "../styles/userAgreement.module.css";

const PrivacyPolicy = () => {
    return (
        <div className={Style.agreement}>
            <Head>
                <title>XMARKET NFT Marketplace Privacy Policy</title>
            </Head>

            <div className={Style.sidebar}>
            <div className={Style.sidebar_header}>
          <Link href="/legalEntry">
            <a>
              <h2>LEGAL LINKS</h2>
            </a>
          </Link>
        </div>
                <ul>
                    <li>
                        <Link href="/userAgreement">
                            <a>USER AGREEMENT</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/disclaimer">
                            <a>DISCLAIMER</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/privacyPolicy">
                            <a>PRIVACY POLICY</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/disputeResolution">
                            <a>DISPUTE RESOLUTION</a>
                        </Link>
                    </li>
                    <li className={Style.active}>
                        <span>BUY/SELL AGREEMENTS</span>
                    </li>
                    <li>
                        <Link href="/liscensingOwnership">
                            <a>LISCENSING & OWNERSHIP</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/intellectualPropertyRights">
                            <a> PROPERTY RIGHTS</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/termsOfService">
                            <a>TERMS OF SERVICE</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/antiLaundering">
                            <a>ANTI-MONEY LAUNDERING</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/kycPolicies">
                            <a>KNOW YOUR CUSTOMER (KYC)</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/pauam">
                            <a>P.A.U.A.M</a>
                        </Link>
                    </li>

                </ul>
            </div>
            <div className={Style.agreement_box}>
                <Head>
                    <title>XMARKET BUY/SELL AGREEMENTS</title>
                </Head>

                <div className={Style.agreement_box_box}>
                    <div className={Style.agreement_box_body_title}>
                        <h1>XMARKET BUY/SELL AGREEMENTS</h1>
                    </div>
                    <div className={Style.agreement_box_body}>
                        <h2>Buyer Agreement</h2>
                        <p>
                        Buyers have a responsibility to exercise due diligence before making a commitment to purchase. This involves thoroughly examining the complete item listing, understanding every detail of the item's description, the asking price, and any additional terms and conditions set forth by the seller. When buyers indicate their intention to purchase an item, make an offer that is accepted by the seller, or emerge as the winning bidder on an item, they are entering into a legally binding contract to purchase the item in question. After payment has been confirmed, XMARKET will serve as the intermediary, facilitating the transfer of the digital asset from the seller to the buyer. XMARKET, however, does not claim ownership of the items listed on its marketplace. It merely provides a platform for the exchange of digital assets between buyers and sellers, serving to bridge the gap between parties and streamline the transaction process.
                        </p>

                        <h2>Seller Agreement</h2>
                        <p>
                        Sellers bear the responsibility to maintain the items they are listing for sale, as well as to categorize them correctly. This involves providing all relevant information about the item, including its asking price, details, and any other pertinent information a buyer would need to know. They are also responsible for ensuring that their listings and transactions are in complete compliance with XMARKET's policies and all applicable laws, local or international. Sellers must affirm that any content they upload with the intention of selling an item does not infringe upon any copyright, trademark, or other intellectual property rights. If a seller is found to have infringed on such rights, they will be held accountable and may be held legally liable for any damages that result from such infringements.
                        </p> 
                        <div className={Style.agreement_box_body_update}>
                            <p>Last Updated: June 2, 2023</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
