import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from 'C:/Ranidu/Personal/Celestial_Flames_And_Candles_By_K/WebApp/frontend/src/Context/ShopContext.jsx';
import remove_icon from '../Assets/remove.png';

const CartItems = () => {
    const { all_product, cartItems, removeFromCart, getTotalCartAmount, verifyPromoCode } = useContext(ShopContext);
    const [promocode, setPromocode] = useState(null);
    const handlePromoCodeChange = (event) => {
        setPromocode(event.target.value); // Update the promo code state when the user types in the input field
    };

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((product) => {
                return cartItems[product.id].map((item, index) => (
                    <div key={`${product.id}-${index}`}>
                        <div className="cartitems-format cartitems-format-main">
                            <img src={product.image} alt="" className='carticon-product-icon' />
                            <p>{item.color} {item.fragrance} Scented {product.name} made with {item.waxType} & {item.fragranceType}</p>
                            <p>Rs.{item.total}</p>
                            <button className='carticons-quantity'>{item.quantity}</button>
                            <p>Rs.{item.total * item.quantity}</p>
                            <img src={remove_icon} alt="" onClick={() => { removeFromCart(product.id, index) }} className='carticon-remove-icon' />
                        </div>
                        <hr />
                    </div>
                ));
            })}
            <div className="carticons-down">
                <div className="carticons-total">
                    <h1>Cart Total</h1>
                    <div>
                        <div className="carticons-total-item">
                            <p>Subtotal</p>
                            <p>Rs.{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="carticons-total-item">
                            <p>Promo code Discount</p>
                            <p>{100-(verifyPromoCode(promocode)*100)}%</p>
                        </div>
                        <hr />
                        <div className="carticons-total-item">
                            <p>Shipping Fee</p>
                            <p>Rs.500</p>
                        </div>
                        <hr />
                        <div className="carticons-total-item">
                            <h3>Total</h3>
                            <h3>Rs.{getTotalCartAmount()*verifyPromoCode(promocode) + 500}</h3>
                        </div>
                        <p>*Our trusted courier partner is Prompto Express (PVT) ltd Nugegoda</p>
                        <button>PROCEED TO CHECKOUT</button>
                    </div>
                </div>
                <div className="carticons-promocode">
                    <p>If you have promo code, Enter it here</p>
                    <div className="carticons-promo-box">
                        <input type="text" placeholder='Enter Promo code' value={promocode} onChange={handlePromoCodeChange} />
                        <button onClick={() => verifyPromoCode(promocode)}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
