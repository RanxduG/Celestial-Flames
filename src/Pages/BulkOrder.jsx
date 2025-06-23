import React, { useEffect, useRef, useState } from 'react';
import { 
  MessageCircle,
  Heart,
  CheckCircle,
  Users,
  ArrowRight,
  FileText,
  CreditCard,
  Factory,
  Shield,
  Clock,
  Calculator,
  MessageSquare,
  Award,
  Zap,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './CSS/BulkOrder.css';

const BulkOrder = () => {
  const [isVisible, setIsVisible] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRefs = useRef({});
  const rotationIntervalRef = useRef(null);

  const processSteps = [
    {
      icon: MessageSquare,
      title: "Inquiry",
      description: "Contact us via social media or WhatsApp",
      details: "Share your vision and requirements"
    },
    {
      icon: FileText,
      title: "Quotation",
      description: "Receive detailed pricing within 24 hours",
      details: "Agreement and terms included"
    },
    {
      icon: CheckCircle,
      title: "Order Confirmation",
      description: "50% deposit confirms your order",
      details: "Sample approval in first 3 days"
    },
    {
      icon: Factory,
      title: "Production",
      description: "Handcrafted creation begins",
      details: "Progress updates provided"
    },
    {
      icon: CreditCard,
      title: "Final Payment",
      description: "Remaining 50% due on delivery",
      details: "Multiple payment options available"
    },
    {
      icon: Shield,
      title: "Post Delivery Support",
      description: "Ongoing support and guidance",
      details: "Usage instructions included"
    }
  ];

  const businessHighlights = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "100% natural soy & gel wax"
    },
    {
      icon: Zap,
      title: "Fast Turnaround",
      description: "5-7 days lead time"
    },
    {
      icon: Target,
      title: "Custom Design",
      description: "Fully personalized candles"
    },
    {
      icon: Users,
      title: "Bulk Discounts",
      description: "Up to 20% off large orders"
    }
  ];

  const pricingTiers = [
    {
      range: "50-99 Candles",
      discount: "10%",
      title: "Starter Pack",
      features: ["Custom designs", "3-day sample approval", "Island-wide delivery", "Usage guide included"]
    },
    {
      range: "100+ Candles",
      discount: "20%",
      title: "Premium Bulk",
      features: ["Maximum discount", "Priority production", "Dedicated support", "Free design consultation"]
    }
  ];

  const calculateActiveStep = (angle) => {
    const stepAngle = 360 / processSteps.length;
    const normalizedAngle = ((angle % 360) + 360) % 360;
    
    let closestStep = 0;
    let minDistance = 360;
    
    for (let i = 0; i < processSteps.length; i++) {
      const stepPosition = (i * stepAngle) % 360;
      const distance1 = Math.abs(normalizedAngle - stepPosition);
      const distance2 = Math.abs(normalizedAngle - stepPosition + 360);
      const distance3 = Math.abs(normalizedAngle - stepPosition - 360);
      const minStepDistance = Math.min(distance1, distance2, distance3);
      
      if (minStepDistance < minDistance) {
        minDistance = minStepDistance;
        closestStep = i;
      }
    }
    
    return closestStep;
  };

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Setup intersection observers
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

    // Auto-rotation for desktop only
    const startRotation = () => {
      if (!isMobile) {
        rotationIntervalRef.current = setInterval(() => {
          setRotationAngle(prevAngle => {
            const rotationSpeed = 0.5;
            const newAngle = (prevAngle + rotationSpeed) % 360;
            const newActiveStep = calculateActiveStep(newAngle);
            setActiveStep(newActiveStep);
            return newAngle;
          });
        }, 50);
      }
    };

    startRotation();

    return () => {
      Object.values(observers).forEach(observer => observer.disconnect());
      window.removeEventListener('resize', checkMobile);
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
      }
    };
  }, [isMobile]);

  const handleStepClick = (stepIndex) => {
    if (isMobile) {
      setActiveStep(stepIndex);
      return;
    }

    if (rotationIntervalRef.current) {
      clearInterval(rotationIntervalRef.current);
    }
    
    setActiveStep(stepIndex);
    const targetAngle = stepIndex * (360 / processSteps.length);
    setRotationAngle(targetAngle);
    
    setTimeout(() => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
      }
      rotationIntervalRef.current = setInterval(() => {
        setRotationAngle(prevAngle => {
          const rotationSpeed = 0.5;
          const newAngle = (prevAngle + rotationSpeed) % 360;
          const newActiveStep = calculateActiveStep(newAngle);
          if (newActiveStep !== activeStep) {
            setActiveStep(newActiveStep);
          }
          return newAngle;
        });
      }, 50);
    }, 5000);
  };

  const setSectionRef = (key) => (el) => {
    sectionRefs.current[key] = el;
  };

  return (
    <div className="bulk-order-container">
      {/* Hero Section */}
      <section className="bulk-order-hero">
        <div className="bulk-order-hero-content">
          <div className="bulk-order-hero-text-section">
            <h1 className="bulk-order-hero-title">
              Bulk Orders Made Simple
            </h1>
            <p className="bulk-order-hero-subtitle">
              Transform your events, business, or special occasions with our handcrafted custom candles. 
              Minimum 50 pieces with discounts up to 20%.
            </p>
            <div className="bulk-order-hero-highlights">
              {businessHighlights.map((highlight, index) => (
                <div key={index} className="bulk-order-highlight-item">
                  <highlight.icon className="bulk-order-highlight-icon" />
                  <div>
                    <span className="bulk-order-highlight-title">{highlight.title}</span>
                    <span className="bulk-order-highlight-desc">{highlight.description}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bulk-order-hero-cta">
              <a 
                href="https://wa.me/94770081559" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bulk-order-cta-primary"
              >
                <MessageCircle size={20} />
                Start Your Order on WhatsApp
              </a>
              <Link to="/contactus" className="bulk-order-cta-secondary">
                Contact Us
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          
          <div className="bulk-order-hero-visual-section">
            {!isMobile ? (
              <>
                {/* Desktop: Rotating Process Circle */}
                <div 
                  className="bulk-order-process-circle"
                  style={{ 
                    transform: `rotate(${rotationAngle}deg)`,
                    transition: 'none'
                  }}
                >
                  {processSteps.map((step, index) => {
                    const reversedIndex = processSteps.length - 1 - index;
                    const stepAngle = (360 / processSteps.length) * reversedIndex;
                    const radius = 225;
                    const x = Math.sin((stepAngle * Math.PI) / 180) * radius;
                    const y = -Math.cos((stepAngle * Math.PI) / 180) * radius;
                    
                    return (
                      <div
                        key={index}
                        className={`bulk-order-process-step ${
                          index === activeStep ? 'active' : ''
                        }`}
                        style={{
                          position: 'absolute',
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: `translate(-50%, -50%) rotate(${-rotationAngle}deg)`
                        }}
                        onClick={() => handleStepClick(index)}
                      >
                        <div className="bulk-order-step-icon">
                          {React.createElement(step.icon, { size: 18 })}
                        </div>
                        <div className="bulk-order-step-tooltip">
                          <h4>{step.title}</h4>
                          <p>{step.details}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="bulk-order-process-center">
                  <div className="bulk-order-process-icon-wrapper">
                    {React.createElement(processSteps[activeStep].icon, {
                      className: "bulk-order-process-center-icon",
                      size: 32
                    })}
                  </div>
                  <h3 className="bulk-order-process-center-title">
                    {processSteps[activeStep].title}
                  </h3>
                  <p className="bulk-order-process-center-desc">
                    {processSteps[activeStep].description}
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Mobile: Simple Step Navigator */}
                <div className="bulk-order-mobile-process">
                  <div className="bulk-order-mobile-step-nav">
                    {processSteps.map((step, index) => (
                      <button
                        key={index}
                        className={`bulk-order-mobile-step-btn ${
                          index === activeStep ? 'active' : ''
                        }`}
                        onClick={() => handleStepClick(index)}
                      >
                        {React.createElement(step.icon, { size: 16 })}
                      </button>
                    ))}
                  </div>
                  
                  <div className="bulk-order-mobile-step-content">
                    <div className="bulk-order-mobile-step-icon">
                      {React.createElement(processSteps[activeStep].icon, { size: 28 })}
                    </div>
                    <h3 className="bulk-order-mobile-step-title">
                      {processSteps[activeStep].title}
                    </h3>
                    <p className="bulk-order-mobile-step-desc">
                      {processSteps[activeStep].description}
                    </p>
                    <p className="bulk-order-mobile-step-details">
                      {processSteps[activeStep].details}
                    </p>
                  </div>
                  
                  <div className="bulk-order-mobile-step-counter">
                    <span>{activeStep + 1}</span>
                    <span>/</span>
                    <span>{processSteps.length}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="bulk-order-hero-particles">
          <div className="bulk-order-particle bulk-order-particle-1">🕯️</div>
          <div className="bulk-order-particle bulk-order-particle-2">✨</div>
          <div className="bulk-order-particle bulk-order-particle-3">💫</div>
          <div className="bulk-order-particle bulk-order-particle-4">🌟</div>
          <div className="bulk-order-particle bulk-order-particle-5">🕯️</div>
          <div className="bulk-order-particle bulk-order-particle-6">✨</div>
        </div>
      </section>

      {/* Process Details Section */}
      <section 
        ref={setSectionRef('process')}
        className={`bulk-order-process-section ${isVisible.process ? 'bulk-order-visible' : ''}`}
      >
        <div className="bulk-order-section-content">
          <div className="bulk-order-section-header">
            <Target className="bulk-order-section-icon" />
            <h2 className="bulk-order-section-title">Our Simple 6-Step Process</h2>
            <p className="bulk-order-section-subtitle">From inquiry to delivery, we make bulk ordering seamless</p>
          </div>
          
          <div className="bulk-order-process-grid">
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                className="bulk-order-process-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bulk-order-process-number">{index + 1}</div>
                <div className="bulk-order-process-icon-container">
                  <step.icon className="bulk-order-process-card-icon" />
                </div>
                <h3 className="bulk-order-process-card-title">{step.title}</h3>
                <p className="bulk-order-process-card-description">{step.description}</p>
                <p className="bulk-order-process-card-details">{step.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section 
        ref={setSectionRef('pricing')}
        className={`bulk-order-pricing-section ${isVisible.pricing ? 'bulk-order-visible' : ''}`}
      >
        <div className="bulk-order-section-content">
          <div className="bulk-order-section-header">
            <Calculator className="bulk-order-section-icon" />
            <h2 className="bulk-order-section-title">Transparent Pricing</h2>
            <p className="bulk-order-section-subtitle">Better discounts for larger quantities</p>
          </div>
          
          <div className="bulk-order-pricing-grid">
            {pricingTiers.map((tier, index) => (
              <div 
                key={index} 
                className={`bulk-order-pricing-card ${index === 1 ? 'featured' : ''}`}
              >
                {index === 1 && <div className="bulk-order-pricing-badge">Most Popular</div>}
                <div className="bulk-order-pricing-header">
                  <h3 className="bulk-order-pricing-title">{tier.title}</h3>
                  <div className="bulk-order-pricing-range">{tier.range}</div>
                  <div className="bulk-order-pricing-discount">
                    <span className="bulk-order-discount-amount">{tier.discount}</span>
                    <span className="bulk-order-discount-text">Discount</span>
                  </div>
                </div>
                <ul className="bulk-order-pricing-features">
                  {tier.features.map((feature, featIndex) => (
                    <li key={featIndex} className="bulk-order-pricing-feature">
                      <CheckCircle size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="bulk-order-pricing-note">
            <Clock size={20} />
            <p>Lead time varies based on candle type.</p>
          </div>
        </div>
      </section>

      {/* Agreement Summary Section */}
      <section 
        ref={setSectionRef('agreement')}
        className={`bulk-order-agreement-section ${isVisible.agreement ? 'bulk-order-visible' : ''}`}
      >
        <div className="bulk-order-section-content">
          <div className="bulk-order-section-header">
            <Shield className="bulk-order-section-icon" />
            <h2 className="bulk-order-section-title">Terms & Conditions</h2>
            <p className="bulk-order-section-subtitle">Clear terms for a smooth ordering experience</p>
          </div>
          
          <div className="bulk-order-agreement-grid">
            <div className="bulk-order-agreement-card">
              <h3>Order Requirements</h3>
              <ul>
                <li>Minimum Order Quantity: 50 candles</li>
                <li>All candles are fully customizable</li>
                <li>Lead time depends on candle complexity</li>
                <li>Custom molds require additional time</li>
              </ul>
            </div>
            
            <div className="bulk-order-agreement-card">
              <h3>Payment Terms</h3>
              <ul>
                <li>50% refundable deposit to start</li>
                <li>Remaining 50% due on delivery</li>
                <li>Multiple payment methods accepted</li>
                <li>Deposit becomes non-refundable after sample approval</li>
              </ul>
            </div>
            
            <div className="bulk-order-agreement-card">
              <h3>Sample & Testing</h3>
              <ul>
                <li>Sample candle provided for approval</li>
                <li>3-day testing phase for feedback</li>
                <li>Changes accepted during testing only</li>
                <li>No changes after production starts</li>
              </ul>
            </div>
            
            <div className="bulk-order-agreement-card">
              <h3>Cancellation Policy</h3>
              <ul>
                <li>Orders can be canceled before sample confirmation</li>
                <li>No cancellations after sample approval</li>
                <li>Full deposit refund if canceled early</li>
                <li>Usage instructions provided with delivery</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bulk-order-cta-section">
        <div className="bulk-order-section-content">
          <div className="bulk-order-cta-container">
            <div className="bulk-order-cta-content">
              <Heart className="bulk-order-cta-icon" />
              <h2 className="bulk-order-cta-title">Ready to Light Up Your Event?</h2>
              <p className="bulk-order-cta-subtitle">
                Let's create something beautiful together. Start your bulk order journey today.
              </p>
              <div className="bulk-order-cta-buttons">
                <a 
                  href="https://wa.me/94770081559" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bulk-order-btn-primary"
                >
                  <MessageCircle size={20} />
                  WhatsApp Us Now
                </a>
                <Link to="/contactus" className="bulk-order-btn-secondary">
                  Get Detailed Quote
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
            
            <div className="bulk-order-cta-visual">
              <div className="bulk-order-floating-candles">
                <div className="bulk-order-candle bulk-order-candle-1">
                  <div className="bulk-order-candle-body"></div>
                  <div className="bulk-order-candle-flame"></div>
                </div>
                <div className="bulk-order-candle bulk-order-candle-2">
                  <div className="bulk-order-candle-body"></div>
                  <div className="bulk-order-candle-flame"></div>
                </div>
                <div className="bulk-order-candle bulk-order-candle-3">
                  <div className="bulk-order-candle-body"></div>
                  <div className="bulk-order-candle-flame"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BulkOrder;