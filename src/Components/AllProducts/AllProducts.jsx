import React, { useContext, useState, useEffect } from 'react';
import './AllProducts.css';
import Item from '../Item/Item';
import { ShopContext } from '../../Context/ShopContext';
import { Link } from 'react-router-dom';

const AllProducts = () => {
  const { allProducts = [], allStocks = [] } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulating a 2-second loading time
    return () => clearTimeout(timer);
  }, []);

  const renderSkeletons = () => {
    return Array(4)
      .fill(null)
      .map((_, index) => (
        <div key={index} className="skeleton-item">
          <div className="skeleton-image"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-button"></div>
        </div>
      ));
  };

  const getProductCategoryByStockId = (stockId) => {
    const correspondingProduct = allProducts.find((product) => product.id === stockId);
    return correspondingProduct ? correspondingProduct.category : null;
  };

  const getProductNameByStockId = (stockId) => {
    const correspondingProduct = allProducts.find((product) => product.id === stockId);
    return correspondingProduct ? correspondingProduct.name : null;
  };

  const categories = ['Mold Collection', 'Glass Collection', 'Tin Collection', 'Other'];

  return (
    <div className="all-products">
      <h1>ALL PRODUCTS</h1>
      <hr />

      {categories.map((category) => {
        // Filter products by category
        const categoryProducts = allStocks.filter(item => getProductCategoryByStockId(item.id) === category);

        if (categoryProducts.length === 0) return null; // Skip if no products in this category

        return (
          <div>
          <div className="category-title">{category}</div >
          <div key={category} className="collection">
            {loading
              ? renderSkeletons()
              : categoryProducts.map((stock) => (
                  <Item
                    key={stock.id}
                    id={stock.id}
                    item_id={stock.item_id}
                    name={getProductNameByStockId(stock.id)}
                    scent={stock.scent}
                    image={stock.imageUrl}
                    secondImage={stock.secondImageUrl}
                    stock={stock.stock}
                    waxtype={stock.waxtype}
                    fragrancetype={stock.fragrancetype}
                    color={stock.color}
                    old_price={stock.old_price}
                    new_price={stock.new_price}
                  />
                ))}
          </div>
        </div>
        );
      })}

      <div className="create-candle-link">
        <h3>
          Couldn't Find Anything To Your Liking? <br />
          We Got You! <br />
          <Link to={'/Catalog'}>
            <button onClick={() => window.scroll(0, 0)}>Create The Candle You Want</button>
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default AllProducts;
