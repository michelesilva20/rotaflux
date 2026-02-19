import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Car,
  Users,
  Plus,
  Fuel,
  Wrench,
  Gauge,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Star,
} from 'lucide-react';
import { api } from '@/services/fakeApi';
import { formatCurrency, formatDate, formatNumber } from '@/lib/utils';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { StatusChip, Badge } from '@/components/ui/Badge';
import { Table, type Column } from '@/components/ui/Table';
import { Drawer } from '@/components/ui/Drawer';
import { KPIStatCard } from '@/components/ui/KPIStatCard';
import type { Vehicle, Driver, Maintenance, Refueling } from '@/types';
import { cn } from '@/lib/utils';

export function Frota() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: vehicles, isLoading: vehiclesLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: api.vehicles.getAll,
  });

  const { data: drivers, isLoading: driversLoading } = useQuery({
    queryKey: ['drivers'],
    queryFn: api.drivers.getAll,
  });

  const { data: maintenances } = useQuery({
    queryKey: ['maintenances', selectedVehicle?.id],
    queryFn: () => api.vehicles.getMaintenances(selectedVehicle?.id || ''),
    enabled: !!selectedVehicle,
  });

  const { data: refuelings } = useQuery({
    queryKey: ['refuelings', selectedVehicle?.id],
    queryFn: () => api.vehicles.getRefuelings(selectedVehicle?.id || ''),
    enabled: !!selectedVehicle,
  });

  const handleVehicleClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setDrawerOpen(true);
  };

  const vehicleStats = {
    total: vehicles?.length || 0,
    available: vehicles?.filter((v) => v.status === 'available').length || 0,
    inUse: vehicles?.filter((v) => v.status === 'in_use').length || 0,
    maintenance: vehicles?.filter((v) => v.status === 'maintenance').length || 0,
  };

  const maintenanceColumns: Column<Maintenance>[] = [
    { key: 'date', header: 'Data', render: (m) => formatDate(m.date) },
    {
      key: 'type',
      header: 'Tipo',
      render: (m) => (
        <Badge variant={m.type === 'preventive' ? 'success' : 'warning'}>
          {m.type === 'preventive' ? 'Preventiva' : 'Corretiva'}
        </Badge>
      ),
    },
    { key: 'description', header: 'Descrição' },
    { key: 'km', header: 'Km', render: (m) => formatNumber(m.km) },
    { key: 'cost', header: 'Custo', render: (m) => formatCurrency(m.cost) },
  ];

  const refuelingColumns: Column<Refueling>[] = [
    { key: 'date', header: 'Data', render: (r) => formatDate(r.date) },
    { key: 'station', header: 'Posto' },
    { key: 'liters', header: 'Litros', render: (r) => `${r.liters}L` },
    { key: 'pricePerLiter', header: 'R$/L', render: (r) => `R$ ${r.pricePerLiter.toFixed(2)}` },
    { key: 'totalCost', header: 'Total', render: (r) => formatCurrency(r.totalCost) },
  ];

  const vehiclesContent = (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPIStatCard title="Total de veículos" value={vehicleStats.total} icon={<Car className="w-6 h-6" />} />
        <KPIStatCard title="Disponíveis" value={vehicleStats.available} icon={<CheckCircle className="w-6 h-6" />} />
        <KPIStatCard title="Em uso" value={vehicleStats.inUse} icon={<Gauge className="w-6 h-6" />} />
        <KPIStatCard title="Em manutenção" value={vehicleStats.maintenance} icon={<Wrench className="w-6 h-6" />} />
      </div>

      {/* Vehicle Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {vehiclesLoading ? (
          [...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-4 w-24" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded mb-2 w-full" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
            </Card>
          ))
        ) : (
          vehicles?.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hover onClick={() => handleVehicleClick(vehicle)} className="cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-900/20">
                    <Car className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  </div>
                  <StatusChip status={vehicle.status} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  {vehicle.plate}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  {vehicle.brand} {vehicle.model} • {vehicle.year}
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                    <Gauge className="w-3.5 h-3.5" />
                    <span>{formatNumber(vehicle.currentKm)} km</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                    <Fuel className="w-3.5 h-3.5" />
                    <span>{vehicle.fuelConsumption} km/L</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );

  const driversContent = (
    <div className="space-y-6">
      {/* Drivers List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {driversLoading ? (
          [...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="flex-1">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2 w-24" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16" />
                </div>
              </div>
            </Card>
          ))
        ) : (
          drivers?.map((driver, index) => (
            <motion.div
              key={driver.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hover className="cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={driver.avatar}
                    alt={driver.name}
                    className="w-12 h-12 rounded-full bg-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                      {driver.name}
                    </h3>
                    <StatusChip status={driver.status} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Score</span>
                    <div className="flex items-center gap-1">
                      <Star className={cn(
                        'w-4 h-4',
                        driver.score >= 90 ? 'text-accent-400 fill-accent-400' : 'text-slate-300'
                      )} />
                      <span className={cn(
                        'font-semibold',
                        driver.score >= 90 ? 'text-success-600' :
                        driver.score >= 80 ? 'text-accent-600' : 'text-danger-600'
                      )}>
                        {driver.score}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">CNH válida até</span>
                    <span className={cn(
                      'font-medium',
                      new Date(driver.licenseExpiry) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
                        ? 'text-danger-600'
                        : 'text-slate-900 dark:text-white'
                    )}>
                      {formatDate(driver.licenseExpiry)}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );

  const tabs = [
    { id: 'vehicles', label: 'Veículos', icon: <Car className="w-4 h-4" />, content: vehiclesContent },
    { id: 'drivers', label: 'Motoristas', icon: <Users className="w-4 h-4" />, content: driversContent },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Frota"
        subtitle="Gerencie veículos e motoristas"
        action={
          <Button leftIcon={<Plus className="w-4 h-4" />}>
            Adicionar
          </Button>
        }
      />

      <Tabs tabs={tabs} />

      {/* Vehicle Detail Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={selectedVehicle?.plate || 'Detalhes'}
        description={selectedVehicle ? `${selectedVehicle.brand} ${selectedVehicle.model}` : ''}
        size="xl"
      >
        {selectedVehicle && (
          <div className="space-y-6">
            {/* Vehicle Info */}
            <div className="grid grid-cols-2 gap-4">
              <Card padding="sm">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Quilometragem</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {formatNumber(selectedVehicle.currentKm)} km
                </p>
              </Card>
              <Card padding="sm">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Consumo médio</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {selectedVehicle.fuelConsumption} km/L
                </p>
              </Card>
              <Card padding="sm">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Última manutenção</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {formatDate(selectedVehicle.lastMaintenance)}
                </p>
              </Card>
              <Card padding="sm">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Próxima manutenção</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {formatDate(selectedVehicle.nextMaintenance)}
                </p>
              </Card>
            </div>

            {/* Maintenance History */}
            <Card padding="none">
              <CardHeader title="Histórico de manutenções" className="p-4 pb-0" />
              <Table
                columns={maintenanceColumns}
                data={maintenances || []}
                keyExtractor={(m) => m.id}
                emptyMessage="Nenhuma manutenção registrada"
              />
            </Card>

            {/* Refueling History */}
            <Card padding="none">
              <CardHeader title="Abastecimentos" className="p-4 pb-0" />
              <Table
                columns={refuelingColumns}
                data={refuelings || []}
                keyExtractor={(r) => r.id}
                emptyMessage="Nenhum abastecimento registrado"
              />
            </Card>
          </div>
        )}
      </Drawer>
    </motion.div>
  );
}
