import React, {useContext} from 'react';
import './AllProducts.css';
import Item from '../Item/Item';
import {ShopContext} from '../../Context/ShopContext';

const AllProducts = () => {
  const {all_product} = useContext(ShopContext);
  return (
    <div className='all-products'>
      <h1>ALL PRODUCTS</h1>
      <hr />
      
      <div className="p-wrapper">
        <p>Classic Collection</p>
      </div>
      <div className='collection'>
        {all_product.map((item, i) => {
            if ('Classic Collection' === item.category) {
              return (
                <Item key={i} id={item.id} name={item.name} image={item.image}/>
              );
            }
            return null;
          })}
      </div>
      
      <div className="p-wrapper">
        <p>Crystal Collection</p>
      </div>
      <div className='collection'>
        {all_product.map((item, i) => {
              if ('Crystal Collection' === item.category) {
                return (
                  <Item
                    key={i}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                  />
                );
              }
              return null;
            })}
      </div>
      
      <div className="p-wrapper">
        <p>Elemental Collection</p>
      </div>
      <div className='collection'>
      {all_product.map((item, i) => {
              if ('Elemental Collection' === item.category) {
                return (
                  <Item
                    key={i}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                  />
                );
              }
              return null;
            })}
      </div>
    </div>
  );
}

export default AllProducts;
