// src_new/services/testService.ts
import { injectable, inject } from 'inversify';
import { ILogger } from '../types/interfaces';

@injectable()
export class TestService {
  constructor(
    @inject(Symbol.for('Logger')) private logger: ILogger
  ) {
    console.log("Test constructor");
    console.log("Logger test:", !!this.logger);
  }

  test(): void {
    console.log("Test method called");
  }
}