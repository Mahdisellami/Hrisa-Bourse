# Hrisa Bourse

Investment and Banking Web Application for the Tunisian financial market with AI-powered document analysis.

Specifically designed for **BVMT** (Bourse des Valeurs Mobilières de Tunis) and **CMF** (Conseil du Marché Financier) integration.

## Features

- **React + TypeScript Frontend**: Modern, type-safe frontend with Vite
- **Node.js + Express Backend**: RESTful API with TypeScript
- **BVMT Integration**: Real-time market data from Tunisian Stock Exchange
- **CMF Integration**: Automated financial document fetching from CMF
- **AI-Powered Analysis**: Ollama integration for document analysis and financial data extraction
- **Multi-language**: French (primary), Arabic, and English support
- **Automated Data Pipeline**: Scheduled extraction and processing of financial statements
- **Financial Ratios**: Automatic calculation of ROE, ROA, profit margins, and more
- **PDF Processing**: Cross-platform support for Tunisian financial documents
- **~100 Companies**: Coverage of Tunisian listed companies

For detailed feature documentation, see [FEATURES.md](docs/FEATURES.md)

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development and building
- React Router for navigation
- TanStack Query for data fetching
- Zustand for state management
- react-pdf for PDF viewing
- i18next for internationalization (French, Arabic, English)
- Recharts for financial visualizations

### Backend
- Node.js with Express
- TypeScript for type safety
- pdf-parse for PDF text extraction
- Ollama for AI-powered financial analysis
- Cheerio for web scraping (BVMT/CMF)
- node-cron for scheduled tasks
- Multer for file uploads

## Quick Start with Docker (Recommended)

The fastest way to get started:

```bash
# Start all services (frontend, backend, database, AI)
docker compose up -d

# Initialize AI models (first time only)
./scripts/init-ollama.sh

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

See [DOCKER.md](docs/DOCKER.md) for complete Docker documentation.

---

## Manual Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Ollama** (for AI features)

### Installing Ollama

#### macOS
```bash
brew install ollama
```

#### Linux
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

#### Windows
Download from [ollama.com/download](https://ollama.com/download)

### Pull Required Models

After installing Ollama, pull the required models:

```bash
ollama pull llama2
ollama pull mistral  # Recommended for financial analysis
```

**Note**: Mistral is recommended for better accuracy in financial data extraction from Tunisian documents.

---

## Manual Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Hrisa-Bourse
```

2. Install dependencies for all packages:
```bash
npm install
```

3. Install dependencies for client and server:
```bash
npm run install:all
```

4. Set up environment variables:
```bash
cp server/.env.example server/.env
```

Edit `server/.env` and configure as needed.

5. Check Ollama installation:
```bash
npm run check:ollama
```

## Development

Start both frontend and backend in development mode:

```bash
npm run dev
```

Or run them separately:

```bash
npm run dev:client
npm run dev:server
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API Health: http://localhost:5000/api/health

## Building for Production

Build both client and server:

```bash
npm run build
```

Or build separately:

```bash
npm run build:client
npm run build:server
```

## Project Structure

```
Hrisa-Bourse/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── hooks/         # Custom hooks
│   │   └── types/         # TypeScript types
│   ├── public/            # Static assets
│   └── package.json
│
├── server/                # Express backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Express middleware
│   │   └── types/         # TypeScript types
│   ├── uploads/           # Uploaded documents
│   └── package.json
│
├── shared/                # Shared types and utilities
├── scripts/               # Utility scripts
└── docs/                  # Documentation
```

## API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Market Data (BVMT)
- `GET /api/market/indices` - Get TUNINDEX and TUNINDEX20 data
- `GET /api/market/stock/:ticker` - Get stock data by ticker
- `GET /api/market/companies` - List all Tunisian companies

### CMF Integration
- `GET /api/cmf/companies` - List companies registered with CMF
- `GET /api/cmf/companies/:companyName/documents` - Get company's financial documents
- `POST /api/cmf/download` - Download financial statement PDF

### Documents
- `POST /api/documents/upload` - Upload PDF document
- `POST /api/documents/analyze/:documentId` - Analyze document with AI
- `GET /api/documents` - List uploaded documents

### Data Pipeline
- `POST /api/pipeline/run` - Manually trigger data extraction pipeline
- `GET /api/pipeline/status` - Check pipeline status

### Ollama
- `GET /api/ollama/models` - List available AI models
- `POST /api/ollama/generate` - Generate AI completion
- `POST /api/ollama/chat` - Chat with AI about financial documents

## PDF Libraries

The application includes PDF handling libraries for all platforms:

### Client-side (Browser)
- `pdfjs-dist` - Mozilla's PDF.js for rendering PDFs
- `react-pdf` - React wrapper for PDF.js

### Server-side (Node.js)
- `pdf-parse` - Extract text from PDF files

These libraries work on:
- macOS (Intel & Apple Silicon)
- Linux (x64, ARM)
- Windows (x64)

## Troubleshooting

### Ollama Connection Issues

If you get Ollama connection errors:

1. Ensure Ollama is running:
```bash
ollama serve
```

2. Check if models are available:
```bash
ollama list
```

3. Test Ollama directly:
```bash
curl http://localhost:11434/api/tags
```

### PDF Upload Issues

Ensure the `uploads/` directory exists:
```bash
mkdir -p server/uploads
```

### Port Already in Use

If ports 3000 or 5000 are in use, you can change them:

- Frontend: Edit `client/vite.config.ts`
- Backend: Edit `server/.env`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.
