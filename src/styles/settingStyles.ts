import { StyleSheet, Dimensions } from 'react-native';
import { theme, spacing } from '../theme/themes';

export const settingStyles = StyleSheet.create({
    containerSetting: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 16,
    },
    title: {
      color: theme.colors.text,
      marginBottom: 16,
    },
  });
   
   