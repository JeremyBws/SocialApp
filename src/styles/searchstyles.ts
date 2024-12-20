import { StyleSheet } from 'react-native';
import { theme, spacing, shadows } from '../theme/themes';


export const searchStyles = StyleSheet.create({
    searchBarContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1, // Réduire le zIndex
      backgroundColor: theme.colors.background,
      paddingHorizontal: spacing.m,
      paddingTop: spacing.xs,
      paddingBottom: spacing.s,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      elevation: 2,
    },
    searchBar: {
      elevation: 0,
      backgroundColor: theme.colors.searchBarBg,
      borderRadius: 24,
      height: 46,
      marginBottom: spacing.s,
    },
    listContainer: {
        paddingHorizontal: spacing.m,
        paddingBottom: spacing.xl,
      paddingTop: 140,
    },
    filtersContainer: {
      flexDirection: 'row',
      marginBottom: spacing.s,
      alignItems: 'center',
      flexWrap: 'nowrap',
    },
    filterChips: {
      flexDirection: 'row',
      flex: 1,
      flexWrap: 'wrap',
      gap: spacing.xs,
    },
    filtersButton: {
      marginLeft: spacing.s,
    },
    clearFiltersButton: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.roundness,
      padding: spacing.s,
      marginTop: spacing.s,
      alignSelf: 'center',
    },
  });