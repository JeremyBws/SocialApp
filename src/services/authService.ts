import { ILogger, IAuthService, IFirebaseRepository } from '../types/interfaces';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export class AuthService implements IAuthService {
  private logger: ILogger;
  private firebaseRepo: IFirebaseRepository;

  constructor(logger: ILogger, firebaseRepo: IFirebaseRepository) {
    this.logger = logger;
    this.firebaseRepo = firebaseRepo;
  }
  getCurrentUserId(): string | null {
    const auth = getAuth();
    return auth.currentUser?.uid ?? null;
  }

  async loginWithEmail(email: string, password: string): Promise<void> {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      this.logger.error('Error during login:', error);
      throw error;
    }
  }
}