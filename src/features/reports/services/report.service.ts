import { api } from '@/lib/api';
import type { Report } from '../types/report.types';

export const reportService = {

  async getMyReports(): Promise<Report[] | null> {
    const response = await api.get("/api/report/my")
    return response.data.reports
  },

  async getPendingReports(): Promise<Report[] | null> {
    const response = await api.get("/api/report/pending")
    return response.data.reports
  },

  async getReportById(id: number): Promise<Report> {
    const response = await api.get(`/api/report/${id}`);
    return response.data;
  },

}