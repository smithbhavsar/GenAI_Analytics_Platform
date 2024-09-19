import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header'; // Import Header
import Footer from './Footer'; // Import Footer
import './App.css'; // Import the existing CSS

function Dashboard() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const userName = localStorage.getItem('name');

  // Handle file selection
  const onChange = e => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(res.data.message);
      // Refresh the file list after upload
      fetchFiles();
    } catch (err) {
      console.error(err);
      setMessage('Failed to upload file.');
    }
  };

  // Fetch user's uploaded files
  const fetchFiles = async () => {
    try {
      const res = await axios.get('/api/my-files'); // Ensure your backend endpoint for fetching files exists
      setFiles(res.data);
    } catch (err) {
      console.error('Error fetching files:', err);
    }
  };

  // Call fetchFiles when the component mounts
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      <Header />
      <main className="dashboard-container">
        <div className="welcome-message">
          <h2>Welcome {userName} to Your Dashboard</h2>
        </div>

        {/* File Upload Section */}
        <div className="upload-section">
          <h2>Upload a File</h2>
          <form onSubmit={onSubmit} className="upload-form">
            <input type="file" onChange={onChange} className="file-input" />
            <button type="submit" className="upload-btn">Upload File</button>
          </form>
          <p className="upload-message">{message}</p>
        </div>

        {/* View Files Section */}
        <div className="view-files-section">
          <h2>Your Uploaded Files</h2>
          <ul className="file-list">
            {files.map(file => (
              <li key={file._id} className="file-item">
                <a href={`/${file.path}`} target="_blank" rel="noopener noreferrer">
                  {file.filename}
                </a> (Uploaded on {new Date(file.uploadDate).toLocaleDateString()})
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
