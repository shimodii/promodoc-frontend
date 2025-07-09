import React from 'react';

function UserCard({ id, full_name, email, is_active, onActivate, onDelete, loading }) {
  return (
    <div style={styles.card}>
      <div>
        <h3>Id: {id}</h3>
        <strong>{full_name}</strong> ({email})<br />
        Status: <em>
            {is_active ? (
                <p>Active</p>
            ) : (
                <p>Not Active</p>
            )}
        </em>
      </div>
      <div>
        {is_active ? (
          <button onClick={onDelete} disabled={loading} style={styles.deleteBtn}>
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        ) : (
          <button onClick={onActivate} disabled={loading} style={styles.activateBtn}>
            {loading ? 'Activating...' : 'Activate'}
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    marginBottom: '12px',
    backgroundColor: '#f9f9f9',
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  activateBtn: {
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default UserCard;