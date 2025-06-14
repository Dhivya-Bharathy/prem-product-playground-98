
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DVFEvaluation } from "@/types/dvf";
import { Target, DollarSign, Wrench, TrendingUp, AlertTriangle, Pause, X } from "lucide-react";

interface DVFMatrixProps {
  evaluation: DVFEvaluation;
}

const getRecommendationConfig = (recommendation: DVFEvaluation['recommendation']) => {
  switch (recommendation) {
    case 'proceed':
      return {
        icon: TrendingUp,
        color: 'bg-green-100 text-green-800 border-green-200',
        bgColor: 'bg-green-50',
        title: 'Proceed',
        description: 'Strong scores across all dimensions. Move forward with confidence.'
      };
    case 'improve':
      return {
        icon: AlertTriangle,
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        bgColor: 'bg-yellow-50',
        title: 'Improve',
        description: 'Good potential but needs improvement in some areas before proceeding.'
      };
    case 'pause':
      return {
        icon: Pause,
        color: 'bg-orange-100 text-orange-800 border-orange-200',
        bgColor: 'bg-orange-50',
        title: 'Pause',
        description: 'Significant concerns. Consider pausing to address major issues.'
      };
    case 'stop':
      return {
        icon: X,
        color: 'bg-red-100 text-red-800 border-red-200',
        bgColor: 'bg-red-50',
        title: 'Stop',
        description: 'Major concerns across multiple dimensions. Consider stopping or pivoting.'
      };
  }
};

export const DVFMatrix = ({ evaluation }: DVFMatrixProps) => {
  const recommendationConfig = getRecommendationConfig(evaluation.recommendation);
  const RecommendationIcon = recommendationConfig.icon;

  return (
    <div className="space-y-6">
      {/* Score Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Target className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium">Desirability</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{evaluation.scores.desirability}</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <DollarSign className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium">Viability</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{evaluation.scores.viability}</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Wrench className="w-5 h-5 text-purple-600 mr-2" />
            <span className="font-medium">Feasibility</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">{evaluation.scores.feasibility}</div>
        </div>
      </div>

      {/* Total Score */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {evaluation.totalScore}/10
            </div>
            <p className="text-gray-600">Overall DVF Score</p>
          </div>
        </CardContent>
      </Card>

      {/* Recommendation */}
      <Card className={`border-2 ${recommendationConfig.bgColor}`}>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-3">
            <RecommendationIcon className="w-6 h-6" />
            <Badge className={recommendationConfig.color} variant="secondary">
              {recommendationConfig.title}
            </Badge>
          </div>
          <p className="text-gray-700 mb-4">{recommendationConfig.description}</p>
          
          {/* Detailed Analysis */}
          <div className="space-y-2">
            <h4 className="font-medium">Analysis:</h4>
            <div className="text-sm text-gray-600 space-y-1">
              {evaluation.scores.desirability >= 7 && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Strong user desirability</span>
                </div>
              )}
              {evaluation.scores.desirability < 5 && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Low user desirability - investigate user needs</span>
                </div>
              )}
              {evaluation.scores.viability >= 7 && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Solid business model</span>
                </div>
              )}
              {evaluation.scores.viability < 5 && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Business viability concerns - review monetization</span>
                </div>
              )}
              {evaluation.scores.feasibility >= 7 && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Technically achievable</span>
                </div>
              )}
              {evaluation.scores.feasibility < 5 && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Feasibility challenges - assess resources and complexity</span>
                </div>
              )}
            </div>
          </div>

          {evaluation.notes && (
            <div className="mt-4 p-3 bg-white rounded border">
              <h5 className="font-medium mb-1">Additional Notes:</h5>
              <p className="text-sm text-gray-600">{evaluation.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
