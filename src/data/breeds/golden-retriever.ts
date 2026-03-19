import { Breed } from '@/types';

export const goldenRetriever: Breed = {
  id: 'golden-retriever',
  name: 'Golden Retriever',
  description: 'A friendly, reliable, and trustworthy sporting dog known for its dense, lustrous golden coat and eager-to-please temperament.',
  averageWeightKg: { min: 25, max: 34 },
  lifeExpectancyYears: { min: 10, max: 12 },
  traits: ['friendly', 'reliable', 'trustworthy', 'kind', 'intelligent', 'confident'],
};
