import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'

function UserActivation() {
  const { user } = useAuth()
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://your-backend.com/api/users', {
      headers: { Authorization: `Bearer ${user.token}` }
    }).then(res => setUsers(res.data))
      .catch(err => console.error(err))
  }, [user])

  const toggleStatus = async (userId, currentStatus) => {
    try {
      await axios.post(`http://your-backend.com/api/users/toggle-status`, {
        userId
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      setUsers(prev =>
        prev.map(u =>
          u.id === userId ? { ...u, isActive: !currentStatus } : u
        )
      )
    } catch (err) {
      console.error('Toggle failed:', err)
    }
  }

  return (
    <div>
      <h3>Manage User Status</h3>
      <table>
        <thead>
          <tr><th>Username</th><th>Status</th><th>Action</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.isActive ? 'Active' : 'Inactive'}</td>
              <td>
                <button onClick={() => toggleStatus(u.id, u.isActive)}>
                  {u.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserActivation