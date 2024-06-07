import React, { createContext, useState } from "react";
import all_product from '../Components/Assets/all_data.js';
import initialReviews from '../Components/Assets/reviews.js';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < all_product.length; i++) {
        cart[all_product[i].id] = [];
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const promocode = 'CF202406';
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [userDetails, setUserDetails] = useState(null);
    const [reviews, setReviews] = useState(initialReviews);
    const [discount, setDiscount] = useState(1);

    const addToCart = (itemId, itemName, waxType, fragranceType, color, fragrance, total) => {
        setCartItems((prev) => {
            const updatedItems = [...prev[itemId]];

            // Find if there's an existing item with the same attributes
            const existingItemIndex = updatedItems.findIndex(item => 
                item.itemName === itemName &&
                item.waxType === waxType && 
                item.fragranceType === fragranceType && 
                item.color === color && 
                item.fragrance === fragrance
            );

            if (existingItemIndex !== -1) {
                // If the item exists, increase the quantity
                updatedItems[existingItemIndex].quantity += 1;
            } else {
                // Otherwise, add a new item
                updatedItems.push({
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

    const setUser = (user) => {
        setUserDetails(user);
    };

    const addReview = (newReview) => {
        setReviews((prevReviews) => [...prevReviews, newReview]);
    };

    const verifyPromoCode = (code) => {
        if (code === promocode) {
            setDiscount(0.9); // 10% discount (90% of original price
            return 0.9;
        } else {
            setDiscount(1);
            return 1;
        }
    };

    const contextValue = {
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems,
        userDetails,
        setUser,
        reviews,
        addReview,
        verifyPromoCode,
        setCartItems,
        discount
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
