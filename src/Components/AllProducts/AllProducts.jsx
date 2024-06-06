import React, {useContext} from 'react';
import './AllProducts.css';
import Item from '../Item/Item';
import {ShopContext} from '../../Context/ShopContext';
import { Link } from 'react-router-dom';

const AllProducts = () => {
  const {all_product} = useContext(ShopContext);
  return (
    <div className='all-products'>
      <h1>ALL PRODUCTS</h1>
      <hr />
      
      <div className="p-wrapper">
        <Link to={'/Classic Collection'}><div className='linkbar'>
          Classic Collection
        </div></Link>
      </div>
      <div className='collection'>
        {all_product.map((item, i) => {
            if ('Classic Collection' === item.category) {
              return (
                <Item 
                key={i} 
                id={item.id} 
                name={item.name} 
                image={item.image} 
                secondImage={item.secondImage}/>
              );
            }
            return null;
          })}
      </div>
      
      <div className="p-wrapper">
        <Link to={'/Crystal Collection'}><div className='linkbar'>
          Crystal Collection
        </div></Link>
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
                    secondImage={item.secondImage}
                  />
                );
              }
              return null;
            })}
      </div>
      
      <div className="p-wrapper">
        <Link to={'/Elemental Collection'}><div className='linkbar'>
          Elemental Collection
        </div></Link>
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
                    secondImage={item.secondImage}
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
