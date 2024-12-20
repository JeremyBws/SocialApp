// screens/SettingsScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { DrawerScreenProps } from '../types/navigation';
import { settingStyles } from '../styles/settingStyles';
import { SYMBOLS } from '../types/symbols';
import { ILogger, ISettingsService } from '../types/interfaces';
import { useInjection } from 'inversify-react';
import { SettingsService } from '../services/settingsService';
type SettingsScreenProps = DrawerScreenProps<'Paramètres'>;
export default function SettingsScreen({ navigation }: SettingsScreenProps) 
{const logger = useInjection<ILogger>(SYMBOLS.Logger);
  const settingsService = useInjection<ISettingsService>(SYMBOLS.SettingsService);
  return (
    <View style={settingStyles.containerSetting}>
      <Text variant="headlineMedium" style={settingStyles.title}>
        Paramètres
      </Text>
      {/* Ajoutez ici les différentes options de paramètres */}
    </View>
  );
}

