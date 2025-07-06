import './App.css';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './pages/DashboardLayout';
import UploadPage from './pages/UploadPage';
import InboxPage from './pages/InboxPage';

import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  return (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
      <Route path="news" element={<NewsPage />} />
      <Route path="inbox" element={<InboxPage />} />
      <Route path="upload" element={<UploadPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
  );
}

export default App;
