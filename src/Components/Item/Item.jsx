import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css';

const Item = ({ 
  product, 
  index, 
  isVisible, 
  getProductNameByStockId, 
  getWaxTypeByStockId, 
  getProductCategoryByStockId,
  handleAddToCart,
  formatPrice,
  renderStars,
  getBadgeType 
}) => {
  console.log(product);
  return (
    <div
      className={`product-card ${isVisible ? 'animate-in' : ''}`}
      style={{ '--delay': `${index * 0.1}s` }}
    >
      <div className={`product-badge ${getBadgeType(product).toLowerCase().replace(' ', '-')}`}>
        {getBadgeType(product)}
      </div>
      
      <div className="product-image-container">
        <img
          src={product.imageUrl}
          alt={product.scent}
          className="product-image"
          loading="lazy"
        />
        <Link to={`/readymade/?productId=${product.id}&itemId=${product.item_id}`} className="gallery-product-link">
          <div className="image-overlay">
            <div className="overlay-actions">
              <button className="action-btn quick-view" title="Quick View">
                <p>View</p>
              </button>
            </div>
          </div>
        </Link>
      </div>

      <div className="product-info">
        <div className="product-category">
          {getWaxTypeByStockId(product.id) || getProductCategoryByStockId(product.id)}
        </div>
        
        <h3 className="product-name">
          {product.scent} {product.name ? product.name : getProductNameByStockId(product.item_id)}
        </h3>
        
        <p className="product-description">
          Handcrafted {getWaxTypeByStockId(product.id)?.toLowerCase() || 'candle'} with premium fragrance oils
        </p>
        
        {renderStars(4.5 + (Math.random() * 0.5))} {/* Random rating between 4.5-5.0 */}
        
        <div className="product-details">
          <div className="burn-time">
            <span className="detail-icon">⏰</span>
            <span>{getWaxTypeByStockId(product.id)?.includes('Gel') ? '55-60 hours' : '40-45 hours'}</span>
          </div>
        </div>

        <div className="product-stock-indicator">
          {product.stock > 0 ? (
            <span className={product.stock < 5 ? 'low-stock' : 'in-stock'}>
              {product.stock < 5 ? `Only ${product.stock} left` : 'In Stock'}
            </span>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
        </div>

        <div className="product-footer">
          <div className="price-section">
            <span className="current-price">{formatPrice(product.new_price)}</span>
            {product.old_price > product.new_price && (
              <span className="original-price">{formatPrice(product.old_price)}</span>
            )}
          </div>
          
          <button 
            className={`add-to-cart-btn ${product.stock === 0 ? 'disabled' : ''}`}
            disabled={product.stock === 0}
            onClick={() => handleAddToCart(product)}
          >
            <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
            <div className="btn-shine"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;