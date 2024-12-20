import { StyleSheet } from 'react-native';
import { theme, spacing, shadows } from '../theme/themes';

export const flippableCardStyles = StyleSheet.create({
  container: {
    marginVertical: 8,
    height: 280, // Increased height
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardBack: {
    transform: [{ rotateY: '180deg' }],
    elevation: 0,
    shadowOpacity: 0,
  }
});