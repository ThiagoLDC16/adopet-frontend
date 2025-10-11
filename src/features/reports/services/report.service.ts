import { api } from '@/lib/api';
import type { Report } from '../types/report.types';

export const reportService = {

    async getMyReports(): Promise<Report[] | null> {
        const response = await api.get("/api/report/my")
        return response.data.reports
    }
}