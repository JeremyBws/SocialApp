import { injectable, inject } from 'inversify';
import { SYMBOLS } from '../types/symbols';
import { ILogger, IAuthService, IFirebaseRepository } from '../types/interfaces';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(SYMBOLS.Logger) private logger: ILogger,
    @inject(SYMBOLS.FirebaseRepository) private firebaseRepo: IFirebaseRepository
  ) {}

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