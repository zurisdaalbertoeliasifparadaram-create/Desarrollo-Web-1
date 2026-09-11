// src/App.tsx
import type { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import Header from './layouts/Header';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeesPage';
import EmployeeDetailPage from './pages/EmployeeDetailPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthStore } from './store/authStore';

// Layout con Header para páginas autenticadas
function AppLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header user={user ?? undefined} onLogout={handleLogout} />
      <main>{children}</main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas protegidas */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          </ProtectedRoute>
        } />

        <Route path="/empleados" element={
          <ProtectedRoute>
            <AppLayout>
              <EmployeesPage />
            </AppLayout>
          </ProtectedRoute>
        } />

        <Route path="/empleados/:id" element={
          <ProtectedRoute>
            <AppLayout>
              <EmployeeDetailPage />
            </AppLayout>
          </ProtectedRoute>
        } />

        {/* Redirigir raiz según autenticación */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 404 */}
        <Route path="*" element={
          <div className="min-h-screen bg-slate-50 text-center p-20">
            <h2 className="text-slate-900 text-2xl font-bold mb-3">404 — Página no encontrada</h2>
            <Link to="/dashboard" className="text-brand-700 hover:text-brand-800 underline">
              Volver al inicio
            </Link>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
