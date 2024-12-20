import { StyleSheet } from 'react-native';
import { theme, spacing, shadows } from '../theme/themes';


export const filterStyles = StyleSheet.create({
    containerFilter: {
      margin: spacing.s,
      borderRadius: theme.roundness,
      backgroundColor: theme.colors.surface,
        ...shadows.small
    },
    mainSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 48,
   
    },

    filtersScroll: {
      flex: 1,
    },
    filtersContent: {
       paddingHorizontal: spacing.s,
      gap: spacing.xs,
    },
    buttonGroup: {
        flexDirection: 'row',
      alignItems: 'center',
      paddingRight: spacing.xs,
    },
    resetButton: {
      marginTop: spacing.m,
      marginHorizontal: spacing.m,
      borderColor: theme.colors.error,
      borderRadius: theme.roundness,
    },
    
    resetButtonLabel: {
      color: theme.colors.error,
      fontSize: 14,
    },
    toggleButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    toggleButtonText: {
      color: theme.colors.primary,
      fontSize: 14,
      fontWeight: '500',
    },
    expandedFilters: {
      padding: spacing.m,
    },
    divider: {
      backgroundColor: theme.colors.border,
      marginBottom: spacing.s,
    },
    filterSection: {
      marginBottom: spacing.m,
      
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: spacing.s,
      color: theme.colors.text,
    },
    priceFilters: {
      flexDirection: 'row',
      flexWrap: 'wrap',
  
    },
  });