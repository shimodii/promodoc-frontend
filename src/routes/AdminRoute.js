import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

function AdminRoute({ children }) {
  const { getUser } = useAuth()
  const user = getUser();

  return user?.role === 'admin' ? children : <Navigate to="/dashboard/inbox" />
}

export default AdminRoute