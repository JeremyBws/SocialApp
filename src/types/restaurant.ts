import { Timestamp, GeoPoint } from 'firebase/firestore';

// Interface pour les périodes d'ouverture
export interface OpeningPeriod {
  open: {
    day: number;
    time: string;
  };
  close: {
    day: number;
    time: string;
  };
}

// Interface pour les détails retournés par Google Places API
export interface GooglePlaceDetails {
  formatted_phone_number?: string;
  vicinity?: string;
  rating?: number;
  price_level?: number;
  opening_hours?: {
    periods?: OpeningPeriod[];
    weekday_text?: string[];
  };
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  types?: string[];
}

// Interface pour les résultats de recherche Google Places
export interface GooglePlaceResult {
  place_id: string;
  name: string;
  vicinity?: string;
  rating?: number;
  price_level?: number;
  types?: string[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  opening_hours?: {
    periods?: OpeningPeriod[];
    weekday_text?: string[];
  };
  formatted_phone_number?: string;
  formatted_address?: string;
}

// Interface pour la réponse de l'API Google Places
export interface GooglePlacesAPIResponse {
  status: string;
  results: GooglePlaceResult[];
  result?: GooglePlaceResult;
}

export interface RestaurantWithDistance extends Restaurant {
  distance: number;
}

// Interface principale pour les restaurants dans notre application
export interface Restaurant {
  id: string;
  googlePlaceId: string;
  name: string;
  address: string;
  location: GeoPoint;
  rating: number;
  priceLevel?: number;
  cuisine: string;
  photos: string[];
  phoneNumber?: string;
  openingHours?: {
    periods: Array<{
      open: { day: number; time: string };
      close: { day: number; time: string };
    }>;
    weekdayText: string[];
  };
  lastUpdated: Timestamp;
}


// Types pour le niveau de prix
export type PriceLevel = 0 | 1 | 2 | 3 | 4;

// Fonction utilitaire pour convertir le price_level en symboles €
export const getPriceSymbol = (priceLevel?: number): string => {
  if (priceLevel === undefined) return 'Non spécifié';
  switch (priceLevel) {
    case 0:
      return '€';
    case 1:
      return '€';
    case 2:
      return '€€';
    case 3:
      return '€€€';
    case 4:
      return '€€€€';
    default:
      return 'Non spécifié';
  }
};


export interface RestaurantPhoto {
    id: string;
    url: string;
    userId: string;
    date: Date;
    likes: number;
  }
  
  // Pour l'instant, on va simuler une galerie avec des photos de nourriture
  export const MOCK_FOOD_PHOTOS: RestaurantPhoto[] = [
    {
        id: '1',
        url: 'https://images.unsplash.com/photo-1512058564366-c9e682d30e9e', 
        userId: 'user1',
        date: new Date(),
        likes: 45
    },
    {
        id: '2',
        url: 'https://images.unsplash.com/photo-1498579809087-ef1e558fd1da',
        userId: 'user2',
        date: new Date(),
        likes: 38
    },
    {
        id: '3',
        url: 'https://images.unsplash.com/photo-1525708827929-67dbbb5a74f8',
        userId: 'user3',
        date: new Date(),
        likes: 52
    },
    {
        id: '4',
        url: 'https://images.unsplash.com/photo-1572859948924-fd64f6b4d5f9',
        userId: 'user4',
        date: new Date(),
        likes: 61
    },
    {
        id: '5',
        url: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0',
        userId: 'user5',
        date: new Date(),
        likes: 29
    },
    {
        id: '6',
        url: 'https://images.unsplash.com/photo-1544510808-4ca5c1213452',
        userId: 'user6',
        date: new Date(),
        likes: 87
    },
    {
        id: '7',
        url: 'https://images.unsplash.com/photo-1512428559087-a5e32b9b03c0',
        userId: 'user7',
        date: new Date(),
        likes: 42
    },
    {
        id: '8',
        url: 'https://images.unsplash.com/photo-1555992336-dc8b0dd3800f',
        userId: 'user8',
        date: new Date(),
        likes: 53
    },
    {
        id: '9',
        url: 'https://images.unsplash.com/photo-1516684669134-de6f6eb5af60',
        userId: 'user9',
        date: new Date(),
        likes: 64
    },
    {
        id: '10',
        url: 'https://images.unsplash.com/photo-1562967916-eb82221dfb36',
        userId: 'user10',
        date: new Date(),
        likes: 34
    },
    {
        id: '11',
        url: 'https://images.unsplash.com/photo-1553621042-f6e147245754',
        userId: 'user11',
        date: new Date(),
        likes: 48
    },
    {
        id: '12',
        url: 'https://images.unsplash.com/photo-1559622216-eb5e1e5d0f27',
        userId: 'user12',
        date: new Date(),
        likes: 72
    },
    {
        id: '13',
        url: 'https://images.unsplash.com/photo-1516126491303-6c93fefb8fc5',
        userId: 'user13',
        date: new Date(),
        likes: 58
    },
    {
        id: '14',
        url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
        userId: 'user14',
        date: new Date(),
        likes: 93
    },
    {
        id: '15',
        url: 'https://images.unsplash.com/photo-1512058564366-c9e682d30e9e',
        userId: 'user15',
        date: new Date(),
        likes: 67
    },
    {
        id: '16',
        url: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        userId: 'user16',
        date: new Date(),
        likes: 40
    },
    {
        id: '17',
        url: 'https://images.unsplash.com/photo-1558036117-4f03a2d078e0',
        userId: 'user17',
        date: new Date(),
        likes: 57
    },
    {
        id: '18',
        url: 'https://images.unsplash.com/photo-1516684669134-de6f6eb5af60',
        userId: 'user18',
        date: new Date(),
        likes: 83
    },
    {
        id: '19',
        url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1',
        userId: 'user19',
        date: new Date(),
        likes: 47
    },
    {
        id: '20',
        url: 'https://images.unsplash.com/photo-1555992336-03a23c3b5a4f',
        userId: 'user20',
        date: new Date(),
        likes: 65
    }
];