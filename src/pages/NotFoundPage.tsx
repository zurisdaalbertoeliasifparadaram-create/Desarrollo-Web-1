// src/pages/NotFoundPage.tsx
import { Link } from 'react-router-dom';
import { usePageNotFound } from '../hooks/usePageNotFound';

function NotFoundPage() {
  const attemptedUrl = usePageNotFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-10 text-center">
        <span className="text-6xl block mb-2" aria-hidden="true">🧭</span>
        <p className="text-7xl font-extrabold tracking-tight text-brand-800">404</p>
        <h1 className="text-2xl font-bold text-slate-900 mt-2">Página no encontrada</h1>
        <p className="text-slate-500 mt-3 text-sm">
          La dirección que buscas no existe o fue movida.
        </p>

        <code className="block mt-4 px-3 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs break-all">
          {attemptedUrl}
        </code>

        <Link
          to="/dashboard"
          className="inline-block mt-8 px-6 py-3 bg-brand-800 hover:bg-brand-700 text-white font-semibold rounded-lg transition-colors"
        >
          ← Volver al dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
