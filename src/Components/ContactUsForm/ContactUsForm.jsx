import React, { useState, useRef } from 'react';
import './ContactUsForm.css';
import emailjs from '@emailjs/browser';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ContactUsForm = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.comment) {
      alert('Please fill in all required fields.');
      return;
    }
  
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
          <h1>Contact Us Form</h1>
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

export default ContactUsForm;
