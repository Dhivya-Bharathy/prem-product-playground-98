
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PMArchetype, ShapePattern } from "@/types/competency";

interface ArchetypeResultsProps {
  archetype: PMArchetype;
  shapePattern: ShapePattern;
}

export const ArchetypeResults = ({ archetype, shapePattern }: ArchetypeResultsProps) => {
  return (
    <div className="space-y-6">
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <div className="text-xl text-blue-900">You are: {archetype.name}</div>
              <div className="text-sm text-blue-700">{shapePattern.description}</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-800 text-lg">{archetype.description}</p>
          <p className="text-blue-700 mt-2">{archetype.characteristics}</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600 flex items-center gap-2">
              <span>💪</span>
              Your Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {archetype.strengths.map((strength, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">{strength}</Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Shape Pattern Traits:</h4>
              <div className="space-y-1">
                {shapePattern.traits.map((trait, index) => (
                  <div key={index} className="text-sm text-green-700">• {trait}</div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-orange-600 flex items-center gap-2">
              <span>🎯</span>
              Development Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {archetype.developmentAreas.map((area, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Badge variant="outline" className="text-orange-600 border-orange-200">
                    {area}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <div className="text-sm text-orange-700">
                Focus on these areas to become a more well-rounded product manager and unlock new career opportunities.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-purple-600 flex items-center gap-2">
            <span>🚀</span>
            Suitable Roles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {archetype.suitableRoles.map((role, index) => (
              <Badge key={index} className="bg-purple-100 text-purple-800">
                {role}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Based on your competency profile, these roles align well with your natural strengths and working style.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
