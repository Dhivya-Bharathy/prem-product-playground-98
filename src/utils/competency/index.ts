
import { 
  CompetencyRating, 
  AssessmentResults,
  Assessment
} from "@/types/competency";
import { calculateShape } from "./shapeCalculation";
import { identifyShapePattern } from "./patternIdentification";
import { identifyArchetype } from "./archetypeMatching";
import { identifyTopStrengths, identifyDevelopmentAreas } from "./strengthsAnalysis";
import { generateRecommendations } from "./recommendationsEngine";

export const analyzeCompetencies = (ratings: CompetencyRating[]): AssessmentResults => {
  const assessment: Assessment = {
    id: Date.now().toString(),
    ratings,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const shape = calculateShape(ratings);
  const shapePattern = identifyShapePattern(shape);
  const archetype = identifyArchetype(shape, ratings);
  const topStrengths = identifyTopStrengths(ratings);
  const developmentAreas = identifyDevelopmentAreas(ratings);
  const recommendations = generateRecommendations(shape, archetype, topStrengths, developmentAreas, ratings);

  return {
    assessment,
    shape,
    archetype,
    shapePattern,
    topStrengths,
    developmentAreas,
    recommendations
  };
};

// Re-export individual functions for direct use if needed
export { calculateShape } from "./shapeCalculation";
export { identifyShapePattern } from "./patternIdentification";
export { identifyArchetype } from "./archetypeMatching";
export { identifyTopStrengths, identifyDevelopmentAreas } from "./strengthsAnalysis";
export { generateRecommendations } from "./recommendationsEngine";
