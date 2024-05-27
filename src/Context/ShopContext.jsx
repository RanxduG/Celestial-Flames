import React, { createContext, useState } from "react";
import all_product from '../Components/Assets/all_data.js';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < all_product.length; i++) {
        cart[all_product[i].id] = [];
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());

    const addToCart = (itemId, waxType, fragrancetype, color, fragrance, total) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: [
                ...prev[itemId],
                {
                    waxType: waxType,
                    fragranceType: fragrancetype,
                    color: color,
                    fragrance: fragrance,
                    quantity: 1,
                    total: total
                }
            ]
        }));
        console.log(waxType + fragrancetype);
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

    const contextValue = {
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
