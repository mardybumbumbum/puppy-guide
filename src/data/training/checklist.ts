export interface ChecklistItem {
  id: string
  category: 'socialization' | 'commands' | 'environment' | 'behavior'
  titlePl: string
  titleEn: string
  descriptionPl: string
  descriptionEn: string
  minWeeks: number
  maxWeeks: number
}

export const CHECKLIST: ChecklistItem[] = [
  // Socialization (8-16 weeks)
  { id: 's1', category: 'socialization', titlePl: 'Poznawanie ludzi', titleEn: 'Meeting people', descriptionPl: 'Oswajaj szczeniaka z różnymi typami ludzi', descriptionEn: 'Expose puppy to different types of people', minWeeks: 8, maxWeeks: 16 },
  { id: 's2', category: 'socialization', titlePl: 'Poznawanie innych psów', titleEn: 'Meeting other dogs', descriptionPl: 'Spotkania z zaszczepionymi psami', descriptionEn: 'Meetings with vaccinated dogs', minWeeks: 10, maxWeeks: 20 },
  { id: 's3', category: 'socialization', titlePl: 'Komunikacja miejska', titleEn: 'Public transport', descriptionPl: 'Oswajanie z autobusami, tramwajami, metrem', descriptionEn: 'Getting comfortable with buses, trams, metro', minWeeks: 12, maxWeeks: 24 },
  { id: 's4', category: 'socialization', titlePl: 'Jazda samochodem', titleEn: 'Car rides', descriptionPl: 'Oswajanie z podróżami samochodem', descriptionEn: 'Getting comfortable with car travel', minWeeks: 8, maxWeeks: 20 },
  // Commands (10-52 weeks)
  { id: 'c1', category: 'commands', titlePl: 'Siad', titleEn: 'Sit', descriptionPl: 'Podstawowa komenda posłuszeństwa', descriptionEn: 'Basic obedience command', minWeeks: 10, maxWeeks: 20 },
  { id: 'c2', category: 'commands', titlePl: 'Zostań', titleEn: 'Stay', descriptionPl: 'Nauka pozostawania w miejscu', descriptionEn: 'Learning to stay in place', minWeeks: 12, maxWeeks: 24 },
  { id: 'c3', category: 'commands', titlePl: 'Do mnie', titleEn: 'Come', descriptionPl: 'Przychodzenie na wezwanie', descriptionEn: 'Coming when called', minWeeks: 10, maxWeeks: 20 },
  { id: 'c4', category: 'commands', titlePl: 'Stop / Nie', titleEn: 'Stop / No', descriptionPl: 'Zatrzymanie niepożądanego zachowania', descriptionEn: 'Stopping unwanted behavior', minWeeks: 12, maxWeeks: 24 },
  { id: 'c5', category: 'commands', titlePl: 'Waruj', titleEn: 'Down', descriptionPl: 'Komenda leżenia', descriptionEn: 'Lie down command', minWeeks: 14, maxWeeks: 28 },
  { id: 'c6', category: 'commands', titlePl: 'Chód przy nodze', titleEn: 'Heel', descriptionPl: 'Chodzenie przy nodze bez szarpania', descriptionEn: 'Walking without pulling', minWeeks: 16, maxWeeks: 36 },
  // Environment (8-24 weeks)
  { id: 'e1', category: 'environment', titlePl: 'Oswajanie z dźwiękami', titleEn: 'Sound desensitization', descriptionPl: 'Przyzwyczajenie do głośnych dźwięków', descriptionEn: 'Getting used to loud sounds', minWeeks: 8, maxWeeks: 16 },
  { id: 'e2', category: 'environment', titlePl: 'Samodzielność', titleEn: 'Separation training', descriptionPl: 'Nauka zostawania samemu w domu', descriptionEn: 'Learning to be alone at home', minWeeks: 10, maxWeeks: 24 },
  { id: 'e3', category: 'environment', titlePl: 'Klatka / legowisko', titleEn: 'Crate training', descriptionPl: 'Pozytywne kojarzenie klatki lub legowiska', descriptionEn: 'Positive association with crate or bed', minWeeks: 8, maxWeeks: 16 },
  // Behavior (12-52 weeks)
  { id: 'b1', category: 'behavior', titlePl: 'Czystość w domu', titleEn: 'House training', descriptionPl: 'Nauka załatwiania potrzeb na zewnątrz', descriptionEn: 'Learning to go outside for toilet', minWeeks: 8, maxWeeks: 20 },
  { id: 'b2', category: 'behavior', titlePl: 'Gryzienie — kontrola', titleEn: 'Bite inhibition', descriptionPl: 'Nauka delikatnego gryzienia', descriptionEn: 'Learning gentle biting', minWeeks: 8, maxWeeks: 16 },
  { id: 'b3', category: 'behavior', titlePl: 'Smycz', titleEn: 'Leash walking', descriptionPl: 'Oswajanie ze smyczą i obrożą', descriptionEn: 'Getting comfortable with leash and collar', minWeeks: 10, maxWeeks: 20 },
]
