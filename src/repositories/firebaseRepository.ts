import { injectable, inject } from 'inversify';
import 'firebase/auth';
import { SYMBOLS } from '../types/symbols';
import { 
  ILogger, 
  IAuthService, 
  IFirebaseRepository, 
  UserPreferences, 
  UserProgress 
} from '../types/interfaces';
import {
  doc,
  writeBatch,
  Firestore,
  setDoc,
  getDoc,
  updateDoc
} from 'firebase/firestore';
import { Restaurant } from '../types/restaurant';

@injectable()
export class FirebaseRepository implements IFirebaseRepository {
  private readonly usersCollection = 'users';
  private readonly restaurantsCollection = 'restaurants';

  constructor(
    @inject(SYMBOLS.Logger) private logger: ILogger,
    @inject(SYMBOLS.Firestore) private db: Firestore,
    @inject(SYMBOLS.AuthService) private authService: IAuthService
  ) {}

  async getRestaurant(id: string): Promise<Restaurant | null> {
    try {
      const docRef = doc(this.db, this.restaurantsCollection, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) return null;
      
      return docSnap.data() as Restaurant;
    } catch (error) {
      this.logger.error('Error getting restaurant:', error);
      return null;
    }
  }
  async updateUserPoints(userId: string, points: number): Promise<void> {
    try {
      const userRef = doc(this.db, this.usersCollection, userId);
      await updateDoc(userRef, {
        points: points,
        updatedAt: new Date()
      });
      this.logger.info('Updated user points:', { userId, points });
    } catch (error) {
      this.logger.error('Error updating user points:', error);
      throw error;
    }
  }
  async updateUserProgress(userId: string, progress: UserProgress): Promise<void> {
    try {
      const userRef = doc(this.db, this.usersCollection, userId);
      await updateDoc(userRef, {
        points: progress.points,
        level: progress.level,
        updatedAt: new Date()
      });
    } catch (error) {
      this.logger.error('Error updating user progress:', error);
      throw error;
    }
  }
  async updateUserPreferences(userId: string, preferences: UserPreferences): Promise<void> {
    try {
      const userRef = doc(this.db, this.usersCollection, userId);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // Créer le document utilisateur s'il n'existe pas
        await setDoc(userRef, {
          ...preferences,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        this.logger.info('Created new user preferences:', { userId });
      } else {
        // Mettre à jour les préférences existantes
        await updateDoc(userRef, {
          ...preferences,
          updatedAt: new Date()
        });
        this.logger.info('Updated user preferences:', { userId });
      }
    } catch (error) {
      this.logger.error('Error updating user preferences:', error);
      throw error;
    }
  }

   async getUserPreferences(): Promise<any | null> {
    try {
      const userId = this.authService.getCurrentUserId(); // Utilisation de IAuthService
      if (!userId) {
        this.logger.info('No user is currently logged in');
        return null;
      }

      const userRef = doc(this.db, this.usersCollection, userId);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        return null;
      }

      return userDoc.data();
    } catch (error) {
      this.logger.error('Error getting user preferences:', error);
      throw error;
    }
  }

  createBatch() {
    return writeBatch(this.db);
  }

  async addToBatch(batch: any, id: string, data: any) {
    const docRef = doc(this.db, this.restaurantsCollection, id);
    batch.set(docRef, data, { merge: true });
  }

  async commitBatch(batch: any) {
    return batch.commit();
  }
}