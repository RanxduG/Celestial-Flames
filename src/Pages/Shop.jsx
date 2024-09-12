import React from 'react';
import Hero from '../Components/Hero/Hero';
import Popular from '../Components/Popular/Popular';
import AllCollections from '../Components/AllCollections/AllCollections';
import AllProducts from '../Components/AllProducts/AllProducts';

const Shop = () => {

  return (
    <div>
      <Hero/>
      <Popular/>
      <AllCollections/>
      <AllProducts/>
    </div>
  );
}

export default Shop;