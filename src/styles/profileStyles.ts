import { StyleSheet } from 'react-native';
import { theme, spacing, shadows } from '../theme/themes';
export const profileStyles = StyleSheet.create({
    containerProfile: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: spacing.m,
    },
    headerCard: {
      borderRadius: theme.roundness,
      padding: spacing.m,
      marginTop: spacing.m,
      backgroundColor: theme.colors.surface,
      ...shadows.medium,
    },
    profileHeader: {
      alignItems: 'center',
      paddingVertical: spacing.m,
      position: 'relative',
    },
    avatar: {
      marginBottom: spacing.m,
    },
    userName: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.text,
    },
    onlineStatus: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: '#4CAF50',
      position: 'absolute',
      right: -20,
      top: 35,
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: spacing.m,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    statLabel: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    section: {
      marginTop: spacing.l,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.m,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
    },
    badgesCount: {
      fontSize: 14,
      color: theme.colors.primary,
    },
    badgeCard: {
      width: 120,
      height: 160,
      borderRadius: theme.roundness,
      marginRight: spacing.m,
      padding: spacing.m,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.surface,
      ...shadows.small,
    },
    badgeTitle: {
      fontSize: 14,
      fontWeight: '500',
      textAlign: 'center',
      marginTop: spacing.s,
      color: theme.colors.text,
    },
    badgeCriteria: {
      fontSize: 12,
      textAlign: 'center',
      color: theme.colors.textSubtle,
      marginTop: spacing.xs,
    },
    preferenceItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: spacing.m,
      borderRadius: theme.roundness,
      marginBottom: spacing.s,
      backgroundColor: theme.colors.surface,
      ...shadows.small,
    },
  });