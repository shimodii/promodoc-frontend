import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

function AdminRoute({ children }) {
  const { user } = useAuth()
  return user?.role === 'admin' ? children : <Navigate to="/dashboard/inbox" />
}

export default AdminRoute