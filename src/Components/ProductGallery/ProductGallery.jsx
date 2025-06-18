import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './ProductGallery.css';
import { ShopContext } from '../../Context/ShopContext';
import Item from '../Item/Item'; // Import the Item component

const ProductGallery = () => {
  const { allStocks, allProducts, addToCart } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('type');
  const [activeFragrance, setActiveFragrance] = useState(null);
  const [activeMood, setActiveMood] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState('featured');
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Fragrance options
  const fragranceOptions = [
    // Spicy and Strong
    { id: 'cinnamon', name: 'Cinnamon' },
    { id: 'citronella', name: 'Citronella' },
    { id: 'lemongrass', name: 'Lemongrass' },
    
    // Sweet and Subtle
    { id: 'Vanilla', name: 'Vanilla' },
    { id: 'honeydew', name: 'Honeydew' },
    { id: 'cafe', name: 'Cafe' },
    
    // Mint and Citrus
    { id: 'peppermint', name: 'Peppermint' },
    { id: 'teaLime', name: 'Tea & Lime' },
    
    // Fruity and Fresh
    { id: 'raspberry', name: 'Raspberry', stock: 0 },
    { id: 'apple', name: 'Apple' },
    { id: 'greenTea', name: 'Green Tea' },
    { id: 'aqua', name: 'Aqua' },
    { id: 'teaLeaf', name: 'Tea Leaf' },
    
    // Flowerly and Earthy
    { id: 'jasmine', name: 'Jasmine' },
    { id: 'rose', name: 'Rose' },
    { id: 'alwaysRose', name: 'Always Rose' },
    { id: 'sweetFlower', name: 'Sweet Flower' },
    
    // Coffee and Beans
    { id: 'roastedCoffee', name: 'Roasted Coffee' },
    
    // Sweet and Floral
    { id: 'sweetheart', name: 'Sweetheart' },
    
    // Sweet and Spicy
    { id: 'appleSpice', name: 'Apple Spice' },
    { id: 'darkVanilla', name: 'Dark Vanilla' },
    // Earthy and Natural
    { id: 'strawberry', name: 'Strawberry' },
  ];

  // Mood options with associated fragrances
  const moodOptions = [
    { 
      id: 'relaxing', 
      name: 'Calm & Relaxing', 
      fragrances: ['jasmine', 'sweetFlower', 'forest', 'greenTea', 'teaLeaf'] 
    },
    { 
      id: 'energizing', 
      name: 'Energizing', 
      fragrances: ['lime', 'lemongrass', 'peppermint', 'citronella', 'aqua'] 
    },
    { 
      id: 'cozy', 
      name: 'Cozy & Warm', 
      fragrances: ['cinnamon', 'Vanilla', 'cafe', 'roastedCoffee', 'appleSpice', 'darkVanilla'] 
    },
    { 
      id: 'refreshing', 
      name: 'Refreshing', 
      fragrances: ['teaLime', 'aqua', 'honeydew', 'greenTea', 'raspberry'] 
    },
    { 
      id: 'romantic', 
      name: 'Romantic', 
      fragrances: ['rose', 'cherryBlossoms', 'alwaysRose', 'sweetheart', 'jasmine'] 
    },
    {
      id: 'fruitySensation',
      name: 'Fruity Sensation',
      fragrances: ['raspberry', 'apple', 'honeydew', 'appleSpice']
    },
    {
      id: 'coffeeLovers',
      name: 'Coffee Lovers',
      fragrances: ['roastedCoffee', 'cafe', 'darkVanilla']
    },
    {
      id: 'sweetIndulgence',
      name: 'Sweet Indulgence',
      fragrances: ['Vanilla', 'sweetFlower', 'sweetheart', 'darkVanilla']
    },
    {
      id: 'spicyDelight',
      name: 'Spicy Delight',
      fragrances: ['cinnamon', 'appleSpice', 'teaLime']
    }
  ];

  // Filter categories
  const filterCategories = [
    { id: 'type', name: 'Type' },
    { id: 'scent', name: 'Fragrances' },
    { id: 'mood', name: 'By Mood' },
    { id: 'special', name: 'Special' },
  ];

  // Type filters
  const typeFilters = [
    { id: 'all', name: 'All Products' },
    { id: 'Soy Wax', name: 'Soy Wax' },
    { id: 'Gel Wax', name: 'Soy & Gel Wax' },
    { id: 'seasonal', name: 'Seasonal' },
  ];

  // Special filters
  const specialFilters = [
    { id: 'bestsellers', name: 'Best Sellers' },
    { id: 'sale', name: 'On Sale' },
    { id: 'new', name: 'New Arrivals' },
  ];

  // Sort options
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' },
  ];

  // Helper functions for Item component
  const getProductNameByStockId = (itemId) => {
    const product = allProducts?.find(p => p.id === itemId);
    return product ? product.name : 'Candle';
  };

  const getWaxTypeByStockId = (stockId) => {
    const stock = allStocks?.find(s => s.id === stockId);
    const product = allProducts?.find(p => p.id === stock?.item_id);
    if (product && product.category && Array.isArray(product.category)) {
      return product.category.find(cat => cat.includes('Wax')) || product.category[0];
    }
    return 'Soy Wax';
  };

  const getProductCategoryByStockId = (stockId) => {
    const stock = allStocks?.find(s => s.id === stockId);
    const product = allProducts?.find(p => p.id === stock?.item_id);
    if (product && product.category) {
      return Array.isArray(product.category) ? product.category.join(', ') : product.category;
    }
    return 'Candle';
  };

  const handleAddToCart = (product) => {
    if (addToCart && product.stock > 0) {
      addToCart(product.id);
    }
  };

  const formatPrice = (price) => {
    return `Rs. ${price}`;
  };

  const renderStars = (rating) => {
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
          <span key={i + fullStars} className="star empty">★</span>
        ))}
        <span className="rating-text">({rating.toFixed(1)})</span>
      </div>
    );
  };

  const getBadgeType = (product) => {
    if (product.popular) return 'Best Seller';
    if (product.new_price < product.old_price) return 'Sale';
    // You can add logic for "New" badge based on creation date
    return '';
  };

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
        category: product ? product.category : [],
        // Add fragrance information if not already present
        fragrance: stock.scent || (product ? product.scent : ''),
      };
    });

    setProducts(galleryProducts);
    setFilteredProducts(galleryProducts);
    setIsLoading(false);
  }, [allStocks, allProducts]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category !== 'scent') setActiveFragrance(null);
    if (category !== 'mood') setActiveMood(null);
    
    // Reset to all products when changing categories
    if (category === 'type') {
      setActiveFilter('all');
      setFilteredProducts(products);
    } else if (category === 'special') {
      setActiveFilter('bestsellers');
      filterProducts('bestsellers');
    }
  };

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
    
    if (filterType === 'sale') {
      const onSale = products.filter(product => product.new_price < product.old_price);
      setFilteredProducts(onSale);
      return;
    }
    
    if (filterType === 'new') {
      // Assuming newer products have higher IDs or there's a date field
      const newProducts = [...products].sort((a, b) => b.id.localeCompare(a.id)).slice(0, 4);
      setFilteredProducts(newProducts);
      return;
    }
    
    const filtered = products.filter(product => {
      if (filterType === 'Soy Wax' && product.waxtype && product.waxtype.includes('Soy Wax')) {
        return true;
      }
      if (filterType === 'Gel Wax' && product.waxtype && product.waxtype.includes('Gel Wax')) {
        return true;
      }
      if (filterType === 'seasonal' && product.category && product.category.includes('Seasonal')) {
        return true;
      }
      return false;
    });
    
    setFilteredProducts(filtered);
  };

  // Filter by fragrance
  const filterByFragrance = (fragrance) => {
    setActiveFragrance(fragrance);
    setActiveMood(null);
    
    if (!fragrance) {
      setFilteredProducts(products);
      return;
    }
    
    const filtered = products.filter(product => {
      // Case-insensitive search for fragrance in name or scent
      const productScent = (product.scent || '').toLowerCase();
      const productName = (product.name || '').toLowerCase();
      const fragranceName = fragrance.toLowerCase();
      
      return productScent.includes(fragranceName) || productName.includes(fragranceName);
    });
    
    setFilteredProducts(filtered);
  };

  // Filter by mood
  const filterByMood = (mood) => {
    setActiveMood(mood);
    setActiveFragrance(null);
    
    if (!mood) {
      setFilteredProducts(products);
      return;
    }
    
    const selectedMood = moodOptions.find(m => m.id === mood);
    if (!selectedMood) return;
    
    const fragranceList = selectedMood.fragrances;
    
    const filtered = products.filter(product => {
      // Case-insensitive search for any matching fragrance
      const productScent = (product.scent || '').toLowerCase();
      const productName = (product.name || '').toLowerCase();
      
      return fragranceList.some(fragrance => 
        productScent.includes(fragrance.toLowerCase()) || 
        productName.includes(fragrance.toLowerCase())
      );
    });
    
    setFilteredProducts(filtered);
  };

  // Sort products
  const handleSortChange = (value) => {
    setSortOrder(value);
    setIsSortOpen(false);
    
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
      case 'popular':
        // Sort by popularity (boolean) first, then by number of sales if available
        sortedProducts.sort((a, b) => {
          if (a.popular === b.popular) {
            return (b.sales || 0) - (a.sales || 0);
          }
          return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
        });
        break;
      default:
        // featured - keep original order or sort by popularity
        sortedProducts.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }
    
    setFilteredProducts(sortedProducts);
  };

  // Toggle sort dropdown
  const toggleSortDropdown = () => {
    setIsSortOpen(!isSortOpen);
  };

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sortContainer = document.querySelector('.gallery-sort-container');
      if (sortContainer && !sortContainer.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      
      <div className="gallery-filter-container">
        <div className="filter-categories">
          {filterCategories.map(category => (
            <button
              key={category.id}
              className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {activeCategory === 'type' && (
          <div className="filter-options">
            {typeFilters.map(filter => (
              <button
                key={filter.id}
                className={`filter-button ${activeFilter === filter.id ? 'active' : ''}`}
                onClick={() => filterProducts(filter.id)}
              >
                {filter.name}
              </button>
            ))}
          </div>
        )}
        
        {activeCategory === 'scent' && (
          <div className="filter-options">
            <button
              className={`filter-button ${activeFragrance === null ? 'active' : ''}`}
              onClick={() => filterByFragrance(null)}
            >
              All Fragrances
            </button>
            {fragranceOptions.map(fragrance => (
              <button
                key={fragrance.id}
                className={`filter-button ${activeFragrance === fragrance.id ? 'active' : ''}`}
                onClick={() => filterByFragrance(fragrance.id)}
              >
                {fragrance.name}
              </button>
            ))}
          </div>
        )}
        
        {activeCategory === 'mood' && (
          <div className="filter-options">
            <button
              className={`filter-button ${activeMood === null ? 'active' : ''}`}
              onClick={() => filterByMood(null)}
            >
              All Moods
            </button>
            {moodOptions.map(mood => (
              <button
                key={mood.id}
                className={`filter-button ${activeMood === mood.id ? 'active' : ''}`}
                onClick={() => filterByMood(mood.id)}
              >
                {mood.name}
              </button>
            ))}
          </div>
        )}
        
        {activeCategory === 'special' && (
          <div className="filter-options">
            {specialFilters.map(filter => (
              <button
                key={filter.id}
                className={`filter-button ${activeFilter === filter.id ? 'active' : ''}`}
                onClick={() => filterProducts(filter.id)}
              >
                {filter.name}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="gallery-sort-container">
        <button 
          className="sort-button"
          onClick={toggleSortDropdown}
        >
          <span>Sort by: {sortOptions.find(option => option.value === sortOrder)?.label}</span>
          <svg 
            className={`sort-arrow ${isSortOpen ? 'open' : ''}`}
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        
        {isSortOpen && (
          <div className="sort-dropdown">
            {sortOptions.map(option => (
              <div 
                key={option.value} 
                className={`sort-option ${sortOrder === option.value ? 'active' : ''}`}
                onClick={() => handleSortChange(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="gallery-container">
        {isLoading ? (
          renderSkeletons()
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
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
            <p>No products found matching your selection.</p>
            <button 
              className="reset-filters-btn"
              onClick={() => {
                setActiveFilter('all');
                setActiveFragrance(null);
                setActiveMood(null);
                setFilteredProducts(products);
              }}
            >
              Reset Filters
            </button>
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