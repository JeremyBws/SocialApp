import { injectable, inject } from 'inversify';
import { TYPES } from '../types/interfaces';
import { FirebaseRepository } from '../repositories/firebaseRepository';
import { ILogger } from '../types/interfaces';
import { PointsService } from './pointsService';


@injectable()
export class UserProgressService {  
  constructor(
    @inject(TYPES.Logger) private logger: ILogger,
    @inject(TYPES.PointsService) private pointsService: PointsService,
    @inject(TYPES.FirebaseRepository) private firebaseRepo: FirebaseRepository
  ) {}
 async getCurrentLevel(userId: string): Promise<number> {
   try {
     const points = await this.pointsService.getCurrentPoints(userId);
     return Math.floor(points / 1000) + 1;
   } catch (error) {
     this.logger.error('Error getting current level:', error);
     throw error;
   }
 }



  async syncProgress(userId: string): Promise<void> {
    try {
      const [points, level] = await Promise.all([
        this.pointsService.getCurrentPoints(userId),
        this.getCurrentLevel(userId)
      ]);

      await this.firebaseRepo.updateUserProgress(userId, { points, level });
      this.logger.info('Progress synced', { userId, points, level });
    } catch (error) {
      this.logger.error('Error syncing progress:', error);
      throw error;
    }
  }

  // ... autres méthodes
}
