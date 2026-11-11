import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import AuthPage from '@/pages/AuthPage';
import HomePage from '@/pages/HomePage';
import DrawPage from '@/pages/DrawPage';
import ResultPage from '@/pages/ResultPage';

function AppRoutes() {
  return (
    <Routes>
      {/* 直接渲染页面，谁都不拦 */}
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/draw" element={<DrawPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}