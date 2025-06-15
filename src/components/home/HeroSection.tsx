
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Play, ChevronDown } from "lucide-react";

export const HeroSection = () => {
  const scrollToTools = () => {
    const toolsSection = document.getElementById('tools');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero content */}
      <div className="container mx-auto px-4 text-center relative z-10 max-w-7xl">
        
        {/* Main headline */}
        <div className="mb-20 space-y-12">
          <div className="relative">
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 mb-12">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-white/80 font-medium text-sm tracking-wider">LIVE & READY TO USE</span>
            </div>

            <h1 className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black leading-[0.9] tracking-tighter mb-8">
              <span className="block text-white relative">
                Product
              </span>
              <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent relative">
                Practice
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 blur-2xl rounded-full"></div>
              </span>
              <span className="block text-white relative">
                Excellence
              </span>
            </h1>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-xl md:text-2xl lg:text-3xl text-white/70 leading-relaxed font-light">
              Hi, I'm <span className="font-bold text-white">Prem Pradeep</span> — 
              Building the future of product management with
              <span className="block mt-2 text-white font-medium">ethical frameworks and sustainable innovation</span>
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
                <span className="text-white/80">15+ Premium Tools</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <span className="text-white/80">Ethical Problem Solving</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span className="text-white/80">Sustainable Innovation</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-16">
            <Button 
              size="lg" 
              onClick={scrollToTools} 
              className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 px-10 py-6 text-lg font-bold shadow-2xl hover:shadow-violet-500/25 transform hover:scale-105 transition-all duration-300 border-0 relative group overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <Sparkles className="w-5 h-5 mr-3" />
              Explore Tools
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="px-10 py-6 text-lg font-bold bg-white/5 backdrop-blur-sm border-2 border-white/20 hover:border-violet-400 hover:bg-white/10 text-white hover:text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-2xl"
            >
              <Link to="/contact">
                <Play className="w-5 h-5 mr-3" />
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTools}
            className="text-white/60 hover:text-white/80 p-2"
          >
            <ChevronDown className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};
