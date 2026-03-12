export interface StockData {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  timestamp: Date;
}

export interface IndexData {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  timestamp: Date;
}

export interface CompanyData {
  ticker: string;
  name: string;
  sector: string;
  price?: number;
  change?: number;
  changePercent?: number;
  volume?: number;
  high?: number;
  low?: number;
}

export interface MarketApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}
