import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

function ReviewerRoute({ children }) {
  const { user } = useAuth()
  return user?.role === 'reviewer' ? children : <Navigate to="/dashboard/inbox" />
}

export default ReviewerRoute