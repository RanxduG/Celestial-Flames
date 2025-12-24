import React, { useContext, useState, useEffect } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import { Link } from 'react-router-dom';
import { Plus, Minus, X, ShoppingBag, Truck } from 'lucide-react';
import { getAllProducts } from '../../Context/api';

const CartItems = () => {
    const { 
        cartItems, 
        removeFromCart, 
        getTotalCartAmount, 
        verifyPromoCode, 
        addToCart, 
        setCartItems, 
        discount, 
        setCartTotal 
    } = useContext(ShopContext);
    
    const [promocode, setPromocode] = useState('');
    const [showDiscount, setShowDiscount] = useState(false);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [animateItems, setAnimateItems] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await getAllProducts();
                setProducts(productsData.data);
                setIsLoading(false);
                setAnimateItems(true);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

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
        if (promocode.trim()) {
            verifyPromoCode(promocode);
            setShowDiscount(true);
        }
    };

    const totalAmount = getTotalCartAmount();
    const discountedAmount = totalAmount * discount;
    
    useEffect(() => {
        setCartTotal(discountedAmount);
    }, [discountedAmount, setCartTotal]);

    // Check if cart is empty
    const isCartEmpty = () => {
        return products.every(product => 
            !cartItems[product.id] || cartItems[product.id].length === 0
        );
    };

    // Get cart items count
    const getCartItemsCount = () => {
        let count = 0;
        products.forEach(product => {
            if (cartItems[product.id]) {
                cartItems[product.id].forEach(item => {
                    count += item.quantity;
                });
            }
        });
        return count;
    };

    // Generate WhatsApp message
    const generateWhatsAppMessage = () => {
        let message = "🕯️ Hello! I'd like to place an order for these beautiful candles:\n\n";
        let itemIndex = 1;

        products.forEach((product) => {
            if (cartItems[product.id] && cartItems[product.id].length > 0) {
                cartItems[product.id].forEach((item) => {
                    message += `${itemIndex}. ✨ ${product.name}\n`;
                    message += `   🌸 Scent: ${item.fragranceType} ${item.fragrance}\n`;
                    message += `   🎨 Color: ${item.color}\n`;
                    message += `   🕯️ Wax Type: ${item.waxType}\n`;
                    message += `   📦 Quantity: ${item.quantity}\n`;
                    message += `   💰 Price per unit: Rs. ${item.total}\n`;
                    message += `   💵 Total: Rs. ${item.total * item.quantity}\n\n`;
                    itemIndex++;
                });
            }
        });
        
        if (discount < 1) {
            message += `🎁 Promo Discount: ${100-(discount*100)}%\n\n`;
        }
        message += `🛍️ Grand Total: Rs. ${discountedAmount.toFixed(2)}\n\n`;
        message += `📍 Delivery via Prompt Express (PVT) Ltd, Nugegoda\n`;
        message += `Thank you for choosing our handcrafted candles! 🙏`;
        
        return encodeURIComponent(message);
    };

    const whatsappMessage = generateWhatsAppMessage();

    if (isLoading) {
        return (
            <div className="cart-container">
                <div className="cart-header">
                    <h1>Loading your cart...</h1>
                </div>
            </div>
        );
    }

    if (isCartEmpty()) {
        return (
            <div className="cart-container">
                <div className="empty-cart">
                    <div className="empty-cart-icon">🛒</div>
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added any candles to your cart yet.</p>
                    <Link to="/catalog" className="continue-shopping-btn">
                        <ShoppingBag size={20} style={{ marginRight: '0.5rem' }} />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h1>Shopping Cart</h1>
                <p className="cart-subtitle">
                    {getCartItemsCount()} {getCartItemsCount() === 1 ? 'item' : 'items'} ready to bring warmth to your space
                </p>
            </div>

            <div className="cart-content">
                <div className="cart-items-section">
                    <div className="cart-items-header">
                        <div className="cart-items-grid-header">
                            <span></span>
                            <span>Product Details</span>
                            <span>Price</span>
                            <span>Quantity</span>
                            <span className="hide-mobile">Total</span>
                            <span></span>
                        </div>
                    </div>

                    {products.map((product) => (
                        cartItems[product.id] && cartItems[product.id].map((item, index) => (
                            <div key={`${product.id}-${index}`} className="cart-item">
                                <div className="cart-item-grid">
                                    <img 
                                        src={product.img1Url} 
                                        alt={product.name}
                                        className="cart-product-image"
                                    />
                                    
                                    <div className="cart-product-details">
                                        <h3 className="cart-product-name">{product.name}</h3>
                                        <div className="cart-product-specs">
                                            <span className="spec-tag color">{item.color}</span>
                                            <span className="spec-tag fragrance">
                                                {item.fragranceType} {item.fragrance}
                                            </span>
                                            <span className="spec-tag wax_detail">{item.waxType}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="cart-price">
                                        Rs. {item.total}
                                    </div>
                                    
                                    <div className="quantity-controls">
                                        <button 
                                            className="quantity-btn"
                                            onClick={() => handleDecreaseQuantity(product.id, item, index)}
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="quantity-display">{item.quantity}</span>
                                        <button 
                                            className="quantity-btn"
                                            onClick={() => handleIncreaseQuantity(product.id, item)}
                                            aria-label="Increase quantity"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    
                                    <div className="cart-item-total hide-mobile">
                                        Rs. {(item.total * item.quantity).toFixed(2)}
                                    </div>
                                    
                                    <button 
                                        className="remove-btn"
                                        onClick={() => removeFromCart(product.id, index)}
                                        aria-label="Remove item"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ))}
                </div>

                <div className="cart-summary">
                    <div className="cart-summary-header">
                        <h2>Order Summary</h2>
                    </div>
                    
                    <div className="cart-summary-content">
                        <div className="promo-section">
                            <h3>Have a promo code?</h3>
                            <div className="promo-input-container">
                                <input 
                                    type="text" 
                                    placeholder="Enter promo code" 
                                    value={promocode}
                                    onChange={handlePromoCodeChange}
                                    className="promo-input"
                                />
                                <button 
                                    onClick={handlePromoCodeSubmit}
                                    className="promo-btn"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>

                        <div className="summary-line">
                            <span>Subtotal ({getCartItemsCount()} items)</span>
                            <span>Rs. {totalAmount.toFixed(2)}</span>
                        </div>

                        {discount < 1 && (
                            <div className="summary-line discount">
                                <span>Promo Discount ({100 - (discount * 100)}%)</span>
                                <span>-Rs. {(totalAmount - discountedAmount).toFixed(2)}</span>
                            </div>
                        )}

                        <div className="summary-line">
                            <span>Shipping</span>
                            <span>Depends on location</span>
                        </div>

                        <div className="summary-line total">
                            <span>Total</span>
                            <span>Rs. {discountedAmount.toFixed(2)}</span>
                        </div>

                        <a 
                            href={`https://wa.me/+94770081559?text=${whatsappMessage}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none' }}
                        >
                            <button className="checkout-btn">
                                🕯️ Place Order on WhatsApp
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;