import { injectable, inject } from 'inversify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SYMBOLS } from '../types/symbols';
import { ILogger, IFirebaseRepository, IPointsService } from '../types/interfaces';

export enum ActionType {
  REVIEW_POSTED = 'REVIEW_POSTED',
  RESTAURANT_VISITED = 'RESTAURANT_VISITED',
  FOLLOWED_USER = 'FOLLOWED_USER',
  FAVORITE_ADDED = 'FAVORITE_ADDED',
  WISHLIST_ADDED = 'WISHLIST_ADDED',
  PHOTO_UPLOADED = 'PHOTO_UPLOADED'
}

const POINTS_CONFIG = {
  [ActionType.REVIEW_POSTED]: 50,
  [ActionType.RESTAURANT_VISITED]: 30,
  [ActionType.FOLLOWED_USER]: 10,
  [ActionType.FAVORITE_ADDED]: 5,
  [ActionType.WISHLIST_ADDED]: 5,
  [ActionType.PHOTO_UPLOADED]: 20
};

@injectable()
export class PointsService implements IPointsService {
  constructor(
    @inject(SYMBOLS.Logger) private logger: ILogger,
    @inject(SYMBOLS.FirebaseRepository) private firebaseRepo: IFirebaseRepository
  ) {}

  async addPoints(userId: string, points: number): Promise<void> {
    try {
      const currentPoints = await this.getCurrentPoints(userId);
      const newTotal = currentPoints + points;
      await this.firebaseRepo.updateUserPoints(userId, newTotal);
    } catch (error) {
      this.logger.error('Error adding points:', error);
      throw error;
    }
  }

  async getCurrentPoints(userId: string): Promise<number> {
    try {
      const points = await AsyncStorage.getItem(`user_points_${userId}`);
      return points ? parseInt(points) : 0;
    } catch (error) {
      console.error('Error getting points:', error);
      return 0;
    }
  }

  async checkLevelUp(userId: string, points: number): Promise<void> {
    const level = Math.floor(points / 1000) + 1;
    await AsyncStorage.setItem(`user_level_${userId}`, level.toString());
  }
}