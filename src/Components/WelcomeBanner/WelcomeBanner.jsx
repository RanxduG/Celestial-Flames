import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './WelcomeBanner.css';
import { Link } from 'react-router-dom';

import image1 from '../Assets/Banners/All gel wax candles.jpg';
import image2 from '../Assets/Banners/Her fav.jpg';
import image3 from '../Assets/Banners/Candle pouring.jpg';
import image4 from '../Assets/Banners/Bubble candles.jpg';
import image5 from '../Assets/Banners/Candle Ingredients.jpg';
import image6 from '../Assets/Banners/Candles burning.jpg';
// import image7 from '../Assets/Banners/Cement CHic.jpg';

const WelcomeBanner = () => {
  const { userDetails } = useContext(ShopContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const slides = [image1, image2, image3, image4, image5, image6];
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
      </div>
    </div>
  );
}

export default WelcomeBanner;
