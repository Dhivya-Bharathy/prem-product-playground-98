
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Users, UserCheck, Repeat, DollarSign, Activity, Share2 } from "lucide-react";
import { METRIC_CATEGORIES, getCategoryColor } from "@/utils/metricsConfig";

const MetricsFrameworkGuide = () => {
  const getCategoryIcon = (category: string) => {
    const icons = {
      acquisition: Users,
      activation: UserCheck,
      retention: Repeat,
      revenue: DollarSign,
      engagement: Activity,
      referral: Share2
    };
    const IconComponent = icons[category as keyof typeof icons] || Activity;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="w-5 h-5" />
          Industry Standard Frameworks
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            This dashboard follows the <strong>AARRR (Pirate Metrics)</strong> framework and 
            incorporates <strong>HEART</strong> methodology for comprehensive product analytics.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          {METRIC_CATEGORIES.map((category) => (
            <div key={category.category} className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                {getCategoryIcon(category.category)}
                <h3 className="font-semibold capitalize text-lg">
                  {category.category}
                </h3>
                <Badge variant="outline" className={getCategoryColor(category.category)}>
                  {category.metrics.length} metrics
                </Badge>
              </div>
              
              <div className="space-y-2">
                {category.metrics.map((metric, index) => (
                  <div key={index} className="bg-gray-50 rounded p-3">
                    <div className="font-medium text-sm mb-1">{metric.name}</div>
                    <div className="text-xs text-gray-600 mb-2">{metric.description}</div>
                    {metric.formula && (
                      <div className="text-xs bg-blue-50 text-blue-700 p-2 rounded">
                        <strong>Formula:</strong> {metric.formula}
                      </div>
                    )}
                    {metric.benchmark && (
                      <div className="text-xs text-green-700 mt-1">
                        <strong>Benchmark:</strong> {metric.benchmark}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="font-semibold text-amber-800 mb-2">Framework Benefits:</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• <strong>AARRR:</strong> Covers the entire customer lifecycle from acquisition to referral</li>
            <li>• <strong>HEART:</strong> Focuses on user experience through Happiness, Engagement, Adoption, Retention, Task success</li>
            <li>• <strong>Actionable:</strong> Each metric connects to specific business actions and decisions</li>
            <li>• <strong>Benchmarked:</strong> Industry standards help contextualize your performance</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsFrameworkGuide;
