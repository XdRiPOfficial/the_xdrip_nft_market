import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Style from "../styles/userAgreement.module.css";

const LiscensingOwnership = () => {
    return (
        <div className={Style.agreement}>
            <Head>
                <title>XMARKET Liscensing & Ownership Policy</title>
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
                    <li>
                        <Link href="/buyerSellerAgreements">
                            <a>BUY/SELL AGREEMENTS</a>
                        </Link>
                    </li>
                    <li className={Style.active}>
                        <span>LISCENSING & OWNERSHIP</span>
                    </li>
                    <li>
                        <Link href="/intellectualPropertyRights">
                            <a>PROPERTY RIGHTS</a>
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
                    <title>XMARKET LISCENSING & OWNERSHIP POLICY</title>
                </Head>

                <div className={Style.agreement_box_box}>
                    <div className={Style.agreement_box_body_title}>
                        <h1>XMARKET LISCENSING & OWNERSHIP POLICY</h1>
                        <a>
                            When listing an item for sale on XMARKET, the seller agrees to grant the buyer a non-exclusive, worldwide, royalty-free license. This license allows the buyer to use, reproduce, distribute, prepare derivative works from, and display the content of the listing in any media format and through any media channels. The license is global, covering all countries and territories, and it is royalty-free, meaning the buyer does not need to make any payments to the seller or any other entity for the usage rights it grants. Once the transaction is completed, the buyer acquires ownership rights of the purchased digital asset, allowing them to use it as they see fit within the bounds of the license terms. However, all intellectual property rights associated with the original artwork remain with the original creator, thereby protecting their creative rights.
                        </a>
                    </div>
                    <div className={Style.agreement_box_body}>
                        <div className={Style.agreement_box_body_update}>
                            <p>Last Updated: June 2, 2023</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiscensingOwnership;
