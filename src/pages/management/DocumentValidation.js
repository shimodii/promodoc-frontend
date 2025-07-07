import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'

function DocumentValidation() {
  const { user } = useAuth()
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    axios.get('http://your-backend.com/api/documents/pending', {
      headers: { Authorization: `Bearer ${user.token}` }
    }).then(res => setDocuments(res.data))
      .catch(err => console.error(err))
  }, [user])

  const handleValidate = async (docId) => {
    try {
      await axios.post(`http://your-backend.com/api/documents/validate`, {
        documentId: docId
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      setDocuments(prev => prev.filter(doc => doc.id !== docId))
    } catch (err) {
      console.error('Validation failed:', err)
    }
  }

  return (
    <div>
      <h3>Pending Document Submissions</h3>
      {documents.length === 0 ? (
        <p>No documents to validate.</p>
      ) : (
        <ul>
          {documents.map(doc => (
            <li key={doc.id}>
              <strong>{doc.filename}</strong> by {doc.username}{' '}
              <button onClick={() => handleValidate(doc.id)}>Validate</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DocumentValidation