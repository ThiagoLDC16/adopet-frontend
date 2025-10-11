import { useState, useEffect } from 'react';
import { reportService } from '../services/report.service';
import type { Report } from '../types/report.types';

export function useMyReports() {
    const [reports, setReports] = useState<Report[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const fetchMyReports = async () => {
        setLoading(true);
        setError(null);
        try {

            const data = await reportService.getMyReports();

            setReports(data);
        } catch (err: any) {
            setError(err.response?.data?.message ?? 'Erro ao buscar minhas denúncias');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyReports();
    }, []);


    return {
        reports,
        loading,
        error,
        refetch: () => fetchMyReports(),
    };
}