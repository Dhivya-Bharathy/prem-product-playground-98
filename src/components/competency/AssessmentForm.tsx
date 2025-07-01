
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { COMPETENCIES, COMPETENCY_AREAS, CompetencyRating } from "@/types/competency";
import { ChevronLeft, CheckCircle, Circle } from "lucide-react";

interface AssessmentFormProps {
  onComplete: (ratings: CompetencyRating[]) => void;
  onBack: () => void;
}

export const AssessmentForm = ({ onComplete, onBack }: AssessmentFormProps) => {
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [currentAreaIndex, setCurrentAreaIndex] = useState(0);

  const handleRatingChange = (competencyId: string, rating: string) => {
    setRatings(prev => ({
      ...prev,
      [competencyId]: parseInt(rating)
    }));
  };

  const handleNextArea = () => {
    if (currentAreaIndex < COMPETENCY_AREAS.length - 1) {
      setCurrentAreaIndex(currentAreaIndex + 1);
    }
  };

  const handlePrevArea = () => {
    if (currentAreaIndex > 0) {
      setCurrentAreaIndex(currentAreaIndex - 1);
    }
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
  const currentArea = COMPETENCY_AREAS[currentAreaIndex];
  const currentAreaCompetencies = COMPETENCIES.filter(comp => comp.area === currentArea.id);
  const areaCompletedCount = currentAreaCompetencies.filter(comp => ratings[comp.id]).length;
  const isAreaComplete = areaCompletedCount === currentAreaCompetencies.length;

  const getRatingConfig = (rating: number) => {
    switch (rating) {
      case 1: return { label: "Needs Focus", color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" };
      case 2: return { label: "On Track", color: "text-yellow-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-200" };
      case 3: return { label: "Outperform", color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" };
      default: return { label: "", color: "", bgColor: "", borderColor: "" };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack} className="rounded-xl">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Self-Assessment</h2>
              <p className="text-gray-600">Rate yourself honestly on each competency</p>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <Card className="mb-8 border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="py-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                <span className="text-sm text-gray-600">{completedCount} of {COMPETENCIES.length} completed</span>
              </div>
              <Progress value={progress} className="h-3 bg-gray-100" />
              
              {/* Area Navigation */}
              <div className="flex gap-2 mt-6">
                {COMPETENCY_AREAS.map((area, index) => {
                  const areaComps = COMPETENCIES.filter(comp => comp.area === area.id);
                  const areaCompleted = areaComps.filter(comp => ratings[comp.id]).length;
                  const isCompleted = areaCompleted === areaComps.length;
                  const isCurrent = index === currentAreaIndex;
                  
                  return (
                    <Button
                      key={area.id}
                      variant={isCurrent ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentAreaIndex(index)}
                      className={`flex items-center gap-2 ${isCurrent ? 'bg-blue-600' : ''}`}
                    >
                      {isCompleted ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                      {area.name}
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rating Scale */}
        <Card className="mb-8 border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="py-6">
            <h3 className="font-semibold text-gray-900 mb-4">Rating Scale</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3].map((rating) => {
                const config = getRatingConfig(rating);
                return (
                  <div key={rating} className={`text-center p-4 rounded-xl border-2 ${config.bgColor} ${config.borderColor}`}>
                    <div className={`${config.color} font-semibold text-lg`}>{rating} - {config.label}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {rating === 1 && "Areas requiring development"}
                      {rating === 2 && "Meeting expectations well"}
                      {rating === 3 && "Exceeding expectations consistently"}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Current Area Assessment */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-blue-600 mb-2">
                  {currentArea.name}
                </CardTitle>
                <p className="text-gray-600">{currentArea.description}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {currentAreaCompetencies.map((competency) => {
              const currentRating = ratings[competency.id];
              const config = currentRating ? getRatingConfig(currentRating) : null;
              
              return (
                <div key={competency.id} className="space-y-4 p-6 border-2 border-gray-100 rounded-2xl hover:border-blue-200 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 text-lg">{competency.name}</h4>
                      {config && (
                        <Badge className={`${config.bgColor} ${config.color} border-0`}>
                          {currentRating} - {config.label}
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 leading-relaxed">{competency.definition}</p>
                  </div>
                  
                  <RadioGroup
                    value={currentRating?.toString() || ""}
                    onValueChange={(value) => handleRatingChange(competency.id, value)}
                    className="flex gap-6"
                  >
                    {[1, 2, 3].map((rating) => {
                      const ratingConfig = getRatingConfig(rating);
                      return (
                        <div key={rating} className="flex items-center space-x-3">
                          <RadioGroupItem value={rating.toString()} id={`${competency.id}-${rating}`} />
                          <Label 
                            htmlFor={`${competency.id}-${rating}`} 
                            className={`text-sm cursor-pointer ${ratingConfig.color} font-medium`}
                          >
                            {rating} - {ratingConfig.label}
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button 
            variant="outline" 
            onClick={handlePrevArea}
            disabled={currentAreaIndex === 0}
            className="rounded-xl"
          >
            Previous Area
          </Button>
          
          <div className="flex gap-4">
            {currentAreaIndex < COMPETENCY_AREAS.length - 1 ? (
              <Button 
                onClick={handleNextArea}
                disabled={!isAreaComplete}
                className="rounded-xl px-8"
              >
                Next Area
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={completedCount < COMPETENCIES.length}
                size="lg"
                className="rounded-xl px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {completedCount < COMPETENCIES.length 
                  ? `Complete ${COMPETENCIES.length - completedCount} more to continue`
                  : 'View My Results'
                }
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
