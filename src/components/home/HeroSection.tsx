
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, TrendingUp } from "lucide-react";

export const HeroSection = () => {
  const scrollToTools = () => {
    const toolsSection = document.getElementById('tools');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-indigo-600/10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>
          <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60"></div>
        </div>
        <div className="absolute top-1/3 right-1/4 animate-bounce" style={{ animationDelay: '2s', animationDuration: '4s' }}>
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-40"></div>
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-bounce" style={{ animationDelay: '3s', animationDuration: '5s' }}>
          <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full opacity-70"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-full px-4 py-2 mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Product Management Excellence</span>
          <TrendingUp className="w-4 h-4 text-green-500" />
        </div>

        {/* Main Headline */}
        <div className="mb-12 space-y-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="block text-gray-900 mb-2">Empowering</span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Teams Through
            </span>
            <span className="block text-gray-800">Ethics</span>
          </h1>
          
          <div className="max-w-4xl mx-auto space-y-4">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Hi, I'm <span className="font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">Prem Pradeep</span> — helping teams solve the right problems through ethical product management and sustainable value creation.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>15+ Tools & Frameworks</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span>Ethical Problem Solving</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>Sustainable Value Creation</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              size="lg" 
              onClick={scrollToTools} 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Explore Tools
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="px-8 py-4 text-lg bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-purple-300 hover:bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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
