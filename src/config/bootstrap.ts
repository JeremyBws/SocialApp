import { container } from './container';
import { ILogger, IGooglePlacesRepository, IFirebaseRepository, IPlacesService } from '../types/interfaces';
import { SYMBOLS } from '../types/symbols';

export async function bootServices(): Promise<void> {
  try {
    console.log('Vérification des bindings du container...');
    console.log('Logger binding exists:', container.isBound(SYMBOLS.Logger));

    if (!container.isBound(SYMBOLS.Logger)) {
      throw new Error('Logger not found in the container.');
    }

    const logger = container.get<ILogger>(SYMBOLS.Logger);

    if (!logger || typeof logger.info !== 'function') {
      throw new Error('Logger instance is invalid or does not have an "info" method.');
    }

    logger.info('Starting application initialization...');

    await initializeRepositories(logger);
    await initializeAppServices(logger);

    logger.info('Application initialized successfully.');
  } catch (error) {
    console.error('Bootstrap error:', error);
    throw error;
  }
}

async function initializeRepositories(logger: ILogger): Promise<void> {
  try {
    logger.info('Initializing repositories...');
    
    // Vérification explicite des repositories
    if (!container.isBound(SYMBOLS.GooglePlacesRepository)) {
      throw new Error('GooglePlacesRepository not bound in container');
    }
    const googlePlacesRepo = container.get<IGooglePlacesRepository>(SYMBOLS.GooglePlacesRepository);
    
    if (!container.isBound(SYMBOLS.FirebaseRepository)) {
      throw new Error('FirebaseRepository not bound in container');
    }
    const firebaseRepo = container.get<IFirebaseRepository>(SYMBOLS.FirebaseRepository);

    // Vérifier que les repositories sont correctement instanciés
    if (!googlePlacesRepo || !firebaseRepo) {
      throw new Error('Failed to initialize repositories');
    }
    
    logger.info('Repositories initialized successfully');
  } catch (error) {
    logger.error('Error initializing repositories:', error);
    throw error;
  }
}

async function initializeAppServices(logger: ILogger): Promise<void> {
  try {
    logger.info('Initializing app services...');
    
    // Vérification explicite des services
    if (!container.isBound(SYMBOLS.PlacesService)) {
      throw new Error('PlacesService not bound in container');
    }
    const placesService = container.get<IPlacesService>(SYMBOLS.PlacesService);

    if (!placesService) {
      throw new Error('Failed to initialize PlacesService');
    }
    
    logger.info('App services initialized successfully');
  } catch (error) {
    logger.error('Error initializing app services:', error);
    throw error;
  }
}