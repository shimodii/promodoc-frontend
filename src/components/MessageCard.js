function MessageCard({ title, desc }) {
    return (
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '15px',
        marginBottom: '10px',
        backgroundColor: '#f9f9f9'
      }}>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    )
  }
  
  export default MessageCard