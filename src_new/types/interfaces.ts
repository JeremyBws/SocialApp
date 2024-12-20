// src/types/interfaces.ts
import { GeoPoint, Timestamp } from 'firebase/firestore';
export const TYPES = {
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  FirebaseRepository: Symbol.for('FirebaseRepository'),
  GooglePlacesRepository: Symbol.for('GooglePlacesRepository'),
  PlacesService: Symbol.for('PlacesService')
};

export interface ILogger {
  info(message: string): void;
  error(message: string): void;
}

export interface IConfig {
  defaultScope: string;
}
export interface IFirebaseRepository {
  createBatch(): any;
  addToBatch(batch: any, id: string, data: any): Promise<void>;
  commitBatch(batch: any): Promise<void>;
  getUserPreferences(): Promise<any>;
  updateUserPreferences(userId: string, data: any): Promise<void>;
  init(): void;
}

export interface IGooglePlacesRepository {
  searchNearby(latitude: number, longitude: number, radius: number): Promise<GooglePlaceResult[]>;
  getDetails(placeId: string): Promise<GooglePlaceDetails>;
  getPhoto(photoReference: string, maxWidth: number): Promise<string>;
  getPhotoUrl(photoReference: string): string;
}

export interface IPlacesService {
  searchNearbyRestaurants(latitude: number, longitude: number, radius: number): Promise<Restaurant[]>;
  syncNearbyRestaurants(latitude: number, longitude: number, radius?: number): Promise<Restaurant[]>;
  getPlaceDetails(placeId: string): Promise<GooglePlaceDetails>;
  getPhoto(photoReference: string, maxWidth: number): Promise<string>;
  calculateDistance(point1: GeoPoint, point2: GeoPoint): number;
}

// Autres interfaces de service
export interface IAuthService {
  authenticate(): void;
}

export interface ILocationService {
  getCurrentLocation(): void;
}

export interface IPointService {
  getPoints(): void;
}

export interface IFavoriteService {
  getFavorites(): void;
}

export interface ISettingService {
  getSettings(): void;
}

// Types pour les données
export interface Restaurant {
  id: string;
  googlePlaceId: string;
  name: string;
  address: string;
  location: GeoPoint;
  rating: number;
  priceLevel?: PriceLevel;
  cuisine: string;
  photos: string[];
  phoneNumber?: string;
  openingHours?: {
    periods: any[];
    weekdayText: string[];
  };
  lastUpdated: Timestamp;
}

export interface GooglePlaceResult {
  place_id: string;
  name: string;
  vicinity?: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating?: number;
  price_level?: number;
  types?: string[];
  photos?: Array<{ photo_reference: string }>;
}

export interface GooglePlaceDetails extends GooglePlaceResult {
  formatted_phone_number?: string;
  opening_hours?: {
    periods: any[];
    weekday_text: string[];
  };
}

export enum PriceLevel {
  Free = 0,
  Inexpensive = 1,
  Moderate = 2,
  Expensive = 3,
  VeryExpensive = 4
}