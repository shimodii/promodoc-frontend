import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import UploadCardComponent from '../components/UploadCard';

const UploadCard = ({ index, token }) => {
  const [title, setTitle] = useState('');
  const [docType, setDocType] = useState('Research');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleUpload = async () => {
    if (!title || !file) {
      setStatus('❌ Please fill in all fields and select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('type', docType);
    formData.append('document', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      if (res.status === 200) {
        setStatus('✅ Uploaded successfully!');
        setTitle('');
        setFile(null);
      } else {
        setStatus('❌ Upload failed.');
      }
    } catch (err) {
      setStatus('❌ Error: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={styles.card}>
      <h3>Upload Document #{index + 1}</h3>

      <input
        type="text"
        placeholder="Document Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
      />

      <select value={docType} onChange={(e) => setDocType(e.target.value)} style={styles.select}>
        <option value="Research">Research</option>
        <option value="Education">Education</option>
        <option value="Executive">Executive</option>
      </select>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} style={styles.input} />

      <button style={styles.button} onClick={handleUpload}>
        Upload
      </button>

      {status && <p style={styles.status}>{status}</p>}
    </div>
  );
};

const UploadPage = () => {
  const { token } = useAuth();
  const [uploadCards, setUploadCards] = useState([0]); // just tracking indexes

  const addUploadCard = () => {
    setUploadCards((prev) => [...prev, prev.length]);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.pageTitle}>Document Upload</h2>

      {uploadCards.map((cardIndex) => (
        <UploadCardComponent key={cardIndex} index={cardIndex} token={token} />
      ))}

      <button onClick={addUploadCard} style={styles.addButton}>
        ➕ Add Upload Box
      </button>
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '40px 20px'
  },
  pageTitle: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    background: '#fff'
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  select: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  button: {
    backgroundColor: '#4a90e2',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  addButton: {
    display: 'block',
    margin: '20px auto 0',
    padding: '10px 20px',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  status: {
    marginTop: '10px',
    fontSize: '14px',
    color: '#555'
  }
};

export default UploadPage;