import React, { useState, useEffect, useRef } from 'react';
import './CSS/ShopTest.css';
import ShopHero from '../Components/ShopHero/ShopHero';
import FeaturedProducts from '../Components/FeaturedProducts/FeaturedProducts';
import CollectionsShowcase from '../Components/CollectionsShowcase/CollectionsShowcase';
import ProductGallery from '../Components/ProductGallery/ProductGallery';
import ProductShowcase from '../Components/ProductShowcase/ProductShowcase';

const ShopTest = () => {
  const [isLoading, setIsLoading] = useState(true);
  const productGalleryRef = useRef(null);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
   
    return () => clearTimeout(timer);
  }, []);
  
  // Check if the URL has a hash and scroll to that section after loading
  useEffect(() => {
    if (!isLoading && window.location.hash === '#product-gallery') {
      productGalleryRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isLoading]);
  
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
      <ProductShowcase productGalleryRef={productGalleryRef}/>
      <CollectionsShowcase />
      <div ref={productGalleryRef} id="product-gallery">
        <ProductGallery />
      </div>
    </div>
  );
};

export default ShopTest;