import { useState } from 'react';
import { Search, Filter, X, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Input } from './Input';
import { Badge } from './Badge';

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export interface FilterBarProps {
  onSearch?: (value: string) => void;
  searchPlaceholder?: string;
  filters?: {
    label: string;
    options: FilterOption[];
    selected?: string[];
    onChange?: (values: string[]) => void;
  }[];
  dateFilter?: {
    start?: string;
    end?: string;
    onChange?: (start: string, end: string) => void;
  };
  className?: string;
}

export function FilterBar({
  onSearch,
  searchPlaceholder = 'Buscar...',
  filters,
  dateFilter,
  className,
}: FilterBarProps) {
  const [searchValue, setSearchValue] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch?.(value);
  };

  const handleFilterToggle = (filterIndex: number, optionValue: string) => {
    if (!filters) return;
    
    const filter = filters[filterIndex];
    const currentSelected = activeFilters[filterIndex] || [];
    const newSelected = currentSelected.includes(optionValue)
      ? currentSelected.filter((v) => v !== optionValue)
      : [...currentSelected, optionValue];
    
    setActiveFilters({ ...activeFilters, [filterIndex]: newSelected });
    filter.onChange?.(newSelected);
  };

  const clearFilters = () => {
    setActiveFilters({});
    setSearchValue('');
    onSearch?.('');
    filters?.forEach((filter) => filter.onChange?.([]));
  };

  const hasActiveFilters = Object.values(activeFilters).some((arr) => arr.length > 0) || searchValue;

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={searchPlaceholder}
            leftIcon={<Search className="w-4 h-4" />}
            rightIcon={
              searchValue ? (
                <button
                  onClick={() => handleSearch('')}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              ) : undefined
            }
          />
        </div>
        
        {dateFilter && (
          <div className="flex items-center gap-2">
            <div className="relative">
              <Input
                type="date"
                value={dateFilter.start || ''}
                onChange={(e) => dateFilter.onChange?.(e.target.value, dateFilter.end || '')}
                className="pl-10"
              />
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
            <span className="text-slate-400">até</span>
            <Input
              type="date"
              value={dateFilter.end || ''}
              onChange={(e) => dateFilter.onChange?.(dateFilter.start || '', e.target.value)}
            />
          </div>
        )}

        {hasActiveFilters && (
          <Button variant="ghost" onClick={clearFilters} className="text-slate-500">
            <X className="w-4 h-4 mr-1" />
            Limpar filtros
          </Button>
        )}
      </div>

      {filters && filters.length > 0 && (
        <div className="flex flex-wrap gap-6">
          {filters.map((filter, filterIndex) => (
            <div key={filterIndex} className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                {filter.label}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {filter.options.map((option) => {
                  const isSelected = (activeFilters[filterIndex] || []).includes(option.value);
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleFilterToggle(filterIndex, option.value)}
                      className={cn(
                        'px-3 py-1 text-sm rounded-full transition-all duration-200',
                        isSelected
                          ? 'bg-brand-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                      )}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchValue && (
            <Badge variant="primary" className="gap-1">
              Busca: {searchValue}
              <button onClick={() => handleSearch('')}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {Object.entries(activeFilters).map(([filterIndex, values]) =>
            values.map((value) => {
              const filter = filters?.[parseInt(filterIndex)];
              const option = filter?.options.find((o) => o.value === value);
              return option ? (
                <Badge key={`${filterIndex}-${value}`} variant="primary" className="gap-1">
                  {filter?.label}: {option.label}
                  <button onClick={() => handleFilterToggle(parseInt(filterIndex), value)}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ) : null;
            })
          )}
        </div>
      )}
    </div>
  );
}
