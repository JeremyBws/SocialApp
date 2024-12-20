import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { RestaurantsList } from '../components/RestaurantsList';
import { useFavorites } from '../contexts/FavoritesContext';
import { baseStyles } from '../styles/baseStyles';
import { DrawerScreenProps } from '../types/navigation';
import { RefreshControl } from 'react-native';
import { SYMBOLS } from '../types/symbols';
import { ILogger, IFavoritesService, IAuthService } from '../types/interfaces';
import { useInjection } from 'inversify-react';
import { FavoritesService } from '../services/favoritesService';
import { AuthService } from '../services/authService';

type FavoritesScreenProps = DrawerScreenProps<'Favoris'>;

export default function FavoritesScreen({ navigation }: FavoritesScreenProps) {
  const favoritesService = useInjection<FavoritesService>(SYMBOLS.FavoritesService);
  const authService = useInjection<AuthService>(SYMBOLS.AuthService);
  
  const { favorites } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const logger = useInjection<ILogger>(SYMBOLS.Logger);

  // Vérifiez l'utilisateur actuel
  const userId = authService.getCurrentUserId();

  if (!userId) {
    logger.info('Utilisateur non connecté. Impossible de charger les favoris.');
    return (
      <View style={[baseStyles.containerBase, baseStyles.centered]}>
        <Text 
          variant="headlineMedium" 
          style={[baseStyles.text, baseStyles.textCenter]}
        >
          Connectez-vous pour voir vos favoris
        </Text>
      </View>
    );
  }

  const filteredFavorites = favorites.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRestaurantPress = (restaurantId: string) => {
    setFlippedCardId(restaurantId);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await favoritesService.refreshFavorites(userId);
    } catch (err) {
      logger.error('Erreur lors de l\'actualisation des favoris:', err);
    } finally {
      setRefreshing(false);
    }
  };

  if (favorites.length === 0) {
    return (
      <View style={[baseStyles.containerBase, baseStyles.centered]}>
        <Text 
          variant="headlineMedium" 
          style={[baseStyles.text, baseStyles.textCenter]}
        >
          Aucun restaurant favori
        </Text>
        <Text 
          variant="bodyLarge" 
          style={[baseStyles.text, baseStyles.textCenter, { marginTop: 8 }]}
        >
          Ajoutez des restaurants à vos favoris en cliquant sur le cœur
        </Text>
      </View>
    );
  }

  return (
    <View style={baseStyles.containerBase}>
      <RestaurantsList
        restaurants={filteredFavorites}
        onRestaurantPress={handleRestaurantPress}
        flippedCardId={flippedCardId}
        onFlipBack={() => setFlippedCardId(null)}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
}
