
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Star, ChevronRight, Rocket, Target } from "lucide-react";
import { productTools, assessmentTools } from "@/data/tools";

export const ToolsGrid = () => {
  const renderToolCard = (tool: any, index: number) => {
    const IconComponent = tool.icon;
    return (
      <Card 
        key={tool.id} 
        className="group hover:shadow-2xl hover:shadow-violet-500/10 hover:scale-[1.02] transition-all duration-500 border-0 bg-white/5 backdrop-blur-md hover:bg-white/10 overflow-hidden relative rounded-3xl"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Animated border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
        
        {/* Card Content */}
        <div className="relative z-10 h-full">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-6">
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl group-hover:from-violet-500/20 group-hover:to-purple-500/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border border-white/10">
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
              </div>
              <Badge 
                variant="outline" 
                className={`${
                  tool.difficulty === 'Beginner' ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10' :
                  tool.difficulty === 'Intermediate' ? 'border-yellow-400 text-yellow-300 bg-yellow-500/10' :
                  tool.difficulty === 'Advanced' ? 'border-red-400 text-red-300 bg-red-500/10' :
                  'border-blue-400 text-blue-300 bg-blue-500/10'
                } backdrop-blur-sm border font-semibold rounded-full px-3 py-1`}
              >
                {tool.difficulty}
              </Badge>
            </div>
            <CardTitle className="text-xl group-hover:text-violet-300 transition-colors duration-300 mb-3 text-white font-bold">
              {tool.title}
            </CardTitle>
            <CardDescription className="text-white/70 leading-relaxed text-sm">
              {tool.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-white/10 text-white/80 text-xs backdrop-blur-sm border border-white/20 font-medium rounded-full">
                {tool.category}
              </Badge>
              <Button 
                asChild 
                size="sm" 
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 group/btn shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-bold rounded-xl"
              >
                <Link to={tool.path} className="flex items-center">
                  Try Tool
                  <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-200" />
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
      <div className="container mx-auto px-4 relative z-10">
        {/* Product Management Tools Section */}
        <div className="mb-32">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-8 py-4 mb-8">
              <Rocket className="w-5 h-5 text-violet-400" />
              <span className="text-white font-bold text-base tracking-wide">CORE TOOLS</span>
              <Star className="w-4 h-4 text-fuchsia-400" />
            </div>
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              Product Management
              <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                Arsenal
              </span>
            </h3>
            <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
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
              <Target className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-bold text-base tracking-wide">ASSESSMENTS</span>
              <Sparkles className="w-4 h-4 text-pink-400" />
            </div>
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              Skill Enhancement
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                Suite
              </span>
            </h3>
            <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
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
