import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Style from "../styles/userAgreement.module.css";

const TermsOfService = () => {
    return (
        <div className={Style.agreement}>
            <Head>
                <title>XMARKET NFT TERMS OF SERVICE</title>
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
                            <a> BUY/SELL AGREEMENTS</a>
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
                    <li
                        className={Style.active}>
                        <span>TERMS OF SERVICE</span>
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
                    <title>XMARKET TERMS OF SERVICE</title>
                </Head>

                <div className={Style.agreement_box_box}>
                    <div className={Style.agreement_box_body_title}>
                        <h1>XMARKET TERMS OF SERVICE</h1>
                        <a>
                            Users of the XMARKET platform must agree to conduct themselves in a responsible and lawful manner while using the service. They commit not to participate in any activities that violate any law, infringe on the rights of XMARKET, or are detrimental to the user experience of the site. The terms of service may change at XMARKET's discretion and without prior notice to the users. Therefore, it falls upon the users to regularly review the terms of service to stay updated on any modifications.
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

export default TermsOfService;
