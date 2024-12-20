import { theme, spacing, shadows } from '../theme/themes';

import { StyleSheet } from 'react-native';

export const restaurantStyles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    height: 280, // Increased height
  },
  cardImage: {
    width: '100%',
    height: 280, // Full height image
    resizeMode: 'cover',
  },
    cardContainer: {
      position: 'relative',
      height: 240,
      marginBottom: spacing.l,
      width: '100%',
    },
    cardFront: {
      backfaceVisibility: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 240,
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      ...shadows.medium,
    },
    cardBack: {
      backfaceVisibility: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 240,
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      ...shadows.medium,
    },
    imageContainer: {
      height: '100%',
      position: 'relative',
    },
    
    gradientOverlay: {
      ...StyleSheet.absoluteFillObject,
      opacity: 1,
    },
  
    // Création de 3 couches de gradients distinctes
    gradientTop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '30%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    
    gradientMiddle: {
      position: 'absolute',
      top: '30%',
      left: 0,
      right: 0,
      height: '40%',
      backgroundColor: 'transparent',
    },
    
    gradientBottom: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '30%',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  
    headerContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      padding: spacing.m,
      paddingBottom: spacing.xl,
      zIndex: 2,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    titleContainer: {
      flex: 1,
      marginRight: spacing.xl * 2, // Espace pour les boutons d'action
    },
    restaurantName: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: spacing.s,
      flexWrap: 'wrap',
      flex: 1,
      flexShrink: 1,
    },
    actionButtonsContainer: {
      flexDirection: 'row',
      gap: spacing.s,
    },
  
    actionButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: 50,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      ...shadows.small,
    },
    // Nouveau conteneur pour les informations cuisine
    cuisineContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: spacing.xs,
    },
    cuisineIcon: {
      marginRight: spacing.xs,
      color: theme.colors.primary, // Couleur dorée
    },
    cuisineText: {
      color: '#FFFFFF',
      fontSize: 16,
      opacity: 0.9,
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 3,
    },
    infoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: spacing.m,
      paddingTop: spacing.xl,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.m,
    },
  
    rating: {
      color: '#FFFFFF',
      fontWeight: '600',
      fontSize: 14,
    },
  
    separator: {
      color: '#FFFFFF',
      opacity: 0.7,
      marginHorizontal: spacing.xs,
    },
  
    distance: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '500',
    },
  
    locationIcon: {
      color: theme.colors.primary,
    },
  
    price: {
      color: theme.colors.primary,
      fontWeight: '600',
      fontSize: 16,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      padding: spacing.s,
      borderRadius: 12,
      marginBottom: spacing.m,
    },
  
    address: {
      color: '#FFFFFF',
      flex: 1,
      fontSize: 14,
      opacity: 0.9,
    },
  
    detailsButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: spacing.m,
      paddingHorizontal: spacing.l,
      borderRadius: 12,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      ...shadows.medium,
    },
    detailsButtonText: {
      color: '#FFFFFF',
      fontWeight: '600',
      fontSize: 16,
    },
  });