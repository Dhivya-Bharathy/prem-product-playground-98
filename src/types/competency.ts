
export interface CompetencyArea {
  id: string;
  name: string;
  description: string;
  competencies: string[];
}

export interface Competency {
  id: string;
  name: string;
  area: string;
  description: string;
  definition: string;
}

export interface CompetencyRating {
  competencyId: string;
  rating: 1 | 2 | 3;
}

export interface Assessment {
  id: string;
  ratings: CompetencyRating[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CompetencyShape {
  productExecution: number;
  customerInsight: number;
  productStrategy: number;
  influencingPeople: number;
  competencyScores: { [key: string]: number };
}

export interface PMArchetype {
  id: string;
  name: string;
  description: string;
  strengths: string[];
  developmentAreas: string[];
  suitableRoles: string[];
  characteristics: string;
}

export interface ShapePattern {
  pattern: 'builder' | 'architect' | 'leader' | 'manager' | 'generalist' | 'specialist';
  description: string;
  traits: string[];
}

export interface AssessmentResults {
  assessment: Assessment;
  shape: CompetencyShape;
  archetype: PMArchetype;
  shapePattern: ShapePattern;
  topStrengths: string[];
  developmentAreas: string[];
  recommendations: Recommendation[];
}

export interface Recommendation {
  id: string;
  type: 'focus' | 'develop' | 'leverage' | 'role';
  title: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
}

export const COMPETENCY_AREAS: CompetencyArea[] = [
  {
    id: 'product-execution',
    name: 'Product Execution',
    description: 'The ability to build exceptional products',
    competencies: ['feature-specification', 'product-delivery', 'quality-assurance']
  },
  {
    id: 'customer-insight',
    name: 'Customer Insight',
    description: 'The ability to understand and deliver on customer needs',
    competencies: ['fluency-with-data', 'voice-of-customer', 'user-experience-design']
  },
  {
    id: 'product-strategy',
    name: 'Product Strategy',
    description: 'The ability to drive business impact via product innovation',
    competencies: ['business-outcome-ownership', 'product-vision-roadmapping', 'strategic-impact']
  },
  {
    id: 'influencing-people',
    name: 'Influencing People',
    description: 'The ability to rally people around the team\'s work',
    competencies: ['stakeholder-management', 'team-leadership', 'managing-up']
  }
];

export const COMPETENCIES: Competency[] = [
  // Product Execution
  {
    id: 'feature-specification',
    name: 'Feature Specification',
    area: 'product-execution',
    description: 'Ability to define clear, actionable feature requirements',
    definition: 'Writing detailed specs that engineers can build from without ambiguity'
  },
  {
    id: 'product-delivery',
    name: 'Product Delivery',
    area: 'product-execution',
    description: 'Shipping products on time and within scope',
    definition: 'Managing the end-to-end delivery process from concept to launch'
  },
  {
    id: 'quality-assurance',
    name: 'Quality Assurance',
    area: 'product-execution',
    description: 'Ensuring high product quality and user experience',
    definition: 'Testing, validation, and maintaining product quality standards'
  },
  // Customer Insight
  {
    id: 'fluency-with-data',
    name: 'Fluency with Data',
    area: 'customer-insight',
    description: 'Using data to make informed product decisions',
    definition: 'Analyzing metrics, conducting A/B tests, and interpreting user behavior'
  },
  {
    id: 'voice-of-customer',
    name: 'Voice of the Customer',
    area: 'customer-insight',
    description: 'Understanding and representing customer needs',
    definition: 'Conducting user research, interviews, and gathering customer feedback'
  },
  {
    id: 'user-experience-design',
    name: 'User Experience Design',
    area: 'customer-insight',
    description: 'Creating intuitive and delightful user experiences',
    definition: 'Designing user flows, wireframes, and optimizing usability'
  },
  // Product Strategy
  {
    id: 'business-outcome-ownership',
    name: 'Business Outcome Ownership',
    area: 'product-strategy',
    description: 'Taking accountability for business results',
    definition: 'Connecting product work to business metrics and revenue impact'
  },
  {
    id: 'product-vision-roadmapping',
    name: 'Product Vision & Roadmapping',
    area: 'product-strategy',
    description: 'Setting long-term product direction and strategy',
    definition: 'Creating compelling visions and translating them into actionable roadmaps'
  },
  {
    id: 'strategic-impact',
    name: 'Strategic Impact',
    area: 'product-strategy',
    description: 'Driving strategic initiatives that move the business',
    definition: 'Identifying opportunities and executing on high-impact strategic bets'
  },
  // Influencing People
  {
    id: 'stakeholder-management',
    name: 'Stakeholder Management',
    area: 'influencing-people',
    description: 'Building relationships and managing expectations',
    definition: 'Working effectively with cross-functional teams and external stakeholders'
  },
  {
    id: 'team-leadership',
    name: 'Team Leadership',
    area: 'influencing-people',
    description: 'Inspiring and guiding product teams',
    definition: 'Motivating teams, resolving conflicts, and driving collaboration'
  },
  {
    id: 'managing-up',
    name: 'Managing Up',
    area: 'influencing-people',
    description: 'Effectively communicating with leadership',
    definition: 'Presenting to executives, seeking buy-in, and managing leadership expectations'
  }
];

export const PM_ARCHETYPES: PMArchetype[] = [
  {
    id: 'project-manager',
    name: 'The Project Manager',
    description: 'Excels at execution and delivery, focuses on shipping products efficiently',
    strengths: ['Feature Specification', 'Product Delivery', 'Quality Assurance'],
    developmentAreas: ['Strategic Impact', 'Voice of the Customer', 'Product Vision'],
    suitableRoles: ['Associate PM', 'Technical PM', 'Platform PM'],
    characteristics: 'Detail-oriented, process-driven, excellent at coordination and delivery'
  },
  {
    id: 'people-manager',
    name: 'The People Manager',
    description: 'Strong at influencing and leading teams, excels at stakeholder management',
    strengths: ['Stakeholder Management', 'Team Leadership', 'Managing Up'],
    developmentAreas: ['User Experience Design', 'Strategic Impact', 'Fluency with Data'],
    suitableRoles: ['Senior PM', 'Group PM', 'Director of Product'],
    characteristics: 'Relationship-focused, excellent communicator, natural leader'
  },
  {
    id: 'growth-hacker',
    name: 'The Growth Hacker',
    description: 'Data-driven and results-oriented, focuses on metrics and business outcomes',
    strengths: ['Fluency with Data', 'Business Outcome Ownership', 'Product Delivery'],
    developmentAreas: ['User Experience Design', 'Product Vision & Roadmapping'],
    suitableRoles: ['Growth PM', 'Analytics PM', 'Performance PM'],
    characteristics: 'Analytical, experiment-driven, focused on measurable impact'
  },
  {
    id: 'product-innovator',
    name: 'The Product Innovator',
    description: 'Visionary and customer-focused, excels at strategy and innovation',
    strengths: ['Voice of the Customer', 'Product Vision & Roadmapping', 'Strategic Impact'],
    developmentAreas: ['Product Delivery', 'Quality Assurance'],
    suitableRoles: ['0-to-1 PM', 'Innovation PM', 'Chief Product Officer'],
    characteristics: 'Visionary, customer-obsessed, strategic thinker'
  }
];
