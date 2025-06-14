
import { CompetencyRating, COMPETENCIES } from "@/types/competency";

export const identifyTopStrengths = (ratings: CompetencyRating[]): string[] => {
  return ratings
    .filter(rating => rating.rating === 3)
    .map(rating => {
      const competency = COMPETENCIES.find(c => c.id === rating.competencyId);
      return competency?.name || '';
    })
    .filter(name => name !== '')
    .slice(0, 5);
};

export const identifyDevelopmentAreas = (ratings: CompetencyRating[]): string[] => {
  return ratings
    .filter(rating => rating.rating === 1)
    .map(rating => {
      const competency = COMPETENCIES.find(c => c.id === rating.competencyId);
      return competency?.name || '';
    })
    .filter(name => name !== '');
};
