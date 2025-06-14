
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
  const archetype = identifyArchetype(shape, shapePattern);
  const topStrengths = identifyTopStrengths(ratings);
  const developmentAreas = identifyDevelopmentAreas(ratings);
  const recommendations = generateRecommendations(shape, archetype, topStrengths, developmentAreas);

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

  // Calculate area averages
  const productExecution = COMPETENCY_AREAS[0].competencies.reduce((sum, compId) => {
    const competency = COMPETENCIES.find(c => c.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '') === compId);
    return sum + (competency ? (competencyScores[competency.id] || 1) : 1);
  }, 0) / 3;

  const customerInsight = COMPETENCY_AREAS[1].competencies.reduce((sum, compId) => {
    const competency = COMPETENCIES.find(c => c.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '') === compId);
    return sum + (competency ? (competencyScores[competency.id] || 1) : 1);
  }, 0) / 3;

  const productStrategy = COMPETENCY_AREAS[2].competencies.reduce((sum, compId) => {
    const competency = COMPETENCIES.find(c => c.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '') === compId);
    return sum + (competency ? (competencyScores[competency.id] || 1) : 1);
  }, 0) / 3;

  const influencingPeople = COMPETENCY_AREAS[3].competencies.reduce((sum, compId) => {
    const competency = COMPETENCIES.find(c => c.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '') === compId);
    return sum + (competency ? (competencyScores[competency.id] || 1) : 1);
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

  if (leftSide > rightSide + 0.5) {
    return {
      pattern: 'builder',
      description: 'Product Builder - Strong in execution and customer insight',
      traits: ['Hands-on approach', 'Customer-focused', 'Execution-oriented']
    };
  }

  if (rightSide > leftSide + 0.5) {
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

const identifyArchetype = (shape: CompetencyShape, shapePattern: ShapePattern): PMArchetype => {
  const { productExecution, customerInsight, productStrategy, influencingPeople } = shape;

  // Score each archetype based on shape match
  const archetypeScores = PM_ARCHETYPES.map(archetype => {
    let score = 0;
    
    switch (archetype.id) {
      case 'project-manager':
        score = productExecution * 2 + (3 - customerInsight) + (3 - productStrategy);
        break;
      case 'people-manager':
        score = influencingPeople * 2 + (3 - customerInsight) + (3 - productStrategy);
        break;
      case 'growth-hacker':
        score = customerInsight * 1.5 + productExecution + (3 - influencingPeople);
        break;
      case 'product-innovator':
        score = productStrategy * 1.5 + customerInsight * 1.5 + (3 - productExecution);
        break;
    }
    
    return { archetype, score };
  });

  // Return the archetype with the highest score
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
  developmentAreas: string[]
): Recommendation[] => {
  const recommendations: Recommendation[] = [];

  // Add strength-based recommendations
  if (topStrengths.length > 0) {
    recommendations.push({
      id: 'leverage-strengths',
      type: 'leverage',
      title: 'Leverage Your Strengths',
      description: `You excel at ${topStrengths.join(', ')}. Use these as your differentiators.`,
      action: `Seek roles and projects that heavily utilize ${topStrengths[0]} and volunteer to lead initiatives in these areas.`,
      priority: 'high'
    });
  }

  // Add development recommendations
  if (developmentAreas.length > 0) {
    recommendations.push({
      id: 'focus-development',
      type: 'develop',
      title: 'Priority Development Areas',
      description: `Focus on improving ${developmentAreas.slice(0, 2).join(' and ')} to become more well-rounded.`,
      action: `Create a 90-day plan to build skills in ${developmentAreas[0]}. Consider finding a mentor or taking a course.`,
      priority: 'high'
    });
  }

  // Add archetype-specific recommendations
  recommendations.push({
    id: 'archetype-alignment',
    type: 'role',
    title: 'Role Alignment',
    description: `As ${archetype.name}, you're well-suited for ${archetype.suitableRoles.join(', ')} roles.`,
    action: `Look for opportunities in ${archetype.suitableRoles[0]} positions that align with your natural strengths.`,
    priority: 'medium'
  });

  // Add balance recommendations based on shape
  const areas = ['productExecution', 'customerInsight', 'productStrategy', 'influencingPeople'];
  const lowest = areas.reduce((min, area) => 
    shape[area as keyof CompetencyShape] < shape[min as keyof CompetencyShape] ? area : min
  );

  const areaNames = {
    productExecution: 'Product Execution',
    customerInsight: 'Customer Insight', 
    productStrategy: 'Product Strategy',
    influencingPeople: 'Influencing People'
  };

  recommendations.push({
    id: 'balance-improvement',
    type: 'focus',
    title: 'Balance Your Profile',
    description: `Your ${areaNames[lowest as keyof typeof areaNames]} area has the most room for growth.`,
    action: `Dedicate 20% of your learning time to building competencies in ${areaNames[lowest as keyof typeof areaNames]}.`,
    priority: 'medium'
  });

  return recommendations;
};
