import { ILogger, ISettingsService } from '../types/interfaces';

export class SettingsService implements ISettingsService {
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }
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