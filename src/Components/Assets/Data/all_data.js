import tower from '../Good/Tower/Tower 2.jpg';
import cubist_candle from '../Good/Cubist Candle/Cubist Candle 5.jpg';
import twirlling_hearts from '../Good/Twirling Hearts/Twirlling hearts 3.jpg';
import Cloud_nine from '../Good/Cloud Nine/Cloud nine.jpg';
import Cloud_nine_image from '../Good/Cloud Nine/Cloud nine image.jpg';
import Cloud_nine_background from '../Good/Cloud Nine/Cloud nine background.jpg';
import Wobbly from '../Good/Wobbly/Wobbly.jpg';
import Xmas_tree from '../Good/X-mas Tree/Xmas tree 2.jpg';
import Hexa_light from '../Good/Hexa Light/Hexa Light Editted.jpg';
import Hexa_light_img_1 from '../Good/Hexa Light/Hexa Light candle greyscaled.jpg';
import Hexa_lght_img_2 from '../Good/Hexa Light/Hexa Light candle removed.jpg';
// import Hexa_lght_pink from '../Good/Hexa Light/Pink Hexa Light.jpg';
// import Hexa_lght_blue from '../Good/Hexa Light/Blue Hexa Light.jpg';
// import Hexa_lght_green from '../Good/Hexa Light/Purple Hexa Light.jpg';
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


