import React, {useContext} from 'react';
import './Popular.css';
// import data_products from '../Assets/popular';
import Item from '../Item/Item';
import {ShopContext} from '../../Context/ShopContext';
const Popular = () => {
  const {all_product} = useContext(ShopContext);

  return (
    <div className='popular'>
        <h1>MOST POPULAR PRODUCTS</h1>
        <hr />
        <div className="popular-item">
          {all_product.map((item, i) => {
              if (item.popular===true) {
                return (
                  <Item key={i} id={item.id} name={item.name} image={item.image} secondImage={item.secondImage} />
                );
              }
              return null;
            })}
        </div>
        
    </div>
  );
}

export default Popular;