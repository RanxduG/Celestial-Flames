import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './WelcomeBanner.css';

import image1 from '../Assets/Banners/All gel wax candles.jpg';
import image2 from '../Assets/Banners/Her fav.jpg';
import image3 from '../Assets/Banners/Candle pouring.jpg';
import image4 from '../Assets/Banners/Bubble candles.jpg';
import image5 from '../Assets/Banners/Candle Ingredients.jpg';
import image6 from '../Assets/Banners/Candles burning.jpg';

const WelcomeBanner = () => {
  const { userDetails, homeBanners } = useContext(ShopContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [typedText1, setTypedText1] = useState('');
  const [typedText2, setTypedText2] = useState('');
  const [isTypingLine1, setIsTypingLine1] = useState(true);
  const [isTypingLine2, setIsTypingLine2] = useState(false);

  const slides = [image1, image2, image3, image4, image5, image6];
  const line1 = `Weelcome to`;
  const line2 = `Ceelestial Flames`;

  // Slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Typing effect for line 1
  useEffect(() => {
    let index = 0;
    setTypedText1(''); // Clear previous text
    const typingInterval = setInterval(() => {
      if (index < line1.length) {
        setTypedText1((prev) => prev + line1.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTypingLine1(false);
        setIsTypingLine2(true); // Start typing line 2 after line 1 finishes
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [line1]);

  // Typing effect for line 2
  useEffect(() => {
    if (!isTypingLine2) return;

    let index = 0;
    setTypedText2(''); // Clear previous text
    const typingInterval = setInterval(() => {
      if (index < line2.length) {
        setTypedText2((prev) => prev + line2.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTypingLine2(false); // Typing complete
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [isTypingLine2, line2]);

  // Handle dot click for slideshow
  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className='welcomebanner'>
      <div className='slideshow'>
        {homeBanners.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt={`Slide ${index + 1}`}
            className={index === currentSlide ? 'active' : ''}
          />
        ))}
        <div className='dots'>
          {homeBanners.map((_, index) => (
            <span
              key={index}
              className={index === currentSlide ? 'dot active' : 'dot'}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
      <div className='welcome-message'>
        <h1>{typedText1}</h1>
        <h1>{typedText2}</h1>
      </div>
    </div>
  );
};

export default WelcomeBanner;
