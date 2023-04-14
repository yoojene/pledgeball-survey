import React from "react";
import pledgeball_logo from "../../assets/images/Pledgeball_logo.png";
import rsk_logo from "../../assets/images/RSK_logo.png";

import "./Header.scss";
export default function Header() {
  return (
    <header className="header">
      <img src={pledgeball_logo} className="pledgeball-logo" alt="logo" />
      <img src={rsk_logo} className="rsk-logo" alt="logo" />
    </header>
  );
}
