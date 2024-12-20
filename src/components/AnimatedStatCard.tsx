import React, { useEffect } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { Surface, Text, IconButton } from 'react-native-paper';
import * as Haptics from 'expo-haptics'; // Import correct
import { animatedStyles } from '../styles/animatedStyles';
import { useInjection } from 'inversify-react';
import { SYMBOLS } from '../types/symbols';
import { ILogger } from '../types/interfaces';

interface AnimatedStatCardProps {
  title: string;
  value: number;
  icon: string;
  onPress?: () => void;
  onLongPress?: () => void;
}

export const AnimatedStatCard: React.FC<AnimatedStatCardProps> = ({
  title,
  value,
  icon,
  onPress,
  onLongPress
}) => {
  const scaleAnim = new Animated.Value(1);
  const opacityAnim = new Animated.Value(0);
  const logger = useInjection<ILogger>(SYMBOLS.Logger);

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, []);

  const handlePressIn = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true
      }).start();
    } catch (error) {
      // Gérer silencieusement si les haptics ne sont pas disponibles
      logger.info('Haptics not available:', error);
    }
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true
    }).start();
  };

  const handlePress = async () => {
    if (onPress) {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      } catch (error) {
        // Afficher l'erreur dans les logs, ou la gérer comme tu veux
        logger.error('Error during press:', error);
        // Continuer même si les haptics échouent
        onPress();
      }
    }
  };

  const handleLongPress = async () => {
    if (onLongPress) {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onLongPress();
      } catch (error) {
        // Afficher l'erreur dans les logs, ou la gérer comme tu veux
        logger.error('Error during long press:', error);
        // Continuer même si les haptics échouent
        onLongPress();
      }
    }
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      onLongPress={handleLongPress}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim
          }
        ]}
      >
        <Surface style={animatedStyles.card} elevation={2}>
          <IconButton icon={icon} size={24} />
          <Text style={animatedStyles.value}>{value}</Text>
          <Text style={animatedStyles.title}>{title}</Text>
        </Surface>
      </Animated.View>
    </TouchableOpacity>
  );
};
