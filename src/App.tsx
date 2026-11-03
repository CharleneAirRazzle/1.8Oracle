import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import AuthPage from '@/pages/AuthPage';
import HomePage from '@/pages/HomePage';
import DrawPage from '@/pages/DrawPage';
import ResultPage from '@/pages/ResultPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-cozy flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-olive-400 border-t-transparent animate-spin mx-auto mb-3" />
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Loading…</p>
        </div>
      </div>
    );
  }

  if (!session) return <Navigate to="/auth" replace />;
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-cozy flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-olive-400 border-t-transparent animate-spin" />
      </div>
    );
  }
  if (session) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function ConnectionErrorScreen() {
  const { connectionError } = useAuth();

  if (!connectionError) return null;

  return (
    <div className="min-h-screen bg-cozy flex items-center justify-center p-6">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-2xl font-heading mb-4" style={{ color: 'var(--color-text)' }}>
          Connection unavailable
        </h1>
        <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--color-text-secondary)' }}>
          {connectionError}
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="btn-olive px-8 py-3 text-xs"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<PublicRoute><AuthPage /></PublicRoute>} />
      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/draw" element={<ProtectedRoute><DrawPage /></ProtectedRoute>} />
      <Route path="/result" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ConnectionErrorScreen />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
