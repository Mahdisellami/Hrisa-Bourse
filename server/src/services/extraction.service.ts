import { parsePDF } from './pdf.service.js';
import { generateCompletion } from './ollama.service.js';

export interface ExtractedFinancialData {
  // Balance Sheet Items
  totalAssets?: number;
  totalLiabilities?: number;
  equity?: number;
  currentAssets?: number;
  currentLiabilities?: number;
  cash?: number;
  debt?: number;

  // Income Statement Items
  revenue?: number;
  netIncome?: number;
  operatingIncome?: number;
  ebitda?: number;
  eps?: number;

  // Cash Flow Items
  operatingCashFlow?: number;
  investingCashFlow?: number;
  financingCashFlow?: number;
  freeCashFlow?: number;

  // Metadata
  currency: string;
  confidence: number;
  extractionMethod: 'AI' | 'REGEX' | 'MANUAL';
}

/**
 * Extract financial data from PDF using AI (Ollama)
 */
export async function extractFinancialDataWithAI(
  filePath: string,
  model: string = 'mistral'
): Promise<ExtractedFinancialData> {
  try {
    const pdfData = await parsePDF(filePath);
    const text = pdfData.text;

    const prompt = `
Analyze this Tunisian financial statement and extract the following key metrics.
Respond ONLY with JSON format, no additional text.

Financial Statement Text:
${text.substring(0, 8000)}

Extract these values (use null if not found):
{
  "totalAssets": number in TND,
  "totalLiabilities": number in TND,
  "equity": number in TND,
  "revenue": number in TND,
  "netIncome": number in TND,
  "operatingIncome": number in TND,
  "currentAssets": number in TND,
  "currentLiabilities": number in TND,
  "cash": number in TND,
  "debt": number in TND,
  "currency": "TND" or other,
  "confidence": number between 0 and 1
}

Return only valid JSON.
`;

    const response = await generateCompletion(model, prompt);

    try {
      const extracted = JSON.parse(response.response);
      return {
        ...extracted,
        extractionMethod: 'AI' as const
      };
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      return fallbackExtraction(text);
    }
  } catch (error) {
    console.error('AI extraction failed:', error);
    throw new Error('Failed to extract financial data with AI');
  }
}

/**
 * Extract financial data using regex patterns (fallback method)
 */
function fallbackExtraction(text: string): ExtractedFinancialData {
  const data: ExtractedFinancialData = {
    currency: 'TND',
    confidence: 0.3,
    extractionMethod: 'REGEX'
  };

  // French financial statement patterns
  const patterns = {
    totalAssets: /Total\s+(?:de l')?actif[:\s]+([0-9\s]+)/i,
    totalLiabilities: /Total\s+(?:des\s+)?passifs?[:\s]+([0-9\s]+)/i,
    equity: /Capitaux\s+propres[:\s]+([0-9\s]+)/i,
    revenue: /Chiffre\s+d'affaires[:\s]+([0-9\s]+)/i,
    netIncome: /R[ée]sultat\s+net[:\s]+([0-9\s]+)/i
  };

  for (const [key, pattern] of Object.entries(patterns)) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const value = parseFloat(match[1].replace(/\s/g, ''));
      if (!isNaN(value)) {
        (data as any)[key] = value;
      }
    }
  }

  return data;
}

/**
 * Calculate financial ratios from extracted data
 */
export function calculateFinancialRatios(data: ExtractedFinancialData) {
  const ratios: any = {};

  // ROE (Return on Equity)
  if (data.netIncome && data.equity) {
    ratios.roe = (data.netIncome / data.equity) * 100;
  }

  // ROA (Return on Assets)
  if (data.netIncome && data.totalAssets) {
    ratios.roa = (data.netIncome / data.totalAssets) * 100;
  }

  // Current Ratio
  if (data.currentAssets && data.currentLiabilities) {
    ratios.currentRatio = data.currentAssets / data.currentLiabilities;
  }

  // Debt to Equity
  if (data.debt && data.equity) {
    ratios.debtToEquity = data.debt / data.equity;
  }

  // Profit Margin
  if (data.netIncome && data.revenue) {
    ratios.profitMargin = (data.netIncome / data.revenue) * 100;
  }

  return ratios;
}

/**
 * Validate extracted financial data
 */
export function validateFinancialData(data: ExtractedFinancialData): boolean {
  // Basic validation rules
  if (data.totalAssets && data.totalAssets < 0) return false;
  if (data.equity && data.totalLiabilities && data.totalAssets) {
    const calculatedEquity = data.totalAssets - data.totalLiabilities;
    const difference = Math.abs(calculatedEquity - data.equity);
    if (difference / data.totalAssets > 0.01) {
      // More than 1% difference
      console.warn('Balance sheet equation does not hold');
    }
  }

  return true;
}
