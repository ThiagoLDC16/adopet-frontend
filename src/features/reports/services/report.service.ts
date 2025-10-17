import { api } from '@/lib/api';
import type { Report, ReportListResponse, ReportFilters, CreateReportData } from '../types/report.types';

export const reportService = {
  async getMyReports(filters: ReportFilters = {}): Promise<ReportListResponse> {
    const response = await api.get('/api/report/my-reports', { params: filters });
    return response.data;
  },

  async getReportById(id: number): Promise<Report> {
    const response = await api.get(`/api/report/${id}`);
    return response.data;
  },

  async createReport(data: CreateReportData): Promise<Report> {
    const formData = new FormData();
    
    formData.append("description", data.description);
    formData.append("details", data.details);
    formData.append("ocurrenceDate", new Date(data.ocurrenceDate).toISOString());
    formData.append("location", data.location);

    if (data.midia) {
      for (let i = 0; i < data.midia.length; i++) {
        formData.append("midia", data.midia[i]);
      }
    }

    if (data.user) {
      formData.append("user", JSON.stringify(data.user));
    }
    
    const response = await api.post('/api/report/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
};