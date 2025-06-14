
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
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
    const shareText = `I just completed the PM Competency Assessment! My archetype: ${results.archetype.name}`;
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'leverage': return '💪';
      case 'develop': return '📈';
      case 'focus': return '🎯';
      case 'role': return '🚀';
      default: return '💡';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Your Personalized Insights</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" onClick={onExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {results.topStrengths.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600 flex items-center gap-2">
              <span>🌟</span>
              Your Top Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {results.topStrengths.map((strength, index) => (
                <Badge key={index} className="bg-green-100 text-green-800">
                  {strength}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-3">
              These are your standout competencies where you consistently outperform expectations.
            </p>
          </CardContent>
        </Card>
      )}

      {results.developmentAreas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-orange-600 flex items-center gap-2">
              <span>🎯</span>
              Focus Areas for Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {results.developmentAreas.map((area, index) => (
                <Badge key={index} variant="outline" className="text-orange-600 border-orange-200">
                  {area}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Investing in these areas will have the biggest impact on your overall effectiveness.
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-blue-600 flex items-center gap-2">
            <span>📋</span>
            Personalized Action Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {results.recommendations.map((recommendation, index) => (
            <div key={recommendation.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getTypeIcon(recommendation.type)}</span>
                  <h4 className="font-medium text-gray-900">{recommendation.title}</h4>
                </div>
                <Badge className={getPriorityColor(recommendation.priority)}>
                  {recommendation.priority}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">{recommendation.description}</p>
              <div className="bg-blue-50 p-3 rounded text-sm text-blue-800">
                <strong>Action:</strong> {recommendation.action}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Ready to take your PM career to the next level?
            </h3>
            <p className="text-gray-600">
              Use these insights to guide your professional development and career decisions.
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={onReset} variant="outline">
                Take Assessment Again
              </Button>
              <Button onClick={onExport}>
                Download Full Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
