import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import MessageCard from '../components/MessageCard'

function InboxPage() {
  // const { user } = useAuth()
  const { getUserId, getRole } = useAuth()
  // const { getUserId, getRole } = useAuth()

  const userId = getUserId()
  const role = getRole()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const { getUser } = useAuth()
  const user = getUser()
  console.log(user.id, user.email, user.role)

  // const { getUser } = useAuth();
  // const user = getUser();

  useEffect(() => {
    fetchInbox()
  }, [user])

  const fetchInbox = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://your-backend.com/api/inbox', {
        headers: { Authorization: `Bearer ${user.token}` },
        params: { userId: user.id }
      })
      setMessages(response.data)
    } catch (err) {
      console.error('Failed to fetch inbox:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (messageId) => {
    try {
      await axios.delete(`http://your-backend.com/api/inbox/${messageId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      setMessages(prev => prev.filter(msg => msg.id !== messageId))
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://your-backend.com/api/inbox', {
        title,
        desc
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      setTitle('')
      setDesc('')
      setShowForm(false)
      fetchInbox()
    } catch (err) {
      console.error('Announcement failed:', err)
    }
  }

  return (
    <div>
      <h2>Inbox</h2>

      {/* Admin Add Button */}
      {user.role === 'admin' && (
        <>
          <button onClick={() => setShowForm(prev => !prev)} style={{ marginBottom: 10 }}>
            {showForm ? 'Cancel' : '➕ New Announcement'}
          </button>

          {showForm && (
            <form onSubmit={handleSubmit} style={{
              background: '#f0f0f0', padding: '15px', borderRadius: '8px', marginBottom: '20px'
            }}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ width: '100%', marginBottom: 10 }}
              />
              <textarea
                placeholder="Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
                rows={4}
                style={{ width: '100%', marginBottom: 10 }}
              />
              <button type="submit">Submit</button>
            </form>
          )}
        </>
      )}

      {/* Message List */}
      {loading ? (
        <p>Loading inbox...</p>
      ) : messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        messages.map(msg => (
          <MessageCard
            key={msg.id}
            title={msg.title}
            desc={msg.desc}
            showDelete={user?.role === 'admin'}
            onDelete={() => handleDelete(msg.id)}
          />
        ))
      )}
    </div>
  )
}

export default InboxPage