import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Target } from "lucide-react";
import { MetricData } from "@/types/metrics";
import { formatMetricValue, generateChartData } from "@/utils/metricsUtils";
import { getCategoryColor } from "@/utils/metricsConfig";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface MetricCardProps {
  metric: MetricData;
}

const MetricCard = ({ metric }: MetricCardProps) => {
  const chartData = generateChartData(7);
  
  const getTrendIcon = () => {
    switch (metric.trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = () => {
    if (metric.changePercentage > 0) return 'text-green-600';
    if (metric.changePercentage < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getProgressPercentage = () => {
    if (!metric.target) return 0;
    return Math.min((metric.value / metric.target) * 100, 100);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-600">
            {metric.name}
          </CardTitle>
          <Badge variant="outline" className={getCategoryColor(metric.category)}>
            {metric.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">
            {formatMetricValue(metric.value, metric.category)}
          </div>
          <div className="h-8 w-16">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={metric.trend === 'up' ? '#16a34a' : metric.trend === 'down' ? '#dc2626' : '#6b7280'}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className={`flex items-center gap-1 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="font-medium">
              {metric.changePercentage > 0 ? '+' : ''}{metric.changePercentage.toFixed(1)}%
            </span>
            <span className="text-gray-500">vs last period</span>
          </div>
        </div>

        {metric.target && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Target className="w-3 h-3" />
                Target: {formatMetricValue(metric.target, metric.category)}
              </span>
              <span>{getProgressPercentage().toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${
                  getProgressPercentage() >= 100 ? 'bg-green-500' : 
                  getProgressPercentage() >= 75 ? 'bg-blue-500' : 
                  getProgressPercentage() >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500">
          {metric.period}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
