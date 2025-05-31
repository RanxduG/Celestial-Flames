import React, { useContext, useEffect, useRef, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { Link } from 'react-router-dom'
import './ProductShowcase.css';
import { all } from 'axios';
import Item from '../Item/Item'; // Import the new Item component

const ProductShowcase = ({ productGalleryRef }) => {
  const { allStocks, allProducts, addToCart } = useContext(ShopContext);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  

  useEffect(() => {
    if (!allStocks || !allProducts || allStocks.length === 0) {
      return;
    }
    
    // Filter popular products from backend data
    const popularItems = allStocks.filter(item => item.popular);
    setProducts(popularItems);
    setLoading(false);
  }, [allStocks, allProducts]);

    // Helper functions to get product details
  const getProductNameByStockId = (stockId) => {
    const stock = allStocks.find((s) => s.item_id === parseInt(stockId));
    if (!stock) return null;
    const product = allProducts.find((p) => p.id === stock.id); // or stock.product_id, if that's the field
    return product ? product.name : null;
  };


  const getProductCategoryByStockId = (stockId) => {
    const correspondingProduct = allStocks.find((product) => product.id === stockId);
    return correspondingProduct ? correspondingProduct.category : null;
  };

  const getWaxTypeByStockId = (stockId) => {
    const correspondingProduct = allStocks.find((product) => product.id === stockId);
    return correspondingProduct ? correspondingProduct.waxtype : null;
  };

  // Calculate categories dynamically from backend data
  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { 
      id: 'Soy Wax', 
      name: 'Soy Wax', 
      count: products.filter(p => {
        const waxType = getWaxTypeByStockId(p.id);
        return waxType && waxType.includes('Soy Wax');
      }).length 
    },
    { 
      id: 'Gel Wax', 
      name: 'Gel Wax', 
      count: products.filter(p => {
        const waxType = getWaxTypeByStockId(p.id);
        return waxType && waxType.includes('Gel Wax');
      }).length 
    }
  ];

  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(product => {
        const waxType = getWaxTypeByStockId(product.id);
        return waxType && waxType.includes(activeFilter);
      });

  const displayedProducts = filteredProducts.slice(0, visibleProducts);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    setVisibleProducts(6); // Reset visible products when filter changes
  };

  const loadMoreProducts = () => {
    setVisibleProducts(prev => prev + 6);
  };

  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  const renderStars = (rating = 4.5) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="product-rating">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="star filled">★</span>
        ))}
        {hasHalfStar && <span className="star half">★</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i} className="star empty">★</span>
        ))}
        <span className="rating-text">({rating})</span>
      </div>
    );
  };
  
  const handleAddToCart = (product) => {
    addToCart(
      product.id, 
      getProductNameByStockId(product.item_id), 
      product.waxtype, 
      product.getFragranceType, 
      product.color, 
      product.scent, 
      product.new_price, 
      product.old_price,
      1
    );
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };

  // Skeleton loader for products when loading
  const renderSkeletons = () => {
    return Array(6).fill(null).map((_, index) => (
      <div key={index} className="product-card skeleton">
        <div className="product-image-container skeleton-box"></div>
        <div className="product-info">
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-price"></div>
          <div className="skeleton-button"></div>
        </div>
      </div>
    ));
  };

  const getBadgeType = (product) => {
    if (product.stock < 5 && product.stock > 0) return 'Limited Stock';
    if (product.old_price > product.new_price) return 'Sale';
    return 'Featured';
  };
  
  const handleScrollToProductGallery = (e) => {
    e.preventDefault();
    console.log('Scrolling to product gallery');
    if (productGalleryRef && productGalleryRef.current) {
      productGalleryRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  return (
    <section className="product-showcase" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className={`section-header ${isVisible ? 'animate-in' : ''}`}>
          <h2>Our Featured Collections</h2>
          <p>Discover our handcrafted candles made with love and natural ingredients</p>
          <div className="header-divider">
            <div className="candle-icon">🕯️</div>
          </div>
        </div>

        {/* Filter Tabs */}
        {!loading && (
          <div className={`filter-tabs ${isVisible ? 'animate-in' : ''}`}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`filter-tab-ps ${activeFilter === category.id ? 'active' : ''}`}
                onClick={() => handleFilterChange(category.id)}
              >
                <span className="tab-name">{category.name}</span>
                <span className="tab-count">{category.count}</span>
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        <div className="products-grid">
          {loading ? (
            renderSkeletons()
          ) : displayedProducts.length > 0 ? (
            displayedProducts.map((product, index) => (
              <Item
                key={product.id}
                product={product}
                index={index}
                isVisible={isVisible}
                getProductNameByStockId={getProductNameByStockId}
                getWaxTypeByStockId={getWaxTypeByStockId}
                getProductCategoryByStockId={getProductCategoryByStockId}
                handleAddToCart={handleAddToCart}
                formatPrice={formatPrice}
                renderStars={renderStars}
                getBadgeType={getBadgeType}
              />
            ))
          ) : (
            <div className="no-products">
              <p>No featured products in this category yet.</p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {!loading && visibleProducts < filteredProducts.length && (
          <div className={`load-more-section ${isVisible ? 'animate-in' : ''}`}>
            <button className="load-more-btn" onClick={loadMoreProducts}>
              <span>Load More Products</span>
              <div className="btn-ripple"></div>
            </button>
          </div>
        )}

        {/* CTA Section */}
        {!loading && (
          <div className={`showcase-cta ${isVisible ? 'animate-in' : ''}`}>
            <div className="cta-content">
              <h3>Can't Find What You're Looking For?</h3>
              <p>Explore our complete collection or create a custom candle just for you</p>
              <div className="cta-buttons">
                <button className="btn-browse-ps" onClick={handleScrollToProductGallery}>Browse All Products</button>
                <button className="btn-custom-ps">Create Custom Candle</button>
              </div>
            </div>
          </div>
        )}
      </div>
      {alertVisible && (
        <div className="product-alert">
          <div className="alert-content">
            <span className="alert-icon">✓</span>
            <span className="alert-message">Added to cart successfully!</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductShowcase;