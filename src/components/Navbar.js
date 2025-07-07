import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { logout, user } = useAuth()

  return (
    <nav style={{ background: '#ddd', padding: 10 }}>
      <span>Welcome, {user?.username} | </span>
      <Link to="/dashboard/inbox">Inbox</Link> |{' '}
      <Link to="/dashboard/upload">Upload</Link> |{' '}

      {user?.role === 'admin' && (
        <>
          <Link to="/dashboard/management">Management</Link> |{' '}
        </>
      )}

      {user?.role === 'reviewer' && (
        <>
          <Link to="/dashboard/validation">Validation</Link> |{' '}
        </>
      )}

      <button onClick={logout}>Logout</button>
    </nav>
  )
}

export default Navbar