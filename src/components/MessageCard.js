function MessageCard({ title, desc, showDelete = false, onDelete }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '15px',
      marginBottom: '10px',
      backgroundColor: '#f9f9f9',
      position: 'relative'
    }}>
      <h3>{title}</h3>
      <p>{desc}</p>

      {showDelete && (
        <button
          onClick={onDelete}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: '#ff4d4d',
            border: 'none',
            borderRadius: '5px',
            padding: '5px 10px',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          Delete
        </button>
      )}
    </div>
  )
}

export default MessageCard