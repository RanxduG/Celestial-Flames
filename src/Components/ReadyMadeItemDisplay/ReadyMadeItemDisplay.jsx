import React, { useContext, useState } from 'react';
import './ReadyMadeItemDisplay.css';
import star_icon from '../Assets/Icons/star-icon.png';
import star_dull_icon from '../Assets/Icons/star-icon-dull.png';
import { ShopContext } from '../../Context/ShopContext'; // Adjust the import path as necessary

const ReadyMadeItemDisplay = (props) => {
    const { product, reviews } = props;
    const { addToCart, allProducts } = useContext(ShopContext);
    const [alertVisible, setAlertVisible] = useState(false);

    const getProductDescriptionByStockId = (stockId) => {
        const correspondingProduct = allProducts.find((product) => product.id === stockId);
        return correspondingProduct ? correspondingProduct.description : null;
      };
    
    
      const getProductNameByStockId = (stockId) => {
        const correspondingProduct = allProducts.find((product) => product.id === stockId);
        return correspondingProduct ? correspondingProduct.name : null;
      }
    

    const handleAddToCart = () => {
        addToCart(product.id, product.name, product.waxtype, product.getFragranceType, product.color, product.scent, product.new_price, product.old_price);
        setAlertVisible(true);
        setTimeout(() => {
            setAlertVisible(false);
        }, 3000); // Hide the alert after 3 seconds
    };

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img">
                    <img src={product.imageUrl} alt="product" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{getProductNameByStockId(product.id)}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="star icon" />
                    <img src={star_icon} alt="star icon" />
                    <img src={star_icon} alt="star icon" />
                    <img src={star_icon} alt="star icon" />
                    <img src={star_dull_icon} alt="dull star icon" />
                    <p>({reviews.length})</p>
                </div>
                <div className="productdisplay-right-stock">
                    <p>Only {product.stock} remaining</p>
                </div>
                <div className="productdisplay-right-description">
                    {getProductDescriptionByStockId(product.id)}
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-new">Rs. {product.new_price}</div>
                    <div className="productdisplay-right-price-old">Rs. {product.old_price}</div>
                </div>
                <button onClick={handleAddToCart}>
                    ADD TO CART
                </button>

                <p className='productdisplay-right-category'><span>Category :</span> Crystal Collection, Celestial Glow</p>
            </div>
            {alertVisible && (
                <div className="alert">
                    <p>Added to cart successfully!</p>
                </div>
            )}
        </div>
    );
};

export default ReadyMadeItemDisplay;
