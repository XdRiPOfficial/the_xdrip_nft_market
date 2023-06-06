import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Style from "../styles/userAgreement.module.css";

const KYCPolicies = () => {
    return (
        <div className={Style.agreement}>
            <Head>
                <title>XMARKET NFT KYC POLICIES</title>
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
                    <li>
                        <Link href="/liscensingOwnership">
                            <a>LISCENSING & OWNERSHIP </a>
                        </Link>
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
                        <li className={Style.active}>
                            <span>KNOW YOUR CUSTOMER (KYC)</span>
                        </li>
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
                    <title>XMARKET KNOW YOUR CUSTOMER (KYC)</title>
                </Head>

                <div className={Style.agreement_box_box}>
                    <div className={Style.agreement_box_body_title}>
                        <h1>XMARKET KNOW YOUR CUSTOMER (KYC) </h1>
                        <a>

                            In adherence to regulatory standards and to maintain the integrity of its platform, XMARKET implements a stringent Know Your Customer (KYC) policy. This policy involves verifying the identity of its users and is crucial in preventing fraudulent activities such as identity theft, financial fraud, and money laundering.

                            During the registration process, users may be required to provide certain personal information, which may include their legal name, residential address, and identification documents. The extent and nature of this KYC process may vary based on the specific sector of the marketplace that the user intends to utilize, or the volume of transactions that the user intends to carry out.

                            For instance, users participating in sectors involving real estate transactions or vehicle titling may be subject to additional KYC requirements given the inherent high-value nature of these assets and the specific legal regulations surrounding their transfer. Similarly, users engaging in high-volume transactions across any sector may be subject to a more comprehensive KYC process.

                            These enhanced measures ensure the safety and security of all marketplace participants and are in place to comply with all relevant legal and regulatory requirements. This process fortifies the trustworthiness of XMARKET by ensuring that every transaction is conducted between verified and authenticated parties, thereby reducing the risk of unauthorized access and providing a secure trading environment.

                            XMARKET reserves the right to request further information at any time to verify and confirm the identity of its users. By participating in XMARKET's platform, users agree to these KYC requirements and acknowledge that their ability to access and use certain features of the platform may be dependent on their compliance with these verification processes.                        </a>
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

export default KYCPolicies;
