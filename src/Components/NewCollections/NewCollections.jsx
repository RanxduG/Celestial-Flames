import React from 'react';
import './NewCollections.css';
import new_collection from '../Assets/new_collection.js';
import Collections from '../Collections/Collections';
const NewCollections = () => {

  return (
    <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className='collections'>
            {new_collection.map((item, i) => {
                return <Collections key={i} id={item.id} name={item.name} image={item.image}/>
            })}
        </div>
    </div>
  );
}

export default NewCollections;