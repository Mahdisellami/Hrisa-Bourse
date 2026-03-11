import express from 'express';
import { getModels, generate, chat } from '../controllers/ollama.controller.js';

const router = express.Router();

router.get('/models', getModels);
router.post('/generate', generate);
router.post('/chat', chat);

export default router;
