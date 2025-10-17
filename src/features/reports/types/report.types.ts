export type ReportStatus = 'PENDING' | 'UNDER_REVIEW' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';

export interface Report {
  id: number;
  description: string;
  details: string;
  ocurrenceDate: string;
  location: string;
  status: ReportStatus;
  midia: ReportMidia[];
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface ReportMidia {
  id: number;
  type: string;
  url: string;
}

export interface ReportFilters {
  status?: ReportStatus;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ReportListResponse {
  reports: Report[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateReportData {
  description: string;
  details: string;
  ocurrenceDate: Date;
  location: string;
  midia: FileList;
  user?: any;
}