// src_new/repositories/googlePlacesRepository.ts
import { injectable } from 'inversify';
import { IGooglePlacesRepository, GooglePlaceResult, GooglePlaceDetails } from '../types/interfaces';

@injectable()
export class GooglePlacesRepository implements IGooglePlacesRepository {
  async searchNearby(latitude: number, longitude: number, radius: number): Promise<GooglePlaceResult[]> {
    console.log('Searching nearby:', { latitude, longitude, radius });
    // Retourne des données de test
    return [{
      place_id: 'test-place',
      name: 'Test Restaurant',
      geometry: {
        location: {
          lat: latitude,
          lng: longitude
        }
      },
      rating: 4.5,
      types: ['restaurant']
    }];
  }

  async getDetails(placeId: string): Promise<GooglePlaceDetails> {
    console.log('Getting details for:', placeId);
    return {
      place_id: placeId,
      name: 'Test Restaurant',
      geometry: {
        location: {
          lat: 48.8566,
          lng: 2.3522
        }
      }
    };
  }

  async getPhoto(photoReference: string, maxWidth: number): Promise<string> {
    return 'test-photo-url';
  }

  getPhotoUrl(photoReference: string): string {
    return 'test-photo-url';
  }
}