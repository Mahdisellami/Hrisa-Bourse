import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { checkOllamaConnection } from './services/ollama.service.js';
import { dataPipeline } from './services/pipeline.service.js';
import documentRoutes from './routes/document.routes.js';
import ollamaRoutes from './routes/ollama.routes.js';
import marketRoutes from './routes/market.routes.js';
import cmfRoutes from './routes/cmf.routes.js';
import pipelineRoutes from './routes/pipeline.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for production
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.FRONTEND_URL || ''
].filter(Boolean);

app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Hrisa Bourse API is running' });
});

app.use('/api/documents', documentRoutes);
app.use('/api/ollama', ollamaRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/cmf', cmfRoutes);
app.use('/api/pipeline', pipelineRoutes);

async function startServer() {
  try {
    const ollamaStatus = await checkOllamaConnection();
    console.log('Ollama connection:', ollamaStatus ? '✓ Connected' : '✗ Not available');

    // Initialize data pipeline scheduled tasks
    dataPipeline.initScheduledTasks();
    console.log('Data pipeline initialized');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
      console.log('\nAvailable endpoints:');
      console.log('  - Market data: /api/market/indices, /api/market/companies');
      console.log('  - CMF data: /api/cmf/companies');
      console.log('  - Documents: /api/documents/upload, /api/documents/analyze/:id');
      console.log('  - Pipeline: /api/pipeline/status, /api/pipeline/run');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
