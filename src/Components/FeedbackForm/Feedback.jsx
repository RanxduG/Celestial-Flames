import React, { useState, useRef } from 'react';
import './Feedback.css';
import emailjs from '@emailjs/browser';
import '@fortawesome/fontawesome-free/css/all.min.css';
import veryBadEmoji from '../Assets/Emojis/veryBad.png';
import badEmoji from '../Assets/Emojis/bad.png';
import goodEmoji from '../Assets/Emojis/good.png';
import veryGoodEmoji from '../Assets/Emojis/veryGood.png';
import excellentEmoji from '../Assets/Emojis/exellent.png';

const FeedbackForm = () => {
  const [rating, setRating] = useState('');
  const form = useRef();
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
    if (!formData.name || !formData.email || !formData.comment || !rating) {
      alert('Please fill in all required fields.');
      return;
    }

    
    // Append rating to the comment in the formData
    const messageWithRating = `${formData.comment}\n\nRating: ${rating}`;
    setFormData((prevData) => ({
      ...prevData,
      comment: messageWithRating,
    }));
  
    // Update textarea value directly with the new message content
    const textarea = document.getElementById('comment');
    textarea.value = messageWithRating;
  
    emailjs.sendForm('service_sr64m22', 'template_d1t1wpp', form.current, 'lbErQTJUSof4R6PYe')
        .then(
            () => {
                console.log('SUCCESS!');
                alert('Your message has been sent successfully!');
                handleReset();
            },
            (error) => {
                console.log('FAILED...', error.text);
                alert('Failed to send the message, please try again later.');
            }
        );
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
          <label>Name</label>
          <input type="text" id='name' name="from_name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
          <label>Email</label>
          <input type="email" id='email' name="email" placeholder="Your email address" value={formData.email} onChange={handleChange} required />
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


    </div>
  );
};

export default FeedbackForm;
