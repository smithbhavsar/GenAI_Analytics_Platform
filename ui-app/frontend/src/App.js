import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import SecureRoute from './components/SecureRoute';
import Dashboard from './components/Dashboard';
import UsersList from './components/UsersList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<SecureRoute element={<Dashboard />} />} />
          <Route path="/dashboard" element={<SecureRoute element={<Dashboard />} />} />
          <Route path="/users" element={<SecureRoute element={<UsersList />} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


