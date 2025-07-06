import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const login = ({ username, password }) => {
    // Mock auth logic
    if (username === 'admin' && password === 'admin') {
      setUser({ username, role: 'admin' })
      navigate('/dashboard/news')
    } else if (username === 'client' && password === 'client') {
      setUser({ username, role: 'client' })
      navigate('/dashboard/news')
    } else {
      alert('Invalid credentials')
    }
  }

  const logout = () => {
    setUser(null)
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
