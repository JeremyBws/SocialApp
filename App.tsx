import 'reflect-metadata';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { container } from './src/config/container';
import { PlacesService } from './src/services/placesService';
import { SYMBOLS } from './src/types/symbols';

export default function App() {
  console.log('App starting...');
  const service = container.get<PlacesService>(SYMBOLS.PlacesService);
  
  return (
    <View style={styles.container}>
      <Text>Test PlacesService avec Logger</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});