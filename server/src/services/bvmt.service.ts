import axios from 'axios';
import * as cheerio from 'cheerio';

const BVMT_BASE_URL = 'https://www.bvmt.com.tn';

export interface BVMTStockData {
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

export interface BVMTIndexData {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  timestamp: Date;
}

/**
 * Fetch TUNINDEX and TUNINDEX20 data from BVMT
 */
export async function fetchMarketIndices(): Promise<BVMTIndexData[]> {
  try {
    // BVMT loads data dynamically via CometD/JavaScript
    // For now, returning realistic demo data based on recent market values
    // TODO: Implement CometD subscription or API integration for real-time data

    const timestamp = new Date();

    const indices: BVMTIndexData[] = [
      {
        name: 'TUNINDEX',
        value: 9847.32,
        change: 23.45,
        changePercent: 0.24,
        timestamp
      },
      {
        name: 'TUNINDEX20',
        value: 4521.18,
        change: -12.34,
        changePercent: -0.27,
        timestamp
      }
    ];

    return indices;
  } catch (error) {
    console.error('Failed to fetch BVMT indices:', error);
    return [];
  }
}

/**
 * Fetch stock data for a specific ticker from BVMT
 */
export async function fetchStockData(ticker: string): Promise<BVMTStockData | null> {
  try {
    // Implementation would scrape or use BVMT API if available
    // Placeholder for now
    return null;
  } catch (error) {
    console.error(`Failed to fetch stock data for ${ticker}:`, error);
    return null;
  }
}

/**
 * Generate realistic random stock prices for demo purposes
 */
function generateStockPrice(basePrice: number) {
  const variation = (Math.random() - 0.5) * 2; // -1% to +1%
  const price = basePrice * (1 + variation / 100);
  const change = price - basePrice;
  const changePercent = (change / basePrice) * 100;
  const volume = Math.floor(Math.random() * 100000) + 1000;
  const high = price * (1 + Math.random() * 0.02);
  const low = price * (1 - Math.random() * 0.02);

  return {
    price: Number(price.toFixed(3)),
    change: Number(change.toFixed(3)),
    changePercent: Number(changePercent.toFixed(2)),
    volume,
    high: Number(high.toFixed(3)),
    low: Number(low.toFixed(3))
  };
}

interface CompanyWithPrice {
  ticker: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
}

/**
 * Fetch list of all companies on BVMT with stock prices
 */
export async function fetchCompanyList(): Promise<CompanyWithPrice[]> {
  try {
    // BVMT loads company data dynamically via JavaScript
    // Returning actual Tunisian companies from BVMT with realistic demo prices
    // TODO: Implement dynamic scraping or API integration for real-time prices

    const baseCompanies: Array<{ ticker: string; name: string; sector: string; basePrice: number }> = [
      // Banques (Banks) - Typical prices: 20-90 TND
      { ticker: 'AB', name: 'Amen Bank', sector: 'Banques', basePrice: 42.500 },
      { ticker: 'ATB', name: 'Arab Tunisian Bank', sector: 'Banques', basePrice: 38.750 },
      { ticker: 'BH', name: 'Banque de l\'Habitat', sector: 'Banques', basePrice: 52.300 },
      { ticker: 'BNA', name: 'Banque Nationale Agricole', sector: 'Banques', basePrice: 28.900 },
      { ticker: 'BT', name: 'Banque de Tunisie', sector: 'Banques', basePrice: 35.200 },
      { ticker: 'BIAT', name: 'Banque Internationale Arabe de Tunisie', sector: 'Banques', basePrice: 87.500 },
      { ticker: 'STB', name: 'Société Tunisienne de Banque', sector: 'Banques', basePrice: 24.600 },
      { ticker: 'UIB', name: 'Union Internationale de Banques', sector: 'Banques', basePrice: 31.450 },
      { ticker: 'BTE', name: 'Banque de Tunisie et des Emirats', sector: 'Banques', basePrice: 45.800 },
      { ticker: 'ATL', name: 'Attijari Leasing', sector: 'Banques', basePrice: 19.750 },

      // Assurances (Insurance) - Typical prices: 15-60 TND
      { ticker: 'ASTREE', name: 'Assurances Astrée', sector: 'Assurances', basePrice: 34.200 },
      { ticker: 'CTAR', name: 'Compagnie d\'Assurances et de Réassurances', sector: 'Assurances', basePrice: 28.500 },
      { ticker: 'GAT', name: 'Groupe Assurances Tunis', sector: 'Assurances', basePrice: 41.300 },
      { ticker: 'STAR', name: 'Société Tunisienne d\'Assurances et de Réassurances', sector: 'Assurances', basePrice: 56.700 },
      { ticker: 'MAGHREBIA', name: 'Compagnie Maghrebia d\'Assurances', sector: 'Assurances', basePrice: 22.400 },
      { ticker: 'CARTE', name: 'Carte Assurance', sector: 'Assurances', basePrice: 18.950 },

      // Industriel (Industrial) - Typical prices: 5-40 TND
      { ticker: 'SOTETEL', name: 'Société Télécommunications', sector: 'Industriel', basePrice: 12.450 },
      { ticker: 'ALKIMIA', name: 'Alkimia', sector: 'Industriel', basePrice: 8.750 },
      { ticker: 'SITS', name: 'Société Industrielle de Textile de Sfax', sector: 'Industriel', basePrice: 6.200 },
      { ticker: 'SOTRAPIL', name: 'Société de Transport Pétrolier', sector: 'Industriel', basePrice: 15.800 },
      { ticker: 'SOTUVER', name: 'Société Tunisienne du Verre', sector: 'Industriel', basePrice: 11.300 },
      { ticker: 'STIP', name: 'Société Tunisienne des Industries de Pneumatiques', sector: 'Industriel', basePrice: 9.650 },
      { ticker: 'TPR', name: 'Tunisie Profilés Aluminium', sector: 'Industriel', basePrice: 14.200 },
      { ticker: 'ICF', name: 'Industries Chimiques du Fluor', sector: 'Industriel', basePrice: 7.450 },
      { ticker: 'ESSOUKNA', name: 'Essoukna', sector: 'Industriel', basePrice: 5.800 },
      { ticker: 'SAH', name: 'Société Atelier du Habillement', sector: 'Industriel', basePrice: 4.950 },

      // Services - Typical prices: 8-35 TND
      { ticker: 'SERVICOM', name: 'Servicom', sector: 'Services', basePrice: 16.750 },
      { ticker: 'SIMPAR', name: 'SIMPAR Société Immobilière et de Participations', sector: 'Services', basePrice: 23.400 },
      { ticker: 'SOMOCER', name: 'Société Moderne de Céramique', sector: 'Services', basePrice: 18.900 },
      { ticker: 'TAIR', name: 'Tunis Air', sector: 'Services', basePrice: 12.650 },
      { ticker: 'ELECTROSTAR', name: 'Electrostar', sector: 'Services', basePrice: 9.850 },
      { ticker: 'ONE', name: 'Office National de l\'Électricité', sector: 'Services', basePrice: 28.300 },

      // Distribution - Typical prices: 10-45 TND
      { ticker: 'MG', name: 'Monoprix', sector: 'Distribution', basePrice: 38.500 },
      { ticker: 'SFBT', name: 'Société Frigorifique et Brasserie de Tunis', sector: 'Distribution', basePrice: 26.750 },
      { ticker: 'ENNAKL', name: 'Ennakl Automobiles', sector: 'Distribution', basePrice: 31.200 },
      { ticker: 'SOTUMAG', name: 'Société Tunisienne de Magasins', sector: 'Distribution', basePrice: 14.650 },
      { ticker: 'CITYCAR', name: 'City Cars', sector: 'Distribution', basePrice: 21.400 },

      // Immobilier (Real Estate) - Typical prices: 3-20 TND
      { ticker: 'SICAF', name: 'SICAF de l\'Agareb', sector: 'Immobilier', basePrice: 8.750 },
      { ticker: 'SPDIT', name: 'Société de Promotion et de Développement Industriel et Touristique', sector: 'Immobilier', basePrice: 12.300 },
      { ticker: 'SOTUIM', name: 'Société Tunisienne Immobilière', sector: 'Immobilier', basePrice: 5.450 },
      { ticker: 'SEFIB', name: 'Société d\'Etudes Financières et Immobilières de Bizerte', sector: 'Immobilier', basePrice: 3.850 }
    ];

    // Add stock prices to companies
    const companies: CompanyWithPrice[] = baseCompanies.map(company => ({
      ticker: company.ticker,
      name: company.name,
      sector: company.sector,
      ...generateStockPrice(company.basePrice)
    }));

    return companies;
  } catch (error) {
    console.error('Failed to fetch company list:', error);
    return [];
  }
}

/**
 * Search for companies on BVMT
 */
export async function searchCompanies(query: string): Promise<BVMTStockData[]> {
  try {
    // Implementation for search functionality
    return [];
  } catch (error) {
    console.error('Failed to search companies:', error);
    return [];
  }
}
