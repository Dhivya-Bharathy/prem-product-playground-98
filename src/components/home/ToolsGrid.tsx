
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Target, Star } from "lucide-react";
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
      <Card 
        key={tool.id} 
        className="group hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-1 transition-all duration-300 border border-gray-200 bg-white relative overflow-hidden"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/50 group-hover:to-purple-50/50 transition-all duration-300"></div>
        
        <CardHeader className="relative z-10 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
              <IconComponent className="w-6 h-6 text-blue-600" />
            </div>
            <Badge 
              variant="outline" 
              className={`${getDifficultyColor(tool.difficulty)} font-medium text-xs px-3 py-1`}
            >
              {tool.difficulty}
            </Badge>
          </div>
          <CardTitle className="text-lg group-hover:text-blue-700 transition-colors duration-200 mb-2">
            {tool.title}
          </CardTitle>
          <CardDescription className="text-gray-600 leading-relaxed text-sm">
            {tool.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 pt-0">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs font-medium">
              {tool.category}
            </Badge>
            <Button 
              asChild 
              size="sm" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group/btn shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Link to={tool.path} className="flex items-center">
                Try Tool
                <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-200" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section id="tools" className="py-20 bg-gray-50/50">
      <div className="container mx-auto px-4">
        {/* Product Management Tools Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 font-semibold text-sm">CORE TOOLS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Product Management
              <span className="block text-blue-600">Arsenal</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive frameworks for planning, executing, and optimizing your product strategy with 
              <span className="font-semibold text-gray-800"> ethical considerations</span> at the core.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productTools.map((tool, index) => renderToolCard(tool, index))}
          </div>
        </div>

        {/* Assessment Tools Section */}
        <div>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-200 rounded-full px-4 py-2 mb-6">
              <Target className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700 font-semibold text-sm">ASSESSMENTS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Skill Enhancement
              <span className="block text-purple-600">Suite</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Evaluate your skills and analyze design patterns to advance your practice and ensure 
              <span className="font-semibold text-gray-800"> responsible product development</span>.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessmentTools.map((tool, index) => renderToolCard(tool, index))}
          </div>
        </div>
      </div>
    </section>
  );
};
