import React, { useContext, useEffect, useState } from 'react';

import { ShopContext } from '../Context/ShopContext';
import { useParams, useSearchParams } from 'react-router-dom';
import './CSS/ReadyMadeItems.css';
import ReadyMadeItemDisplay from '../Components/ReadyMadeItemDisplay/ReadyMadeItemDisplay';
import ProductTabs from '../Components/ProductTabs/ProductTabs';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const ReadyMadeItems = () => {
  const [searchParams] = useSearchParams();
  const { allStocks } = useContext(ShopContext);
  const [productIdFromSearch] = [searchParams.get('productId')];
  const [itemId] = [searchParams.get('itemId')];
  const [isLoading, setIsLoading] = useState(true);

  // Find the selected product
  const product = allStocks.find((product) => product.id === productIdFromSearch && product.item_id === parseInt(itemId));
  
  // Get related products (same collection or type)
  const getRelatedProducts = () => {
    if (!product) return [];
    
    return allStocks
      .filter(item => 
        (item.collection === product.collection || item.waxtype === product.waxtype) && 
        item.id !== product.id
      )
      .slice(0, 4);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [productIdFromSearch]);

  if (isLoading) {
    return (
      <div className="product-loading">
        <div className="candle-loader">
          <div className="flame"></div>
          <div className="wax"></div>
        </div>
        <p>Preparing your candle...</p>
      </div>
    );
  }

  if (!product) {
    return <div className="product-not-found">Product not found</div>;
  }

  return (
    <div className="product-page-container">
      <div className="product-breadcrumb">
        <span>Home</span> / <span>Shop</span> / <span className="current">{product.name}</span>
      </div>
      
      <ReadyMadeItemDisplay 
        product={product} 
      />
      
      <ProductTabs 
        product={product} 
      />
      
      <RelatedProducts 
        products={getRelatedProducts()}
      />
    </div>
  );
};

export default ReadyMadeItems;