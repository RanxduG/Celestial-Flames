import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import ProductTabs from '../Components/ProductTabs/ProductTabs';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import { Link } from 'react-router-dom';

const Product = () => {
  const [searchParams] = useSearchParams();
  const { allProducts } = useContext(ShopContext);
  const { productId } = useParams();
  const [productIdFromSearch] = [searchParams.get('productId')];
  const [isLoading, setIsLoading] = useState(true);
  

  const product = allProducts.find((product) => product.id === productId);
  console.log('Product:', product);

    // Get related products (same collection or type)
    const getRelatedProducts = () => {
      if (!product) return [];
      
      return allProducts
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
    }, [productId]);
  
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
        <Link to='/'><span>Home</span></Link> / <Link to='/catalog'><span>catalog</span></Link> / <span className="current">{product.name}</span>
      </div>
      <ProductDisplay
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
}

export default Product;
