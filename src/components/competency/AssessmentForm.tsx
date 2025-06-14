
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { COMPETENCIES, COMPETENCY_AREAS, CompetencyRating } from "@/types/competency";

interface AssessmentFormProps {
  onComplete: (ratings: CompetencyRating[]) => void;
  onBack: () => void;
}

export const AssessmentForm = ({ onComplete, onBack }: AssessmentFormProps) => {
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});

  const handleRatingChange = (competencyId: string, rating: string) => {
    setRatings(prev => ({
      ...prev,
      [competencyId]: parseInt(rating)
    }));
  };

  const handleSubmit = () => {
    const competencyRatings: CompetencyRating[] = COMPETENCIES.map(comp => ({
      competencyId: comp.id,
      rating: (ratings[comp.id] || 1) as 1 | 2 | 3
    }));
    onComplete(competencyRatings);
  };

  const completedCount = Object.keys(ratings).length;
  const progress = (completedCount / COMPETENCIES.length) * 100;

  const getRatingLabel = (rating: number) => {
    switch (rating) {
      case 1: return "Needs Focus";
      case 2: return "On Track";
      case 3: return "Outperform";
      default: return "";
    }
  };

  const getRatingColor = (rating: number) => {
    switch (rating) {
      case 1: return "text-red-600";
      case 2: return "text-yellow-600";
      case 3: return "text-green-600";
      default: return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Self-Assessment</h2>
          <p className="text-gray-600">Rate yourself on each competency using the scale below</p>
        </div>
        <Button variant="outline" onClick={onBack}>Back</Button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{completedCount} of {COMPETENCIES.length} completed</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 border rounded-lg">
          <div className="text-red-600 font-medium">1 - Needs Focus</div>
          <div className="text-xs text-gray-600">Areas requiring development</div>
        </div>
        <div className="text-center p-3 border rounded-lg">
          <div className="text-yellow-600 font-medium">2 - On Track</div>
          <div className="text-xs text-gray-600">Meeting expectations</div>
        </div>
        <div className="text-center p-3 border rounded-lg">
          <div className="text-green-600 font-medium">3 - Outperform</div>
          <div className="text-xs text-gray-600">Exceeding expectations</div>
        </div>
      </div>

      {COMPETENCY_AREAS.map((area) => (
        <Card key={area.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="text-blue-600">{area.name}</span>
              <Badge variant="outline">{area.competencies.length} competencies</Badge>
            </CardTitle>
            <p className="text-sm text-gray-600">{area.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {COMPETENCIES.filter(comp => comp.area === area.id).map((competency) => (
              <div key={competency.id} className="space-y-3 p-4 border rounded-lg">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{competency.name}</h4>
                    {ratings[competency.id] && (
                      <Badge 
                        variant="outline" 
                        className={getRatingColor(ratings[competency.id])}
                      >
                        {getRatingLabel(ratings[competency.id])}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{competency.definition}</p>
                </div>
                
                <RadioGroup
                  value={ratings[competency.id]?.toString() || ""}
                  onValueChange={(value) => handleRatingChange(competency.id, value)}
                >
                  <div className="flex gap-6">
                    {[1, 2, 3].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <RadioGroupItem value={rating.toString()} id={`${competency.id}-${rating}`} />
                        <Label 
                          htmlFor={`${competency.id}-${rating}`} 
                          className={`text-sm cursor-pointer ${getRatingColor(rating)}`}
                        >
                          {rating} - {getRatingLabel(rating)}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-center">
        <Button 
          onClick={handleSubmit}
          disabled={completedCount < COMPETENCIES.length}
          size="lg"
        >
          {completedCount < COMPETENCIES.length 
            ? `Complete ${COMPETENCIES.length - completedCount} more to continue`
            : 'View My Results'
          }
        </Button>
      </div>
    </div>
  );
};
