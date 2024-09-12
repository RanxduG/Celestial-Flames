import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/Icons/remove.png';
import plus_icon from '../Assets/Icons/plus.png';
import minus_icon from '../Assets/Icons/minus.png';
import { Link } from 'react-router-dom';

const CartItems = () => {
    const { ready_made_products, cartItems, removeFromCart, getTotalCartAmount, verifyPromoCode, addToCart, setCartItems, userDetails, discount } = useContext(ShopContext);
    const [promocode, setPromocode] = useState('');
    const [showDiscount, setShowDiscount] = useState(false); // State to control the discount display

    const handleIncreaseQuantity = (itemId, item) => {
        addToCart(itemId, item.itemName, item.waxType, item.fragranceType, item.color, item.fragrance, item.total);
    };

    const handleDecreaseQuantity = (itemId, item, index) => {
        if (item.quantity > 1) {
            setCartItems((prev) => {
                const updatedItems = [...prev[itemId]];
                updatedItems[index].quantity -= 1;
                return { ...prev, [itemId]: updatedItems };
            });
        } else {
            removeFromCart(itemId, index);
        }
    };

    const handlePromoCodeChange = (e) => {
        setPromocode(e.target.value);
    };

    const handlePromoCodeSubmit = () => {
        verifyPromoCode(promocode);
        setShowDiscount(true); // Show discount after promo code is verified
    };

    const totalAmount = getTotalCartAmount();
    const discountedAmount = totalAmount * discount + 500; // Apply discount and add shipping fee

    return (
        <div className='cartitems'>
            <h1>Shopping Cart</h1>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {ready_made_products.map((product) => (
                cartItems[product.id].map((item, index) => (
                    <div key={`${product.id}-${index}`}>
                        <div className="cartitems-format cartitems-format-main">
                            <img src={product.image} alt="" className='carticon-product-icon' />
                            <p>{item.color}, {item.fragranceType} {item.fragrance} Scented {product.name} made with {item.waxType}</p>
                            <p>Rs.{item.total}</p>
                            <div className='quantity-control'>
                                <img src={minus_icon} alt="-" className='carticon-quantity-control' onClick={() => handleDecreaseQuantity(product.id, item, index)} />
                                <button className='carticons-quantity'>{item.quantity}</button>
                                <img src={plus_icon} alt="+" className='carticon-quantity-control' onClick={() => handleIncreaseQuantity(product.id, item)} />
                            </div>
                            <p>Rs.{item.total * item.quantity}</p>
                            <img src={remove_icon} alt="" onClick={() => { removeFromCart(product.id, index) }} className='carticon-remove-icon' />
                        </div>
                        <hr />
                    </div>
                ))
            ))}
            
            <div className="carticons-down">
                <div className="carticons-total">
                    <h1>Cart Total</h1>
                    <div>
                        <div className="carticons-total-item">
                            <p>Subtotal</p>
                            <p>Rs.{totalAmount}</p>
                        </div>
                        <hr />
                        <div className="carticons-total-item">
                            <p>Promo code Discount</p>
                            <p>{100 - (discount * 100)}%</p>
                        </div>
                        <hr />

                        <div className="carticons-total-item">
                            <p>Shipping Fee</p>
                            <p>Rs.500</p>
                        </div>
                        <hr />
                        <div className="carticons-total-item">
                            <h3>Total</h3>
                            <h3>Rs.{discountedAmount.toFixed(2)}</h3>
                        </div>
                        <p>*Our trusted courier partner is Prompto Express (PVT) ltd Nugegoda</p>
                        {userDetails ? <Link to={'/checkout'}><button onClick={() => window.scrollTo(0, 0)}>PROCEED TO CHECKOUT</button></Link> : <Link to={'/loginsignup/login'}><button>LOGIN TO CHECKOUT</button></Link>}
                    </div>
                </div>
                <div className="carticons-promocode">
                    <p>If you have promo code, Enter it here</p>
                    <div className="carticons-promo-box">
                        <input type="text" placeholder='Enter Promo code' value={promocode} onChange={handlePromoCodeChange} />
                        <button onClick={handlePromoCodeSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
