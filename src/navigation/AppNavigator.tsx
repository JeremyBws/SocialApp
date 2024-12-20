import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { 
  createDrawerNavigator, 
  DrawerContentScrollView, 
  DrawerItemList, 
  DrawerItem,
  DrawerContentComponentProps,
  DrawerNavigationProp 
} from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from 'react-native-paper';
import { DrawerParamList, RootStackParamList } from '../types/navigation';
import { theme, spacing } from '../theme/themes';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import WishlistScreen from '../screens/WishlistScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useInjection } from 'inversify-react';
import { SYMBOLS } from '../types/symbols';
import { ILogger, ISettingsService } from '../types/interfaces';


const Drawer = createDrawerNavigator<DrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

type HeaderLeftProps = {
  navigation: DrawerNavigationProp<DrawerParamList>;
};

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 50 }}>
        <DrawerItem 
          label="Se déconnecter"
          icon={({ color }) => (
            <IconButton 
              icon="logout"
              size={24}
              iconColor={theme.colors.error}
            />
          )}
          onPress={() => {
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'Welcome' }],
            });
          }}
          labelStyle={{ color: theme.colors.error }}
          style={{ marginBottom: 20 }}
        />
      </View>
    </DrawerContentScrollView>
  );
}

function HeaderLeft({ navigation }: HeaderLeftProps) {
  return (
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={{
        padding: 16,
        marginLeft: -8,
        zIndex: 100,
      }}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <IconButton
        icon="menu"
        size={24}
        iconColor={theme.colors.onPrimary}
        onPress={() => navigation.openDrawer()}
        style={{
          margin: 0,
        }}
      />
    </TouchableOpacity>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        drawerStyle: {
          backgroundColor: theme.colors.surface,
        },
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.textSecondary,
        headerStyle: {
          backgroundColor: theme.colors.primary,
          elevation: 8,
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 2 },
        },
        headerTintColor: theme.colors.onPrimary,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{
              marginLeft: spacing.s,
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconButton
              icon="menu"
              size={24}
              iconColor={theme.colors.onPrimary}
              onPress={() => navigation.openDrawer()}
            />
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen
        name="Restaurants"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color }) => <IconButton icon="silverware" size={24} iconColor={color} />,
          title: "RestaurantSocial"
        }}
      />
<Drawer.Screen
  name="Favoris"
  component={FavoritesScreen}
  options={{
    drawerIcon: ({ color }) => <IconButton icon="heart" size={24} iconColor={color} />,
    headerTitle: "Mes restaurants favoris"  // Optionnel : titre personnalisé
  }}
/>
<Drawer.Screen
  name="À tester"
  component={WishlistScreen}
  options={{
    drawerIcon: ({ color }) => <IconButton icon="bookmark" size={24} iconColor={color} />,
    headerTitle: "Ma wishlist"  // Optionnel : titre personnalisé
  }}
/>
      <Drawer.Screen
        name="Profil"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => <IconButton icon="account" size={24} iconColor={color} />
        }}
      />
      <Drawer.Screen
        name="Paramètres"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => <IconButton icon="cog" size={24} iconColor={color} />
        }}
      />
    </Drawer.Navigator>
  );
}

function MainStackNavigator() {
  const logger = useInjection<ILogger>(SYMBOLS.Logger);

  // Ajouter le logging pour le debugging
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
      }}
      screenListeners={{
        state: (e) => {
          logger.info('Navigation state changed:', e.data);
        },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Main" component={DrawerNavigator} />

    </Stack.Navigator>
  );
}

export default MainStackNavigator;
