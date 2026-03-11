import pdf from 'pdf-parse';
import fs from 'fs/promises';

export interface PDFData {
  text: string;
  pages: number;
  info: any;
  metadata: any;
}

export async function parsePDF(filePath: string): Promise<PDFData> {
  try {
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdf(dataBuffer);

    return {
      text: data.text,
      pages: data.numpages,
      info: data.info,
      metadata: data.metadata
    };
  } catch (error) {
    throw new Error(`Failed to parse PDF: ${error}`);
  }
}

export async function extractTextFromPDF(filePath: string): Promise<string> {
  const pdfData = await parsePDF(filePath);
  return pdfData.text;
}

export async function analyzePDFWithAI(filePath: string, model: string, query: string) {
  const pdfText = await extractTextFromPDF(filePath);

  return {
    text: pdfText,
    pages: pdfText.split('\n\n').length,
    query
  };
}
