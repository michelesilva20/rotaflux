import { Card, CardHeader } from './Card';
import { cn } from '@/lib/utils';

export interface ChartCardProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  height?: number | string;
}

export function ChartCard({
  title,
  subtitle,
  action,
  children,
  className,
  height = 300,
}: ChartCardProps) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader title={title} subtitle={subtitle} action={action} />
      <div style={{ height }} className="w-full">
        {children}
      </div>
    </Card>
  );
}
