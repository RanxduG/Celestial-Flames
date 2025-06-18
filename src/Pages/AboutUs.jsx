// AboutUs.js
import React, { useEffect, useRef, useState } from 'react';
import { Flame, Heart, Sparkles, Leaf, Award, Users } from 'lucide-react';
import './CSS/AboutUs.css';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const observers = {};

    Object.keys(sectionRefs.current).forEach(key => {
      if (sectionRefs.current[key]) {
        observers[key] = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(prev => ({ ...prev, [key]: true }));
            }
          },
          { threshold: 0.2, rootMargin: '50px' }
        );
        observers[key].observe(sectionRefs.current[key]);
      }
    });

    return () => {
      Object.values(observers).forEach(observer => observer.disconnect());
    };
  }, []);

  const setSectionRef = (key) => (el) => {
    sectionRefs.current[key] = el;
  };

  return (
    <div className="aboutus-container">
      <section className="aboutus-hero">
        <div className="aboutus-hero-content">
          <div className="aboutus-hero-text">
            <h1 className="aboutus-hero-title">
              <Flame className="aboutus-flame-icon" />
              Celestial Flames
            </h1>
            <p className="aboutus-hero-subtitle">
              Illuminating lives with handcrafted, natural candles from the heart of Sri Lanka
            </p>
          </div>
          <div className="aboutus-hero-visual">
            <div className="aboutus-candle-animation">
              <div className="aboutus-candle"></div>
              <div className="aboutus-flame"></div>
              <div className="aboutus-glow"></div>
            </div>
          </div>
        </div>
        <div className="aboutus-floating-elements">
          <div className="aboutus-float aboutus-float1">✨</div>
          <div className="aboutus-float aboutus-float2">🕯️</div>
          <div className="aboutus-float aboutus-float3">🌸</div>
          <div className="aboutus-float aboutus-float4">✨</div>
        </div>
      </section>

      <section 
        ref={setSectionRef('about')}
        className="aboutus-section"
        style={{
          transform: isVisible.about ? 'translateY(0)' : 'translateY(50px)',
          opacity: isVisible.about ? 1 : 0,
        }}
      >
        <div className="aboutus-section-content">
          <div className="aboutus-icon-header">
            <Heart className="aboutus-section-icon" />
            <h2 className="aboutus-section-title">About Us</h2>
          </div>
          <div className="aboutus-card-container">
            <div className="aboutus-text-card">
              <p className="aboutus-text">
                At Celestial Flames, we believe in the transformative power of scents. Our handcrafted candles are more than just sources of light – they're gateways to emotion, memory, and tranquility.
              </p>
              <p className="aboutus-text">
                We believe that natural fragrances have the power to uplift spirits, heal hearts, inspire creativity, and create profound moments of peace.
              </p>
            </div>
            <div className="aboutus-feature-grid">
              <div className="aboutus-feature-card">
                <Leaf className="aboutus-feature-icon" />
                <h4>100% Natural</h4>
                <p>Pure soy & gel wax only</p>
              </div>
              <div className="aboutus-feature-card">
                <Award className="aboutus-feature-icon" />
                <h4>Handcrafted</h4>
                <p>Made with love in Sri Lanka</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section 
        ref={setSectionRef('story')}
        className="aboutus-section aboutus-story-section"
        style={{
          transform: isVisible.story ? 'translateX(0)' : 'translateX(-50px)',
          opacity: isVisible.story ? 1 : 0,
        }}
      >
        <div className="aboutus-section-content">
          <div className="aboutus-icon-header">
            <Sparkles className="aboutus-section-icon" />
            <h2 className="aboutus-section-title">Our Story</h2>
          </div>
          <div className="aboutus-story-card">
            <div className="aboutus-timeline">
              <div className="aboutus-timeline-item">
                <div className="aboutus-timeline-year">2023</div>
                <div className="aboutus-timeline-content">
                  <h4>Humble Beginnings</h4>
                  <p>Started in our kitchen, experimenting with natural waxes and unique scent combinations</p>
                </div>
              </div>
              <div className="aboutus-timeline-item">
                <div className="aboutus-timeline-year">Growth</div>
                <div className="aboutus-timeline-content">
                  <h4>Community Love</h4>
                  <p>Friends and family became our first customers, sharing our candles as gifts of warmth</p>
                </div>
              </div>
              <div className="aboutus-timeline-item">
                <div className="aboutus-timeline-year">Today</div>
                <div className="aboutus-timeline-content">
                  <h4>Expanding Dreams</h4>
                  <p>Growing our collection with natural essential oils and innovative wax alternatives</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section 
        ref={setSectionRef('vision')}
        className="aboutus-section"
        style={{
          transform: isVisible.vision ? 'scale(1)' : 'scale(0.95)',
          opacity: isVisible.vision ? 1 : 0,
        }}
      >
        <div className="aboutus-section-content">
          <div className="aboutus-vision-mission-grid">
            <div className="aboutus-vision-card">
              <div className="aboutus-card-header">
                <Users className="aboutus-card-icon" />
                <h3>Our Vision</h3>
              </div>
              <p className="aboutus-card-text">
                To become Sri Lanka's leading creator of natural, therapeutic candles that inspire wellness, create memorable experiences, and bring people together through scent.
              </p>
            </div>
            <div className="aboutus-mission-card">
              <div className="aboutus-card-header">
                <Flame className="aboutus-card-icon" />
                <h3>Our Mission</h3>
              </div>
              <p className="aboutus-card-text">
                To craft exceptional candles using only natural, sustainable materials while supporting local communities and preserving traditional artistry.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section 
        ref={setSectionRef('values')}
        className="aboutus-section aboutus-values-section"
        style={{
          transform: isVisible.values ? 'translateY(0)' : 'translateY(30px)',
          opacity: isVisible.values ? 1 : 0,
        }}
      >
        <div className="aboutus-section-content">
          <h2 className="aboutus-values-title">What We Stand For</h2>
          <div className="aboutus-values-grid">
            <div className="aboutus-value-card">
              <div className="aboutus-value-icon">🌱</div>
              <h4>Sustainability</h4>
              <p>Committed to eco-friendly practices and natural ingredients</p>
            </div>
            <div className="aboutus-value-card">
              <div className="aboutus-value-icon">✋</div>
              <h4>Handcrafted Quality</h4>
              <p>Every candle is made with attention to detail and care</p>
            </div>
            <div className="aboutus-value-card">
              <div className="aboutus-value-icon">🇱🇰</div>
              <h4>Local Pride</h4>
              <p>Proudly representing Sri Lankan craftsmanship globally</p>
            </div>
            <div className="aboutus-value-card">
              <div className="aboutus-value-icon">💫</div>
              <h4>Wellness Focus</h4>
              <p>Creating products that enhance mental and emotional well-being</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;