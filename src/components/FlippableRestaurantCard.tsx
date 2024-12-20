
import { container } from '../config/container';
import React, { useEffect, useRef } from 'react';
import { View, Animated, PanResponder, StyleSheet } from 'react-native';
import { Restaurant, RestaurantWithDistance } from '../types/restaurant';
import { RestaurantCard } from './RestaurantCard';
import { RestaurantDetailsScreen } from '../screens/RestaurantDetailsScreen';
import { useDistance } from '../hooks/useDistance';
import { flippableCardStyles } from '../styles/flippableCardStyles';

import { useInjection } from 'inversify-react';
import { SYMBOLS } from '../types/symbols';
import { ILogger, ILocationService } from '../types/interfaces';
import { LocationService } from '../services/locationService';

interface FlippableRestaurantCardProps {
  restaurant: Restaurant;
  onPress: (id: string) => void;
  isFavorite?: boolean;
  isWishlisted?: boolean;
  onToggleFavorite: (restaurant: Restaurant) => void;
  onToggleWishlist: (restaurant: Restaurant) => void;
  onBack: () => void;
  isFlipped: boolean;
}

export const FlippableRestaurantCard: React.FC<FlippableRestaurantCardProps> = ({
  restaurant,
  onPress,
  isFavorite,
  isWishlisted,
  onToggleFavorite,
  onToggleWishlist,
  onBack,
  isFlipped,
}) => {
  const logger = useInjection<ILogger>(SYMBOLS.Logger);
  const { calculateDistance } = useDistance();
  const flipAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const locationService = container.get<ILocationService>(SYMBOLS.LocationService);
  useEffect(() => {
    Animated.timing(flipAnim, {
      toValue: isFlipped ? 180 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isFlipped]);

  const resetPosition = () => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
        tension: 40,
        friction: 5
      }),
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 40,
        friction: 5
      }),
    ]).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, { dx, dy }) => {
        if (!isFlipped) return false;
        return Math.abs(dx) > 10 || Math.abs(dy) > 10;
      },
      onPanResponderGrant: () => {
        translateY.extractOffset();
        translateX.extractOffset();
      },
      onPanResponderMove: (_, { dx, dy }) => {
        if (!isFlipped) return;
        translateX.setValue(dx);
        translateY.setValue(dy);
      },
      onPanResponderRelease: (_, { dx, dy }) => {
        if (!isFlipped) return;
        translateY.flattenOffset();
        translateX.flattenOffset();

        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 100) {
          onBack();
        }
        resetPosition();
      },
      onPanResponderTerminate: () => {
        resetPosition();
      },
    })
  ).current;

  const distance = calculateDistance(restaurant.location);
  const restaurantWithDistance: RestaurantWithDistance = {
    ...restaurant,
    distance
  };

  const getAnimatedStyle = (isBack: boolean) => ({
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 180],
          outputRange: isBack ? ['180deg', '360deg'] : ['0deg', '180deg'],
        }),
      },
      ...(isBack ? [{ translateX }, { translateY }] : []),
    ],
    opacity: flipAnim.interpolate({
      inputRange: isBack ? [0, 89, 90, 180] : [0, 90, 91, 180],
      outputRange: isBack ? [0, 0, 0.5, 1] : [1, 0.5, 0, 0],
    }),
  });

  return (
    <View style={flippableCardStyles.container}>
      <Animated.View 
        style={[flippableCardStyles.card, getAnimatedStyle(false)]}
        pointerEvents={isFlipped ? 'none' : 'auto'}
      >
        <RestaurantCard
          restaurant={restaurantWithDistance}
          onPress={() => onPress(restaurant.id)}
          isFavorite={isFavorite}
          isWishlisted={isWishlisted}
          onToggleFavorite={onToggleFavorite}
          onToggleWishlist={onToggleWishlist}
        />
      </Animated.View>
      
      <Animated.View 
        {...panResponder.panHandlers}
        style={[flippableCardStyles.card, flippableCardStyles.cardBack, getAnimatedStyle(true)]}
        pointerEvents={isFlipped ? 'auto' : 'none'}
      >
        <RestaurantDetailsScreen
          restaurant={restaurant}
          onBack={onBack}
          distance={distance}
        />
      </Animated.View>
    </View>
  );
};
