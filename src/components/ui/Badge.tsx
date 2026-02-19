import { cn } from '@/lib/utils';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

const variantStyles = {
  default: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
  primary: 'bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400',
  secondary: 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-400',
  success: 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400',
  warning: 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400',
  danger: 'bg-danger-100 dark:bg-danger-900/30 text-danger-700 dark:text-danger-400',
  info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}

export interface StatusChipProps {
  status: 'planned' | 'collected' | 'in_transit' | 'delivered' | 'occurrence' | 'pending' | 'paid' | 'overdue' | 'available' | 'in_use' | 'maintenance' | 'inactive' | 'on_route' | 'off_duty' | 'vacation';
  className?: string;
}

const statusConfig: Record<StatusChipProps['status'], { label: string; variant: BadgeProps['variant'] }> = {
  planned: { label: 'Planejado', variant: 'default' },
  collected: { label: 'Coletado', variant: 'info' },
  in_transit: { label: 'Em Trânsito', variant: 'primary' },
  delivered: { label: 'Entregue', variant: 'success' },
  occurrence: { label: 'Ocorrência', variant: 'danger' },
  pending: { label: 'Pendente', variant: 'warning' },
  paid: { label: 'Pago', variant: 'success' },
  overdue: { label: 'Vencido', variant: 'danger' },
  available: { label: 'Disponível', variant: 'success' },
  in_use: { label: 'Em Uso', variant: 'primary' },
  maintenance: { label: 'Manutenção', variant: 'warning' },
  inactive: { label: 'Inativo', variant: 'default' },
  on_route: { label: 'Em Rota', variant: 'primary' },
  off_duty: { label: 'Folga', variant: 'default' },
  vacation: { label: 'Férias', variant: 'secondary' },
};

export function StatusChip({ status, className }: StatusChipProps) {
  const config = statusConfig[status];
  
  return (
    <Badge variant={config.variant} className={className}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
      {config.label}
    </Badge>
  );
}
