import React, { useState } from 'react';
import { View, ImageBackground, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, IconButton } from 'react-native-paper';
import { theme } from '../theme/themes';
import { formStyles } from '../styles/formStyles';
import { baseStyles } from '../styles/baseStyles';
import type { WelcomeScreenProps } from '../types/navigation';
import { SYMBOLS } from '../types/symbols';
import { ILogger, IFavoritesService, IAuthService } from '../types/interfaces';
import { useInjection } from 'inversify-react';
import { AuthService } from '../services/authService';
export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  const logger = useInjection<ILogger>(SYMBOLS.Logger);
const authService = useInjection<IAuthService>(SYMBOLS.AuthService);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = async () => {
    setIsLoading(true);
    try {
      await authService.loginWithEmail(email, password);
      navigation.navigate('Main');
    } catch (error) {
      logger.error('Login error:', error);
    }
    setIsLoading(false);
  };

  const handleGoogleLogin = () => {
    // Intégrer la logique de connexion Google ici
    navigation.navigate('Main');
  };

  const renderEmailForm = () => (
    <View style={formStyles.formContainer}>
      <View style={formStyles.backButtonContainer}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => setShowEmailForm(false)}
          style={formStyles.backButton}
          iconColor={theme.colors.text}
        />
      </View>
  
      <View style={formStyles.formInputs}>
        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={formStyles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          mode="outlined"
          label="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={formStyles.input}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        <TouchableOpacity
          style={baseStyles.primaryButton}
          onPress={handleEmailLogin}
        >
          <Text style={baseStyles.primaryButtonText}>S'inscrire / Se connecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderButtons = () => (
    <View style={baseStyles.footer}>
      <TouchableOpacity
        style={baseStyles.primaryButton}
        onPress={() => setShowEmailForm(true)}
      >
        <Text style={baseStyles.primaryButtonText}>
          S'inscrire / se connecter avec une adresse email
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={baseStyles.secondaryButton}
        onPress={handleGoogleLogin}
      >
        <Text style={baseStyles.secondaryButtonText}>
          S'inscrire / se connecter avec Google
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
    source={require('../../assets/background.jpg')}
    style={baseStyles.containerBase}
    resizeMode="cover"
   >
      <SafeAreaView style={baseStyles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={baseStyles.containerBase}
        >
          <View style={baseStyles.header}>
            <Text style={baseStyles.logo}>RestaurantSocial</Text>
          </View>

          <View style={baseStyles.content}>
            <Text style={baseStyles.title}>
              Trouvez les meilleurs restaurants près de chez vous
            </Text>
            <Text style={baseStyles.subtitle}>
              Le resto idéal en quelques clics
            </Text>
          </View>

          {showEmailForm ? renderEmailForm() : renderButtons()}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}