
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Target } from "lucide-react";
import { productTools, assessmentTools } from "@/data/tools";

export const ToolsGrid = () => {
  const renderToolCard = (tool: any, index: number) => {
    const IconComponent = tool.icon;
    
    const getDifficultyColor = (difficulty: string) => {
      switch (difficulty) {
        case 'Beginner':
          return 'bg-green-100 text-green-700 border-green-200';
        case 'Intermediate':
          return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        case 'Advanced':
          return 'bg-red-100 text-red-700 border-red-200';
        default:
          return 'bg-blue-100 text-blue-700 border-blue-200';
      }
    };

    return (
      <Link to={tool.path} className="block group">
        <Card 
          key={tool.id} 
          className="h-full transform transition-all duration-300 ease-in-out group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-purple-100 border border-gray-200/80 bg-white/50"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg">
                <IconComponent className="h-6 w-6 text-indigo-600" />
              </div>
              <Badge 
                variant="outline" 
                className={`${getDifficultyColor(tool.difficulty)} text-xs`}
              >
                {tool.difficulty}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-indigo-600">
              {tool.title}
            </CardTitle>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {tool.description}
            </p>
            <div className="flex items-center text-sm font-medium text-indigo-600">
              Use Now
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  };

  const renderAssessmentCard = (tool: any, index: number) => {
    const IconComponent = tool.icon;
    
    return (
      <Link to={tool.path} className="block group">
        <Card 
          key={tool.id} 
          className="h-full transform transition-all duration-300 ease-in-out group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-teal-100 border border-teal-200/80 bg-gradient-to-br from-teal-50/50 to-cyan-50/50"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-lg">
                <IconComponent className="h-6 w-6 text-teal-600" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div className="bg-teal-500 h-2 rounded-full w-0 group-hover:w-full transition-all duration-1000"></div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-teal-600">
              {tool.title}
            </CardTitle>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {tool.description}
            </p>
            <div className="flex items-center text-sm font-medium text-teal-600">
              Start Assessment
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  };

  // Get exactly 6 featured tools
  const featuredTools = productTools.slice(0, 6);

  return (
    <section id="tools" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Featured Tools Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge variant="outline" className="text-sm font-semibold border-purple-300 bg-purple-50 text-purple-700 py-1 px-4 mb-4">
              FEATURED TOOLS
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Essential Product Excellence Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Carefully crafted tools to accelerate your product practice and team outcomes.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTools.map((tool, index) => renderToolCard(tool, index))}
          </div>
        </div>

        {/* Assessments Section */}
        <div id="assessments">
          <div className="text-center mb-12">
            <Badge variant="outline" className="text-sm font-semibold border-teal-300 bg-teal-50 text-teal-700 py-1 px-4 mb-4">
              STRATEGIC ASSESSMENTS
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Discover Your Product Shape
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive assessments to understand your strengths and accelerate your growth.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {assessmentTools.map((tool, index) => renderAssessmentCard(tool, index))}
          </div>
        </div>
      </div>
    </section>
  );
};
