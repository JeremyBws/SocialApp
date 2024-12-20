import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { restaurantStyles } from '../styles/restaurantStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Restaurant, RestaurantWithDistance } from '../types/restaurant';
import { theme, spacing } from '../theme/themes';
import { CachedImage } from './CachedImage';
import { useInjection } from 'inversify-react';
import { SYMBOLS } from '../types/symbols';
import { ILogger } from '../types/interfaces';

import placeholder from '../../assets/placeholder-restaurant.jpg';

interface RestaurantCardProps {
  restaurant: RestaurantWithDistance;
  onPress: (id: string) => void;
  isFavorite?: boolean;
  isWishlisted?: boolean;
  onToggleFavorite: (restaurant: Restaurant) => void;
  onToggleWishlist: (restaurant: Restaurant) => void;
}

// Fonction helper pour formater le prix
const formatPriceLevel = (priceLevel?: number): string => {
  if (priceLevel === undefined || priceLevel === null) return '€';
  return '€'.repeat(Math.min(priceLevel + 1, 4));
};

export const RestaurantCard = ({
  restaurant,
  onPress,
  isFavorite = false,
  isWishlisted = false,
  onToggleFavorite,
  onToggleWishlist
}: RestaurantCardProps) => {
  // Séparer la distance du reste des propriétés du restaurant
  const { distance, ...restaurantWithoutDistance } = restaurant;
  const logger = useInjection<ILogger>(SYMBOLS.Logger);
  // Préparation des données pour l'affichage
  const displayImage = restaurant.photos?.[0] || 'https://via.placeholder.com/400';
  const displayRating = restaurant.rating.toFixed(1);
  const displayPrice = formatPriceLevel(restaurant.priceLevel);
  const displayDistance = distance.toFixed(1);
  const handleToggleFavorite = () => {
    logger.info('Toggle favorite:', { restaurantId: restaurant.id });
    onToggleFavorite(restaurantWithoutDistance);
  };
  
  const handleToggleWishlist = () => {
    logger.info('Toggle wishlist:', { restaurantId: restaurant.id });
    onToggleWishlist(restaurantWithoutDistance);
  };
  return (
    <View style={restaurantStyles.card}>
      <View style={restaurantStyles.imageContainer}>
        <CachedImage
          uri={displayImage}
          style={restaurantStyles.cardImage}
          placeholder={placeholder}
                  />
       
        <LinearGradient
          colors={[
            'rgba(0, 0, 0, 0.8)',
            'transparent',
            'rgba(0, 0, 0, 0.9)'
          ]}
          locations={[0, 0.5, 0.8]}
          style={restaurantStyles.gradientOverlay}
        />
       
        <View style={restaurantStyles.headerContainer}>
          <View style={restaurantStyles.titleContainer}>
            <Text style={restaurantStyles.restaurantName} numberOfLines={2}>
              {restaurant.name}
            </Text>
           
            <View style={[restaurantStyles.cuisineContainer, { marginTop: spacing.xs }]}>
              <Icon name="silverware" size={20} style={restaurantStyles.cuisineIcon} />
              <Text style={restaurantStyles.cuisineText}>{restaurant.cuisine}</Text>
            </View>
          </View>
         
          <View style={restaurantStyles.actionButtonsContainer}>
            <TouchableOpacity
              style={restaurantStyles.actionButton}
              onPress={handleToggleWishlist}            >
              <IconButton
                icon={isWishlisted ? "bookmark" : "bookmark-outline"}
                iconColor={isWishlisted ? theme.colors.primary : theme.colors.text}
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={restaurantStyles.actionButton}
              onPress={handleToggleFavorite}            >
              <IconButton
                icon={isFavorite ? "heart" : "heart-outline"}
                iconColor={isFavorite ? "#FF4949" : theme.colors.text}
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={restaurantStyles.infoContainer}>
          <View style={restaurantStyles.ratingContainer}>
            <Icon name="star" size={16} color={theme.colors.primary} />
            <Text style={restaurantStyles.rating}>{displayRating}</Text>
            <Text style={restaurantStyles.separator}> • </Text>
            <Icon name="map-marker" size={16} style={restaurantStyles.locationIcon} />
            <Text style={restaurantStyles.distance}>{displayDistance} km</Text>
            <Text style={restaurantStyles.separator}> • </Text>
            <Text style={restaurantStyles.price}>{displayPrice}</Text>
          </View>

          <TouchableOpacity
            style={restaurantStyles.detailsButton}
            onPress={() => onPress(restaurant.id)}
          >
            <Text style={restaurantStyles.detailsButtonText}>Plus d'infos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};