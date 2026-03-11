#!/bin/bash

# Script to initialize Ollama with required models

echo "Waiting for Ollama to be ready..."
sleep 10

echo "Pulling Mistral model (recommended for financial analysis)..."
docker exec hrisa-ollama ollama pull mistral

echo "Pulling Llama2 model..."
docker exec hrisa-ollama ollama pull llama2

echo "Available models:"
docker exec hrisa-ollama ollama list

echo "Ollama initialization complete!"
