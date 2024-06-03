import React, { useState } from 'react';
import './Feedback.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import veryBadEmoji from '../Assets/Emojis/veryBad.png';
import badEmoji from '../Assets/Emojis/bad.png';
import goodEmoji from '../Assets/Emojis/good.png';
import veryGoodEmoji from '../Assets/Emojis/veryGood.png';
import excellentEmoji from '../Assets/Emojis/exellent.png';

const FeedbackForm = () => {
  const [rating, setRating] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
  });

  const handleStarClick = (index) => {
    const colors = ['red', 'red', 'red', 'red', 'red'];
    const translations = ['0px', '-100px', '-200px', '-300px', '-400px'];
    const ratings = ['very bad', 'bad', 'good', 'very good', 'excellent'];
    
    setRating(ratings[index]);
    
    const stars = document.getElementsByClassName('fas');
    const emoji = document.getElementById('emoji');
    
    for (let i = 0; i < stars.length; i++) {
      stars[i].style.color = i <= index ? colors[i] : '#e4e4e4';
    }
    
    emoji.style.transform = `translateX(${translations[index]})`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, comment } = formData;
    
    if (!name || !comment || !rating || !email) {
      alert('Please fill in all the fields!');
    } else {
      alert(`Dear ${name}, Thank you very much for your feedback. You have rated our site as ${rating}, and your comment was ${comment}.`);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      comment: '',
    });
    setRating('');
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
        <form onSubmit={handleSubmit}>
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

          <input
            type="text"
            id="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            id="email"
            placeholder="Your email address"
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            id="message"
            cols="30"
            rows="4"
            placeholder="Enter your comment here..."
            value={formData.comment}
            onChange={handleChange}
          ></textarea>
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


    </div>
  );
};

export default FeedbackForm;
