import React, { useContext } from 'react';
import './RelatedProducts.css';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const RelatedProducts = ({ products }) => {
  const { allProducts } = useContext(ShopContext);

  // Get product name from the shared context
  const getProductName = (stockId) => {
    const product = allProducts.find((item) => item.id === stockId);
    return product ? product.name : 'Candle Product';
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="related-products">
      <h2>You May Also Like</h2>
      <div className="related-products-grid">
        {products.map((product) => (
          <Link 
            to={`/readymade/?productId=${product.id}&itemId=${product.item_id}`} 
            key={product.id}
            className="related-product-card"
          >
            <div className="related-product-image">
              <img src={product.imageUrl} alt={getProductName(product.id)} />
              {product.new_price < product.old_price && (
                <div className="related-product-sale">Sale</div>
              )}
            </div>
            <div className="related-product-info">
              <h3>{getProductName(product.id)}</h3>
              <div className="related-product-price">
                <span className="current-price">Rs. {product.new_price}</span>
                {product.new_price < product.old_price && (
                  <span className="old-price">Rs. {product.old_price}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;