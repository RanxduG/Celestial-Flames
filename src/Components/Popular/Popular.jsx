import React, { useContext, useState, useEffect } from 'react';
import './Popular.css';
import Item from '../Item/Item';
import { ShopContext } from '../../Context/ShopContext';

const Popular = () => {
    const { ready_made_products } = useContext(ShopContext);
    const [loading, setLoading] = useState(true); // Loading state

    // Simulate a delay to represent fetching/loading data
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000); // Simulated 2s delay
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='popular'>
            <h1>MOST POPULAR PRODUCTS</h1>
            <hr />
            <div className="popular-item">
                {ready_made_products
                    .filter(item => item.popular)
                    .map((item) => (
                        <Item
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            scent={item.scent}
                            image={item.image}
                            secondImage={item.secondImage}
                            stock={item.stock}
                            waxtype={item.waxtype}
                            fragrancetype={item.fragrancetype}
                            color={item.product_color}
                            color_id={item.color_id}
                            old_price={item.old_price}
                            new_price={item.new_price}
                            loading={loading} // Pass the loading state here
                        />
                    ))}
            </div>
        </div>
    );
};

export default Popular;
