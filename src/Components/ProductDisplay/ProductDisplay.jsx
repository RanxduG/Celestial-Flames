import React, { useContext, useState, useEffect } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../../Context/ShopContext';
import { FiHeart, FiStar, FiShare2, FiShoppingBag } from 'react-icons/fi';

const ProductDisplay = ({ product }) => {
  const { addToCart, allProducts } = useContext(ShopContext);
  const [alertVisible, setAlertVisible] = useState(false);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [averageRating, setAverageRating] = useState(0); // Hardcoded to 3.9
  const [selectedScent, setSelectedScent] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedColorName, setSelectedColorName] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [colorOption, setColorOption] = useState('Colors'); // Default to Colors
  const [customColorName, setCustomColorName] = useState('');

  // List of scents
  const regularScents = [
    'Cinnamon', 'Citronella', 'Lemongrass', 'French Vanilla', 'Honeydew',
    'Cafe', 'Peppermint', 'Tea & Lime', 'Lime', 'Raspberry', 'Apple',
    'Green Tea', 'Aqua', 'Jasmine', 'Rose', 'Cherry Blossoms', 'Always Rose',
    'Sweet Flower', 'Roasted Coffee'
  ];

  const specialScents = [
    'Sweetheart', 'Apple Spice', 'Dark Vanilla', 'Tea Leaf'
  ];  

  // Combined scent list (without duplicates)
  const allScents = [...regularScents, ...specialScents.filter(scent => !regularScents.includes(scent))];

// Design options for Glass Collection with applicable product IDs
const allDesignOptions = [
  { name: 'Marble', description: 'Marbled design', productIds: ['CC2024003', 'CC2024004'] },
  { name: 'Coffee Latte', description: 'Looks like an iced coffee', productIds: ['CC2024001'] },
  { name: 'Beachy Vibes', description: 'Represents a beach', productIds: ['CC2024007'] },
  { name: 'Floral Mist', description: 'Gel wax with flowers under it', productIds: ['CC2024007'] },
  { name: 'Sparkle', description: 'Gold Flakes with a small layer of soy wax on top', productIds: ['CC2024001', 'CC2024003'] },
  { name: 'Jar Of Hearts', description: 'Hearts with gel wax filled', productIds: ['CC2024003', 'CC2024004'] },
  { name: 'Jade Palace', description: 'Jade stars with gel wax on top', productIds: ['CC2024001'] }
];

// Filter designs based on current product ID
const designOptions = allDesignOptions.filter(design => 
  design.productIds.includes(product.id)
);

  // Calculate filled stars for rating display
  const getFilledStars = () => {
    return Math.round(averageRating); // This will give us 4 stars for 3.9 rating
  };

  // Pastel colors
  const pastelColors = [
    { name: 'Light Pink', code: '#FFB3BA' },
    { name: 'Peach', code: '#FFDFBA' },
    { name: 'Light Yellow', code: '#FFFFBA' },
    { name: 'Light Green', code: '#BAFFC9' },
    { name: 'Mint', code: '#D0F4DE' },
    { name: 'Sky Blue', code: '#A9DEF9' },
    { name: 'Baby Blue', code: '#E0FFFF' }
  ];

  // Extract product details
  const getProductDetails = () => {
    const correspondingProduct = allProducts && allProducts.find((p) => p.id === product.id);
    return {
      name: correspondingProduct?.name || product.name,
      description: correspondingProduct?.description || product.description,
      category: product.collection || product.category || 'Standard Collection'
    };
  };

  const { name, description, category } = getProductDetails();

  // Check if product is from Glass Collection
  const isGlassCollection = category === 'Glass Collection';

  // Product images - always use the 3 standard images
  const productImages = [
    product.img1Url,
    product.img2Url,
    product.img3Url
  ].filter(Boolean); // Remove any undefined/null values

  useEffect(() => {
    // Set main image to first available image when product changes
    setMainImage(productImages[0] || product.img1Url);
  }, [product]);

  useEffect(() => {
    if (product.rating && product.rating.length > 0) {
      const totalRating = product.rating.reduce((acc, r) => acc + r, 0);
      const calculatedAverage = totalRating / product.rating.length;
      setAverageRating(calculatedAverage);
    } else {
      setAverageRating(0);
    }
  }, [product.rating]);

  const handleColorOptionChange = (option) => {
    setColorOption(option);
    // Reset selections when switching between options
    setSelectedColor(null);
    setSelectedColorName(null);
    setSelectedDesign(null);
    setCustomColorName('');
  };

