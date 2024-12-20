import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Surface, IconButton, Text, Divider, Button } from 'react-native-paper';
import * as Location from 'expo-location';
import { FilterButton } from './FilterButton';
import { theme } from '../../theme/themes';
import { filterStyles as styles } from '../../styles/filterStyles';
import React, { useState, useMemo } from 'react';
import { useInjection } from 'inversify-react';
import { SYMBOLS } from '../../types/symbols';
import { ILogger } from '../../types/interfaces';
import { 
  FilterType,
  FilterValue, 
  ActiveFilters,
  FILTERS_CONFIG 
} from '../../types/filters';

export interface FiltersBarProps {
  onFiltersChange: (
    type: FilterType, 
    value: FilterValue, 
    location?: Location.LocationObject
  ) => void;
}
export const FiltersBar: React.FC<FiltersBarProps> = ({ onFiltersChange }) => {
  const logger = useInjection<ILogger>(SYMBOLS.Logger);
    const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    main: 'all',
    cuisine: '',
    price: '',
    location: null
  });
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (activeFilters.main && activeFilters.main !== 'all') count++;
    if (activeFilters.cuisine) count++;
    if (activeFilters.price) count++;
    return count;
  }, [activeFilters]);
  const handleFilterPress = async (type: keyof ActiveFilters, value: FilterValue) => {
    // Cas spécial pour le bouton "Tous"
    if (type === 'main' && value === 'all') {
      setActiveFilters(prev => ({
        ...prev,
        main: 'all',
        location: null // Réinitialiser la localisation
      }));
      onFiltersChange('main', 'all');
      return;
    }

    // Cas spécial pour le filtre "À côté"
    if (value === 'proche') {
      setIsLoading(true);
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          logger.error('Permission de localisation refusée');
                    setIsLoading(false); // Ajout ici en cas d'erreur de permission
          return;
        }
    
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
    
        // Si on désactive le filtre "à côté"
        if (activeFilters.main === 'proche') {
          setActiveFilters(prev => ({
            ...prev,
            main: 'all',
            location: null
          }));
          onFiltersChange('main', 'all');
        } 
        // Si on active le filtre "à côté"
        else {
          setActiveFilters(prev => ({
            ...prev,
            main: value,
            location: location
          }));
          onFiltersChange('main', value, location);
        }
      } catch (error) {
        logger.error('Erreur de localisation:', error);
            } finally {
        setIsLoading(false); // Ajout ici pour s'assurer que le loading est toujours désactivé
      }
      return;
    }
    

    // Si on active un nouveau filtre principal (à côté ou mieux notés)
    if (type === 'main' && value !== activeFilters.main) {
      setActiveFilters(prev => ({
        ...prev,
        main: value,
        location: null // Réinitialiser la localisation si on change de filtre principal
      }));
      onFiltersChange(type, value);
      return;
    }

    // Gestion normale des autres filtres (cuisine et prix)
    setActiveFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? '' : value
    }));
    onFiltersChange(type, value);
  };

  const resetFilters = () => {
    const initialFilters: ActiveFilters = {
      main: 'all',
      cuisine: '',
      price: '',
      location: null
    };
    setActiveFilters(initialFilters);
    onFiltersChange('reset', '');
  };

  return (
    <Surface style={styles.containerFilter}>
      <View style={styles.mainSection}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContent}
        >
          {FILTERS_CONFIG.main.map((filter) => (
            <FilterButton
              key={filter.id}
              label={filter.label}
              active={activeFilters.main === filter.id}
              onPress={() => handleFilterPress('main', filter.id)}
            />
          ))}
        </ScrollView>
        <View style={styles.buttonGroup}>
          
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Text style={styles.toggleButtonText}>Filtres</Text>
            <IconButton 
              icon={showFilters ? "chevron-up" : "chevron-down"} 
              size={20}
              iconColor={theme.colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
      {showFilters && (
        <View style={styles.expandedFilters}>
          <Divider style={styles.divider} />
          
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Cuisine</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={styles.filtersContent}
            >
              {FILTERS_CONFIG.cuisine.map((filter) => (
                <FilterButton
                  key={filter.id}
                  label={filter.label}
                  active={activeFilters.cuisine === filter.id}
                  onPress={() => handleFilterPress('cuisine', filter.id)}
                />
              ))}
            </ScrollView>
          </View>
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Prix</Text>
            <View style={styles.priceFilters}>
              {FILTERS_CONFIG.price.map((filter) => (
                <FilterButton
                  key={filter.id}
                  label={`${filter.id} · ${filter.label}`}
                  active={activeFilters.price === filter.id}
                  onPress={() => handleFilterPress('price', filter.id)}
                />
              ))}
            </View>
          </View>
          <View style={styles.filterSection}>
          {activeFiltersCount > 0 && (
            <Button
            mode="outlined"
            icon="refresh"
            onPress={resetFilters}
            style={styles.resetButton}
            labelStyle={styles.resetButtonLabel}
          >
            Réinitialiser les filtres
          </Button>
                        
          )}
          </View>
        </View>
      )}
    </Surface>
  );
};

