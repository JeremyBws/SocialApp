import { injectable, inject } from 'inversify';
import { IConfig } from '../types/interfaces';
import Constants from 'expo-constants';

@injectable()
export class Config implements IConfig {
  public readonly googlePlacesApiKey: string;
  public readonly baseUrl: string;
  public readonly environment: string;

  constructor() {
    // URL de base de l'API Google Places
    this.baseUrl = 'https://maps.googleapis.com/maps/api/place';
    
    // Clé API depuis les variables d'environnement
    this.googlePlacesApiKey = Constants.expoConfig?.extra?.GOOGLE_PLACES_API_KEY;
    
    if (!this.googlePlacesApiKey) {
      throw new Error('GOOGLE_PLACES_API_KEY is not configured in environment variables');
    }

    this.environment = process.env.NODE_ENV || 'development';
  }
}