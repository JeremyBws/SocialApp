import 'reflect-metadata';
import React, { useState, useEffect } from 'react';
import { Provider } from 'inversify-react';
import { container } from './src/config/container';
import { bootServices } from './src/config/bootstrap';
import { ILogger } from './src/types/interfaces';
import { SYMBOLS } from './src/types/symbols';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Text } from 'react-native';
import { theme } from './src/theme/themes';
import MainStackNavigator from './src/navigation/AppNavigator';
import { FavoritesProvider } from './src/contexts/FavoritesContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [containerInstance] = useState(container);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Vérification des bindings du container
        console.log('Vérification des bindings du container...');
   
        
        // Récupération explicite du logger
        const logger = containerInstance.get<ILogger>(SYMBOLS.Logger);
        console.log('Logger instance récupérée:', !!logger);

        // Initialisation des services
        logger.info('Starting application initialization...');
        await bootServices();
        logger.info('Application initialized successfully.');

        setIsReady(true);
      } catch (error) {
        console.error('Erreur d\'initialisation:', error);
      }
    };

    initializeApp();
  }, []);

  if (!isReady) {
    return <Text>Loading...</Text>;
  }

  return (
    <Provider container={containerInstance}>
      <QueryClientProvider client={queryClient}>
        <FavoritesProvider>
          <PaperProvider theme={theme}>
            <NavigationContainer>
              <MainStackNavigator />
            </NavigationContainer>
          </PaperProvider>
        </FavoritesProvider>
      </QueryClientProvider>
    </Provider>
  );
}