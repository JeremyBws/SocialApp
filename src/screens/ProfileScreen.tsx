import React from 'react';
import { View, ScrollView } from 'react-native';
import { Surface, Text, IconButton } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import ProfileProgress from '../components/profile/ProfilesProgress';
import { DrawerScreenProps } from '../types/navigation';
import { profileStyles } from '../styles/profileStyles';
import { theme } from '../theme/themes';
import { useUserProgress } from '../hooks/useUserProgress';
import { SYMBOLS } from '../types/symbols';
import { ILogger, IPointsService } from '../types/interfaces';
import { useInjection } from 'inversify-react';
import { PointsService } from '../services/pointsService';

type ProfileScreenProps = DrawerScreenProps<'Profil'>;

interface StatItemProps {
  value: number;
  label: string;
  icon: string;
  iconColor: string;
}

interface BadgeProps {
  title: string;
  criteria: string;
  icon: string;
  isLocked?: boolean;
}

interface PreferenceItemProps {
  title: string;
  onPress: () => void;
}

interface UserStats {
  favorites: number;
  toTry: number;
  badges: number;
  points: number;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, icon, iconColor }) => (
  <View style={profileStyles.statItem}>
    <IconButton icon={icon} size={24} iconColor={iconColor} />
    <Text style={profileStyles.statValue}>{value}</Text>
    <Text style={profileStyles.statLabel}>{label}</Text>
  </View>
);

const BadgeCard: React.FC<BadgeProps> = ({ title, criteria, icon, isLocked = true }) => (
  <Surface style={profileStyles.badgeCard}>
    <IconButton 
      icon={isLocked ? "lock" : icon} 
      size={32} 
      iconColor={isLocked ? theme.colors.textSubtle : theme.colors.primary} 
    />
    <Text style={profileStyles.badgeTitle}>{title}</Text>
    <Text style={profileStyles.badgeCriteria}>{criteria}</Text>
  </Surface>
);

const PreferenceItem: React.FC<PreferenceItemProps> = ({ title, onPress }) => (
  <Surface style={profileStyles.preferenceItem}>
    <Text>{title}</Text>
    <IconButton icon="chevron-right" size={24} onPress={onPress} />
  </Surface>
);



  const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
    const pointsService = useInjection<IPointsService>(SYMBOLS.PointsService);
    const logger = useInjection<ILogger>(SYMBOLS.Logger);
    const {
      points,
      level,
      favorites,
      wishlist,
      refreshUserData
    } = useUserProgress('userId');
  
    const userStats: UserStats = {
      favorites: favorites.length,
      toTry: wishlist.length,
      badges: 4,
      points: points
    };

  const availableBadges: BadgeProps[] = [
    {
      title: "Explorateur",
      criteria: "Visitez 5 restaurants",
      icon: "compass",
      isLocked: true
    },
    {
      title: "Gourmet",
      criteria: "Notez 10 restaurants",
      icon: "star",
      isLocked: true
    },
    {
      title: "Social",
      criteria: "Partagez 3 restaurants",
      icon: "share",
      isLocked: true
    },
    {
      title: "Expert",
      criteria: "Atteignez niveau 5",
      icon: "trophy",
      isLocked: true
    }
  ];

  return (
    <ScrollView style={profileStyles.containerProfile}>
      <Surface style={profileStyles.headerCard}>
        <View style={profileStyles.profileHeader}>
        <Avatar.Image
 size={80}
 source={require('../../assets/default_avatar.png')}
 style={profileStyles.avatar}
/>
          <Text style={profileStyles.userName}>Utilisateur</Text>
          <View style={profileStyles.onlineStatus} />
        </View>

        <View style={profileStyles.statsRow}>
          <StatItem 
            value={userStats.favorites} 
            label="Favoris" 
            icon="heart"
            iconColor={theme.colors.primary}
          />
          <StatItem 
            value={userStats.toTry} 
            label="À tester" 
            icon="bookmark"
            iconColor={theme.colors.primary}
          />
          <StatItem 
            value={userStats.badges} 
            label="Badges" 
            icon="medal"
            iconColor={theme.colors.primary}
          />
        </View>
      </Surface>

      <View style={profileStyles.section}>
        <View style={profileStyles.sectionHeader}>
          <Text style={profileStyles.sectionTitle}>Badges & Récompenses</Text>
          <Text style={profileStyles.badgesCount}>{userStats.badges} badges disponibles</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {availableBadges.map((badge, index) => (
            <BadgeCard key={index} {...badge} />
          ))}
        </ScrollView>
      </View>

      <View style={profileStyles.section}>
        <Text style={profileStyles.sectionTitle}>Préférences</Text>
        <PreferenceItem 
          title="Régimes alimentaires" 
          onPress={() => navigation.navigate('Settings')}
        />
        <PreferenceItem 
          title="Centres d'intérêt" 
          onPress={() => navigation.navigate('Settings')}
        />
      </View>

      <ProfileProgress points={userStats.points} earnedBadges={[]} />
    </ScrollView>
  );
};

export default ProfileScreen;