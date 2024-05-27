import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className='item'>
      <Link to={`/product/${props.id}`} onClick={handleClick}>
        <img src={props.image} alt="" />
      </Link>
      <p>{props.name}</p>
    </div>
  );
}

export default Item;
