import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UploadCard from '../components/UploadCard';
import DocumentCard from '../components/DocumentCard';
import { useAuth } from '../context/AuthContext';

function UploadPage() {
  const { token, user } = useAuth();
  const [uploadCards, setUploadCards] = useState([
    { title: '', type: '', file: null }
  ]);
  const [userDocuments, setUserDocuments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleAddCard = () => {
    setUploadCards(prev => [...prev, { title: '', type: '', file: null }]);
  };

  const handleCardChange = (index, field, value) => {
    const updated = [...uploadCards];
    updated[index][field] = value;
    setUploadCards(updated);
  };

  const handleUpload = async () => {
    setIsSubmitting(true);
    setUploadError('');

    try {
      for (const card of uploadCards) {
        const formData = new FormData();
        formData.append('title', card.title);
        formData.append('type', card.type.toLowerCase());
        formData.append('file', card.file);

        const res = await axios.post('http://localhost:5000/api/protected/client/documents/upload', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log('✅ Upload successful:', res.data);
      }

      fetchUserDocuments(); // Refresh doc list
      setUploadCards([{ title: '', type: '', file: null }]); // Reset
    } catch (err) {
      console.error('❌ Upload error:', err);
      setUploadError('Upload failed. Please check fields and file type.');
    } finally {
      setIsSubmitting(false);
    }
  };


  const fetchUserDocuments = async () => {
    if (!user?.id) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/docs/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserDocuments(res.data || []);
    } catch (err) {
      console.error('❌ Error fetching docs:', err);
    }
  };

  useEffect(() => {
    fetchUserDocuments();
  }, [user?.id]);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>بارگذاری مدارک و مستندات</h2>

      <button onClick={handleAddCard} style={styles.addButton}>
        + اضافه کردن بخش بارگذاری جدید
      </button>

      <div style={styles.uploadSection}>
        {uploadCards.map((card, idx) => (
          <UploadCard
            key={idx}
            index={idx}
            data={card}
            onChange={handleCardChange}
            // onRemove={handleRemoveCard}
          />
        ))}
      </div>

      {uploadError && <div style={styles.error}>{uploadError}</div>}

      <button onClick={handleUpload} style={styles.uploadBtn} disabled={isSubmitting}>
        {isSubmitting ? 'Uploading...' : 'Upload All'}
      </button>

      <h3 style={styles.sectionTitle}>بارگذاری های پیشین</h3>
      {userDocuments.length === 0 ? (
        <p style={styles.noDocs}>مدرکی بارگذاری نشده است</p>
      ) : (
        <div style={styles.documentList}>
          {userDocuments.map((doc, idx) => (
            <DocumentCard
              key={idx}
              title={doc.title}
              type={doc.type}
              downloadUrl={`http://localhost:5000/${doc.filePath}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto'
  },
  header: {
    fontSize: '24px',
    marginBottom: '16px'
  },
  addButton: {
    background: '#4a90e2',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '6px',
    marginBottom: '24px',
    cursor: 'pointer'
  },
  uploadSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  uploadBtn: {
    background: '#28a745',
    color: '#fff',
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    marginTop: '16px',
    cursor: 'pointer'
  },
  sectionTitle: {
    fontSize: '20px',
    marginTop: '40px',
    marginBottom: '12px'
  },
  noDocs: {
    fontStyle: 'italic',
    color: '#666'
  },
  documentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  error: {
    color: 'red',
    background: '#ffe6e6',
    padding: '10px',
    borderRadius: '6px',
    marginTop: '10px'
  }
};

export default UploadPage;