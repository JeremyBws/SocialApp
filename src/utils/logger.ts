import { injectable } from 'inversify';
import { ILogger } from '../types/interfaces';

@injectable()
export class Logger implements ILogger {
  info(message: string): void {
    console.log(message);
  }

  error(message: string, error?: any): void {
    console.error(message, error);
  }
}