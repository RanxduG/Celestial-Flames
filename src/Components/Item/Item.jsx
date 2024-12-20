import React, { useContext, useState, useEffect } from 'react';
import './Item.css';
import { ShopContext } from '../../Context/ShopContext';
import { Link } from 'react-router-dom';

const Item = (props) => {
  const { addToCart } = useContext(ShopContext);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const handleAddToCart = () => {
  if (props.stock === 0) {
    setAlertMessage('This item is out of stock.');
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000);
    return;
  }

  // Add item to cart
  addToCart(props.id, props.name, props.waxtype, props.fragrancetype, props.color_id, props.scent, props.new_price);

  // Show success message
  setAlertMessage('Item successfully added to cart.');
  setAlertVisible(true);
  setTimeout(() => setAlertVisible(false), 3000);
};


  // Simulate loading state (2 seconds delay)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulating 2 seconds loading time
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // Skeleton Loader
    return (
      <div className="item skeleton">
        <div className="image-container skeleton-box"></div>
        <p className="skeleton-text"></p>
        <button className="skeleton-box skeleton-button"></button>
      </div>
    );
  }

  return (
    <div className="item">
      <Link to={`/readymade/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
        <div className="image-container">
          <img src={props.image} alt="" className="main-image" />
          <div className="hover-details">
            {props.stock === 0 ? 'Out of stock' : `Remaining stock: ${props.stock}`}
          </div>
        </div>
        <p>{props.scent} {props.name}</p>
      </Link>
      <button onClick={handleAddToCart}>ADD TO CART</button>
      {alertVisible && (
  <div className={`alert ${props.stock === 0 ? 'error' : 'success'}`}>
    {alertMessage}
  </div>
)}

    </div>
  );
};

export default Item;
