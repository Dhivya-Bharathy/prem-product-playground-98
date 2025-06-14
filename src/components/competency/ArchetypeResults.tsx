
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PMArchetype, ShapePattern } from "@/types/competency";
import { Crown, Zap, Users, Target } from "lucide-react";

interface ArchetypeResultsProps {
  archetype: PMArchetype;
  shapePattern: ShapePattern;
}

const archetypeIcons = {
  'project-manager': Target,
  'people-manager': Users,
  'growth-hacker': Zap,
  'product-innovator': Crown,
};

export const ArchetypeResults = ({ archetype, shapePattern }: ArchetypeResultsProps) => {
  const IconComponent = archetypeIcons[archetype.id as keyof typeof archetypeIcons] || Crown;

  return (
    <div className="space-y-8">
      {/* Main Archetype Card */}
      <Card className="border-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="20" cy="20" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <CardHeader className="pb-8 relative z-10">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <IconComponent className="w-12 h-12" />
            </div>
            <div className="flex-1">
              <div className="text-lg font-medium text-blue-100 mb-2">🎉 Your PM Archetype</div>
              <CardTitle className="text-4xl font-bold mb-3">{archetype.name}</CardTitle>
              <div className="text-blue-100 text-lg">{shapePattern.description}</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-6">
            <p className="text-xl leading-relaxed text-blue-50">{archetype.description}</p>
            <p className="text-lg text-blue-100">{archetype.characteristics}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Strengths */}
        <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
          <CardHeader>
            <CardTitle className="text-green-700 flex items-center gap-3 text-xl">
              <div className="p-2 bg-green-100 rounded-xl">
                <Crown className="w-6 h-6" />
              </div>
              Your Core Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {archetype.strengths.map((strength, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <Badge className="bg-green-100 text-green-800 border-0 font-medium">
                    {strength}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-green-100/50 rounded-xl">
              <h4 className="font-semibold text-green-800 mb-3">Your Shape Pattern Traits:</h4>
              <div className="space-y-2">
                {shapePattern.traits.map((trait, index) => (
                  <div key={index} className="text-sm text-green-700 flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{trait}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Development Areas */}
        <Card className="border-0 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-100">
          <CardHeader>
            <CardTitle className="text-orange-700 flex items-center gap-3 text-xl">
              <div className="p-2 bg-orange-100 rounded-xl">
                <Target className="w-6 h-6" />
              </div>
              Growth Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {archetype.developmentAreas.map((area, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <Badge variant="outline" className="text-orange-700 border-orange-300 bg-white/50 font-medium">
                    {area}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-orange-100/50 rounded-xl">
              <div className="text-sm text-orange-700 leading-relaxed">
                <strong>💡 Growth Tip:</strong> Focus on these areas to become a more versatile product manager 
                and unlock new career opportunities. Consider seeking mentorship or training in these competencies.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Suitable Roles */}
      <Card className="border-0 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-100">
        <CardHeader>
          <CardTitle className="text-purple-700 flex items-center gap-3 text-xl">
            <div className="p-2 bg-purple-100 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            Perfect Role Matches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 mb-4">
            {archetype.suitableRoles.map((role, index) => (
              <Badge key={index} className="bg-purple-100 text-purple-800 border-0 px-4 py-2 text-sm font-medium">
                {role}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-purple-700 leading-relaxed bg-purple-50 p-4 rounded-xl">
            <strong>🚀 Career Insight:</strong> These roles align perfectly with your natural strengths and working style. 
            Your competency profile suggests you'll thrive in environments that leverage your core abilities.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
