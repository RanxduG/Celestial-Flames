import React, { useContext, useEffect, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';
import soy_wax_banner from '../Components/Assets/Banners/soy_wax_banner.png';
import gel_wax_banner from '../Components/Assets/Banners/gel_wax_banner.png';

const ShopCategory = (props) => {
  const { allStocks, allProducts, getBadgeType } = useContext(ShopContext);
  const [displayedProducts, setDisplayedProducts] = useState(12);
  const [sortOption, setSortOption] = useState('default');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Get product details by stock ID
  const getProductCategoryByStockId = (stockId) => {
    const correspondingProduct = allProducts.find((product) => product.id === stockId);
    return correspondingProduct ? correspondingProduct.category : null;
  };

  const getProductNameByStockId = (stockId) => {
    const correspondingProduct = allProducts.find((product) => product.id === stockId);
    return correspondingProduct ? correspondingProduct.name : null;
  };

  // Fallback getBadgeType function if not provided by context
  const getBadgeTypeLocal = (item) => {
    if (!getBadgeType) {
      // Default badge logic
      if (item.stock <= 5) return 'low-stock';
      if (item.old_price > item.new_price) return 'sale';
      if (item.waxtype === 'Seasonal') return 'seasonal';
      return null;
    }
    return getBadgeType(item);
  };

  // Get default banner image based on collection type
  const getDefaultBanner = () => {
    const bannerImages = {
      'Soy': soy_wax_banner,
      'Gel': gel_wax_banner,
      'Fusion': 'https://cdn.pixabay.com/photo/2017/01/14/10/56/candles-1979733_1280.jpg',
      'Budget': 'https://cdn.pixabay.com/photo/2016/12/19/08/39/candles-1917264_1280.jpg',
      'Seasonal': 'https://cdn.pixabay.com/photo/2017/11/07/00/07/fantasy-2925250_1280.jpg',
      'Giftset': 'https://cdn.pixabay.com/photo/2016/11/29/04/19/candles-1867331_1280.jpg'
    };
    return bannerImages[props.collection] || bannerImages['Soy'];
  };

  // Filter products by wax type (collection ID)
  const filteredProducts = allStocks.filter((item) => item.waxtype === props.collection);

  // Sort products based on selected option
  const sortProducts = (products, sortBy) => {
    const sorted = [...products];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.new_price - b.new_price);
      case 'price-high':
        return sorted.sort((a, b) => b.new_price - a.new_price);
      case 'name':
        return sorted.sort((a, b) => {
          const nameA = getProductNameByStockId(a.id) || '';
          const nameB = getProductNameByStockId(b.id) || '';
          return nameA.localeCompare(nameB);
        });
      case 'newest':
        return sorted.reverse();
      default:
        return sorted;
    }
  };

  const sortedProducts = sortProducts(filteredProducts, sortOption);

  const handleLoadMore = () => {
    setDisplayedProducts(prev => Math.min(prev + 8, filteredProducts.length));
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setIsDropdownOpen(false);
  };

  // Get collection name mapping
  const getCollectionName = () => {
    const collectionNames = {
      'Soy': 'Luxury Soy Collection',
      'Gel': 'Gel Luxe Collection',
      'Fusion': 'Fusion Wax Collection',
      'Budget': 'Budget-Friendly Deals',
      'Seasonal': 'Seasonal Candle Delights',
      'Giftset': 'Gift-Ready Collections'
    };
    return collectionNames[props.collection] || props.collection;
  };



  return (
    <div className='sc-shop-category'>
      {/* Hero Section */}
      <div className="sc-category-hero">
        <div className="sc-hero-background">
          <img src={getDefaultBanner()} alt={getCollectionName()} className="sc-hero-image" />
          <div className="sc-hero-overlay"></div>
        </div>
        <div className="sc-hero-content">
          <div className="sc-breadcrumb">
            <span>Home</span>
            <span className="sc-separator">›</span>
            <span>Collections</span>
            <span className="sc-separator">›</span>
            <span className="sc-current">{getCollectionName()}</span>
          </div>
          <h1>{getCollectionName()}</h1>
          <p>Discover our carefully curated selection of premium handcrafted candles</p>
          <div className="sc-hero-stats">
            <div className="sc-stat">
              <span className="sc-stat-number">{filteredProducts.length}</span>
              <span className="sc-stat-label">Products</span>
            </div>
            <div className="sc-stat">
              <span className="sc-stat-number">100%</span>
              <span className="sc-stat-label">Handcrafted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      {filteredProducts.length > 0 && (
        <div className="sc-category-controls">
          <div className="sc-controls-left">
            <h2>Browse Products</h2>
            <p>
              Showing <span className="sc-highlight">{Math.min(displayedProducts, filteredProducts.length)}</span> of{' '}
              <span className="sc-highlight">{filteredProducts.length}</span> products
            </p>
          </div>
          <div className="sc-controls-right">
            <div className="sc-sort-dropdown">
              <button 
                className="sc-sort-trigger"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>Sort by</span>
                <svg 
                  className={`sc-dropdown-arrow ${isDropdownOpen ? 'sc-open' : ''}`}
                  width="12" 
                  height="12" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="sc-sort-options">
                  <button 
                    className={sortOption === 'default' ? 'sc-active' : ''}
                    onClick={() => handleSortChange('default')}
                  >
                    Default
                  </button>
                  <button 
                    className={sortOption === 'name' ? 'sc-active' : ''}
                    onClick={() => handleSortChange('name')}
                  >
                    Name A-Z
                  </button>
                  <button 
                    className={sortOption === 'price-low' ? 'sc-active' : ''}
                    onClick={() => handleSortChange('price-low')}
                  >
                    Price: Low to High
                  </button>
                  <button 
                    className={sortOption === 'price-high' ? 'sc-active' : ''}
                    onClick={() => handleSortChange('price-high')}
                  >
                    Price: High to Low
                  </button>
                  <button 
                    className={sortOption === 'newest' ? 'sc-active' : ''}
                    onClick={() => handleSortChange('newest')}
                  >
                    Newest First
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="sc-products-section">
          <div className="sc-products-grid">
            {sortedProducts.slice(0, displayedProducts).map((item, i) => (
              <div key={item.id} className="sc-product-card-wrapper">
                <Item
                  product={item}  // Pass the entire item as product
                  index={i}
                  isVisible={true}  // You may want to implement visibility logic
                  getProductNameByStockId={getProductNameByStockId}
                  getWaxTypeByStockId={(stockId) => {
                    // Add this function if it doesn't exist
                    const correspondingProduct = allProducts.find((product) => product.id === stockId);
                    return correspondingProduct ? correspondingProduct.waxtype : item.waxtype;
                  }}
                  getProductCategoryByStockId={getProductCategoryByStockId}
                  handleAddToCart={(product) => {
                    // Add your cart logic here
                    console.log('Add to cart:', product);
                  }}
                  formatPrice={(price) => {
                    // Add your price formatting logic
                    return `${price.toFixed(2)}`;
                  }}
                  renderStars={(rating) => {
                    // Add your star rendering logic
                    return (
                      <div className="sc-rating">
                        {'★'.repeat(Math.floor(rating))}
                        {'☆'.repeat(5 - Math.floor(rating))}
                      </div>
                    );
                  }}
                  getBadgeType={() => getBadgeTypeLocal(item)}
                />
              </div>
            ))}
          </div>

          {/* Load More Section */}
          {displayedProducts < filteredProducts.length && (
            <div className="sc-load-more-section">
              <button className="sc-load-more-btn" onClick={handleLoadMore}>
                <span>Load More Products</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14"></path>
                  <path d="M19 12H5"></path>
                </svg>
              </button>
              <p className="sc-load-more-text">
                {filteredProducts.length - displayedProducts} more products available
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="sc-no-products-section">
          <div className="sc-no-products-content">
            <div className="sc-no-products-icon">🕯️</div>
            <h2>No Products Found</h2>
            <p>This collection is currently empty. Check back soon for new arrivals!</p>
            <p>In the meantime, explore our other collections or contact us for custom orders.</p>
          </div>
        </div>
      )}

      {/* Collection Info Footer */}
      <div className="sc-collection-footer">
        <div className="sc-footer-content">
          <h3>About This Collection</h3>
          <p>
            Each candle in our {getCollectionName().toLowerCase()} is carefully crafted with premium materials 
            and unique fragrances to create the perfect ambiance for your space.
          </p>
          <div className="sc-footer-features">
            <div className="sc-feature">
              <div className="sc-feature-icon">🕯️</div>
              <span>Premium Quality</span>
            </div>
            <div className="sc-feature">
              <div className="sc-feature-icon">🌿</div>
              <span>Natural Ingredients</span>
            </div>
            <div className="sc-feature">
              <div className="sc-feature-icon">⏱️</div>
              <span>Long Burning</span>
            </div>
            <div className="sc-feature">
              <div className="sc-feature-icon">🎁</div>
              <span>Gift Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCategory;