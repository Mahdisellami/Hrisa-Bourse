# Hrisa Bourse - Features Documentation

## Overview

Hrisa Bourse is a comprehensive investment and banking platform specifically designed for the Tunisian financial market. It integrates with BVMT (Bourse des Valeurs Mobilières de Tunis) and CMF (Conseil du Marché Financier) to provide real-time market data, financial document analysis, and AI-powered insights.

## Core Features

### 1. Multi-language Support 🌍
- **French** (Primary language - default)
- **Arabic** (Native language support)
- **English** (International users)

Implemented using i18next with complete translation coverage for:
- Navigation
- Market data displays
- Financial analysis terms
- Common UI elements

### 2. BVMT Market Data Integration 📊

Real-time integration with the Tunisian Stock Exchange:

- **Market Indices**: TUNINDEX, TUNINDEX20
- **Stock Data**: Real-time prices, volume, changes
- **Company Listings**: All ~100 Tunisian listed companies
- **Sector Classification**: Banking, Insurance, Industrial, Services, Real Estate, Distribution

**API Endpoints:**
- `GET /api/market/indices` - Fetch market indices
- `GET /api/market/stock/:ticker` - Get stock data by ticker
- `GET /api/market/companies` - List all companies

### 3. CMF Document Integration 📄

Automated access to financial statements from Tunisia's Financial Market Council:

- **Document Types**:
  - Annual financial statements
  - Interim financial statements
  - Quarterly reports

- **Features**:
  - Automated document discovery
  - PDF download and storage
  - Company financial history tracking

**API Endpoints:**
- `GET /api/cmf/companies` - List all CMF-registered companies
- `GET /api/cmf/companies/:companyName/documents` - Get company documents
- `POST /api/cmf/download` - Download specific document

### 4. AI-Powered Document Analysis 🤖

Leverages Ollama (local AI) for financial document processing:

- **Financial Data Extraction**:
  - Balance sheet items (assets, liabilities, equity)
  - Income statement items (revenue, net income, EBITDA)
  - Cash flow statement items
  - Currency detection (TND, EUR, USD)

- **Extraction Methods**:
  - AI-powered extraction (primary - using Mistral/Llama2)
  - Regex fallback (for reliability)
  - Manual entry support

- **Confidence Scoring**: Each extraction includes a confidence score

**API Endpoints:**
- `POST /api/documents/upload` - Upload financial document
- `POST /api/documents/analyze/:documentId` - Analyze with AI
- `POST /api/ollama/generate` - Generate AI completion
- `POST /api/ollama/chat` - Chat with AI about documents

### 5. Automated Data Pipeline 🔄

Scheduled data extraction and processing system:

**Scheduled Tasks:**
- **Daily (2 AM)**: Full pipeline run
  - Sync company lists from BVMT and CMF
  - Download new financial statements
  - Extract financial data using AI
  - Calculate financial ratios

- **Every 15 minutes (9 AM - 5 PM, Mon-Fri)**: Market data updates
  - Update stock prices
  - Update market indices
  - Track volume changes

**Pipeline Management:**
- `POST /api/pipeline/run` - Manually trigger pipeline
- `GET /api/pipeline/status` - Check pipeline status

### 6. Financial Ratio Calculation 📈

Automatic calculation of key financial metrics:

**Profitability Ratios:**
- ROE (Return on Equity)
- ROA (Return on Assets)
- Profit Margin

**Liquidity Ratios:**
- Current Ratio

**Leverage Ratios:**
- Debt to Equity

**Valuation Ratios:**
- P/E Ratio
- P/B Ratio
- Dividend Yield

### 7. PDF Processing 📑

Cross-platform PDF handling for all operating systems:

**Client-side:**
- `pdfjs-dist` - Mozilla's PDF.js for browser rendering
- `react-pdf` - React wrapper for PDF viewing

**Server-side:**
- `pdf-parse` - Text extraction from PDFs
- Support for Tunisian financial statement formats

**Platforms Supported:**
- macOS (Intel & Apple Silicon)
- Linux (x64, ARM)
- Windows (x64)

## Architecture

### Shared Types

The `shared/` directory contains TypeScript types used across frontend and backend:

- **TunisianCompany**: Company data structure
- **StockData**: Real-time market data
- **FinancialStatement**: Document metadata
- **FinancialData**: Extracted financial metrics
- **CompanySector**: Sector enumeration

### Services Layer

**Backend Services:**
- `bvmt.service.ts` - BVMT integration
- `cmf.service.ts` - CMF integration
- `ollama.service.ts` - AI/LLM integration
- `pdf.service.ts` - PDF processing
- `extraction.service.ts` - Financial data extraction
- `pipeline.service.ts` - Automated data pipeline

### Data Flow

```
BVMT/CMF Websites
      ↓
Web Scraping / API
      ↓
Data Pipeline (Scheduled)
      ↓
PDF Download & Storage
      ↓
AI Extraction (Ollama)
      ↓
Database (Future)
      ↓
REST API
      ↓
React Frontend
```

## Tunisian Market Specifics

### Companies Coverage

**Target**: ~100 Tunisian companies (97% listed on BVMT)

**Sectors:**
- Banks (e.g., BNA, STB, Attijari Bank)
- Insurance (e.g., STAR, MAE, AMI)
- Industrial companies
- Services sector
- Real estate
- Distribution

### Currency Support

- Primary: **TND** (Tunisian Dinar)
- Secondary: EUR, USD for international operations

### Language Requirements

Financial documents are typically in **French**, with some Arabic content. The platform supports:
- French financial terminology
- Arabic number formats
- Bilingual company names

## Next Steps (Roadmap)

### Phase 1: Database Integration
- PostgreSQL setup
- Company data persistence
- Financial statement storage
- User accounts and portfolios

### Phase 2: Mobile-First UI
- React components matching the sketch design
- Market dashboard with TUNINDEX display
- Company search and filtering
- Document upload interface

### Phase 3: Advanced Analysis
- Company comparison tool
- Investment recommendations
- Portfolio tracking
- Alerts and notifications

### Phase 4: Real-time Features
- WebSocket integration for live prices
- Real-time market updates
- Chat-based financial assistant

## Development

### Environment Variables

```env
PORT=5000
OLLAMA_BASE_URL=http://localhost:11434
NODE_ENV=development
```

### Running the Pipeline

```bash
# Manually trigger the data pipeline
curl -X POST http://localhost:5000/api/pipeline/run

# Check pipeline status
curl http://localhost:5000/api/pipeline/status
```

### Testing Market Integration

```bash
# Get market indices
curl http://localhost:5000/api/market/indices

# Get company list
curl http://localhost:5000/api/market/companies

# Get CMF companies
curl http://localhost:5000/api/cmf/companies
```

## Technologies Used

### Frontend
- React 18 + TypeScript
- Vite
- i18next (i18n)
- React Query
- Zustand
- Recharts (future - for financial charts)
- React PDF

### Backend
- Node.js + Express
- TypeScript
- Cheerio (web scraping)
- Axios
- Ollama (AI)
- pdf-parse
- node-cron (scheduling)

### AI/ML
- Ollama (local LLM)
- Mistral model (recommended)
- Llama2 model
- Custom financial extraction prompts

## Security & Compliance

- Helmet.js for security headers
- CORS configuration
- Rate limiting (to be implemented)
- CMF data usage compliance
- No financial advice disclaimer

## Support

For issues, questions, or contributions:
- GitHub Issues: [Repository Link]
- Documentation: `docs/` directory
- API Reference: See `FEATURES.md` (this file)
