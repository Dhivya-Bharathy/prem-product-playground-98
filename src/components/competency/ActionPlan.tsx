
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Target, Zap, Users } from "lucide-react";
import { Recommendation } from "@/types/competency";

interface ActionPlanProps {
  recommendations: Recommendation[];
}

const getPriorityConfig = (priority: string) => {
  switch (priority) {
    case 'high': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' };
    case 'medium': return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' };
    case 'low': return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' };
    default: return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'leverage': return Zap;
    case 'develop': return Target;
    case 'focus': return Lightbulb;
    case 'role': return Users;
    default: return Lightbulb;
  }
};

export const ActionPlan = ({ recommendations }: ActionPlanProps) => {
  return (
    <Card className="border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-blue-700 flex items-center gap-3 text-2xl">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Lightbulb className="w-7 h-7" />
          </div>
          Your Personalized Action Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {recommendations.map((recommendation, index) => {
          const IconComponent = getTypeIcon(recommendation.type);
          const priorityConfig = getPriorityConfig(recommendation.priority);
          
          return (
            <div key={recommendation.id} className="border-2 border-gray-100 rounded-2xl p-6 hover:border-blue-200 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-50 rounded-xl">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{recommendation.title}</h4>
                    <p className="text-gray-600 mt-1">{recommendation.description}</p>
                  </div>
                </div>
                <Badge className={`${priorityConfig.bg} ${priorityConfig.text} border-0 font-medium`}>
                  {recommendation.priority.toUpperCase()}
                </Badge>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="text-sm text-blue-800">
                  <strong className="text-blue-900">🚀 Action Step:</strong> {recommendation.action}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
