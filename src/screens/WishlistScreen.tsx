import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Searchbar } from 'react-native-paper';
import { RestaurantsList } from '../components/RestaurantsList';
import { useFavorites } from '../contexts/FavoritesContext';
import { baseStyles } from '../styles/baseStyles';
import { searchStyles } from '../styles/searchstyles';
import { WishlistScreenProps } from '../types/navigation';
import { RefreshControl } from 'react-native';
import { SYMBOLS } from '../types/symbols';
import { ILogger, IFavoritesService, IAuthService } from '../types/interfaces';
import { useInjection } from 'inversify-react';
import { FavoritesService } from '../services/favoritesService';
import { AuthService } from '../services/authService';
export default function WishlistScreen({ navigation }: WishlistScreenProps) {
  const logger = useInjection<ILogger>(SYMBOLS.Logger);
const favoritesService = useInjection<IFavoritesService>(SYMBOLS.FavoritesService);
const authService = useInjection<IAuthService>(SYMBOLS.AuthService);
  const { wishlist } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const filteredWishlist = wishlist.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRestaurantPress = (restaurantId: string) => {
    setFlippedCardId(restaurantId);
  };

  const onRefresh = async () => {
    const userId = authService.getCurrentUserId();
    if (!userId) return;
    
    setRefreshing(true);
    try {
      await favoritesService.refreshWishlist(userId);
    } finally {
      setRefreshing(false);
    }
   };
  if (wishlist.length === 0) {
    return (
      <View style={[baseStyles.containerBase, baseStyles.centered]}>
        <Text 
          variant="headlineMedium" 
          style={[baseStyles.text, baseStyles.textCenter]}
        >
          Votre wishlist est vide
        </Text>
        <Text 
          variant="bodyLarge" 
          style={[baseStyles.text, baseStyles.textCenter, { marginTop: 8 }]}
        >
          Ajoutez des restaurants à votre wishlist en cliquant sur le marque-page
        </Text>
      </View>
    );
  }

  return (
    <View style={baseStyles.containerBase}>
      <Searchbar
        placeholder="Rechercher dans votre wishlist..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={searchStyles.searchBar}
        icon="magnify"
      />
      <RestaurantsList
        restaurants={filteredWishlist}
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