import { IConfig } from '../types/interfaces';
import Constants from 'expo-constants';

export class Config implements IConfig {
  public readonly googlePlacesApiKey: string;
  public readonly baseUrl: string;
  public readonly environment: string;

  constructor() {
    this.baseUrl = Constants.expoConfig?.extra?.API_BASE_URL;
    this.googlePlacesApiKey = Constants.expoConfig?.extra?.GOOGLE_PLACES_API_KEY;
    
    if (!this.googlePlacesApiKey) {
      throw new Error('GOOGLE_PLACES_API_KEY is not configured in environment variables');
    }

    this.environment = process.env.NODE_ENV || 'development';
  }
}