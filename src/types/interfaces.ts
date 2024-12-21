// src/types/interfaces.ts
import { Firestore, WriteBatch, GeoPoint } from 'firebase/firestore';
import { Restaurant, GooglePlaceResult, GooglePlaceDetails } from './restaurant';
import { LocationObject } from 'expo-location';
export interface ILogger {
  info(message: string, ...args: any[]): void;
  error(message: string, error?: any): void;
  debug?(message: string, ...meta: any[]): void;
  warn?(message: string, ...meta: any[]): void;
}

export interface IConfig {
  googlePlacesApiKey: string;
  baseUrl: string;
  environment: string;
}

export interface IFirebaseRepository {
  getRestaurant(id: string): Promise<Restaurant | null>;
  updateUserPoints(userId: string, points: number): Promise<void>;
  updateUserProgress(userId: string, progress: UserProgress): Promise<void>;
  updateUserPreferences(userId: string, preferences: UserPreferences): Promise<void>;
  getUserPreferences(userId: string): Promise<any | null>;  // Modifié ici pour accepter userId
  createBatch(): any;
  addToBatch(batch: any, id: string, data: any): Promise<void>;
  commitBatch(batch: any): Promise<void>;
}

export interface IGooglePlacesRepository {
  searchNearby(latitude: number, longitude: number, radius: number): Promise<GooglePlaceResult[]>;
  getPhoto(photoReference: string, maxWidth: number): Promise<string>;
  getDetails(placeId: string): Promise<GooglePlaceResult>;
  getPhotoUrl(photoReference: string): string;
}

export interface IAuthService {
  loginWithEmail(email: string, password: string): Promise<void>;
  getCurrentUserId(): string | null;
}

export interface ILocationService {
  getCurrentLocation(): Promise<LocationObject>;
  calculateDistance(point1: any, point2: { latitude: number; longitude: number }): number;
}

export interface IPlacesService {
    searchNearbyRestaurants(latitude: number, longitude: number, radius: number): Promise<Restaurant[]>;
    syncNearbyRestaurants(latitude: number, longitude: number, radius?: number): Promise<Restaurant[]>;
    getPlaceDetails(placeId: string): Promise<GooglePlaceDetails>;
    getPhoto(photoReference: string, maxWidth: number): Promise<string>;
    calculateDistance(point1: GeoPoint, point2: GeoPoint): number;
  }

  export interface IFavoritesService {
    addToFavorites(userId: string, restaurantId: string): Promise<void>;
    getFavorites(userId: string): Promise<string[]>;
    removeFromFavorites(userId: string, restaurantId: string): Promise<void>;
    addToWishlist(userId: string, restaurantId: string): Promise<void>;
    getWishlist(userId: string): Promise<string[]>;
    removeFromWishlist(userId: string, restaurantId: string): Promise<void>;
    syncWithFirebase(userId: string): Promise<void>;
    refreshFavorites(userId: string): Promise<void>;
    refreshWishlist(userId: string): Promise<void>;
  }
  
  export interface IPointsService {
    addPoints(userId: string, points: number): Promise<void>;
    getCurrentPoints(userId: string): Promise<number>;
    checkLevelUp(userId: string, points: number): Promise<void>;
  }
  
  export interface ISettingsService {
    updateSettings(settings: any): Promise<void>;
  }

  export interface UserPreferences {
    favorites: string[];
    wishlist: string[];
  }
  
  export interface UserProgress {
    points: number;
    level: number;
  }