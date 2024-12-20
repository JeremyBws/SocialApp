import { StyleSheet } from 'react-native';
import { theme, spacing, shadows } from '../theme/themes';
export const baseStyles = StyleSheet.create({
    containerBase: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
    },
    header: {
      padding: spacing.xl,
      alignItems: 'center',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: spacing.xl,
    },
    footer: {
      padding: spacing.xl,
      gap: spacing.m,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.xl,
    },
    text: {
      color: theme.colors.text,
    },
    textCenter: {
      textAlign: 'center',
    },
    primaryButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: spacing.l,
      borderRadius: theme.roundness,
      alignItems: 'center',
      width: '100%',
      ...shadows.small,
    },
    primaryButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    secondaryButton: {
      backgroundColor: '#FFFFFF',
      paddingVertical: spacing.l,
      borderRadius: theme.roundness,
      alignItems: 'center',
      width: '100%',
      ...shadows.small,
    },
    secondaryButtonText: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
    textButton: {
      paddingVertical: spacing.s,
      alignItems: 'center',
    },
    textButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      color: '#FFFFFF',
      textAlign: 'center',
      marginBottom: spacing.m,
      lineHeight: 42,
    },
    subtitle: {
      fontSize: 16,
      color: 'rgba(255,255,255,0.9)',
      textAlign: 'center',
    },
    logo: {
      fontSize: 20,
      fontWeight: '600',
      color: '#FFFFFF',
    },
  });