import React, { useContext, useState } from 'react';
import './OrderSummary.css';
import { ShopContext } from 'C:/Ranidu/Personal/Celestial_Flames_And_Candles_By_K/WebApp/frontend/src/Context/ShopContext.jsx';

const OrderSummary = () => {
    const { all_product, cartItems, getTotalCartAmount, verifyPromoCode } = useContext(ShopContext);
    const [promocode, setPromocode] = useState(null);
    const [discount, setDiscount] = useState(1); // Initialize with no discount

    const handlePromoCodeChange = (event) => {
        setPromocode(event.target.value);
    };

    const handlePromoCodeSubmit = () => {
        const discountValue = verifyPromoCode(promocode);
        setDiscount(discountValue);
    };

    const subtotal = getTotalCartAmount();
    const shippingFee = 500;
    const total = subtotal * discount + shippingFee;

    return (
        <div className='ordersummary'>
            <h1>Order Summary</h1>
            <hr />
            <div className='summary'>
                {all_product.map((product) => (
                    cartItems[product.id].map((item, index) => (
                        <div key={`${product.id}-${index}`} className='summary-item'>
                            <img src={product.image} alt={item.name} className='summary-item-image' />
                            <div className='summary-item-info'>
                                <p>{item.color} {item.fragrance} Scented {product.name} made with {item.waxType} & {item.fragranceType}</p>
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
                    <h3>Rs.{total}</h3>
                </div>
                <hr />
                <div className="summary-promocode">
                    <p>If you have a promo code, enter it here</p>
                    <div className="summary-promo-box">
                        <input 
                            type="text" 
                            placeholder='Enter Promo Code' 
                            value={promocode || ''} 
                            onChange={handlePromoCodeChange} 
                        />
                        <button onClick={handlePromoCodeSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
