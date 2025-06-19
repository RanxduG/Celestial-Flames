import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle,
  Heart,
  Sparkles,
  Instagram,
  Facebook,
  CheckCircle,
  Flame,
  Star,
  Users,
  AlertCircle
} from 'lucide-react';
import './CSS/Contact.css';

const Contact = () => {
  const [isVisible, setIsVisible] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState('');
  
  const sectionRefs = useRef({});

  // EmailJS Configuration - Replace these with your actual values
  const EMAILJS_SERVICE_ID = 'service_wh7h5tf'; // Replace with your service ID
  const EMAILJS_TEMPLATE_ID = 'template_ox2vgbu'; // Replace with your template ID
  const EMAILJS_PUBLIC_KEY = 'qFFxGxJyZjEe6y0c0'; // Replace with your public key

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    // Prepare template parameters for EmailJS
    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      phone: formData.phone || 'Not provided',
      subject: formData.subject,
      message: formData.message,
      inquiry_type: inquiryTypes.find(type => type.value === formData.inquiryType)?.label || formData.inquiryType,
      to_email: 'ranidu.h.gurusinghe@gmail.com,celinefdo77@gmail.com'
    };

    try {
      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log('Email sent successfully:', response);
      
      // Success handling
      setSubmitStatus('success');
      setSubmitMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
        setSubmitMessage('');
      }, 5000);

    } catch (error) {
      console.error('Email sending failed:', error);
      
      // Error handling
      setSubmitStatus('error');
      setSubmitMessage('Sorry, there was an error sending your message. Please try again or contact us directly.');
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
        setSubmitMessage('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call or WhatsApp",
      info: "+94 77 008 1559",
      link: "https://wa.me/94770081559",
      description: "Available 9 AM - 8 PM (GMT+5:30)",
      color: "#25D366"
    },
    {
      icon: Mail,
      title: "Email Us",
      info: "celestialflames.candles@gmail.com",
      link: "mailto:celestialflames.candles@gmail.com",
      description: "We'll respond within 24 hours",
      color: "#e98074"
    },
    {
      icon: MapPin,
      title: "Location",
      info: "Colombo, Sri Lanka",
      link: "#",
      description: "Island-wide delivery available",
      color: "#ff6b35"
    },
    {
      icon: Clock,
      title: "Business Hours",
      info: "Mon - Sat: 9 AM - 8 PM",
      link: "#",
      description: "Sunday: By appointment",
      color: "#d4af37"
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', icon: '💬' },
    { value: 'custom', label: 'Custom Orders', icon: '🎨' },
    { value: 'wholesale', label: 'Wholesale/Bulk', icon: '📦' },
    { value: 'collaboration', label: 'Collaboration', icon: '🤝' },
    { value: 'support', label: 'Product Support', icon: '🛠️' }
  ];

  const businessHighlights = [
    {
      icon: Flame,
      title: "100% Natural",
      description: "Pure soy & gel wax only"
    },
    {
      icon: Heart,
      title: "Eco-Friendly",
      description: "No harmful chemicals"
    },
    {
      icon: Star,
      title: "Handcrafted",
      description: "Made with love in Sri Lanka"
    },
    {
      icon: Users,
      title: "Custom Orders",
      description: "Personalized creations"
    }
  ];

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <div className="contact-hero-text-section">
            <div className="contact-hero-icon-wrapper">
              <MessageCircle className="contact-hero-message-icon" />
              <Sparkles className="contact-hero-sparkle-icon" />
            </div>
            <h1 className="contact-hero-title">
              Let's Create Something Beautiful Together
            </h1>
            <p className="contact-hero-subtitle">
              Ready to illuminate your space with our handcrafted candles? We'd love to hear from you.
            </p>
            <div className="contact-hero-highlights">
              {businessHighlights.map((highlight, index) => (
                <div key={index} className="contact-highlight-item">
                  <highlight.icon className="contact-highlight-icon" />
                  <div>
                    <span className="contact-highlight-title">{highlight.title}</span>
                    <span className="contact-highlight-desc">{highlight.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="contact-hero-visual-section">
            <div className="contact-floating-candles">
              <div className="contact-candle contact-candle-1">
                <div className="contact-candle-body"></div>
                <div className="contact-candle-flame"></div>
                <div className="contact-flame-glow"></div>
              </div>
              <div className="contact-candle contact-candle-2">
                <div className="contact-candle-body"></div>
                <div className="contact-candle-flame"></div>
                <div className="contact-flame-glow"></div>
              </div>
              <div className="contact-candle contact-candle-3">
                <div className="contact-candle-body"></div>
                <div className="contact-candle-flame"></div>
                <div className="contact-flame-glow"></div>
              </div>
            </div>
            <div className="contact-icons-orbit">
              <div className="contact-orbit-icon contact-orbit-1"><Phone size={18} /></div>
              <div className="contact-orbit-icon contact-orbit-2"><Mail size={18} /></div>
              <div className="contact-orbit-icon contact-orbit-3"><MapPin size={18} /></div>
              <div className="contact-orbit-icon contact-orbit-4"><MessageCircle size={18} /></div>
            </div>
          </div>
        </div>
        <div className="contact-hero-particles">
          <div className="contact-particle contact-particle-1">✨</div>
          <div className="contact-particle contact-particle-2">🕯️</div>
          <div className="contact-particle contact-particle-3">💫</div>
          <div className="contact-particle contact-particle-4">✨</div>
          <div className="contact-particle contact-particle-5">🌟</div>
          <div className="contact-particle contact-particle-6">🕯️</div>
        </div>
      </section>

      {/* Contact Information */}
      <section 
        ref={setSectionRef('info')}
        className={`contact-info-section ${isVisible.info ? 'contact-visible' : ''}`}
      >
        <div className="contact-section-content">
          <div className="contact-section-header">
            <Phone className="contact-section-icon" />
            <h2 className="contact-section-title">Get In Touch</h2>
            <p className="contact-section-subtitle">Multiple ways to reach us - choose what works best for you</p>
          </div>
          
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <div 
                key={index} 
                className="contact-info-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="contact-info-icon-wrapper" style={{ backgroundColor: info.color }}>
                  <info.icon size={28} />
                </div>
                <h3 className="contact-info-title">{info.title}</h3>
                <div className="contact-info-details">
                  {info.link.startsWith('http') || info.link.startsWith('mailto') ? (
                    <a href={info.link} className="contact-info-link" target="_blank" rel="noopener noreferrer">
                      {info.info}
                    </a>
                  ) : (
                    <span className="contact-info-text">{info.info}</span>
                  )}
                </div>
                <p className="contact-info-description">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section 
        ref={setSectionRef('form')}
        className={`contact-form-section ${isVisible.form ? 'contact-visible' : ''}`}
      >
        <div className="contact-section-content">
          <div className="contact-form-container">
            <div className="contact-form-header">
              <Send className="contact-form-icon" />
              <h2 className="contact-form-title">Send Us a Message</h2>
              <p className="contact-form-subtitle">
                Tell us about your candle needs, custom orders, or any questions you have
              </p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label htmlFor="name" className="contact-form-label">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="contact-form-input"
                    placeholder="Your full name"
                  />
                </div>
                <div className="contact-form-group">
                  <label htmlFor="email" className="contact-form-label">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="contact-form-input"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label htmlFor="phone" className="contact-form-label">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="contact-form-input"
                    placeholder="+94 77 123 4567"
                  />
                </div>
                <div className="contact-form-group">
                  <label htmlFor="inquiryType" className="contact-form-label">Inquiry Type *</label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    required
                    className="contact-form-select"
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="contact-form-group">
                <label htmlFor="subject" className="contact-form-label">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="contact-form-input"
                  placeholder="Brief description of your inquiry"
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="message" className="contact-form-label">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="contact-form-textarea"
                  rows="6"
                  placeholder="Tell us more about what you're looking for..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`contact-form-submit ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="contact-spinner"></div>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="contact-success-message">
                  <CheckCircle size={20} />
                  <span>{submitMessage}</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="contact-error-message">
                  <AlertCircle size={20} />
                  <span>{submitMessage}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Social & Additional Info */}
      <section 
        ref={setSectionRef('social')}
        className={`contact-social-section ${isVisible.social ? 'contact-visible' : ''}`}
      >
        <div className="contact-section-content">
          <div className="contact-social-container">
            <div className="contact-social-header">
              <Heart className="contact-social-icon" />
              <h3 className="contact-social-title">Follow Our Journey</h3>
              <p className="contact-social-subtitle">
                Stay updated with our latest creations and behind-the-scenes moments
              </p>
            </div>
            
            <div className="contact-social-links">
              <a href="#" className="contact-social-link instagram">
                <Instagram size={24} />
                <span>@celestialflames.lk</span>
              </a>
              <a href="#" className="contact-social-link facebook">
                <Facebook size={24} />
                <span>Celestial Flames</span>
              </a>
            </div>

            <div className="contact-additional-info">
              <div className="contact-info-item">
                <h4>Custom Orders</h4>
                <p>We specialize in personalized candles for weddings, events, and special occasions. Lead time: 5-7 days.</p>
              </div>
              <div className="contact-info-item">
                <h4>Wholesale Inquiries</h4>
                <p>Interested in carrying our products? Contact us for wholesale pricing and minimum order quantities.</p>
              </div>
              <div className="contact-info-item">
                <h4>Delivery Information</h4>
                <p>Island-wide delivery available. Colombo area: 1-2 days. Other provinces: 3-5 days.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;