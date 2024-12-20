import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface, IconButton, ProgressBar } from 'react-native-paper';
import { theme } from '../../theme/themes';
import { progressStyles } from '../../styles/progressStyles';
type Level = {
  level: number;
  name: string;
  minPoints: number;
  maxPoints: number;
};

type CurrentLevel = Level & {
  nextLevel?: Level;
  progress: number;
};

interface ProfileProgressProps {
  points: number;
  earnedBadges: string[];
}

const LEVELS: Level[] = [
  { level: 1, name: 'Débutant', minPoints: 0, maxPoints: 100 },
  { level: 2, name: 'Apprenti Gourmet', minPoints: 100, maxPoints: 300 },
  { level: 3, name: 'Gastronome', minPoints: 300, maxPoints: 600 },
  { level: 4, name: 'Connaisseur', minPoints: 600, maxPoints: 1000 },
  { level: 5, name: 'Expert Culinaire', minPoints: 1000, maxPoints: 2000 }
];

const calculateLevel = (points: number): CurrentLevel => {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (points >= LEVELS[i].minPoints) {
      return {
        ...LEVELS[i],
        nextLevel: LEVELS[i + 1],
        progress: LEVELS[i + 1]
          ? (points - LEVELS[i].minPoints) / (LEVELS[i + 1].minPoints - LEVELS[i].minPoints)
          : 1
      };
    }
  }
  return { ...LEVELS[0], progress: 0 };
};

const ProfileProgress = ({ points = 0, earnedBadges = [] }: ProfileProgressProps) => {
  const currentLevel = calculateLevel(points);

  return (
    <Surface style={progressStyles.containerProgress}>
      {/* Niveau actuel */}
      <View style={progressStyles.levelHeader}>
        <View style={progressStyles.trophyContainer}>
          <IconButton icon="trophy" size={32} iconColor={theme.colors.primary} />
        </View>
        <View>
          <Text variant="titleLarge" style={progressStyles.levelTitle}>
            Niveau {currentLevel.level} - {currentLevel.name}
          </Text>
          <Text variant="bodyMedium" style={progressStyles.pointsText}>
            {points} points totaux
          </Text>
        </View>
      </View>

      {/* Barre de progression */}
      {currentLevel.nextLevel && (
        <View style={progressStyles.progressContainer}>
          <View style={progressStyles.progressHeader}>
            <Text variant="bodyMedium" style={progressStyles.progressText}>
              Progression vers niveau {currentLevel.nextLevel.level}
            </Text>
            <Text variant="bodyMedium" style={progressStyles.progressPercentage}>
              {Math.round(currentLevel.progress * 100)}%
            </Text>
          </View>
          <ProgressBar
            progress={currentLevel.progress}
            color={theme.colors.primary}
            style={progressStyles.progressBar}
          />
          <Text variant="bodySmall" style={progressStyles.remainingPoints}>
            {currentLevel.nextLevel.minPoints - points} points restants pour le prochain niveau
          </Text>
        </View>
      )}

      {/* Statistiques */}
      <View style={progressStyles.statsContainer}>
        <StatCard icon="star" label="Moyenne des notes" value="4.5" color={theme.colors.primary} />
        <StatCard icon="medal" label="Badges gagnés" value={earnedBadges.length.toString()} color={theme.colors.secondary} />
        <StatCard icon="chart-bar" label="Position" value="Top 10%" color={theme.colors.primary} />
      </View>
    </Surface>
  );
};

// Composant StatCard
const StatCard = ({ icon, label, value, color }: { icon: string; label: string; value: string; color: string }) => (
  <View style={progressStyles.statCard}>
    <IconButton icon={icon} size={24} iconColor={color} />
    <Text style={progressStyles.statValue}>{value}</Text>
    <Text style={progressStyles.statLabel}>{label}</Text>
  </View>
);


export default ProfileProgress;
