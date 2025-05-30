import React, { useEffect, useRef, useState } from 'react';
import { Flame, Heart, Sparkles, Leaf, Award, Users } from 'lucide-react';

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
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <h1 style={styles.heroTitle}>
              <Flame style={styles.flameIcon} />
              Celestial Flames
            </h1>
            <p style={styles.heroSubtitle}>
              Illuminating lives with handcrafted, natural candles from the heart of Sri Lanka
            </p>
          </div>
          <div style={styles.heroVisual}>
            <div style={styles.candleAnimation}>
              <div style={styles.candle}></div>
              <div style={styles.flame}></div>
              <div style={styles.glow}></div>
            </div>
          </div>
        </div>
        <div style={styles.floatingElements}>
          <div style={{...styles.float, ...styles.float1}}>✨</div>
          <div style={{...styles.float, ...styles.float2}}>🕯️</div>
          <div style={{...styles.float, ...styles.float3}}>🌸</div>
          <div style={{...styles.float, ...styles.float4}}>✨</div>
        </div>
      </section>

      {/* About Section */}
      <section 
        ref={setSectionRef('about')}
        style={{
          ...styles.section,
          transform: isVisible.about ? 'translateY(0)' : 'translateY(50px)',
          opacity: isVisible.about ? 1 : 0,
        }}
      >
        <div style={styles.sectionContent}>
          <div style={styles.iconHeader}>
            <Heart style={styles.sectionIcon} />
            <h2 style={styles.sectionTitle}>About Us</h2>
          </div>
          <div style={styles.cardContainer}>
            <div style={styles.textCard}>
              <p style={styles.text}>
                At Celestial Flames, we believe in the transformative power of scents. Our handcrafted candles are more than just sources of light – they're gateways to emotion, memory, and tranquility. Each candle tells a story, carries a mood, and creates an atmosphere that can transport you to another realm.
              </p>
              <p style={styles.text}>
                We believe that natural fragrances have the power to uplift spirits, heal hearts, inspire creativity, and create profound moments of peace. Our commitment to using only pure soy wax and gel wax ensures that every flame burns clean and true.
              </p>
            </div>
            <div style={styles.featureGrid}>
              <div style={styles.featureCard}>
                <Leaf style={styles.featureIcon} />
                <h4>100% Natural</h4>
                <p>Pure soy & gel wax only</p>
              </div>
              <div style={styles.featureCard}>
                <Award style={styles.featureIcon} />
                <h4>Handcrafted</h4>
                <p>Made with love in Sri Lanka</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section 
        ref={setSectionRef('story')}
        style={{
          ...styles.section,
          ...styles.storySection,
          transform: isVisible.story ? 'translateX(0)' : 'translateX(-50px)',
          opacity: isVisible.story ? 1 : 0,
        }}
      >
        <div style={styles.sectionContent}>
          <div style={styles.iconHeader}>
            <Sparkles style={styles.sectionIcon} />
            <h2 style={styles.sectionTitle}>Our Story</h2>
          </div>
          <div style={styles.storyCard}>
            <div style={styles.timeline}>
              <div style={styles.timelineItem}>
                <div style={styles.timelineYear}>2023</div>
                <div style={styles.timelineContent}>
                  <h4>Humble Beginnings</h4>
                  <p>Started in our kitchen, experimenting with natural waxes and unique scent combinations</p>
                </div>
              </div>
              <div style={styles.timelineItem}>
                <div style={styles.timelineYear}>Growth</div>
                <div style={styles.timelineContent}>
                  <h4>Community Love</h4>
                  <p>Friends and family became our first customers, sharing our candles as gifts of warmth</p>
                </div>
              </div>
              <div style={styles.timelineItem}>
                <div style={styles.timelineYear}>Today</div>
                <div style={styles.timelineContent}>
                  <h4>Expanding Dreams</h4>
                  <p>Growing our collection with natural essential oils and innovative wax alternatives</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section 
        ref={setSectionRef('vision')}
        style={{
          ...styles.section,
          transform: isVisible.vision ? 'scale(1)' : 'scale(0.95)',
          opacity: isVisible.vision ? 1 : 0,
        }}
      >
        <div style={styles.sectionContent}>
          <div style={styles.visionMissionGrid}>
            <div style={styles.visionCard}>
              <div style={styles.cardHeader}>
                <Users style={styles.cardIcon} />
                <h3>Our Vision</h3>
              </div>
              <p style={styles.cardText}>
                To become Sri Lanka's leading creator of natural, therapeutic candles that inspire wellness, 
                create memorable experiences, and bring people together through the universal language of scent.
              </p>
            </div>
            <div style={styles.missionCard}>
              <div style={styles.cardHeader}>
                <Flame style={styles.cardIcon} />
                <h3>Our Mission</h3>
              </div>
              <p style={styles.cardText}>
                To craft exceptional candles using only natural, sustainable materials while supporting local communities 
                and preserving traditional candle-making artistry for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section 
        ref={setSectionRef('values')}
        style={{
          ...styles.section,
          ...styles.valuesSection,
          transform: isVisible.values ? 'translateY(0)' : 'translateY(30px)',
          opacity: isVisible.values ? 1 : 0,
        }}
      >
        <div style={styles.sectionContent}>
          <h2 style={styles.valuesTitle}>What We Stand For</h2>
          <div style={styles.valuesGrid}>
            <div style={styles.valueCard}>
              <div style={styles.valueIcon}>🌱</div>
              <h4>Sustainability</h4>
              <p>Committed to eco-friendly practices and natural ingredients</p>
            </div>
            <div style={styles.valueCard}>
              <div style={styles.valueIcon}>✋</div>
              <h4>Handcrafted Quality</h4>
              <p>Every candle is made with attention to detail and care</p>
            </div>
            <div style={styles.valueCard}>
              <div style={styles.valueIcon}>🇱🇰</div>
              <h4>Local Pride</h4>
              <p>Proudly representing Sri Lankan craftsmanship globally</p>
            </div>
            <div style={styles.valueCard}>
              <div style={styles.valueIcon}>💫</div>
              <h4>Wellness Focus</h4>
              <p>Creating products that enhance mental and emotional well-being</p>
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
    height: '100vh',
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
  candleAnimation: {
    position: 'relative',
    animation: 'float 3s ease-in-out infinite',
  },
  candle: {
    width: '60px',
    height: '200px',
    background: 'linear-gradient(to bottom, #d4af37 0%, #b8941f 100%)',
    borderRadius: '10px 10px 5px 5px',
    position: 'relative',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  },
  flame: {
    width: '20px',
    height: '30px',
    background: 'radial-gradient(circle, #ff6b35 0%, #ff4500 50%, #dc143c 100%)',
    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
    position: 'absolute',
    top: '-15px',
    left: '50%',
    transform: 'translateX(-50%)',
    animation: 'flicker 1.5s infinite alternate',
    filter: 'blur(1px)',
  },
  glow: {
    width: '100px',
    height: '100px',
    background: 'radial-gradient(circle, rgba(255, 107, 53, 0.3) 0%, transparent 70%)',
    position: 'absolute',
    top: '-50px',
    left: '50%',
    transform: 'translateX(-50%)',
    borderRadius: '50%',
    animation: 'pulse 2s infinite',
  },

  // Floating Elements
  floatingElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
  float: {
    position: 'absolute',
    fontSize: '2rem',
    opacity: '0.6',
  },
  float1: {
    top: '20%',
    left: '10%',
    animation: 'floatAround 8s infinite linear',
  },
  float2: {
    top: '60%',
    right: '15%',
    animation: 'floatAround 10s infinite linear reverse',
  },
  float3: {
    top: '30%',
    right: '25%',
    animation: 'floatAround 12s infinite linear',
  },
  float4: {
    bottom: '20%',
    left: '20%',
    animation: 'floatAround 9s infinite linear reverse',
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

  // Cards
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '3rem',
    alignItems: 'start',
  },
  textCard: {
    background: 'white',
    padding: '3rem',
    borderRadius: '20px',
    boxShadow: '0 15px 40px rgba(233, 128, 116, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  text: {
    fontSize: '1.2rem',
    lineHeight: '1.8',
    color: '#444',
    marginBottom: '1.5rem',
  },
  featureGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  featureCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '15px',
    textAlign: 'center',
    boxShadow: '0 10px 25px rgba(233, 128, 116, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  featureIcon: {
    color: '#e98074',
    width: '2.5rem',
    height: '2.5rem',
    marginBottom: '1rem',
  },

  // Story Section
  storySection: {
    background: 'linear-gradient(135deg, #f8f6f2 0%, #fff 100%)',
  },
  storyCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '3rem',
    boxShadow: '0 20px 50px rgba(233, 128, 116, 0.15)',
  },
  timeline: {
    position: 'relative',
  },
  timelineItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2.5rem',
    position: 'relative',
  },
  timelineYear: {
    background: 'linear-gradient(135deg, #e98074, #d26e60)',
    color: 'white',
    padding: '1rem 1.5rem',
    borderRadius: '25px',
    fontWeight: '600',
    minWidth: '120px',
    textAlign: 'center',
    marginRight: '2rem',
  },
  timelineContent: {
    flex: 1,
  },

  // Vision & Mission
  visionMissionGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3rem',
  },
  visionCard: {
    background: 'linear-gradient(135deg, #e98074 0%, #d26e60 100%)',
    color: 'white',
    padding: '3rem',
    borderRadius: '20px',
    textAlign: 'center',
    transform: 'perspective(1000px) rotateY(-5deg)',
    transition: 'transform 0.3s ease',
  },
  missionCard: {
    background: 'linear-gradient(135deg, #2b2b2b 0%, #404040 100%)',
    color: 'white',
    padding: '3rem',
    borderRadius: '20px',
    textAlign: 'center',
    transform: 'perspective(1000px) rotateY(5deg)',
    transition: 'transform 0.3s ease',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  cardIcon: {
    width: '2rem',
    height: '2rem',
  },
  cardText: {
    fontSize: '1.1rem',
    lineHeight: '1.7',
    opacity: '0.95',
  },

  // Values Section
  valuesSection: {
    background: 'linear-gradient(135deg, #2b2b2b 0%, #404040 100%)',
    color: 'white',
  },
  valuesTitle: {
    fontSize: '3rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '4rem',
    color: 'white',
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },
  valueCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    padding: '2.5rem',
    borderRadius: '20px',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'transform 0.3s ease, background 0.3s ease',
  },
  valueIcon: {
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

  @keyframes pulse {
    0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.3; }
    50% { transform: translateX(-50%) scale(1.1); opacity: 0.5; }
  }

  @keyframes floatAround {
    0% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-20px) rotate(90deg); }
    50% { transform: translateY(0px) rotate(180deg); }
    75% { transform: translateY(20px) rotate(270deg); }
    100% { transform: translateY(0px) rotate(360deg); }
  }

  .feature-card:hover {
    transform: translateY(-5px) !important;
    box-shadow: 0 20px 40px rgba(233, 128, 116, 0.2) !important;
  }

  .vision-card:hover {
    transform: perspective(1000px) rotateY(0deg) translateZ(20px) !important;
  }

  .mission-card:hover {
    transform: perspective(1000px) rotateY(0deg) translateZ(20px) !important;
  }

  .value-card:hover {
    transform: translateY(-10px) !important;
    background: rgba(255, 255, 255, 0.2) !important;
  }

  @media (max-width: 768px) {
    .hero-title { font-size: 2.5rem !important; }
    .section-title { font-size: 2rem !important; }
    .card-container { grid-template-columns: 1fr !important; }
    .vision-mission-grid { grid-template-columns: 1fr !important; }
    .values-grid { grid-template-columns: 1fr !important; }
    .timeline-item { flex-direction: column; text-align: center; }
    .timeline-year { margin-right: 0 !important; margin-bottom: 1rem; }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = animationStyles;
  document.head.appendChild(styleSheet);
}

export default AboutUs;