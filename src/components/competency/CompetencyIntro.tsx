import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { COMPETENCY_AREAS } from "@/types/competency";
import { Users, Target, TrendingUp, Brain } from "lucide-react";

interface CompetencyIntroProps {
  onStart: () => void;
}

const areaIcons = {
  'product-execution': Brain,
  'customer-insight': Users,
  'product-strategy': Target,
  'influencing-people': TrendingUp,
};

export const CompetencyIntro = ({ onStart }: CompetencyIntroProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            ✨ Discover Your PM Archetype
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#22325F] leading-tight">
            PM Competency Assessment
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Unlock your product management potential with our comprehensive assessment. 
            Discover your unique strengths, identify growth opportunities, and find your ideal PM archetype.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 px-4 py-2">12 Core Competencies</Badge>
            <Badge variant="secondary" className="bg-purple-50 text-purple-700 px-4 py-2">4 Key Areas</Badge>
            <Badge variant="secondary" className="bg-green-50 text-green-700 px-4 py-2">Personalized Insights</Badge>
          </div>
        </div>

        {/* Competency Areas Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {COMPETENCY_AREAS.map((area, index) => {
            const IconComponent = areaIcons[area.id as keyof typeof areaIcons];
            return (
              <Card key={area.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 rounded-xl bg-[#22325F] text-teal-400 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {area.name}
                      </CardTitle>
                      <p className="text-sm text-gray-500 mt-1">{area.competencies.length} competencies</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{area.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-700">Key Competencies:</p>
                    <div className="flex flex-wrap gap-2">
                      {area.competencies.slice(0, 3).map((competency) => (
                        <Badge key={competency} variant="outline" className="text-xs border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                          {competency.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Benefits Section */}
        <Card className="border-0 bg-[#22325F] text-white mb-12">
          <CardContent className="py-12 px-8">
            <div className="text-center space-y-8">
              <h3 className="text-3xl font-bold text-teal-400">
                What You'll Discover
              </h3>
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto">
                    <Target className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Your PM Shape</div>
                    <div className="text-blue-100 text-sm leading-relaxed">Interactive radar visualization of your competency profile</div>
                  </div>
                </div>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto">
                    <Users className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Your Archetype</div>
                    <div className="text-blue-100 text-sm leading-relaxed">Discover if you're a Builder, Architect, Leader, or Manager</div>
                  </div>
                </div>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Growth Plan</div>
                    <div className="text-blue-100 text-sm leading-relaxed">Personalized recommendations for your career development</div>
                  </div>
                </div>
              </div>
              <Button 
                onClick={onStart} 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Your Assessment
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            ⏱️ Takes 5-10 minutes to complete • 💡 Based on industry best practices • 🔒 Your data stays private
          </p>
        </div>
      </div>
    </div>
  );
};
