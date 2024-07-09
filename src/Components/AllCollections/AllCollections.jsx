import React from 'react';
import './AllCollections.css';
import all_collection from '../Assets/Data/collections.js';
import Collections from '../Collections/Collections.jsx';
const NewCollections = () => {

  return (
    <div className='new-collections'>
        <h1>ALL COLLECTIONS</h1>
        <hr />
        <div className='collections'>
            {all_collection.map((item, i) => {
                return <Collections key={i} id={item.id} name={item.name} image={item.image} total={item.total}/>
            })}
        </div>
    </div>
  );
}

export default NewCollections;