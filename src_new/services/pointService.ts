// src/services/pointService.ts
import { injectable } from 'inversify';
import { IPointService } from '../types/interfaces';

@injectable()
export class PointService implements IPointService {
  getPoints(): void {
    console.log('Getting points...');
  }
}