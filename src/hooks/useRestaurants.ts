import { useEffect, useState } from 'react';
import { useInjection } from 'inversify-react';
import { 
  ILogger, 
  IPlacesService, 
  ILocationService 
} from '../types/interfaces';
import { SYMBOLS } from '../types/symbols';
import { Restaurant } from '../types/restaurant';

export const useRestaurants = (autoLoad = true) => {
  const placesService = useInjection<IPlacesService>(SYMBOLS.PlacesService);
  const locationService = useInjection<ILocationService>(SYMBOLS.LocationService);
  const logger = useInjection<ILogger>(SYMBOLS.Logger);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    if (logger) {
      console.log('Logger instance in useRestaurants:', logger);
      if (typeof logger.info !== 'function') {
        console.error('Logger is not properly initialized or method not found:', logger);
        throw new Error('Logger is not properly initialized.');
      }
    }
  }, [logger]); // Vérification après initialisation du logger

  const getCurrentLocation = async () => {
    if (!locationService) {
      console.error('Location service is not initialized');
      throw new Error('Location service is not initialized');
    }

    try {
      const location = await locationService.getCurrentLocation();
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      return location;
    } catch (err) {
      logger?.error('Error getting location:', err); // Ne pas appeler logger.info si il est undefined
      setError('Failed to fetch location');
      throw err;
    }
  };

  const syncRestaurants = async (customLatitude?: number, customLongitude?: number, radius: number = 500) => {
    if (!logger || !placesService) {
      console.error('Logger or PlacesService not initialized');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let latitude: number;
      let longitude: number;

      if (customLatitude && customLongitude) {
        latitude = customLatitude;
        longitude = customLongitude;
      } else if (currentLocation) {
        latitude = currentLocation.latitude;
        longitude = currentLocation.longitude;
      } else {
        const location = await getCurrentLocation();
        latitude = location.coords.latitude;
        longitude = location.coords.longitude;
      }

      if (typeof logger.info === 'function') {
        logger.info('Syncing restaurants with coordinates:', { latitude, longitude, radius });
      } else {
        console.error('Logger method info is not available');
      }

      const newRestaurants = await placesService.syncNearbyRestaurants(latitude, longitude, radius);
      setRestaurants(newRestaurants);
    } catch (err) {
      logger?.error('Error in syncRestaurants:', err);
      setError(err instanceof Error ? err.message : 'Erreur de synchronisation');
    } finally {
      setIsLoading(false);
    }
  };

  const extendSearchRadius = async () => {
    if (!currentLocation || !placesService) {
      setError('Coordonnées manquantes ou services non initialisés');
      return;
    }

    try {
      setIsLoading(true);
      const newRestaurants = await placesService.syncNearbyRestaurants(
        currentLocation.latitude,
        currentLocation.longitude,
        1500
      );

      setRestaurants(prevRestaurants => {
        const existingIds = new Set(prevRestaurants.map(r => r.id));
        const uniqueNewRestaurants = newRestaurants.filter(r => !existingIds.has(r.id));
        return [...prevRestaurants, ...uniqueNewRestaurants];
      });
    } catch (err) {
      logger?.error('Error extending search radius:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'extension');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshRestaurants = async () => {
    if (!logger) {
      console.error('Logger not initialized');
      return;
    }

    try {
      const location = await getCurrentLocation();
      await syncRestaurants(location.coords.latitude, location.coords.longitude);
    } catch (err) {
      logger?.error('Error refreshing restaurants:', err);
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
    }
  };

  useEffect(() => {
    if (autoLoad) {
      refreshRestaurants();
    }
  }, [autoLoad]);

  return {
    restaurants,
    isLoading,
    error,
    refreshRestaurants,
    syncRestaurants,
    extendSearchRadius,
  };
};
