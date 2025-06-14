
export interface DVFScore {
  desirability: number;
  viability: number;
  feasibility: number;
}

export interface DVFEvaluation {
  id: string;
  title: string;
  description: string;
  scores: DVFScore;
  totalScore: number;
  recommendation: 'proceed' | 'improve' | 'pause' | 'stop';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DVFCriteria {
  dimension: 'desirability' | 'viability' | 'feasibility';
  factors: string[];
  questions: string[];
}

export interface DVFTemplate {
  id: string;
  name: string;
  description: string;
  criteria: DVFCriteria[];
  industry?: string;
}
