import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header'; // Import Header
import Footer from './Footer'; // Import Footer
import './App.css'; // Import the existing CSS

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/auth/users', {
          headers: { 'x-auth-token': token }
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Header />
      <main>
      <h1>Registered Users</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name} ({user.email})</li>
        ))}
      </ul>
      </main>
      <Footer />
    </div>
  );
}

export default UsersList;
