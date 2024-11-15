import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/Icons/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { ready_made_products } = useContext(ShopContext);

  // Check if there are no products to display
  if (ready_made_products.length === 0) {
    return (
      <div className="shopcategory-noProducts">
        <p>No products available</p>
      </div>
    );
  }

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
          // Display seasonal products
          if (item.seasonal === true) {
            return (
              <Item key={i} id={item.id} name={item.name} scent={item.scent} image={item.image} secondImage={item.secondImage} stock={item.stock} waxtype={item.waxtype} fragrancetype={item.fragrancetype} color={item.product_color} old_price={item.old_price} new_price={item.new_price} />
            );
          }
          // Display products based on category prop
          else if (item.category === props.category) {
            return (
              <Item key={i} id={item.id} name={item.name} scent={item.scent} image={item.image} secondImage={item.secondImage} stock={item.stock} waxtype={item.waxtype} fragrancetype={item.fragrancetype} color={item.product_color} old_price={item.old_price} new_price={item.new_price} />
            );
          }
          return null; // Return null if no condition is met
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
}

export default ShopCategory;
