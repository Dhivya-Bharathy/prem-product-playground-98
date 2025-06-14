
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Trash2, TrendingUp, AlertTriangle, Pause, X, BarChart3 } from "lucide-react";
import { DVFEvaluation } from "@/types/dvf";
import { calculateAverageScores } from "@/utils/dvfExport";

interface DVFResultsSectionProps {
  evaluations: DVFEvaluation[];
  onDeleteEvaluation: (id: string) => void;
}

const getRecommendationIcon = (recommendation: DVFEvaluation['recommendation']) => {
  switch (recommendation) {
    case 'proceed': return TrendingUp;
    case 'improve': return AlertTriangle;
    case 'pause': return Pause;
    case 'stop': return X;
  }
};

const getRecommendationColor = (recommendation: DVFEvaluation['recommendation']) => {
  switch (recommendation) {
    case 'proceed': return 'bg-green-100 text-green-800 border-green-200';
    case 'improve': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'pause': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'stop': return 'bg-red-100 text-red-800 border-red-200';
  }
};

export const DVFResultsSection = ({ evaluations, onDeleteEvaluation }: DVFResultsSectionProps) => {
  if (evaluations.length === 0) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-12">
        <div className="text-center text-gray-500">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            <Brain className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No evaluations yet</h3>
          <p className="text-gray-600">Complete your first evaluation to see results and analytics</p>
        </div>
      </div>
    );
  }

  const averageScores = calculateAverageScores(evaluations);
  const recommendations = evaluations.reduce((acc, evaluation) => {
    acc[evaluation.recommendation] = (acc[evaluation.recommendation] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg">Evaluation Analytics</CardTitle>
          </div>
          <CardDescription>{evaluations.length} ideas evaluated with insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{averageScores.desirability}</div>
              <div className="text-sm text-blue-700 font-medium">Avg Desirability</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{averageScores.viability}</div>
              <div className="text-sm text-green-700 font-medium">Avg Viability</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{averageScores.feasibility}</div>
              <div className="text-sm text-purple-700 font-medium">Avg Feasibility</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{averageScores.total}</div>
              <div className="text-sm text-gray-700 font-medium">Avg Total</div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {Object.entries(recommendations).map(([rec, count]) => {
              const Icon = getRecommendationIcon(rec as DVFEvaluation['recommendation']);
              return (
                <Badge key={rec} className={`${getRecommendationColor(rec as DVFEvaluation['recommendation'])} border`} variant="secondary">
                  <Icon className="w-3 h-3 mr-1" />
                  {rec}: {count}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Individual Evaluations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Brain className="w-5 h-5" />
          All Evaluations ({evaluations.length})
        </h3>
        <div className="grid gap-4">
          {evaluations.map((evaluation) => {
            const Icon = getRecommendationIcon(evaluation.recommendation);
            return (
              <Card key={evaluation.id} className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate">{evaluation.title}</CardTitle>
                      {evaluation.description && (
                        <CardDescription className="text-sm mt-1 line-clamp-2">
                          {evaluation.description}
                        </CardDescription>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Badge className={`${getRecommendationColor(evaluation.recommendation)} border`} variant="secondary">
                        <Icon className="w-3 h-3 mr-1" />
                        {evaluation.recommendation}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteEvaluation(evaluation.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>D: {evaluation.scores.desirability}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>V: {evaluation.scores.viability}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span>F: {evaluation.scores.feasibility}</span>
                    </div>
                    <span className="font-semibold text-gray-900">Total: {evaluation.totalScore}/10</span>
                    <span className="text-xs text-gray-500 ml-auto">{evaluation.createdAt.toLocaleDateString()}</span>
                  </div>
                </CardHeader>
                
                {evaluation.notes && (
                  <CardContent className="pt-0">
                    <div className="text-sm text-gray-600 bg-gray-50/70 p-3 rounded-lg border border-gray-100">
                      <strong className="text-gray-900">Notes:</strong> {evaluation.notes}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
