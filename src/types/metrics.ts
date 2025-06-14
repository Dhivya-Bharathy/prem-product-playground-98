
export interface MetricData {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  change: number;
  changePercentage: number;
  trend: 'up' | 'down' | 'stable';
  category: MetricCategory;
  measurementPeriod: MeasurementPeriod;
  comparisonPeriod: ComparisonPeriod;
  target?: number;
  targetDate?: string;
  periodType: 'fixed' | 'rolling' | 'custom';
}

export interface MeasurementPeriod {
  type: 'predefined' | 'custom';
  predefinedPeriod?: PredefinedPeriod;
  customRange?: {
    startDate: string;
    endDate: string;
  };
  label: string;
}

export interface ComparisonPeriod {
  type: 'previous_period' | 'same_period_last_year' | 'custom';
  label: string;
  customRange?: {
    startDate: string;
    endDate: string;
  };
}

export type PredefinedPeriod = 
  | 'last_7_days'
  | 'last_30_days'
  | 'last_90_days'
  | 'this_week'
  | 'this_month'
  | 'this_quarter'
  | 'this_year'
  | 'last_week'
  | 'last_month'
  | 'last_quarter'
  | 'last_year';

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
