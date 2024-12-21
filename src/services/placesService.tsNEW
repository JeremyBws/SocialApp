import { injectable, inject } from 'inversify';
import { SYMBOLS } from '../types/symbols';
import { ILogger } from '../types/interfaces';

// Alternative sans décorateurs
export class PlacesService {
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
    console.log("PlacesService constructor starting...");
    console.log("Logger received:", !!this.logger);
  }
}