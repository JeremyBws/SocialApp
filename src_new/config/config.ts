// src/config/config.ts
import { injectable } from 'inversify';
import { IConfig } from '../types/interfaces';

@injectable()
export class Config implements IConfig {
  defaultScope: string = "singleton";
  // Vous pouvez ajouter d'autres configurations ici
}