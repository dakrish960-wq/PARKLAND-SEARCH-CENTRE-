export type ParklandCategory =
  | 'all'
  | 'parks-nature'
  | 'equestrian-trails'
  | 'sports-recreation'
  | 'schools-education'
  | 'pet-parks'
  | 'city-services'
  | 'events-markets'
  | 'rules-permits'
  | 'dining-lifestyle';

export interface ParklandItem {
  id: string;
  title: string;
  category: ParklandCategory;
  categoryLabel: string;
  tagline: string;
  description: string;
  fullDetails: string;
  address: string;
  neighborhood: string;
  hours: string;
  admission: string;
  phone: string;
  website?: string;
  rating: number;
  reviewsCount: number;
  coordinates: {
    lat: number;
    lng: number;
    mapX: number; // 0-100 percentage for interactive map
    mapY: number; // 0-100 percentage for interactive map
  };
  amenities: string[];
  features: string[];
  rules: string[];
  image: string;
  badge?: string;
  isPopular?: boolean;
  isOpenNow?: boolean;
  contactEmail?: string;
  bestTimeToVisit?: string;
}

export interface AmenityFilter {
  id: string;
  label: string;
  iconName: string;
  count: number;
}

export interface WeatherCondition {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: string;
  uvIndex: number;
  airQuality: string;
  sunset: string;
  trailStatus: 'Dry & Open' | 'Caution' | 'Closed';
}

export interface DirectoryContact {
  department: string;
  phone: string;
  emergencyPhone?: string;
  hours: string;
  address: string;
  email: string;
}

export interface EventItem {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  admission: string;
}
