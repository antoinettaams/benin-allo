import { CategoryType } from '@/app/lib/type';

export type ServiceSuggestion = {
  category: CategoryType;
  explanation: string;
};

const KEYWORDS_MAP: Record<CategoryType, string[]> = {
  [CategoryType.URGENCES]: [
    'urgence',
    'police',
    'pompier',
    'feu',
    'incendie',
    'accident',
    'ambulance',
    'gendarmerie'
  ],
  [CategoryType.SANTE]: [
    'pharmacie',
    'hôpital',
    'hopital',
    'docteur',
    'médecin',
    'medecin',
    'clinique',
    'santé'
  ],
  [CategoryType.DEPANNAGE]: [
    'plombier',
    'électricien',
    'electricien',
    'mécanicien',
    'mecanicien',
    'réparation',
    'reparation',
    'dépannage',
    'depannage'
  ],
  [CategoryType.QUOTIDIEN]: [
    'coiffeur',
    'restaurant',
    'pressing',
    'couturier',
    'livraison',
    'ménage',
    'menage'
  ],
  [CategoryType.ADMINISTRATION]: [
    'mairie',
    'préfecture',
    'prefecture',
    'impôt',
    'impot',
    'administration',
    'document',
    'acte'
  ]
};

const findRightService = (query: string): ServiceSuggestion | null => {
  const text = query.toLowerCase();

  for (const [category, keywords] of Object.entries(KEYWORDS_MAP)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return {
        category: category as CategoryType,
        explanation:
          "Nous avons identifié automatiquement le service le plus adapté à votre recherche."
      };
    }
  }

  return null;
};

export default findRightService;
