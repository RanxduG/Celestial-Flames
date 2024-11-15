import React, { useContext } from 'react';
import './OrderSummary.css';
import { ShopContext } from '../../Context/ShopContext';

const OrderSummary = () => {
    const { ready_made_products, cartItems, getTotalCartAmount, discount, cartTotal } = useContext(ShopContext);

    const subtotal = getTotalCartAmount();
    const shippingFee = 500;
    const total = subtotal * discount + shippingFee;

    return (
        <div className='ordersummary'>
            <h1>Order Summary</h1>
            <hr />
            <div className='summary'>
                {ready_made_products.map((product) => (
                    cartItems[product.id].map((item, index) => (
                        <div key={`${product.id}-${index}`} className='summary-item'>
                            <img src={product.image} alt={item.name} className='summary-item-image' />
                            <div className='summary-item-info'>
                                <p className='item-title'>{item.color}, {item.fragranceType} {item.fragrance} Scented {product.name} made with {item.waxType}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: Rs.{item.total}</p>
                                <p>Total: Rs.{item.total * item.quantity}</p>
                            </div>
                        </div>
                    ))
                ))}
            </div>
            <div className="summary-total">
                <div className="summary-total-item">
                    <p>Subtotal</p>
                    <p>Rs.{subtotal}</p>
                </div>
                <hr />
                <div className="summary-total-item">
                    <p>Promo Code Discount</p>
                    <p>{100 - (discount * 100)}%</p>
                </div>
                <hr />
                <div className="summary-total-item">
                    <p>Shipping Fee</p>
                    <p>Rs.{shippingFee}</p>
                </div>
                <hr />
                <div className="summary-total-item">
                    <h3>Total</h3>
                    <h3>Rs.{cartTotal}</h3>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
