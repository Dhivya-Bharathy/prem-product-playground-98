
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play, ChevronDown, Star, Users, Target } from "lucide-react";

export const HeroSection = () => {
  const scrollToTools = () => {
    const toolsSection = document.getElementById('tools');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent"></div>
      <div className="absolute top-20 right-0 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 bg-green-100 border border-green-200 rounded-full px-4 py-2 mb-8">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-700 font-medium text-sm">15+ Tools Available</span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Product Practice
          <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Excellence
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-4 leading-relaxed">
          Elevate your product management with ethical frameworks and 
          <span className="font-semibold text-gray-800"> sustainable innovation tools</span>
        </p>
        
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12">
          Built by <span className="font-semibold text-blue-600">Prem Pradeep</span> — 
          empowering product professionals worldwide
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-left">
              <div className="text-lg font-bold text-gray-900">15+</div>
              <div className="text-sm text-gray-500">Tools</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-left">
              <div className="text-lg font-bold text-gray-900">Ethical</div>
              <div className="text-sm text-gray-500">Focus</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-left">
              <div className="text-lg font-bold text-gray-900">Free</div>
              <div className="text-sm text-gray-500">Access</div>
            </div>
          </div>
        </div>
        
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Button 
            size="lg" 
            onClick={scrollToTools} 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 group"
          >
            Explore Tools
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            asChild 
            className="px-8 py-4 text-lg font-semibold border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
          >
            <Link to="/contact">
              <Play className="w-5 h-5 mr-2" />
              Get in Touch
            </Link>
          </Button>
        </div>

        {/* Scroll indicator */}
        <Button
          variant="ghost"
          size="sm"
          onClick={scrollToTools}
          className="text-gray-400 hover:text-gray-600 animate-bounce"
        >
          <ChevronDown className="w-6 h-6" />
        </Button>
      </div>
    </section>
  );
};
