import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { Link, useParams, useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const { state } = useParams();
  const navigate = useNavigate();

  // State management for form fields and validation
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreed: false
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Sample user data for login validation
  const sampleUsers = [
    { email: 'ranidu.h.gurusinghe@gmail.com', password: 'Hansaka@123' },
    { email: 'user2@example.com', password: 'password2' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSignup = () => {
    if (formData.name && formData.email && formData.password && formData.agreed) {
      navigate('/');
    } else {
      setError('Please fill in all fields and agree to the terms.');
    }
  };

  const handleLogin = () => {
    const user = sampleUsers.find(
      (user) => user.email === loginData.email && user.password === loginData.password
    );
    if (user) {
      navigate('/');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        {state === 'login' ? (
          <>
            <h1>Login</h1>
            <div className="loginsignup-fields">
              <input
                type="email"
                placeholder='Email Address'
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
              />
              <input
                type="password"
                placeholder='Password'
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button onClick={handleLogin}>Login</button>
            <p className='loginsignup-login'>
              Don't have an account? <Link to="/loginsignup/signup" onClick={() => navigate('/loginsignup/signup')}><span>Sign up here</span></Link>
            </p>
          </>
        ) : (
          <>
            <h1>Sign up</h1>
            <div className="loginsignup-fields">
              <input
                type="text"
                placeholder='Your Name'
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder='Email Address'
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder='Password'
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="loginsignup-agree">
              <input
                type="checkbox"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
              />
              <p>By continuing, I agree to the terms of use & privacy policy</p>
            </div>
            {error && <p className="error">{error}</p>}
            <button onClick={handleSignup}>Continue</button>
            <p className='loginsignup-login'>
              Already have an account? <Link to="/loginsignup/login" onClick={() => navigate('/loginsignup/login')}><span>Login here</span></Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
