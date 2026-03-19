export interface Breed {
  id: string;
  name: string;
  description: string;
  averageWeightKg: { min: number; max: number };
  lifeExpectancyYears: { min: number; max: number };
  traits: string[];
}

export interface Puppy {
  id: string;
  name: string;
  breed: Breed;
  dateOfBirth: string;
  weightKg: number;
  gender: 'male' | 'female';
  photoUrl?: string;
  notes?: string;
}

export interface WeightEntry {
  id: string;
  puppyId: string;
  date: string;
  weightKg: number;
}

export interface FeedingEntry {
  id: string;
  puppyId: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  amountGrams: number;
  notes?: string;
}

export interface Milestone {
  id: string;
  puppyId: string;
  title: string;
  description?: string;
  date: string;
  category: 'health' | 'training' | 'social' | 'growth';
}

export interface VaccinationRecord {
  id: string;
  puppyId: string;
  vaccineName: string;
  date: string;
  nextDueDate?: string;
  vetName?: string;
}
