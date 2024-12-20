import * as Location from 'expo-location';

export type FilterType = 'main' | 'cuisine' | 'price' | 'reset' | 'location';
export type FilterValue = string;


// Interface pour l'état des filtres actifs
export interface ActiveFilters {
  main: string;
  cuisine: string;
  price: string;
  location: Location.LocationObject | null;
}
export interface Filter {
  id: string;
  label: string;
}

export interface FiltersConfig {
  main: Filter[];
  cuisine: Filter[];
  price: Filter[];
}

export const FILTERS_CONFIG = {
  main: [
    { id: 'all', label: 'Tous' },
    { id: 'proche', label: 'À côté' },
    { id: 'populaire', label: 'Les mieux notés' },
  ],
  cuisine: [
    { id: 'Français', label: 'Français' },
    { id: 'Japonais', label: 'Japonais' },
    { id: 'Italien', label: 'Italien' },
    { id: 'Chinois', label: 'Chinois' },
    { id: 'Indien', label: 'Indien' },
    { id: 'Mexicain', label: 'Mexicain' },
    { id: 'Libanais', label: 'Libanais' },
    { id: 'Thaï', label: 'Thaï' },
    { id: 'Espagnol', label: 'Espagnol' },
    { id: 'Grec', label: 'Grec' },
    { id: 'Vietnamien', label: 'Vietnamien' },
    { id: 'Américain', label: 'Américain' },
    { id: 'Coréen', label: 'Coréen' },
    { id: 'Turc', label: 'Turc' },
    { id: 'Brésilien', label: 'Brésilien' }
  ],
  price: [
    { id: '€', label: 'Économique' },
    { id: '€€', label: 'Modéré' },
    { id: '€€€', label: 'Haut de gamme' }
  ]
};