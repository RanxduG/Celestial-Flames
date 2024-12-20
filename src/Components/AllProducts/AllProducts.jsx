import React, { useContext, useState, useEffect } from 'react';
import './AllProducts.css';
import Item from '../Item/Item';
import { ShopContext } from '../../Context/ShopContext';
import { Link } from 'react-router-dom';

const AllProducts = () => {
  const { ready_made_products } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);

  // Simulate a delay for loading (or fetch from API)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulating 2 seconds loading time
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

  return (
    <div className="all-products">
      <h1>ALL PRODUCTS</h1>
      <hr />

      {/* Classic Collection */}
      <div className="p-wrapper">
        <Link to={'/Classic Collection'}>
          <div className="linkbar">Classic Collection</div>
        </Link>
      </div>
      <div className="collection">
        {loading
          ? renderSkeletons() // Show skeletons while loading
          : ready_made_products
              .filter((item) => item.category === 'Classic Collection')
              .map((item) => (
                <Item
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  scent={item.scent}
                  image={item.image}
                  secondImage={item.secondImage}
                  stock={item.stock}
                  waxtype={item.waxtype}
                  fragrancetype={item.fragrancetype}
                  color={item.product_color}
                  old_price={item.old_price}
                  new_price={item.new_price}
                />
              ))}
      </div>

      {/* Crystal Collection */}
      <div className="p-wrapper">
        <Link to={'/Crystal Collection'}>
          <div className="linkbar">Crystal Collection</div>
        </Link>
      </div>
      <div className="collection">
        {loading
          ? renderSkeletons() // Show skeletons while loading
          : ready_made_products
              .filter((item) => item.category === 'Crystal Collection')
              .map((item) => (
                <Item
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  scent={item.scent}
                  image={item.image}
                  secondImage={item.secondImage}
                  stock={item.stock}
                  waxtype={item.waxtype}
                  fragrancetype={item.fragrancetype}
                  color={item.product_color}
                  old_price={item.old_price}
                  new_price={item.new_price}
                />
              ))}
      </div>

      {/* Elemental Collection */}
      <div className="p-wrapper">
        <Link to={'/Elemental Collection'}>
          <div className="linkbar">Elemental Collection</div>
        </Link>
      </div>
      <div className="collection">
        {loading
          ? renderSkeletons() // Show skeletons while loading
          : ready_made_products
              .filter((item) => item.category === 'Elemental Collection')
              .map((item) => (
                <Item
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  scent={item.scent}
                  image={item.image}
                  secondImage={item.secondImage}
                  stock={item.stock}
                  waxtype={item.waxtype}
                  fragrancetype={item.fragrancetype}
                  color={item.product_color}
                  old_price={item.old_price}
                  new_price={item.new_price}
                />
              ))}
      </div>

      <div className="create-candle-link">
        <h3>
          Couldn't Find Anything To Your Liking?<br />
          We Got You!!<br />
          <Link to={'/Catalog'}>
            <button onClick={() => window.scroll(0, 0)}>Create The Candle You Want</button>
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default AllProducts;
