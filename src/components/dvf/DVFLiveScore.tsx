
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, AlertTriangle, Pause, X, Sparkles } from "lucide-react";
import { DVFScore } from "@/types/dvf";

interface DVFLiveScoreProps {
  scores: DVFScore;
  totalScore: number;
  recommendation: 'proceed' | 'improve' | 'pause' | 'stop';
  hasTitle: boolean;
  onEvaluate: () => void;
}

const getRecommendationConfig = (recommendation: string) => {
  switch (recommendation) {
    case 'proceed':
      return { 
        icon: TrendingUp, 
        color: 'from-green-500 to-emerald-600',
        bgColor: 'bg-green-50',
        textColor: 'text-green-700',
        description: 'Great idea! Ready to move forward.'
      };
    case 'improve':
      return { 
        icon: AlertTriangle, 
        color: 'from-yellow-500 to-amber-600',
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-700',
        description: 'Good potential, needs refinement.'
      };
    case 'pause':
      return { 
        icon: Pause, 
        color: 'from-orange-500 to-red-500',
        bgColor: 'bg-orange-50',
        textColor: 'text-orange-700',
        description: 'Consider alternatives or pivot.'
      };
    case 'stop':
      return { 
        icon: X, 
        color: 'from-red-500 to-rose-600',
        bgColor: 'bg-red-50',
        textColor: 'text-red-700',
        description: 'Major issues need addressing.'
      };
    default:
      return { 
        icon: Sparkles, 
        color: 'from-gray-400 to-gray-500',
        bgColor: 'bg-gray-50',
        textColor: 'text-gray-700',
        description: 'Score your idea to see recommendation.'
      };
  }
};

export const DVFLiveScore = ({ scores, totalScore, recommendation, hasTitle, onEvaluate }: DVFLiveScoreProps) => {
  const config = getRecommendationConfig(recommendation);
  const Icon = config.icon;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
      <div className="text-center mb-6">
        <div className="relative inline-flex items-center justify-center w-20 h-20 mb-4">
          <div className={`absolute inset-0 bg-gradient-to-r ${config.color} rounded-full opacity-20 animate-pulse`}></div>
          <div className={`relative bg-gradient-to-r ${config.color} rounded-full p-4`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <div className="mb-2">
          <div className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {totalScore.toFixed(1)}
          </div>
          <div className="text-sm text-gray-500">out of 10</div>
        </div>
        
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bgColor} ${config.textColor}`}>
          {recommendation.charAt(0).toUpperCase() + recommendation.slice(1)}
        </div>
        
        <p className="text-xs text-gray-600 mt-2">{config.description}</p>
      </div>

      {/* Score Breakdown */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Desirability</span>
            <span className="text-sm font-bold text-blue-600">{scores.desirability}/10</span>
          </div>
          <Progress value={scores.desirability * 10} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Viability</span>
            <span className="text-sm font-bold text-green-600">{scores.viability}/10</span>
          </div>
          <Progress value={scores.viability * 10} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Feasibility</span>
            <span className="text-sm font-bold text-purple-600">{scores.feasibility}/10</span>
          </div>
          <Progress value={scores.feasibility * 10} className="h-2" />
        </div>
      </div>

      <Button 
        onClick={onEvaluate} 
        disabled={!hasTitle}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        <Sparkles className="w-4 h-4 mr-2" />
        Evaluate Idea
      </Button>
    </div>
  );
};
