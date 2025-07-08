import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'


function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ username, password })
  }

  return (
    <div style={{ padding: 50 }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <p>Username</p>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <p>Password</p>
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
        <button type="submit" style={{ margin: 50 }}>Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  )
}

export default LoginPage
