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

// Base services
const logger = new Logger();
const config = new Config();

// Base services
container.bind(SYMBOLS.Logger).toConstantValue(logger);
container.bind(SYMBOLS.Config).toConstantValue(config);
container.bind(SYMBOLS.Firestore).toConstantValue(db);

// Create repositories
const firebaseRepo = new FirebaseRepository(logger, db);
const googlePlacesRepo = new GooglePlacesRepository(logger, config);

// Binding repositories
container.bind(SYMBOLS.FirebaseRepository).toConstantValue(firebaseRepo);
container.bind(SYMBOLS.GooglePlacesRepository).toConstantValue(googlePlacesRepo); // Correction ici

// Create services with the correct dependencies
const authService = new AuthService(logger, firebaseRepo);
const placesService = new PlacesService(logger, firebaseRepo, googlePlacesRepo);
const locationService = new LocationService(logger);
const favoritesService = new FavoritesService(logger, firebaseRepo);
const pointsService = new PointsService(logger, firebaseRepo);
const settingsService = new SettingsService(logger);

// Bind services
container.bind(SYMBOLS.AuthService).toConstantValue(authService);
container.bind(SYMBOLS.PlacesService).toConstantValue(placesService);
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