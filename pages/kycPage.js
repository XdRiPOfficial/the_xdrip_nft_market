
import React from 'react';
import KYC from '../loginAndSignUp/KYC/KYC';
import Style from "../styles/kycPage.module.css";
import { Slider, Brand, Loader, Title } from "../components/componentsindex";

const KYCPage = () => {
  return (
  <div className={Style.kycPage}>
          <Title
        heading="XMARKET KYC APPLICATION"
        paragraph="BECOME A KYC VERIFIED CREATOR/USER"
      />
    <KYC />
    </div>
  );
};

export default KYCPage;