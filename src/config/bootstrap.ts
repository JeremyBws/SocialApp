import { container } from './container';
import { ILogger, IGooglePlacesRepository, IFirebaseRepository, IConfig } from '../types/interfaces';
import { SYMBOLS } from '../types/symbols';

export async function bootServices(): Promise<void> {
  try {
    console.log('Vérification des bindings du container...');
    
    // Vérifier le logger en premier
    if (!container.isBound(SYMBOLS.Logger)) {
      throw new Error('Logger not found in the container.');
    }

    const logger = container.get<ILogger>(SYMBOLS.Logger);
    if (!logger || typeof logger.info !== 'function') {
      throw new Error('Logger instance is invalid or does not have an "info" method.');
    }

    logger.info('Starting application initialization...');

    // Vérifier la configuration
    logger.info('Checking environment configuration...');
    const config = container.get<IConfig>(SYMBOLS.Config);
    if (!config.googlePlacesApiKey || !config.baseUrl) {
      throw new Error('Required environment variables are missing');
    }
    logger.info('Environment configuration verified successfully');

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
    
    // Vérifier le repository Firebase
    if (!container.isBound(SYMBOLS.FirebaseRepository)) {
      throw new Error('FirebaseRepository not bound in container');
    }
    const firebaseRepo = container.get<IFirebaseRepository>(SYMBOLS.FirebaseRepository);
    logger.info('Firebase repository initialized');

    // Vérifier le repository Google Places
    if (!container.isBound(SYMBOLS.GooglePlacesRepository)) {
      throw new Error('GooglePlacesRepository not bound in container');
    }
    const googlePlacesRepo = container.get<IGooglePlacesRepository>(SYMBOLS.GooglePlacesRepository);
    logger.info('Google Places repository initialized');

    // Vérifier que les repositories sont correctement instanciés
    if (!googlePlacesRepo || !firebaseRepo) {
      throw new Error('Failed to initialize repositories');
    }
    
    logger.info('All repositories initialized successfully');
  } catch (error) {
    logger.error('Error initializing repositories:', error);
    throw error;
  }
}

async function initializeAppServices(logger: ILogger): Promise<void> {
  try {
    logger.info('Initializing app services...');
    
    // Vérifier tous les services essentiels
    const requiredServices = [
      { symbol: SYMBOLS.PlacesService, name: 'PlacesService' },
      { symbol: SYMBOLS.AuthService, name: 'AuthService' },
      { symbol: SYMBOLS.LocationService, name: 'LocationService' },
      { symbol: SYMBOLS.FavoritesService, name: 'FavoritesService' }
    ];

    for (const service of requiredServices) {
      if (!container.isBound(service.symbol)) {
        throw new Error(`${service.name} not bound in container`);
      }
      const serviceInstance = container.get(service.symbol);
      if (!serviceInstance) {
        throw new Error(`Failed to initialize ${service.name}`);
      }
      logger.info(`${service.name} initialized successfully`);
    }
    
    logger.info('All app services initialized successfully');
  } catch (error) {
    logger.error('Error initializing app services:', error);
    throw error;
  }
}