const handleColorChange = (color) => {
  if (selectedColor === color.code) {
    // If clicking the same color, deselect it
    setSelectedColor(null);
    setSelectedColorName(null);
  } else {
    // Select the new color
    setSelectedColor(color.code);
    setSelectedColorName(color.name);
  }
  setSelectedDesign(null); // Reset design when color is selected
};

const handleDesignChange = (design) => {
  if (selectedDesign === design.name) {
    // If clicking the same design, deselect it
    setSelectedDesign(null);
  } else {
    // Select the new design
    setSelectedDesign(design.name);
  }
  setSelectedColor(null); // Reset color when design is selected
  setSelectedColorName(null);
};

  const handleCustomColorChange = (e) => {
    setCustomColorName(e.target.value);
    setSelectedColorName(e.target.value);
    // For custom colors, we don't have a color code, so we'll use a placeholder
    setSelectedColor('#FFFFFF');
    setSelectedDesign(null); // Reset design when custom is selected
  };

const handleScentChange = (scent) => {
  if (selectedScent === scent) {
    // If clicking the same scent, deselect it
    setSelectedScent(null);
  } else {
    // Select the new scent
    setSelectedScent(scent);
  }
};
  // Calculate the price based on requirements
  const calculatePrice = () => {
    // Base price is always soy wax price
    let basePrice = product.soy_price || product.new_price || product.price;
    
    // Add 100 Rs for custom design
    if (colorOption === 'Custom Design') {
      basePrice += 100;
    }
    
    return basePrice;
  };

  const handleAddToCart = () => {
    // Default wax type is 'Soy Wax' as per requirements
    const waxType = 'Soy Wax';
    
    // Use either selected color name, design name, or custom color name
    let finalColorName = '';
    if (colorOption === 'Colors') {
      finalColorName = selectedColorName;
    } else if (colorOption === 'Designs') {
      finalColorName = selectedDesign;
    } else if (colorOption === 'Custom Design') {
      finalColorName = customColorName;
    }
    
    addToCart(
      product.id,
      name,
      waxType,
      'Essential Oils', // Default fragrance type
      finalColorName,
      selectedScent,
      calculatePrice(),
      product.old_price,
      quantity
    );
    
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };

  const incrementQuantity = () => {
    if (quantity < (product.stock || 10)) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Calculate discount percentage
  const discountPercentage = product.old_price && (product.soy_price || product.new_price || product.price)
    ? Math.round(((product.old_price - (product.soy_price || product.new_price || product.price)) / product.old_price) * 100)
    : 0;

  const areAllOptionsSelected = () => {
    if (colorOption === 'Colors') {
      return selectedColor && selectedScent;
    } else if (colorOption === 'Designs') {
      return selectedDesign && selectedScent;
    } else { // Custom Design option
      return customColorName && selectedScent;
    }
  };

  return (
    <div className="product-display">
      <div className="product-display-left">
        <div className="product-display-main-image">
          <img src={mainImage} alt={name} />
          {discountPercentage > 0 && (
            <div className="product-discount-badge">-{discountPercentage}%</div>
          )}
        </div>
        <div className="product-display-thumbnail-grid">
          {productImages.map((img, index) => (
            <div 
              key={index} 
              className={`product-thumbnail ${mainImage === img ? 'active' : ''}`}
              onClick={() => setMainImage(img)}
            >
              <img src={img} alt={`${name} view ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="product-display-right">
        <h1 className="product-title">{name}</h1>
        
        <div className="product-meta">
          <div className="product-rating">
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar 
                  key={star} 
                  className={star <= getFilledStars() ? 'filled' : ''}
                />
              ))}
            </div>
            <span className="rating-value">({averageRating})</span>
          </div>
        </div>

        <div className="product-short-description">
          <p>{description}</p>
        </div>

        <div className="product-price">
          <div className="current-price">Rs. {calculatePrice()}</div>
          {product.old_price > (product.soy_price || product.new_price || product.price) && (
            <div className="original-price">Rs. {product.old_price}</div>
          )}
        </div>

        <div className="product-attributes">
          <div className="product-attribute">
            <span className="attribute-label">Wax Type:</span>
            <span className="attribute-value">Soy Wax</span>
          </div>
        </div>

        {/* Scent Selection */}
        <div className="product-scent-selection">
          <h3>Select Scent*</h3>
          <div className="scent-options">
            {allScents.map(scent => (
              <div 
                key={scent}
                className={`scent-option ${selectedScent === scent ? 'selected' : ''}`}
                onClick={() => handleScentChange(scent)}
              >
                {scent}
              </div>
            ))}
          </div>
        </div>

        {/* Color/Design Selection */}
        <div className="product-color-selection">
          <h3>Color/Design Options</h3>
          <div className="color-option-selector">
            <div 
              className={`option ${colorOption === 'Colors' ? 'selected' : ''}`} 
              onClick={() => handleColorOptionChange('Colors')}
            >
              Colors
            </div>
            {isGlassCollection && (
              <>
                <div 
                  className={`option ${colorOption === 'Designs' ? 'selected' : ''}`} 
                  onClick={() => handleColorOptionChange('Designs')}
                >
                  Designs
                </div>
                <div 
                  className={`option ${colorOption === 'Custom Design' ? 'selected' : ''}`} 
                  onClick={() => handleColorOptionChange('Custom Design')}
                >
                  Custom Design (+Rs. 100)
                </div>
              </>
            )}
          </div>
          
          {colorOption === 'Colors' && (
            <div className="color-palette">
              {pastelColors.map(color => (
                <div
                  key={color.name}
                  className={`color-swatch ${selectedColor === color.code ? 'selected' : ''}`}
                  style={{ backgroundColor: color.code }}
                  onClick={() => handleColorChange(color)}
                >
                  <span className="color-name">{color.name}</span>
                </div>
              ))}
            </div>
          )}

          {colorOption === 'Designs' && isGlassCollection && (
            <div className="design-options">
              {designOptions.length > 0 ? (
                designOptions.map(design => (
                  <div 
                    key={design.name}
                    className={`design-option ${selectedDesign === design.name ? 'selected' : ''}`}
                    onClick={() => handleDesignChange(design)}
                  >
                    <div className="design-name">{design.name}</div>
                    <div className="design-description">{design.description}</div>
                  </div>
                ))
              ) : (
                <div className="no-designs-message">
                  No special designs available for this product.
                </div>
              )}
            </div>
          )}

          {colorOption === 'Custom Design' && isGlassCollection && (
            <div className="custom-design-section">
              <div className="custom-design-input">
                <input 
                  type="text" 
                  placeholder="Describe your custom design"
                  value={customColorName}
                  onChange={handleCustomColorChange}
                />
              </div>
              <p className="custom-design-note">
                Since all of these are handmade and poured, it may not be exactly how you have it in your mind,
                but we will try to surpass your expectations.
              </p>
            </div>
          )}
        </div>

        <div className="product-actions">
          <div className="quantity-selector">
            <button onClick={decrementQuantity} disabled={quantity <= 1}>-</button>
            <input 
              type="number" 
              value={quantity} 
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val) && val > 0 && val <= (product.stock || 10)) {
                  setQuantity(val);
                }
              }}
              min="1"
              max={product.stock || 10}
            />
            <button onClick={incrementQuantity} disabled={quantity >= (product.stock || 10)}>+</button>
          </div>
          
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={!areAllOptionsSelected()}
          >
            <FiShoppingBag />
            Create Candle
          </button>

          <button className="wishlist-btn">
            <FiHeart />
          </button>

          <button className="share-btn">
            <FiShare2 />
          </button>
        </div>

        <div className="product-categories">
          <span className="category-label">Collection:</span>
          <span className="category-value">{category}</span>
        </div>
      </div>

      {alertVisible && (
        <div className="product-alert">
          <div className="alert-content">
            <span className="alert-icon">✓</span>
            <span className="alert-message">Added to cart successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDisplay;