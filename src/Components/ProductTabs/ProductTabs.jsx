import React, { useState, useContext } from 'react';
import './ProductTabs.css';
import { FiStar, FiUser, FiCalendar, FiMessageSquare } from 'react-icons/fi';
import { ShopContext } from '../../Context/ShopContext';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');
  const { allProducts } = useContext(ShopContext);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="product-tabs">
      <div className="tabs-header">
        <button 
          className={activeTab === 'description' ? 'active' : ''}
          onClick={() => handleTabClick('description')}
        >
          Description
        </button>
        <button 
          className={activeTab === 'details' ? 'active' : ''}
          onClick={() => handleTabClick('details')}
        >
          Additional Information
        </button>
      </div>
      
      <div className="tabs-content">
        {activeTab === 'description' && (
          <div className="tab-description">
            <h3>Product Description</h3>
            <p>{product.description}</p>
            <div className="description-features">
              <div className="feature">
                <div className="feature-icon">🌿</div>
                <div className="feature-content">
                  <h4>Pure Soy Wax</h4>
                  <p>Our candles are made with pure soy wax, a natural and sustainable alternative to paraffin.</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">🌸</div>
                <div className="feature-content">
                  <h4>Premium Fragrance</h4>
                  <p>Each candle is infused with premium quality fragrance oils for a long-lasting scent.</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">🌟</div>
                <div className="feature-content">
                  <h4>Hand-Crafted</h4>
                  <p>Every candle is carefully hand-poured and crafted with attention to detail.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'details' && (
          <div className="tab-details">
            <h3>Product Specifications</h3>
            <table className="specifications-table">
              <tbody>
                <tr>
                  <td>Wax Type</td>
                  <td>{product.waxtype || 'Soy Wax'}</td>
                </tr>
                <tr>
                  <td>Scent</td>
                  <td>{product.scent || 'Select from above'}</td>
                </tr>
                <tr>
                  <td>Color</td>
                  <td>{product.color || 'Natural'}</td>
                </tr>
                <tr>
                  <td>Dimensions</td>
                  <td>{product.dimensions || 'Standard size'}</td>
                </tr>
                <tr>
                  <td>Burn Time</td>
                  <td>{product.burntime}</td>
                </tr>
                <tr>
                  <td>Material</td>
                  <td>Glass container, cotton wick</td>
                </tr>
                <tr>
                  <td>Collection</td>
                  <td>{product.collection || 'Standard Collection'}</td>
                </tr>
              </tbody>
            </table>
            
            <div className="care-instructions">
              <h3>Care Instructions</h3>
              <ul>
                <li>Trim the wick to 1/4 inch before each lighting</li>
                <li>Burn for 2-3 hours on first use to ensure even melting</li>
                <li>Keep away from drafts to prevent uneven burning</li>
                <li>Discontinue use when 1/2 inch of wax remains</li>
                <li>Keep out of reach of children and pets</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;