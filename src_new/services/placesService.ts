// src_new/services/placesService.ts
import { injectable, inject } from 'inversify';
import { ILogger } from '../types/interfaces';
import { SYMBOLS } from '../types/symbols';

@injectable()
export class PlacesService {
  constructor(
    @inject(SYMBOLS.Logger) private logger: ILogger
  ) {
    console.log("PlacesService constructor starting...");
    console.log("Logger received:", !!this.logger);
  }

  async testMethod(): Promise<void> {
    this.logger.info('PlacesService test method called');
  }
}