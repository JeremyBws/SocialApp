import React, { createContext, useContext, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Restaurant } from '../types/restaurant';  // Changé l'import
import { Timestamp, GeoPoint } from 'firebase/firestore';
import { useInjection } from 'inversify-react';
import { SYMBOLS } from '../types/symbols';
import { 
  ILogger, 
  IFavoritesService, 
  IFirebaseRepository, 
  IAuthService 
} from '../types/interfaces';
import { FavoritesService } from '../services/favoritesService';

import { FirebaseRepository } from '../repositories/firebaseRepository';
import { AuthService } from '../services/authService';
interface FavoritesContextType {
  favorites: Restaurant[];
  wishlist: Restaurant[];
  toggleFavorite: (restaurant: Restaurant) => Promise<void>;
  toggleWishlist: (restaurant: Restaurant) => Promise<void>;
  isRestaurantFavorite: (restaurantId: string) => boolean;
  isRestaurantWishlisted: (restaurantId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Helper pour convertir les données JSON en instances Firestore
const convertJSONToFirestore = (jsonData: any): Restaurant => {
  return {
    ...jsonData,
    lastUpdated: Timestamp.fromMillis(jsonData.lastUpdated.seconds * 1000),
    location: new GeoPoint(
      jsonData.location.latitude,
      jsonData.location.longitude
    )
  };
};

// Helper pour préparer les données pour AsyncStorage
const prepareForStorage = (restaurant: Restaurant) => {
  return {
    ...restaurant,
    lastUpdated: {
      seconds: restaurant.lastUpdated.seconds,
      nanoseconds: restaurant.lastUpdated.nanoseconds
    },
    location: {
      latitude: restaurant.location.latitude,
      longitude: restaurant.location.longitude
    }
  };
};


export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authService = useInjection<IAuthService>(SYMBOLS.AuthService);
  const favoritesService = useInjection<IFavoritesService>(SYMBOLS.FavoritesService);
  const logger = useInjection<ILogger>(SYMBOLS.Logger);
  const firebaseRepo = useInjection<IFirebaseRepository>(SYMBOLS.FirebaseRepository);
  
  const [favorites, setFavorites] = useState<Restaurant[]>([]);
  const [wishlist, setWishlist] = useState<Restaurant[]>([]);

  // Charger les données au démarrage
  React.useEffect(() => {
    const loadSavedData = async () => {
      try {
        const userId = 'current-user-id'; // À remplacer
        const [favoritesIds, wishlistIds] = await Promise.all([
          favoritesService.getFavorites(userId),
          favoritesService.getWishlist(userId)
        ]);

        // Charger les détails des restaurants depuis Firebase
        const loadedFavorites = (await Promise.all(
          favoritesIds.map(id => firebaseRepo.getRestaurant(id))
         )).filter((r): r is Restaurant => r !== null);
         const loadedWishlist = (await Promise.all(
          wishlistIds.map(id => firebaseRepo.getRestaurant(id))
         )).filter((r): r is Restaurant => r !== null);
       
         
        setFavorites(loadedFavorites.filter(Boolean));
        setWishlist(loadedWishlist.filter(Boolean));
      } catch (error) {
        logger.error('Error loading saved data:', error);
      }
    };

    loadSavedData();
  }, []);

  const saveWishlist = async (newWishlist: Restaurant[]) => {
    try {
      const preparedWishlist = newWishlist.map(prepareForStorage);
      await AsyncStorage.setItem('wishlist', JSON.stringify(preparedWishlist));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la wishlist:', error);
    }
  };

  const saveFavorites = async (newFavorites: Restaurant[]) => {
    try {
      const preparedFavorites = newFavorites.map(prepareForStorage);
      await AsyncStorage.setItem('favorites', JSON.stringify(preparedFavorites));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des favoris:', error);
    }
  };

  const toggleFavorite = async (restaurant: Restaurant) => {
    const userId = authService.getCurrentUserId();
 if (!userId) return;

 try {
   if (isRestaurantFavorite(restaurant.id)) {
     await favoritesService.removeFromFavorites(userId, restaurant.id);
     setFavorites(prev => prev.filter(r => r.id !== restaurant.id));
   } else {
     await favoritesService.addToFavorites(userId, restaurant.id);
     setFavorites(prev => [...prev, restaurant]); 
   }
 } catch (error) {
   logger.error('Error toggling favorite:', error);
 }
}

  const toggleWishlist = async (restaurant: Restaurant) => {
    try {
      const userId = 'current-user-id'; // À remplacer par la vraie gestion d'authentification
      if (isRestaurantWishlisted(restaurant.id)) {
        await favoritesService.removeFromWishlist(userId, restaurant.id);
        setWishlist(prev => prev.filter(r => r.id !== restaurant.id));
      } else {
        await favoritesService.addToWishlist(userId, restaurant.id);
        setWishlist(prev => [...prev, restaurant]);
      }
    } catch (error) {
      logger.error('Error toggling wishlist:', error);
    }
  };

  const isRestaurantFavorite = useCallback((restaurantId: string) => {
    return favorites.some(fav => fav.id === restaurantId);
  }, [favorites]);

  const isRestaurantWishlisted = useCallback((restaurantId: string) => {
    return wishlist.some(item => item.id === restaurantId);
  }, [wishlist]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        wishlist,
        toggleFavorite,
        toggleWishlist,
        isRestaurantFavorite,
        isRestaurantWishlisted,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites doit être utilisé à l\'intérieur d\'un FavoritesProvider');
  }
  return context;
};