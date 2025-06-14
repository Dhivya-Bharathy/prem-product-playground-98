
import { TrendingUp, Target, Zap, Brain } from "lucide-react";
import { DVFEvaluation } from "@/types/dvf";
import { calculateAverageScores } from "@/utils/dvfExport";

interface DVFQuickStatsProps {
  evaluations: DVFEvaluation[];
}

export const DVFQuickStats = ({ evaluations }: DVFQuickStatsProps) => {
  const averageScores = calculateAverageScores(evaluations);
  const proceedCount = evaluations.filter(e => e.recommendation === 'proceed').length;
  const latestScore = evaluations.length > 0 ? evaluations[0].totalScore : 0;

  const stats = [
    {
      icon: Brain,
      label: "Ideas Evaluated",
      value: evaluations.length,
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: TrendingUp,
      label: "Average Score",
      value: averageScores.total,
      color: "from-green-500 to-green-600"
    },
    {
      icon: Target,
      label: "Ready to Proceed",
      value: proceedCount,
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Zap,
      label: "Latest Score",
      value: latestScore.toFixed(1),
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="bg-white/50 backdrop-blur-sm border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                  <div className={`p-2 bg-gradient-to-r ${stat.color} rounded-lg`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
