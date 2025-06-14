
import { MetricConfig } from "@/types/metrics";

export const METRIC_CATEGORIES: MetricConfig[] = [
  {
    category: 'acquisition',
    metrics: [
      {
        name: 'Monthly Active Users (MAU)',
        description: 'Number of unique users who engage with your product in a month',
        benchmark: 'Varies by industry'
      },
      {
        name: 'Cost Per Acquisition (CPA)',
        description: 'Average cost to acquire a new customer',
        formula: 'Total Marketing Spend / New Customers Acquired'
      },
      {
        name: 'Traffic Sources',
        description: 'Breakdown of where users are coming from',
        benchmark: 'Organic > 40%'
      }
    ]
  },
  {
    category: 'activation',
    metrics: [
      {
        name: 'Activation Rate',
        description: 'Percentage of users who complete key activation actions',
        formula: 'Activated Users / Total Sign-ups × 100',
        benchmark: '20-30%'
      },
      {
        name: 'Time to First Value (TTFV)',
        description: 'Time it takes for users to experience first value',
        benchmark: '< 5 minutes for web apps'
      },
      {
        name: 'Onboarding Completion Rate',
        description: 'Percentage of users who complete the onboarding flow',
        benchmark: '60-80%'
      }
    ]
  },
  {
    category: 'retention',
    metrics: [
      {
        name: 'Day 1 Retention',
        description: 'Percentage of users who return after 1 day',
        benchmark: '25-35%'
      },
      {
        name: 'Day 7 Retention',
        description: 'Percentage of users who return after 7 days',
        benchmark: '10-20%'
      },
      {
        name: 'Day 30 Retention',
        description: 'Percentage of users who return after 30 days',
        benchmark: '5-15%'
      },
      {
        name: 'Churn Rate',
        description: 'Percentage of customers who stop using your product',
        formula: 'Churned Customers / Total Customers × 100'
      }
    ]
  },
  {
    category: 'revenue',
    metrics: [
      {
        name: 'Monthly Recurring Revenue (MRR)',
        description: 'Predictable revenue generated each month',
        formula: 'Average Revenue Per User × Total Monthly Users'
      },
      {
        name: 'Customer Lifetime Value (CLV)',
        description: 'Total revenue expected from a customer',
        formula: 'Average Revenue Per User × Average Customer Lifespan'
      },
      {
        name: 'Average Revenue Per User (ARPU)',
        description: 'Average revenue generated per user',
        formula: 'Total Revenue / Total Users'
      }
    ]
  },
  {
    category: 'engagement',
    metrics: [
      {
        name: 'Session Duration',
        description: 'Average time users spend in your product per session',
        benchmark: '2-4 minutes for web apps'
      },
      {
        name: 'Feature Adoption Rate',
        description: 'Percentage of users who use specific features',
        formula: 'Users Using Feature / Total Active Users × 100'
      },
      {
        name: 'Daily Active Users (DAU)',
        description: 'Number of unique users who engage daily',
        benchmark: 'DAU/MAU ratio: 10-20%'
      }
    ]
  },
  {
    category: 'referral',
    metrics: [
      {
        name: 'Net Promoter Score (NPS)',
        description: 'Measure of customer satisfaction and loyalty',
        formula: '% Promoters - % Detractors',
        benchmark: '> 50 is excellent'
      },
      {
        name: 'Referral Rate',
        description: 'Percentage of customers who refer others',
        benchmark: '2-5% is typical'
      },
      {
        name: 'Viral Coefficient',
        description: 'Number of new users each existing user brings',
        formula: 'Invitations Sent × Conversion Rate'
      }
    ]
  }
];

export const getCategoryColor = (category: string): string => {
  const colors = {
    acquisition: 'text-blue-600 bg-blue-50 border-blue-200',
    activation: 'text-green-600 bg-green-50 border-green-200',
    retention: 'text-purple-600 bg-purple-50 border-purple-200',
    revenue: 'text-orange-600 bg-orange-50 border-orange-200',
    engagement: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    referral: 'text-pink-600 bg-pink-50 border-pink-200'
  };
  return colors[category as keyof typeof colors] || 'text-gray-600 bg-gray-50 border-gray-200';
};

export const getCategoryIcon = (category: string): string => {
  const icons = {
    acquisition: 'Users',
    activation: 'UserCheck',
    retention: 'Repeat',
    revenue: 'DollarSign',
    engagement: 'Activity',
    referral: 'Share2'
  };
  return icons[category as keyof typeof icons] || 'BarChart3';
};
