import React, { useState, useRef, useContext } from 'react';
import './Feedback.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import veryBadEmoji from '../Assets/Emojis/veryBad.png';
import badEmoji from '../Assets/Emojis/bad.png';
import goodEmoji from '../Assets/Emojis/good.png';
import veryGoodEmoji from '../Assets/Emojis/veryGood.png';
import excellentEmoji from '../Assets/Emojis/exellent.png';
import { ShopContext } from '../../Context/ShopContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);
  const form = useRef();
  const { userDetails } = useContext(ShopContext);
  const { productId } = useParams();
  const [formData, setFormData] = useState({
    name: userDetails?.name || '',
    email: userDetails?.email || '',
    comment: '',
  });

  const handleStarClick = (index) => {
    setRating(index + 1);
    const stars = document.getElementsByClassName('fas');
    const emoji = document.getElementById('emoji');
    const colors = ['red', 'red', 'red', 'red', 'red'];
    const translations = ['0px', '-100px', '-200px', '-300px', '-400px'];

    for (let i = 0; i < stars.length; i++) {
      stars[i].style.color = i <= index ? colors[i] : '#e4e4e4';
    }

    emoji.style.transform = `translateX(${translations[index]})`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.comment || !rating) {
      alert('Please fill in all required fields.');
      return;
    }

    const newReview = {
      user_id: userDetails.id,
      product_id: productId,
      review: formData.comment,
      rating: rating,
    };

    try {
      const response = await axios.post('http://localhost:5000/add_review', newReview);
      console.log('Review added:', response.data);

      // Show the success alert
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000); // Hide the alert after 3 seconds

      handleReset();
    } catch (error) {
      console.error('Error adding review:', error);
      alert('Error adding review');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      comment: '',
    });
    setRating(0);
    const stars = document.getElementsByClassName('fas');
    for (let i = 0; i < stars.length; i++) {
      stars[i].style.color = '#e4e4e4';
    }
    const emoji = document.getElementById('emoji');
    emoji.style.transform = 'translateX(-500px)';
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div>
      <div className="container">
        <form ref={form} onSubmit={handleSubmit}>
          <h3>FEEDBACK</h3>
          <div className="feedbackbox">
            <div className="emoji">
              <div id="emoji">
                <img src={veryBadEmoji} alt="Very Bad" />
                <img src={badEmoji} alt="Bad" />
                <img src={goodEmoji} alt="Good" />
                <img src={veryGoodEmoji} alt="Very Good" />
                <img src={excellentEmoji} alt="Excellent" />
              </div>
            </div>
            <div className="rating">
              {[...Array(5)].map((_, index) => (
                <i
                  key={index}
                  className="fas fa-star"
                  onClick={() => handleStarClick(index)}
                ></i>
              ))}
            </div>
          </div>
          <label>Message</label>
          <textarea name="message" id='comment' placeholder="Your message" value={formData.comment} onChange={handleChange} required />

          <div className="button-container">
            <button type="reset" id="reset" className="button" onClick={handleReset}>
              Reset
            </button>
            <button type="submit" id="submit" className="button">
              Send
            </button>
          </div>
        </form>
      </div>

      {alertVisible && (
        <div className="alert">
          Review submitted successfully!
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;