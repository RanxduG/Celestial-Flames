import React, { useContext, useState, useEffect } from 'react';
import './FeaturedProducts.css';
import { ShopContext } from '../..//Context/ShopContext';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const { allStocks, allProducts } = useContext(ShopContext);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Soy Wax', 'Gel Wax', 'Seasonal'];

  useEffect(() => {
    if (!allStocks || !allProducts || allStocks.length === 0) {
      return;
    }
    
    // Filter popular products
    const popularItems = allStocks.filter(item => item.popular);
    setVisibleProducts(popularItems);
    setLoading(false);
  }, [allStocks, allProducts]);

  const getProductNameByStockId = (stockId) => {
    const correspondingProduct = allProducts.find((product) => product.id === stockId);
    return correspondingProduct ? correspondingProduct.name : null;
  };

  const getProductCategoryByStockId = (stockId) => {
    const correspondingProduct = allProducts.find((product) => product.id === stockId);
    return correspondingProduct ? correspondingProduct.category : null;
  };

  const filterByCategory = (category) => {
    setActiveCategory(category);
    
    if (category === 'All') {
      const popularItems = allStocks.filter(item => item.popular);
      setVisibleProducts(popularItems);
      return;
    }
    
    const filteredProducts = allStocks.filter(item => {
      const productCategory = getProductCategoryByStockId(item.id);
      return item.popular && productCategory && productCategory.includes(category);
    });
    
    setVisibleProducts(filteredProducts);
  };

  // Skeleton loader for products when loading
  const renderSkeletons = () => {
    return Array(4).fill(null).map((_, index) => (
      <div key={index} className="featured-product skeleton">
        <div className="featured-product-image skeleton-box"></div>
        <div className="featured-product-details">
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-price"></div>
          <div className="skeleton-button"></div>
        </div>
      </div>
    ));
  };

  return (
    <section className="featured-products">
      <div className="featured-products-header">
        <div className="featured-products-title">
          <h2>Featured Creations</h2>
          <p>Discover our most loved candles, handcrafted with natural ingredients</p>
        </div>
        
        <div className="featured-products-categories">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-button ${activeCategory === category ? 'active' : ''}`}
              onClick={() => filterByCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="featured-products-container">
        {loading ? (
          renderSkeletons()
        ) : visibleProducts.length > 0 ? (
          visibleProducts.map((product) => (
            <div key={product.id} className="featured-product">
              <div className="featured-badge">Featured</div>
              <Link to={`/readymade/${product.id}`} className="featured-product-link">
                <div className="featured-product-image">
                  <img src={product.imageUrl} alt={product.scent} />
                  <div className="featured-product-overlay">
                    <button className="quick-view">Quick View</button>
                  </div>
                </div>
              </Link>
              <div className="featured-product-details">
                <div className="featured-product-category">
                  {getProductCategoryByStockId(product.id)}
                </div>
                <h3 className="featured-product-name">
                  {product.scent} {getProductNameByStockId(product.id)}
                </h3>
                <div className="featured-product-price">
                  {product.old_price > product.new_price && (
                    <span className="featured-old-price">Rs. {product.old_price}</span>
                  )}
                  <span className="featured-new-price">Rs. {product.new_price}</span>
                </div>
                <div className="product-stock-indicator">
                  {product.stock > 0 ? (
                    <span className={product.stock < 5 ? 'low-stock' : ''}>
                      {product.stock < 5 ? `Only ${product.stock} left` : 'In Stock'}
                    </span>
                  ) : (
                    <span className="out-of-stock">Out of Stock</span>
                  )}
                </div>
                <button 
                  className={`add-to-cart-btn ${product.stock === 0 ? 'disabled' : ''}`}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-products">
            <p>No featured products in this category yet.</p>
          </div>
        )}
      </div>
      
      <div className="featured-products-footer">
        <Link to="/catalog" className="view-all-button">
          View All Products
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;