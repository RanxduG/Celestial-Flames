import React, { createContext, useState, useEffect } from "react";
import ready_made_products from '../Components/Assets/Data/readymade.js';
import all_products from '../Components/Assets/Data/all_data.js';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < all_products.length; i++) {
        cart[all_products[i].id] = [];
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const promocode = 'CF202406';
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [reviews, setReviews] = useState([]);
    const [discount, setDiscount] = useState(1);
    const [cartTotal, setCartTotal] = useState(0);

    const addToCart = (itemId, itemName, waxType, fragranceType, color, fragrance, total) => {
        setCartItems((prev) => {
            const updatedItems = [...prev[itemId]];
            const existingItemIndex = updatedItems.findIndex(item =>

                item.id === itemId &&
                item.waxType === waxType &&
                item.fragranceType === fragranceType &&
                item.color === color &&
                item.fragrance === fragrance
            );

            if (existingItemIndex !== -1) {
                updatedItems[existingItemIndex].quantity += 1;
            } else {
                updatedItems.push({
                    id: itemId,
                    itemName: itemName,
                    waxType: waxType,
                    fragranceType: fragranceType,
                    color: color,
                    fragrance: fragrance,
                    quantity: 1,
                    total: total
                });
            }

            return {
                ...prev,
                [itemId]: updatedItems
            };
        });
    };

    const removeFromCart = (itemId, index) => {
        setCartItems((prev) => {
            const updatedItems = prev[itemId].filter((_, i) => i !== index);
            return { ...prev, [itemId]: updatedItems };
        });
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            cartItems[itemId].forEach(item => {
                totalAmount += item.total * item.quantity;
            });
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const itemId in cartItems) {
            cartItems[itemId].forEach(item => {
                totalItems += item.quantity;
            });
        }
        return totalItems;
    };
    const verifyPromoCode = (code) => {
        if (code === promocode) {
            setDiscount(0.9); // 10% discount
            return 0.9;
        } else {
            setDiscount(1);
            return 1;
        }
    };

    const contextValue = {
        all_products,
        ready_made_products,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems,
        reviews,
        verifyPromoCode,
        setCartItems,
        discount,
        cartTotal,
        setCartTotal
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
