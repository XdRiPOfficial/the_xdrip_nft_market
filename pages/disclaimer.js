import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Style from "../styles/userAgreement.module.css";


const Disclaimer = () => {
    return (
        <div className={Style.agreement}>
            <Head>
                <title>XMARKET NFT Marketplace Disclaimer</title>
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
                    <li className={Style.active}>
                        <span>DISCLAIMER</span>
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
                <Head>
                    <title>XMARKET NFT Marketplace Disclaimer</title>
                </Head>

                <div className={Style.agreement_box_box}>
                    <div className={Style.agreement_box_body_title}>
                        <h1>XMARKET LIABILITY DISCLAIMER</h1>
                    </div>
                    <div className={Style.agreement_box_body}>
                        <h2>General Notice</h2>
                        <p>
                            The content available on our Site, including but not limited to text, graphics, and information, is for general informational purposes only. The Site is not responsible for any inaccuracies, errors, or omissions in the content.
                        </p>

                        <h2>Risk Notice</h2>
                        <p>
                            You acknowledge that the purchase, sale, and use of Non-Fungible Tokens (NFTs), as well as the engagement in transactions involving cryptocurrencies, involve significant risks. These risks include, but are not limited to, financial loss, technology malfunctions, regulatory action, and market volatility. Cryptocurrencies and NFTs are subject to constant price fluctuations and trading in these assets can result in partial or complete loss of funds.
                        </p>
                        <p>
                            We do not provide any advice regarding the nature, potential value, or suitability of any particular transaction or investment strategy. Any decision to purchase or sell NFTs or cryptocurrencies is your decision and XMARKET cannot and does not guarantee the success, value, or profitability of any transaction or investment strategy.
                        </p>

                        <h2>Liability Limitations</h2>
                        <p>
                            To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services or any conduct or content of any third party on the services.
                        </p>

                        <h2>Third-Party Links & Content</h2>
                        <p>
                            Our Site may contain links to third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
                        </p>

                        <h2>Your Acceptance of these Terms</h2>
                        <p>
                            By using this Site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.
                        </p>

                        <h2>Changes to Disclaimer</h2>
                        <p>
                            We reserve the right to modify these terms from time to time at our sole discretion. Therefore, you should review this page periodically. When we change the Disclaimer in a material manner, we will update the 'last updated' date at the bottom of this page. Changes to this Disclaimer are effective when they are posted on this page.
                        </p>


                        <h2>Contacting us</h2>
                        <p>
                            If you have any questions about this Disclaimer, the practices of this site, or your dealings with this site, please contact us at legalnotices@xdrip.io
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
export default Disclaimer;