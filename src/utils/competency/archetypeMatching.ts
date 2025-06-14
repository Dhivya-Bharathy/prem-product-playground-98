
import { CompetencyShape, CompetencyRating, PMArchetype, PM_ARCHETYPES } from "@/types/competency";

export const identifyArchetype = (shape: CompetencyShape, ratings: CompetencyRating[]): PMArchetype => {
  const { productExecution, customerInsight, productStrategy, influencingPeople } = shape;

  // Count high scores (3s) in each area
  const getHighScoresInArea = (areaCompetencies: string[]) => {
    return areaCompetencies.filter(compId => {
      const rating = ratings.find(r => r.competencyId === compId);
      return rating && rating.rating === 3;
    }).length;
  };

  const executionHighs = getHighScoresInArea(['feature-specification', 'product-delivery', 'quality-assurance']);
  const customerHighs = getHighScoresInArea(['fluency-with-data', 'voice-of-customer', 'user-experience-design']);
  const strategyHighs = getHighScoresInArea(['business-outcome-ownership', 'product-vision-roadmapping', 'strategic-impact']);
  const influenceHighs = getHighScoresInArea(['stakeholder-management', 'team-leadership', 'managing-up']);

  // Score each archetype based on both averages and high scores
  const archetypeScores = PM_ARCHETYPES.map(archetype => {
    let score = 0;
    
    switch (archetype.id) {
      case 'project-manager':
        score = (productExecution * 2) + (executionHighs * 0.5) - (productStrategy * 0.5) - (customerInsight * 0.3);
        break;
      case 'people-manager':
        score = (influencingPeople * 2) + (influenceHighs * 0.5) - (customerInsight * 0.3) - (productExecution * 0.2);
        break;
      case 'growth-hacker':
        score = (customerInsight * 1.5) + (productExecution * 1.2) + (customerHighs * 0.5) - (influencingPeople * 0.3);
        break;
      case 'product-innovator':
        score = (productStrategy * 1.5) + (customerInsight * 1.3) + (strategyHighs * 0.5) - (productExecution * 0.2);
        break;
    }
    
    return { archetype, score };
  });

  const bestMatch = archetypeScores.reduce((best, current) => 
    current.score > best.score ? current : best
  );

  return bestMatch.archetype;
};
