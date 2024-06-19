import React, {useContext} from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { ready_made_products } = useContext(ShopContext);

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> Out of {ready_made_products.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="dropdown icon" />
        </div>
      </div>
      <div className="shopcategory-products">
        {ready_made_products.map((item, i) => {
          if (item.seasonal === true) {
            return (
              <Item key={i} id={item.id} name={item.name} scent={item.scent} image={item.image} secondImage={item.secondImage} stock={item.stock} waxtype={item.waxtype} fragrancetype={item.fragrancetype} color={item.product_color} old_price={item.old_price} new_price={item.new_price}/>

            );
          }
          return null;
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
}

export default ShopCategory;
