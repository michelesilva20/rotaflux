import {
  customers,
  drivers,
  vehicles,
  routes,
  suppliers,
  shipments,
  invoices,
  maintenances,
  refuelings,
  dashboardKPIs,
  deliveriesPerDay,
  deliveriesPerDayExtended,
  costsByCategory,
  topRoutes,
  alerts,
  recentShipments,
} from '@/mocks';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const randomDelay = () => delay(Math.random() * 500 + 200);

export const api = {
  customers: {
    getAll: async () => {
      await randomDelay();
      return customers;
    },
    getById: async (id: string) => {
      await randomDelay();
      return customers.find((c) => c.id === id);
    },
  },

  drivers: {
    getAll: async () => {
      await randomDelay();
      return drivers;
    },
    getById: async (id: string) => {
      await randomDelay();
      return drivers.find((d) => d.id === id);
    },
  },

  vehicles: {
    getAll: async () => {
      await randomDelay();
      return vehicles;
    },
    getById: async (id: string) => {
      await randomDelay();
      return vehicles.find((v) => v.id === id);
    },
    getMaintenances: async (vehicleId: string) => {
      await randomDelay();
      return maintenances.filter((m) => m.vehicleId === vehicleId);
    },
    getRefuelings: async (vehicleId: string) => {
      await randomDelay();
      return refuelings.filter((r) => r.vehicleId === vehicleId);
    },
  },

  routes: {
    getAll: async () => {
      await randomDelay();
      return routes;
    },
    getById: async (id: string) => {
      await randomDelay();
      return routes.find((r) => r.id === id);
    },
  },

  suppliers: {
    getAll: async () => {
      await randomDelay();
      return suppliers;
    },
    getById: async (id: string) => {
      await randomDelay();
      return suppliers.find((s) => s.id === id);
    },
  },

  shipments: {
    getAll: async () => {
      await randomDelay();
      return shipments;
    },
    getById: async (id: string) => {
      await randomDelay();
      return shipments.find((s) => s.id === id);
    },
    getByStatus: async (status: string) => {
      await randomDelay();
      return shipments.filter((s) => s.status === status);
    },
  },

  invoices: {
    getAll: async () => {
      await randomDelay();
      return invoices;
    },
    getById: async (id: string) => {
      await randomDelay();
      return invoices.find((i) => i.id === id);
    },
    getByStatus: async (status: string) => {
      await randomDelay();
      return invoices.filter((i) => i.status === status);
    },
  },

  dashboard: {
    getKPIs: async () => {
      await randomDelay();
      return dashboardKPIs;
    },
    getDeliveriesChart: async (days: 7 | 14 | 30 = 7) => {
      await randomDelay();
      if (days === 7) return deliveriesPerDay;
      return deliveriesPerDayExtended;
    },
    getCostsByCategory: async () => {
      await randomDelay();
      return costsByCategory;
    },
    getTopRoutes: async () => {
      await randomDelay();
      return topRoutes;
    },
    getAlerts: async () => {
      await randomDelay();
      return alerts;
    },
    getRecentShipments: async () => {
      await randomDelay();
      return recentShipments;
    },
  },

  auth: {
    login: async (email: string, password: string) => {
      await delay(1000);
      if (email && password) {
        return {
          user: {
            id: 'user-001',
            name: 'Michele Silva',
            email: email,
            role: 'admin' as const,
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          },
          token: 'fake-jwt-token-12345',
        };
      }
      throw new Error('Credenciais inválidas');
    },
    logout: async () => {
      await delay(300);
      return true;
    },
  },
};
