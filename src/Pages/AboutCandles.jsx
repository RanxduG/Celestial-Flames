import React, { useEffect, useRef, useState } from 'react';
import { Flame, Leaf, Sparkles, Heart, Award, Info, Clock, Shield, Star } from 'lucide-react';
import './CSS/AboutCandles.css';

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
    { name: 'Cinnamon', priority: 'high', color: '#d2691e' },
    { name: 'Vanilla', priority: 'high', color: '#daa520' },
    { name: 'Honeydew', priority: 'medium', color: '#98fb98' },
    { name: 'Café', priority: 'medium', color: '#8b4513' },
    { name: 'Coffee', priority: 'medium', color: '#6f4e37' },
    { name: 'Sweet Flower', priority: 'medium', color: '#ff69b4' },
    { name: 'Always Rose', priority: 'medium', color: '#ff1493' },
    { name: 'Jasmine', priority: 'high', color: '#f8f8ff' },
    { name: 'Rose', priority: 'medium', color: '#ff69b4' },
    { name: 'Apple', priority: 'best seller', color: '#ff4500' },
    { name: 'Citronella', priority: 'high', color: '#9acd32' },
    { name: 'Peppermint', priority: 'high', color: '#00ff7f' },
    { name: 'Lime', priority: 'high', color: '#32cd32' },
    { name: 'Raspberry', priority: 'medium', color: '#dc143c' },
    { name: 'Cherry Blossoms', priority: 'medium', color: '#ffb6c1' },
    { name: 'Dark Vanilla', priority: 'medium', color: '#8b4513' },
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <h1 style={styles.heroTitle}>
              <Flame style={styles.flameIcon} />
              Understanding Candles
            </h1>
            <p style={styles.heroSubtitle}>
              Discover the art and science behind our handcrafted natural candles
            </p>
          </div>
          <div style={styles.heroVisual}>
            <div style={styles.candleGroup}>
              <div style={{...styles.miniCandle, ...styles.candle1}}></div>
              <div style={{...styles.miniCandle, ...styles.candle2}}></div>
              <div style={{...styles.miniCandle, ...styles.candle3}}></div>
              <div style={styles.centerFlame}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Wax Types Section */}
      <section 
        ref={setSectionRef('waxTypes')}
        style={{
          ...styles.section,
          transform: isVisible.waxTypes ? 'translateY(0)' : 'translateY(50px)',
          opacity: isVisible.waxTypes ? 1 : 0,
        }}
      >
        <div style={styles.sectionContent}>
          <div style={styles.iconHeader}>
            <Leaf style={styles.sectionIcon} />
            <h2 style={styles.sectionTitle}>Types of Wax</h2>
          </div>
          
          <div style={styles.waxGrid}>
            {/* Soy Wax Card */}
            <div style={styles.waxCard}>
              <div style={styles.waxHeader}>
                <div style={styles.waxIcon}>🌱</div>
                <h3 style={styles.waxTitle}>Soy Wax</h3>
              </div>
              <div style={styles.waxContent}>
                <p style={styles.waxDescription}>
                  Made from hydrogenated soy bean oil - a natural, renewable resource
                </p>
                <div style={styles.benefitsList}>
                  <div style={styles.benefit}>
                    <Leaf style={styles.benefitIcon} />
                    <span>Eco-friendly & biodegradable</span>
                  </div>
                  <div style={styles.benefit}>
                    <Shield style={styles.benefitIcon} />
                    <span>Cleaner burning than paraffin</span>
                  </div>
                  <div style={styles.benefit}>
                    <Clock style={styles.benefitIcon} />
                    <span>Burns slower & longer</span>
                  </div>
                  <div style={styles.benefit}>
                    <Heart style={styles.benefitIcon} />
                    <span>Non-toxic & safe for indoor use</span>
                  </div>
                </div>
                <div style={styles.waxProperties}>
                  <div style={styles.property}>
                    <strong>Texture:</strong> Creamy white & smooth
                  </div>
                  <div style={styles.property}>
                    <strong>Burn:</strong> Clean with minimal soot
                  </div>
                  <div style={styles.property}>
                    <strong>Lifespan:</strong> 1-2 years if stored well
                  </div>
                </div>
              </div>
            </div>

            {/* Gel Wax Card */}
            <div style={styles.waxCard}>
              <div style={styles.waxHeader}>
                <div style={styles.waxIcon}>💎</div>
                <h3 style={styles.waxTitle}>Gel Wax</h3>
              </div>
              <div style={styles.waxContent}>
                <p style={styles.waxDescription}>
                  A synthetic wax from mineral oil & polymer resin (Penreco Versagel)
                </p>
                <div style={styles.benefitsList}>
                  <div style={styles.benefit}>
                    <Info style={styles.benefitIcon} />
                    <span>Transparent & decorative</span>
                  </div>
                  <div style={styles.benefit}>
                    <Award style={styles.benefitIcon} />
                    <span>High-quality when done right</span>
                  </div>
                  <div style={styles.benefit}>
                    <Clock style={styles.benefitIcon} />
                    <span>Longer burn time</span>
                  </div>
                </div>
                <div style={styles.cautionBox}>
                  <h4 style={styles.cautionTitle}>⚠️ Important Notes</h4>
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
        style={{
          ...styles.section,
          ...styles.scentsSection,
          transform: isVisible.scents ? 'translateX(0)' : 'translateX(-50px)',
          opacity: isVisible.scents ? 1 : 0,
        }}
      >
        <div style={styles.sectionContent}>
          <div style={styles.iconHeader}>
            <Sparkles style={styles.sectionIcon} />
            <h2 style={styles.sectionTitle}>Our Signature Scents</h2>
          </div>
          
          <div style={styles.scentsGrid}>
            {scentPriorities.map((scent, index) => (
              <div 
                key={scent.name}
                style={{
                  ...styles.scentCard,
                  animationDelay: `${index * 0.1}s`,
                  borderLeft: `4px solid ${scent.color}`,
                }}
              >
                <div style={styles.scentHeader}>
                  <h4 style={styles.scentName}>{scent.name}</h4>
                  <span style={{
                    ...styles.priorityBadge,
                    backgroundColor: scent.priority === 'best seller' ? '#ff4500' : 
                                   scent.priority === 'high' ? '#e98074' : '#d4af37',
                  }}>
                    {scent.priority === 'best seller' ? '🏆 Best Seller' : 
                     scent.priority === 'high' ? '⭐ High Priority' : '✨ Popular'}
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
        style={{
          ...styles.section,
          transform: isVisible.wicks ? 'scale(1)' : 'scale(0.95)',
          opacity: isVisible.wicks ? 1 : 0,
        }}
      >
        <div style={styles.sectionContent}>
          <div style={styles.iconHeader}>
            <Flame style={styles.sectionIcon} />
            <h2 style={styles.sectionTitle}>Cotton vs Wooden Wicks</h2>
          </div>
          
          <div style={styles.wickGrid}>
            <div style={styles.wickCard}>
              <div style={styles.wickHeader}>
                <div style={styles.wickIcon}>🧵</div>
                <h3>Cotton Wick</h3>
              </div>
              <div style={styles.wickContent}>
                <div style={styles.wickFeatures}>
                  <div style={styles.wickFeature}>
                    <span style={styles.featureLabel}>Natural:</span>
                    <span style={styles.checkmark}>✓</span>
                    <span style={styles.featureNote}>If uncoated</span>
                  </div>
                  <div style={styles.wickFeature}>
                    <span style={styles.featureLabel}>Soot Production:</span>
                    <span style={styles.question}>?</span>
                    <span style={styles.featureNote}>If low quality</span>
                  </div>
                  <div style={styles.wickFeature}>
                    <span style={styles.featureLabel}>Scent Throw:</span>
                    <span style={styles.checkmark}>✓</span>
                  </div>
                  <div style={styles.wickFeature}>
                    <span style={styles.featureLabel}>Sustainability:</span>
                    <span style={styles.question}>?</span>
                    <span style={styles.featureNote}>Depends on source</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.wickCard}>
              <div style={styles.wickHeader}>
                <div style={styles.wickIcon}>🪵</div>
                <h3>Wooden Wick</h3>
              </div>
              <div style={styles.wickContent}>
                <div style={styles.wickFeatures}>
                  <div style={styles.wickFeature}>
                    <span style={styles.featureLabel}>Natural:</span>
                    <span style={styles.checkmark}>✓</span>
                  </div>
                  <div style={styles.wickFeature}>
                    <span style={styles.featureLabel}>Soot Production:</span>
                    <span style={styles.checkmark}>✓</span>
                    <span style={styles.featureNote}>Generally cleaner</span>
                  </div>
                  <div style={styles.wickFeature}>
                    <span style={styles.featureLabel}>Scent Throw:</span>
                    <span style={styles.checkmark}>✓</span>
                  </div>
                  <div style={styles.wickFeature}>
                    <span style={styles.featureLabel}>Sustainability:</span>
                    <span style={styles.checkmark}>✓</span>
                    <span style={styles.featureNote}>If FSC-certified</span>
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
        style={{
          ...styles.section,
          ...styles.careSection,
          transform: isVisible.care ? 'translateY(0)' : 'translateY(30px)',
          opacity: isVisible.care ? 1 : 0,
        }}
      >
        <div style={styles.sectionContent}>
          <div style={styles.iconHeader}>
            <Heart style={styles.sectionIcon} />
            <h2 style={styles.sectionTitle}>Candle Care Tips</h2>
          </div>
          
          <div style={styles.tipsGrid}>
            <div style={styles.tipCard}>
              <div style={styles.tipIcon}>✂️</div>
              <h4>Trim Your Wick</h4>
              <p>Keep wicks trimmed to ¼ inch for optimal burning and to prevent smoking</p>
            </div>
            <div style={styles.tipCard}>
              <div style={styles.tipIcon}>⏰</div>
              <h4>Burn Time Limit</h4>
              <p>Never burn for more than 4 hours at a time to prevent overheating</p>
            </div>
            <div style={styles.tipCard}>
              <div style={styles.tipIcon}>🌡️</div>
              <h4>Storage</h4>
              <p>Store in cool, dry places away from direct sunlight to preserve scent</p>
            </div>
            <div style={styles.tipCard}>
              <div style={styles.tipIcon}>💧</div>
              <h4>First Burn</h4>
              <p>Allow the wax pool to reach the edges for even burning throughout the candle's life</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fef9f7 0%, #fff5f2 50%, #f8f6f2 100%)',
    fontFamily: '"Poppins", sans-serif',
    overflow: 'hidden',
  },

  // Hero Section
  hero: {
    height: '80vh',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #2c1810 0%, #4a2c2a 50%, #6b4423 100%)',
    color: 'white',
    overflow: 'hidden',
  },
  heroContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    width: '100%',
    padding: '0 2rem',
    zIndex: 2,
  },
  heroText: {
    flex: 1,
    maxWidth: '600px',
  },
  heroTitle: {
    fontSize: '4rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    animation: 'fadeInUp 1s ease-out',
  },
  flameIcon: {
    color: '#ff6b35',
    filter: 'drop-shadow(0 0 20px rgba(255, 107, 53, 0.6))',
    animation: 'flicker 2s infinite alternate',
  },
  heroSubtitle: {
    fontSize: '1.3rem',
    opacity: '0.9',
    lineHeight: '1.6',
    animation: 'fadeInUp 1s ease-out 0.3s both',
  },
  heroVisual: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  candleGroup: {
    position: 'relative',
    display: 'flex',
    gap: '20px',
    animation: 'float 3s ease-in-out infinite',
  },
  miniCandle: {
    width: '40px',
    height: '120px',
    borderRadius: '8px 8px 3px 3px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
  },
  candle1: {
    background: 'linear-gradient(to bottom, #d4af37 0%, #b8941f 100%)',
    transform: 'rotate(-5deg)',
  },
  candle2: {
    background: 'linear-gradient(to bottom, #e98074 0%, #d26e60 100%)',
    height: '140px',
  },
  candle3: {
    background: 'linear-gradient(to bottom, #8fbc8f 0%, #556b2f 100%)',
    transform: 'rotate(5deg)',
  },
  centerFlame: {
    position: 'absolute',
    top: '-15px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '25px',
    height: '35px',
    background: 'radial-gradient(circle, #ff6b35 0%, #ff4500 50%, #dc143c 100%)',
    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
    animation: 'flicker 1.5s infinite alternate',
    filter: 'blur(1px)',
  },

  // Sections
  section: {
    padding: '6rem 2rem',
    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  sectionContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  iconHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '3rem',
  },
  sectionIcon: {
    color: '#e98074',
    width: '3rem',
    height: '3rem',
  },
  sectionTitle: {
    fontSize: '3rem',
    fontWeight: '700',
    color: '#2b2b2b',
    textAlign: 'center',
  },

  // Wax Types Section
  waxGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3rem',
  },
  waxCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '2.5rem',
    boxShadow: '0 15px 40px rgba(233, 128, 116, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  waxHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  waxIcon: {
    fontSize: '2.5rem',
  },
  waxTitle: {
    fontSize: '1.8rem',
    fontWeight: '600',
    color: '#2b2b2b',
  },
  waxDescription: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '2rem',
    lineHeight: '1.6',
  },
  benefitsList: {
    marginBottom: '2rem',
  },
  benefit: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    marginBottom: '1rem',
    fontSize: '1rem',
    color: '#444',
  },
  benefitIcon: {
    width: '1.2rem',
    height: '1.2rem',
    color: '#e98074',
  },
  waxProperties: {
    background: 'linear-gradient(135deg, #f8f6f2 0%, #fff 100%)',
    padding: '1.5rem',
    borderRadius: '15px',
    border: '1px solid rgba(233, 128, 116, 0.1)',
  },
  property: {
    marginBottom: '0.8rem',
    fontSize: '0.95rem',
    color: '#555',
  },
  cautionBox: {
    background: 'linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)',
    border: '1px solid #ffd93d',
    borderRadius: '15px',
    padding: '1.5rem',
    marginTop: '1.5rem',
  },
  cautionTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#856404',
    marginBottom: '1rem',
  },

  // Scents Section
  scentsSection: {
    background: 'linear-gradient(135deg, #f8f6f2 0%, #fff 100%)',
  },
  scentsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  scentCard: {
    background: 'white',
    borderRadius: '15px',
    padding: '1.5rem',
    boxShadow: '0 10px 25px rgba(233, 128, 116, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    animation: 'slideInUp 0.6s ease-out both',
  },
  scentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scentName: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#2b2b2b',
  },
  priorityBadge: {
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '500',
    color: 'white',
  },

  // Wick Section
  wickGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3rem',
  },
  wickCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '2.5rem',
    boxShadow: '0 15px 40px rgba(233, 128, 116, 0.1)',
    transition: 'transform 0.3s ease',
  },
  wickHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
  },
  wickIcon: {
    fontSize: '2.5rem',
  },
  wickFeatures: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  wickFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    padding: '0.8rem',
    background: '#f8f6f2',
    borderRadius: '10px',
  },
  featureLabel: {
    fontWeight: '600',
    color: '#2b2b2b',
    minWidth: '120px',
  },
  checkmark: {
    color: '#4caf50',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  question: {
    color: '#ff9800',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  featureNote: {
    fontSize: '0.9rem',
    color: '#666',
    fontStyle: 'italic',
  },

  // Care Tips Section
  careSection: {
    background: 'linear-gradient(135deg, #2b2b2b 0%, #404040 100%)',
    color: 'white',
  },
  tipsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },
  tipCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    padding: '2.5rem',
    borderRadius: '20px',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'transform 0.3s ease, background 0.3s ease',
  },
  tipIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
    display: 'block',
  },
};

// Add CSS animations
const animationStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes flicker {
    0%, 100% { transform: translateX(-50%) rotate(-2deg) scale(1); }
    50% { transform: translateX(-50%) rotate(2deg) scale(1.05); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .wax-card:hover {
    transform: translateY(-10px) !important;
    box-shadow: 0 25px 50px rgba(233, 128, 116, 0.2) !important;
  }

  .wick-card:hover {
    transform: translateY(-10px) !important;
  }

  .scent-card:hover {
    transform: translateY(-5px) !important;
    box-shadow: 0 15px 35px rgba(233, 128, 116, 0.2) !important;
  }

  .tip-card:hover {
    transform: translateY(-10px) !important;
    background: rgba(255, 255, 255, 0.2) !important;
  }

  @media (max-width: 768px) {
    .hero-title { font-size: 2.5rem !important; }
    .section-title { font-size: 2rem !important; }
    .wax-grid { grid-template-columns: 1fr !important; }
    .wick-grid { grid-template-columns: 1fr !important; }
    .scents-grid { grid-template-columns: 1fr !important; }
    .tips-grid { grid-template-columns: 1fr !important; }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = animationStyles;
  document.head.appendChild(styleSheet);
}

export default AboutCandles;