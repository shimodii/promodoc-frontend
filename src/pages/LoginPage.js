import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

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
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginPage
