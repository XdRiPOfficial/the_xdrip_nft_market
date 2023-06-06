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
                    <li className={Style.active}>
                        <span>PRIVACY POLICY</span>
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
                <Head>
                    <title>XMARKET NFT Marketplace Disclaimer</title>
                </Head>

                <div className={Style.agreement_box_box}>
                    <div className={Style.agreement_box_body_title}>
                        <h1>XMARKET PRIVACY POLICY</h1>
                    </div>
                    <div className={Style.agreement_box_body}>
                        <h2>Information We Collect</h2>
                        <p>
                            We may collect certain personal information from users, including but not limited to account information, transaction information, and communication information. This information is collected to facilitate the use of our platform, provide services, and improve the overall user experience.
                        </p>

                        <h2>Use of Information</h2>
                        <p>
                            The information we collect is used for various purposes, including but not limited to providing and improving the platform, facilitating transactions, communication with users, conducting analytics, and ensuring legal compliance.
                        </p>

                        <h2>Information Sharing</h2>
                        <p>
                            We may share personal information with trusted third-party service providers to assist us in operating and managing our platform. We may also share information in response to legal obligations, to protect our rights and interests, or with user consent for specific purposes.
                        </p>

                        <h2>Data Security</h2>
                        <p>
                            We take reasonable measures to protect the personal information we collect from unauthorized access, alteration, or disclosure. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute data security.
                        </p>

                        <h2>Third-Party Links</h2>
                        <p>
                            Our platform may contain links to third-party websites or services that are not owned or controlled by us. We are not responsible for the privacy practices or the content of those third-party sites. We encourage users to review the privacy policies of these websites before providing any personal information.
                        </p>

                        <h2>Children's Privacy</h2>
                        <p>
                            Our platform is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child without parental consent, we will take steps to remove that information from our servers.
                        </p>

                        <h2>Your Rights</h2>
                        <p>
                            As a user, you have certain rights regarding your personal information. You have the right to access, update, correct, and request the deletion of your data. If you have any questions, concerns, or requests related to your personal information, please contact us using the provided contact details.
                        </p>

                        <h2>Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, our privacy practices, or your dealings with our platform, you can contact us at privacy@xmarket.io.
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
