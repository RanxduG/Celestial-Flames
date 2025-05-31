import React, { useEffect, useRef, useState } from 'react';
import { 
  Flame, 
  Shield, 
  Clock, 
  Scissors, 
  Wind, 
  Thermometer, 
  Eye, 
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Heart,
  Sparkles
} from 'lucide-react';
import './CSS/CandleCare.css';

const CandleCare = () => {
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

  const careInstructions = [
    {
      icon: Flame,
      title: "Initial Lighting",
      description: "Light your candle carefully for the first time",
      details: "Allow the wax to melt completely across the surface during first burn to prevent tunneling.",
      color: "#ff6b35"
    },
    {
      icon: Scissors,
      title: "Trim the Wick",
      description: "Keep wick at ¼ inch before each burn",
      details: "Trim wick to prevent smoking, uneven flame, and ensure optimal burn time.",
      color: "#e98074"
    },
    {
      icon: Clock,
      title: "Burn Time Management",
      description: "Limit burning to 2-4 hours per session",
      details: "Never burn longer than 4 hours at a time. Allow candle to cool before relighting.",
      color: "#d26e60"
    },
    {
      icon: Wind,
      title: "Avoid Drafts",
      description: "Keep away from air currents",
      details: "Place in draft-free areas to prevent uneven burning and smoking.",
      color: "#b8941f"
    }
  ];

  const safetyTips = [
    {
      icon: Eye,
      title: "Never Leave Unattended",
      description: "Always monitor your burning candle"
    },
    {
      icon: Shield,
      title: "Safe Distance",
      description: "Keep 12 inches from flammable items"
    },
    {
      icon: Thermometer,
      title: "Cool Storage",
      description: "Store in cool, dry places away from sunlight"
    },
    {
      icon: AlertTriangle,
      title: "Extinguish Safely",
      description: "Use snuffer or blow out gently, avoid water"
    }
  ];

  const maintenanceTips = [
    {
      step: "Wax Pool Management",
      description: "After lighting the candle, monitor for a pool of melted wax near the wick. This helps prevent tunneling.",
      icon: "💧"
    },
    {
      step: "Extinguishing & Relighting",
      description: "Try to extinguish the candle when ½ inch of wax remains. Pour out excess wax before extinguishing.",
      icon: "🔥"
    },
    {
      step: "Placement",
      description: "Keep candles away from drafts, pets, kids, and flammable items. Ensure stable, heat-resistant surface.",
      icon: "📍"
    },
    {
      step: "Storage",
      description: "Store in a cool, dry place, away from direct sunlight to preserve scent and prevent warping.",
      icon: "🏠"
    }
  ];

  return (
    <div className="care-candle-care-container">
      {/* Hero Section */}
      <section className="care-hero">
        <div className="care-hero-content">
          <div className="care-hero-text-section">
            <div className="care-hero-icon-wrapper">
              <Heart className="care-hero-heart-icon" />
              <Sparkles className="care-hero-sparkle-icon" />
            </div>
            <h1 className="care-hero-title">
              Candle Care & Maintenance
            </h1>
            <p className="care-hero-subtitle">
              Extend the life and beauty of your Celestial Flames candles with proper care
            </p>
            <div className="care-hero-stats">
              <div className="care-stat-item">
                <span className="care-stat-number">40+</span>
                <span className="care-stat-label">Hours Burn Time</span>
              </div>
              <div className="care-stat-item">
                <span className="care-stat-number">100%</span>
                <span className="care-stat-label">Natural Wax</span>
              </div>
            </div>
          </div>
          <div className="care-hero-visual-section">
            <div className="care-floating-candle">
              <div className="care-candle-body"></div>
              <div className="care-candle-flame"></div>
              <div className="care-flame-glow"></div>
              <div className="care-wax-pool"></div>
            </div>
            <div className="care-icons-orbit">
              <div className="care-orbit-icon care-orbit-1"><Scissors size={20} /></div>
              <div className="care-orbit-icon care-orbit-2"><Clock size={20} /></div>
              <div className="care-orbit-icon care-orbit-3"><Shield size={20} /></div>
              <div className="care-orbit-icon care-orbit-4"><Wind size={20} /></div>
            </div>
          </div>
        </div>
        <div className="care-hero-particles">
          <div className="care-particle care-particle-1">✨</div>
          <div className="care-particle care-particle-2">🕯️</div>
          <div className="care-particle care-particle-3">💫</div>
          <div className="care-particle care-particle-4">✨</div>
          <div className="care-particle care-particle-5">🌟</div>
        </div>
      </section>

      {/* Care Instructions */}
      <section 
        ref={setSectionRef('instructions')}
        className={`care-instructions-section ${isVisible.instructions ? 'care-visible' : ''}`}
      >
        <div className="care-section-content">
          <div className="care-section-header">
            <Lightbulb className="care-section-icon" />
            <h2 className="care-section-title">Essential Care Instructions</h2>
            <p className="care-section-subtitle">Follow these steps to ensure optimal candle performance</p>
          </div>
          
          <div className="care-instructions-grid">
            {careInstructions.map((instruction, index) => (
              <div 
                key={index} 
                className="care-instruction-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="care-instruction-header">
                  <div className="care-icon-wrapper" style={{ backgroundColor: instruction.color }}>
                    <instruction.icon size={24} />
                  </div>
                  <h3 className="care-instruction-title">{instruction.title}</h3>
                </div>
                <p className="care-instruction-description">{instruction.description}</p>
                <div className="care-instruction-details">
                  <CheckCircle size={16} className="care-check-icon" />
                  <span>{instruction.details}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Guidelines */}
      <section 
        ref={setSectionRef('safety')}
        className={`care-safety-section ${isVisible.safety ? 'care-visible' : ''}`}
      >
        <div className="care-section-content">
          <div className="care-section-header">
            <Shield className="care-section-icon care-safety-icon" />
            <h2 className="care-section-title">Safety First</h2>
            <p className="care-section-subtitle">Important safety guidelines for worry-free enjoyment</p>
          </div>
          
          <div className="care-safety-grid">
            {safetyTips.map((tip, index) => (
              <div 
                key={index} 
                className="care-safety-card"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="care-safety-icon-wrapper">
                  <tip.icon size={28} />
                </div>
                <h4 className="care-safety-title">{tip.title}</h4>
                <p className="care-safety-description">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Guide */}
      <section 
        ref={setSectionRef('maintenance')}
        className={`care-maintenance-section ${isVisible.maintenance ? 'care-visible' : ''}`}
      >
        <div className="care-section-content">
          <div className="care-section-header">
            <Flame className="care-section-icon" />
            <h2 className="care-section-title">Step-by-Step Maintenance</h2>
            <p className="care-section-subtitle">Detailed guide for long-lasting candle enjoyment</p>
          </div>
          
          <div className="care-maintenance-timeline">
            {maintenanceTips.map((tip, index) => (
              <div 
                key={index} 
                className="care-timeline-item"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div className="care-timeline-marker">
                  <span className="care-timeline-icon">{tip.icon}</span>
                  <span className="care-timeline-number">{index + 1}</span>
                </div>
                <div className="care-timeline-content">
                  <h4 className="care-timeline-title">{tip.step}</h4>
                  <p className="care-timeline-description">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Reference Card */}
      <section 
        ref={setSectionRef('reference')}
        className={`care-reference-section ${isVisible.reference ? 'care-visible' : ''}`}
      >
        <div className="care-section-content">
          <div className="care-reference-card">
            <div className="care-card-header">
              <Sparkles className="care-card-icon" />
              <h3>Quick Reference Guide</h3>
            </div>
            <div className="care-reference-grid">
              <div className="care-reference-item">
                <strong>First Burn:</strong>
                <span>2-3 hours minimum</span>
              </div>
              <div className="care-reference-item">
                <strong>Wick Length:</strong>
                <span>¼ inch before each use</span>
              </div>
              <div className="care-reference-item">
                <strong>Max Burn Time:</strong>
                <span>4 hours per session</span>
              </div>
              <div className="care-reference-item">
                <strong>Storage:</strong>
                <span>Cool, dry place</span>
              </div>
              <div className="care-reference-item">
                <strong>Safety Distance:</strong>
                <span>12 inches from objects</span>
              </div>
              <div className="care-reference-item">
                <strong>Wax Remaining:</strong>
                <span>Stop at ½ inch</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="care-contact-section">
        <div className="care-section-content">
          <div className="care-contact-card">
            <h3>Need More Help?</h3>
            <p>Have questions about caring for your Celestial Flames candles?</p>
            <div className="care-contact-info">
              <div className="care-contact-item">
                <span>📱 WhatsApp:</span>
                <a href="https://wa.me/94777008359">+94 77 700 8359</a>
              </div>
              <div className="care-contact-item">
                <span>✉️ Email:</span>
                <a href="mailto:celestialflames.candles@gmail.com">celestialflames.candles@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CandleCare;