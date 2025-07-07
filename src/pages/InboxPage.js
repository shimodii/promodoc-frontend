// src/pages/InboxPage.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import MessageCard from '../components/MessageCard'

function InboxPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const response = await axios.get('#backend address#', {
          headers: {
            Authorization: `Bearer ${user.token}`
          },
          params: {
            userId: user.id
          }
        })

        setMessages(response.data)
      } catch (err) {
        console.error('Failed to fetch inbox:', err)
        setMessages([])
      } finally {
        setLoading(false)
      }
    }

    if (user?.token && user?.id) {
      fetchInbox()
    }
  }, [user])

  if (loading) return <p>Loading inbox...</p>

  return (
    <div>
      <h2>Inbox</h2>
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        messages.map((msg, index) => (
          <MessageCard key={index} title={msg.title} desc={msg.desc} />
        ))
      )}
    </div>
  )
}

export default InboxPage