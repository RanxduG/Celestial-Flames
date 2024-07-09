import tower from './Good/Tower/Tower.jpg';
import celestialglow from './Good/Celestial Glow/Celestial Glow 2.jpg';
import cementchic from './Good/Cement Chic/Cement Chic 2.jpg';
import Hexa_light from './Good/Hexa Light/Hexa Light Editted.jpg';
import Hexa_lght_pink from './Good/Hexa Light/Pink Hexa Light.jpg';
import Hexa_lght_blue from './Good/Hexa Light/Blue Hexa Light.jpg';
import Hexa_lght_green from './Good/Hexa Light/Purple Hexa Light.jpg';

let data_product = [
    {
        id: 'CLC2024004',
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
        id: 'EC2024023',
        category: 'Elemental Collection',
        name: 'Cement Chic',
        image: cementchic,
        description: 'Experience urban elegance with the Cement Chic candle, a 7.5cm tall contemporary masterpiece in a handcrafted cement container. Enjoy 18-20 hours of burn time, adding sophistication and fragrance to any space.',
        dimensions: '7.5cm x 7.5cm x 7.5cm',
        soy_price: 3600,
        half_n_half_price: 2900,
        paraffin_price: 2500
    },
    {
        id: 'CLC2024022',
        category: 'Classic Collection',
        name: 'Hexa Light',
        image: Hexa_light,
        other_images: [Hexa_lght_pink, Hexa_lght_blue, Hexa_lght_green],
        description: 'Our Hexa Light candle, featuring a unique rhombohedral shape. Measuring 5cm in height and 6cm in width, this candle offers 3 hours of burn time, creating a radiant glow for moments of tranquility and beauty.',
        dimensions: '5cm x 6cm x 6cm',
        soy_price: 1000,
        half_n_half_price: 900,
        paraffin_price: 850
    }
]

export default data_product;