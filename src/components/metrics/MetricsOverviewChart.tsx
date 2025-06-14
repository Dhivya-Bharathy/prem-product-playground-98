
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { MetricData } from "@/types/metrics";

interface MetricsOverviewChartProps {
  metrics: MetricData[];
}

const MetricsOverviewChart = ({ metrics }: MetricsOverviewChartProps) => {
  if (metrics.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Metrics Trend Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            <p>No metrics data available. Add metrics to see trends.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Create chart data from actual metrics
  const chartData = metrics.map((metric, index) => ({
    name: metric.name,
    current: metric.value,
    previous: metric.previousValue,
    index: index
  }));

  const chartConfig = {
    current: {
      label: "Current Value",
      color: "#2563eb",
    },
    previous: {
      label: "Previous Value",
      color: "#64748b",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Metrics Comparison: Current vs Previous</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line 
              type="monotone" 
              dataKey="current" 
              stroke="var(--color-current)" 
              strokeWidth={2}
              dot={{ fill: "var(--color-current)", strokeWidth: 2, r: 4 }}
              name="Current Value"
            />
            <Line 
              type="monotone" 
              dataKey="previous" 
              stroke="var(--color-previous)" 
              strokeWidth={2}
              dot={{ fill: "var(--color-previous)", strokeWidth: 2, r: 4 }}
              name="Previous Value"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MetricsOverviewChart;
