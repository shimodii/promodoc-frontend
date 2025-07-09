import React from 'react';

const DocumentCard = ({ title, type, downloadUrl }) => {
  return (
    <div style={styles.card}>
      <div style={styles.info}>
        <p><strong>Title:</strong> {title}</p>
        <p><strong>Type:</strong> {type}</p>
      </div>
      <a href={downloadUrl} download style={styles.button}>
        Download
      </a>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '15px',
    background: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '500px'
  },
  info: {
    flexGrow: 1
  },
  button: {
    backgroundColor: '#4a90e2',
    color: '#fff',
    textDecoration: 'none',
    padding: '8px 14px',
    borderRadius: '5px',
    fontSize: '14px'
  }
};

export default DocumentCard;