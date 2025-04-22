import React, { useContext } from 'react';
import './CatalogItems.css';
import { ShopContext } from '../../Context/ShopContext';
import { Link } from 'react-router-dom';

const CatalogItems = () => {
    const { allProducts } = useContext(ShopContext);

    // Ensure data is loaded before rendering
    if (!allProducts) {
        return <p>Loading products...</p>;
    }

    // Define Categories
    const categories = ['Mold Collection', 'Glass Collection', 'Tin Collection', 'Other'];

    // Define Seasonal Colors
    const seasonalColors = {
        Christmas: 'green',
        Valentine: 'red',
        Halloween: 'purple'
    };

    return (
        <div className='catalog'>
            <h1>Product Catalog</h1>
            {categories.map((category) => {
                // Filter products by category
                const categoryProducts = allProducts.filter(item => item.category === category);

                if (categoryProducts.length === 0) return null; // Skip if no products in category

                return (
                    <div key={category} className='category-section'>
                        <h2 className='category-title'>{category}</h2>
                        {categoryProducts.map((item, i) => {
                            const isEven = i % 2 === 0;
                            const seasonalColor = seasonalColors[item.season] || null;

                            return (
                                <div
                                    key={item.id}
                                    className={`catalog-item ${isEven ? 'left-align' : 'right-align'}`}
                                >
                                    <div className='catalog-product-image'>
                                        <img src={item.imageUrl} alt={item.name} />
                                    </div>
                                    <div className='catalog-product-details'>
                                        <p id='title'>
                                            {item.name}{' '}
                                            {item.season !== 'None' && (
                                                <span
                                                    style={{
                                                        color: seasonalColor,
                                                        fontSize: '0.8em',
                                                        marginLeft: '10px'
                                                    }}
                                                >
                                                    {item.season} Release
                                                </span>
                                            )}
                                        </p>
                                        <p>{item.description}</p>
                                        <Link to={`/product/${item.id}`}>
                                            <button onClick={() => window.scrollTo(0, 0)}>Customize</button>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default CatalogItems;
