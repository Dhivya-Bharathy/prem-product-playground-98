
import { 
  Target, 
  Users, 
  BarChart3, 
  GitBranch,
  Brain
} from "lucide-react";

export const tools = [
  {
    id: "user-story-generator",
    title: "User Story Generator",
    description: "Create well-structured user stories with acceptance criteria",
    icon: Users,
    path: "/tools/user-story-generator",
    category: "Requirements",
    difficulty: "Beginner"
  },
  {
    id: "product-roadmap",
    title: "Product Roadmap Planner",
    description: "Plan and visualize your product roadmap with priorities",
    icon: GitBranch,
    path: "/tools/product-roadmap",
    category: "Planning",
    difficulty: "Intermediate"
  },
  {
    id: "feature-prioritization",
    title: "Feature Prioritization Matrix",
    description: "Prioritize features using RICE, MoSCoW, and other frameworks",
    icon: Target,
    path: "/tools/feature-prioritization",
    category: "Strategy",
    difficulty: "Advanced"
  },
  {
    id: "metrics-dashboard",
    title: "Product Metrics Dashboard",
    description: "Track and analyze key product metrics and KPIs",
    icon: BarChart3,
    path: "/tools/metrics-dashboard",
    category: "Analytics",
    difficulty: "Intermediate"
  },
  {
    id: "dvf-exercise",
    title: "DVF Exercise",
    description: "Evaluate ideas using Desirability, Viability, Feasibility framework",
    icon: Brain,
    path: "/tools/dvf-exercise",
    category: "Validation",
    difficulty: "Intermediate"
  },
  {
    id: "jobs-to-be-done",
    title: "Jobs to be Done Framework",
    description: "Understand customer needs using Clayton Christensen's JTBD methodology",
    icon: Target,
    path: "/tools/jobs-to-be-done",
    category: "Research",
    difficulty: "Intermediate"
  },
  {
    id: "pm-competency",
    title: "PM Competency Assessment",
    description: "Assess your product management competencies and discover your PM archetype",
    icon: Brain,
    path: "/tools/pm-competency",
    category: "Assessment",
    difficulty: "All Levels"
  }
];
