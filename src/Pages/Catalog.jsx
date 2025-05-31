import React from 'react';
import CatalogItems from '../Components/CatalogItems/CatalogItems';
import './CSS/Catalog.css';
import { Link } from 'react-router-dom';

const Catalog = () => {
  return (
    <div className="catalog-page">
      <div className="catalog-banner">
        <div className="catalog-banner-content">
          <h1>Our Collection</h1>
          <p>Explore our range of handcrafted premium candles</p>
        </div>
      </div>
      
      <div className="product-breadcrumb">
        <Link to='/'><a>Home</a></Link> / <a className="active">Catalog</a>
      </div>
      
      <CatalogItems />
      
      <div className="catalog-cta-section">
        <div className="catalog-cta-content">
          <h2>Can't find what you're looking for?</h2>
          <p>Our expert artisans can create custom designs just for you.</p>
          <button className="create-custom-btn">Create Custom Candle</button>
        </div>
      </div>
    </div>
  );
}

export default Catalog;