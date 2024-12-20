import { MD3LightTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
  displayLarge: {
    fontFamily: 'Playfair Display',
    fontSize: 57,
    letterSpacing: 0,
  },
  displayMedium: {
    fontFamily: 'Playfair Display',
    fontSize: 45,
    letterSpacing: 0,
  },
};

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#B8860B', // Gold
    secondary: '#1C1C1C',
    background: '#FFFFFF',
    surface: '#F8F8F8',
    accent: '#D4AF37',
  },
  fonts: configureFonts({config: fontConfig}),
};