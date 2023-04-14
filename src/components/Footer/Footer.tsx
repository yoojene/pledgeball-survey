import Button from "@mui/material/Button/Button";
import React from "react";
import pledgeball_logo from "../../assets/images/Pledgeball_logo.png";
import rsk_logo from "../../assets/images/RSK_logo_rgb-green-cropped.png";

import "./Footer.scss";
const Footer: React.FC<any> = ({}) => {
  return (
    <footer>
      <div className="footer">
        <div className="pledgeball-logo-container">
          <img src={pledgeball_logo} className="pledgeball-logo" alt="logo" />
          <span className="charity-ref">Charity Number: 1194263</span>
        </div>
      </div>
      <div className="rsk-logo-container">
        <img src={rsk_logo} className="rsk-logo-green" alt="logo" />
      </div>
    </footer>
  );
};

export default Footer;
