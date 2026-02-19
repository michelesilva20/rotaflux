import type { DashboardKPIs, ChartDataPoint, CostByCategory } from '@/types';

export const dashboardKPIs: DashboardKPIs = {
  onTimeDeliveries: 94,
  onTimeDeliveriesChange: 2.5,
  inTransit: 12,
  inTransitChange: 3,
  delayed: 2,
  delayedChange: -1,
  openOccurrences: 3,
  openOccurrencesChange: 1,
  estimatedCost: 45680,
  estimatedCostChange: -5.2,
  monthRevenue: 287500,
  monthRevenueChange: 12.8,
};

export const deliveriesPerDay: ChartDataPoint[] = [
  { date: '2026-02-13', value: 8, label: '13 Fev' },
  { date: '2026-02-14', value: 12, label: '14 Fev' },
  { date: '2026-02-15', value: 10, label: '15 Fev' },
  { date: '2026-02-16', value: 15, label: '16 Fev' },
  { date: '2026-02-17', value: 9, label: '17 Fev' },
  { date: '2026-02-18', value: 14, label: '18 Fev' },
  { date: '2026-02-19', value: 11, label: '19 Fev' },
];

export const deliveriesPerDayExtended: ChartDataPoint[] = [
  { date: '2026-02-05', value: 7, label: '05 Fev' },
  { date: '2026-02-06', value: 9, label: '06 Fev' },
  { date: '2026-02-07', value: 11, label: '07 Fev' },
  { date: '2026-02-08', value: 6, label: '08 Fev' },
  { date: '2026-02-09', value: 4, label: '09 Fev' },
  { date: '2026-02-10', value: 8, label: '10 Fev' },
  { date: '2026-02-11', value: 13, label: '11 Fev' },
  { date: '2026-02-12', value: 10, label: '12 Fev' },
  { date: '2026-02-13', value: 8, label: '13 Fev' },
  { date: '2026-02-14', value: 12, label: '14 Fev' },
  { date: '2026-02-15', value: 10, label: '15 Fev' },
  { date: '2026-02-16', value: 15, label: '16 Fev' },
  { date: '2026-02-17', value: 9, label: '17 Fev' },
  { date: '2026-02-18', value: 14, label: '18 Fev' },
  { date: '2026-02-19', value: 11, label: '19 Fev' },
];

export const costsByCategory: CostByCategory[] = [
  { category: 'Combustível', value: 18500, color: '#2563EB' },
  { category: 'Pedágio', value: 8200, color: '#06B6D4' },
  { category: 'Manutenção', value: 12300, color: '#F59E0B' },
  { category: 'Pneus', value: 4500, color: '#22C55E' },
  { category: 'Outros', value: 2180, color: '#94A3B8' },
];

export const topRoutes = [
  { 
    route: 'São Paulo - Rio de Janeiro', 
    trips: 45, 
    avgTime: '5h 30min', 
    avgDelay: '15min',
    onTimeRate: 96,
  },
  { 
    route: 'São Paulo - Belo Horizonte', 
    trips: 38, 
    avgTime: '7h 45min', 
    avgDelay: '25min',
    onTimeRate: 92,
  },
  { 
    route: 'São Paulo - Curitiba', 
    trips: 32, 
    avgTime: '5h 15min', 
    avgDelay: '10min',
    onTimeRate: 97,
  },
  { 
    route: 'Rio de Janeiro - Vitória', 
    trips: 28, 
    avgTime: '6h 30min', 
    avgDelay: '20min',
    onTimeRate: 94,
  },
  { 
    route: 'Campinas - Goiânia', 
    trips: 22, 
    avgTime: '9h 15min', 
    avgDelay: '35min',
    onTimeRate: 88,
  },
];

export const alerts = [
  {
    id: 'alert-001',
    type: 'danger' as const,
    title: 'Embarque com atraso crítico',
    description: 'EMB-2026-0003 está com atraso de 4h devido a condições climáticas.',
    timestamp: '2026-02-19T10:30:00Z',
  },
  {
    id: 'alert-002',
    type: 'warning' as const,
    title: 'Veículo em manutenção',
    description: 'JKL-3456 entrou em manutenção corretiva. Previsão: 2 dias.',
    timestamp: '2026-02-19T08:00:00Z',
  },
  {
    id: 'alert-003',
    type: 'info' as const,
    title: 'Fatura próxima do vencimento',
    description: 'FAT-2026-0001 vence em 5 dias. Valor: R$ 15.800,00',
    timestamp: '2026-02-19T07:00:00Z',
  },
];

export const recentShipments = [
  {
    id: 'ship-001',
    code: 'EMB-2026-0001',
    customer: 'Atacadão Distribuidora',
    origin: 'São Paulo, SP',
    destination: 'Rio de Janeiro, RJ',
    status: 'in_transit',
    estimatedDelivery: '2026-02-20T14:00:00Z',
  },
  {
    id: 'ship-006',
    code: 'EMB-2026-0006',
    customer: 'Alimentos Naturais',
    origin: 'Goiânia, GO',
    destination: 'Brasília, DF',
    status: 'in_transit',
    estimatedDelivery: '2026-02-19T20:00:00Z',
  },
  {
    id: 'ship-005',
    code: 'EMB-2026-0005',
    customer: 'Eletrônicos Tech Express',
    origin: 'Porto Alegre, RS',
    destination: 'Florianópolis, SC',
    status: 'collected',
    estimatedDelivery: '2026-02-20T18:00:00Z',
  },
  {
    id: 'ship-003',
    code: 'EMB-2026-0003',
    customer: 'Metalúrgica Nacional',
    origin: 'Campinas, SP',
    destination: 'Curitiba, PR',
    status: 'occurrence',
    estimatedDelivery: '2026-02-19T12:00:00Z',
  },
  {
    id: 'ship-004',
    code: 'EMB-2026-0004',
    customer: 'Farmacêutica Saúde Total',
    origin: 'Rio de Janeiro, RJ',
    destination: 'Vitória, ES',
    status: 'planned',
    estimatedDelivery: '2026-02-22T10:00:00Z',
  },
];
