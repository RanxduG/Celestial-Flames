import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './WelcomeBanner.css';

const WelcomeBanner = () => {
  const { userDetails, homeBanners } = useContext(ShopContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % homeBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [homeBanners.length]);

  // Animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="hero-banner">
      {/* Background Slideshow */}
      <div className="hero-slideshow">
        {homeBanners.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide})` }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="hero-content">
        <div className={`hero-text ${isLoaded ? 'animate-in' : ''}`}>
          <div className="hero-badge">
            <span>✨ Premium Sri Lankan Candles</span>
          </div>
          <h1 className="hero-title">
            <span className="title-line">Celestial</span>
            <span className="title-line">Flames</span>
          </h1>
          <p className="hero-subtitle">
            Crafted with pure soy and gel wax, infused with natural essential oils. 
            Experience the art of sustainable luxury in every flame.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => window.location.href = '/catalog'}>
              Explore Collection
            </button>
            <button className="btn-secondary" onClick={() => window.location.href = '/catalog'}>
              Custom Design
            </button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="floating-elements">
          <div className="float-item float-1">🕯️</div>
          <div className="float-item float-2">✨</div>
          <div className="float-item float-3">🌿</div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="hero-dots">
        {homeBanners.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator" onClick={scrollToNext}>
        <div className="scroll-arrow">
          <span>Discover More</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 13L12 18L17 13M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;