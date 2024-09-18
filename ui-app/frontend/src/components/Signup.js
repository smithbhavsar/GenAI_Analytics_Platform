import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Header from './Header'; // Import Header
import Footer from './Footer'; // Import Footer
import './App.css'; // Import the existing CSS

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = formData;
  const navigate = useNavigate(); // Initialize navigate function

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', { name, email, password });
      console.log(res.data);  // Log the response data
      localStorage.setItem('token', res.data.token); // Store the token in localStorage
      navigate('/login'); // Redirect to the login page
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="login-container">
      <Header />
      <main>
        <form className="login-form" onSubmit={onSubmit}>
          <h2>Demo Sign up Form</h2>
          <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" />
          <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" />
          <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" />
          <button type="submit">Sign Up</button>
        </form>
    </main>
    <Footer />
    </div>
  );
}

export default Signup;
