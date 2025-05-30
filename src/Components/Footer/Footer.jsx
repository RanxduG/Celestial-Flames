import React, { useEffect, useState } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { getLogo } from '../../Context/api';
import instagram_icon from '../Assets/SocialIcons/instagram.png';
import facebook_icon from '../Assets/SocialIcons/facebook.png';
import whatsapp_icon from '../Assets/SocialIcons/whatsapp.png';

const Footer = () => {
  const [logo, setLogo] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const { data } = await getLogo();
        console.log(data);
        setLogo(data.logoUrl);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLogo();
  }, []);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Add your newsletter signup logic here
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      // You can add a success message here
    }, 1000);
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-main">
            {/* Brand Section */}
            <div className="footer-brand">
              <div className="footer-logo-container">
                <img src={logo} alt="Celestial Flames Logo" className="footer-logo" />
                <div className="footer-brand-text">
                  <h3 className="footer-brand-name">Celestial Flames</h3>
                  <p className="footer-brand-tagline">Share The Light!</p>
                </div>
              </div>
              
              <p className="footer-description">
                We craft premium soy wax and gel wax candles using only natural ingredients and essential oils. 
                Based in Sri Lanka, we're committed to sustainable, eco-friendly candle making.
              </p>
              
              <div className="footer-certifications">
                <div className="certification-badge">
                  <svg className="certification-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                  </svg>
                  <span>100% Natural Ingredients</span>
                </div>
                <div className="certification-badge">
                  <svg className="certification-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/>
                  </svg>
                  <span>Eco-Friendly & Sustainable</span>
                </div>
                <div className="certification-badge">
                  <svg className="certification-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="9 11H7V9H9V11ZM13 11H11V9H13V11ZM17 11H15V9H17V11ZM19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4Z"/>
                  </svg>
                  <span>Handcrafted with Love</span>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div className="footer-section">
              <h4 className="footer-section-title">Company</h4>
              <div className="footer-links">
                <Link to="/aboutus" className="footer-link" onClick={() => window.scrollTo(0, 0)}>
                  About Us
                </Link>
                <Link to="/contactus" className="footer-link" onClick={() => window.scrollTo(0, 0)}>
                  Contact Us
                </Link>
                <Link to="/sustainability" className="footer-link" onClick={() => window.scrollTo(0, 0)}>
                  Sustainability
                </Link>
                <Link to="/blog" className="footer-link" onClick={() => window.scrollTo(0, 0)}>
                  Blog
                </Link>
                <Link to="/candlehelp" className="footer-link" onClick={() => window.scrollTo(0, 0)}>
                  How to use a candle for gay people
                </Link>
              </div>
            </div>

            {/* Shop Links */}
            <div className="footer-section">
              <h4 className="footer-section-title">Shop</h4>
              <div className="footer-links">
                <Link to="/shop" className="footer-link" onClick={() => window.scrollTo(0, 0)}>
                  All Products
                </Link>
                <Link to="/shop" className="footer-link" onClick={() => window.scrollTo(0, 4200)}>
                  Glass Candles
                </Link>
                <Link to="/shop" className="footer-link" onClick={() => window.scrollTo(0, 3500)}>
                  Tin Candles
                </Link>
                <Link to="/shop" className="footer-link" onClick={() => window.scrollTo(0, 2950)}>
                  Mold Candles
                </Link>
                <Link to="/collections/seasonal" className="footer-link" onClick={() => window.scrollTo(0, 0)}>
                  Seasonal Collection
                </Link>
                <Link to="/collections/bestsellers" className="footer-link" onClick={() => window.scrollTo(0, 0)}>
                  Best Sellers
                </Link>
              </div>
            </div>

            {/* Contact & Social */}
            <div className="footer-section footer-social">
              <h4 className="footer-section-title">Connect With Us</h4>
              
              <div className="footer-contact-info">
                <div className="contact-item">
                  <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"/>
                  </svg>
                  <div className="contact-text">
                    <a href="mailto:info@celestialflames.lk">info@celestialflames.lk</a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z"/>
                  </svg>
                  <div className="contact-text">
                    <a href="tel:+94712345678">+94 71 234 5678</a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <svg className="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5Z"/>
                  </svg>
                  <div className="contact-text">
                    Colombo, Sri Lanka
                  </div>
                </div>
              </div>
              
              <div className="footer-social-links">
                <a href="https://www.instagram.com/celestial.flames.candles.co/" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="social-link">
                  <img src={instagram_icon} alt="Instagram" className="social-icon" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61560314546678" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="social-link">
                  <img src={facebook_icon} alt="Facebook" className="social-icon" />
                </a>
                <a href="https://wa.me/message/SCXFB5PPHQQ7K1" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="social-link">
                  <img src={whatsapp_icon} alt="WhatsApp" className="social-icon" />
                </a>
              </div>
              
              <div className="newsletter-signup">
                <h5 className="newsletter-title">Stay Updated</h5>
                <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="newsletter-input"
                    required
                  />
                  <button type="submit" className="newsletter-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
                <p className="newsletter-disclaimer">
                  Get updates on new products and exclusive offers. We never spam.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-copyright">
              <p>© 2025 Celestial Flames. All Rights Reserved.</p>
            </div>
            <div className="footer-bottom-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-service">Terms of Service</Link>
              <Link to="/shipping-info">Shipping Info</Link>
              <Link to="/returns">Returns</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <div className="whatsapp-float">
        <a href="https://wa.me/message/SCXFB5PPHQQ7K1" 
           target="_blank" 
           rel="noopener noreferrer" 
           className="whatsapp-button">
          <svg className="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
          </svg>
          <span className="whatsapp-text">Chat with us</span>
        </a>
      </div>
    </>
  );
};

export default Footer;