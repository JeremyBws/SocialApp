import AsyncStorage from '@react-native-async-storage/async-storage';
import { ILogger, IFirebaseRepository, IFavoritesService } from '../types/interfaces';

export class FavoritesService implements IFavoritesService {
  private logger: ILogger;
  private firebaseRepo: IFirebaseRepository;

  constructor(logger: ILogger, firebaseRepo: IFirebaseRepository) {
    this.logger = logger;
    this.firebaseRepo = firebaseRepo;
  }
  async addToFavorites(userId: string, restaurantId: string): Promise<void> {
    try {
      const favorites = await this.getFavorites(userId);
      if (!favorites.includes(restaurantId)) {
        favorites.push(restaurantId);
        await AsyncStorage.setItem(`favorites_${userId}`, JSON.stringify(favorites));
        this.logger.info(`Added to favorites - userId: ${userId}, restaurantId: ${restaurantId}`);
      }
    } catch (error) {
      this.logger.error('Error adding to favorites:', error);
      throw error;
    }
  }

  async refreshFavorites(userId: string): Promise<void> {
    try {
      const prefsFromFirebase = await this.firebaseRepo.getUserPreferences();
      if (prefsFromFirebase) {
        await this.mergePreferences(userId, prefsFromFirebase);
      }
    } catch (error) {
      this.logger.error('Error refreshing favorites:', error);
      throw error;
    }
  }

  async getFavorites(userId: string): Promise<string[]> {
    try {
      const favorites = await AsyncStorage.getItem(`favorites_${userId}`);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      this.logger.error('Error getting favorites:', error);
      return [];
    }
  }

  async removeFromFavorites(userId: string, restaurantId: string): Promise<void> {
    try {
      const favorites = await this.getFavorites(userId);
      const updatedFavorites = favorites.filter(id => id !== restaurantId);
      await AsyncStorage.setItem(`favorites_${userId}`, JSON.stringify(updatedFavorites));
      this.logger.info(`Removed from favorites - userId: ${userId}, restaurantId: ${restaurantId}`);
    } catch (error) {
      this.logger.error('Error removing from favorites:', error);
      throw error;
    }
  }

  async addToWishlist(userId: string, restaurantId: string): Promise<void> {
    try {
      const wishlist = await this.getWishlist(userId);
      if (!wishlist.includes(restaurantId)) {
        wishlist.push(restaurantId);
        await AsyncStorage.setItem(`wishlist_${userId}`, JSON.stringify(wishlist));
        this.logger.info(`Added to wishlist - userId: ${userId}, restaurantId: ${restaurantId}`);
      }
    } catch (error) {
      this.logger.error('Error adding to wishlist:', error);
      throw error;
    }
  }

  async refreshWishlist(userId: string): Promise<void> {
    const prefsFromFirebase = await this.firebaseRepo.getUserPreferences();
    if (prefsFromFirebase) {
      await this.mergePreferences(userId, prefsFromFirebase);
    }
  }

  async getWishlist(userId: string): Promise<string[]> {
    try {
      const wishlist = await AsyncStorage.getItem(`wishlist_${userId}`);
      return wishlist ? JSON.parse(wishlist) : [];
    } catch (error) {
      this.logger.error('Error getting wishlist:', error);
      return [];
    }
  }

  async removeFromWishlist(userId: string, restaurantId: string): Promise<void> {
    try {
      const wishlist = await this.getWishlist(userId);
      const updatedWishlist = wishlist.filter(id => id !== restaurantId);
      await AsyncStorage.setItem(`wishlist_${userId}`, JSON.stringify(updatedWishlist));
      this.logger.info(`Removed from wishlist - userId: ${userId}, restaurantId: ${restaurantId}`);
    } catch (error) {
      this.logger.error('Error removing from wishlist:', error);
      throw error;
    }
  }

  async syncWithFirebase(userId: string): Promise<void> {
    try {
      const favorites = await this.getFavorites(userId);
      const wishlist = await this.getWishlist(userId);
      
      await this.firebaseRepo.updateUserPreferences(userId, {
        favorites,
        wishlist
      });
      
      this.logger.info(`Synced preferences with Firebase - userId: ${userId}`);

      const firebasePrefs = await this.firebaseRepo.getUserPreferences();
      if (firebasePrefs) {
        await this.mergePreferences(userId, firebasePrefs);
      }
    } catch (error) {
      this.logger.error('Error syncing with Firebase:', error);
      throw error;
    }
  }

  private async mergePreferences(userId: string, firebasePrefs: { favorites: string[], wishlist: string[] }): Promise<void> {
    try {
      const localFavorites = await this.getFavorites(userId);
      const mergedFavorites = Array.from(new Set([...localFavorites, ...firebasePrefs.favorites]));
      await AsyncStorage.setItem(`favorites_${userId}`, JSON.stringify(mergedFavorites));

      const localWishlist = await this.getWishlist(userId);
      const mergedWishlist = Array.from(new Set([...localWishlist, ...firebasePrefs.wishlist]));
      await AsyncStorage.setItem(`wishlist_${userId}`, JSON.stringify(mergedWishlist));

      this.logger.info(`Merged preferences successfully - userId: ${userId}`);
    } catch (error) {
      this.logger.error('Error merging preferences:', error);
      throw error;
    }
  }
}