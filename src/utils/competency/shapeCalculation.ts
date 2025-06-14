
import { CompetencyRating, CompetencyShape } from "@/types/competency";

export const calculateShape = (ratings: CompetencyRating[]): CompetencyShape => {
  const competencyScores: { [key: string]: number } = {};
  ratings.forEach(rating => {
    competencyScores[rating.competencyId] = rating.rating;
  });

  // Calculate area averages using exact competency IDs
  const productExecutionComps = ['feature-specification', 'product-delivery', 'quality-assurance'];
  const customerInsightComps = ['fluency-with-data', 'voice-of-customer', 'user-experience-design'];
  const productStrategyComps = ['business-outcome-ownership', 'product-vision-roadmapping', 'strategic-impact'];
  const influencingPeopleComps = ['stakeholder-management', 'team-leadership', 'managing-up'];

  const productExecution = productExecutionComps.reduce((sum, compId) => {
    return sum + (competencyScores[compId] || 1);
  }, 0) / 3;

  const customerInsight = customerInsightComps.reduce((sum, compId) => {
    return sum + (competencyScores[compId] || 1);
  }, 0) / 3;

  const productStrategy = productStrategyComps.reduce((sum, compId) => {
    return sum + (competencyScores[compId] || 1);
  }, 0) / 3;

  const influencingPeople = influencingPeopleComps.reduce((sum, compId) => {
    return sum + (competencyScores[compId] || 1);
  }, 0) / 3;

  return {
    productExecution,
    customerInsight,
    productStrategy,
    influencingPeople,
    competencyScores
  };
};
