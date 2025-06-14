
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { productTools, assessmentTools } from "@/data/tools";

export const ToolsGrid = () => {
  const renderToolCard = (tool: any, index: number) => {
    const IconComponent = tool.icon;
    return (
      <Card 
        key={tool.id} 
        className="group hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border-0 bg-white hover:bg-white overflow-hidden relative"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <CardHeader className="relative pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300 group-hover:scale-110">
              <IconComponent className="w-8 h-8 text-blue-600" />
            </div>
            <Badge 
              variant="outline" 
              className={`${
                tool.difficulty === 'Beginner' ? 'border-green-200 text-green-700 bg-green-50' :
                tool.difficulty === 'Intermediate' ? 'border-yellow-200 text-yellow-700 bg-yellow-50' :
                tool.difficulty === 'Advanced' ? 'border-red-200 text-red-700 bg-red-50' :
                'border-blue-200 text-blue-700 bg-blue-50'
              }`}
            >
              {tool.difficulty}
            </Badge>
          </div>
          <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-300 mb-2">
            {tool.title}
          </CardTitle>
          <CardDescription className="text-gray-600 leading-relaxed text-sm">
            {tool.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative pt-0">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
              {tool.category}
            </Badge>
            <Button asChild size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 group/btn">
              <Link to={tool.path} className="flex items-center">
                Try Tool
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section id="tools" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Product Management Tools Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 mb-6 border-0">
              <Sparkles className="w-4 h-4 mr-2" />
              Core Tools
            </Badge>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Product Management
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Tools</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Essential frameworks for planning, executing, and optimizing your product strategy.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productTools.map((tool, index) => renderToolCard(tool, index))}
          </div>
        </div>

        {/* Assessment Tools Section */}
        <div>
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-700 text-sm font-medium px-4 py-2 mb-6 border-0">
              <Sparkles className="w-4 h-4 mr-2" />
              Assessments
            </Badge>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Assessment
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Tools</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Evaluate your skills and analyze design patterns to improve your practice.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {assessmentTools.map((tool, index) => renderToolCard(tool, index))}
          </div>
        </div>
      </div>
    </section>
  );
};
