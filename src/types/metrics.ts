
export interface MetricData {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  change: number;
  changePercentage: number;
  trend: 'up' | 'down' | 'stable';
  category: MetricCategory;
  period: string;
  target?: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface MetricCard {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  data: ChartDataPoint[];
}

export type MetricCategory = 
  | 'acquisition' 
  | 'activation' 
  | 'retention' 
  | 'revenue' 
  | 'referral' 
  | 'engagement';

export interface MetricConfig {
  category: MetricCategory;
  metrics: {
    name: string;
    description: string;
    formula?: string;
    benchmark?: string;
  }[];
}
