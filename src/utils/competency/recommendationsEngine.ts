
import { 
  CompetencyShape, 
  PMArchetype, 
  CompetencyRating, 
  Recommendation 
} from "@/types/competency";

export const generateRecommendations = (
  shape: CompetencyShape, 
  archetype: PMArchetype, 
  topStrengths: string[], 
  developmentAreas: string[],
  ratings: CompetencyRating[]
): Recommendation[] => {
  const recommendations: Recommendation[] = [];

  // Add strength-based recommendations
  if (topStrengths.length > 0) {
    recommendations.push({
      id: 'leverage-strengths',
      type: 'leverage',
      title: 'Leverage Your Strengths',
      description: `You excel at ${topStrengths.slice(0, 3).join(', ')}. These are your competitive advantages.`,
      action: `Seek projects that heavily utilize ${topStrengths[0]} and volunteer to mentor others in these areas. Consider specializing further in your strongest domain.`,
      priority: 'high'
    });
  }

  // Add development recommendations based on actual low scores
  if (developmentAreas.length > 0) {
    const criticalGaps = developmentAreas.slice(0, 2);
    recommendations.push({
      id: 'focus-development',
      type: 'develop',
      title: 'Critical Development Areas',
      description: `Focus on improving ${criticalGaps.join(' and ')} as these gaps may limit your effectiveness.`,
      action: `Create a 90-day improvement plan for ${criticalGaps[0]}. Find a mentor, take a course, or seek stretch assignments in this area.`,
      priority: 'high'
    });
  }

  // Add archetype-specific recommendations
  recommendations.push({
    id: 'archetype-alignment',
    type: 'role',
    title: `${archetype.name} Career Path`,
    description: `Your profile aligns with ${archetype.name} roles. Focus on positions that leverage your natural strengths.`,
    action: `Target ${archetype.suitableRoles.slice(0, 2).join(' or ')} positions. Highlight your ${archetype.strengths.slice(0, 2).join(' and ')} skills in interviews.`,
    priority: 'medium'
  });

  // Add specific recommendations based on shape balance
  const { productExecution, customerInsight, productStrategy, influencingPeople } = shape;
  const areas = [
    { name: 'Product Execution', score: productExecution, key: 'productExecution' },
    { name: 'Customer Insight', score: customerInsight, key: 'customerInsight' },
    { name: 'Product Strategy', score: productStrategy, key: 'productStrategy' },
    { name: 'Influencing People', score: influencingPeople, key: 'influencingPeople' }
  ];

  const lowest = areas.reduce((min, area) => area.score < min.score ? area : min);

  if (lowest.score < 1.8) {
    recommendations.push({
      id: 'balance-improvement',
      type: 'focus',
      title: `Strengthen ${lowest.name}`,
      description: `Your ${lowest.name} area (${lowest.score.toFixed(1)}/3.0) needs the most attention to become a well-rounded PM.`,
      action: `Dedicate 30% of your learning time to ${lowest.name} skills. Consider finding a buddy or mentor strong in this area.`,
      priority: 'medium'
    });
  }

  return recommendations;
};
