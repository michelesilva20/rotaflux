import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Receipt,
  Download,
  Filter,
  PieChart,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { api } from '@/services/fakeApi';
import { formatCurrency, formatDate } from '@/lib/utils';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { KPIStatCard } from '@/components/ui/KPIStatCard';
import { ChartCard } from '@/components/ui/ChartCard';
import { Table, type Column } from '@/components/ui/Table';
import { Tabs } from '@/components/ui/Tabs';
import { StatusChip } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import type { Invoice } from '@/types';

export function Financeiro() {
  const toast = useToast();

  const { data: invoices, isLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: api.invoices.getAll,
  });

  const { data: costsData } = useQuery({
    queryKey: ['costs'],
    queryFn: api.dashboard.getCostsByCategory,
  });

  const financialStats = {
    totalRevenue: invoices?.filter(i => i.status === 'paid').reduce((acc, i) => acc + i.value, 0) || 0,
    totalPending: invoices?.filter(i => i.status === 'pending').reduce((acc, i) => acc + i.value, 0) || 0,
    totalOverdue: invoices?.filter(i => i.status === 'overdue').reduce((acc, i) => acc + i.value, 0) || 0,
    avgTicket: invoices?.length ? (invoices.reduce((acc, i) => acc + i.value, 0) / invoices.length) : 0,
  };

  const invoiceColumns: Column<Invoice>[] = [
    {
      key: 'number',
      header: 'Fatura',
      render: (invoice) => (
        <span className="font-semibold text-brand-600 dark:text-brand-400">
          {invoice.number}
        </span>
      ),
    },
    {
      key: 'customer',
      header: 'Cliente',
      render: (invoice) => invoice.customer.name,
    },
    {
      key: 'value',
      header: 'Valor',
      render: (invoice) => (
        <span className="font-medium">{formatCurrency(invoice.value)}</span>
      ),
    },
    {
      key: 'dueDate',
      header: 'Vencimento',
      render: (invoice) => formatDate(invoice.dueDate),
    },
    {
      key: 'status',
      header: 'Status',
      render: (invoice) => <StatusChip status={invoice.status} />,
    },
  ];

  const handleExport = () => {
    toast.success('Relatório exportado', 'O arquivo foi gerado com sucesso');
  };

  const invoicesContent = (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPIStatCard
          title="Receita recebida"
          value={formatCurrency(financialStats.totalRevenue)}
          change={12.5}
          changeLabel="vs. mês anterior"
          icon={<DollarSign className="w-6 h-6" />}
        />
        <KPIStatCard
          title="A receber"
          value={formatCurrency(financialStats.totalPending)}
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <KPIStatCard
          title="Vencido"
          value={formatCurrency(financialStats.totalOverdue)}
          trend="down"
          icon={<TrendingDown className="w-6 h-6" />}
        />
        <KPIStatCard
          title="Ticket médio"
          value={formatCurrency(financialStats.avgTicket)}
          change={5.2}
          changeLabel="vs. mês anterior"
          icon={<Receipt className="w-6 h-6" />}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="secondary" leftIcon={<Filter className="w-4 h-4" />}>
          Filtrar
        </Button>
        <Button variant="secondary" leftIcon={<Download className="w-4 h-4" />} onClick={handleExport}>
          Exportar
        </Button>
      </div>

      {/* Invoices Table */}
      <Card padding="none">
        <CardHeader title="Faturas" className="p-4 pb-0" />
        <Table
          columns={invoiceColumns}
          data={invoices || []}
          keyExtractor={(item) => item.id}
          isLoading={isLoading}
          emptyMessage="Nenhuma fatura encontrada"
        />
      </Card>
    </div>
  );

  const costsContent = (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Costs by Category Chart */}
        <ChartCard title="Custos por categoria" subtitle="Mês atual">
          {costsData ? (
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie>
                <Pie
                  data={costsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ category, percent }) => `${category} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {costsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Legend />
              </RechartsPie>
            </ResponsiveContainer>
          ) : null}
        </ChartCard>

        {/* Costs Table */}
        <Card>
          <CardHeader title="Detalhamento de custos" />
          <div className="space-y-4">
            {costsData?.map((cost, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: cost.color }}
                  />
                  <span className="font-medium text-slate-900 dark:text-white">
                    {cost.category}
                  </span>
                </div>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {formatCurrency(cost.value)}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3 border-t-2 border-slate-200 dark:border-slate-600">
              <span className="font-bold text-slate-900 dark:text-white">Total</span>
              <span className="font-bold text-lg text-brand-600 dark:text-brand-400">
                {formatCurrency(costsData?.reduce((acc, c) => acc + c.value, 0) || 0)}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Monthly Costs Chart */}
      <ChartCard title="Evolução mensal de custos" height={350}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={[
              { month: 'Set', value: 38500 },
              { month: 'Out', value: 42300 },
              { month: 'Nov', value: 39800 },
              { month: 'Dez', value: 44100 },
              { month: 'Jan', value: 41200 },
              { month: 'Fev', value: 45680 },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );

  const tabs = [
    { id: 'invoices', label: 'Faturas', icon: <Receipt className="w-4 h-4" />, content: invoicesContent },
    { id: 'costs', label: 'Custos', icon: <PieChart className="w-4 h-4" />, content: costsContent },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Financeiro"
        subtitle="Gestão de faturamento e custos"
      />

      <Tabs tabs={tabs} />
    </motion.div>
  );
}
