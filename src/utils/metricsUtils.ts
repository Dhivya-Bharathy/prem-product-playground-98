
import { MetricData, ChartDataPoint } from "@/types/metrics";

export const generateSampleMetricData = (): MetricData[] => {
  return [
    {
      id: '1',
      name: 'Monthly Active Users',
      value: 12450,
      previousValue: 11200,
      change: 1250,
      changePercentage: 11.16,
      trend: 'up',
      category: 'acquisition',
      measurementPeriod: {
        type: 'predefined',
        predefinedPeriod: 'last_30_days',
        label: 'Last 30 days'
      },
      comparisonPeriod: {
        type: 'previous_period',
        label: 'Previous period'
      },
      periodType: 'rolling',
      target: 15000
    },
    {
      id: '2',
      name: 'Activation Rate',
      value: 28.5,
      previousValue: 24.2,
      change: 4.3,
      changePercentage: 17.77,
      trend: 'up',
      category: 'activation',
      measurementPeriod: {
        type: 'predefined',
        predefinedPeriod: 'last_30_days',
        label: 'Last 30 days'
      },
      comparisonPeriod: {
        type: 'previous_period',
        label: 'Previous period'
      },
      periodType: 'rolling',
      target: 35
    },
    {
      id: '3',
      name: 'Day 7 Retention',
      value: 15.8,
      previousValue: 18.2,
      change: -2.4,
      changePercentage: -13.19,
      trend: 'down',
      category: 'retention',
      measurementPeriod: {
        type: 'predefined',
        predefinedPeriod: 'last_30_days',
        label: 'Last 30 days'
      },
      comparisonPeriod: {
        type: 'previous_period',
        label: 'Previous period'
      },
      periodType: 'rolling',
      target: 20
    },
    {
      id: '4',
      name: 'Monthly Recurring Revenue',
      value: 45600,
      previousValue: 42300,
      change: 3300,
      changePercentage: 7.8,
      trend: 'up',
      category: 'revenue',
      measurementPeriod: {
        type: 'predefined',
        predefinedPeriod: 'last_30_days',
        label: 'Last 30 days'
      },
      comparisonPeriod: {
        type: 'previous_period',
        label: 'Previous period'
      },
      periodType: 'rolling',
      target: 50000
    },
    {
      id: '5',
      name: 'Session Duration',
      value: 3.2,
      previousValue: 3.1,
      change: 0.1,
      changePercentage: 3.23,
      trend: 'up',
      category: 'engagement',
      measurementPeriod: {
        type: 'predefined',
        predefinedPeriod: 'last_30_days',
        label: 'Last 30 days'
      },
      comparisonPeriod: {
        type: 'previous_period',
        label: 'Previous period'
      },
      periodType: 'rolling',
      target: 4
    },
    {
      id: '6',
      name: 'Net Promoter Score',
      value: 42,
      previousValue: 38,
      change: 4,
      changePercentage: 10.53,
      trend: 'up',
      category: 'referral',
      measurementPeriod: {
        type: 'predefined',
        predefinedPeriod: 'last_30_days',
        label: 'Last 30 days'
      },
      comparisonPeriod: {
        type: 'previous_period',
        label: 'Previous period'
      },
      periodType: 'rolling',
      target: 50
    }
  ];
};

export const generateChartData = (days: number = 30): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const baseValue = Math.random() * 1000 + 500;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const variation = (Math.random() - 0.5) * 200;
    const value = Math.max(0, baseValue + variation + (i * 5));
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value),
      label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    });
  }
  
  return data;
};

export const formatMetricValue = (value: number, category: string): string => {
  if (category === 'revenue') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
  
  if (category === 'activation' || category === 'retention' || category === 'referral') {
    return `${value.toFixed(1)}%`;
  }
  
  if (category === 'engagement' && value < 10) {
    return `${value.toFixed(1)} min`;
  }
  
  return value.toLocaleString();
};

export const downloadMetricsAsExcel = async (metrics: MetricData[], toast: any) => {
  if (metrics.length === 0) {
    toast({
      title: "No Metrics",
      description: "No metrics data available to download.",
      variant: "destructive"
    });
    return;
  }

  try {
    const headers = [
      'Metric Name',
      'Category', 
      'Current Value',
      'Previous Value',
      'Change',
      'Change %',
      'Trend',
      'Target',
      'Measurement Period',
      'Comparison Period',
      'Period Type'
    ];
    
    const csvContent = [
      headers.join(','),
      ...metrics.map(metric => [
        `"${metric.name.replace(/"/g, '""')}"`,
        metric.category,
        metric.value,
        metric.previousValue,
        metric.change,
        `${metric.changePercentage.toFixed(2)}%`,
        metric.trend,
        metric.target || 'N/A',
        `"${metric.measurementPeriod.label.replace(/"/g, '""')}"`,
        `"${metric.comparisonPeriod.label.replace(/"/g, '""')}"`,
        metric.periodType
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'product-metrics-dashboard.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download Complete",
      description: "Product metrics have been exported to Excel format."
    });
  } catch (error) {
    console.error('Error generating Excel file:', error);
    toast({
      title: "Download Failed",
      description: "Could not generate Excel file. Please try again.",
      variant: "destructive"
    });
  }
};
