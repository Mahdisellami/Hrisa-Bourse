import { Request, Response } from 'express';
import { listModels, generateCompletion, chatCompletion } from '../services/ollama.service.js';

export async function getModels(req: Request, res: Response) {
  try {
    const models = await listModels();
    res.json(models);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch models' });
  }
}

export async function generate(req: Request, res: Response) {
  try {
    const { model, prompt, context } = req.body;

    if (!model || !prompt) {
      return res.status(400).json({ error: 'Model and prompt are required' });
    }

    const response = await generateCompletion(model, prompt, context);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate completion' });
  }
}

export async function chat(req: Request, res: Response) {
  try {
    const { model, messages } = req.body;

    if (!model || !messages) {
      return res.status(400).json({ error: 'Model and messages are required' });
    }

    const response = await chatCompletion(model, messages);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate chat completion' });
  }
}
