
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Target } from "lucide-react";

interface StrengthsAndDevelopmentProps {
  topStrengths: string[];
  developmentAreas: string[];
}

export const StrengthsAndDevelopment = ({ topStrengths, developmentAreas }: StrengthsAndDevelopmentProps) => {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Top Strengths */}
      {topStrengths.length > 0 && (
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
              {topStrengths.map((strength, index) => (
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
      {developmentAreas.length > 0 && (
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
              {developmentAreas.map((area, index) => (
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
  );
};
