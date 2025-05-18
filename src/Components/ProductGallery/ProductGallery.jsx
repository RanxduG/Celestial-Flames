import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './ProductGallery.css';
import { ShopContext } from '../../Context/ShopContext';

const ProductGallery = () => {
  const { allStocks, allProducts } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState('featured');

  // Filters
  const filters = [
    { id: 'all', name: 'All Products' },
    { id: 'soy-wax', name: 'Soy Wax' },
    { id: 'gel-wax', name: 'Gel Wax' },
    { id: 'seasonal', name: 'Seasonal' },
    { id: 'bestsellers', name: 'Best Sellers' }
  ];

  // Sort options
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  useEffect(() => {
    if (!allStocks || !allProducts || allStocks.length === 0) {
      return;
    }

    // Get the first 8 products for the gallery
    const galleryProducts = allStocks.slice(0, 8).map(stock => {
      const product = allProducts.find(p => p.id === stock.id);
      return {
        ...stock,
        name: product ? product.name : 'Unknown Product',
        category: product ? product.category : []
      };
    });

    setProducts(galleryProducts);
    setFilteredProducts(galleryProducts);
    setIsLoading(false);
  }, [allStocks, allProducts]);

  // Filter products based on selected category
  const filterProducts = (filterType) => {
    setActiveFilter(filterType);
    
    if (filterType === 'all') {
      setFilteredProducts(products);
      return;
    }
    
    if (filterType === 'bestsellers') {
      const bestsellers = products.filter(product => product.popular);
      setFilteredProducts(bestsellers);
      return;
    }
    
    const filtered = products.filter(product => {
      if (filterType === 'soy-wax' && product.category && product.category.includes('Soy Wax')) {
        return true;
      }
      if (filterType === 'gel-wax' && product.category && product.category.includes('Gel Wax')) {
        return true;
      }
      if (filterType === 'seasonal' && product.category && product.category.includes('Seasonal')) {
        return true;
      }
      return false;
    });
    
    setFilteredProducts(filtered);
  };

  // Sort products
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);
    
    const sortedProducts = [...filteredProducts];
    
    switch(value) {
      case 'price-low':
        sortedProducts.sort((a, b) => a.new_price - b.new_price);
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => b.new_price - a.new_price);
        break;
      case 'newest':
        // Assuming newer products have higher IDs or there's a date field
        sortedProducts.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        // featured - keep original order or sort by popularity
        sortedProducts.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }
    
    setFilteredProducts(sortedProducts);
  };

  // Scroll animation
  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector('.product-gallery');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Render skeleton loaders
  const renderSkeletons = () => {
    return Array(8).fill(null).map((_, index) => (
      <div key={index} className="gallery-product skeleton">
        <div className="gallery-product-image skeleton-box"></div>
        <div className="gallery-product-details">
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-price"></div>
        </div>
      </div>
    ));
  };

  return (
    <section className={`product-gallery ${isVisible ? 'visible' : ''}`}>
      <div className="gallery-header">
        <div className="gallery-title">
          <h2>Browse Our Products</h2>
          <p>Discover our handcrafted candles made with love and natural ingredients</p>
        </div>
      </div>
      
      <div className="gallery-controls">
        <div className="gallery-filters">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-button ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => filterProducts(filter.id)}
            >
              {filter.name}
            </button>
          ))}
        </div>
        
        <div className="gallery-sort">
          <select 
            className="sort-select" 
            value={sortOrder}
            onChange={handleSortChange}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="gallery-container">
        {isLoading ? (
          renderSkeletons()
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="gallery-product">
              {product.popular && <div className="bestseller-badge">Best Seller</div>}
              {product.new_price < product.old_price && (
                <div className="sale-badge">Sale</div>
              )}
              
              <Link to={`/product/${product.id}`} className="gallery-product-link">
                <div className="gallery-product-image">
                  <img src={product.imageUrl} alt={product.name} />
                  <div className="gallery-product-overlay">
                    <button className="quick-view-btn">Quick View</button>
                  </div>
                </div>
              </Link>
              
              <div className="gallery-product-details">
                <div className="gallery-product-category">
                  {product.category && Array.isArray(product.category) 
                    ? product.category.join(', ') 
                    : product.category}
                </div>
                <h3 className="gallery-product-name">
                  {product.scent} {product.name}
                </h3>
                <div className="gallery-product-price">
                  {product.old_price > product.new_price && (
                    <span className="old-price">Rs. {product.old_price}</span>
                  )}
                  <span className="new-price">Rs. {product.new_price}</span>
                </div>
                <div className="gallery-product-actions">
                  <button 
                    className={`add-to-cart-btn ${product.stock === 0 ? 'disabled' : ''}`}
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-products">
            <p>No products found in this category.</p>
          </div>
        )}
      </div>
      
      <div className="gallery-footer">
        <Link to="/catalog" className="view-catalog-btn">
          View Full Catalog
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default ProductGallery;