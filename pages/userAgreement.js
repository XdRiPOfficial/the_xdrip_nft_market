import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Style from "../styles/userAgreement.module.css";


const UserAgreement = () => {
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
                    <li className={Style.active}>
                        <span>USER AGREEMENT</span>
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
                <div className={Style.agreement_box_box}>
                    <div className={Style.agreement_box_body_title}>
                        <h1>XMARKET USER AGREEMENT</h1>
                    </div>
                    <div className={Style.agreement_box_body}>
                        <h2>Authenticity and Originality</h2>
                        <p>
                            XMARKET is dedicated to the trade and promotion of 1/1 NFTs. Duplication or editioning of tokens is not allowed. Each NFT minted, sold, or purchased on our marketplace must be unique.
                        </p>

                        <h2>Content Creation Guidelines</h2>
                        <p>
                            You are free to create and trade as many unique NFTs as you wish, and establish as many collections as you desire. However, creating duplicates of your own NFTs or copying NFTs created by others, whether on XMARKET or elsewhere, is strictly prohibited.
                        </p>

                        <h2>Infringements</h2>
                        <p>
                            The submission of pornographic, lewd, suggestive, or any explicit adult content is strictly prohibited. We reserve the right to make judgments about appropriateness on a case by case basis. Violation of this rule will result in immediate action, which may include the deletion of offending NFTs and/or account suspension or termination, or both.
                        </p>

                        <h2>Copyright &amp; Intellectual Property</h2>
                        <p>
                            Respect for copyright and intellectual property rights is paramount at XMARKET. Uploading copyrighted material that you do not own the rights to is prohibited. This includes the unauthorized use of trademarks, logos, and other forms of intellectual property. Creators are solely responsible for ensuring they have the necessary rights to the content they upload.
                        </p>

                        <h2>Account Suspension and Termination</h2>
                        <p>
                            XMARKET reserves the right to suspend or terminate the accounts of users who violate these guidelines. Failure to adhere to these rules may result in account closure.
                        </p>

                        <h2>Community Safety and Reporting</h2>
                        <p>
                            If you come across any activity that violates these guidelines, please report it immediately using our reporting tool. Your proactive participation will help keep XMARKET a safe and professional space for all.
                        </p>

                        <p>
                            By creating, purchasing, or selling NFTs on XMARKET, you agree to these terms. These guidelines are in place to ensure that XMARKET remains a trusted platform for the trade of unique and valuable NFTs, to safeguard our creators and their creations, and to promote a secure and respectful marketplace.
                        </p>

                        <p>
                            Thank you for your understanding and cooperation. We look forward to seeing the unique creations you bring to the XMARKET community.
                        </p>
                        <div className={Style.agreement_box_body_update}>
                            <p>Last Updated: June 2, 2023</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default UserAgreement;
