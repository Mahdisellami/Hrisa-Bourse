import cron from 'node-cron';
import { fetchCMFCompanyList, fetchCompanyFinancials, downloadDocument } from './cmf.service.js';
import { extractFinancialDataWithAI, calculateFinancialRatios } from './extraction.service.js';
import { fetchMarketIndices, fetchCompanyList } from './bvmt.service.js';

/**
 * Data Pipeline for automatic financial data extraction
 *
 * This service:
 * 1. Fetches company lists from BVMT and CMF
 * 2. Downloads new financial statements
 * 3. Extracts data using AI
 * 4. Calculates financial ratios
 * 5. Stores in database (to be implemented)
 */

export class DataPipeline {
  private isRunning = false;
  private lastRun?: Date;

  /**
   * Initialize scheduled tasks
   */
  initScheduledTasks() {
    // Run daily at 2 AM to fetch new documents
    cron.schedule('0 2 * * *', () => {
      console.log('Running scheduled data pipeline...');
      this.runFullPipeline();
    });

    // Update market data every 15 minutes during trading hours (9 AM - 5 PM)
    cron.schedule('*/15 9-17 * * 1-5', () => {
      console.log('Updating market data...');
      this.updateMarketData();
    });

    console.log('Data pipeline scheduled tasks initialized');
  }

  /**
   * Run the complete data pipeline
   */
  async runFullPipeline() {
    if (this.isRunning) {
      console.log('Pipeline already running, skipping...');
      return;
    }

    this.isRunning = true;
    this.lastRun = new Date();

    try {
      console.log('Starting full data pipeline...');

      // Step 1: Sync company lists
      await this.syncCompanyLists();

      // Step 2: Fetch and process new financial statements
      await this.processFinancialStatements();

      // Step 3: Update market data
      await this.updateMarketData();

      console.log('Data pipeline completed successfully');
    } catch (error) {
      console.error('Pipeline error:', error);
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Sync company lists from BVMT and CMF
   */
  private async syncCompanyLists() {
    try {
      console.log('Syncing company lists...');

      const [bvmtCompanies, cmfCompanies] = await Promise.all([
        fetchCompanyList(),
        fetchCMFCompanyList()
      ]);

      console.log(`Found ${bvmtCompanies.length} BVMT companies`);
      console.log(`Found ${cmfCompanies.length} CMF companies`);

      // TODO: Store in database
      // await db.companies.upsertMany(mergedCompanies);

      return { bvmtCompanies, cmfCompanies };
    } catch (error) {
      console.error('Failed to sync company lists:', error);
      throw error;
    }
  }

  /**
   * Process financial statements for all companies
   */
  private async processFinancialStatements() {
    try {
      console.log('Processing financial statements...');

      const cmfCompanies = await fetchCMFCompanyList();

      for (const companyName of cmfCompanies.slice(0, 10)) {
        // Process first 10 as example
        try {
          console.log(`Processing ${companyName}...`);

          const documents = await fetchCompanyFinancials(companyName);

          for (const doc of documents) {
            // Check if already processed
            // const exists = await db.financialStatements.findOne({ pdfUrl: doc.pdfUrl });
            // if (exists) continue;

            // Download and extract
            const filePath = await downloadDocument(doc.pdfUrl, companyName, doc.year);
            const extractedData = await extractFinancialDataWithAI(filePath);
            const ratios = calculateFinancialRatios(extractedData);

            console.log(`Extracted data for ${companyName} (${doc.year}):`, {
              ...extractedData,
              ratios
            });

            // TODO: Store in database
            // await db.financialStatements.create({
            //   companyName,
            //   year: doc.year,
            //   extractedData,
            //   ratios,
            //   pdfUrl: doc.pdfUrl,
            //   pdfPath: filePath
            // });
          }
        } catch (error) {
          console.error(`Failed to process ${companyName}:`, error);
        }
      }
    } catch (error) {
      console.error('Failed to process financial statements:', error);
      throw error;
    }
  }

  /**
   * Update market data from BVMT
   */
  private async updateMarketData() {
    try {
      console.log('Updating market data...');

      const indices = await fetchMarketIndices();

      console.log('Market indices updated:', indices);

      // TODO: Store in database
      // await db.marketData.createMany(indices);

      return indices;
    } catch (error) {
      console.error('Failed to update market data:', error);
      throw error;
    }
  }

  /**
   * Get pipeline status
   */
  getStatus() {
    return {
      isRunning: this.isRunning,
      lastRun: this.lastRun
    };
  }
}

export const dataPipeline = new DataPipeline();
