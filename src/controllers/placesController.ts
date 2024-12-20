import { ILogger, IPlacesService } from '../types/interfaces';
import { Request, Response } from 'express';

export class PlacesController {
  private placesService: IPlacesService;
  private logger: ILogger;

  constructor(
    placesService: IPlacesService,
    logger: ILogger
  ) {
    this.placesService = placesService;
    this.logger = logger;
  }

  async searchNearby(req: Request, res: Response) {
    this.logger.info('Received search nearby request', req.query);
    try {
      // ... implémentation
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur inconnue est survenue';
      this.logger.error('Controller error in searchNearby', error);
      res.status(500).json({ error: errorMessage });
    }
  }
}