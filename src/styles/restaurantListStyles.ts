import { StyleSheet } from 'react-native';
import { theme, spacing } from '../theme/themes';

export const restaurantListStyles = StyleSheet.create({
    listContainer: {
        paddingTop: 140,
        paddingBottom: spacing.l,
      },
      cardContainer: {
        marginHorizontal: 0,
        marginVertical: 0,
      },
      separator: {
        height: 0,
      },
      extendButton: {
        backgroundColor: '#FE3A4A',
        padding: 12,
        borderRadius: 8,
        margin: 16,
        marginTop: 10,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      extendButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
      }
});
