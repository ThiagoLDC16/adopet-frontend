import { useState } from 'react';
import { CreateReportDialogButton } from '../components/CreateReportDialogButton';
import { ReportCard } from '../components/ReportCard';
import { ReportFilters } from '../components/ReportFilters';
import { ReportDetailsDialog } from '../components/ReportDetailsDialog';
import { useReports } from '../hooks/useReports';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, FileX } from 'lucide-react';
import type { Report } from '../types/report.types';

export function MyReportsPage() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const { 
    reports, 
    loading, 
    error, 
    filters, 
    pagination,
    updateFilters, 
    clearFilters,
    refetch 
  } = useReports();

  const handleViewDetails = (report: Report) => {
    setSelectedReport(report);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setTimeout(() => setSelectedReport(null), 300);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Carregando denúncias...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Erro ao carregar denúncias</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={refetch} className="flex items-center gap-2 mx-auto">
            <RefreshCw className="w-4 h-4" />
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Minhas denúncias</h1>
          <p className="text-gray-600 mt-1">
            {pagination.total > 0 
              ? `${pagination.total} denúncia${pagination.total !== 1 ? 's' : ''} registrada${pagination.total !== 1 ? 's' : ''}`
              : 'Nenhuma denúncia registrada'
            }
          </p>
        </div>
        <CreateReportDialogButton />
      </div>

      {/* Filtros */}
      <ReportFilters
        filters={filters}
        onFiltersChange={updateFilters}
        onClearFilters={clearFilters}
      />

      {/* Lista de denúncias */}
      <section aria-label="Lista das minhas denúncias">
        {reports.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <FileX className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {Object.keys(filters).length > 0 
                ? 'Nenhuma denúncia encontrada'
                : 'Você ainda não registrou nenhuma denúncia'
              }
            </h3>
            <p className="text-gray-600 mb-4">
              {Object.keys(filters).length > 0 
                ? 'Tente ajustar os filtros para encontrar o que procura.'
                : 'Registre sua primeira denúncia para começar a acompanhar.'
              }
            </p>
            {Object.keys(filters).length > 0 ? (
              <Button variant="outline" onClick={clearFilters}>
                Limpar filtros
              </Button>
            ) : (
              <CreateReportDialogButton />
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </section>

      {/* Paginação (placeholder para futuro) */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <Button
            variant="outline"
            disabled={pagination.page <= 1}
            onClick={() => updateFilters({ page: pagination.page - 1 })}
          >
            Anterior
          </Button>
          <span className="text-sm text-gray-600">
            Página {pagination.page} de {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => updateFilters({ page: pagination.page + 1 })}
          >
            Próxima
          </Button>
        </div>
      )}

      {/* Dialog de detalhes */}
      <ReportDetailsDialog
        report={selectedReport}
        open={detailsOpen}
        onClose={handleCloseDetails}
      />
    </div>
  );
}