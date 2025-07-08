import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Axios implementation
      const response = await axios.post(
        'http://127.0.0.1:5000/api/register', 
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Registration successful:', response.data);
      setSuccess(true);
      setFormData({ fullName: '', email: '', password: '' });

    } catch (err) {
      // Enhanced Axios error handling
      if (err.response) {
        // Server responded with error status (4xx/5xx)
        console.error('Server error:', err.response.data);
        setError(err.response.data.message || `Server error: ${err.response.status}`);
      } else if (err.request) {
        // Request was made but no response received
        console.error('Network error:', err.request);
        setError('Network error - Is the backend running?');
      } else {
        // Other errors
        console.error('Error:', err.message);
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Create Account</h2>
        
        {success && (
          <div style={styles.successMessage}>
            Registration successful! <Link to="/login" style={styles.link}>Login here</Link>
          </div>
        )}
        
        {error && (
          <div style={styles.errorMessage}>
            Error: {error}
          </div>
        )}
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
            minLength={6}
          />
        </div>
        
        <button 
          type="submit" 
          style={styles.button}
          disabled={isLoading}
        >
          {isLoading ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ marginRight: '8px' }}>Processing...</span>
              {/* Optional spinner */}
              <span className="spinner"></span>
            </span>
          ) : 'Register'}
        </button>
        
        <div style={styles.loginLink}>
          Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
        </div>
      </form>
    </div>
  );
}
// Styling
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  },
  form: {
    width: '350px',
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333'
  },
  inputGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    color: '#555'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  errorMessage: {
    padding: '10px',
    backgroundColor: '#ffebee',
    color: '#d32f2f',
    borderRadius: '4px',
    marginBottom: '20px',
    fontSize: '14px'
  },
  successMessage: {
    padding: '10px',
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    borderRadius: '4px',
    marginBottom: '20px',
    fontSize: '14px'
  },
  loginLink: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#555'
  },
  link: {
    color: '#4a90e2',
    textDecoration: 'none',
    fontWeight: '500',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
};

export default RegisterPage