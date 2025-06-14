
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";

export const DVFGuide = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>What is the DVF Framework?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            The DVF Framework is a systematic approach to evaluating product ideas and features 
            by examining three critical dimensions that determine success in the market.
          </p>
          
          <div className="grid gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-blue-600 mb-2">🎯 Desirability</h4>
              <p className="text-sm text-gray-600">
                Measures how much users want the solution. This includes user demand, 
                problem-solution fit, and emotional appeal.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-green-600 mb-2">💰 Viability</h4>
              <p className="text-sm text-gray-600">
                Assesses whether the idea can become a sustainable business. This covers 
                revenue potential, market size, and competitive positioning.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-purple-600 mb-2">🔧 Feasibility</h4>
              <p className="text-sm text-gray-600">
                Evaluates whether the solution can actually be built with available resources, 
                technology, and within realistic timelines.
              </p>
            </div>
          </div>
          
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertDescription>
              The sweet spot for successful products is where all three dimensions score highly. 
              Ideas that excel in all areas have the highest probability of market success.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scoring Guidelines</CardTitle>
          <CardDescription>How to interpret DVF scores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded">
              <span className="font-medium">8-10: Excellent</span>
              <span className="text-sm text-gray-600">Strong evidence supporting this dimension</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
              <span className="font-medium">6-7: Good</span>
              <span className="text-sm text-gray-600">Positive indicators with minor concerns</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
              <span className="font-medium">4-5: Average</span>
              <span className="text-sm text-gray-600">Mixed signals, needs further investigation</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
              <span className="font-medium">2-3: Poor</span>
              <span className="text-sm text-gray-600">Significant concerns and red flags</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded">
              <span className="font-medium">1: Very Poor</span>
              <span className="text-sm text-gray-600">Major issues that likely prevent success</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
