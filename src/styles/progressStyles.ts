import { StyleSheet } from 'react-native';
import { theme } from '../theme/themes';
export const progressStyles = StyleSheet.create({
    containerProgress: {
      margin: 16,
      padding: 16,
      borderRadius: theme.roundness,
      backgroundColor: theme.colors.surface,
    },
    levelHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
    trophyContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: 'rgba(201, 160, 60, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    levelTitle: {
      color: theme.colors.text,
      marginBottom: 4,
    },
    pointsText: {
      color: theme.colors.textSubtle,
    },
    progressContainer: {
      marginBottom: 24,
    },
    progressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    progressText: {
      color: theme.colors.textSubtle,
    },
    progressPercentage: {
      color: theme.colors.primary,
    },
    progressBar: {
      height: 8,
      borderRadius: 4,
      backgroundColor: 'rgba(201, 160, 60, 0.1)',
    },
    remainingPoints: {
      color: theme.colors.textSubtle,
      marginTop: 8,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 24,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    statCard: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginVertical: 4,
    },
    statLabel: {
      fontSize: 12,
      color: theme.colors.textSubtle,
      textAlign: 'center',
  
  },
  });
  