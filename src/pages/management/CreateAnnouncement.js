import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'

function CreateAnnouncement() {
  // const { user } = useAuth()
  const { getUser } = useAuth()
  const user = getUser();
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://your-backend.com/api/announcements', {
        title,
        desc
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      setStatus('Sent!')
      setTitle('')
      setDesc('')
    } catch (err) {
      console.error(err)
      setStatus('Failed to send.')
    }
  }

  return (
    <div>
      <h3>Create New Announcement</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} /><br />
        <textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} /><br />
        <button type="submit">Submit</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  )
}

export default CreateAnnouncement