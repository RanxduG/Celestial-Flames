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
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icons">
            <div className="footer-icons-container">
                <a href="https://www.instagram.com/celestial.flames.candles.co/" target="_blank" rel="noopener noreferrer">
                    <img src={instagram_icon} alt="Instagram" />
                </a>
            </div>
            <div className="footer-icons-container">
                <a href="https://www.pinterest.com/yourprofile" target="_blank" rel="noopener noreferrer">
                    <img src={pintrest_icon} alt="Pinterest" />
                </a>
            </div>
            <div className="footer-icons-container">
                <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer">
                    <img src={whatsapp_icon} alt="WhatsApp" />
                </a>
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