import { useState, useEffect } from 'react';
import { GeoPoint } from 'firebase/firestore';
import { useInjection } from 'inversify-react';
import { SYMBOLS } from '../types/symbols';
import { ILogger, ILocationService } from '../types/interfaces';

export const useDistance = () => {
  const logger = useInjection<ILogger>(SYMBOLS.Logger);
  const locationService = useInjection<ILocationService>(SYMBOLS.LocationService);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    const initLocation = async () => {
      try {
        const location = await locationService.getCurrentLocation();
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        logger.error('Failed to initialize location:', error);
      }
    };

    initLocation();
  }, []);

  const calculateDistance = (restaurantLocation: GeoPoint): number => {
    if (!userLocation) return 0;

    return locationService.calculateDistance(restaurantLocation, userLocation);
  };

  return { calculateDistance, userLocation };
};