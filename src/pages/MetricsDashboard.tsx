
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowLeft, FileSpreadsheet, RefreshCw, TrendingUp, Settings, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downloadMetricsAsExcel } from "@/utils/metricsUtils";
import { saveMetricsToStorage, loadMetricsFromStorage } from "@/utils/metricsStorage";
import { MetricData } from "@/types/metrics";
import MetricCard from "@/components/metrics/MetricCard";
import MetricsOverviewChart from "@/components/metrics/MetricsOverviewChart";
import MetricsFrameworkGuide from "@/components/metrics/MetricsFrameworkGuide";
import MetricDataForm from "@/components/metrics/MetricDataForm";

const MetricsDashboard = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDataForm, setShowDataForm] = useState(false);

  // Load metrics from localStorage on component mount
  useEffect(() => {
    const storedMetrics = loadMetricsFromStorage();
    setMetrics(storedMetrics);
  }, []);

  const handleMetricsUpdate = (updatedMetrics: MetricData[]) => {
    setMetrics(updatedMetrics);
    saveMetricsToStorage(updatedMetrics);
  };

  const handleRefreshData = async () => {
    setLoading(true);
    // In a real app, this would fetch from your analytics API
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Data Refreshed",
        description: "Metrics have been updated with the latest data."
      });
    }, 1000);
  };

  const handleDownloadExcel = () => {
    if (metrics.length === 0) {
      toast({
        title: "No Data",
        description: "Please add some metrics first before downloading.",
        variant: "destructive"
      });
      return;
    }
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
                onClick={() => setShowDataForm(!showDataForm)} 
                variant="outline" 
                size="sm"
              >
                <Database className="w-4 h-4 mr-2" />
                {showDataForm ? 'Hide' : 'Manage'} Data
              </Button>
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
        {showDataForm && (
          <div className="mb-8">
            <MetricDataForm metrics={metrics} onMetricsUpdate={handleMetricsUpdate} />
          </div>
        )}

        {metrics.length === 0 && !showDataForm && (
          <Card className="mb-8">
            <CardContent className="text-center py-12">
              <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Metrics Data</h3>
              <p className="text-gray-600 mb-4">
                Start by adding your product metrics to see insights and analytics.
              </p>
              <Button onClick={() => setShowDataForm(true)}>
                <Database className="w-4 h-4 mr-2" />
                Add Your First Metric
              </Button>
            </CardContent>
          </Card>
        )}

        {metrics.length > 0 && (
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
                      {metrics.length > 0 && (
                        <>
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
                        </>
                      )}
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
                        Add {category.name.toLowerCase()} metrics using the "Manage Data" button above.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}

        <div className="mt-12">
          <MetricsFrameworkGuide />
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;
