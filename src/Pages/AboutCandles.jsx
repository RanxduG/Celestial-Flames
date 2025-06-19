import React, { useEffect, useRef, useState } from 'react';
import { Flame, Leaf, Sparkles, Heart, Award, Info, Clock, Shield } from 'lucide-react';
import "./CSS/AboutCandles.css"

const AboutCandles = () => {
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

  const scentPriorities = [
    { name: 'Vanilla', priority: 'best seller', color: '#daa520' },
    { name: 'Honeydew', priority: 'best seller', color: '#98fb98' },
    { name: 'Cafe', priority: 'best seller', color: '#8b4513' },
    { name: 'Raspberry', priority: 'best seller', color: '#dc143c' },
    { name: 'Jasmine', priority: 'best seller', color: '#f8f8ff' },
    { name: 'Roasted Coffee', priority: 'best seller', color: '#6f4e37' },
    { name: 'Cinnamon', priority: 'popular', color: '#d2691e' },
    { name: 'Lemongrass', priority: 'popular', color: '#9acd32' },
    { name: 'Peppermint', priority: 'popular', color: '#00ff7f' },
    { name: 'Apple', priority: 'popular', color: '#ff4500' },
    { name: 'Rose', priority: 'popular', color: '#ff69b4' },
    { name: 'Sweet Flower', priority: 'popular', color: '#ffb6c1' },
    { name: 'Citronella', priority: 'normal', color: '#d3d3d3' },
    { name: 'Tea & Lime', priority: 'normal', color: '#d3d3d3' },
    { name: 'Green Tea', priority: 'normal', color: '#d3d3d3' },
    { name: 'Aqua', priority: 'normal', color: '#d3d3d3' },
    { name: 'Tea Leaf', priority: 'normal', color: '#d3d3d3' },
    { name: 'Always Rose', priority: 'normal', color: '#d3d3d3' },
    { name: 'Sweetheart', priority: 'normal', color: '#d3d3d3' },
    { name: 'Apple Spice', priority: 'normal', color: '#d3d3d3' },
    { name: 'Dark Vanilla', priority: 'normal', color: '#d3d3d3' },
    { name: 'Strawberry', priority: 'normal', color: '#d3d3d3' }
  ];

  return (
    <div className="ac-container">
      {/* Hero Section */}
      <section className="ac-hero">
        <div className="ac-hero-content">
          <div className="ac-hero-text">
            <h1 className="ac-hero-title">
              <Flame className="ac-flame-icon" />
              Understanding Candles
            </h1>
            <p className="ac-hero-subtitle">
              Discover the art and science behind our handcrafted natural candles
            </p>
          </div>
          <div className="ac-hero-visual">
            <div className="ac-candle-group">
              <div className="ac-mini-candle ac-candle1"></div>
              <div className="ac-mini-candle ac-candle2"></div>
              <div className="ac-mini-candle ac-candle3"></div>
              <div className="ac-center-flame"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Wax Types Section */}
      <section 
        ref={setSectionRef('waxTypes')}
        className={`ac-section ${isVisible.waxTypes ? 'ac-visible' : ''}`}
      >
        <div className="ac-section-content">
          <div className="ac-icon-header">
            <Leaf className="ac-section-icon" />
            <h2 className="ac-section-title">Types of Wax</h2>
          </div>
          
          <div className="ac-wax-grid">
            {/* Soy Wax Card */}
            <div className="ac-wax-card">
              <div className="ac-wax-header">
                <div className="ac-wax-icon">🌱</div>
                <h3 className="ac-wax-title">Soy Wax</h3>
              </div>
              <div className="ac-wax-content">
                <p className="ac-wax-description">
                  Made from hydrogenated soy bean oil - a natural, renewable resource
                </p>
                <div className="ac-benefits-list">
                  <div className="ac-benefit">
                    <Leaf className="ac-benefit-icon" />
                    <span>Eco-friendly & biodegradable</span>
                  </div>
                  <div className="ac-benefit">
                    <Shield className="ac-benefit-icon" />
                    <span>Cleaner burning than paraffin</span>
                  </div>
                  <div className="ac-benefit">
                    <Clock className="ac-benefit-icon" />
                    <span>Burns slower & longer</span>
                  </div>
                  <div className="ac-benefit">
                    <Heart className="ac-benefit-icon" />
                    <span>Non-toxic & safe for indoor use</span>
                  </div>
                </div>
                <div className="ac-wax-properties">
                  <div className="ac-property">
                    <strong>Texture:</strong> Creamy white & smooth
                  </div>
                  <div className="ac-property">
                    <strong>Burn:</strong> Clean with minimal soot
                  </div>
                  <div className="ac-property">
                    <strong>Lifespan:</strong> 1-2 years if stored well
                  </div>
                </div>
              </div>
            </div>

            {/* Gel Wax Card */}
            <div className="ac-wax-card">
              <div className="ac-wax-header">
                <div className="ac-wax-icon">💎</div>
                <h3 className="ac-wax-title">Gel Wax</h3>
              </div>
              <div className="ac-wax-content">
                <p className="ac-wax-description">
                  A synthetic wax from mineral oil & polymer resin (Penreco Versagel)
                </p>
                <div className="ac-benefits-list">
                  <div className="ac-benefit">
                    <Info className="ac-benefit-icon" />
                    <span>Transparent & decorative</span>
                  </div>
                  <div className="ac-benefit">
                    <Award className="ac-benefit-icon" />
                    <span>High-quality when done right</span>
                  </div>
                  <div className="ac-benefit">
                    <Clock className="ac-benefit-icon" />
                    <span>Longer burn time</span>
                  </div>
                </div>
                <div className="ac-caution-box">
                  <h4 className="ac-caution-title">⚠️ Important Notes</h4>
                  <p>Can be used safely with proper wicks & containers</p>
                  <p>Expires within 3 years</p>
                  <p>Poor production can affect quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scent Priority Section */}
      <section 
        ref={setSectionRef('scents')}
        className={`ac-section ac-scents-section ${isVisible.scents ? 'ac-visible' : ''}`}
      >
        <div className="ac-section-content">
          <div className="ac-icon-header">
            <Sparkles className="ac-section-icon" />
            <h2 className="ac-section-title">Our Signature Scents</h2>
          </div>
          
          <div className="ac-scents-grid">
            {scentPriorities.map((scent, index) => (
              <div 
                key={scent.name}
                className="ac-scent-card"
                style={{
                  animationDelay: `${index * 0.05}s`,
                  borderLeft: `4px solid ${scent.color}`,
                }}
              >
                <div className="ac-scent-header">
                  <h4 className="ac-scent-name">{scent.name}</h4>
                  <span className={`ac-priority-badge ${
                    scent.priority === 'best seller' ? 'ac-priority-best-seller' : 
                    scent.priority === 'popular' ? 'ac-priority-high' : 'ac-priority-medium'
                  }`}>
                    {scent.priority === 'best seller' ? '🏆 Best Seller' : 
                     scent.priority === 'popular' ? '⭐ Popular' : '✨ Available'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wick Comparison Section */}
      <section 
        ref={setSectionRef('wicks')}
        className={`ac-section ${isVisible.wicks ? 'ac-visible' : ''}`}
      >
        <div className="ac-section-content">
          <div className="ac-icon-header">
            <Flame className="ac-section-icon" />
            <h2 className="ac-section-title">Cotton vs Wooden Wicks</h2>
          </div>
          
          <div className="ac-wick-grid">
            <div className="ac-wick-card">
              <div className="ac-wick-header">
                <div className="ac-wick-icon">🧵</div>
                <h3>Cotton Wick</h3>
              </div>
              <div className="ac-wick-content">
                <div className="ac-wick-features">
                  <div className="ac-wick-feature">
                    <span className="ac-feature-label">Natural:</span>
                    <span className="ac-checkmark">✓</span>
                    <span className="ac-feature-note">If uncoated</span>
                  </div>
                  <div className="ac-wick-feature">
                    <span className="ac-feature-label">Soot Production:</span>
                    <span className="ac-question">?</span>
                    <span className="ac-feature-note">If low quality</span>
                  </div>
                  <div className="ac-wick-feature">
                    <span className="ac-feature-label">Scent Throw:</span>
                    <span className="ac-checkmark">✓</span>
                  </div>
                  <div className="ac-wick-feature">
                    <span className="ac-feature-label">Sustainability:</span>
                    <span className="ac-question">?</span>
                    <span className="ac-feature-note">Depends on source</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="ac-wick-card">
              <div className="ac-wick-header">
                <div className="ac-wick-icon">🪵</div>
                <h3>Wooden Wick</h3>
              </div>
              <div className="ac-wick-content">
                <div className="ac-wick-features">
                  <div className="ac-wick-feature">
                    <span className="ac-feature-label">Natural:</span>
                    <span className="ac-checkmark">✓</span>
                  </div>
                  <div className="ac-wick-feature">
                    <span className="ac-feature-label">Soot Production:</span>
                    <span className="ac-checkmark">✓</span>
                    <span className="ac-feature-note">Generally cleaner</span>
                  </div>
                  <div className="ac-wick-feature">
                    <span className="ac-feature-label">Scent Throw:</span>
                    <span className="ac-checkmark">✓</span>
                  </div>
                  <div className="ac-wick-feature">
                    <span className="ac-feature-label">Sustainability:</span>
                    <span className="ac-checkmark">✓</span>
                    <span className="ac-feature-note">If FSC-certified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Care Tips Section */}
      <section 
        ref={setSectionRef('care')}
        className={`ac-section ac-care-section ${isVisible.care ? 'ac-visible' : ''}`}
      >
        <div className="ac-section-content">
          <div className="ac-icon-header">
            <Heart className="ac-section-icon" />
            <h2 className="ac-section-title">Candle Care Tips</h2>
          </div>
          
          <div className="ac-tips-grid">
            <div className="ac-tip-card">
              <div className="ac-tip-icon">✂️</div>
              <h4>Trim Your Wick</h4>
              <p>Keep wicks trimmed to ¼ inch for optimal burning and to prevent smoking</p>
            </div>
            <div className="ac-tip-card">
              <div className="ac-tip-icon">⏰</div>
              <h4>Burn Time Limit</h4>
              <p>Never burn for more than 4 hours at a time to prevent overheating</p>
            </div>
            <div className="ac-tip-card">
              <div className="ac-tip-icon">🌡️</div>
              <h4>Storage</h4>
              <p>Store in cool, dry places away from direct sunlight to preserve scent</p>
            </div>
            <div className="ac-tip-card">
              <div className="ac-tip-icon">💧</div>
              <h4>First Burn</h4>
              <p>Allow the wax pool to reach the edges for even burning throughout the candle's life</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutCandles;