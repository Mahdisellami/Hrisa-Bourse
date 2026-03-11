import express from 'express';
import { getMarketIndices, getStockData, getCompanyList } from '../controllers/market.controller.js';

const router = express.Router();

router.get('/indices', getMarketIndices);
router.get('/stock/:ticker', getStockData);
router.get('/companies', getCompanyList);

export default router;
