# Getting Started with Hrisa Bourse

## Docker Setup (Recommended) 🐳

### Step 1: Start Docker Desktop

Make sure Docker Desktop is running on your machine.

**macOS:**
- Open Docker Desktop from Applications
- Wait for the whale icon in menu bar to be steady

**Windows:**
- Open Docker Desktop
- Wait for "Docker Desktop is running" message

**Linux:**
- `sudo systemctl start docker`

### Step 2: Build and Start Services

```bash
# Navigate to project directory
cd Hrisa-Bourse

# Start all services (this will take a few minutes the first time)
docker compose up -d --build
```

This will start:
- ✅ PostgreSQL database on port 5432
- ✅ Ollama AI service on port 11434
- ✅ Backend API on port 5000
- ✅ Frontend on port 3000

### Step 3: Initialize AI Models

Wait about 30 seconds for Ollama to be ready, then:

```bash
# Pull Mistral (recommended for Tunisian financial documents)
docker exec hrisa-ollama ollama pull mistral

# Pull Llama2 (alternative model)
docker exec hrisa-ollama ollama pull llama2
```

Or use the initialization script:

```bash
./scripts/init-ollama.sh
```

### Step 4: Access the Application

Open your browser to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/health

### Step 5: Test the API

```bash
# Check health
curl http://localhost:5000/api/health

# Check pipeline status
curl http://localhost:5000/api/pipeline/status

# Get Ollama models
curl http://localhost:5000/api/ollama/models
```

---

## Manual Setup (Without Docker)

### Prerequisites

1. **Install Node.js 18+**
   ```bash
   node --version  # Should be v18 or higher
   ```

2. **Install Ollama**

   **macOS:**
   ```bash
   brew install ollama
   ollama serve &
   ```

   **Linux:**
   ```bash
   curl -fsSL https://ollama.com/install.sh | sh
   ollama serve &
   ```

   **Windows:**
   - Download from https://ollama.com/download
   - Install and run

3. **Pull AI Models**
   ```bash
   ollama pull mistral
   ollama pull llama2
   ```

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm run install:all
   ```

2. **Configure Environment**
   ```bash
   cp server/.env.example server/.env
   # Edit server/.env if needed
   ```

3. **Start Development Servers**
   ```bash
   npm run dev
   ```

   Or separately:
   ```bash
   # Terminal 1 - Backend
   npm run dev:server

   # Terminal 2 - Frontend
   npm run dev:client
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

---

## Useful Commands

### Docker Commands

```bash
# View logs
docker compose logs -f

# View logs for specific service
docker compose logs -f server

# Stop all services
docker compose down

# Stop and remove all data
docker compose down -v

# Restart a service
docker compose restart server

# Check service status
docker compose ps

# Rebuild after code changes
docker compose up -d --build
```

### Development Commands

```bash
# Check Ollama installation
npm run check:ollama

# Run linter
npm run lint

# Build for production
npm run build

# Build only frontend
npm run build:client

# Build only backend
npm run build:server
```

---

## Troubleshooting

### Docker Issues

**Problem: "Cannot connect to Docker daemon"**
- Solution: Start Docker Desktop and wait for it to be ready

**Problem: Port already in use**
```bash
# Find what's using the port
lsof -i :3000
lsof -i :5000

# Kill the process or change ports in docker-compose.yml
```

**Problem: Ollama models not loading**
```bash
# Check Ollama is running
docker exec hrisa-ollama ollama list

# Re-pull models
docker exec hrisa-ollama ollama pull mistral
```

**Problem: Out of disk space**
```bash
# Clean up Docker
docker system prune -a --volumes

# This will remove:
# - Stopped containers
# - Unused networks
# - Dangling images
# - Build cache
```

### Manual Setup Issues

**Problem: Ollama connection failed**
```bash
# Check Ollama is running
ollama list

# Start Ollama
ollama serve
```

**Problem: Port 3000 or 5000 already in use**
```bash
# Find and kill the process
lsof -i :3000
kill -9 <PID>

# Or change ports
# Frontend: Edit client/vite.config.ts
# Backend: Edit server/.env (PORT=5001)
```

---

## Next Steps

1. **Explore the API**
   - Visit http://localhost:5000/api/health
   - Try the endpoints in FEATURES.md

2. **Upload a Financial Document**
   - Use the frontend at http://localhost:3000
   - Or via API: `POST /api/documents/upload`

3. **Run the Data Pipeline**
   ```bash
   curl -X POST http://localhost:5000/api/pipeline/run
   ```

4. **Check Pipeline Status**
   ```bash
   curl http://localhost:5000/api/pipeline/status
   ```

---

## Documentation

- [Complete Features](docs/FEATURES.md)
- [Docker Guide](docs/DOCKER.md)
- [Main README](README.md)

---

## Support

If you encounter issues:

1. Check the logs:
   - Docker: `docker compose logs -f`
   - Manual: Check terminal output

2. Verify all services are running:
   - Docker: `docker compose ps`
   - Manual: Check each terminal

3. Restart services:
   - Docker: `docker compose restart`
   - Manual: Stop and restart npm processes

4. Clean slate:
   - Docker: `docker compose down -v && docker compose up -d --build`
   - Manual: Remove node_modules and reinstall

---

**Ready to go!** 🚀

Access your application at **http://localhost:3000**
