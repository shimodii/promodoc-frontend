import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'

function DocumentValidation() {
  // const { user } = useAuth()
  const { getUser } = useAuth()
  const user = getUser();
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    axios.get('http://your-backend.com/api/documents/pending', {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => setDocuments(res.data))
      .catch(err => console.error(err))
  }, [user])

  const handleReject = async (docId) => {
    try {
      await axios.post(`http://your-backend.com/api/documents/reject`, {
        documentId: docId
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      setDocuments(prev => prev.filter(doc => doc.id !== docId))
    } catch (err) {
      console.error('Reject failed:', err)
    }
  }

  const handleAssignPoint = async (docId, point) => {
    try {
      await axios.post(`http://your-backend.com/api/documents/assign-point`, {
        documentId: docId,
        point: Number(point)
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      setDocuments(prev => prev.filter(doc => doc.id !== docId))
    } catch (err) {
      console.error('Point assignment failed:', err)
    }
  }

  return (
    <div>
      <h3>Pending Document Submissions</h3>
      {documents.length === 0 ? (
        <p>No documents to review.</p>
      ) : (
        <ul>
          {documents.map(doc => (
            <li key={doc.id} style={{
              border: '1px solid #ccc',
              padding: 12,
              borderRadius: 8,
              marginBottom: 10,
              backgroundColor: '#f5f5f5'
            }}>
              <strong>{doc.filename}</strong> by <em>{doc.username}</em><br />

              {/* Reject Button */}
              <button
                onClick={() => handleReject(doc.id)}
                style={{ marginRight: 10, backgroundColor: '#ff5555', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px' }}
              >
                Reject
              </button>

              {/* Point Assignment */}
              <PointAssigner onSubmit={(point) => handleAssignPoint(doc.id, point)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function PointAssigner({ onSubmit }) {
  const [point, setPoint] = useState('')

  return (
    <>
      <input
        type="number"
        placeholder="Point"
        value={point}
        onChange={(e) => setPoint(e.target.value)}
        style={{ width: 60, marginRight: 5 }}
      />
      <button
        onClick={() => {
          if (point !== '') onSubmit(point)
        }}
        style={{ backgroundColor: '#3377ff', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px' }}
      >
        Submit Point
      </button>
    </>
  )
}

export default DocumentValidation