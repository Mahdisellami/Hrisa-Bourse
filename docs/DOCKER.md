# Docker Setup Guide

## Overview

This application is fully dockerized with Docker Compose, including:
- **Frontend**: React + Vite (Nginx)
- **Backend**: Node.js + Express
- **Database**: PostgreSQL 15
- **AI**: Ollama with Mistral and Llama2 models

## Prerequisites

- Docker Desktop (or Docker Engine + Docker Compose)
- At least 8GB RAM recommended
- 10GB free disk space (for AI models)

## Quick Start

### 1. Build and Start All Services

```bash
docker compose up -d
```

This will start:
- PostgreSQL on port **5432**
- Ollama on port **11434**
- Backend API on port **5000**
- Frontend on port **3000**

### 2. Initialize Ollama Models

After the services are up, pull the required AI models:

```bash
./scripts/init-ollama.sh
```

Or manually:

```bash
docker exec hrisa-ollama ollama pull mistral
docker exec hrisa-ollama ollama pull llama2
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/health
- **Ollama**: http://localhost:11434/api/tags

## Docker Commands

### Start Services

```bash
# Start all services in background
docker compose up -d

# Start and view logs
docker compose up

# Start specific service
docker compose up -d server
```

### Stop Services

```bash
# Stop all services
docker compose down

# Stop and remove volumes (clean slate)
docker compose down -v
```

### View Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f server
docker compose logs -f client
docker compose logs -f ollama
```

### Rebuild After Code Changes

```bash
# Rebuild and restart
docker compose up -d --build

# Rebuild specific service
docker compose up -d --build server
```

### Check Service Status

```bash
docker compose ps
```

### Access Container Shell

```bash
# Backend container
docker exec -it hrisa-server sh

# Frontend container
docker exec -it hrisa-client sh

# Ollama container
docker exec -it hrisa-ollama bash

# PostgreSQL container
docker exec -it hrisa-postgres psql -U hrisa -d hrisa_bourse
```

## Service Details

### Frontend (client)
- **Port**: 3000 (maps to 80 in container)
- **Build**: Multi-stage with Vite build + Nginx
- **Nginx**: Serves static files and proxies `/api` to backend

### Backend (server)
- **Port**: 5000
- **Environment Variables**:
  - `OLLAMA_BASE_URL=http://ollama:11434`
  - `DATABASE_URL=postgresql://hrisa:hrisa_password@postgres:5432/hrisa_bourse`
- **Volumes**: `./server/uploads` for document storage

### PostgreSQL (postgres)
- **Port**: 5432
- **Database**: hrisa_bourse
- **User**: hrisa
- **Password**: hrisa_password (change in production!)
- **Volume**: `postgres_data` for persistence

### Ollama (ollama)
- **Port**: 11434
- **Models**: Mistral, Llama2 (pulled after startup)
- **Volume**: `ollama_data` for model storage (~4-7GB)

## Environment Variables

### Backend (.env)

The backend uses these environment variables (configured in docker-compose.yml):

```env
NODE_ENV=production
PORT=5000
OLLAMA_BASE_URL=http://ollama:11434
DATABASE_URL=postgresql://hrisa:hrisa_password@postgres:5432/hrisa_bourse
```

To override, create a `.env` file in the `server/` directory.

## Volumes

Persistent data is stored in Docker volumes:

- `postgres_data`: Database files
- `ollama_data`: AI models (~4-7GB)
- `./server/uploads`: Uploaded PDFs (bind mount)

### Backup Data

```bash
# Backup PostgreSQL
docker exec hrisa-postgres pg_dump -U hrisa hrisa_bourse > backup.sql

# Restore PostgreSQL
docker exec -i hrisa-postgres psql -U hrisa hrisa_bourse < backup.sql
```

## Troubleshooting

### Services Won't Start

1. Check if ports are available:
```bash
lsof -i :3000
lsof -i :5000
lsof -i :5432
lsof -i :11434
```

2. Check logs:
```bash
docker compose logs
```

### Ollama Models Not Loading

```bash
# Check Ollama status
docker exec hrisa-ollama ollama list

# Pull models again
./scripts/init-ollama.sh
```

### Backend Can't Connect to Ollama

```bash
# Test connection from backend container
docker exec hrisa-server wget -O- http://ollama:11434/api/tags
```

### Database Connection Issues

```bash
# Check PostgreSQL is ready
docker exec hrisa-postgres pg_isready -U hrisa

# Access database
docker exec -it hrisa-postgres psql -U hrisa -d hrisa_bourse
```

### Frontend 502 Bad Gateway

Check if backend is healthy:
```bash
docker compose ps
curl http://localhost:5000/api/health
```

### Out of Disk Space

Ollama models are large. To free space:

```bash
# Remove unused Docker data
docker system prune -a --volumes

# Remove specific models
docker exec hrisa-ollama ollama rm llama2
```

## Development vs Production

### Development

For development with hot-reload, use local setup:
```bash
npm run dev
```

### Production

For production deployment:

1. Update passwords in `docker-compose.yml`
2. Configure proper domain and SSL
3. Set environment-specific variables
4. Use Docker secrets for sensitive data

## Performance Tuning

### Ollama Memory

If running on limited memory, reduce Ollama's usage:

```yaml
ollama:
  environment:
    - OLLAMA_NUM_PARALLEL=1
    - OLLAMA_MAX_LOADED_MODELS=1
```

### PostgreSQL

Adjust PostgreSQL settings for your workload:

```yaml
postgres:
  command: postgres -c shared_buffers=256MB -c max_connections=200
```

## Scaling

To scale backend instances:

```bash
docker compose up -d --scale server=3
```

(Requires load balancer configuration)

## Monitoring

### Health Checks

All services have health checks configured:

```bash
docker inspect hrisa-server | grep -A 10 Health
```

### Resource Usage

```bash
docker stats
```

## Cleaning Up

### Stop and Remove Everything

```bash
# Stop services
docker compose down

# Remove volumes (WARNING: deletes all data)
docker compose down -v

# Remove images
docker rmi hrisa-bourse-client hrisa-bourse-server
```

### Keep Data, Remove Containers

```bash
docker compose down
```

## Next Steps

After starting the application:

1. Access frontend at http://localhost:3000
2. Test API at http://localhost:5000/api/health
3. Trigger data pipeline: `curl -X POST http://localhost:5000/api/pipeline/run`
4. Check pipeline status: `curl http://localhost:5000/api/pipeline/status`

## Support

For issues:
- Check logs: `docker compose logs -f`
- Restart services: `docker compose restart`
- Rebuild: `docker compose up -d --build`
