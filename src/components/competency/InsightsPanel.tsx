
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Share2, RefreshCw, Lightbulb, Target, Zap, Users } from "lucide-react";
import { AssessmentResults } from "@/types/competency";
import { useToast } from "@/hooks/use-toast";

interface InsightsPanelProps {
  results: AssessmentResults;
  onExport: () => void;
  onReset: () => void;
}

export const InsightsPanel = ({ results, onExport, onReset }: InsightsPanelProps) => {
  const { toast } = useToast();

  const handleShare = () => {
    const shareText = `🎯 Just completed the PM Competency Assessment! My archetype: ${results.archetype.name}. Discover yours at ${window.location.href}`;
    if (navigator.share) {
      navigator.share({
        title: 'PM Competency Assessment Results',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to clipboard",
        description: "Share text has been copied to your clipboard."
      });
    }
  };

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Personalized Insights</h2>
          <p className="text-gray-600">Actionable recommendations based on your competency profile</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleShare} className="rounded-xl">
            <Share2 className="w-4 h-4 mr-2" />
            Share Results
          </Button>
          <Button variant="outline" onClick={onExport} className="rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Strengths */}
        {results.topStrengths.length > 0 && (
          <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
            <CardHeader>
              <CardTitle className="text-green-700 flex items-center gap-3 text-xl">
                <div className="p-2 bg-green-100 rounded-xl">
                  <Zap className="w-6 h-6" />
                </div>
                Your Standout Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                {results.topStrengths.map((strength, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <Badge className="bg-green-100 text-green-800 border-0 font-medium">
                      {strength}
                    </Badge>
                  </div>
                ))}
              </div>
              <p className="text-sm text-green-700 bg-green-100/50 p-4 rounded-xl">
                <strong>💪 Leverage these:</strong> These are your standout competencies where you consistently 
                outperform expectations. Use these as your competitive advantage.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Development Areas */}
        {results.developmentAreas.length > 0 && (
          <Card className="border-0 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-100">
            <CardHeader>
              <CardTitle className="text-orange-700 flex items-center gap-3 text-xl">
                <div className="p-2 bg-orange-100 rounded-xl">
                  <Target className="w-6 h-6" />
                </div>
                Priority Growth Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                {results.developmentAreas.map((area, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <Badge variant="outline" className="text-orange-700 border-orange-300 bg-white/50 font-medium">
                      {area}
                    </Badge>
                  </div>
                ))}
              </div>
              <p className="text-sm text-orange-700 bg-orange-100/50 p-4 rounded-xl">
                <strong>🎯 Focus here:</strong> Investing in these areas will have the biggest impact on 
                your overall PM effectiveness and career growth.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Action Plan */}
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
          {results.recommendations.map((recommendation, index) => {
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

      {/* Call to Action */}
      <Card className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="py-8">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold">
              Ready to Accelerate Your PM Career?
            </h3>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Use these insights to guide your professional development, career decisions, and growth conversations with your manager.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                onClick={onReset} 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retake Assessment
              </Button>
              <Button 
                onClick={onExport}
                className="bg-white text-blue-600 hover:bg-blue-50 rounded-xl font-semibold"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Full Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
