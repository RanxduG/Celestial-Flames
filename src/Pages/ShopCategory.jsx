import React, { useContext, useEffect, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/Icons/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { allStocks, allProducts } = useContext(ShopContext);

  // Define seasonal categories
  const seasons = ['Valentines', 'Auvrurdu', 'Halloween', 'Christmas', 'Seasonal Collection'];

  const getProductCategoryByStockId = (stockId) => {
    const correspondingProduct = allProducts.find((product) => product.id === stockId);
    return correspondingProduct ? correspondingProduct.category : null;
  };
  const getProductNameByStockId = (stockId) => {
    const correspondingProduct = allProducts.find((product) => product.id === stockId);
    return correspondingProduct ? correspondingProduct.name : null;
  };
  // Filter products based on category
  const filteredProducts = allStocks.filter(
    (item) => getProductCategoryByStockId(item.id) === props.category || seasons.includes(item.season)
  );

  // Slideshow effect only for seasonal categories
  const isSeasonal = seasons.includes(props.category);
  const banners = props.banner; // Add more seasonal banners

  if (filteredProducts.length === 0) {
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
          <span>Showing {Math.min(12, filteredProducts.length)}</span> Out of {filteredProducts.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="dropdown icon" />
        </div>
      </div>

      <div className="shopcategory-products">
        {filteredProducts.slice(0, 12).map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={getProductNameByStockId(item.id)}
            scent={item.scent}
            image={item.imageUrl}
            secondImage={item.secondImageUrl}
            stock={item.stock}
            waxtype={item.waxtype}
            fragrancetype={item.fragrancetype}
            color={item.product_color}
            old_price={item.old_price}
            new_price={item.new_price}
          />
        ))}
      </div>

      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
}

export default ShopCategory;
