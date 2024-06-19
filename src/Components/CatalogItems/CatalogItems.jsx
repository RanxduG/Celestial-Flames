import React, { useContext } from 'react';
import './CatalogItems.css';
import { ShopContext } from '../../Context/ShopContext';
import { Link } from 'react-router-dom';

const CatalogItems = () => {
    const { all_products } = useContext(ShopContext);
    return (
        <div className='catalog'>
            <h1>Product Catalog</h1>
            {all_products.map((item, i) => {
                const isEven = i % 2 === 0;
                return (
                    
                    <div className={`catalog-item ${isEven ? 'left-align' : 'right-align'}`}>
                        <div className='catalog-product-image'>
                            <img src={item.image} alt={item.name} />
                        </div>
                        <div className='catalog-product-details'>
                            <p id='title'>{item.name}</p>
                            <p>{item.description}<br/><br/><br/></p>
                            <Link to={`/product/${item.id}`}><button>Select</button></Link>
                        </div>
                    </div>

                    
                );
            })}
        </div>
    );
}

export default CatalogItems;
