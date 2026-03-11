import express from 'express';
import { getCMFCompanies, getCompanyDocuments, downloadCMFDocument } from '../controllers/cmf.controller.js';

const router = express.Router();

router.get('/companies', getCMFCompanies);
router.get('/companies/:companyName/documents', getCompanyDocuments);
router.post('/download', downloadCMFDocument);

export default router;
