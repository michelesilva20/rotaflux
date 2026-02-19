import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Copy,
  Printer,
  MoreHorizontal,
  ArrowRight,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { api } from '@/services/fakeApi';
import { formatCurrency, formatDate } from '@/lib/utils';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Table, type Column } from '@/components/ui/Table';
import { StatusChip, Badge } from '@/components/ui/Badge';
import { Modal, ModalFooter } from '@/components/ui/Modal';
import { DropdownMenu } from '@/components/ui/DropdownMenu';
import { useToast } from '@/components/ui/Toast';
import type { Shipment } from '@/types';
import { cn } from '@/lib/utils';

const statusOptions = [
  { value: '', label: 'Todos os status' },
  { value: 'planned', label: 'Planejado' },
  { value: 'collected', label: 'Coletado' },
  { value: 'in_transit', label: 'Em Trânsito' },
  { value: 'delivered', label: 'Entregue' },
  { value: 'occurrence', label: 'Ocorrência' },
];

export function Embarques() {
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);

  const { data: shipments, isLoading } = useQuery({
    queryKey: ['shipments'],
    queryFn: api.shipments.getAll,
  });

  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: api.customers.getAll,
  });

  const { data: vehicles } = useQuery({
    queryKey: ['vehicles'],
    queryFn: api.vehicles.getAll,
  });

  const { data: drivers } = useQuery({
    queryKey: ['drivers'],
    queryFn: api.drivers.getAll,
  });

  const filteredShipments = shipments?.filter((shipment) => {
    const matchesSearch =
      shipment.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !statusFilter || shipment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const columns: Column<Shipment>[] = [
    {
      key: 'code',
      header: 'Embarque',
      render: (shipment) => (
        <div>
          <p className="font-semibold text-brand-600 dark:text-brand-400">
            {shipment.code}
          </p>
          <p className="text-xs text-slate-500">{shipment.customer.name}</p>
        </div>
      ),
    },
    {
      key: 'route',
      header: 'Rota',
      render: (shipment) => (
        <div className="text-sm">
          <p>{shipment.origin}</p>
          <p className="text-slate-500">→ {shipment.destination}</p>
        </div>
      ),
    },
    {
      key: 'estimatedDelivery',
      header: 'Previsão',
      render: (shipment) => (
        <span className="text-sm">{formatDate(shipment.estimatedDelivery)}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (shipment) => <StatusChip status={shipment.status} />,
    },
    {
      key: 'priority',
      header: 'Prioridade',
      render: (shipment) => (
        <Badge
          variant={
            shipment.priority === 'urgent'
              ? 'danger'
              : shipment.priority === 'high'
              ? 'warning'
              : 'default'
          }
          size="sm"
        >
          {shipment.priority === 'urgent'
            ? 'Urgente'
            : shipment.priority === 'high'
            ? 'Alta'
            : shipment.priority === 'medium'
            ? 'Média'
            : 'Baixa'}
        </Badge>
      ),
    },
    {
      key: 'value',
      header: 'Valor',
      render: (shipment) => (
        <span className="font-medium">{formatCurrency(shipment.value)}</span>
      ),
    },
    {
      key: 'actions',
      header: '',
      className: 'w-12',
      render: (shipment) => (
        <DropdownMenu
          trigger={
            <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
              <MoreHorizontal className="w-4 h-4 text-slate-500" />
            </button>
          }
          items={[
            { id: 'view', label: 'Ver detalhes', icon: <Eye className="w-4 h-4" /> },
            { id: 'edit', label: 'Editar', icon: <Edit className="w-4 h-4" /> },
            { id: 'duplicate', label: 'Duplicar', icon: <Copy className="w-4 h-4" /> },
            { id: 'print', label: 'Imprimir', icon: <Printer className="w-4 h-4" />, divider: true },
          ]}
        />
      ),
    },
  ];

  const handleExport = () => {
    toast.success('Exportado com sucesso', 'Arquivo gerado e pronto para download');
  };

  const handleCreateShipment = () => {
    setIsCreateModalOpen(false);
    setWizardStep(1);
    toast.success('Embarque criado', 'O novo embarque foi criado com sucesso');
  };

  const wizardSteps = [
    { number: 1, label: 'Dados básicos' },
    { number: 2, label: 'Rota' },
    { number: 3, label: 'Veículo e custos' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Embarques"
        subtitle="Gerencie todos os embarques da operação"
        action={
          <Button
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Novo embarque
          </Button>
        }
      />

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por código, cliente, origem ou destino..."
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <div className="flex gap-3">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={statusOptions}
              className="w-48"
            />
            <Button variant="secondary" leftIcon={<Filter className="w-4 h-4" />}>
              Mais filtros
            </Button>
            <Button
              variant="secondary"
              leftIcon={<Download className="w-4 h-4" />}
              onClick={handleExport}
            >
              Exportar
            </Button>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card padding="none">
        <Table
          columns={columns}
          data={filteredShipments || []}
          keyExtractor={(item) => item.id}
          isLoading={isLoading}
          emptyMessage="Nenhum embarque encontrado"
        />
      </Card>

      {/* Create Modal with Wizard */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setWizardStep(1);
        }}
        title="Criar novo embarque"
        size="lg"
      >
        {/* Wizard Steps */}
        <div className="flex items-center justify-center mb-8">
          {wizardSteps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors',
                  wizardStep >= step.number
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
                )}
              >
                {wizardStep > step.number ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={cn(
                  'ml-2 text-sm font-medium',
                  wizardStep >= step.number
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-400'
                )}
              >
                {step.label}
              </span>
              {index < wizardSteps.length - 1 && (
                <div
                  className={cn(
                    'w-12 h-0.5 mx-4',
                    wizardStep > step.number
                      ? 'bg-brand-600'
                      : 'bg-slate-200 dark:bg-slate-700'
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[300px]">
          {wizardStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <Select
                label="Cliente"
                options={customers?.map((c) => ({ value: c.id, label: c.name })) || []}
                placeholder="Selecione o cliente"
              />
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Tipo de carga"
                  options={[
                    { value: 'general', label: 'Carga geral' },
                    { value: 'fragile', label: 'Frágil' },
                    { value: 'perishable', label: 'Perecível' },
                    { value: 'dangerous', label: 'Perigosa' },
                  ]}
                  placeholder="Selecione"
                />
                <Select
                  label="Prioridade"
                  options={[
                    { value: 'low', label: 'Baixa' },
                    { value: 'medium', label: 'Média' },
                    { value: 'high', label: 'Alta' },
                    { value: 'urgent', label: 'Urgente' },
                  ]}
                  placeholder="Selecione"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Peso (kg)" type="number" placeholder="0" />
                <Input label="Volume (m³)" type="number" placeholder="0" />
              </div>
            </motion.div>
          )}

          {wizardStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <Input label="Origem" placeholder="Cidade, Estado" />
              <Input label="Destino" placeholder="Cidade, Estado" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Data de coleta" type="date" />
                <Input label="Previsão de entrega" type="date" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Paradas intermediárias
                </label>
                <Button variant="secondary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                  Adicionar parada
                </Button>
              </div>
            </motion.div>
          )}

          {wizardStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Veículo"
                  options={vehicles?.filter(v => v.status === 'available').map((v) => ({ value: v.id, label: `${v.plate} - ${v.model}` })) || []}
                  placeholder="Selecione o veículo"
                />
                <Select
                  label="Motorista"
                  options={drivers?.filter(d => d.status === 'available').map((d) => ({ value: d.id, label: d.name })) || []}
                  placeholder="Selecione o motorista"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Input label="Valor do frete" type="number" placeholder="R$ 0,00" />
                <Input label="Custo combustível" type="number" placeholder="R$ 0,00" />
                <Input label="Custo pedágio" type="number" placeholder="R$ 0,00" />
              </div>
              <Input
                label="Observações"
                placeholder="Informações adicionais sobre o embarque..."
              />
            </motion.div>
          )}
        </div>

        <ModalFooter>
          <Button
            variant="ghost"
            onClick={() => {
              if (wizardStep === 1) {
                setIsCreateModalOpen(false);
              } else {
                setWizardStep(wizardStep - 1);
              }
            }}
            leftIcon={wizardStep > 1 ? <ArrowLeft className="w-4 h-4" /> : undefined}
          >
            {wizardStep === 1 ? 'Cancelar' : 'Voltar'}
          </Button>
          <Button
            onClick={() => {
              if (wizardStep < 3) {
                setWizardStep(wizardStep + 1);
              } else {
                handleCreateShipment();
              }
            }}
            rightIcon={wizardStep < 3 ? <ArrowRight className="w-4 h-4" /> : <Check className="w-4 h-4" />}
          >
            {wizardStep < 3 ? 'Próximo' : 'Criar embarque'}
          </Button>
        </ModalFooter>
      </Modal>
    </motion.div>
  );
}
