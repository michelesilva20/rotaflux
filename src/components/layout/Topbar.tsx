import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Moon,
  Sun,
  LogOut,
  User,
  Settings,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store';
import { Input } from '@/components/ui/Input';
import { DropdownMenu } from '@/components/ui/DropdownMenu';
import { Badge } from '@/components/ui/Badge';

export function Topbar() {
  const navigate = useNavigate();
  const { user, theme, setTheme, setUser, sidebarCollapsed } = useAppStore();
  const [searchValue, setSearchValue] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: '1', title: 'Embarque entregue', message: 'EMB-2026-0002 foi entregue com sucesso', time: '5 min' },
    { id: '2', title: 'Ocorrência registrada', message: 'Nova ocorrência no EMB-2026-0003', time: '15 min' },
    { id: '3', title: 'Fatura vencendo', message: 'FAT-2026-0004 vence em 2 dias', time: '1h' },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const userMenuItems = [
    { id: 'profile', label: 'Meu Perfil', icon: <User className="w-4 h-4" />, onClick: () => navigate('/app/configuracoes') },
    { id: 'settings', label: 'Configurações', icon: <Settings className="w-4 h-4" />, onClick: () => navigate('/app/configuracoes') },
    { id: 'divider', label: '', divider: true },
    { id: 'logout', label: 'Sair', icon: <LogOut className="w-4 h-4" />, onClick: handleLogout, danger: true },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-16 z-30',
        'bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl',
        'border-b border-slate-200 dark:border-slate-700',
        'flex items-center justify-between px-6 gap-4',
        'transition-all duration-300'
      )}
      style={{ left: sidebarCollapsed ? 80 : 280 }}
    >
      <div className="flex-1 max-w-md">
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Buscar embarques, clientes, veículos..."
          leftIcon={<Search className="w-4 h-4" />}
          className="bg-slate-50 dark:bg-slate-700/50 border-transparent focus:bg-white dark:focus:bg-slate-700"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className={cn(
            'p-2.5 rounded-xl transition-colors duration-200',
            'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white',
            'hover:bg-slate-100 dark:hover:bg-slate-700'
          )}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={cn(
              'p-2.5 rounded-xl transition-colors duration-200 relative',
              'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white',
              'hover:bg-slate-100 dark:hover:bg-slate-700'
            )}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    'absolute right-0 mt-2 w-80 z-50',
                    'bg-white dark:bg-slate-800 rounded-2xl shadow-xl',
                    'border border-slate-100 dark:border-slate-700',
                    'overflow-hidden'
                  )}
                >
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        Notificações
                      </h3>
                      <Badge variant="primary" size="sm">
                        {notifications.length}
                      </Badge>
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer border-b border-slate-50 dark:border-slate-700/50 last:border-0"
                      >
                        <p className="font-medium text-sm text-slate-900 dark:text-white">
                          {notification.title}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                          {notification.message}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-700">
                    <button className="w-full text-center text-sm text-brand-600 dark:text-brand-400 font-medium hover:underline">
                      Ver todas as notificações
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2" />

        <DropdownMenu
          trigger={
            <button className="flex items-center gap-3 p-1.5 pr-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-secondary-500 flex items-center justify-center text-white font-medium text-sm">
                {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'US'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {user?.name || 'Usuário'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {user?.role === 'admin' ? 'Administrador' : 'Operador'}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          }
          items={userMenuItems}
        />
      </div>
    </header>
  );
}
