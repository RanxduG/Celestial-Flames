import React, { useState } from 'react';
import './DescriptionBox.css';

const DescriptionBox = (props) => {
    const { product, reviews } = props;
    const [activeTab, setActiveTab] = useState('description');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const get_username = (user_id) => {
        fetch(`http://localhost:5000/get_username/${user_id}`)
        .then(response => response.json())
        .then(data => {
            return data;
        });
    }

    return (
        <div className='descriptionbox'>
            <div className="descriptionbox-navigator">
                <div 
                    className={`descriptionbox-nav-box ${activeTab === 'description' ? '' : 'fade'}`} 
                    onClick={() => handleTabClick('description')}
                >
                    Description
                </div>
                <div 
                    className={`descriptionbox-nav-box ${activeTab === 'reviews' ? '' : 'fade'}`} 
                    onClick={() => handleTabClick('reviews')}
                >
                    Reviews ({reviews.length})
                </div>
            </div>
            <div className="descriptionbox-content">
                {activeTab === 'description' && (
                    <div className="descriptionbox-description">
                        <p>{product.description}</p>
                        <p>{product.dimensions}</p>
                    </div>
                )}
                {activeTab === 'reviews' && (
                    <div className="descriptionbox-reviews">
                        {reviews.map((review, index) => (
                            <div key={index} className="review">
                                <h4>{review.name}</h4>
                                <div className="review-rating">
                                    {Array.from({ length: review.rating }).map((_, i) => (
                                        <span key={i}>&#9733;</span>
                                    ))}
                                </div>
                                <p>{review.review}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DescriptionBox;
