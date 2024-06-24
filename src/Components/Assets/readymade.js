import tower from './Tower 2.jpg';
import cubist_candle from './Cubist Candle 5.jpg';
import twirlling_hearts from './Twirlling hearts 3.jpg';
import Cloud_nine from './Cloud nine.jpg';
import Wobbly from './Wobbly.jpg';
import Xmas_tree from './Xmas tree 2.jpg';
import Hexa_light from './Hexa Light Editted.jpg';
import Hexa_lght_pink from './Pink Hexa Light.jpg';
import Hexa_lght_blue from './Blue Hexa Light.jpg';
import Hexa_lght_green from './Purple Hexa Light.jpg';
import Pine_cone from './Pine cone.jpg';
import Baby_bear from './Baby bear 2.jpg';
import celestialglow from './Celestial Glow 2.jpg';
import cementchic from './Cement Chic 2.jpg';
import celestialglowsecond from './Celestial Glow second.jpg';
import cementchicsecond from './Cement Chic second.jpg';
import towersecond from './Tower 2.jpg';
import cubistcandlesecond from './Cubist Candle 5.jpg';
import twirlling_hearts_second from './Twirlling Hearts second.jpg';
import Cloud_nine_second from './Cloud nine.jpg';
import Xmas_tree_second from './Xmas tree 2.jpg';
import Hexa_lght_second from './Pink Hexa Light.jpg';
import Pine_cone_second from './Pine cone.jpg';
import Baby_bear_second from './Baby bear 2.jpg';
import Wobbly_second from './Wobbly.jpg';


