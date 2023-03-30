import React from 'react'
import logo from '../../assets/images/logo.png';

import './Header.scss'
export default function Header() {
  return (
     <header className="header"> 
        <img src={logo} className="logo" alt="logo" />
      </header> 
  )
}
