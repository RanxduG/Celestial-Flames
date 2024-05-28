import React from 'react';
import './Hero.css';
import arrow_icon from '../Assets/Arrow.png';
import hero_img from '../Assets/Cement Chic.jpg';
import { Link } from 'react-router-dom';

const Hero = () => {
    const handleClick = () => {
        window.scrollTo(0, 0);
      };

  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>New Arrivals Only</h2>
            <p>New</p><br/><p>Collection<br />For Everyone</p>
            <Link to={`/Elemental Collection`} onClick={handleClick} className="hero-latest-btn">
                <div className="hero-latest-btn">
                    <div>Latest Collection</div>
                    <img src={arrow_icon} alt="" />
                </div>
            </Link>
        </div>
        
        <div className="hero-right">
            <img src={hero_img} alt="" />
        </div>
        
    </div>
  );
}

export default Hero;