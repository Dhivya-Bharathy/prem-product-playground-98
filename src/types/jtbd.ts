
export interface JTBDStatement {
  id: string;
  customerContext: string;
  job: string;
  outcome: string;
  situation: string;
  fullStatement: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JTBDCustomer {
  segment: string;
  context: string;
  painPoints: string[];
  goals: string[];
}

export interface JTBDTemplate {
  id: string;
  name: string;
  industry: string;
  category: string;
  template: string;
  example: string;
  description: string;
}

export interface JTBDExportData {
  statements: JTBDStatement[];
  exportDate: Date;
  totalCount: number;
}

export type JTBDCategory = 'functional' | 'emotional' | 'social';
export type JTBDIndustry = 'saas' | 'ecommerce' | 'healthcare' | 'finance' | 'education' | 'general';
