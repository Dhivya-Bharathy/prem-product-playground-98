
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Star, ChevronRight } from "lucide-react";
import { productTools, assessmentTools } from "@/data/tools";

export const ToolsGrid = () => {
  const renderToolCard = (tool: any, index: number) => {
    const IconComponent = tool.icon;
    return (
      <Card 
        key={tool.id} 
        className="group hover:shadow-2xl hover:shadow-purple-500/10 hover:scale-[1.02] transition-all duration-500 border-0 bg-white/5 backdrop-blur-md hover:bg-white/10 overflow-hidden relative"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Animated border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
        
        {/* Card Content */}
        <div className="relative z-10 h-full">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-6">
              <div className="relative">
                <div className="p-5 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border border-white/10">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                {/* Floating particles */}
                <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                </div>
              </div>
              <Badge 
                variant="outline" 
                className={`${
                  tool.difficulty === 'Beginner' ? 'border-green-400 text-green-300 bg-green-500/10' :
                  tool.difficulty === 'Intermediate' ? 'border-yellow-400 text-yellow-300 bg-yellow-500/10' :
                  tool.difficulty === 'Advanced' ? 'border-red-400 text-red-300 bg-red-500/10' :
                  'border-blue-400 text-blue-300 bg-blue-500/10'
                } backdrop-blur-sm border-2 font-semibold`}
              >
                {tool.difficulty}
              </Badge>
            </div>
            <CardTitle className="text-2xl group-hover:text-purple-300 transition-colors duration-300 mb-3 text-white font-bold">
              {tool.title}
            </CardTitle>
            <CardDescription className="text-gray-300 leading-relaxed text-base">
              {tool.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-white/10 text-gray-300 text-sm backdrop-blur-sm border border-white/20 font-medium">
                {tool.category}
              </Badge>
              <Button 
                asChild 
                size="sm" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 group/btn shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-bold"
              >
                <Link to={tool.path} className="flex items-center">
                  Try Tool
                  <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  };

  return (
    <section id="tools" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Product Management Tools Section */}
        <div className="mb-32">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-8 py-4 mb-8">
              <Zap className="w-6 h-6 text-yellow-400" />
              <span className="text-white font-black text-lg tracking-wide">CORE ARSENAL</span>
              <Star className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              Product Management
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Weapons
              </span>
            </h3>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              Battle-tested frameworks for planning, executing, and optimizing your product strategy with 
              <span className="text-white font-semibold"> ethical considerations</span> at the core.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productTools.map((tool, index) => renderToolCard(tool, index))}
          </div>
        </div>

        {/* Assessment Tools Section */}
        <div>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-8 py-4 mb-8">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              <span className="text-white font-black text-lg tracking-wide">SKILL ENHANCERS</span>
              <Star className="w-5 h-5 text-pink-400" />
            </div>
            <h3 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              Assessment
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Arsenal
              </span>
            </h3>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              Evaluate your skills and analyze design patterns to level up your practice and ensure 
              <span className="text-white font-semibold"> ethical product development</span>.
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
