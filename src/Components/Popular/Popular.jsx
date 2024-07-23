import React, { useContext } from 'react';
import './Popular.css';
import Item from '../Item/Item';
import { ShopContext } from '../../Context/ShopContext';

const Popular = () => {
    const { ready_made_products } = useContext(ShopContext);

    return (
        <div className='popular'>
            <h1>MOST POPULAR PRODUCTS</h1>
            <hr />
            <div className="popular-item">
                {ready_made_products.map((item, i) => {
                    if (item.popular === true) {
                        return (
                            <Item key={i} id={item.id} name={item.name} scent={item.scent} image={item.image} secondImage={item.secondImage} stock={item.stock} waxtype={item.waxtype} fragrancetype={item.fragrancetype} color={item.product_color} color_id={item.color_id} old_price={item.old_price} new_price={item.new_price} />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}

export default Popular;
