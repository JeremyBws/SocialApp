// src/services/favoriteService.ts
import { injectable } from 'inversify';
import { IFavoriteService } from '../types/interfaces';

@injectable()
export class FavoriteService implements IFavoriteService {
  getFavorites(): void {
    console.log('Getting favorites...');
  }
}