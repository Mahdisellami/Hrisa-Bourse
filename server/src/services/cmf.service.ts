import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';

const CMF_BASE_URL = 'https://www.cmf.tn';

export interface CMFDocument {
  companyName: string;
  type: 'ANNUAL' | 'INTERIM' | 'QUARTERLY';
  year: number;
  filingDate: string;
  pdfUrl: string;
  fileName: string;
}

/**
 * Fetch list of available financial statements from CMF
 */
export async function fetchAvailableDocuments(): Promise<CMFDocument[]> {
  try {
    const response = await axios.get(
      `${CMF_BASE_URL}/consultation-des-tats-financier-des-soci-t-s-faisant-ape`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
      }
    );

    const $ = cheerio.load(response.data);
    const documents: CMFDocument[] = [];

    // Parse the dropdown menu and document listings
    // Implementation depends on actual CMF HTML structure

    return documents;
  } catch (error) {
    console.error('Failed to fetch CMF documents:', error);
    throw new Error('Failed to fetch documents from CMF');
  }
}

/**
 * Download a PDF document from CMF
 */
export async function downloadDocument(
  documentUrl: string,
  companyName: string,
  year: number
): Promise<string> {
  try {
    const response = await axios.get(documentUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });

    const fileName = `${companyName}_${year}_${Date.now()}.pdf`;
    const uploadsDir = path.join(process.cwd(), 'uploads');
    const filePath = path.join(uploadsDir, fileName);

    await fs.writeFile(filePath, response.data);

    return filePath;
  } catch (error) {
    console.error('Failed to download CMF document:', error);
    throw new Error('Failed to download document from CMF');
  }
}

/**
 * Scrape financial statement for a specific company
 */
export async function fetchCompanyFinancials(companyName: string): Promise<CMFDocument[]> {
  try {
    // Implementation to search and fetch documents for a specific company
    return [];
  } catch (error) {
    console.error(`Failed to fetch financials for ${companyName}:`, error);
    return [];
  }
}

/**
 * Get list of all companies registered with CMF
 */
export async function fetchCMFCompanyList(): Promise<string[]> {
  try {
    const response = await axios.get(
      `${CMF_BASE_URL}/consultation-des-tats-financier-des-soci-t-s-faisant-ape`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
      }
    );

    const $ = cheerio.load(response.data);
    const companies: string[] = [];

    // Parse the dropdown menu containing company names
    $('select option').each((i, elem) => {
      const name = $(elem).text().trim();
      if (name && name !== '') {
        companies.push(name);
      }
    });

    return companies;
  } catch (error) {
    console.error('Failed to fetch CMF company list:', error);
    return [];
  }
}
