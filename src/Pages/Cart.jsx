import React, { useEffect } from 'react';
import CartItems from '../Components/CartItems/CartItems';

const Cart = () => {
  useEffect(() => {
    // Scroll to top when cart page loads
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = 'Shopping Cart - Your Candle Collection';
  }, []);

  return (
    <div className="cart-page">
      <CartItems />
    </div>
  );
};

export default Cart;