import { StyleSheet } from 'react-native';
import { theme, spacing, shadows } from '../theme/themes';

export const formStyles = StyleSheet.create({
    containerForm: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    surface: {
      margin: spacing.m,
      padding: spacing.m,
      borderRadius: theme.roundness,
      flex: 1,
      backgroundColor: theme.colors.surface,
      ...shadows.small,
    },
    formContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: theme.roundness,
      padding: spacing.l,
      margin: spacing.m,
      ...shadows.medium,
    },
    backButtonContainer: {
      position: 'absolute',
      left: spacing.xs,
      top: spacing.xs,
      zIndex: 2,
    },
    formInputs: {
      marginTop: spacing.xl, // Espace pour le bouton retour
    },
    input: {
      marginBottom: spacing.m,
      backgroundColor: 'transparent',
    },
    backButton: {
      position: 'absolute',
      left: spacing.s,
      top: spacing.s,
  
    },
    title: {
      textAlign: 'center',
      marginTop: spacing.xl * 1.5,
      marginBottom: spacing.l,
      color: theme.colors.text,
      fontSize: 24,
      fontWeight: '600',
    },
  
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: spacing.l,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.border,
    },
    dividerText: {
      marginHorizontal: spacing.m,
      color: theme.colors.textSecondary,
    },
    socialButton: {
      marginTop: spacing.s,
      padding: spacing.m,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      borderRadius: theme.roundness,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    socialButtonText: {
      color: theme.colors.primary,
      fontSize: 14,
      fontWeight: '500',
    }
  });