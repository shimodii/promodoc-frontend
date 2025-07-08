import { Routes, Route } from 'react-router-dom';

import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './pages/DashboardLayout';
import UploadPage from './pages/UploadPage';
import InboxPage from './pages/InboxPage';
import ManagementPage from './pages/ManagementPage';
import ValidatorManagementPage from './pages/ValidatorManagementPage';

import ProtectedRoute from './routes/ProtectedRoute'
import AdminRoute from './routes/AdminRoute';
import ReviewerRoute from './routes/ReviewerRoute';

function App() {
  return (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
      <Route path="inbox" element={<InboxPage />} />
      <Route path="upload" element={<UploadPage />} />
      <Route path="management" element={
        <AdminRoute><ManagementPage /></AdminRoute>
      } />
      <Route path="validation" element={
        <ReviewerRoute><ValidatorManagementPage/></ReviewerRoute>
      } />
    </Route>
  </Routes>
  );
}

export default App;
