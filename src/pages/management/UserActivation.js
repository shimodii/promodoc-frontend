import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import UserCard from '../../components/UserCard';

function UserActivation() {
  const { token } = useAuth(); // 🔐 Grab the token
  const [users, setUsers] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/protected/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data)
      setUsers(res.data);
    } catch (err) {
      console.error('❌ Error fetching users: ', err);
      setError('Failed to fetch users.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleActivate = async (userId) => {
    try {
      setLoadingId(userId);
      await axios.post(`http://localhost:5000/api/protected/admin/approve/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(userId)
      fetchUsers();
    } catch (err) {
      console.error('❌ Activation error:', err);
      setError('Could not activate user.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (userId) => {
    try {
      setLoadingId(userId);
      await axios.patch(`http://localhost:5000/api/protected/admin/delete/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(userId)
      console.log("hellllllo")
      fetchUsers();
    } catch (err) {
      console.error('❌ Deletion error:', err);
      setError('Could not delete user.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Management</h2>

      {error && <div style={styles.error}>{error}</div>}

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => (
          <UserCard
            id={user.ID}
            full_name={user.full_name}
            email={user.email}
            is_active={user.is_active}
            onActivate={() => handleActivate(user.ID)}
            onDelete={() => handleDelete(user.ID)}
            loading={loadingId === user.ID}
          />
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  error: {
    backgroundColor: '#ffe0e0',
    color: '#d00',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '20px',
  },
};

export default UserActivation;