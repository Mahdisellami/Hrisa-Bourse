import axios from 'axios';

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';

export async function checkOllamaConnection(): Promise<boolean> {
  try {
    const response = await axios.get(`${OLLAMA_BASE_URL}/api/tags`, {
      timeout: 5000
    });
    return response.status === 200;
  } catch (error) {
    console.error('Ollama connection check failed:', error);
    return false;
  }
}

export async function listModels() {
  try {
    const response = await axios.get(`${OLLAMA_BASE_URL}/api/tags`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch Ollama models');
  }
}

export async function generateCompletion(model: string, prompt: string, context?: string) {
  try {
    const fullPrompt = context ? `Context: ${context}\n\nQuestion: ${prompt}` : prompt;

    const response = await axios.post(`${OLLAMA_BASE_URL}/api/generate`, {
      model,
      prompt: fullPrompt,
      stream: false
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to generate completion from Ollama');
  }
}

export async function chatCompletion(model: string, messages: Array<{role: string, content: string}>) {
  try {
    const response = await axios.post(`${OLLAMA_BASE_URL}/api/chat`, {
      model,
      messages,
      stream: false
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to generate chat completion from Ollama');
  }
}
