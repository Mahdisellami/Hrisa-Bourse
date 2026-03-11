import express from 'express';
import { runPipeline, getPipelineStatus } from '../controllers/pipeline.controller.js';

const router = express.Router();

router.post('/run', runPipeline);
router.get('/status', getPipelineStatus);

export default router;
