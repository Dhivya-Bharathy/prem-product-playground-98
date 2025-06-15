
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Star } from "lucide-react";
import { productTools, assessmentTools } from "@/data/tools";

export const ToolsGrid = () => {
  const renderToolCard = (tool: any, index: number) => {
    const IconComponent = tool.icon;
    return (
      <Card 
        key={tool.id} 
        className="group hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm hover:bg-white overflow-hidden relative"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
        
        {/* Card Content */}
        <div className="relative z-10 bg-white/90 backdrop-blur-sm h-full">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                </div>
                {/* Floating Sparkle */}
                <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
                </div>
              </div>
              <Badge 
                variant="outline" 
                className={`${
                  tool.difficulty === 'Beginner' ? 'border-green-300 text-green-700 bg-green-50/80' :
                  tool.difficulty === 'Intermediate' ? 'border-yellow-300 text-yellow-700 bg-yellow-50/80' :
                  tool.difficulty === 'Advanced' ? 'border-red-300 text-red-700 bg-red-50/80' :
                  'border-blue-300 text-blue-700 bg-blue-50/80'
                } backdrop-blur-sm`}
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
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-gray-100/80 text-gray-700 text-xs backdrop-blur-sm">
                {tool.category}
              </Badge>
              <Button 
                asChild 
                size="sm" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 group/btn shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Link to={tool.path} className="flex items-center">
                  Try Tool
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  };

  return (
    <section id="tools" className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-300 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-300 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Product Management Tools Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-full px-6 py-3 mb-6 shadow-lg">
              <Zap className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-semibold">Core Tools</span>
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
            <h3 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Product Management
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tools
              </span>
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Essential frameworks for planning, executing, and optimizing your product strategy with ethical considerations at the core.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productTools.map((tool, index) => renderToolCard(tool, index))}
          </div>
        </div>

        {/* Assessment Tools Section */}
        <div>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-purple-200/50 rounded-full px-6 py-3 mb-6 shadow-lg">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-purple-700 font-semibold">Assessments</span>
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
            <h3 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Assessment
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Tools
              </span>
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Evaluate your skills and analyze design patterns to improve your practice and ensure ethical product development.
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
