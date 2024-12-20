import { Container } from 'inversify';
import { SYMBOLS } from '../types/symbols';
import { Logger } from '../utils/logger';
import { PlacesService } from '../services/placesService';
import { ILogger } from '../types/interfaces';

const container = new Container({ defaultScope: "Singleton" });

console.log('Creating container and binding services...');

// Base services
container.bind<ILogger>(SYMBOLS.Logger).to(Logger).inSingletonScope();
container.bind(SYMBOLS.PlacesService).to(PlacesService).inSingletonScope();

console.log('Verifying bindings...');
Object.values(SYMBOLS).forEach(symbol => {
  console.log(`Checking binding for ${String(symbol)}:`, container.isBound(symbol));
});

// Test supplémentaire ici
console.log('Testing logger retrieval...');
try {
  const testLogger = container.get<ILogger>(SYMBOLS.Logger);
  console.log('Direct logger test from container:', {
    exists: !!testLogger,
    methods: Object.getOwnPropertyNames(testLogger)
  });
} catch (e) {
  console.error('Logger retrieval failed:', e);
}

export { container };