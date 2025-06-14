
import { 
  CompetencyRating, 
  CompetencyShape, 
  PMArchetype, 
  ShapePattern, 
  AssessmentResults,
  Assessment,
  Recommendation,
  PM_ARCHETYPES,
  COMPETENCIES,
  COMPETENCY_AREAS 
} from "@/types/competency";

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

const calculateShape = (ratings: CompetencyRating[]): CompetencyShape => {
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

const identifyShapePattern = (shape: CompetencyShape): ShapePattern => {
  const { productExecution, customerInsight, productStrategy, influencingPeople } = shape;
  
  const leftSide = (productExecution + customerInsight) / 2;
  const rightSide = (productStrategy + influencingPeople) / 2;
  const topSide = (productExecution + productStrategy) / 2;
  const bottomSide = (customerInsight + influencingPeople) / 2;
  
  const variance = Math.max(productExecution, customerInsight, productStrategy, influencingPeople) - 
                   Math.min(productExecution, customerInsight, productStrategy, influencingPeople);

  if (variance > 1.0) {
    return {
      pattern: 'specialist',
      description: 'Specialist with distinct strengths in specific areas',
      traits: ['Deep expertise in key areas', 'Focused skill development', 'Clear specialization']
    };
  }

  if (leftSide > rightSide + 0.4) {
    return {
      pattern: 'builder',
      description: 'Product Builder - Strong in execution and customer insight',
      traits: ['Hands-on approach', 'Customer-focused', 'Execution-oriented']
    };
  }

  if (rightSide > leftSide + 0.4) {
    return {
      pattern: 'architect',
      description: 'Product Architect - Strong in strategy and influence',
      traits: ['Strategic thinking', 'Leadership focus', 'Vision-driven']
    };
  }

  if (bottomSide > topSide + 0.3) {
    return {
      pattern: 'leader',
      description: 'Product Leader - People and customer focused',
      traits: ['People-centric', 'Relationship builder', 'Customer advocate']
    };
  }

  if (topSide > bottomSide + 0.3) {
    return {
      pattern: 'manager',
      description: 'Product Manager - Execution and strategy focused',
      traits: ['Process-oriented', 'Results-driven', 'Strategic executor']
    };
  }

  return {
    pattern: 'generalist',
    description: 'Balanced Generalist - Well-rounded across all areas',
    traits: ['Versatile skill set', 'Adaptable approach', 'Broad competency base']
  };
};

const identifyArchetype = (shape: CompetencyShape, ratings: CompetencyRating[]): PMArchetype => {
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

const identifyTopStrengths = (ratings: CompetencyRating[]): string[] => {
  return ratings
    .filter(rating => rating.rating === 3)
    .map(rating => {
      const competency = COMPETENCIES.find(c => c.id === rating.competencyId);
      return competency?.name || '';
    })
    .filter(name => name !== '')
    .slice(0, 5);
};

const identifyDevelopmentAreas = (ratings: CompetencyRating[]): string[] => {
  return ratings
    .filter(rating => rating.rating === 1)
    .map(rating => {
      const competency = COMPETENCIES.find(c => c.id === rating.competencyId);
      return competency?.name || '';
    })
    .filter(name => name !== '');
};

const generateRecommendations = (
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
  const highest = areas.reduce((max, area) => area.score > max.score ? area : max);

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
