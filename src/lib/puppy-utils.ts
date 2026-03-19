import { WeightEntry } from '@/types';

export function calculateAge(dateOfBirth: string): { months: number; weeks: number; display: string } {
  const dob = new Date(dateOfBirth);
  const now = new Date();

  const totalDays = Math.floor((now.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24));
  const months = Math.floor(totalDays / 30.44);
  const weeks = Math.floor(totalDays / 7);

  let display: string;
  if (months >= 4) {
    display = `${months} months`;
  } else {
    display = `${weeks} weeks`;
  }

  return { months, weeks, display };
}

export function getLatestWeight(entries: WeightEntry[]): WeightEntry | null {
  if (entries.length === 0) return null;
  return entries.reduce((latest, entry) =>
    new Date(entry.date) > new Date(latest.date) ? entry : latest
  );
}

export function formatWeight(kg: number): string {
  return `${kg} kg`;
}
