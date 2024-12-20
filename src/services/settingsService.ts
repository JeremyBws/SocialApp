import { injectable, inject } from 'inversify';
import { SYMBOLS } from '../types/symbols';
import { ILogger, ISettingsService } from '../types/interfaces';

@injectable()
export class SettingsService implements ISettingsService {
  constructor(
    @inject(SYMBOLS.Logger) private logger: ILogger
  ) {}

  async updateSettings(settings: any): Promise<void> {
    try {
      this.logger.info(`Updating settings: ${JSON.stringify(settings)}`);
      // Implémentez ici la logique de mise à jour des paramètres
    } catch (error) {
      this.logger.error('Error updating settings:', error);
      throw error;
    }
  }
}