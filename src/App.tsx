import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Landing, Login } from '@/pages';
import {
  Dashboard,
  Operacao,
  Embarques,
  Frota,
  Financeiro,
  Cadastros,
  Relatorios,
  Configuracoes,
} from '@/pages/app';
import { AppLayout } from '@/components/layout';
import { useAppStore } from '@/store';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useAppStore((state) => state.user);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  const { theme } = useAppStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected Routes */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="operacao" element={<Operacao />} />
        <Route path="embarques" element={<Embarques />} />
        <Route path="frota" element={<Frota />} />
        <Route path="financeiro" element={<Financeiro />} />
        <Route path="cadastros" element={<Cadastros />} />
        <Route path="relatorios" element={<Relatorios />} />
        <Route path="configuracoes" element={<Configuracoes />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
