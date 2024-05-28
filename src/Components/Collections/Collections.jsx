import React from 'react';
import './Collections.css';
import { Link } from 'react-router-dom';

const Collections = (props) => {

  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <Link to={`/${props.name}`} onClick={handleClick} className='Collection'>
      <div className='Collection'>
        <img src={props.image} alt="" />
        <p>{props.name}</p>
      </div>
    </Link>
    
  );
}

export default Collections;