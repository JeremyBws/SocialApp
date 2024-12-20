import { injectable, inject } from 'inversify';
import { SYMBOLS } from '../types/symbols';
import { ILogger, IPlacesService } from '../types/interfaces';
import { Request, Response } from 'express';

@injectable()
export class PlacesController {
  constructor(
    @inject(SYMBOLS.PlacesService) private placesService: IPlacesService,
    @inject(SYMBOLS.Logger) private logger: ILogger
  ) {}

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