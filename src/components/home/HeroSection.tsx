
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, ArrowRight, Users, TrendingUp, Target } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 text-center relative">
        {/* Professional Badge */}
        <div className="mb-8 animate-fade-in">
          <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-medium px-6 py-2 border-0">
            <Star className="w-4 h-4 mr-2" />
            Product Management Expert
          </Badge>
        </div>

        {/* Main Headline */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="text-gray-900">Empowering Teams</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Through Ethics
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Hi, I'm <span className="font-semibold text-blue-600">Prem Pradeep</span> — helping teams solve the right problems through ethical product management and sustainable value creation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 text-lg">
              <Link to="#tools">
                Explore Tools
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="px-8 py-4 text-lg">
              <Link to="/contact">
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>

        {/* Expertise Cards - Simplified */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in">
          <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">User Acquisition</h3>
          </div>
          <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Growth Strategies</h3>
          </div>
          <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Optimization</h3>
          </div>
        </div>
      </div>
    </section>
  );
};
