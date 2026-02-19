import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store';

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const styles = {
  success: 'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800 text-success-800 dark:text-success-200',
  error: 'bg-danger-50 dark:bg-danger-900/20 border-danger-200 dark:border-danger-800 text-danger-800 dark:text-danger-200',
  warning: 'bg-accent-50 dark:bg-accent-900/20 border-accent-200 dark:border-accent-800 text-accent-800 dark:text-accent-200',
  info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
};

interface ToastItemProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

function ToastItem({ id, type, title, message, duration = 5000 }: ToastItemProps) {
  const removeNotification = useAppStore((state) => state.removeNotification);
  const Icon = icons[type];

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        removeNotification(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, removeNotification]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl border shadow-soft',
        'min-w-[320px] max-w-[420px]',
        styles[type]
      )}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="font-medium">{title}</p>
        {message && (
          <p className="text-sm opacity-80 mt-0.5">{message}</p>
        )}
      </div>
      <button
        onClick={() => removeNotification(id)}
        className="flex-shrink-0 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export function ToastContainer() {
  const notifications = useAppStore((state) => state.notifications);

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <ToastItem
            key={notification.id}
            id={notification.id}
            type={notification.type}
            title={notification.title}
            message={notification.message}
            duration={notification.duration}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export function useToast() {
  const addNotification = useAppStore((state) => state.addNotification);

  return {
    success: (title: string, message?: string) => {
      addNotification({ id: Date.now().toString(), type: 'success', title, message });
    },
    error: (title: string, message?: string) => {
      addNotification({ id: Date.now().toString(), type: 'error', title, message });
    },
    warning: (title: string, message?: string) => {
      addNotification({ id: Date.now().toString(), type: 'warning', title, message });
    },
    info: (title: string, message?: string) => {
      addNotification({ id: Date.now().toString(), type: 'info', title, message });
    },
  };
}
