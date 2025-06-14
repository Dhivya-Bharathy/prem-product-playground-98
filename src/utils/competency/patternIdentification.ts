
import { CompetencyShape, ShapePattern } from "@/types/competency";

export const identifyShapePattern = (shape: CompetencyShape): ShapePattern => {
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
