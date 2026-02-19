import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from './Card';

export interface KPIStatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export function KPIStatCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  trend,
  className,
}: KPIStatCardProps) {
  const getTrendIcon = () => {
    if (trend === 'up' || (change !== undefined && change > 0)) {
      return <TrendingUp className="w-4 h-4" />;
    }
    if (trend === 'down' || (change !== undefined && change < 0)) {
      return <TrendingDown className="w-4 h-4" />;
    }
    return <Minus className="w-4 h-4" />;
  };

  const getTrendColor = () => {
    if (trend === 'up' || (change !== undefined && change > 0)) {
      return 'text-success-600 dark:text-success-400 bg-success-50 dark:bg-success-900/20';
    }
    if (trend === 'down' || (change !== undefined && change < 0)) {
      return 'text-danger-600 dark:text-danger-400 bg-danger-50 dark:bg-danger-900/20';
    }
    return 'text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800';
  };

  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {value}
          </p>
          {(change !== undefined || changeLabel) && (
            <div className="flex items-center gap-2 mt-2">
              <span
                className={cn(
                  'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
                  getTrendColor()
                )}
              >
                {getTrendIcon()}
                {change !== undefined && (
                  <span>
                    {change > 0 ? '+' : ''}
                    {change}%
                  </span>
                )}
              </span>
              {changeLabel && (
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
