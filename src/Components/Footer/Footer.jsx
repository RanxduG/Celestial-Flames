import React from 'react';
import './Footer.css';
import footer_logo from '../Assets/Celestial flames logo 2.0.jpg';
import instagram_icon from '../Assets/instagram.png';
import pintrest_icon from '../Assets/pintrest-logo.png';
import whatsapp_icon from '../Assets/whatsapp.png';

const Footer = () => {

  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt="" />
            <p>Celestial Flames</p>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icons">
            <div className="footer-icons-container">
                <img src={instagram_icon} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={pintrest_icon} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={whatsapp_icon} alt="" />
            </div>
        </div>
        <div className="footer-copywrite">
            <hr />
            <p>Copywrite @ 2023 - All Rights Reserved.</p>
        </div>
    </div>
  );
}

export default Footer;