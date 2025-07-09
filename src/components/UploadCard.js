import React, { useState } from 'react';
import axios from 'axios';

function UploadCard({ index, data, onChange, onUploaded, onRemove }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      onChange(index, name, files[0]);
    } else {
      onChange(index, name, value);
    }
  };

  const handleUpload = async () => {
    if (!data.title || !data.type || !data.file) {
      setUploadStatus('Please fill all fields before uploading');
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('type', data.type);
    formData.append('file', data.file);

    setIsUploading(true);
    setUploadStatus('');

    try {
      const res = await axios.post(
        'http://localhost:5000/api/protected/client/documents/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setUploadStatus('✅ Upload successful!');
      onUploaded?.(index, res.data.document);
    } catch (err) {
      console.error(err);
      setUploadStatus('❌ Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Document Title</label>
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Document Type</label>
        <select
          name="type"
          value={data.type}
          onChange={handleChange}
          style={styles.select}
          required
        >
          <option value="">Select type</option>
          <option value="research">Research</option>
          <option value="educational">Education</option>
          <option value="executive">Executive</option>
        </select>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>PDF File</label>
        <input
          type="file"
          name="file"
          accept="application/pdf"
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>

      <div style={styles.buttonRow}>
        <button
          style={{ ...styles.button, backgroundColor: '#4caf50' }}
          onClick={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>

        <button
          style={{ ...styles.button, backgroundColor: '#f44336' }}
          onClick={() => onRemove(index)}
          disabled={isUploading}
        >
          Remove
        </button>
      </div>

      {uploadStatus && <div style={styles.status}>{uploadStatus}</div>}
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '6px',
    fontWeight: '500',
    color: '#333',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  },
  select: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    backgroundColor: '#fff',
  },
  buttonRow: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
  },
  button: {
    padding: '10px 16px',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  status: {
    fontSize: '14px',
    color: '#555',
    marginTop: '8px'
  }
};

export default UploadCard;