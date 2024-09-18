import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; // Import Header
import Footer from './Footer'; // Import Footer
import './App.css'; // Import the existing CSS

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard'); // Redirect to a secure page after login
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="login-container">
      <Header />
      <main>
        <form className="login-form" onSubmit={onSubmit}>
          <h2>Login Form</h2>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default Login;
