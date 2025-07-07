// src/pages/ManagementPage.jsx
import { useState } from 'react'
import DocumentValidation from './management/DocumentValidation'
import UserActivation from './management/UserActivation'
import CreateAnnouncement from './management/CreateAnnouncement'

const tabs = [
  { id: 'documents', label: 'Validate Documents' },
  { id: 'users', label: 'Manage Users' },
  { id: 'announcement', label: 'Create Announcement' }
]

function ManagementPage() {
  const [activeTab, setActiveTab] = useState('documents')

  return (
    <div>
      <h2>Management Panel</h2>

      {/* Local navigation */}
      <div style={{ marginBottom: 20 }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px',
              marginRight: '10px',
              backgroundColor: activeTab === tab.id ? '#333' : '#eee',
              color: activeTab === tab.id ? '#fff' : '#000',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === 'documents' && <DocumentValidation />}
        {activeTab === 'users' && <UserActivation />}
        {activeTab === 'announcement' && <CreateAnnouncement />}
      </div>
    </div>
  )
}

export default ManagementPage