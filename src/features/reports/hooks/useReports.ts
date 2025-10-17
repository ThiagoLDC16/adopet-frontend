import { useState, useEffect } from 'react';
import type { Report, ReportFilters, ReportListResponse } from '../types/report.types';
import { reportService } from '../services/report.service';

export function useReports(initialFilters: ReportFilters = {}) {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ReportFilters>(initialFilters);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  });

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await reportService.getMyReports(filters);
      setReports(data.reports);
      setPagination({
        total: data.total,
        page: data.page,
        limit: data.limit,
        totalPages: data.totalPages
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao buscar denúncias');
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [filters]);

  const updateFilters = (newFilters: ReportFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  return {
    reports,
    loading,
    error,
    filters,
    pagination,
    updateFilters,
    clearFilters,
    refetch: fetchReports
  };
}