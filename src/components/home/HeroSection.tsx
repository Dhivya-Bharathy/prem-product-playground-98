
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, TrendingUp, Stars, Rocket } from "lucide-react";

export const HeroSection = () => {
  const scrollToTools = () => {
    const toolsSection = document.getElementById('tools');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-purple-500 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-cyan-400 rounded-full animate-bounce opacity-70" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-pink-500 rounded-full animate-bounce opacity-80" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-8 h-8 border border-purple-400 rounded-full animate-spin opacity-30" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-1/4 left-1/6 w-5 h-5 border border-cyan-400 rounded-lg animate-pulse opacity-40"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Glowing badge */}
        <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 mb-12 group hover:bg-white/10 transition-all duration-300">
          <div className="relative">
            <Stars className="w-5 h-5 text-yellow-400 animate-pulse" />
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur opacity-20 animate-pulse"></div>
          </div>
          <span className="text-sm font-bold text-white tracking-wide">REVOLUTIONIZING PRODUCT MANAGEMENT</span>
          <Rocket className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform duration-300" />
        </div>

        {/* Main headline with dramatic typography */}
        <div className="mb-16 space-y-8">
          <div className="relative">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight">
              <span className="block text-white mb-4 relative">
                Empowering
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-xl rounded-lg"></div>
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                Teams Through
              </span>
              <span className="block text-white relative">
                Ethics
                <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-cyan-400 transform skew-x-12"></div>
              </span>
            </h1>
          </div>
          
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="relative">
              <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed font-light">
                Hi, I'm <span className="font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text">Prem Pradeep</span> — 
                <br className="hidden md:block" />
                transforming how teams solve problems through 
                <br className="hidden md:block" />
                <span className="text-white font-semibold">ethical product management</span> and 
                <span className="text-purple-300 font-semibold">sustainable value creation.</span>
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300 font-medium">15+ Premium Tools</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <span className="text-gray-300 font-medium">Ethical Problem Solving</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span className="text-gray-300 font-medium">Sustainable Value Creation</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-12">
            <Button 
              size="lg" 
              onClick={scrollToTools} 
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-600 px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 border-0 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <Sparkles className="w-6 h-6 mr-3" />
              Explore Tools
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="px-12 py-6 text-xl font-bold bg-white/5 backdrop-blur-sm border-2 border-white/20 hover:border-purple-400 hover:bg-white/10 text-white hover:text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Link to="/contact">
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
