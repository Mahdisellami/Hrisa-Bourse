export interface TunisianCompany {
  id: string;
  name: string;
  nameFr: string;
  nameAr?: string;
  ticker: string;
  sector: CompanySector;
  isin?: string;
  isListed: boolean;
  listedOn?: 'BVMT';
  cmfRegistered: boolean;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum CompanySector {
  BANKING = 'BANKING',
  INSURANCE = 'INSURANCE',
  INDUSTRIAL = 'INDUSTRIAL',
  SERVICES = 'SERVICES',
  REAL_ESTATE = 'REAL_ESTATE',
  DISTRIBUTION = 'DISTRIBUTION',
  INVESTMENT = 'INVESTMENT',
  OTHER = 'OTHER'
}

export interface StockData {
  companyId: string;
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  marketCap?: number;
  timestamp: Date;
}

export interface FinancialStatement {
  id: string;
  companyId: string;
  year: number;
  quarter?: number;
  type: StatementType;
  filingDate: Date;
  periodEnd: Date;
  pdfUrl?: string;
  pdfPath?: string;
  processed: boolean;
  extractedData?: FinancialData;
  source: 'CMF' | 'COMPANY' | 'MANUAL';
  createdAt: Date;
}

export enum StatementType {
  ANNUAL = 'ANNUAL',
  QUARTERLY = 'QUARTERLY',
  INTERIM = 'INTERIM'
}

export interface FinancialData {
  // Balance Sheet
  totalAssets?: number;
  totalLiabilities?: number;
  equity?: number;
  currentAssets?: number;
  currentLiabilities?: number;
  cash?: number;
  debt?: number;

  // Income Statement
  revenue?: number;
  netIncome?: number;
  operatingIncome?: number;
  ebitda?: number;
  eps?: number;

  // Cash Flow
  operatingCashFlow?: number;
  investingCashFlow?: number;
  financingCashFlow?: number;
  freeCashFlow?: number;

  // Ratios (calculated)
  roe?: number; // Return on Equity
  roa?: number; // Return on Assets
  currentRatio?: number;
  debtToEquity?: number;
  priceToEarnings?: number;
  priceToBook?: number;
  dividendYield?: number;

  currency: 'TND' | 'EUR' | 'USD';
  extracted: boolean;
  confidence?: number;
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  timestamp: Date;
}
