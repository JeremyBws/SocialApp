export interface UserBadge {
    id: string;
    name: string;
    description: string;
    icon: string;
    requiredPoints: number;
    category: 'reviews' | 'visits' | 'social' | 'special';
  }
  
  export interface UserProfile {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    level: number;
    points: {
      total: number;
      reviews: number;
      visits: number;
      social: number;
    };
    badges: string[];
    favorites: string[];
    wishlist: string[];
    reviews: number;
    visited: string[];
    following: string[];
    followers: string[];
  }
  
  export const BADGES: UserBadge[] = [
    {
      id: 'gourmet_lvl1',
      name: 'Gourmet Débutant',
      description: 'A visité 5 restaurants',
      icon: 'silverware',
      requiredPoints: 100,
      category: 'visits'
    },
    {
      id: 'critic_lvl1',
      name: 'Critique Culinaire',
      description: 'A publié 10 avis',
      icon: 'pencil',
      requiredPoints: 200,
      category: 'reviews'
    },
    // ... autres badges
  ];