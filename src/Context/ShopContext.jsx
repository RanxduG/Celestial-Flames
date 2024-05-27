import React, {createContext, useState} from "react";
import all_product from '../Components/Assets/all_data.js'
export const ShopContext = createContext(null);

const getDefaultCard = () => {
    let cart = {};
    for (let i = 0; i < all_product.length; i++) {
        cart[all_product[i].id] = 0;
    }
    return cart;

}
const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCard());   
    console.log(cartItems);

    const addToCart = (itemId) => {
        setCartItems((prev)=>({...prev, [itemId]: prev[itemId]+1}))
    }
    const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev, [itemId]: prev[itemId]-1}))
    }
    const contextValue = {all_product, cartItems, addToCart, removeFromCart};
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );

}

export default ShopContextProvider;