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
        <img src={props.image} alt={props.name} />
        <p>{props.name}</p>
{/*         <div className='hover-details'> */}
{/*             {props.total === 0 ? 'Collection Not Released' : `Total Products Released: ${props.total}`} */}
{/*         </div> */}
      </div>
    </Link>
  );
}

export default Collections;
