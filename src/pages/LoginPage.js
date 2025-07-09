import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const { token } = response.data;
      if (!token) throw new Error('No token received from server');

      login(token); // Save token in context
      navigate('/dashboard'); // Go to dashboard

    } catch (err) {
      console.error('Login error:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.request) {
        setError('No response from server. Check your backend.');
      } else {
        setError('Something went wrong.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>ورود</h2>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.inputGroup}>
          <label>پست الکترونیکی</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>رمز عبور</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button} disabled={isLoading}>
          {isLoading ? 'درحال ورود ...' : 'ورود'}
        </button>

        <p style={styles.linkText}>
          حساب کاربری ندارید ؟ <Link to="/register" style={styles.link}> ازینجا ثبت نام کنید </Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f0f2f5'
  },
  form: {
    width: '350px',
    background: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    boxSizing: 'border-box'
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  inputGroup: {
    marginBottom: '15px'
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4a90e2',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    boxSizing: 'border-box'
  },
  linkText: {
    marginTop: '15px',
    textAlign: 'center',
    fontSize: '14px'
  },
  link: {
    color: '#4a90e2',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  error: {
    backgroundColor: '#ffe6e6',
    color: '#c00',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '15px',
    fontSize: '14px'
  }
};

export default LoginPage;