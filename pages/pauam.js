import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Style from "../styles/userAgreement.module.css";

const PAUAM = () => {
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
                        <li>
                            <Link href="/antiLaundering">
                                <a>ANTI-MONEY LAUNDERING</a>
                            </Link>
                        </li>
                    </li>
                    <li>
                        <Link href="/kycPolicies">
                            <a>KNOW YOUR CUSTOMER (KYC)</a>
                        </Link>
                    </li>
                    <li className={Style.active}>
                        <span>P.A.U.A.M</span>
                    </li>

                </ul>
            </div>
            <div className={Style.agreement_box}>
                <Head>
                    <title>XMARKET PROTECTION AGAINST UNAUTHORIZED ACCESS AND MISUSE(AML) POLICIES</title>
                </Head>

                <div className={Style.agreement_box_box}>
                    <div className={Style.agreement_box_body_title}>
                        <h1>XMARKET PROTECTION AGAINST UNAUTHORIZED ACCESS AND MISUSE</h1>
                        <div className={Style.agreement_box_body_fill_box}>
                            <div className={Style.agreement_box_body_fill}>
                                <a>
                                    XMARKET is steadfast in its commitment to ensuring the security of the platform and the protection of user data. The platform employs sophisticated cybersecurity measures and uses state-of-the-art security technologies and protocols to safeguard the network infrastructure.
                                </a>
                            </div>
                            <div className={Style.agreement_box_body_fill}>
                                <a>
                                    Unauthorized access, hacking, or any other form of misuse of the platform is strictly prohibited. This extends to any attempt to compromise the security of the site, such as through phishing, spreading of malware, exploiting software vulnerabilities, or creating unauthorized access points.
                                </a>
                            </div>
                            <div className={Style.agreement_box_body_fill}>
                                <a>
                                    If any user is found to be engaging in such illicit activities, XMARKET will take immediate and decisive action, which may include suspension or termination of the user's account. Furthermore, such violations will be reported to relevant law enforcement authorities.
                                </a>
                            </div>
                            <div className={Style.agreement_box_body_fill}>
                                <a>
                                    XMARKET will pursue the prosecution of offenders to the fullest extent of the law. Any unauthorized actions against the platform may result in civil or criminal penalties, including but not limited to fines, imprisonment, or both.
                                </a>
                            </div>
                            <div className={Style.agreement_box_body_fill}>
                                <a>
                                    Users are responsible for maintaining the confidentiality of their account credentials, including passwords, and are liable for all activities that occur under their account. We strongly urge users to report any suspicious activity or suspected security breaches promptly to XMARKET's dedicated security team.
                                </a>
                            </div>
                            <div className={Style.agreement_box_body_fill}>
                                <a>
                                    We assure our users that we take every report seriously and will investigate thoroughly to maintain the security and integrity of the platform. By using XMARKET, users agree to abide by these security terms and understand the legal ramifications of any breach of these terms.
                                </a>
                            </div>
                            <div className={Style.agreement_box_body_fill}>
                                <a>
                                    In addition to XMARKET's efforts to maintain a secure environment, users are encouraged to adopt safe online practices to protect their personal information.
                                </a>
                            </div>
                        </div>

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

export default PAUAM;
