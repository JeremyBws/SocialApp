import 'dotenv/config';
export default {
  expo: {
    platforms: ["ios", "android"],
    plugins: [
      [
        "@react-native-firebase/app",
        {
          android: {
            package: "com.restaurantsocial.app",
            hermes: true, // Activez Hermes pour Android
          },
          ios: {
            bundleIdentifier: "com.yourapp.ios",
          },
        },
      ],
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Permettez l'accès à votre position pour voir les restaurants à proximité"
        }
      ]
    ],
    newArchEnabled: true,
    name: "RestaurantSocial",
    slug: "restaurant-social",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    jsEngine: "hermes",  // Ajoutez cette ligne pour activer Hermes
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.yourapp.ios"
    },
    android: {
      package: "com.restaurantsocial.app",
      newArchEnabled: true,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    extra: {
      eas: {
        projectId: "7cc22896-4d17-42c9-850b-8d559f12b8c8"
      },
      GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY,
      API_BASE_URL: process.env.API_BASE_URL,
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,  // Utilisation des variables d'environnement
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID
    }
  }
};