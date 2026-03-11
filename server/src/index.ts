import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { checkOllamaConnection } from './services/ollama.service.js';
import documentRoutes from './routes/document.routes.js';
import ollamaRoutes from './routes/ollama.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Hrisa Bourse API is running' });
});

app.use('/api/documents', documentRoutes);
app.use('/api/ollama', ollamaRoutes);

async function startServer() {
  try {
    const ollamaStatus = await checkOllamaConnection();
    console.log('Ollama connection:', ollamaStatus ? '✓ Connected' : '✗ Not available');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
