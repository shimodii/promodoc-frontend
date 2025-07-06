import { Routes, Route } from 'react-router-dom';

import './App.css';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './pages/DashboardLayout';
import UploadPage from './pages/UploadPage';
import InboxPage from './pages/InboxPage';
import ManagementPage from './pages/ManagementPage';

import ProtectedRoute from './routes/ProtectedRoute'
import AdminRoute from './routes/AdminRoute';

function App() {
  return (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
      <Route path="inbox" element={<InboxPage />} />
      <Route path="upload" element={<UploadPage />} />
      <Route path="management" element={
        <AdminRoute><ManagementPage /></AdminRoute>
      } />
    </Route>
  </Routes>
  );
}

export default App;
