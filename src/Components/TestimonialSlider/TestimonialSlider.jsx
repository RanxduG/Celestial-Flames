import React, { useState, useEffect } from 'react';
import './TestimonialSlider.css';

const TestimonialSlider = () => {
  const testimonials = [
    {
      id: 1,
      name: "Shavintha",
      location: "WhatsApp",
      text: "It's so cute I love it 🥹 Smells really nice too, can't wait to light it soon. Looks a great colour too ty for making what I wanted",
      rating: 5,
      initials: "S"
    },
    {
      id: 2,
      name: "Sashenka",
      location: "WhatsApp",
      text: "It smells so goood. So pretty as well. Hey I recently came to US and my roommates said the candle smells so good. They are obsessed with that.",
      rating: 5,
      initials: "S"
    },
    {
      id: 3,
      name: "Gayan",
      location: "WhatsApp",
      text: "Hello, all good with the candles we got :D Still using them from time to time. The 1st candle we got it still there albeit in the last stages. Hoping to get more cinnamon stuff during the next popup.",
      rating: 5,
      initials: "G"
    },
    {
      id: 4,
      name: "Geethan",
      location: "Havelock City Mall",
      text: "I brought a candle from you at the Avurudu market in Havelock City Mall. I had got it as a gift for my sis and she loves it! Keep it up 🙌🏾",
      rating: 5,
      initials: "G"
    },
    {
      id: 5,
      name: "Navasha",
      location: "Instagram",
      text: "Smells so good... i love it❤",
      rating: 5,
      initials: "N"
    },
    {
      id: 6,
      name: "Lakmali",
      location: "Instagram",
      text: "It's actually very good. Good smell & last long.",
      rating: 5,
      initials: "L"
    },
    {
      id: 7,
      name: "Sandali",
      location: "Instagram",
      text: "I got the candleee. Thank you so much for the replacement and for being so cooperative! Its working great and smells divine🥹 Thank you once again, and will recommend to others as well!",
      rating: 5,
      initials: "S"
    },
    {
      id: 8,
      name: "Panchali",
      location: "Instagram",
      text: "I received the package thank you so much, it smells so good!! ❤",
      rating: 5,
      initials: "P"
    },
    {
      id: 9,
      name: "Thisara",
      location: "Instagram",
      text: "Onggg it's soooo cute. I love itttt. You have an eye for creativity 😍😍😍 I don't wanna light them even. So pretty",
      rating: 5,
      initials: "T"
    },
    {
      id: 10,
      name: "Dewmini",
      location: "Instagram",
      text: "I love them❤❤. Hi,I received the candles, thank u so much. It looks beautiful!!❤❤",
      rating: 5,
      initials: "D"
    },
    {
      id: 11,
      name: "Ranshan",
      location: "Instagram",
      text: "We love the candle and danii lights it when she wants the room smelling delightful ❤ thank you and we definitely are thankful",
      rating: 5,
      initials: "R"
    },
    {
      id: 12,
      name: "Savanya",
      location: "Instagram",
      text: "Aww! I'm glad to have come across your store! Happy customer here. Keep up the good work ❤😇",
      rating: 5,
      initials: "S"
    },
    {
      id: 13,
      name: "Zafra",
      location: "Instagram",
      text: "Of course ! The candle smells amazing and it burns nicely too ❤🫶🏾",
      rating: 5,
      initials: "Z"
    },
    {
      id: 14,
      name: "Nuwan",
      location: "Instagram",
      text: "It's really gud love it 😍",
      rating: 5,
      initials: "N"
    },
    {
      id: 15,
      name: "Chandeepa",
      location: "Instagram",
      text: "I absolutely love the design too. Thanks a lot again. Omgggggg I love it guys. Definitely buying againnn.",
      rating: 5,
      initials: "C"
    },
    {
      id: 16,
      name: "Tharika",
      location: "Instagram",
      text: "Love it. Green tea was a good idea..",
      rating: 5,
      initials: "T"
    },
    {
      id: 17,
      name: "Shenara",
      location: "Instagram",
      text: "I bought the vanilla one and have been using your candle since then. It smells amazing and really fills up the whole room. The smell stays in the room even until the next day which is so good for a candle that small. Thank you so much",
      rating: 5,
      initials: "S"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, visibleCards]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= testimonials.length - visibleCards 
        ? 0 
        : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 
        ? testimonials.length - visibleCards 
        : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`ts-star ${i < rating ? 'ts-filled' : ''}`}>
        ★
      </span>
    ));
  };

  const getVisibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < visibleCards; i++) {
      const index = (currentIndex + i) % testimonials.length;
      result.push(testimonials[index]);
    }
    return result;
  };

  return (
    <div className="ts-testimonial-section">
      <div className="ts-header">
        <div className="ts-subtitle">Customer Reviews</div>
        <h2 className="ts-title">What Our Candle Lovers Say</h2>
        <p className="ts-description">
          Discover why thousands of customers choose our handcrafted candles for their homes
        </p>
      </div>

      <div className="ts-slider-container">
        <button 
          className="ts-nav-button ts-nav-prev"
          onClick={prevSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          aria-label="Previous testimonials"
        >
          ‹
        </button>

        <div className="ts-slider-track">
          {getVisibleTestimonials().map((testimonial, index) => (
            <div key={`${testimonial.id}-${currentIndex}`} className="ts-testimonial-card">
              <div className="ts-quote-mark">"</div>
              
              <div className="ts-rating">
                {renderStars(testimonial.rating)}
              </div>

              <p className="ts-testimonial-text">
                {testimonial.text}
              </p>

              <div className="ts-author">
                <div className="ts-avatar">
                  {testimonial.initials}
                </div>
                <div className="ts-author-info">
                  <h4 className="ts-author-name">{testimonial.name}</h4>
                  <p className="ts-author-location">
                    <svg className="ts-location-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          className="ts-nav-button ts-nav-next"
          onClick={nextSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          aria-label="Next testimonials"
        >
          ›
        </button>
      </div>

      <div className="ts-indicators">
        {Array.from({ length: Math.ceil(testimonials.length / visibleCards) }, (_, index) => (
          <button
            key={index}
            className={`ts-indicator ${Math.floor(currentIndex / visibleCards) === index ? 'ts-active' : ''}`}
            onClick={() => goToSlide(index * visibleCards)}
            aria-label={`Go to testimonial group ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;