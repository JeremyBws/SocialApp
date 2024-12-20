// src_new/services/logger.ts
import { injectable } from 'inversify';
import { ILogger } from '../types/interfaces';

@injectable()  // Assurons-nous que cette ligne est présente
export class Logger implements ILogger {
  info(message: string): void {
    console.log(message);
  }

  error(message: string): void {
    console.error(message);
  }
}