
import { PredefinedPeriod, MeasurementPeriod, ComparisonPeriod } from "@/types/metrics";

export const PREDEFINED_PERIODS: { value: PredefinedPeriod; label: string }[] = [
  { value: 'last_7_days', label: 'Last 7 days' },
  { value: 'last_30_days', label: 'Last 30 days' },
  { value: 'last_90_days', label: 'Last 90 days' },
  { value: 'this_week', label: 'This week' },
  { value: 'this_month', label: 'This month' },
  { value: 'this_quarter', label: 'This quarter' },
  { value: 'this_year', label: 'This year' },
  { value: 'last_week', label: 'Last week' },
  { value: 'last_month', label: 'Last month' },
  { value: 'last_quarter', label: 'Last quarter' },
  { value: 'last_year', label: 'Last year' }
];

export const COMPARISON_PERIOD_TYPES = [
  { value: 'previous_period', label: 'Previous period' },
  { value: 'same_period_last_year', label: 'Same period last year' },
  { value: 'custom', label: 'Custom period' }
];

export const formatTimePeriod = (measurementPeriod: MeasurementPeriod): string => {
  if (measurementPeriod.type === 'predefined') {
    return measurementPeriod.label;
  }
  
  if (measurementPeriod.type === 'custom' && measurementPeriod.customRange) {
    const startDate = new Date(measurementPeriod.customRange.startDate).toLocaleDateString();
    const endDate = new Date(measurementPeriod.customRange.endDate).toLocaleDateString();
    return `${startDate} - ${endDate}`;
  }
  
  return measurementPeriod.label;
};

export const formatComparisonPeriod = (comparisonPeriod: ComparisonPeriod): string => {
  return comparisonPeriod.label;
};

export const calculateDaysToTarget = (targetDate?: string): number | null => {
  if (!targetDate) return null;
  
  const target = new Date(targetDate);
  const now = new Date();
  const diffTime = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

export const getTargetProgressStatus = (
  currentValue: number,
  targetValue: number,
  daysToTarget: number | null
): 'on-track' | 'behind' | 'ahead' | 'unknown' => {
  if (!daysToTarget || daysToTarget < 0) return 'unknown';
  
  const progressPercentage = (currentValue / targetValue) * 100;
  
  if (progressPercentage >= 100) return 'ahead';
  if (progressPercentage >= 75) return 'on-track';
  return 'behind';
};
