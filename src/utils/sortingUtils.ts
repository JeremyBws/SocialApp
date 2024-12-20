import { Restaurant } from '../types/restaurant';
import * as Location from 'expo-location';

export const calculateDistance = (
  point1: { latitude: number; longitude: number },
  point2: { latitude: number; longitude: number }
): number => {
  const R = 6371;
  const dLat = (point2.latitude - point1.latitude) * Math.PI / 180;
  const dLon = (point2.longitude - point1.longitude) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.latitude * Math.PI / 180) * Math.cos(point2.latitude * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const sortByDistance = (
  restaurants: Restaurant[], 
  userLocation: Location.LocationObject
): Restaurant[] => {
  return [...restaurants].sort((a, b) => {
    const distanceA = calculateDistance(
      { latitude: a.location.latitude, longitude: a.location.longitude },
      { latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude }
    );
    const distanceB = calculateDistance(
      { latitude: b.location.latitude, longitude: b.location.longitude },
      { latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude }
    );
    return distanceA - distanceB;
  });
};