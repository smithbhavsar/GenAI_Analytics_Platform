import React from 'react';
import Header from './Header'; // Import Header
import Footer from './Footer'; // Import Footer
import './App.css'; // Import the existing CSS

function Dashboard() {
  return (
    <div>
      <Header />
      <main>
        <div>
          <h2>Welcome to Your Dashboard</h2>
          <p>This is a protected page accessible only to logged-in users.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;