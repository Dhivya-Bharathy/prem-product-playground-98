
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowLeft, FileSpreadsheet, RefreshCw, TrendingUp, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downloadMetricsAsExcel } from "@/utils/metricsUtils";
import { saveMetricsToStorage, loadMetricsFromStorage } from "@/utils/metricsStorage";
import { MetricData } from "@/types/metrics";
import MetricCard from "@/components/metrics/MetricCard";
import MetricsFrameworkGuide from "@/components/metrics/MetricsFrameworkGuide";
import MetricDataForm from "@/components/metrics/MetricDataForm";

// Type for old metric format to handle migration
interface OldMetricData {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  change: number;
  changePercentage: number;
  trend: 'up' | 'down' | 'stable';
  category: string;
  period?: string; // Old format had this
  target?: number;
  targetDate?: string;
}

const MetricsDashboard = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDataForm, setShowDataForm] = useState(false);

  // Load metrics from localStorage on component mount and migrate old format if needed
  useEffect(() => {
    const storedMetrics = loadMetricsFromStorage();
    
    // Migrate old metrics format to new format
    const migratedMetrics = storedMetrics.map((metric): MetricData => {
      // Check if metric already has new format
      if ('measurementPeriod' in metric && 'comparisonPeriod' in metric) {
        return metric;
      }
      
      // Migrate old format - safely handle the old metric structure
      const oldMetric = metric as unknown as OldMetricData;
      const newMetric: MetricData = {
        id: oldMetric.id,
        name: oldMetric.name,
        value: oldMetric.value,
        previousValue: oldMetric.previousValue,
        change: oldMetric.change,
        changePercentage: oldMetric.changePercentage,
        trend: oldMetric.trend,
        category: oldMetric.category as any,
        measurementPeriod: {
          type: 'predefined' as const,
          predefinedPeriod: 'last_30_days' as const,
          label: oldMetric.period || 'Last 30 days'
        },
        comparisonPeriod: {
          type: 'previous_period' as const,
          label: 'Previous period'
        },
        periodType: 'rolling' as const,
        target: oldMetric.target,
        targetDate: oldMetric.targetDate
      };
      return newMetric;
    });
    
    setMetrics(migratedMetrics);
    
    // Save migrated metrics back to storage
    if (migratedMetrics.some((m, i) => JSON.stringify(m) !== JSON.stringify(storedMetrics[i]))) {
      saveMetricsToStorage(migratedMetrics);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <header className="bg-white/70 backdrop-blur-sm shadow-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild className="bg-white/80 hover:bg-white">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Product Metrics Dashboard
                </h1>
                <p className="text-gray-600">Track and analyze key product metrics and KPIs</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                onClick={() => setShowDataForm(!showDataForm)} 
                variant="outline" 
                size="sm"
                className="bg-white/80 hover:bg-white"
              >
                <Database className="w-4 h-4 mr-2" />
                {showDataForm ? 'Hide' : 'Manage'} Data
              </Button>
              <Button 
                onClick={handleRefreshData} 
                variant="outline" 
                size="sm"
                disabled={loading}
                className="bg-white/80 hover:bg-white"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh Data
              </Button>
              <Button onClick={handleDownloadExcel} variant="outline" size="sm" className="bg-white/80 hover:bg-white">
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Download Excel
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {showDataForm && (
            <div className="mb-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                <MetricDataForm metrics={metrics} onMetricsUpdate={handleMetricsUpdate} />
              </div>
            </div>
          )}

          {metrics.length === 0 && !showDataForm && (
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 mb-8">
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
            </div>
          )}

          {metrics.length > 0 && (
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
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
            </div>
          )}

          <div className="mt-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
              <MetricsFrameworkGuide />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;
