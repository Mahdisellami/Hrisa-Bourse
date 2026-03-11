import { Request, Response } from 'express';
import { dataPipeline } from '../services/pipeline.service.js';

export async function runPipeline(req: Request, res: Response) {
  try {
    const status = dataPipeline.getStatus();

    if (status.isRunning) {
      return res.status(409).json({
        success: false,
        error: 'Pipeline is already running'
      });
    }

    // Run pipeline in background
    dataPipeline.runFullPipeline().catch(error => {
      console.error('Pipeline error:', error);
    });

    res.json({
      success: true,
      message: 'Pipeline started successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to start pipeline'
    });
  }
}

export async function getPipelineStatus(req: Request, res: Response) {
  try {
    const status = dataPipeline.getStatus();

    res.json({
      success: true,
      data: status
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get pipeline status'
    });
  }
}
