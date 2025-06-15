
export interface UserStory {
  id: string;
  userType: string;
  goal: string;
  benefit: string;
  fullStory: string;
  priority: 'high' | 'medium' | 'low';
  complexity: 'simple' | 'moderate' | 'complex';
  acceptanceCriteria: string[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserStoryTemplate {
  id: string;
  name: string;
  category: string;
  industry: string;
  priority: 'high' | 'medium' | 'low';
  complexity: 'simple' | 'moderate' | 'complex';
  template: string;
  example: string;
  acceptanceCriteria: string[];
  description: string;
}

export interface UserStoryExportData {
  stories: UserStory[];
  exportDate: Date;
  totalCount: number;
}
