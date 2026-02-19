import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Filter,
  Calendar,
  User,
  Truck,
  Clock,
  MapPin,
  Package,
  AlertCircle,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { api } from '@/services/fakeApi';
import { ShipmentStatus, type Shipment } from '@/types';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, StatusChip } from '@/components/ui/Badge';
import { Drawer } from '@/components/ui/Drawer';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatDateTime } from '@/lib/utils';
import { cn } from '@/lib/utils';

const columns = [
  { id: ShipmentStatus.PLANNED, label: 'Planejado', color: 'bg-slate-500' },
  { id: ShipmentStatus.COLLECTED, label: 'Coletado', color: 'bg-blue-500' },
  { id: ShipmentStatus.IN_TRANSIT, label: 'Em Trânsito', color: 'bg-brand-500' },
  { id: ShipmentStatus.DELIVERED, label: 'Entregue', color: 'bg-success-500' },
  { id: ShipmentStatus.OCCURRENCE, label: 'Ocorrência', color: 'bg-danger-500' },
];

export function Operacao() {
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: shipments, isLoading } = useQuery({
    queryKey: ['shipments'],
    queryFn: api.shipments.getAll,
  });

  const getShipmentsByStatus = (status: ShipmentStatus) => {
    return shipments?.filter((s) => s.status === status) || [];
  };

  const handleCardClick = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setDrawerOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Operação"
        subtitle="Visão operacional dos embarques em andamento"
        action={
          <div className="flex items-center gap-3">
            <Button variant="secondary" leftIcon={<Filter className="w-4 h-4" />}>
              Filtros
            </Button>
            <Button variant="secondary" leftIcon={<Calendar className="w-4 h-4" />}>
              Hoje
            </Button>
          </div>
        }
      />

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6">
        {columns.map((column) => {
          const columnShipments = getShipmentsByStatus(column.id);
          
          return (
            <div
              key={column.id}
              className="flex-shrink-0 w-[300px]"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className={cn('w-3 h-3 rounded-full', column.color)} />
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {column.label}
                </h3>
                <Badge variant="default" size="sm">
                  {columnShipments.length}
                </Badge>
              </div>

              <div className="space-y-3">
                {isLoading ? (
                  [...Array(3)].map((_, i) => (
                    <Card key={i} padding="sm">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-3 w-full mb-2" />
                      <Skeleton className="h-3 w-3/4" />
                    </Card>
                  ))
                ) : columnShipments.length === 0 ? (
                  <div className="p-6 text-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                    <p className="text-sm text-slate-400">
                      Nenhum embarque
                    </p>
                  </div>
                ) : (
                  columnShipments.map((shipment, index) => (
                    <motion.div
                      key={shipment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card
                        hover
                        padding="sm"
                        className="cursor-pointer"
                        onClick={() => handleCardClick(shipment)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">
                            {shipment.code}
                          </span>
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
                        </div>

                        <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                          {shipment.customer.name}
                        </p>

                        <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="truncate">
                              {shipment.origin} → {shipment.destination}
                            </span>
                          </div>
                          
                          {shipment.driver && (
                            <div className="flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5" />
                              <span>{shipment.driver.name}</span>
                            </div>
                          )}
                          
                          {shipment.vehicle && (
                            <div className="flex items-center gap-1.5">
                              <Truck className="w-3.5 h-3.5" />
                              <span>{shipment.vehicle.plate}</span>
                            </div>
                          )}

                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>
                              Prev: {new Date(shipment.estimatedDelivery).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>

                        {shipment.occurrences && shipment.occurrences.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-1.5 text-xs text-danger-600 dark:text-danger-400">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{shipment.occurrences.length} ocorrência(s)</span>
                            </div>
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={selectedShipment?.code || 'Detalhes'}
        description={selectedShipment?.customer.name}
        size="lg"
      >
        {selectedShipment && (
          <div className="space-y-6">
            {/* Status */}
            <div className="flex items-center justify-between">
              <StatusChip status={selectedShipment.status} />
              <Badge
                variant={
                  selectedShipment.priority === 'urgent'
                    ? 'danger'
                    : selectedShipment.priority === 'high'
                    ? 'warning'
                    : 'default'
                }
              >
                Prioridade: {selectedShipment.priority === 'urgent'
                  ? 'Urgente'
                  : selectedShipment.priority === 'high'
                  ? 'Alta'
                  : selectedShipment.priority === 'medium'
                  ? 'Média'
                  : 'Baixa'}
              </Badge>
            </div>

            {/* Route */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-success-500" />
                  <div className="w-0.5 h-8 bg-slate-300 dark:bg-slate-600" />
                  <div className="w-3 h-3 rounded-full bg-brand-500" />
                </div>
                <div className="flex-1">
                  <div className="mb-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Origem</p>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {selectedShipment.origin}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Destino</p>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {selectedShipment.destination}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Driver & Vehicle */}
            {(selectedShipment.driver || selectedShipment.vehicle) && (
              <div className="grid grid-cols-2 gap-4">
                {selectedShipment.driver && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                        <User className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Motorista</p>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {selectedShipment.driver.name}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {selectedShipment.vehicle && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center">
                        <Truck className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Veículo</p>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {selectedShipment.vehicle.plate}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Timeline */}
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
                Timeline de eventos
              </h4>
              <div className="space-y-4">
                {selectedShipment.events.map((event, index) => (
                  <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center',
                          index === 0
                            ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
                        )}
                      >
                        {event.type === 'status_change' ? (
                          <ArrowRight className="w-4 h-4" />
                        ) : event.type === 'occurrence' ? (
                          <AlertCircle className="w-4 h-4" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </div>
                      {index < selectedShipment.events.length - 1 && (
                        <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-700 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-medium text-slate-900 dark:text-white">
                        {event.description}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {formatDateTime(event.timestamp)} • {event.user}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
              <Button className="flex-1">Ver detalhes completos</Button>
              <Button variant="secondary">Registrar ocorrência</Button>
            </div>
          </div>
        )}
      </Drawer>
    </motion.div>
  );
}
