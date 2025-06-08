import React, { createContext, useState, useEffect } from "react";
import ready_made_products from '../Components/Assets/Data/readymade.js';
import all_products from '../Components/Assets/Data/all_data.js';
import { getAllStock, getAllProducts, getHomeBanner, getCategoryBanner, getSeasonalBanner } from './api';

export const ShopContext = createContext(null);

const getDefaultCart = (products) => {
    let cart = {};
    for (let i = 0; i < products.length; i++) {
        cart[products[i].id] = [];
    }
    return cart;
};

const ShopContextProvider = (props) => {

    const [allProducts, setProducts] = useState([]);
    const [allStocks, setStocks] = useState([]);

    const promocode = 'CF202406';
    const [cartItems, setCartItems] = useState({});
    const [reviews, setReviews] = useState([]);
    const [discount, setDiscount] = useState(1);
    const [cartTotal, setCartTotal] = useState(0);
    const [homeBanners, setHomeBanners] = useState([]);
    const [categoryBanners, setCategoryBanners] = useState([]);
    const [seasonalBanners, setSeasonalBanners] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const stocksData = await getAllStock();
            setStocks(stocksData.data);
            const productsData = await getAllProducts();
            setProducts(productsData.data);
            setCartItems(getDefaultCart(productsData.data));
            const homeBannerUrl = await getHomeBanner();
            setHomeBanners(homeBannerUrl.data.sildesUrl);
            const categoryBannerUrl = await getCategoryBanner();
            setCategoryBanners(categoryBannerUrl.data.sildesUrl);
            const seasonalBannerUrl = await getSeasonalBanner();
            setSeasonalBanners(seasonalBannerUrl.data.sildesUrl);
            console.log("Products:", productsData.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        };
        fetchData();
    }, []);

    const getProductById = (id) => {
        const product = allProducts.find((product) => product.id === id);
        return product ? product : null;
    };

    const getStockById = (id) => {
        console.log("getStockById called with id:", id);
        console.log("All Stocks:", allStocks);
        const stock = allStocks.find((stock) => stock.item_id === parseInt(id));
        console.log("Found Stock:", stock);
        return stock ? stock : null;
    };

    const addToCart = (itemId, itemName, waxType, fragranceType, color, fragrance, total) => {
        setCartItems((prev) => {
            console.log("Adding to cart:",prev)
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
        setCartTotal,
        allProducts,
        allStocks,
        homeBanners,
        categoryBanners,
        seasonalBanners,
        getProductById,
        getStockById
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
