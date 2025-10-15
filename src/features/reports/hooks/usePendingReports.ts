import { useState, useEffect } from 'react';
import { reportService } from '../services/report.service';
import type { Report } from '../types/report.types';

export function usePendingReports() {
    const [reports, setReports] = useState<Report[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const fetchPendingReports = async () => {
        setLoading(true);
        setError(null);
        try {

            const data = await reportService.getPendingReports();

            setReports(data);
        } catch (err: any) {
            setError(err.response?.data?.message ?? 'Erro ao buscar denúncias');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingReports();
    }, []);


    return {
        reports,
        loading,
        error,
        refetch: () => fetchPendingReports(),
    };
}