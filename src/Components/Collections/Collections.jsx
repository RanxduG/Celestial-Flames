import React from 'react';
import './Collections.css';

const Collections = (props) => {

  return (
    <div className='Collection'>
      <img src={props.image} alt="" />
      <p>{props.name}</p>

    </div>
  );
}

export default Collections;