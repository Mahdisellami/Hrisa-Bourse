export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CompanyQuery {
  sector?: string;
  isListed?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface DocumentAnalysisRequest {
  documentId: string;
  query: string;
  model?: string;
  language?: 'fr' | 'ar' | 'en';
}

export interface DocumentAnalysisResponse {
  documentId: string;
  query: string;
  answer: string;
  confidence: number;
  sources?: string[];
  language: string;
}

export interface FinancialComparisonRequest {
  companyIds: string[];
  metrics: string[];
  period?: {
    start: string;
    end: string;
  };
}
