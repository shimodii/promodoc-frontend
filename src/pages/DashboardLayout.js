import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function DashboardLayout() {
  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <Outlet />
      </div>
    </>
  )
}

export default DashboardLayout