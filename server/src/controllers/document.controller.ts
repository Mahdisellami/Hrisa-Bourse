import { Request, Response } from 'express';
import { parsePDF } from '../services/pdf.service.js';
import { generateCompletion } from '../services/ollama.service.js';

export async function uploadDocument(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const pdfData = await parsePDF(req.file.path);

    res.json({
      message: 'Document uploaded successfully',
      documentId: req.file.filename,
      pages: pdfData.pages,
      textLength: pdfData.text.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process document' });
  }
}

export async function analyzeDocument(req: Request, res: Response) {
  try {
    const { documentId } = req.params;
    const { query, model = 'llama2' } = req.body;

    const filePath = `uploads/${documentId}`;
    const pdfData = await parsePDF(filePath);

    const aiResponse = await generateCompletion(
      model,
      query,
      pdfData.text.substring(0, 4000)
    );

    res.json({
      documentId,
      query,
      response: aiResponse
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to analyze document' });
  }
}

export async function listDocuments(req: Request, res: Response) {
  res.json({ documents: [] });
}
