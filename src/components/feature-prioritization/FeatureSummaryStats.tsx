
import { Feature } from "@/types/feature";
import { Card, CardContent } from "@/components/ui/card";
import { Target, TrendingUp, BarChart3 } from "lucide-react";

interface FeatureSummaryStatsProps {
  features: Feature[];
}

const FeatureSummaryStats = ({ features }: FeatureSummaryStatsProps) => {
  if (features.length === 0) return null;

  const totalFeatures = features.length;
  const averageScore = features.reduce((sum, f) => sum + f.riceScore, 0) / totalFeatures;
  const highPriorityCount = features.filter(f => f.priority === "High").length;
  const mediumPriorityCount = features.filter(f => f.priority === "Medium").length;
  const lowPriorityCount = features.filter(f => f.priority === "Low").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="bg-white/70 backdrop-blur-sm border-white/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Features</p>
              <p className="text-2xl font-bold">{totalFeatures}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm border-white/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg RICE Score</p>
              <p className="text-2xl font-bold">{averageScore.toFixed(1)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm border-white/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-red-600">{highPriorityCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm border-white/20">
        <CardContent className="p-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Priority Distribution</p>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-orange-600">Medium: {mediumPriorityCount}</span>
                <span className="text-blue-600">Low: {lowPriorityCount}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureSummaryStats;
