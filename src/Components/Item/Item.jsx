import React, { useContext, useState } from 'react';
import './Item.css';
import { ShopContext } from '../../Context/ShopContext';

const Item = (props) => {
  const { addToCart } = useContext(ShopContext);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleAddToCart = () => {
    if (props.stock === 0) {
      setAlertMessage('This item is out of stock.');
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000); // Hide the alert after 3 seconds
      return;
    }
    addToCart(props.id, props.name, props.waxtype, props.fragrancetype, props.color, props.scent, props.new_price);

    setAlertMessage('Added to cart successfully.');
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };

  return (
    <div className='item'>
      <div className='image-container'>
        <img src={props.image} alt="" className='main-image'/>
        <div className='hover-details'>
          {props.stock === 0 ? 'Out of stock' : `Remaining stock: ${props.stock}`}
        </div>
      </div>
      <p>{props.scent} {props.name}</p>
      <button onClick={handleAddToCart}>ADD TO CART</button>
      {alertVisible && <div className="alert">{alertMessage}</div>}
    </div>
  );
}

export default Item;