let ready_made = [
    {
        id: 'CLC2024004',
        item_id: 1,
        category: 'Classic Collection',
        name: 'Tower',
        scent: 'Unscented',
        stock: 10,
        image: tower,
        secondImage: towersecond,
        waxtype: 'Soy Wax',
        fragrancetype: 'None',
        description: 'Elevate your ambiance with our 12cm tall Tower candle, featuring custom molds for a personalized touch. Made from Soy Wax and Unscented, this elegant candle adds sophistication to any space and offers 10 hours of burn time for moments of tranquility and inspiration.',
        dimensions: '12cm x 5cm x 5cm',
        new_price: 2800,
        old_price: 3000,
        color_id: '#FFFFFF',
        product_color: 'White',
        popular: true,
        tags: ['tower', 'candle', 'classic']

    },
    {
        id: 'CLC2024031',
        item_id: 2,
        category: 'Classic Collection',
        name: 'Cubist Candle',
        scent: 'Coffee scented',
        stock: 8,
        image: cubist_candle,
        secondImage: cubistcandlesecond,
        waxtype: 'Paraffin Wax',
        fragrancetype: 'Fragrance',
        description: 'Our Cubist candle is a smaller version of the Tower candle. Made from Paraffin Wax and Coffee scented, it measures 8.5cm in height and 5cm in width, offering contemporary elegance with a 7-hour burn time for moments of serenity.',
        dimensions: '8.5cm x 5cm x 5cm',
        new_price: 1800,
        old_price: 2000,
        color_id: '#FFFFFF',
        product_color: 'white',
        popular: false,
        tags: ['cubist', 'candle', 'tower']

    },
    {
        id: 'CLC2024020',
        item_id: 3,
        category: 'Classic Collection',
        seasonal: true,
        name: 'Twirling Hearts',
        scent: 'Vanilla scented',
        stock: 0,
        image: twirlling_hearts,
        secondImage: twirlling_hearts_second,
        waxtype: 'Soy Wax',
        fragrancetype: 'Essential Oil',
        description: 'Twirling Hearts, a 4.5cm tall and 5cm wide candle, featuring a heart-shaped design. Made from Soy Wax and Vanilla scented with Essential Oil, this candle offers 3 hours of burn time, creating a romantic ambiance for special occasions and intimate moments.',
        dimensions: '4.5cm x 5cm x 5cm',
        new_price: 1000,
        old_price: 1150,
        color_id: '#FFFFFF',
        product_color: 'white',
        popular: false,
        tags: ['twirling', 'hearts', 'candle']
    },
    {
        id: 'CLC2024002',
        item_id: 4,
        category: 'Classic Collection',
        name: 'Cloud Nine',
        scent: 'Vanilla scented',
        stock: 5,
        image: Cloud_nine,
        secondImage: Cloud_nine_second,
        waxtype: 'Soy Wax',
        fragrancetype: 'Essential Oil',
        description: 'Cloud Nine, a 3x3 cube candle measuring 5.5cm in height and 5.6cm in width, providing 5-6 hours of burn time for a serene experience. Made from Soy Wax and Vanilla scented with Essential Oil.',
        dimensions: '5.5cm x 5.6cm x 5.6cm',
        new_price: 1800,
        old_price: 2000,
        color_id: '#FFFFFF',
        product_color: 'white',
        popular: false,
        tags: ['cloud', 'nine', 'candle']
    },
    {
        id: 'CLC2024016',
        item_id: 5,
        category: 'Classic Collection',
        seasonal: true,
        name: 'Xmas Tree',
        scent: 'Vanilla scented',
        stock: 3,
        image: Xmas_tree,
        secondImage: Xmas_tree_second,
        waxtype: 'Paraffin Wax',
        fragrancetype: 'Essential Oil',
        description: 'Introducing the X-mas Tree candle, shaped like a festive Christmas tree, measuring 9.5-10cm in height and 4.5cm in width. Made from Paraffin Wax and Vanilla scented with Essential Oil, this dual-purpose candle and ornament offers a 30-minute burn time, creating a cozy holiday atmosphere.',
        dimensions: '9.5cm x 4.5cm x 4.5cm',
        new_price: 750,
        old_price: 1000,
        popular: false,
        color_id: '#FFFFFF',
        product_color: 'white',
        tags: ['xmas', 'tree', 'candle']
    },
    {
        id: 'CLC2024022',
        item_id: 6,
        category: 'Classic Collection',
        name: 'Hexa Light',
        scent: 'Unscented',
        stock: 7,
        image: Hexa_light,
        secondImage: Hexa_lght_second,
        waxtype: 'Soy Wax',
        fragrancetype: 'None',
        other_images: [Hexa_lght_pink, Hexa_lght_blue, Hexa_lght_green],
        description: 'Our Hexa Light candle, featuring a unique rhombohedral shape. Made from Soy Wax and Unscented, measuring 5cm in height and 6cm in width, this candle offers 3 hours of burn time, creating a radiant glow for moments of tranquility and beauty.',
        dimensions: '5cm x 6cm x 6cm',
        new_price: 1000,
        old_price: 1150,
        color_id: '#FFFFFF',
        product_color: 'white',
        popular: true,
        tags: ['hexa', 'light', 'candle']
    },
    {
        id: 'CLC2024027',
        item_id: 7,
        seasonal: true,
        category: 'Classic Collection',
        name: 'Pine Cone',
        scent: 'Coffee scented',
        stock: 2,
        image: Pine_cone,
        secondImage: Pine_cone_second,
        waxtype: 'Paraffin Wax',
        fragrancetype: 'Fragrance',
        description: 'Our Pine Cone candle, shaped like a charming pine cone. Made from Paraffin Wax and Coffee scented, measuring 7cm in height and 5.5cm in width. Enjoy 4 hours of burn time, creating a cozy atmosphere for festive celebrations and memorable moments.',
        dimensions: '7cm x 5.5cm x 5.5cm',
        new_price: 850,
        old_price: 1000,
        color_id: '#FFFFFF',
        product_color: 'white',
        popular: false,
        tags: ['pine', 'cone', 'candle']
    },
    {
        id: 'CLC2024023',
        item_id: 8,
        category: 'Classic Collection',
        seasonal: true,
        name: 'Baby Bear',
        scent: 'Cinnamon scented',
        stock: 1,
        image: Baby_bear,
        secondImage: Baby_bear_second,
        waxtype: 'Paraffin Wax',
        fragrancetype: 'Fragrance',
        description: 'The Baby Bear candle is an adorable gift, measuring 4.5cm in height and 3cm in width, emitting a warm glow when lit. Made from Paraffin Wax and Cinnamon scented, it burns for 10-15 minutes, providing a cozy and charming experience.',
        dimensions: '4.5cm x 3cm x 3cm',
        new_price: 300,
        old_price: 500,
        color_id: '#FFFFFF',
        product_color: 'white',
        popular: false,
        tags: ['baby', 'bear', 'candle']

    },
    {
        id: 'CLC2024001',
        item_id: 9,
        category: 'Classic Collection',
        name: 'Wobbly',
        scent: 'Cinnamon scented',
        stock: 6,
        image: Wobbly,
        secondImage: Wobbly_second,
        waxtype: 'Soy Wax',
        fragrancetype: 'Fragrance',
        description: 'Introducing Wobbly, a 2x2 cube candle with a 2-3 hour burn time for a playful touch. Made from Soy Wax and Cinnamon scented.',
        dimensions: '2cm x 2cm x 2cm',
        new_price: 500,
        old_price: 650,
        color_id: '#FFFFFF',
        product_color: 'white',
        popular: false,
        tags: ['wobbly', 'candle', 'classic']
    },
    {
        id: 'CC2024017',
        item_id: 10,
        category: 'Crystal Collection',
        name: 'Celestial Glow',
        scent: 'Coffee scented',
        stock: 4,
        image: celestialglow,
        secondImage: celestialglowsecond,
        waxtype: 'Soy Wax',
        fragrancetype: 'Fragrance',
        description: 'A 9cm tall and 7.2cm wide candle in a sleek glass container. Made from Soy Wax and Coffee scented, with 18-20 hours burn time. Choose from various colors, wax types, and scents for a personalized experience. Let your space shine with celestial charm.',
        dimensions: '9cm x 7.2cm x 7.2cm',
        new_price: 2600,
        old_price: 2800,
        color_id: '#FFFFFF',
        product_color: 'white',
        popular: true,
        tags: ['celestial', 'glow', 'candle']
    },
    {
        id: 'EC2024023',
        item_id: 11,
        category: 'Elemental Collection',
        name: 'Cement Chic',
        scent: 'Cinnamon scented',
        stock: 3,
        image: cementchic,
        secondImage: cementchicsecond,
        waxtype: 'Soy Wax',
        fragrancetype: 'Fragrance',
        description: 'Experience urban elegance with the Cement Chic candle, a 7.5cm tall contemporary masterpiece in a handcrafted cement container. Made from Soy Wax and Cinnamon scented, enjoy 18-20 hours of burn time, adding sophistication and fragrance to any space.',
        dimensions: '7.5cm x 7.5cm x 7.5cm',
        new_price: 3000,
        old_price: 3200,
        color_id: '#FFFFFF',
        product_color: 'white',
        popular: true,
        tags: ['cement', 'chic', 'candle']
    }

]

export default ready_made;
