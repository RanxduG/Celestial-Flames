import React, { useEffect, useRef } from 'react';
import './CustomizationProcess.css';
import { Link } from 'react-router-dom';

const CustomizationProcess = () => {
  const stepRefs = useRef([]);

  const handleScroll = () => {
    stepRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight) {
          const translateValue = Math.max((windowHeight - rect.top) / 5, 0);
          ref.style.transform = `translateX(0)`;
          ref.style.opacity = 1;
        } else {
          const direction = ref.classList.contains('step-right') ? '30%' : '-30%';
          ref.style.transform = `translateX(${direction})`;
          ref.style.opacity = 0;
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='customization-process'>
      <div className='step-container step-right' ref={(el) => (stepRefs.current[0] = el)}>
        <div className='step'>
          <div className='step-circle'>1</div>
          <div className='step-content'>
            <h1>Step 1: Choose Your Candle</h1>
            <p>Choose the candle you want to customize. You can choose from our Classic Collection, Elemental Collection, or Crystal Collection.</p>
            <Link to='/Catalog' onClick={() => window.scrollTo(0, 0)} className='step-button'>
              Customize
            </Link>
          </div>
        </div>
      </div>

      <div className='step-container step-left' ref={(el) => (stepRefs.current[1] = el)}>
        <div className='step'>
          <div className='step-circle'>2</div>
          <div className='step-content'>
            <h1>Step 2: Choose Your Wax Type</h1>
            <p>Choose the wax type you want for your candle. We offer soy wax, beeswax, and paraffin wax.</p>
            <Link to='/Shop' onClick={() => window.scrollTo(0, 0)} className='step-button'>
              Customize
            </Link>
          </div>
        </div>
      </div>

      <div className='step-container step-right' ref={(el) => (stepRefs.current[2] = el)}>
        <div className='step'>
          <div className='step-circle'>3</div>
          <div className='step-content'>
            <h1>Step 3: Choose Your Fragrance</h1>
            <p>Choose the fragrance you want for your candle. We offer a variety of fragrances to choose from.</p>
            <Link to='/Shop' onClick={() => window.scrollTo(0, 0)} className='step-button'>
              Customize
            </Link>
          </div>
        </div>
      </div>

      <div className='step-container step-left' ref={(el) => (stepRefs.current[3] = el)}>
        <div className='step'>
          <div className='step-circle'>4</div>
          <div className='step-content'>
            <h1>Step 4: Choose Your Color</h1>
            <p>Choose the color you want for your candle. We offer a variety of colors to choose from.</p>
            <Link to='/Shop' onClick={() => window.scrollTo(0, 0)} className='step-button'>
              Customize
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationProcess;
