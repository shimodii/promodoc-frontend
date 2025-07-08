import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'

function UserActivation() {
  // const { user } = useAuth()
  const { getUser } = useAuth()
  const user = getUser();
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://your-backend.com/api/users', {
      headers: { Authorization: `Bearer ${user.token}` }
    }).then(res => setUsers(res.data))
      .catch(err => console.error(err))
  }, [user])

  const handleActivate = async (userId) => {
    try {
      await axios.post(`http://your-backend.com/api/users/activate`, {
        userId
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      setUsers(prev =>
        prev.map(u =>
          u.id === userId ? { ...u, isActive: true } : u
        )
      )
    } catch (err) {
      console.error('Activation failed:', err)
    }
  }

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://your-backend.com/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      setUsers(prev => prev.filter(u => u.id !== userId))
    } catch (err) {
      console.error('Deletion failed:', err)
    }
  }

  return (
    <div>
      <h3>User Management</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <th>Username</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
              <td>{u.username}</td>
              <td>{u.role}</td>
              <td>{u.isActive ? 'Active' : 'Deactivated'}</td>
              <td>
                {u.isActive ? (
                  <button
                    onClick={() => handleDelete(u.id)}
                    style={{ background: '#ff4444', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px' }}
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    onClick={() => handleActivate(u.id)}
                    style={{ background: '#44aa44', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px' }}
                  >
                    Activate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserActivation