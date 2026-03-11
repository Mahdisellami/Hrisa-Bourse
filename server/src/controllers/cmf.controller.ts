import { Request, Response } from 'express';
import {
  fetchCMFCompanyList,
  fetchCompanyFinancials,
  downloadDocument
} from '../services/cmf.service.js';

export async function getCMFCompanies(req: Request, res: Response) {
  try {
    const companies = await fetchCMFCompanyList();
    res.json({
      success: true,
      data: companies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch CMF companies'
    });
  }
}

export async function getCompanyDocuments(req: Request, res: Response) {
  try {
    const { companyName } = req.params;
    const documents = await fetchCompanyFinancials(companyName);

    res.json({
      success: true,
      data: documents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch company documents'
    });
  }
}

export async function downloadCMFDocument(req: Request, res: Response) {
  try {
    const { documentUrl, companyName, year } = req.body;

    if (!documentUrl || !companyName || !year) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters'
      });
    }

    const filePath = await downloadDocument(documentUrl, companyName, year);

    res.json({
      success: true,
      data: {
        filePath,
        message: 'Document downloaded successfully'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to download document'
    });
  }
}
