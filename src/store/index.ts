import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'

interface AppState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark' | 'system';
  user: User | null;
  notifications: Notification[];
  
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setUser: (user: User | null) => void;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      sidebarCollapsed: false,
      theme: 'light',
      user: null,
      notifications: [],

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      
      setTheme: (theme) => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        
        if (theme === 'system') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          root.classList.add(systemTheme);
        } else {
          root.classList.add(theme);
        }
        
        set({ theme });
      },
      
      setUser: (user) => set({ user }),
      
      addNotification: (notification) => 
        set((state) => ({ 
          notifications: [...state.notifications, { ...notification, id: notification.id || Date.now().toString() }] 
        })),
      
      removeNotification: (id) => 
        set((state) => ({ 
          notifications: state.notifications.filter((n) => n.id !== id) 
        })),
      
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'rotaflux-storage',
      partialize: (state) => ({ theme: state.theme, sidebarCollapsed: state.sidebarCollapsed }),
    }
  )
)

interface FilterState {
  shipmentFilters: {
    status: string[];
    dateRange: { start: string; end: string } | null;
    customerId: string | null;
    driverId: string | null;
    search: string;
  };
  
  setShipmentFilters: (filters: Partial<FilterState['shipmentFilters']>) => void;
  resetShipmentFilters: () => void;
}

const defaultShipmentFilters = {
  status: [],
  dateRange: null,
  customerId: null,
  driverId: null,
  search: '',
};

export const useFilterStore = create<FilterState>((set) => ({
  shipmentFilters: defaultShipmentFilters,
  
  setShipmentFilters: (filters) => 
    set((state) => ({ 
      shipmentFilters: { ...state.shipmentFilters, ...filters } 
    })),
  
  resetShipmentFilters: () => set({ shipmentFilters: defaultShipmentFilters }),
}))
