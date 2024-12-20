import { injectable, inject } from 'inversify';
import { SYMBOLS } from '../types/symbols';
import { ILogger } from '../types/interfaces';

@injectable()
export class PlacesService {
  private logger: ILogger;

  constructor(
    @inject(SYMBOLS.Logger) logger: ILogger
  ) {
    console.log("PlacesService constructor starting...");
    
    // Test direct du logger injecté
    console.log("Direct logger test:", logger);
    console.log("Logger methods:", Object.getOwnPropertyNames(logger));

    this.logger = logger;
    console.log("Logger received:", !!this.logger);
  }
}