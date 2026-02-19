import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Truck,
  AlertTriangle,
  AlertCircle,
  DollarSign,
  Package,
  ArrowRight,
  Clock,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Link } from 'react-router-dom';
import { api } from '@/services/fakeApi';
import { formatCurrency } from '@/lib/utils';
import { PageHeader } from '@/components/ui/PageHeader';
import { KPIStatCard } from '@/components/ui/KPIStatCard';
import { Card, CardHeader } from '@/components/ui/Card';
import { ChartCard } from '@/components/ui/ChartCard';
import { StatusChip } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Dashboard() {
  const { data: kpis, isLoading: kpisLoading } = useQuery({
    queryKey: ['dashboard-kpis'],
    queryFn: api.dashboard.getKPIs,
  });

  const { data: deliveriesChart, isLoading: chartLoading } = useQuery({
    queryKey: ['dashboard-deliveries'],
    queryFn: () => api.dashboard.getDeliveriesChart(7),
  });

  const { data: costsData } = useQuery({
    queryKey: ['dashboard-costs'],
    queryFn: api.dashboard.getCostsByCategory,
  });

  const { data: topRoutes } = useQuery({
    queryKey: ['dashboard-routes'],
    queryFn: api.dashboard.getTopRoutes,
  });

  const { data: alerts } = useQuery({
    queryKey: ['dashboard-alerts'],
    queryFn: api.dashboard.getAlerts,
  });

  const { data: recentShipments } = useQuery({
    queryKey: ['dashboard-shipments'],
    queryFn: api.dashboard.getRecentShipments,
  });

  const alertIcon = {
    danger: AlertCircle,
    warning: AlertTriangle,
    info: Clock,
  };

  const alertStyles = {
    danger: 'bg-danger-50 dark:bg-danger-900/20 border-danger-200 dark:border-danger-800 text-danger-700 dark:text-danger-300',
    warning: 'bg-accent-50 dark:bg-accent-900/20 border-accent-200 dark:border-accent-800 text-accent-700 dark:text-accent-300',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <PageHeader
        title="Dashboard"
        subtitle="Visão geral da sua operação"
        action={
          <Link to="/app/embarques">
            <Button rightIcon={<ArrowRight className="w-4 h-4" />}>
              Novo embarque
            </Button>
          </Link>
        }
      />

      {/* KPIs */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6"
      >
        {kpisLoading ? (
          [...Array(6)].map((_, i) => (
            <Card key={i}>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-4 w-20" />
            </Card>
          ))
        ) : (
          <>
            <KPIStatCard
              title="Entregas no prazo"
              value={`${kpis?.onTimeDeliveries}%`}
              change={kpis?.onTimeDeliveriesChange}
              changeLabel="vs. mês anterior"
              icon={<TrendingUp className="w-6 h-6" />}
            />
            <KPIStatCard
              title="Em trânsito"
              value={kpis?.inTransit || 0}
              change={kpis?.inTransitChange}
              changeLabel="vs. ontem"
              icon={<Truck className="w-6 h-6" />}
            />
            <KPIStatCard
              title="Atrasadas"
              value={kpis?.delayed || 0}
              change={kpis?.delayedChange}
              changeLabel="vs. ontem"
              trend="down"
              icon={<AlertTriangle className="w-6 h-6" />}
            />
            <KPIStatCard
              title="Ocorrências"
              value={kpis?.openOccurrences || 0}
              change={kpis?.openOccurrencesChange}
              changeLabel="abertas"
              icon={<AlertCircle className="w-6 h-6" />}
            />
            <KPIStatCard
              title="Custo estimado"
              value={formatCurrency(kpis?.estimatedCost || 0)}
              change={kpis?.estimatedCostChange}
              changeLabel="vs. mês anterior"
              icon={<DollarSign className="w-6 h-6" />}
            />
            <KPIStatCard
              title="Receita do mês"
              value={formatCurrency(kpis?.monthRevenue || 0)}
              change={kpis?.monthRevenueChange}
              changeLabel="vs. mês anterior"
              icon={<Package className="w-6 h-6" />}
            />
          </>
        )}
      </motion.div>

      {/* Charts Row */}
      <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-6 mb-6">
        <ChartCard
          title="Entregas por dia"
          subtitle="Últimos 7 dias"
          action={
            <select className="text-sm border-0 bg-slate-100 dark:bg-slate-700 rounded-lg px-3 py-1.5">
              <option value="7">7 dias</option>
              <option value="14">14 dias</option>
              <option value="30">30 dias</option>
            </select>
          }
        >
          {chartLoading ? (
            <div className="h-full flex items-center justify-center">
              <Skeleton className="h-full w-full" variant="rectangular" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={deliveriesChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="label"
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#2563eb' }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard title="Custos por categoria" subtitle="Mês atual">
          {costsData ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                />
                <YAxis
                  dataKey="category"
                  type="category"
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={(value: number) => [formatCurrency(value), 'Valor']}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {costsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center">
              <Skeleton className="h-full w-full" variant="rectangular" />
            </div>
          )}
        </ChartCard>
      </motion.div>

      {/* Bottom Row */}
      <motion.div variants={itemVariants} className="grid lg:grid-cols-3 gap-6">
        {/* Alerts */}
        <Card>
          <CardHeader
            title="Alertas"
            action={
              <Button variant="ghost" size="sm">
                Ver todos
              </Button>
            }
          />
          <div className="space-y-3">
            {alerts?.map((alert) => {
              const Icon = alertIcon[alert.type];
              return (
                <div
                  key={alert.id}
                  className={cn(
                    'p-3 rounded-xl border flex items-start gap-3',
                    alertStyles[alert.type]
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{alert.title}</p>
                    <p className="text-xs opacity-80 mt-0.5">{alert.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Top Routes */}
        <Card>
          <CardHeader
            title="Top rotas"
            subtitle="Por número de viagens"
          />
          <div className="space-y-3">
            {topRoutes?.slice(0, 4).map((route, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {route.route}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {route.trips} viagens • {route.avgTime}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={cn(
                      'text-sm font-medium',
                      route.onTimeRate >= 95
                        ? 'text-success-600'
                        : route.onTimeRate >= 90
                        ? 'text-accent-600'
                        : 'text-danger-600'
                    )}
                  >
                    {route.onTimeRate}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Shipments */}
        <Card>
          <CardHeader
            title="Últimos embarques"
            action={
              <Link to="/app/embarques">
                <Button variant="ghost" size="sm">
                  Ver todos
                </Button>
              </Link>
            }
          />
          <div className="space-y-3">
            {recentShipments?.slice(0, 4).map((shipment) => (
              <div
                key={shipment.id}
                className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {shipment.code}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {shipment.customer}
                  </p>
                </div>
                <StatusChip status={shipment.status as 'planned' | 'collected' | 'in_transit' | 'delivered' | 'occurrence'} />
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
