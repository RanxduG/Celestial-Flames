import React, { useState, useEffect } from 'react';
import './TestimonialSlider.css';
import instaLogo from '../Assets/SocialIcons/instagram.png'; // Replace with actual path
import facbookLogo from '../Assets/SocialIcons/facebook.png'; // Replace with actual path

const TestimonialSlider = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Miller",
      location: "Colombo",
      text: "These candles transformed my home atmosphere! The natural soy wax burns so cleanly, and the scents are divine without being overwhelming. Absolutely love the custom design I ordered for my daughter's wedding.",
      rating: 5,
      image:instaLogo
    },
    {
      id: 2,
      name: "Rajiv Perera",
      location: "Kandy",
      text: "I was skeptical about gel candles until I tried these. The clarity is amazing and the way they incorporate natural elements is artistic beyond words. My guests always ask where I found such unique pieces!",
      rating: 5,
      image: facbookLogo 
    },
    {
      id: 3,
      name: "Emma Thompson",
      location: "Colombo",
      text: "As someone sensitive to artificial fragrances, I appreciate how these candles use essential oils. The vanilla cinnamon blend has become my evening ritual. Excellent customer service when I needed a rush delivery too.",
      rating: 4,
      image: instaLogo
    },
    {
      id: 4,
      name: "Anura Jayawardena",
      location: "Negombo",
      text: "The custom candles created for our hotel lobby have received countless compliments. The craftsmanship is exceptional, and they burn evenly for hours. Worth every rupee!",
      rating: 5,
      image: instaLogo
    },
    {
      id: 5,
      name: "Priya Mendis",
      location: "Colombo",
      text: "I ordered a set as gifts for my wedding bridesmaids, and the presentation was stunning! Each candle was packaged beautifully with personalized notes. The scents are uniquely Sri Lankan and bring back childhood memories.",
      rating: 5,
      image: facbookLogo
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000); // Auto advance every 5 seconds
    }
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false); // Pause autoplay when manually navigating
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      nextSlide();
    } else if (touchStart - touchEnd < -50) {
      // Swipe right
      prevSlide();
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "star filled" : "star"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <section className="testimonial-section">
      <div className="section-header">
        <h2>What Our Customers Say</h2>
        <div className="candle-divider">
          <div className="candle">
            <div className="testo-flame"></div>
          </div>
        </div>
        <p>reviews from our candle community</p>
      </div>

      <div 
        className="testimonial-slider"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button className="slider-arrow prev" onClick={prevSlide}>&lsaquo;</button>
        
        <div className="slider-container">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className={`testimonial-card ${index === currentIndex ? 'active' : ''}`}
              style={{
                transform: `translateX(${(index - currentIndex) * 100}%)`,
                opacity: index === currentIndex ? 1 : 0
              }}
            >
              <div className="testimonial-content">
                <div className="quote-icon">&ldquo;</div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="rating">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
              <div className="testimonial-author">
                <div className="author-image">
                  <img src={testimonial.image} alt={`${testimonial.name}`} onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/testimonials/default-avatar.jpg";
                  }} />
                </div>
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="slider-arrow next" onClick={nextSlide}>&rsaquo;</button>
      </div>

      <div className="slider-indicators">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialSlider;