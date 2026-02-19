import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  TrendingUp,
  Truck,
  AlertTriangle,
  DollarSign,
  Calendar,
  Download,
  Eye,
  Filter,
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
} from 'recharts';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { ChartCard } from '@/components/ui/ChartCard';
import { Table, type Column } from '@/components/ui/Table';
import { useToast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

const reports = [
  {
    id: 'performance',
    title: 'Performance de entregas',
    description: 'Análise de pontualidade e eficiência das entregas',
    icon: TrendingUp,
    color: 'bg-brand-500',
  },
  {
    id: 'costs-vehicle',
    title: 'Custos por veículo',
    description: 'Detalhamento de custos operacionais por veículo',
    icon: Truck,
    color: 'bg-secondary-500',
  },
  {
    id: 'occurrences',
    title: 'Ocorrências por tipo',
    description: 'Análise de ocorrências e problemas operacionais',
    icon: AlertTriangle,
    color: 'bg-accent-500',
  },
  {
    id: 'revenue-customer',
    title: 'Faturamento por cliente',
    description: 'Receita e volume de embarques por cliente',
    icon: DollarSign,
    color: 'bg-success-500',
  },
];

const mockPerformanceData = [
  { month: 'Set', onTime: 92, delayed: 8 },
  { month: 'Out', onTime: 89, delayed: 11 },
  { month: 'Nov', onTime: 94, delayed: 6 },
  { month: 'Dez', onTime: 91, delayed: 9 },
  { month: 'Jan', onTime: 93, delayed: 7 },
  { month: 'Fev', onTime: 95, delayed: 5 },
];

const mockCostsData = [
  { vehicle: 'ABC-1234', fuel: 4500, toll: 1200, maintenance: 800, total: 6500 },
  { vehicle: 'DEF-5678', fuel: 3200, toll: 900, maintenance: 1500, total: 5600 },
  { vehicle: 'GHI-9012', fuel: 6800, toll: 2100, maintenance: 600, total: 9500 },
  { vehicle: 'JKL-3456', fuel: 2100, toll: 600, maintenance: 3200, total: 5900 },
  { vehicle: 'MNO-7890', fuel: 5200, toll: 1500, maintenance: 900, total: 7600 },
];

interface CostRow {
  vehicle: string;
  fuel: number;
  toll: number;
  maintenance: number;
  total: number;
}

export function Relatorios() {
  const toast = useToast();
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenReport = (reportId: string) => {
    setSelectedReport(reportId);
    setIsModalOpen(true);
  };

  const handleExport = () => {
    toast.success('Relatório exportado', 'O arquivo PDF foi gerado com sucesso');
  };

  const costColumns: Column<CostRow>[] = [
    { key: 'vehicle', header: 'Veículo' },
    { key: 'fuel', header: 'Combustível', render: (row) => formatCurrency(row.fuel) },
    { key: 'toll', header: 'Pedágio', render: (row) => formatCurrency(row.toll) },
    { key: 'maintenance', header: 'Manutenção', render: (row) => formatCurrency(row.maintenance) },
    {
      key: 'total',
      header: 'Total',
      render: (row) => (
        <span className="font-bold text-slate-900 dark:text-white">
          {formatCurrency(row.total)}
        </span>
      ),
    },
  ];

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'performance':
        return (
          <div className="space-y-6">
            <div className="flex gap-4">
              <Input type="date" label="Data início" />
              <Input type="date" label="Data fim" />
              <Button variant="secondary" leftIcon={<Filter className="w-4 h-4" />}>
                Filtrar
              </Button>
            </div>
            <ChartCard title="Taxa de pontualidade" height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="onTime"
                    stroke="#22c55e"
                    strokeWidth={3}
                    name="No prazo (%)"
                  />
                  <Line
                    type="monotone"
                    dataKey="delayed"
                    stroke="#ef4444"
                    strokeWidth={3}
                    name="Atrasadas (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
            <div className="grid grid-cols-3 gap-4">
              <Card className="text-center">
                <p className="text-3xl font-bold text-success-600">94%</p>
                <p className="text-sm text-slate-500">Média de pontualidade</p>
              </Card>
              <Card className="text-center">
                <p className="text-3xl font-bold text-brand-600">1.247</p>
                <p className="text-sm text-slate-500">Total de entregas</p>
              </Card>
              <Card className="text-center">
                <p className="text-3xl font-bold text-accent-600">5h 23min</p>
                <p className="text-sm text-slate-500">Tempo médio de entrega</p>
              </Card>
            </div>
          </div>
        );

      case 'costs-vehicle':
        return (
          <div className="space-y-6">
            <div className="flex gap-4">
              <Input type="date" label="Data início" />
              <Input type="date" label="Data fim" />
              <Button variant="secondary" leftIcon={<Filter className="w-4 h-4" />}>
                Filtrar
              </Button>
            </div>
            <ChartCard title="Custos por veículo" height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockCostsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="vehicle" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Bar dataKey="fuel" fill="#2563eb" name="Combustível" stackId="a" />
                  <Bar dataKey="toll" fill="#06b6d4" name="Pedágio" stackId="a" />
                  <Bar dataKey="maintenance" fill="#f59e0b" name="Manutenção" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            <Card padding="none">
              <Table
                columns={costColumns}
                data={mockCostsData}
                keyExtractor={(row) => row.vehicle}
              />
            </Card>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">Selecione os filtros para gerar o relatório</p>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Relatórios"
        subtitle="Análises e relatórios operacionais"
      />

      {/* Report Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              hover
              className="cursor-pointer h-full"
              onClick={() => handleOpenReport(report.id)}
            >
              <div
                className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4',
                  report.color
                )}
              >
                <report.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                {report.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {report.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Access */}
      <Card>
        <CardHeader
          title="Relatórios recentes"
          action={
            <Button variant="ghost" size="sm">
              Ver histórico
            </Button>
          }
        />
        <div className="space-y-3">
          {[
            { name: 'Performance de entregas - Fevereiro 2026', date: '19/02/2026', type: 'PDF' },
            { name: 'Custos por veículo - Janeiro 2026', date: '01/02/2026', type: 'Excel' },
            { name: 'Faturamento por cliente - Q4 2025', date: '15/01/2026', type: 'PDF' },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700">
                  <FileText className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    Gerado em {item.date} • {item.type}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Report Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={reports.find((r) => r.id === selectedReport)?.title || 'Relatório'}
        size="xl"
      >
        {renderReportContent()}
        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
          <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
            Fechar
          </Button>
          <Button leftIcon={<Download className="w-4 h-4" />} onClick={handleExport}>
            Exportar PDF
          </Button>
        </div>
      </Modal>
    </motion.div>
  );
}
