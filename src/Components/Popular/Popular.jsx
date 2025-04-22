import React, { useContext, useState, useEffect } from 'react';
import './Popular.css';
import Item from '../Item/Item';
import { ShopContext } from '../../Context/ShopContext';

const Popular = () => {
    const { allStocks, allProducts } = useContext(ShopContext);
    const [loading, setLoading] = useState(true); // Loading state    
    
      const getProductNameByStockId = (stockId) => {
        const correspondingProduct = allProducts.find((product) => product.id === stockId);
        return correspondingProduct ? correspondingProduct.name : null;
      }

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
                {allStocks
                    .filter(item => item.popular)
                    .map((item) => (
                        <Item
                            key={item.id}
                            id={item.id}
                            name={getProductNameByStockId(item.id)}
                            scent={item.scent}
                            image={item.imageUrl}
                            secondImage={item.secondImage}
                            stock={item.stock}
                            waxtype={item.waxtype}
                            fragrancetype={item.fragrancetype}
                            color={item.color}
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
