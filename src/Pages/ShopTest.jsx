import React, { useState, useEffect } from 'react';
import './CSS/ShopTest.css';
import ShopHero from '../Components/ShopHero/ShopHero';
import FeaturedProducts from '../Components/FeaturedProducts/FeaturedProducts';
import CollectionsShowcase from '../Components/CollectionsShowcase/CollectionsShowcase';
import ProductGallery from '../Components/ProductGallery/ProductGallery';
// import TestimonialSlider from '../Components/ShopTest/TestimonialSlider/TestimonialSlider';
// import CreateCustomCandle from '../Components/ShopTest/CreateCustomCandle/CreateCustomCandle';

const ShopTest = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="shop-loading">
        <div className="candle-loader">
          <div className="flame"></div>
          <div className="wax"></div>
        </div>
        <p>Lighting your way...</p>
      </div>
    );
  }

  return (
    <div className="shop-container">
      <ShopHero />
      <FeaturedProducts />
      <CollectionsShowcase />
      <ProductGallery />

       {/*
      <TestimonialSlider />
      <CreateCustomCandle /> */}
    </div>
  );
};

export default ShopTest;