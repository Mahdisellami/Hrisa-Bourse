import { IndexData, StockData, CompanyData, MarketApiResponse } from '../types/market';

// Use relative path in production (Docker), absolute in development
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export async function fetchMarketIndices(): Promise<IndexData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/market/indices`);
    const data: MarketApiResponse<IndexData[]> = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch market indices');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching market indices:', error);
    return [];
  }
}

export async function fetchCompanyList(): Promise<CompanyData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/market/companies`);
    const data: MarketApiResponse<CompanyData[]> = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch company list');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching company list:', error);
    return [];
  }
}

export async function fetchStockData(ticker: string): Promise<StockData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/market/stock/${ticker}`);
    const data: MarketApiResponse<StockData> = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch stock data');
    }

    return data.data;
  } catch (error) {
    console.error(`Error fetching stock data for ${ticker}:`, error);
    return null;
  }
}
