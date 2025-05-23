import React, { useContext, useState, useEffect } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../../Context/ShopContext';
import { FiHeart, FiStar, FiShare2, FiShoppingBag } from 'react-icons/fi';

const ProductDisplay = ({ product }) => {
  const { addToCart, allProducts } = useContext(ShopContext);
  const [alertVisible, setAlertVisible] = useState(false);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [averageRating, setAverageRating] = useState(0);
  const [selectedScent, setSelectedScent] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedColorName, setSelectedColorName] = useState(null);
  const [colorOption, setColorOption] = useState('Existing'); // Default to Existing colors
  const [customColorName, setCustomColorName] = useState('');

  // List of scents
  const regularScents = [
    'Cinnamon', 'Citronella', 'Lemongrass', 'French Vanilla', 'Honeydew',
    'Cafe', 'Peppermint', 'Tea & Lime', 'Lime', 'Raspberry', 'Apple',
    'Green Tea', 'Aqua', 'Jasmine', 'Rose', 'Cherry Blossoms', 'Always Rose',
    'Sweet Flower', 'Roasted Coffee'
  ];

  const specialScents = [
    'Forest', 'Sweetheart', 'Apple Spice', 'Dark Vanilla', 'Tea Leaf'
  ];

  // Combined scent list (without duplicates)
  const allScents = [...regularScents, ...specialScents.filter(scent => !regularScents.includes(scent))];

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

  // Determine if this is a mold collection product
  const isMoldCollection = category.toLowerCase().includes('mold');

  useEffect(() => {
    // Set main image when product changes
    setMainImage(product.imageUrl || product.img1Url);
  }, [product]);

  useEffect(() => {
    // Update color display when selectedColor changes
    if (product.category === 'Glass Collection') {
      // Dynamic image change based on selected color for Glass Collection
      updateGlassCollectionImage();
    } else if (isMoldCollection && selectedColor) {
      // Update the color div for mold collection products
      const colorDiv = document.querySelector('.product-color-preview');
      if (colorDiv) {
        colorDiv.style.backgroundColor = selectedColor;
      }
    }
  }, [selectedColor, product.category, isMoldCollection]);

  const updateGlassCollectionImage = () => {
    if (!selectedColorName) return;
    
    // Map of color names to their image URLs
    const colorToImageMap = {
      'Light Pink': product['image_Light PinkUrl'] || product.img_pink,
      'Peach': product['image_PeachUrl'] || product.img_peach,
      'Baby Blue': product['image_Baby BlueUrl'] || product.img_babyblue,
      'Sky Blue': product['image_Sky BlueUrl'] || product.img_skyblue,
      'Light Green': product['image_Light GreenUrl'] || product.img_lightgreen,
      'Mint': product['image_MintUrl'] || product.img_mint,
      'Light Yellow': product['image_Light YellowUrl'] || product.img_lightyellow
    };
    
    const newImageUrl = colorToImageMap[selectedColorName] || product.imageUrl || product.img1Url;
    setMainImage(newImageUrl);
  };

  const handleColorOptionChange = (option) => {
    setColorOption(option);
    // Reset color selection when switching between options
    setSelectedColor(null);
    setSelectedColorName(null);
    setCustomColorName('');
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.code);
    setSelectedColorName(color.name);
  };

  const handleCustomColorChange = (e) => {
    setCustomColorName(e.target.value);
    setSelectedColorName(e.target.value);
    // For custom colors, we don't have a color code, so we'll use a placeholder
    setSelectedColor('#FFFFFF');
  };

  const handleScentChange = (scent) => {
    setSelectedScent(scent);
  };

  // Calculate the price based on requirements
  const calculatePrice = () => {
    // Base price is always soy wax price
    let basePrice = product.soy_price || product.new_price || product.price;
    
    // Add 100 Rs for custom design
    if (colorOption === 'Custom') {
      basePrice += 100;
    }
    
    return basePrice;
  };

  const handleAddToCart = () => {
    // Default wax type is 'Soy Wax' as per requirements
    const waxType = 'Soy Wax';
    
    // Use either selected color name or custom color name
    const finalColorName = colorOption === 'Custom' ? customColorName : selectedColorName;
    
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

  // Additional images (in a real implementation, these would come from your database)
  const additionalImages = [
    mainImage,
    product.secondImageUrl || product.img2Url,
    product.thirdImageUrl || product.img1Url || mainImage
  ].filter(Boolean); // Remove any undefined/null values

  const areAllOptionsSelected = () => {
    if (colorOption === 'Existing') {
      return selectedColor && selectedScent;
    } else { // Custom color option
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
          
          {/* Color preview overlay for mold collection products */}
          {isMoldCollection && (
            <>
              <img className="product-mold-overlay" src={product.img2Url || product.secondImageUrl} alt="Mold Overlay" />
              <div className="product-color-preview"></div>
            </>
          )}
        </div>
        <div className="product-display-thumbnail-grid">
          {additionalImages.map((img, index) => (
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
                  className={star <= Math.round(averageRating) ? 'filled' : ''}
                />
              ))}
            </div>
          </div>
          <div className="product-availability">
            {product.stock > 10 ? (
              <span className="in-stock">In Stock</span>
            ) : product.stock > 0 ? (
              <span className="limited">Only {product.stock} left</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
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

        {/* Color Selection */}
        <div className="product-color-selection">
          <h3>Color Options</h3>
          <div className="color-option-selector">
            <div 
              className={`option ${colorOption === 'Existing' ? 'selected' : ''}`} 
              onClick={() => handleColorOptionChange('Existing')}
            >
              Existing Colors
            </div>
            <div 
              className={`option ${colorOption === 'Custom' ? 'selected' : ''}`} 
              onClick={() => handleColorOptionChange('Custom')}
            >
              Custom Design (+Rs. 100)
            </div>
          </div>
          
          {colorOption === 'Existing' ? (
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
          ) : (
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