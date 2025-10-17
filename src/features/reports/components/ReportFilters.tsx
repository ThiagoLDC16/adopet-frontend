import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Search, X, Filter } from 'lucide-react';
import type { ReportFilters, ReportStatus } from '../types/report.types';

interface ReportFiltersProps {
  filters: ReportFilters;
  onFiltersChange: (filters: ReportFilters) => void;
  onClearFilters: () => void;
}

const statusOptions: { value: ReportStatus; label: string }[] = [
  { value: 'PENDING', label: 'Registrada' },
  { value: 'UNDER_REVIEW', label: 'Em Análise' },
  { value: 'IN_PROGRESS', label: 'Em Andamento' },
  { value: 'RESOLVED', label: 'Resolvida' },
  { value: 'REJECTED', label: 'Arquivada' }
];

export function ReportFilters({ filters, onFiltersChange, onClearFilters }: ReportFiltersProps) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value || undefined });
  };

  const handleStatusChange = (value: string) => {
    onFiltersChange({ 
      ...filters, 
      status: value === 'all' ? undefined : value as ReportStatus 
    });
  };

  const handleDateFromChange = (value: string) => {
    onFiltersChange({ ...filters, dateFrom: value || undefined });
  };

  const handleDateToChange = (value: string) => {
    onFiltersChange({ ...filters, dateTo: value || undefined });
  };

  const hasActiveFilters = filters.search || filters.status || filters.dateFrom || filters.dateTo;

  return (
    <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--btn-bd)] space-y-4">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-600" />
        <h3 className="font-medium text-gray-900">Filtros</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="ml-auto text-gray-600 hover:text-gray-900"
          >
            <X className="w-4 h-4 mr-1" />
            Limpar filtros
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Campo de busca */}
        <div className="space-y-2">
          <Label htmlFor="search" className="text-sm font-medium text-gray-700">
            Buscar
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="search"
              type="text"
              placeholder="Descrição ou localização"
              value={filters.search || ''}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filtro de status */}
        <div className="space-y-2">
          <Label htmlFor="status" className="text-sm font-medium text-gray-700">
            Status
          </Label>
          <select
            id="status"
            value={filters.status || 'all'}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Todos os status</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Data inicial */}
        <div className="space-y-2">
          <Label htmlFor="dateFrom" className="text-sm font-medium text-gray-700">
            Data inicial
          </Label>
          <Input
            id="dateFrom"
            type="date"
            value={filters.dateFrom || ''}
            onChange={(e) => handleDateFromChange(e.target.value)}
          />
        </div>

        {/* Data final */}
        <div className="space-y-2">
          <Label htmlFor="dateTo" className="text-sm font-medium text-gray-700">
            Data final
          </Label>
          <Input
            id="dateTo"
            type="date"
            value={filters.dateTo || ''}
            onChange={(e) => handleDateToChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
