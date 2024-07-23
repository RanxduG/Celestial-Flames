import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './WelcomeBanner.css';
import { Link } from 'react-router-dom';

import image1 from '../Assets/Celestial Glow.jpg';
import image2 from '../Assets/Welcome-banner-image-2.png';
import image3 from '../Assets/Welcome-banner-image-3.png';

const WelcomeBanner = () => {
  const { userDetails } = useContext(ShopContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const slides = [image1, image2, image3];
  const textToType = userDetails ? `Hii there,\n${userDetails.name}!` : 'Weelcome to \nCelestial Flames';

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < textToType.length) {
        setTypedText((prev) => prev + textToType.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [textToType]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className='welcomebanner'>
      <div className='slideshow'>
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt={`Slide ${index + 1}`}
            className={index === currentSlide ? 'active' : ''}
          />
        ))}
        <div className='dots'>
          {slides.map((_, index) => (
            <span
              key={index}
              className={index === currentSlide ? 'dot active' : 'dot'}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
      <div className={`welcome-message ${isTyping ? 'typing' : ''}`}>
        <h1>{typedText}</h1>
        {!userDetails && !isTyping && (
          <div>
            <p>Please login to continue. <button><Link to='/loginsignup/login'>Login</Link></button></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WelcomeBanner;
