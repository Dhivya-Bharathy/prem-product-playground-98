
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { COMPETENCY_AREAS } from "@/types/competency";

interface CompetencyIntroProps {
  onStart: () => void;
}

export const CompetencyIntro = ({ onStart }: CompetencyIntroProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          PM Competency Assessment
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover your product management archetype by assessing yourself across 12 core competencies. 
          Understand your strengths, identify development areas, and find your ideal PM role.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {COMPETENCY_AREAS.map((area) => (
          <Card key={area.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg text-blue-600">{area.name}</CardTitle>
              <p className="text-sm text-gray-600">{area.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Key Competencies:</p>
                <div className="flex flex-wrap gap-2">
                  {area.competencies.map((competency) => (
                    <Badge key={competency} variant="secondary" className="text-xs">
                      {competency.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-blue-900">
              What You'll Get
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium text-blue-800">Your PM Shape</div>
                <div className="text-blue-700">Visual radar chart of your competencies</div>
              </div>
              <div>
                <div className="font-medium text-blue-800">Your Archetype</div>
                <div className="text-blue-700">Discover if you're a Builder, Architect, Leader, or Manager</div>
              </div>
              <div>
                <div className="font-medium text-blue-800">Personalized Insights</div>
                <div className="text-blue-700">Tailored recommendations for your growth</div>
              </div>
            </div>
            <Button onClick={onStart} size="lg" className="mt-4">
              Start Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
