
export interface RoadmapItem {
  id: string;
  title: string;
  quarter: string;
  status: string;
  priority: string;
  description: string;
}

export const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];
export const STATUSES = ["Planning", "In Progress", "Testing", "Completed"];
export const PRIORITIES = ["High", "Medium", "Low"];
