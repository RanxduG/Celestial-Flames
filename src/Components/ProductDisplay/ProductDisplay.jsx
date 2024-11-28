import React, { useContext, useState, useEffect } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/Icons/star-icon.png';
import star_dull_icon from '../Assets/Icons/star-icon-dull.png';
import { ShopContext } from '../../Context/ShopContext'; // Adjust the import path as necessary

const pastelColors = [
    { name: 'Light Pink', code: '#FFB3BA' },
    { name: 'Peach', code: '#FFDFBA' },
    { name: 'Light Yellow', code: '#FFFFBA' },
    { name: 'Light Green', code: '#BAFFC9' },
    { name: 'Light Blue', code: '#BAE1FF' },
    { name: 'Lavender', code: '#E2C2FF' },
    { name: 'Pink', code: '#FF99C8' },
    { name: 'Beige', code: '#FCF6BD' },
    { name: 'Mint', code: '#D0F4DE' },
    { name: 'Sky Blue', code: '#A9DEF9' }
];

const ProductDisplay = (props) => {
    const { product, reviews } = props;
    const { addToCart } = useContext(ShopContext);

    const [selectedWaxType, setSelectedWaxType] = useState(null);
    const [selectedFragranceType, setSelectedFragranceType] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedColorName, setSelectedColorName] = useState(null);
    const [selectedFragrance, setSelectedFragrance] = useState(null);
    const [alertVisible, setAlertVisible] = useState(false);

    useEffect(() => {
        const color = document.querySelector('.color');
        if (color) {
            color.style.backgroundColor = selectedColor;
        }
    }, [selectedColor]);

    const handleWaxTypeChange = (waxType) => {
        setSelectedWaxType(waxType);
    };

    const handleFragranceTypeChange = (fragranceType) => {
        setSelectedFragranceType(fragranceType);
        setSelectedFragrance(null); // Reset fragrance when fragrance type changes
    };

    const handleColorChange = (color) => {
        setSelectedColor(color.code);
        setSelectedColorName(color.name);
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
            case 'Chemical1':
                return 50;
            case 'Essential Oil1':
                return 150;
            default:
                return 0;
        }
    };

    const getOptionClass = (selected, current) => {
        return selected === current ? 'option selected' : 'option';
    };

    const areAllOptionsSelected = () => {
        return selectedWaxType && selectedColor;
    };

    const handleAddToCart = () => {
        addToCart(product.id, product.name, selectedWaxType, selectedFragranceType, selectedColorName, selectedFragrance, getPrice() + getFragrancePrice());
        setAlertVisible(true);
        setTimeout(() => {
            setAlertVisible(false);
        }, 3000); // Hide the alert after 3 seconds
    };

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img">
                    <img className='img-1' src={product.img_1} alt="Product" />
                    <img className='img-2' src={product.img_2} alt="Product Background" />
                    <div className='color'></div>
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
                    <p>({reviews.length})</p>
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
                        {pastelColors.map(color => (
                            <div
                                key={color.code}
                                className={getOptionClass(selectedColor, color.code)}
                                style={{
                                backgroundColor: selectedColor === color.code ? color.code : 'white',
                                color: 'black'
                                 }}
                                onClick={() => handleColorChange(color)}
                            >
                                <span>{color.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-new">Rs. {getPrice() + getFragrancePrice()}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                        onClick={handleAddToCart}
                        disabled={!areAllOptionsSelected()}
                    >
                        Create Candle
                    </button>
                    {alertVisible && (
                        <div className="alert">
                            <p>Added to cart successfully!</p>
                        </div>
                    )}
                </div>
                <p className='productdisplay-right-category'><span>Category :</span> Crystal Collection, Celestial Glow</p>
            </div>

        </div>
    );
};

export default ProductDisplay;
