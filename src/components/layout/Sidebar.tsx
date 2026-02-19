import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Truck,
  Package,
  Car,
  DollarSign,
  Database,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store';

const menuItems = [
  { path: '/app', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { path: '/app/operacao', icon: Truck, label: 'Operação' },
  { path: '/app/embarques', icon: Package, label: 'Embarques' },
  { path: '/app/frota', icon: Car, label: 'Frota' },
  { path: '/app/financeiro', icon: DollarSign, label: 'Financeiro' },
  { path: '/app/cadastros', icon: Database, label: 'Cadastros' },
  { path: '/app/relatorios', icon: FileText, label: 'Relatórios' },
  { path: '/app/configuracoes', icon: Settings, label: 'Configurações' },
];

export function Sidebar() {
  const location = useLocation();
  const { sidebarCollapsed, setSidebarCollapsed } = useAppStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'fixed left-0 top-0 bottom-0 z-40',
        'bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700',
        'flex flex-col'
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 dark:border-slate-700">
        <AnimatePresence mode="wait">
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-secondary-500 flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-heading gradient-text">
                RotaFlux
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {sidebarCollapsed && (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-secondary-500 flex items-center justify-center mx-auto">
            <Truck className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = item.end 
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);
            
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.end}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl',
                    'transition-all duration-200 group relative',
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-brand-600 rounded-r-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <item.icon className={cn(
                    'w-5 h-5 flex-shrink-0',
                    isActive ? 'text-brand-600 dark:text-brand-400' : ''
                  )} />
                  <AnimatePresence mode="wait">
                    {!sidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="font-medium whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-3 border-t border-slate-100 dark:border-slate-700">
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={cn(
            'w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl',
            'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700',
            'transition-colors duration-200'
          )}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Recolher</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
