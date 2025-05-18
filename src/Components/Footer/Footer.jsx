import { React, useEffect, useState } from 'react';
import './Footer.css';
// import footer_logo from '../Assets/Logo/Celestial flames logo 2.0.jpg';
import instagram_icon from '../Assets/SocialIcons/instagram.png';
import facebook_icon from '../Assets/SocialIcons/facebook.png';
import whatsapp_icon from '../Assets/SocialIcons/whatsapp.png';
import { Link } from 'react-router-dom';
import { getLogo } from '../../Context/api';

const Footer = () => {
  const [logo, setLogo] = useState('')
  useEffect(() => {
      const fetchLogo = async () => {
          try {
              const { data } = await getLogo()
              console.log(data)
              setLogo(data.logoUrl)
          } catch (error) {
              console.log(error)
          }
      }
      fetchLogo()
  }, [])
  return (
    <div className='footer'>
      {/* Left Section: Logo and Slogan */}
          <div className="footer-left">
            <img src={logo} alt="Celestial Flames Logo" />
            <p className="footer-name">Celestial Flames</p>
            <p className="footer-slogan">Illuminate your life today!</p>
          </div>

          {/* Center Section: Company Info and Shop Categories */}
          <div className="footer-center">
            <div className="footer-company">
              <h4>Company</h4>
              <Link to="/aboutus" onClick={() => window.scrollTo(0, 0)}>About Us</Link>
              <Link to="/contactus" onClick={() => window.scrollTo(0, 0)}>Contact Us</Link>
            </div>
            <div className="footer-shop">
              <h4>Shop</h4>
              <Link to="/shop" onClick={() => window.scrollTo(0, 4200)}>Glass Candles</Link>
              <Link to="/shop" onClick={() => window.scrollTo(0, 3500)}>Tins Candles</Link>
              <Link to="/shop" onClick={() => window.scrollTo(0, 2950)}>Molds Candles</Link>
              <Link to="/shop" onClick={() => window.scrollTo(0, 0)}>Other Candles</Link>
            </div>
          </div>

          {/* Right Section: Social Icons */}
          <div className="footer-right">
            <h4>Follow Us On</h4>
            <div className="footer-social-icons">
              <a href="https://www.instagram.com/celestial.flames.candles.co/" target="_blank" rel="noopener noreferrer">
                <img src={instagram_icon} alt="Instagram" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61560314546678" target="_blank" rel="noopener noreferrer">
                <img src={facebook_icon} alt="Facebook" />
              </a>
              <a href="https://wa.me/message/SCXFB5PPHQQ7K1" target="_blank" rel="noopener noreferrer">
                <img src={whatsapp_icon} alt="WhatsApp" />
              </a>
            </div>
      </div>
      {/* Copyright */}
      <div className="footer-copywrite">
        <hr />
        <p>Copyright © 2025 Celestial Flames. All Rights Reserved.</p>
      </div>

      {/* WhatsApp Floating Button */}
      <div className="whatsapp">
        <a href="https://wa.me/message/SCXFB5PPHQQ7K1" target="_blank" rel="noopener noreferrer">
          <button className="whatsapp-btn">
            {/* <img src={whatsapp_icon} alt="WhatsApp" className="whatsapp-icon" /> */}
            <span className="whatsapp-text">Chat In WhatsApp</span>
          </button>
        </a>
      </div>
    </div>
  );
};

export default Footer;
