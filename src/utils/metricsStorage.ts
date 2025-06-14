
import { MetricData } from "@/types/metrics";

const STORAGE_KEY = 'product-metrics-data';

export const saveMetricsToStorage = (metrics: MetricData[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(metrics));
  } catch (error) {
    console.error('Failed to save metrics to localStorage:', error);
  }
};

export const loadMetricsFromStorage = (): MetricData[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load metrics from localStorage:', error);
  }
  return [];
};

export const clearMetricsStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear metrics from localStorage:', error);
  }
};
