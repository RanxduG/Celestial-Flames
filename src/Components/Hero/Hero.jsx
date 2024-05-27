import React from 'react';
import './Hero.css';
import arrow_icon from '../Assets/Arrow.png';
import hand_icon from '../Assets/hand-icon.jpeg';
import hero_img from '../Assets/Cement Chic.jpg';

const Hero = () => {

  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>New Arrivals Only</h2>
            <div>
                <div className="hero-hand-icon">
                    <p>New</p>
                    <img src={hand_icon} alt=""/>
                </div>
            </div>
            <p>Collection <br /> For Everyone</p>
            <div className="hero-latest-btn">
            <div>Latest Collecttion</div>
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