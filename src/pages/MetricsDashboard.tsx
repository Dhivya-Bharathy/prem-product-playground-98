import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowLeft, FileSpreadsheet, RefreshCw, TrendingUp, Database, Users, UserCheck, Repeat, DollarSign, Activity, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downloadMetricsAsExcel } from "@/utils/metricsUtils";
import { saveMetricsToStorage, loadMetricsFromStorage } from "@/utils/metricsStorage";
import { MetricData } from "@/types/metrics";
import MetricCard from "@/components/metrics/MetricCard";
import MetricsFrameworkGuide from "@/components/metrics/MetricsFrameworkGuide";
import MetricDataForm from "@/components/metrics/MetricDataForm";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

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

  // Add icons for each category, similar to user story tabs
  const categories = [
    { id: 'all', name: 'All Metrics', icon: TrendingUp },
    { id: 'acquisition', name: 'Acquisition', icon: Users },
    { id: 'activation', name: 'Activation', icon: UserCheck },
    { id: 'retention', name: 'Retention', icon: Repeat },
    { id: 'revenue', name: 'Revenue', icon: DollarSign },
    { id: 'engagement', name: 'Engagement', icon: Activity },
    { id: 'referral', name: 'Referral', icon: Share2 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <header className="bg-white/70 backdrop-blur-sm shadow-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            {/* Left: Back + Title */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button variant="outline" size="sm" asChild className="bg-white/80 hover:bg-white px-2 min-w-[44px]">
                <Link to="/" className="flex items-center">
                  <ArrowLeft className="w-4 h-4 sm:mr-2" />
                  <span className="hidden xs:inline">Back to Home</span>
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Product Metrics Dashboard
                </h1>
                <p className="text-gray-600 text-xs sm:text-base">Track and analyze key product metrics and KPIs</p>
              </div>
            </div>
            {/* MOBILE-FRIENDLY HEADER ACTIONS */}
            { (
              <div className="w-full sm:w-auto mt-2 sm:mt-0">
                <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1 px-0.5 sm:p-0">
                  {/* Manage Data */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        onClick={() => setShowDataForm(!showDataForm)} 
                        variant="outline" 
                        size="sm"
                        className="bg-white/80 hover:bg-white flex-shrink-0 min-w-[44px] px-2 sm:px-3"
                      >
                        <Database className="w-4 h-4" />
                        <span className="hidden sm:inline ml-2">{showDataForm ? 'Hide' : 'Manage'} Data</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">{showDataForm ? 'Hide Data Form' : 'Manage Data'}</TooltipContent>
                  </Tooltip>
                  {/* Refresh Data */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        onClick={handleRefreshData}
                        variant="outline"
                        size="sm"
                        className="bg-white/80 hover:bg-white flex-shrink-0 min-w-[44px] px-2 sm:px-3"
                        disabled={loading}
                      >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        <span className="hidden sm:inline ml-2">Refresh Data</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Refresh Data</TooltipContent>
                  </Tooltip>
                  {/* Download Excel */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handleDownloadExcel}
                        variant="outline"
                        size="sm"
                        className="bg-white/80 hover:bg-white flex-shrink-0 min-w-[44px] px-2 sm:px-3"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                        <span className="hidden sm:inline ml-2">Download Excel</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Download as Excel</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            )}
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
                {/* Mobile-optimized, horizontally scrollable tab bar with icons */}
                <div className="overflow-x-auto hide-scrollbar mb-4 -mx-2 sm:mx-0 px-1 sm:px-0">
                  <TabsList
                    className="flex w-full min-w-[320px] gap-1 sm:gap-0 border rounded-lg bg-slate-100 flex-nowrap"
                    style={{ minWidth: 260 }}
                  >
                    {categories.map(({ id, name, icon: Icon }) => (
                      <TabsTrigger
                        key={id}
                        value={id}
                        className="flex-1 min-w-[62px] sm:min-w-[120px] flex flex-col items-center justify-center py-2 px-1 text-xs sm:text-sm focus-visible:outline-none"
                      >
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center justify-center">
                              <Icon className="w-5 h-5 sm:mr-2 text-blue-600" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">{name}</TooltipContent>
                        </Tooltip>
                        <span className="hidden sm:block mt-1">{name}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

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
