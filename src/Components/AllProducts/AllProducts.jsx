import React, {useContext} from 'react';
import './AllProducts.css';
import Item from '../Item/Item';
import {ShopContext} from '../../Context/ShopContext';
import { Link } from 'react-router-dom';

const AllProducts = () => {
  const {ready_made_products} = useContext(ShopContext);
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
        {ready_made_products.map((item, i) => {
            if ('Classic Collection' === item.category) {
              return (
                <Item key={i} id={item.id} name={item.name} scent={item.scent} image={item.image} secondImage={item.secondImage} stock={item.stock} waxtype={item.waxtype} fragrancetype={item.fragrancetype} color={item.product_color} old_price={item.old_price} new_price={item.new_price}/>
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
        {ready_made_products.map((item, i) => {
              if ('Crystal Collection' === item.category) {
                return (
                  <Item key={i} id={item.id} name={item.name} scent={item.scent} image={item.image} secondImage={item.secondImage} stock={item.stock} waxtype={item.waxtype} fragrancetype={item.fragrancetype} color={item.product_color} old_price={item.old_price} new_price={item.new_price}/>
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
      {ready_made_products.map((item, i) => {
              if ('Elemental Collection' === item.category) {
                return (
                  <Item key={i} id={item.id} name={item.name} scent={item.scent} image={item.image} secondImage={item.secondImage} stock={item.stock} waxtype={item.waxtype} fragrancetype={item.fragrancetype} color={item.product_color} old_price={item.old_price} new_price={item.new_price}/>
                );
              }
              return null;
            })}
      </div>
      <div className="create-candle-link">
        <h3>
          Couldn't Find Anything To Your Liking?<br/>
          We Got You!!<br/>
          <Link to={'/Catalog'}><button>Create The Candle You Want</button></Link>
        </h3>
      </div>
    </div>
  );
}

export default AllProducts;
