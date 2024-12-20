import { ILogger, ILocationService } from '../types/interfaces';
import * as Location from 'expo-location';
import { GeoPoint } from 'firebase/firestore';

export class LocationService implements ILocationService {
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  async getCurrentLocation(): Promise<Location.LocationObject> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        this.logger.error('Location permission denied');
        throw new Error('Permission de localisation refusée');
      }

      return await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
    } catch (error) {
      this.logger.error('Error getting location:', error);
      throw error;
    }
  }

  calculateDistance(point1: GeoPoint, point2: { latitude: number; longitude: number }): number {
    const R = 6371; // Rayon de la Terre en km
    const lat1 = point1.latitude * Math.PI / 180;
    const lat2 = point2.latitude * Math.PI / 180;
    const deltaLat = (point2.latitude - point1.latitude) * Math.PI / 180;
    const deltaLon = (point2.longitude - point1.longitude) * Math.PI / 180;

    const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    return Math.round(R * c * 10) / 10; // Arrondi à 1 décimale
  }
}