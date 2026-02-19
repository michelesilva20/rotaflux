import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Users,
  Building2,
  MapPin,
  Receipt,
  Plus,
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  Phone,
  Mail,
} from 'lucide-react';
import { api } from '@/services/fakeApi';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Tabs } from '@/components/ui/Tabs';
import { Table, type Column } from '@/components/ui/Table';
import { Modal, ModalFooter } from '@/components/ui/Modal';
import { DropdownMenu } from '@/components/ui/DropdownMenu';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import type { Customer, Supplier, Route } from '@/types';
import { formatNumber } from '@/lib/utils';

export function Cadastros() {
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'customer' | 'supplier' | 'route'>('customer');

  const { data: customers, isLoading: customersLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: api.customers.getAll,
  });

  const { data: suppliers, isLoading: suppliersLoading } = useQuery({
    queryKey: ['suppliers'],
    queryFn: api.suppliers.getAll,
  });

  const { data: routes, isLoading: routesLoading } = useQuery({
    queryKey: ['routes'],
    queryFn: api.routes.getAll,
  });

  const openCreateModal = (type: 'customer' | 'supplier' | 'route') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setIsModalOpen(false);
    toast.success('Salvo com sucesso', 'O cadastro foi salvo');
  };

  const customerColumns: Column<Customer>[] = [
    {
      key: 'name',
      header: 'Nome',
      render: (customer) => (
        <div>
          <p className="font-medium text-slate-900 dark:text-white">{customer.name}</p>
          <p className="text-xs text-slate-500">{customer.document}</p>
        </div>
      ),
    },
    {
      key: 'contact',
      header: 'Contato',
      render: (customer) => (
        <div className="text-sm">
          <div className="flex items-center gap-1 text-slate-500">
            <Mail className="w-3.5 h-3.5" />
            {customer.email}
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <Phone className="w-3.5 h-3.5" />
            {customer.phone}
          </div>
        </div>
      ),
    },
    {
      key: 'location',
      header: 'Localização',
      render: (customer) => (
        <span className="text-sm">{customer.city}, {customer.state}</span>
      ),
    },
    {
      key: 'actions',
      header: '',
      className: 'w-12',
      render: () => (
        <DropdownMenu
          trigger={
            <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
              <MoreHorizontal className="w-4 h-4 text-slate-500" />
            </button>
          }
          items={[
            { id: 'edit', label: 'Editar', icon: <Edit className="w-4 h-4" /> },
            { id: 'delete', label: 'Excluir', icon: <Trash2 className="w-4 h-4" />, danger: true },
          ]}
        />
      ),
    },
  ];

  const supplierColumns: Column<Supplier>[] = [
    {
      key: 'name',
      header: 'Nome',
      render: (supplier) => (
        <div>
          <p className="font-medium text-slate-900 dark:text-white">{supplier.name}</p>
          <p className="text-xs text-slate-500">{supplier.document}</p>
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Tipo',
      render: (supplier) => (
        <Badge variant={
          supplier.type === 'fuel_station' ? 'primary' :
          supplier.type === 'workshop' ? 'warning' :
          supplier.type === 'toll' ? 'secondary' : 'default'
        }>
          {supplier.type === 'fuel_station' ? 'Posto' :
           supplier.type === 'workshop' ? 'Oficina' :
           supplier.type === 'toll' ? 'Pedágio' : 'Outro'}
        </Badge>
      ),
    },
    {
      key: 'location',
      header: 'Localização',
      render: (supplier) => (
        <span className="text-sm">{supplier.city}, {supplier.state}</span>
      ),
    },
    {
      key: 'phone',
      header: 'Telefone',
      render: (supplier) => (
        <span className="text-sm">{supplier.phone}</span>
      ),
    },
    {
      key: 'actions',
      header: '',
      className: 'w-12',
      render: () => (
        <DropdownMenu
          trigger={
            <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
              <MoreHorizontal className="w-4 h-4 text-slate-500" />
            </button>
          }
          items={[
            { id: 'edit', label: 'Editar', icon: <Edit className="w-4 h-4" /> },
            { id: 'delete', label: 'Excluir', icon: <Trash2 className="w-4 h-4" />, danger: true },
          ]}
        />
      ),
    },
  ];

  const routeColumns: Column<Route>[] = [
    {
      key: 'name',
      header: 'Rota',
      render: (route) => (
        <span className="font-medium text-slate-900 dark:text-white">{route.name}</span>
      ),
    },
    {
      key: 'route',
      header: 'Trajeto',
      render: (route) => (
        <div className="text-sm">
          <span>{route.origin}</span>
          <span className="text-slate-400 mx-1">→</span>
          <span>{route.destination}</span>
        </div>
      ),
    },
    {
      key: 'distance',
      header: 'Distância',
      render: (route) => (
        <span className="text-sm">{formatNumber(route.distance)} km</span>
      ),
    },
    {
      key: 'time',
      header: 'Tempo estimado',
      render: (route) => (
        <span className="text-sm">{route.estimatedTime}h</span>
      ),
    },
    {
      key: 'toll',
      header: 'Pedágio',
      render: (route) => (
        <span className="text-sm">R$ {route.tollCost.toFixed(2)}</span>
      ),
    },
    {
      key: 'actions',
      header: '',
      className: 'w-12',
      render: () => (
        <DropdownMenu
          trigger={
            <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
              <MoreHorizontal className="w-4 h-4 text-slate-500" />
            </button>
          }
          items={[
            { id: 'edit', label: 'Editar', icon: <Edit className="w-4 h-4" /> },
            { id: 'delete', label: 'Excluir', icon: <Trash2 className="w-4 h-4" />, danger: true },
          ]}
        />
      ),
    },
  ];

  const customersContent = (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar clientes..."
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => openCreateModal('customer')}>
          Novo cliente
        </Button>
      </div>
      <Card padding="none">
        <Table
          columns={customerColumns}
          data={customers?.filter(c => 
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.document.includes(searchQuery)
          ) || []}
          keyExtractor={(item) => item.id}
          isLoading={customersLoading}
          emptyMessage="Nenhum cliente encontrado"
        />
      </Card>
    </div>
  );

  const suppliersContent = (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar fornecedores..."
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => openCreateModal('supplier')}>
          Novo fornecedor
        </Button>
      </div>
      <Card padding="none">
        <Table
          columns={supplierColumns}
          data={suppliers?.filter(s => 
            s.name.toLowerCase().includes(searchQuery.toLowerCase())
          ) || []}
          keyExtractor={(item) => item.id}
          isLoading={suppliersLoading}
          emptyMessage="Nenhum fornecedor encontrado"
        />
      </Card>
    </div>
  );

  const routesContent = (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar rotas..."
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => openCreateModal('route')}>
          Nova rota
        </Button>
      </div>
      <Card padding="none">
        <Table
          columns={routeColumns}
          data={routes?.filter(r => 
            r.name.toLowerCase().includes(searchQuery.toLowerCase())
          ) || []}
          keyExtractor={(item) => item.id}
          isLoading={routesLoading}
          emptyMessage="Nenhuma rota encontrada"
        />
      </Card>
    </div>
  );

  const pricesContent = (
    <Card className="text-center py-12">
      <Receipt className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
        Tabelas de preço
      </h3>
      <p className="text-slate-500 dark:text-slate-400 mb-6">
        Configure suas tabelas de preço para automatizar cotações
      </p>
      <Button>Criar tabela de preço</Button>
    </Card>
  );

  const tabs = [
    { id: 'customers', label: 'Clientes', icon: <Users className="w-4 h-4" />, content: customersContent },
    { id: 'suppliers', label: 'Fornecedores', icon: <Building2 className="w-4 h-4" />, content: suppliersContent },
    { id: 'routes', label: 'Rotas', icon: <MapPin className="w-4 h-4" />, content: routesContent },
    { id: 'prices', label: 'Tabelas de preço', icon: <Receipt className="w-4 h-4" />, content: pricesContent },
  ];

  const modalTitles = {
    customer: 'Novo cliente',
    supplier: 'Novo fornecedor',
    route: 'Nova rota',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Cadastros"
        subtitle="Gerencie clientes, fornecedores e rotas"
      />

      <Tabs tabs={tabs} onChange={() => setSearchQuery('')} />

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitles[modalType]}
        size="md"
      >
        <div className="space-y-4">
          {modalType === 'customer' && (
            <>
              <Input label="Razão social" placeholder="Nome da empresa" />
              <Input label="CNPJ" placeholder="00.000.000/0000-00" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Email" type="email" placeholder="email@empresa.com" />
                <Input label="Telefone" placeholder="(00) 0000-0000" />
              </div>
              <Input label="Endereço" placeholder="Rua, número" />
              <div className="grid grid-cols-3 gap-4">
                <Input label="Cidade" placeholder="Cidade" />
                <Input label="Estado" placeholder="UF" />
                <Input label="CEP" placeholder="00000-000" />
              </div>
            </>
          )}

          {modalType === 'supplier' && (
            <>
              <Input label="Nome" placeholder="Nome do fornecedor" />
              <Input label="CNPJ" placeholder="00.000.000/0000-00" />
              <Input label="Telefone" placeholder="(00) 0000-0000" />
              <Input label="Endereço" placeholder="Endereço completo" />
            </>
          )}

          {modalType === 'route' && (
            <>
              <Input label="Nome da rota" placeholder="Ex: São Paulo - Rio de Janeiro" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Origem" placeholder="Cidade, Estado" />
                <Input label="Destino" placeholder="Cidade, Estado" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Input label="Distância (km)" type="number" placeholder="0" />
                <Input label="Tempo estimado (h)" type="number" placeholder="0" />
                <Input label="Custo pedágio" type="number" placeholder="R$ 0,00" />
              </div>
            </>
          )}
        </div>

        <ModalFooter>
          <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar
          </Button>
        </ModalFooter>
      </Modal>
    </motion.div>
  );
}
