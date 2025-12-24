
export enum CategoryType {
  URGENCES = 'Urgences',
  SANTE = 'Santé',
  DEPANNAGE = 'Dépannage',
  QUOTIDIEN = 'Services du quotidien',
  ADMINISTRATION = 'Administrations'
}

export enum SubscriptionPlan {
  FREE = 'FREE',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM'
}

export interface PlanDetails {
  id: SubscriptionPlan;
  name: string;
  price: string;
  limit: number;
  features: string[];
}

export const PLANS: Record<SubscriptionPlan, PlanDetails> = {
  [SubscriptionPlan.FREE]: {
    id: SubscriptionPlan.FREE,
    name: 'Découverte',
    price: '0 CFA',
    limit: 4,
    features: ['4 contacts / jour', 'Urgences illimitées', 'Annonces publiques']
  },
  [SubscriptionPlan.STANDARD]: {
    id: SubscriptionPlan.STANDARD,
    name: 'Privilège',
    price: '2.000 CFA',
    limit: 50,
    features: ['50 contacts / jour', 'Favoris illimités', 'Sans publicité', 'Support standard']
  },
  [SubscriptionPlan.PREMIUM]: {
    id: SubscriptionPlan.PREMIUM,
    name: 'Illimité',
    price: '5.000 CFA',
    limit: -1,
    features: ['Contacts illimités', 'Badge "Membre Or"', 'Accès prioritaire', 'Support 24h/7j']
  }
};

export interface Contact {
  id: string;
  name: string;
  category: CategoryType;
  subCategory: string;
  phone: string;
  whatsapp?: string;
  location: string;
  city: string;
  description: string;
  isVerified: boolean;
  isPremium: boolean;
  coordinates?: { lat: number; lng: number; };
  rating?: number;
  reviewsCount?: number;
}

export interface UserState {
  plan: SubscriptionPlan;
  isLoggedIn: boolean;
  emailOrPhone?: string;
  favorites: string[];
  dailyContacts: {
    count: number;
    lastReset: string;
  };
}
