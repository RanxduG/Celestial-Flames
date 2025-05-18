import React, { useState, useEffect } from 'react';
import './ShopHero.css';
import { Link } from 'react-router-dom';
import gelCandleImage from '../Assets/Good/Avurudu Photos/IMG-20250426-WA0020.jpg';
import soyCandleImage from '../Assets/Good/Avurudu Photos/IMG-20250426-WA0023.jpg';
import customCandleImage from '../Assets/Good/Avurudu Photos/IMG-20250426-WA0010.jpg';

const ShopHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Handcrafted Soy Candles",
      subtitle: "Sustainably made with love in Sri Lanka",
      description: "Experience the warm glow of pure soy wax candles with natural fragrances that transform your space",
      cta: "Shop Now",
      image: soyCandleImage
    },
    {
      title: "Illuminating Gel Candles",
      subtitle: "Crystal clear beauty with lasting fragrance",
      description: "Our gel candles provide a mesmerizing glow with spectacular clarity and longer burn time",
      cta: "Explore Collection",
      image: gelCandleImage
    },
    {
      title: "Create Your Custom Candle",
      subtitle: "Your imagination, our craftsmanship",
      description: "Design a candle that perfectly matches your style and scent preferences",
      cta: "Start Creating",
      image: customCandleImage
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="shop-hero">
      <div className="shop-hero-slider">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`shop-hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="shop-hero-content">
              <h1 className="shop-hero-title">{slide.title}</h1>
              <h2 className="shop-hero-subtitle">{slide.subtitle}</h2>
              <p className="shop-hero-description">{slide.description}</p>
              <Link to="/catalog" className="shop-hero-button">
                {slide.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="shop-hero-indicators">
        {slides.map((_, index) => (
          <button 
            key={index} 
            className={`shop-hero-indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="shop-hero-scroll">
        <div className="shop-hero-scroll-icon"></div>
        <span>Scroll to explore</span>
      </div>
    </div>
  );
};

export default ShopHero;