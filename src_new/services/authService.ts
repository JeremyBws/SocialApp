// src/services/authService.ts
import { injectable } from 'inversify';
import { IAuthService } from '../types/interfaces';

@injectable()
export class AuthService implements IAuthService {
  authenticate(): void {
    console.log('Authenticating...');
  }
}