let all_data = [
    {
        id: 'CLC2024004',
        category: 'Classic Collection',
        name: 'Tower',
        image: tower,
        secondImage: towersecond,
        description: 'Elevate your ambiance with our 12cm tall Tower candle, featuring custom molds for a personalized touch. This elegant candle adds sophistication to any space and offers 10 hours of burn time for moments of tranquility and inspiration.',
        dimensions: '12cm x 5cm x 5cm',
        soy_price : 2500,
        paraffin_price: 2100,
        popular: true,
        tags: ['tower', 'candle', 'classic']

    },
    {
        id: 'CLC2024031',
        category: 'Classic Collection',
        name: 'Cubist Candle',
        image: cubist_candle,
        secondImage: cubistcandlesecond,
        description: 'Our Cubist candle is a smaller version of the Tower candle. It measures 8.5cm in height and 5cm in width, offering contemporary elegance with a 7-hour burn time for moments of serenity. ',
        dimensions: '8.5cm x 5cm x 5cm',
        soy_price: 2000,
        paraffin_price: 1800,
        popular: false,
        tags: ['cubist', 'candle', 'tower']

    },
    {
        id: 'CLC2024020',
        category: 'Classic Collection',
        name: 'Twirling Hearts',
        image: twirlling_hearts,
        secondImage: twirlling_hearts_second,
        description: 'Rekindle passion with the Twirling Hearts candle, a symbol of love measuring 4.5cm x 5cm. Burn time of 2 hours for intimate moments and celebrating love.',
        dimensions: '4.5cm x 5cm x 5cm',
        soy_price: 1000,
        paraffin_price: 750,
        popular: false,
        tags: ['twirling', 'hearts', 'candle']
    },
    {
        id: 'CLC2024002',
        category: 'Classic Collection',
        name: 'Cloud Nine',
        image: Cloud_nine,
        img_1: Cloud_nine_image,
        img_2: Cloud_nine_background,
        secondImage: Cloud_nine_second,
        description: 'Cloud Nine, a 3x3 cube candle measuring 5.5cm in height and 5.6cm in width, providing 5-6 hours of burn time for a serene experience.',
        dimensions: '5.5cm x 5.6cm x 5.6cm',
        soy_price: 1800,
        paraffin_price: 1500,
        popular: false,
        tags: ['cloud', 'nine', 'candle']
    },
    {
        id: 'CLC2024016',
        category: 'Seasonal Collection',
        name: 'Xmas Tree',
        image: Xmas_tree,
        secondImage: Xmas_tree_second,
        description: 'Introducing the X-mas Tree candle, shaped like a festive Christmas tree, measuring 9.5-10cm in height and 4.5cm in width. This dual-purpose candle and ornament offers a 30-minute burn time, creating a cozy holiday atmosphere.',
        dimensions: '9.5cm x 4.5cm x 4.5cm',
        soy_price: 1000,
        paraffin_price: 750,
        popular: false,
        tags: ['xmas', 'tree', 'candle']
    },
    {
        id: 'CLC2024022',
        category: 'Classic Collection',
        name: 'Hexa Light',
        image: Hexa_light,
        img_1: Hexa_light_img_1,
        img_2: Hexa_lght_img_2,
        description: 'Our Hexa Light candle, featuring a unique rhombohedral shape. Measuring 5cm in height and 6cm in width, this candle offers 3 hours of burn time, creating a radiant glow for moments of tranquility and beauty.',
        dimensions: '5cm x 6cm x 6cm',
        soy_price: 1000,
        paraffin_price: 850,
        popular: true,
        tags: ['hexa', 'light', 'candle']
    },
    {
        id: 'CLC2024027',
        category: 'Classic Collection',
        name: 'Pine Cone',
        image: Pine_cone,
        secondImage: Pine_cone_second,
        description: 'Our Pine Cone candle, shaped like a charming pine cone. Measuring 7cm in height and 5.5cm in width. Enjoy 4 hours of burn time, creating a cozy atmosphere for festive celebrations and memorable moments.',
        dimensions: '7cm x 5.5cm x 5.5cm',
        soy_price: 1000,
        paraffin_price: 850,
        popular: false,
        tags: ['pine', 'cone', 'candle']
    },
    {
        id: 'CLC2024023',
        category: 'Classic Collection',
        name: 'Baby Bear',
        image: Baby_bear,
        secondImage: Baby_bear_second,
        description: 'The Baby Bear candle is an adorable gift, measuring 4.5cm in height and 3cm in width, emitting a warm glow when lit. It burns for 10-15 minutes, providing a cozy and charming experience.',
        dimensions: '4.5cm x 3cm x 3cm',
        soy_price: 500,
        paraffin_price: 300,
        popular: false,
        tags: ['baby', 'bear', 'candle']

    },
    {
        id: 'CLC2024001',
        category: 'Classic Collection',
        name: 'Wobbly',
        image: Wobbly,
        secondImage: Wobbly_second,
        description: 'Introducing Wobbly, a 2x2 cube candle with a 2-3 hour burn time for a playful touch, ',
        dimensions: '2cm x 2cm x 2cm',
        soy_price: 500,
        paraffin_price: 350,
        popular: false,
        tags: ['wobbly', 'candle', 'classic']
    },
    {
        id: 'CC2024017',
        category: 'Crystal Collection',
        name: 'Celestial Glow',
        image: celestialglow,
        secondImage: celestialglowsecond,
        description: ' A 9cm tall and 7.2cm wide candle in a sleek glass container. With 18-20 hours burn time. Choose from various colors, wax types, and scents for a personalized experience. Let your space shine with celestial charm.', 
        dimensions: '9cm x 7.2cm x 7.2cm',
        soy_price: 2600,
        paraffin_price: 1800,
        popular: true,
        tags: ['celestial', 'glow', 'candle']
    },
    {
        id: 'EC2024023',
        category: 'Elemental Collection',
        name: 'Cement Chic',
        image: cementchic,
        secondImage: cementchicsecond,
        description: 'Experience urban elegance with the Cement Chic candle, a 7.5cm tall contemporary masterpiece in a handcrafted cement container. Enjoy 18-20 hours of burn time, adding sophistication and fragrance to any space.',
        dimensions: '7.5cm x 7.5cm x 7.5cm',
        soy_price: 3000,
        paraffin_price: 2000,
        popular: true,
        tags: ['cement', 'chic', 'candle']
    }

]

export default all_data;