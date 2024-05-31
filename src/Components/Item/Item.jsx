import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    console.log(props),
    <div className='item'>
      <Link to={`/product/${props.id}`} onClick={handleClick}>
        <div className='image-container'>
          <img src={props.image} alt="" className='main-image'/>
          <img src={props.secondImage} alt="" className='hover-image'/>
        </div>
      </Link>
      <p>{props.name}</p>
    </div>
  );
}

export default Item;
