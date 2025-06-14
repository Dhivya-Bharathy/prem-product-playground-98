
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowLeft, FileSpreadsheet, RefreshCw, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateSampleMetricData, downloadMetricsAsExcel } from "@/utils/metricsUtils";
import { MetricData } from "@/types/metrics";
import MetricCard from "@/components/metrics/MetricCard";
import MetricsOverviewChart from "@/components/metrics/MetricsOverviewChart";
import MetricsFrameworkGuide from "@/components/metrics/MetricsFrameworkGuide";

const MetricsDashboard = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<MetricData[]>(generateSampleMetricData());
  const [loading, setLoading] = useState(false);

  const handleRefreshData = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setMetrics(generateSampleMetricData());
      setLoading(false);
      toast({
        title: "Data Refreshed",
        description: "Metrics have been updated with the latest data."
      });
    }, 1000);
  };

  const handleDownloadExcel = () => {
    downloadMetricsAsExcel(metrics, toast);
  };

  const getMetricsByCategory = (category: string) => {
    return metrics.filter(metric => metric.category === category);
  };

  const categories = [
    { id: 'all', name: 'All Metrics', icon: TrendingUp },
    { id: 'acquisition', name: 'Acquisition', icon: TrendingUp },
    { id: 'activation', name: 'Activation', icon: TrendingUp },
    { id: 'retention', name: 'Retention', icon: TrendingUp },
    { id: 'revenue', name: 'Revenue', icon: TrendingUp },
    { id: 'engagement', name: 'Engagement', icon: TrendingUp },
    { id: 'referral', name: 'Referral', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Product Metrics Dashboard</h1>
                <p className="text-gray-600">Track and analyze key product metrics and KPIs</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                onClick={handleRefreshData} 
                variant="outline" 
                size="sm"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh Data
              </Button>
              <Button onClick={handleDownloadExcel} variant="outline" size="sm">
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Download Excel
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {metrics.map((metric) => (
                <MetricCard key={metric.id} metric={metric} />
              ))}
            </div>
            
            <div className="grid gap-6 lg:grid-cols-2">
              <MetricsOverviewChart />
              <Card>
                <CardHeader>
                  <CardTitle>Quick Insights</CardTitle>
                  <CardDescription>Key performance indicators summary</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <span className="text-sm font-medium">Best Performing</span>
                      <span className="text-sm text-green-600 font-semibold">
                        {metrics.reduce((best, current) => 
                          current.changePercentage > best.changePercentage ? current : best
                        ).name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                      <span className="text-sm font-medium">Needs Attention</span>
                      <span className="text-sm text-red-600 font-semibold">
                        {metrics.reduce((worst, current) => 
                          current.changePercentage < worst.changePercentage ? current : worst
                        ).name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <span className="text-sm font-medium">Total Metrics Tracked</span>
                      <span className="text-sm text-blue-600 font-semibold">{metrics.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {categories.slice(1).map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {getMetricsByCategory(category.id).map((metric) => (
                  <MetricCard key={metric.id} metric={metric} />
                ))}
              </div>
              {getMetricsByCategory(category.id).length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-gray-500">No metrics available for this category.</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Connect your analytics tools to start tracking {category.name.toLowerCase()} metrics.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12">
          <MetricsFrameworkGuide />
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;
