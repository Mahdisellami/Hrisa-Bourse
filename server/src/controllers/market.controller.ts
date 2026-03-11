import { Request, Response } from 'express';
import { fetchMarketIndices, fetchStockData, fetchCompanyList } from '../services/bvmt.service.js';

export async function getMarketIndices(req: Request, res: Response) {
  try {
    const indices = await fetchMarketIndices();
    res.json({
      success: true,
      data: indices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch market indices'
    });
  }
}

export async function getStockData(req: Request, res: Response) {
  try {
    const { ticker } = req.params;
    const stockData = await fetchStockData(ticker);

    if (!stockData) {
      return res.status(404).json({
        success: false,
        error: 'Stock not found'
      });
    }

    res.json({
      success: true,
      data: stockData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch stock data'
    });
  }
}

export async function getCompanyList(req: Request, res: Response) {
  try {
    const companies = await fetchCompanyList();
    res.json({
      success: true,
      data: companies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch company list'
    });
  }
}
