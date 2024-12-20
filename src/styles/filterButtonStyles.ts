import { StyleSheet } from 'react-native';
import { theme, spacing } from '../theme/themes';

export const buttonStyles = StyleSheet.create({
  button: {
    borderRadius: 20,
    marginRight: spacing.s,
    marginVertical: spacing.s,
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.m,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  inactiveButton: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.border,
  },
  label: {
    fontSize: 14,
  },
  activeLabel: {
    color: '#FFFFFF',
  },
  inactiveLabel: {
    color: theme.colors.text,
  },
});
