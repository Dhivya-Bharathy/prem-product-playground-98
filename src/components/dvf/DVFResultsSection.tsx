
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Trash2, TrendingUp, AlertTriangle, Pause, X } from "lucide-react";
import { DVFMatrix } from "./DVFMatrix";
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
    case 'proceed': return 'bg-green-100 text-green-800';
    case 'improve': return 'bg-yellow-100 text-yellow-800';
    case 'pause': return 'bg-orange-100 text-orange-800';
    case 'stop': return 'bg-red-100 text-red-800';
  }
};

export const DVFResultsSection = ({ evaluations, onDeleteEvaluation }: DVFResultsSectionProps) => {
  if (evaluations.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <Brain className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p>Complete an evaluation to see your results</p>
      </div>
    );
  }

  const averageScores = calculateAverageScores(evaluations);
  const recommendations = evaluations.reduce((acc, eval) => {
    acc[eval.recommendation] = (acc[eval.recommendation] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Evaluation Summary</CardTitle>
          <CardDescription>{evaluations.length} ideas evaluated</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{averageScores.desirability}</div>
              <div className="text-sm text-gray-600">Avg Desirability</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{averageScores.viability}</div>
              <div className="text-sm text-gray-600">Avg Viability</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{averageScores.feasibility}</div>
              <div className="text-sm text-gray-600">Avg Feasibility</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{averageScores.total}</div>
              <div className="text-sm text-gray-600">Avg Total</div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {Object.entries(recommendations).map(([rec, count]) => {
              const Icon = getRecommendationIcon(rec as DVFEvaluation['recommendation']);
              return (
                <Badge key={rec} className={getRecommendationColor(rec as DVFEvaluation['recommendation'])} variant="secondary">
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
        <h3 className="text-lg font-semibold">All Evaluations</h3>
        {evaluations.map((evaluation) => {
          const Icon = getRecommendationIcon(evaluation.recommendation);
          return (
            <Card key={evaluation.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{evaluation.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {evaluation.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getRecommendationColor(evaluation.recommendation)} variant="secondary">
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
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                  <span>D: {evaluation.scores.desirability}</span>
                  <span>V: {evaluation.scores.viability}</span>
                  <span>F: {evaluation.scores.feasibility}</span>
                  <span className="font-semibold">Total: {evaluation.totalScore}/10</span>
                  <span className="text-xs">{evaluation.createdAt.toLocaleDateString()}</span>
                </div>
              </CardHeader>
              
              {evaluation.notes && (
                <CardContent className="pt-0">
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    <strong>Notes:</strong> {evaluation.notes}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
