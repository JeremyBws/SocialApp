import axios from 'axios';
import { ILogger, IConfig, IGooglePlacesRepository } from '../types/interfaces';
import { GooglePlacesAPIResponse, GooglePlaceResult } from '../types/restaurant';

export class GooglePlacesRepository implements IGooglePlacesRepository {
  private baseUrl: string;
  private readonly logger: ILogger;
  private readonly config: IConfig;

  constructor(logger: ILogger, config: IConfig) {
    if (!logger) {
      throw new Error('Logger dependency is missing in GooglePlacesRepository');
    }

    this.logger = logger;
    this.config = config;

    if (!this.config) {
      throw new Error('Config dependency is missing in GooglePlacesRepository');
    }

    this.baseUrl = this.config.baseUrl;
  }

  private getCommonParams(): Record<string, string> {
    return {
      key: this.config.googlePlacesApiKey,
    };
  }

  async searchNearby(latitude: number, longitude: number, radius: number): Promise<GooglePlaceResult[]> {
    try {
      const response = await axios.get<GooglePlacesAPIResponse>(
        `${this.baseUrl}/nearbysearch/json`,
        {
          params: {
            ...this.getCommonParams(),
            location: `${latitude},${longitude}`,
            radius,
            type: 'restaurant',
          },
        }
      );

      if (response.data.status !== 'OK') {
        this.logger.error(`API Error: ${response.data.status}`);
        throw new Error(`Google Places API error: ${response.data.status}`);
      }

      return response.data.results;
    } catch (error) {
      return this.handleRepositoryError(error);
    }
  }

  async getPhoto(photoReference: string, maxWidth: number): Promise<string> {
    try {
      const response = await axios.get(`${this.baseUrl}/photo`, {
        params: {
          ...this.getCommonParams(),
          maxwidth: maxWidth,
          photo_reference: photoReference,
        },
        responseType: 'arraybuffer',
      });

      return `data:image/jpeg;base64,${Buffer.from(response.data, 'binary').toString('base64')}`;
    } catch (error) {
      return this.handleRepositoryError(error);
    }
  }

  async getDetails(placeId: string): Promise<GooglePlaceResult> {
    try {
      const response = await axios.get(`${this.baseUrl}/details/json`, {
        params: {
          ...this.getCommonParams(),
          place_id: placeId,
          fields: [
            'name',
            'rating',
            'formatted_phone_number',
            'formatted_address',
            'opening_hours',
            'price_level',
            'photos',
            'types',
            'vicinity',
          ].join(','),
        },
      });

      if (response.data.status !== 'OK') {
        this.logger.error(`Details API Error: ${response.data.status}`);
        throw new Error(`Google Places API error: ${response.data.status}`);
      }

      return response.data.result;
    } catch (error) {
      return this.handleRepositoryError(error);
    }
  }

  getPhotoUrl(photoReference: string): string {
    return `${this.baseUrl}/photo?maxwidth=600&maxheight=400&photo_reference=${photoReference}&key=${this.config.googlePlacesApiKey}`;
  }

  private handleRepositoryError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        this.logger.error('API Response Error:', error.response.data);
        throw new Error('Google Places API responded with an error');
      }
      if (error.request) {
        this.logger.error('Network Request Error:', error.message);
        throw new Error('Failed to communicate with Google Places API');
      }
      this.logger.error('Unexpected Axios Error:', error.message);
      throw new Error('Unexpected error in API communication');
    }
    this.logger.error('Unexpected Error:', error);
    throw new Error('Unexpected error in Google Places service');
  }
}