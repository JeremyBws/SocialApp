import { useState, useEffect } from 'react';
import { useInjection } from 'inversify-react';
import { SYMBOLS } from '../types/symbols';
import { IPointsService, IFavoritesService } from '../types/interfaces';

export const useUserProgress = (userId: string) => {
  const pointsService = useInjection<IPointsService>(SYMBOLS.PointsService);
  const favoritesService = useInjection<IFavoritesService>(SYMBOLS.FavoritesService);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

 useEffect(() => {
   loadUserData();
 }, [userId]);

 const loadUserData = async () => {
   try {
     const [currentPoints, userFavorites, userWishlist] = await Promise.all([
       pointsService.getCurrentPoints(userId),
       favoritesService.getFavorites(userId),
       favoritesService.getWishlist(userId)
     ]);
     
     setPoints(currentPoints);
     setLevel(Math.floor(currentPoints / 1000) + 1);
     setFavorites(userFavorites);
     setWishlist(userWishlist);
   } catch (error) {
     console.error('Error loading user data:', error);
   }
 };

 const addToFavorites = async (restaurantId: string) => {
   try {
     await favoritesService.addToFavorites(userId, restaurantId);
     await loadUserData();
   } catch (error) {
     console.error('Error adding to favorites:', error);
   }
 };

 const addToWishlist = async (restaurantId: string) => {
   try {
     await favoritesService.addToWishlist(userId, restaurantId);
     await loadUserData();
   } catch (error) {
     console.error('Error adding to wishlist:', error);
   }
 };

 return {
   points,
   level,
   favorites,
   wishlist,
   addToFavorites,
   addToWishlist,
   refreshUserData: loadUserData
 };
};