import { ILogger } from '../types/interfaces';

export class Logger implements ILogger {
  constructor() {
    console.log('Logger constructor called');
  }

  info(message: string, ...args: unknown[]): void {
    console.log('[INFO]', message, ...(args || []));
  }

  error(message: string, error?: Error | unknown): void {
    console.error('[ERROR]', message, error);
  }

  debug(message: string, ...args: unknown[]): void {
    console.debug('[DEBUG]', message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    console.warn('[WARN]', message, ...args);
  }
}