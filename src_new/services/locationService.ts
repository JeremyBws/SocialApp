// src/services/locationService.ts
import { injectable } from 'inversify';
import { ILocationService } from '../types/interfaces';

@injectable()
export class LocationService implements ILocationService {
  getCurrentLocation(): void {
    console.log('Getting location...');
  }
}