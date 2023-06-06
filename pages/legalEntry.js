import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Style from "../styles/userAgreement.module.css";
import { Button, Category, Brand } from "../components/componentsindex";

const LegalEntry = () => {
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
            <h1>Welcome to XMARKET NFT Marketplace Legal Page</h1>
            <div className={Style.agreement_box_body_fill_box}>
              <div className={Style.agreement_box_body_fill}>
              <div className={Style.agreement_box_body_fill}></div>
                  <a>
                  Welcome to XMARKET, a 1/1 NFT marketplace committed to upholding the unique and rare value of non-fungible tokens (NFTs).
                  </a>
                
                <div className={Style.agreement_box_body_fill}></div>
                  <a>
                    At XMARKET, we value transparency, accountability, and the protection of our users' rights. We believe in creating a secure and trustworthy environment for all participants of our marketplace. As part of our commitment to these principles, we have developed comprehensive legal policies that govern the use of our platform.
                  </a>                
                <div className={Style.agreement_box_body_fill}></div>
                <a>
                  Please take a moment to familiarize yourself with our legal documents, which includes the User Agreement, Disclaimer, Privacy Policy, and KYC terms. These documents outline your rights and obligations as a user and provide important information about how we handle your personal data, manage risks, and ensure a fair and compliant marketplace.
                </a>
              </div>
              <div className={Style.agreement_box_body_fill}></div>
              <a>
                To access each legal document, please click on the corresponding link to the left. We encourage you to read them carefully to ensure a clear understanding of the terms and conditions that govern your use of XMARKET NFT Marketplace.
              </a>
            </div>
          </div>
          <div className={Style.agreement_box_body}>

            <div className={Style.agreement_box_body_update}>
              <Link href="/contactus">
                <a className={Style.button}>CONTACT US</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default LegalEntry;
