import { ILogger, IFirebaseRepository, IPointsService } from '../types/interfaces';

export class UserProgressService {  
  private logger: ILogger;
  private pointsService: IPointsService;
  private firebaseRepo: IFirebaseRepository;

  constructor(
    logger: ILogger,
    pointsService: IPointsService,
    firebaseRepo: IFirebaseRepository
  ) {
    this.logger = logger;
    this.pointsService = pointsService;
    this.firebaseRepo = firebaseRepo;
  }
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
