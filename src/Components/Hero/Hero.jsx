import React from 'react';
import './Hero.css';
import arrow_icon from '../Assets/Icons/Arrow.png';
import hero_img from '../Assets/Good/Cement Chic/Cement Chic.jpg';

const Hero = () => {


  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>New Arrivals Only</h2>
            <p>New</p><br/><p>Collection<br />For Everyone</p>
            <div className="hero-latest-btn">
                <div>Latest Collection</div>
                <img src={arrow_icon} alt="" />
            </div>

        </div>
        <div className="hero-right">
            <img src={hero_img} alt="" />
        </div>
        
    </div>
  );
}

export default Hero;