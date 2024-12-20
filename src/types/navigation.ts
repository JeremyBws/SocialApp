import type { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';

// Types pour la navigation principale
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Main: undefined;
  RestaurantModal: { restaurantId: string };
};

// Types pour le menu drawer
export type DrawerParamList = {
  'Restaurants': undefined;
  'Favoris': undefined;
  'À tester': undefined; // Assurez-vous que le nom correspond exactement
  'Profil': undefined;
  'Paramètres': undefined;
  Settings: undefined; 
};

// Props pour les écrans principaux
export type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;
export type RestaurantDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'RestaurantModal'>;

// Props pour les écrans du drawer
export type DrawerScreenProps<T extends keyof DrawerParamList> = {
  navigation: CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList, T>,
    NativeStackNavigationProp<RootStackParamList>
  >;
};

// Types spécifiques pour chaque écran du drawer
export type HomeScreenProps = DrawerScreenProps<'Restaurants'>;
export type FavoritesScreenProps = DrawerScreenProps<'Favoris'>;
export type WishlistScreenProps = DrawerScreenProps<'À tester'>;
export type ProfileScreenProps = DrawerScreenProps<'Profil'>;
export type SettingsScreenProps = DrawerScreenProps<'Paramètres'>;

// Navigation composée pour tous les écrans
export type NavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;
