import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star-icon.png';
import star_dull_icon from '../Assets/star-icon-dull.png';
import { ShopContext } from 'C:/Ranidu/Personal/Celestial_Flames_And_Candles_By_K/WebApp/frontend/src/Context/ShopContext.jsx';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);

    const [selectedWaxType, setSelectedWaxType] = useState(null);
    const [selectedFragranceType, setSelectedFragranceType] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedFragrance, setSelectedFragrance] = useState(null);

    const handleWaxTypeChange = (waxType) => {
        setSelectedWaxType(waxType);
    };
    const handleFragranceTypeChange = (fragranceType) => {
        setSelectedFragranceType(fragranceType);
        setSelectedFragrance(null); // Reset fragrance when fragrance type changes
    };
    const handleColorChange = (color) => {
        setSelectedColor(color);
    };
    const handleFragranceChange = (fragrance) => {
        setSelectedFragrance(fragrance);
    };

    const getPrice = () => {
        switch (selectedWaxType) {
            case 'Paraffin Wax':
                return product.paraffin_price;
            case 'Soy Wax':
                return product.soy_price;
            default:
                return product.paraffin_price;
        }
    };

    const getFragrancePrice = () => {
        switch (selectedFragranceType) {
            case 'Chemical':
                return 50;
            case 'Essential Oil':
                return 150;
            default:
                return 0;
        }
    };

    const getOptionClass = (selected, current) => {
        return selected === current ? 'option selected' : 'option';
    };

    const areAllOptionsSelected = () => {
        return selectedWaxType && selectedFragranceType && selectedColor && selectedFragrance;
    };

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt={product.name} />
                    {product.other_images && product.other_images.map((img, index) => (
                        <img key={index} src={img} alt={`${product.name} ${index + 1}`} />
                    ))}
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt={product.name} />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="star icon" />
                    <img src={star_icon} alt="star icon" />
                    <img src={star_icon} alt="star icon" />
                    <img src={star_icon} alt="star icon" />
                    <img src={star_dull_icon} alt="dull star icon" />
                    <p>122</p>
                </div>
                <div className="productdisplay-right-description">
                    {product.description}
                </div>
                <div className="productdisplay-right-feature">
                    <h1>Select Wax Type*</h1>
                    <div className="productdisplay-right-options">
                        <div className={getOptionClass(selectedWaxType, 'Paraffin Wax')} onClick={() => handleWaxTypeChange('Paraffin Wax')}>Paraffin Wax</div>
                        <div className={getOptionClass(selectedWaxType, 'Soy Wax')} onClick={() => handleWaxTypeChange('Soy Wax')}>Soy Wax</div>
                    </div>
                </div>
                <div className="productdisplay-right-feature">
                    <h1>Select Fragrance Type*</h1>
                    <div className="productdisplay-right-options">
                        <div className={getOptionClass(selectedFragranceType, 'Chemical')} onClick={() => handleFragranceTypeChange('Chemical')}>Chemical Fragrance</div>
                        <div className={getOptionClass(selectedFragranceType, 'Essential Oil')} onClick={() => handleFragranceTypeChange('Essential Oil')}>Essential Oil</div>
                    </div>
                </div>
                {selectedFragranceType && (
                    <div className="productdisplay-right-feature">
                        <h1>Select Fragrance*</h1>
                        <div className="productdisplay-right-options">
                            {selectedFragranceType === 'Chemical' && (
                                <>
                                    <div className={getOptionClass(selectedFragrance, 'Jasmine')} onClick={() => handleFragranceChange('Jasmine')}>Jasmine</div>
                                    <div className={getOptionClass(selectedFragrance, 'Visible')} onClick={() => handleFragranceChange('Visible')}>Visible</div>
                                    <div className={getOptionClass(selectedFragrance, 'Lavender')} onClick={() => handleFragranceChange('Lavender')}>Lavender</div>
                                    <div className={getOptionClass(selectedFragrance, 'Lemon lime')} onClick={() => handleFragranceChange('Lemon lime')}>Lemon lime</div>
                                    <div className={getOptionClass(selectedFragrance, 'Orchid and lotus')} onClick={() => handleFragranceChange('Orchid and lotus')}>Orchid and lotus</div>
                                    <div className={getOptionClass(selectedFragrance, 'Tutti Frutti')} onClick={() => handleFragranceChange('Tutti Frutti')}>Tutti Frutti</div>
                                    <div className={getOptionClass(selectedFragrance, 'Aquatic Lady')} onClick={() => handleFragranceChange('Aquatic Lady')}>Aquatic Lady</div>
                                    <div className={getOptionClass(selectedFragrance, 'Coffee')} onClick={() => handleFragranceChange('Coffee')}>Coffee</div>
                                </>
                            )}
                            {selectedFragranceType === 'Essential Oil' && (
                                <>
                                    <div className={getOptionClass(selectedFragrance, 'Cinnamon')} onClick={() => handleFragranceChange('Cinnamon')}>Cinnamon</div>
                                    <div className={getOptionClass(selectedFragrance, 'Vanilla')} onClick={() => handleFragranceChange('Vanilla')}>Vanilla</div>
                                    <div className={getOptionClass(selectedFragrance, 'Nina Ricci')} onClick={() => handleFragranceChange('Nina Ricci')}>Nina Ricci</div>
                                    <div className={getOptionClass(selectedFragrance, 'Apple')} onClick={() => handleFragranceChange('Apple')}>Apple</div>
                                    <div className={getOptionClass(selectedFragrance, 'Poise')} onClick={() => handleFragranceChange('Poise')}>Poise</div>
                                </>
                            )}
                        </div>
                    </div>
                )}
                <div className="productdisplay-right-feature">
                    <h1>Select Color</h1>
                    <div className="productdisplay-right-options">
                        <div className={getOptionClass(selectedColor, 'Red')} onClick={() => handleColorChange('Red')}>Red</div>
                        <div className={getOptionClass(selectedColor, 'Green')} onClick={() => handleColorChange('Green')}>Green</div>
                        <div className={getOptionClass(selectedColor, 'Blue')} onClick={() => handleColorChange('Blue')}>Blue</div>
                        <div className={getOptionClass(selectedColor, 'Yellow')} onClick={() => handleColorChange('Yellow')}>Yellow</div>
                    </div>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-new">Rs. {getPrice() + getFragrancePrice()}</div>
                </div>
                <button 
                    onClick={() => { addToCart(product.id, selectedWaxType, selectedFragranceType, selectedColor, selectedFragrance, getPrice() + getFragrancePrice()) }} 
                    disabled={!areAllOptionsSelected()}>
                    ADD TO CART
                </button>

                <p className='productdisplay-right-category'><span>Category :</span>Crystal Collection, Celestial Glow</p>
                <p className='productdisplay-right-category'><span>Tags :</span>Latest, Glass Candles</p>
            </div>
        </div>
    );
};

export default ProductDisplay;
