// src/services/settingService.ts
import { injectable } from 'inversify';
import { ISettingService } from '../types/interfaces';

@injectable()
export class SettingService implements ISettingService {
  getSettings(): void {
    console.log('Getting settings...');
  }
}