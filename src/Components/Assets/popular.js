import tower from './Tower.jpg';
import celestialglow from './Celestial Glow 2.jpg';
import cementchic from './Cement Chic 2.jpg';
import bubble_candles from './Wobbly and cloud nine.jpg';

let data_product = [
    {
        id: 'CLSC-001',
        category: 'Classic Collection',
        name: 'Tower',
        image: tower,
        description: 'Elevate your ambiance with our 12cm tall Tower candle, featuring custom molds for a personalized touch. This elegant candle adds sophistication to any space and offers 10 hours of burn time for moments of tranquility and inspiration.',
        dimensions: '12cm x 5cm x 5cm',
        soy_price : 2500,
        half_n_half_price: 2300,
        paraffin_price: 2100

    },
    {
        id: 'CC2024017',
        category: 'Crystal Collection',
        name: 'Celestial Glow',
        image: celestialglow,
        description: ' A 9cm tall and 7.2cm wide candle in a sleek glass container. With 18-20 hours burn time. Choose from various colors, wax types, and scents for a personalized experience. Let your space shine with celestial charm.', 
        dimensions: '9cm x 7.2cm x 7.2cm',
        soy_price: 2600,
        half_n_half_price: 2200,
        paraffin_price: 1800
    },
    {
        id: 'CMT-001',
        name: 'Cement Chic',
        image: cementchic,
        old_price: 3000,
        new_price: 2500
    },
    {
        id: 'CLSC-004',
        name: 'Bubble Candles',
        image: bubble_candles,
        old_price: 2500,
        new_price: 2000
    }
]

export default data_product;