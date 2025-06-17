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
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
    }, 1000);
  };

  return (
    <>
      <footer className="footer">
        {/* Decorative flame elements */}
        <div className="flame-decoration">
          <div className="flame flame-1"></div>
          <div className="flame flame-2"></div>
          <div className="flame flame-3"></div>
        </div>

        <div className="footer-container">
          {/* Main Content */}
          <div className="footer-main">
            {/* Brand Section */}
            <div className="footer-brand">
              <div className="brand-header">
                <div className="logo-wrapper">
                  <img src={logo} alt="Celestial Flames Logo" className="footer-logo" />
                  <div className="logo-glow"></div>
                </div>
                <div className="brand-info">
                  <h2 className="brand-name">Celestial Flames</h2>
                  <p className="brand-tagline">Share The Light!</p>
                </div>
              </div>
              
              <p className="brand-description">
                Handcrafted premium soy wax and gel wax candles using only the finest natural ingredients. 
                From Sri Lanka with love, we illuminate your world sustainably.
              </p>
              
              <div className="quality-badges">
                <div className="badge">
                  <span className="badge-icon">🌿</span>
                  <span>100% Natural</span>
                </div>
                <div className="badge">
                  <span className="badge-icon">♻️</span>
                  <span>Eco-Friendly</span>
                </div>
                <div className="badge">
                  <span className="badge-icon">❤️</span>
                  <span>Handcrafted</span>
                </div>
              </div>
            </div>

            {/* Navigation Grid */}
            <div className="footer-navigation">
              <div className="nav-section">
                <h4 className="nav-title">Explore</h4>
                <div className="nav-links">
                  <Link to="/aboutus" className="nav-link" onClick={() => window.scrollTo(0, 0)}>
                    About Us
                  </Link>
                  <Link to="/contactus" className="nav-link" onClick={() => window.scrollTo(0, 0)}>
                    Contact Us
                  </Link>
                  <Link to="/candlecare" className="nav-link" onClick={() => window.scrollTo(0, 0)}>
                    Candle Care
                  </Link>
                  <Link to="/aboutcandles" className="nav-link" onClick={() => window.scrollTo(0, 0)}>
                    About Candles
                  </Link>
                </div>
              </div>

              <div className="nav-section">
                <h4 className="nav-title">Collections</h4>
                <div className="nav-links">
                  <Link to="/shop" className="nav-link" onClick={() => window.scrollTo(0, 0)}>
                    All Candles
                  </Link>
                  <Link to="/shop" className="nav-link" onClick={() => window.scrollTo(0, 2950)}>
                    Mold Candles
                  </Link>
                  <Link to="/shop" className="nav-link" onClick={() => window.scrollTo(0, 3500)}>
                    Tin Collection
                  </Link>
                  <Link to="/shop" className="nav-link" onClick={() => window.scrollTo(0, 4200)}>
                    Glass Elegance
                  </Link>
                  <Link to="/collections/seasonal" className="nav-link" onClick={() => window.scrollTo(0, 0)}>
                    Seasonal Specials
                  </Link>
                </div>
              </div>
            </div>

            {/* Connect Section */}
            <div className="footer-connect">
              <h4 className="connect-title">Connect & Stay Updated</h4>
              
              {/* Newsletter */}
              <div className="newsletter-section">
                <h5 className="newsletter-title">Join Our Light Community</h5>
                <p className="newsletter-desc">Get exclusive offers and candle care tips</p>
                <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                  <div className="input-group">
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="newsletter-input"
                      required
                    />
                    <button type="submit" className="newsletter-btn" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="loading-spinner"></span>
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <span className="btn-arrow">→</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Contact Info */}
              <div className="contact-section">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <a href="mailto:info@celestialflames.lk" className="contact-link">
                    celestialflames.candles@gmail.com
                  </a>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <a href="tel:+94770081559" className="contact-link">
                    +94 77 008 1559
                  </a>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span className="contact-text">Colombo, Sri Lanka</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="social-section">
                <p className="social-title">Follow Our Journey</p>
                <div className="social-links">
                  <a href="https://www.instagram.com/celestial.flames.candles.co/" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="social-link instagram">
                    <img src={instagram_icon} alt="Instagram" />
                    <span className="social-tooltip">Instagram</span>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61560314546678" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="social-link facebook">
                    <img src={facebook_icon} alt="Facebook" />
                    <span className="social-tooltip">Facebook</span>
                  </a>
                  <a 
                    href="https://wa.me/94770081559" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link whatsapp">
                    <img src={whatsapp_icon} alt="WhatsApp" />
                    <span className="social-tooltip">WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-divider"></div>
            <div className="bottom-content">
              <div className="copyright">
                <p>&copy; 2025 Celestial Flames. Illuminating lives with natural light.</p>
              </div>
              <div className="legal-links">
                <Link to="/privacy-policy">Privacy Policy</Link>
                <span className="separator">•</span>
                <Link to="/terms-of-service">Terms of Service</Link>
                <span className="separator">•</span>
                <Link to="/shipping-info">Shipping</Link>
                <span className="separator">•</span>
                <Link to="/returns">Returns</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced WhatsApp Floating Button */}
      <div className="whatsapp-float">
        <a 
            href="https://wa.me/94770081559" 
            target="_blank" 
            rel="noopener noreferrer"
            className="whatsapp-btn"
          >
          {/* <div className="whatsapp-pulse"></div> */}
          <img src={whatsapp_icon} alt="WhatsApp" className="whatsapp-icon" />
          <span className="whatsapp-text">Chat with us</span>
        </a>
      </div>
    </>
  );
};

export default Footer;