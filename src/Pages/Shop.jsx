import React, { useState, useEffect, useRef } from 'react';
import './CSS/Shop.css';
import ShopHero from '../Components/ShopHero/ShopHero';
import ProductGallery from '../Components/ProductGallery/ProductGallery';
import ProductShowcase from '../Components/ProductShowcase/ProductShowcase';
import CollectionsShowcase from '../Components/CollectionsShowcase/CollectionsShowcase';

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
        <div className="shop-candle-loader">
          <div className="shop-flame"></div>
          <div className="shop-wax"></div>
        </div>
        <p>Lighting your way...</p>
      </div>
    );
  }
  
  return (
    <div className="shop-container">
      <ShopHero />
      <div ref={productGalleryRef} id="product-gallery">
        <ProductGallery />
      </div>
      <ProductShowcase productGalleryRef={productGalleryRef}/>
      <CollectionsShowcase />
    </div>
  );
};

export default ShopTest;