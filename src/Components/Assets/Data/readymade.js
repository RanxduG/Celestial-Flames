import tower from '../Good/Tower/Tower 2.jpg';
import cubist_candle from '../Good/Cubist Candle/Cubist Candle 5.jpg';
import twirlling_hearts from '../Good/Twirling Hearts/Twirlling hearts 3.jpg';
import Cloud_nine from '../Good/Cloud Nine//Cloud nine.jpg';
import Wobbly from '../Good/Wobbly/Wobbly.jpg';
import Xmas_tree from '../Good/X-mas Tree/Xmas tree 2.jpg';
import Hexa_light from '../Good/Hexa Light/Hexa Light Editted.jpg';
import Hexa_lght_pink from '../Good/Hexa Light/Pink Hexa Light.jpg';
import Hexa_lght_blue from '../Good/Hexa Light/Blue Hexa Light.jpg';
import Hexa_lght_green from '../Good/Hexa Light/Purple Hexa Light.jpg';
import Pine_cone from '../Good/Pine Cone/Pine cone.jpg';
import Baby_bear from '../Good/Baby Bear/Baby bear 2.jpg';
import celestialglow from '../Good/Celestial Glow/Celestial Glow 2.jpg';
import cementchic from '../Good/Cement Chic/Cement Chic 2.jpg';
import celestialglowsecond from '../Good/Celestial Glow/Celestial Glow second.jpg';
import cementchicsecond from '../Good/Cement Chic/Cement Chic second.jpg';
import towersecond from '../Good/Tower/Tower 2.jpg';
import cubistcandlesecond from '../Good/Cubist Candle/Cubist Candle 5.jpg';
import twirlling_hearts_second from '../Good/Twirling Hearts/Twirlling Hearts second.jpg';
import Cloud_nine_second from '../Good/Cloud Nine/Cloud nine.jpg';
import Xmas_tree_second from '../Good/X-mas Tree/Xmas tree 2.jpg';
import Hexa_lght_second from '../Good/Hexa Light/Pink Hexa Light.jpg';
import Pine_cone_second from '../Good/Pine Cone/Pine cone.jpg';
import Baby_bear_second from '../Good/Baby Bear/Baby bear 2.jpg';
import Wobbly_second from '../Good/Wobbly/Wobbly.jpg';
import miniGlow from '../Good/Gentle Glow/Gentle Glow.jpg';

let ready_made = [
    {
        id: 'CLC2024004',
        item_id: 1,
        category: 'Classic Collection',
        name: 'Tower',
        scent: 'Unscented',
        stock: 5,
        image: tower,
        secondImage: towersecond,
        waxtype: 'Soy Wax',
        fragrancetype: 'None',
        description: 'Elevate your ambiance with our 12cm tall Tower candle, featuring custom molds for a personalized touch. Made from Soy Wax and Unscented, this elegant candle adds sophistication to any space and offers 10 hours of burn time for moments of tranquility and inspiration.',
        dimensions: '12cm x 6cm',
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
        dimensions: '8.5cm x 5cm',
        new_price: 1800,
        old_price: 2000,
        color_id: '#FFFFFF',
        product_color: 'White',
        popular: false,
        tags: ['cubist', 'candle', 'tower']
    },
    {
        id: 'CLC2024005',
        item_id: 3,
        category: 'Classic Collection',
        name: 'Twirling Hearts',
        scent: 'Vanilla scented',
        stock: 3,
        image: twirlling_hearts,
        secondImage: twirlling_hearts_second,
        waxtype: 'Soy Wax',
        fragrancetype: 'Essential Oil',
        description: 'Rekindle passion with the Twirling Hearts candle, a symbol of love measuring 4.5cm x 5cm. Made from Soy Wax and Vanilla scented, this candle offers 2 hours of burn time for intimate moments and celebrating love.',
        dimensions: '4.5cm x 5cm',
        new_price: 850,
        old_price: 1000,
        color_id: '#FFFFFF',
        product_color: 'White',
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
        dimensions: '5.5cm x 5.6cm',
        new_price: 1800,
        old_price: 2000,
        color_id: '#FFFFFF',
        product_color: 'White',
        popular: false,
        tags: ['cloud', 'nine', 'candle']
    },
    {
        id: 'CLC2024016',
        item_id: 5,
        category: 'Classic Collection',
        name: 'Xmas Tree',
        scent: 'Vanilla scented',
        stock: 3,
        image: Xmas_tree,
        secondImage: Xmas_tree_second,
        waxtype: 'Paraffin Wax',
        fragrancetype: 'Essential Oil',
        description: 'Introducing the X-mas Tree candle, shaped like a festive Christmas tree, measuring 9.5-10cm in height and 4.5cm in width. Made from Paraffin Wax and Vanilla scented with Essential Oil, this dual-purpose candle and ornament offers a 30-minute burn time, creating a cozy holiday atmosphere.',
        dimensions: '9.5cm x 4.5cm',
        new_price: 750,
        old_price: 1000,
        color_id: '#FFFFFF',
        product_color: 'White',
        popular: false,
        tags: ['xmas', 'tree', 'candle']
    },
    {
        id: 'CC2024017',
        item_id: 6,
        category: 'Crystal Collection',
        name: 'Celestial Glow',
        scent: 'Coffee scented',
        stock: 4,
        image: celestialglow,
        secondImage: celestialglowsecond,
        waxtype: 'Soy Wax',
        fragrancetype: 'Fragrance',
        description: 'A 9cm tall and 7.2cm wide candle in a sleek glass container. Made from Soy Wax and Coffee scented, with 36-48 hours burn time. Choose from various colors, wax types, and scents for a personalized experience. Let your space shine with celestial charm.',
        dimensions: '9cm x 7.2cm',
        new_price: 2600,
        old_price: 2800,
        color_id: '#FFFFFF',
        product_color: 'White',
        popular: true,
        tags: ['celestial', 'glow', 'candle']
    }
];

export default ready_made;
