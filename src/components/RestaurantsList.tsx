import React from 'react';
import {
  View,
   NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
  TouchableOpacity,
  Text,
} from 'react-native';
import { FlippableRestaurantCard } from './FlippableRestaurantCard';
import { Restaurant } from '../types/restaurant';
import { searchStyles } from '../styles/searchstyles';
import {restaurantListStyles} from '../styles/restaurantListStyles' 
import { useFavorites } from '../contexts/FavoritesContext';
import { RefreshControlProps } from 'react-native';

interface RestaurantsListProps {
  restaurants: Restaurant[];
  onRestaurantPress: (id: string) => void;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  flippedCardId: string | null;
  onFlipBack: () => void;
  refreshControl?: React.ReactElement<RefreshControlProps>;
  onExtendSearch?: () => void;
  isLoading?: boolean;
}

export const RestaurantsList = ({

  restaurants,
  onRestaurantPress,
  onScroll,
  flippedCardId,
  onFlipBack,
  refreshControl,
  onExtendSearch,
  isLoading = false
}: RestaurantsListProps) => {
  const {
    toggleFavorite,
    toggleWishlist,
    isRestaurantFavorite,
    isRestaurantWishlisted,
  } = useFavorites();

  const renderFooter = () => {
    if (restaurants.length < 25 && onExtendSearch && !isLoading) {
      return (
        <TouchableOpacity
          onPress={onExtendSearch}
          style={restaurantListStyles.extendButton}
        >
          <Text style={restaurantListStyles.extendButtonText}>
            Élargir la zone de recherche
          </Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const renderItem = ({ item }: { item: Restaurant }) => (
    <View style={restaurantListStyles.cardContainer}>
      <FlippableRestaurantCard
        restaurant={item}
        onPress={onRestaurantPress}
        isFavorite={isRestaurantFavorite(item.id)}
        isWishlisted={isRestaurantWishlisted(item.id)}
        onToggleFavorite={toggleFavorite}
        onToggleWishlist={toggleWishlist}
        isFlipped={item.id === flippedCardId}
        onBack={onFlipBack}
      />
    </View>
  );

  return (
    <Animated.FlatList
      data={restaurants}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[searchStyles.listContainer, restaurantListStyles.listContainer]}
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      scrollEventThrottle={16}
      ListFooterComponent={renderFooter}
      refreshControl={refreshControl}
      ItemSeparatorComponent={() => <View style={restaurantListStyles.separator} />}
    />
  );
};

