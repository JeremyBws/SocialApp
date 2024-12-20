import { injectable } from 'inversify';
import { ILogger } from '../types/interfaces';

@injectable() // Assurons-nous que le décorateur est présent
export class Logger implements ILogger {
  constructor() {
    console.log('Logger constructor called'); // Ajoutons un log ici
  }

  // Utilisation de unknown[] pour args (type plus sûr que any[])
  info(message: string, ...args: unknown[]): void {
    console.log('[INFO]', message, ...(args || []));
  }

  // Utilisation de Error | unknown pour error (type plus sûr que any)
  error(message: string, error?: Error | unknown): void {
    console.error('[ERROR]', message, error);
  }

  // Utilisation de unknown[] pour args
  debug(message: string, ...args: unknown[]): void {
    console.debug('[DEBUG]', message, ...args);
  }

  // Utilisation de unknown[] pour args
  warn(message: string, ...args: unknown[]): void {
    console.warn('[WARN]', message, ...args);
  }
}
