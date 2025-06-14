
export interface RoadmapItem {
  id: string;
  title: string;
  quarter: string;
  status: string;
  priority: string;
  description: string;
}

export const QUARTERS = ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024", "Q1 2025"];
export const STATUSES = ["Planning", "In Progress", "Testing", "Completed"];
export const PRIORITIES = ["High", "Medium", "Low"];
