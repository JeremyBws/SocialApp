import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { View, Animated, RefreshControl } from 'react-native';
import { Searchbar, ActivityIndicator } from 'react-native-paper';
import { FiltersBar } from '../components/filters/FiltersBar';
import { RestaurantsList } from '../components/RestaurantsList';
import { baseStyles } from '../styles/baseStyles';
import { searchStyles } from '../styles/searchstyles';
import { Restaurant } from '../types/restaurant';
import { DrawerScreenProps } from '../types/navigation';
import { useRestaurants } from '../hooks/useRestaurants';
import * as Location from 'expo-location';
import { sortByDistance } from '../utils/sortingUtils';
import { SYMBOLS } from '../types/symbols';
import { ILogger, IFavoritesService, IAuthService } from '../types/interfaces';
import { useInjection } from 'inversify-react';

interface HomeScreenProps extends DrawerScreenProps<'Restaurants'> {}
type FilterType = 'main' | 'cuisine' | 'price' | 'reset' | 'location';
type FilterValue = string;
type ActiveFilters = {
  main: string;
  cuisine: string;
  price: string;
  location?: Location.LocationObject | null;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const logger = useInjection<ILogger>(SYMBOLS.Logger);  // Assurez-vous que l'injection est correcte
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [searchRadius, setSearchRadius] = useState(500);
  const { restaurants, isLoading, error, refreshRestaurants, syncRestaurants } = useRestaurants(false);
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    main: 'all',
    cuisine: '',
    price: ''
  });

  useEffect(() => {
    const initializeLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          logger.error('Permission refusée');
          return;
        }
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);

        if (currentLocation) {
          await syncRestaurants(
            currentLocation.coords.latitude,
            currentLocation.coords.longitude,
            searchRadius
          );
        }
      } catch (error) {
        logger.error('Erreur d\'initialisation de la localisation:', error);
      }
    };
    initializeLocation();
  }, [logger, searchRadius, syncRestaurants]);

  const handleRefresh = useCallback(async () => {
    if (location) {
      try {
        await syncRestaurants(
          location.coords.latitude,
          location.coords.longitude,
          searchRadius
        );
      } catch (error) {
        logger.error('Erreur lors du rafraîchissement:', error);
      }
    }
  }, [location, searchRadius, syncRestaurants, logger]);

  const handleExtendSearch = useCallback(async () => {
    if (!location) {
      logger.error('Localisation non disponible');
      return;
    }
    const newRadius = searchRadius + 500;
    setSearchRadius(newRadius);
    try {
      await syncRestaurants(
        location.coords.latitude,
        location.coords.longitude,
        newRadius
      );
    } catch (error) {
      logger.error('Erreur lors de l\'extension de la recherche:', error);
    }
  }, [location, searchRadius, syncRestaurants, logger]);

  const filterRestaurants = useCallback((restaurantsList: Restaurant[]) => {
    return restaurantsList.filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCuisine = !activeFilters.cuisine || restaurant.cuisine === activeFilters.cuisine;
      const matchesPriceLevel = !activeFilters.price || 
        (restaurant.priceLevel !== undefined && restaurant.priceLevel.toString() === activeFilters.price);

      let matchesMain = true;
      if (activeFilters.main === 'populaire') {
        matchesMain = restaurant.rating >= 4.5;
      }
      return matchesSearch && matchesCuisine && matchesPriceLevel && matchesMain;
    });
  }, [searchQuery, activeFilters]);

  const sortRestaurants = useCallback((restaurantsList: Restaurant[]) => {
    if (activeFilters.main === 'proche' && location) {
      return sortByDistance(restaurantsList, location);
    }
    return restaurantsList;
  }, [location, activeFilters.main]);

  const processedRestaurants = useMemo(() => {
    const filtered = filterRestaurants(restaurants);
    return sortRestaurants(filtered);
  }, [restaurants, filterRestaurants, sortRestaurants]);

  const handleFiltersChange = async (type: FilterType, value: FilterValue) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: prev[type as keyof ActiveFilters] === value ? '' : value
    }));
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  const searchBarTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolate: 'clamp'
  });
  const searchBarOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  if (isLoading && restaurants.length === 0) {
    return (
      <View style={[baseStyles.containerBase, baseStyles.centered]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={baseStyles.containerBase}>
      <Animated.View 
        style={[
          searchStyles.searchBarContainer,
          {
            transform: [{ translateY: searchBarTranslateY }],
            opacity: searchBarOpacity,
          }
        ]}
      >
        <Searchbar
          placeholder="Rechercher un restaurant..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={searchStyles.searchBar}
          icon="magnify"
        />
        <FiltersBar onFiltersChange={handleFiltersChange} />
      </Animated.View>
      <RestaurantsList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefresh}
          />
        }
        restaurants={processedRestaurants}
        onRestaurantPress={(id) => setFlippedCardId(id.toString())}
        onScroll={handleScroll}
        flippedCardId={flippedCardId}
        onFlipBack={() => setFlippedCardId(null)}
        onExtendSearch={handleExtendSearch}
      />
    </View>
  );
}
