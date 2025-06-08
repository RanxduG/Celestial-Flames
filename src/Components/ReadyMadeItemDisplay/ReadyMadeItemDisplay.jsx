import React, { useContext, useState, useEffect } from 'react';
import './ReadyMadeItemDisplay.css';
import { ShopContext } from '../../Context/ShopContext';
import { FiHeart, FiStar, FiShare2, FiShoppingBag } from 'react-icons/fi';

const ProductDisplay = ({ product }) => {
  const { addToCart, allProducts } = useContext(ShopContext);
  const [alertVisible, setAlertVisible] = useState(false);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [averageRating, setAverageRating] = useState(0);

  // Extract product details
  const getProductDetails = () => {
    const correspondingProduct = allProducts.find((p) => p.id === product.id);
    return {
      name: correspondingProduct?.name || product.name,
      description: correspondingProduct?.description || product.description,
      category: product.collection || 'Standard Collection',
      burntime: correspondingProduct?.burntime || 'N/A'
    };
  };

  const { name, description, category, burntime } = getProductDetails();

  // Get all 3 product images consistently
  const productImages = [
    product.img1Url,
    product.img2Url,
    product.img3Url
  ].filter(Boolean); // Remove any null/undefined images

  useEffect(() => {
    // Set main image to first available image when product changes
    if (productImages.length > 0) {
      setMainImage(productImages[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    addToCart(
      product.id, 
      name, 
      product.waxtype, 
      product.getFragranceType, 
      product.color, 
      product.scent, 
      product.new_price, 
      product.old_price,
      quantity
    );
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Calculate discount percentage
  const discountPercentage = Math.round(
    ((product.old_price - product.new_price) / product.old_price) * 100
  );

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
                  className={star <= Math.round(averageRating) ? 'filled' : ''}
                />
              ))}
            </div>
            {/* <span>{averageRating} ({reviews.length} reviews)</span> */}
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
          <div className="current-price">Rs. {product.new_price}</div>
          {product.old_price > product.new_price && (
            <div className="original-price">Rs. {product.old_price}</div>
          )}
        </div>

        <div className="product-attributes">
          {product.waxtype && (
            <div className="product-attribute">
              <span className="attribute-label">Wax Type:</span>
              <span className="attribute-value">{product.waxtype}</span>
            </div>
          )}
          {product.scent && (
            <div className="product-attribute">
              <span className="attribute-label">Scent:</span>
              <span className="attribute-value">{product.scent}</span>
            </div>
          )}
          {product.color && (
            <div className="product-attribute">
              <span className="attribute-label">Color:</span>
              <div className="color-indicator" style={{ backgroundColor: product.color }}></div>
              <span className="attribute-value">{product.color}</span>
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
                if (!isNaN(val) && val > 0 && val <= product.stock) {
                  setQuantity(val);
                }
              }}
              min="1"
              max={product.stock}
            />
            <button onClick={incrementQuantity} disabled={quantity >= product.stock}>+</button>
          </div>
          
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            <FiShoppingBag />
            Add to Cart
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