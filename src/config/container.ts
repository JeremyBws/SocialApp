import { Container } from 'inversify';
import { SYMBOLS } from '../types/symbols';
import { Logger } from '../utils/logger';
import { Config } from '../config/config';
import { FirebaseRepository } from '../repositories/firebaseRepository';
import { GooglePlacesRepository } from '../repositories/googlePlacesRepository';
import { PlacesService } from '../services/placesService';
import { AuthService } from '../services/authService';
import { LocationService } from '../services/locationService';
import { FavoritesService } from '../services/favoritesService';
import { PointsService } from '../services/pointsService';
import { SettingsService } from '../services/settingsService';
import { db } from '../config/firebase';

const container = new Container();

console.log('Creating container and binding services...');

// Création des instances
const logger = new Logger();
const config = new Config();

// Bind base services
container.bind(SYMBOLS.Logger).toConstantValue(logger);
container.bind(SYMBOLS.Config).toConstantValue(config);
container.bind(SYMBOLS.Firestore).toConstantValue(db);

// Create and bind repositories
const firebaseRepo = new FirebaseRepository(logger, db);
const googlePlacesRepo = new GooglePlacesRepository(logger, config);

container.bind(SYMBOLS.FirebaseRepository).toConstantValue(firebaseRepo);
container.bind(SYMBOLS.GooglePlacesRepository).toConstantValue(googlePlacesRepo);

// Create and bind services
const placesService = new PlacesService(logger, firebaseRepo, googlePlacesRepo);
const authService = new AuthService(logger, firebaseRepo);
const locationService = new LocationService(logger);
const favoritesService = new FavoritesService(logger, firebaseRepo);
const pointsService = new PointsService(logger, firebaseRepo);
const settingsService = new SettingsService(logger);

container.bind(SYMBOLS.PlacesService).toConstantValue(placesService);
container.bind(SYMBOLS.AuthService).toConstantValue(authService);
container.bind(SYMBOLS.LocationService).toConstantValue(locationService);
container.bind(SYMBOLS.FavoritesService).toConstantValue(favoritesService);
container.bind(SYMBOLS.PointsService).toConstantValue(pointsService);
container.bind(SYMBOLS.SettingsService).toConstantValue(settingsService);

// Verify all bindings
console.log('Verifying bindings...');
Object.values(SYMBOLS).forEach(symbol => {
  console.log(`Checking binding for ${String(symbol)}:`, container.isBound(symbol));
});

export { container };