import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { theme } from '../theme/themes';
import { Restaurant } from '../types/restaurant';
import { MOCK_FOOD_PHOTOS } from '../types/restaurant';
import { restaurantDetailsStyles } from '../styles/restaurantDetailsStyles';
import { CachedImage } from '../components/CachedImage';

const placeholder = require('../../assets/placeholder-restaurant.jpg');

interface RestaurantDetailsScreenProps {
  restaurant: Restaurant;
  onBack: () => void;
  onViewAllPhotos?: () => void;
  distance: number;
}

export const RestaurantDetailsScreen = ({ 
  restaurant, 
  onBack,
  onViewAllPhotos,
  distance
}: RestaurantDetailsScreenProps) => {
  const firstRow = MOCK_FOOD_PHOTOS.slice(0, 4);
  const secondRow = MOCK_FOOD_PHOTOS.slice(4, 8);

  return (
    <View style={restaurantDetailsStyles.container}>
      <View style={restaurantDetailsStyles.header}>
        <TouchableOpacity 
          style={restaurantDetailsStyles.backButton}
          onPress={onBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <IconButton
            icon="arrow-left"
            size={24}
            iconColor={theme.colors.text}
          />
        </TouchableOpacity>

        <View style={restaurantDetailsStyles.headerContent}>
          <View style={restaurantDetailsStyles.titleRow}>
            <Text style={restaurantDetailsStyles.name} numberOfLines={1}>
              {restaurant.name}
            </Text>
            <View style={restaurantDetailsStyles.ratingContainer}>
              <IconButton 
                icon="star" 
                size={16} 
                iconColor={theme.colors.primary} 
              />
              <Text style={restaurantDetailsStyles.rating}>{restaurant.rating}</Text>
              <View style={restaurantDetailsStyles.separator}>
                <Text style={restaurantDetailsStyles.separatorText}>•</Text>
              </View>
              <IconButton 
                icon="map-marker" 
                size={16} 
                iconColor={theme.colors.primary} 
              />
              <Text style={restaurantDetailsStyles.distance}>{distance.toFixed(1)} km</Text>
              <View style={restaurantDetailsStyles.separator}>
                <Text style={restaurantDetailsStyles.separatorText}>•</Text>
              </View>
              <Text style={restaurantDetailsStyles.price}>
                {'€'.repeat(restaurant.priceLevel || 1)}
              </Text>
            </View>
          </View>
          <Text style={restaurantDetailsStyles.cuisine}>{restaurant.cuisine}</Text>
        </View>
      </View>

      <View style={restaurantDetailsStyles.content}>
        <View style={restaurantDetailsStyles.photoGrid}>
          <View style={restaurantDetailsStyles.row}>
            {firstRow.map((photo) => (
              <CachedImage
  uri={photo.url}
  style={restaurantDetailsStyles.photo}
  placeholder={placeholder}
/>
            ))}
          </View>
          <View style={restaurantDetailsStyles.row}>
            {secondRow.map((photo) => (
              <CachedImage
  uri={photo.url}
  style={restaurantDetailsStyles.photo}
  placeholder={placeholder}
/>
            ))}
          </View>
        </View>
        
        <View style={restaurantDetailsStyles.buttonContainer}>
          <TouchableOpacity 
            style={restaurantDetailsStyles.viewMoreButton}
            onPress={onViewAllPhotos}
          >
            <Text style={restaurantDetailsStyles.viewMoreText}>Voir plus de photos</Text>
            <IconButton 
              icon="chevron-right" 
              size={18}
              iconColor={theme.colors.onPrimary} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};