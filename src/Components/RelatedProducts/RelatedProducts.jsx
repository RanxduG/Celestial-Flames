import React, { useContext } from 'react';
import './RelatedProducts.css';
import { ShopContext } from '../../Context/ShopContext';
import Item from '../Item/Item'; // Import the Item component

const RelatedProducts = ({ products }) => {
  const { allProducts, allStocks, addToCart } = useContext(ShopContext);

  // Helper functions for Item component (same as in ProductGallery)
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

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="related-products">
      <h2>You May Also Like</h2>
      <div className="related-products-grid">
        {products.map((product, index) => (
          <Item
            key={product.id}
            product={product}
            index={index}
            isVisible={true} // Always visible for related products
            getProductNameByStockId={getProductNameByStockId}
            getWaxTypeByStockId={getWaxTypeByStockId}
            getProductCategoryByStockId={getProductCategoryByStockId}
            handleAddToCart={handleAddToCart}
            formatPrice={formatPrice}
            renderStars={renderStars}
            getBadgeType={getBadgeType}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;