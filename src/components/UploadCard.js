import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const UploadCard = ({ index }) => {
  const { token } = useAuth();
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

      <div style={styles.inputGroup}>
        <label style={styles.label}>Document Title</label>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Document Type</label>
        <select value={docType} onChange={(e) => setDocType(e.target.value)} style={styles.input}>
          <option value="Research">Research</option>
          <option value="Education">Education</option>
          <option value="Executive">Executive</option>
        </select>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Upload File</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.input}
        />
      </div>

      <button style={styles.button} onClick={handleUpload}>
        Upload
      </button>

      {status && <p style={styles.status}>{status}</p>}
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    background: '#fff',
    maxWidth: '500px'
  },
  inputGroup: {
    marginBottom: '15px',
    boxSizing: 'border-box'
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#444'
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box'
  },
  button: {
    backgroundColor: '#4a90e2',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px'
  },
  status: {
    marginTop: '12px',
    fontSize: '14px',
    color: '#555'
  }
};

export default UploadCard;