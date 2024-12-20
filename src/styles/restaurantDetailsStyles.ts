import { StyleSheet, Dimensions } from 'react-native';
import { theme, spacing } from '../theme/themes';

const SCREEN_WIDTH = Dimensions.get('window').width;
const HORIZONTAL_PADDING = spacing.m * 2;
const PHOTO_GAP = spacing.xs;
const GRID_WIDTH = SCREEN_WIDTH - HORIZONTAL_PADDING;
const PHOTO_SIZE = Math.floor((GRID_WIDTH - (PHOTO_GAP * 3)) / 4);

export const restaurantDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    paddingVertical: spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginLeft: spacing.s,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    marginRight: spacing.m,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    flex: 1,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    paddingHorizontal: spacing.xs,
  },
  separatorText: {
    color: theme.colors.textSecondary,
  },
  distance: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
  price: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  cuisine: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  photoGrid: {
    width: '100%',
    marginBottom: 60,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
    paddingHorizontal: spacing.m,
  },
  photo: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: 8,
    backgroundColor: theme.colors.surfaceVariant,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.m,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  viewMoreButton: {
    backgroundColor: theme.colors.primary,
    padding: spacing.m,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viewMoreText: {
    color: theme.colors.onPrimary,
    fontSize: 16,
    fontWeight: '600',
  }
});