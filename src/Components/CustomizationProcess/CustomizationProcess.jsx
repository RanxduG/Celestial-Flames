import React, { useEffect, useRef, useState } from 'react';
import './CustomizationProcess.css';
import { Link } from 'react-router-dom';

const CustomizationProcess = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);

  const steps = [
    {
      id: 1,
      icon: '🕯️',
      title: 'Choose Your Candle',
      description: 'Select from our carefully curated collections, each designed to create a unique ambiance for your space.',
      features: [
        'Classic Collection - Timeless elegance',
        'Elemental Collection - Nature-inspired designs',
        'Crystal Collection - Luxury meets spirituality'
      ]
    },
    {
      id: 2,
      icon: '🐝',
      title: 'Choose Your Wax Type',
      description: 'Pick the perfect wax blend that matches your preferences for burn time, scent throw, and sustainability.',
      features: [
        'Soy Wax - Eco-friendly and clean burning',
        'Beeswax - Natural and long-lasting',
        'Paraffin Wax - Strong scent throw'
      ]
    },
    {
      id: 3,
      icon: '🌸',
      title: 'Choose Your Fragrance',
      description: 'Explore our extensive fragrance library to find the perfect scent that speaks to your soul.',
      features: [
        'Floral - Fresh and romantic scents',
        'Woody - Warm and grounding aromas',
        'Citrus - Energizing and uplifting fragrances'
      ]
    },
    {
      id: 4,
      icon: '🎨',
      title: 'Choose Your Color',
      description: 'Complete your custom candle with colors that complement your style and home decor perfectly.',
      features: [
        'Natural tones - Subtle and sophisticated',
        'Vibrant hues - Bold and expressive',
        'Pastel shades - Soft and calming'
      ]
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

  useEffect(() => {
    if (!isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.indexOf(entry.target);
            if (index !== -1) {
              entry.target.classList.add('cp-animate-in');
              setActiveStep(Math.max(activeStep, index));
              
              // Update timeline progress
              if (timelineRef.current) {
                const progress = ((index + 1) / steps.length) * 100;
                timelineRef.current.style.height = `${progress}%`;
              }
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [isVisible, activeStep, steps.length]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="cp-customization-process" ref={sectionRef}>
      <div className="cp-process-container">
        {/* Section Header */}
        <div className={`cp-process-header ${isVisible ? 'cp-animate-in' : ''}`}>
          <h2>Your Custom Candle Journey</h2>
          <p>
            Create your perfect candle in four simple steps. Each choice you make 
            brings you closer to a truly personalized aromatic experience.
          </p>
          <div className="cp-header-divider">
            <div className="cp-flame-icon">🔥</div>
          </div>
        </div>

        {/* Steps Timeline */}
        <div className="cp-steps-timeline">
          <div className="cp-timeline-line"></div>
          <div className="cp-timeline-progress" ref={timelineRef}></div>
          
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="cp-step-container"
              ref={(el) => (stepRefs.current[index] = el)}
            >
              <div className="cp-step-card">
                <div className="cp-step-number">{step.id}</div>
                
                <div className="cp-step-content">
                  <span className="cp-step-icon">{step.icon}</span>
                  
                  <h3 className="cp-step-title">{step.title}</h3>
                  
                  <p className="cp-step-description">{step.description}</p>
                  
                  <div className="cp-step-features">
                    <ul className="cp-feature-list">
                      {step.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="cp-feature-item">
                          <span className="cp-feature-icon">✨</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Single CTA Button - Positioned after all steps */}
        <div className={`cp-process-cta ${isVisible ? 'cp-animate-in' : ''}`}>
          <div className="cp-cta-content">
            <span className="cp-cta-icon">✨</span>
            <h3 className="cp-cta-title">Ready to Create Your Perfect Candle?</h3>
            <p className="cp-cta-description">
              Join thousands of satisfied customers who have created their dream candles. 
              Start your customization journey today and experience the magic of personalized aromatherapy.
            </p>
            <Link 
              to="/Catalog" 
              onClick={handleScrollToTop} 
              className="cp-cta-button"
            >
              <span>Begin Your Journey</span>
              <span className="cp-cta-button-icon">🚀</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomizationProcess;