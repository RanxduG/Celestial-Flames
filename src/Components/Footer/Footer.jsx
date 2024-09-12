import React from 'react';
import './Footer.css';
import footer_logo from '../Assets/Logo/Celestial flames logo 2.0.jpg';
import instagram_icon from '../Assets/SocialIcons/instagram.png';
import facebook_icon from '../Assets/SocialIcons/facebook.png';
import whatsapp_icon from '../Assets/SocialIcons/whatsapp.png';
import { Link } from 'react-router-dom';

const Footer = () => {
    const handleClick = () => {
        window.scrollTo(0, 0);
      };

  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt="" />
            <p>Celestial Flames</p>
        </div>
        <ul className="footer-links">
            <Link onClick={() => window.scrollTo(0, 0)}><li>Company</li></Link>
            <Link onClick={() => window.scrollTo(0, 0)} to={'/aboutus'}><li>About</li></Link>
            <Link onClick={() => window.scrollTo(0, 0)} to={'/contactus'}><li>Contact</li></Link>
        </ul>
        <div className="footer-social-icons">
            <div className="footer-icons-container">
                <a href="https://www.instagram.com/celestial.flames.candles.co/" target="_blank" rel="noopener noreferrer">
                    <img src={instagram_icon} alt="Instagram" />
                </a>
            </div>
            <div className="footer-icons-container">
                <a href="https://www.facebook.com/profile.php?id=61560314546678" target="_blank" rel="noopener noreferrer">
                    <img src={facebook_icon} alt="Facebook" />
                </a>
            </div>
            <div className="footer-icons-container">
                <a href="https://wa.me/message/SCXFB5PPHQQ7K1" target="_blank" rel="noopener noreferrer">
                    <img src={whatsapp_icon} alt="WhatsApp" />
                </a>
            </div>
        </div>

        <div className="footer-copywrite">
            <hr />
            <p>Copywrite @ 2023 - All Rights Reserved.</p>
        </div>
        <div className='go-up'>
            <a href="#top" className="go_top" data-go-top>
                <button>Go Back up</button>
            </a>
        </div>
    </div>
  );
}

export default Footer;