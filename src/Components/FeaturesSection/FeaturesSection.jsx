import React, { useEffect, useRef, useState } from 'react';
import './FeaturesSection.css';

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    {
      icon: '🌿',
      title: 'Pure & Natural',
      description: 'Crafted exclusively with soy and gel wax, free from harmful paraffin. Coming soon: coconut wax varieties.',
      color: '#4a7c59'
    },
    {
      icon: '🇱🇰',
      title: 'Sri Lankan Heritage',
      description: 'Proudly made in Sri Lanka, supporting local artisans and sustainable practices.',
      color: '#d4af37'
    },
    {
      icon: '✨',
      title: 'Custom Creations',
      description: 'Personalized designs tailored to your vision. From corporate gifts to wedding favors.',
      color: '#8b4513'
    },
    {
      icon: '🎯',
      title: 'Premium Quality',
      description: 'Hand-poured with precision, using only essential oils for authentic, long-lasting fragrance.',
      color: '#2c5f41'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="features-section" ref={sectionRef}>
      <div className="container">
        <div className={`section-header ${isVisible ? 'animate-in' : ''}`}>
          <h2>Why Choose Celestial Flames</h2>
          <p>Discover what makes our candles truly exceptional</p>
          <div className="header-divider">
            <div className="flame-icon">🕯️</div>
          </div>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card ${isVisible ? 'animate-in' : ''}`}
              style={{ '--delay': `${index * 0.2}s`, '--accent-color': feature.color }}
            >
              <div className="feature-icon">
                <span>{feature.icon}</span>
              </div>
              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
              <div className="feature-glow"></div>
            </div>
          ))}
        </div>

        <div className={`cta-section ${isVisible ? 'animate-in' : ''}`}>
          <div className="cta-content">
            <h3>Ready to Experience the Difference?</h3>
            <p>Explore our collections or create your custom candle today</p>
            <div className="cta-buttons">
              <button className="btn-explore">Explore Collections</button>
              <button className="btn-custom">Start Customizing</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;