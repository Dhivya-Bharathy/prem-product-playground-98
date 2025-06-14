
import { Badge } from "@/components/ui/badge";
import { Star, Target, TrendingUp, Users } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 text-center relative">
        {/* Professional Badge */}
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-blue-700 text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Results-Driven Product Management Expert
          </div>
        </div>

        {/* Main Headline */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gray-900">Empowering Teams Through</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Ethical Product Practice
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Hi, I'm <span className="font-semibold text-blue-600">Prem Pradeep</span> — a Product Management expert specializing in 
            <span className="font-semibold text-purple-600"> User Acquisition</span>, 
            <span className="font-semibold text-indigo-600"> Growth Strategies</span>, and 
            <span className="font-semibold text-blue-600"> Product Optimization</span>. 
            I help teams identify root causes and develop commercially viable solutions that create sustainable value.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mb-12 animate-fade-in">
          <div className="max-w-3xl mx-auto p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
            <p className="text-lg text-gray-700 leading-relaxed">
              <span className="font-semibold text-gray-900">"Driven by ethical problem-solving and creating sustainable value."</span><br />
              These tools and frameworks represent my commitment to giving back to the product management community — 
              helping you solve the <em>right</em> problems, not just any problems.
            </p>
          </div>
        </div>

        {/* Expertise Areas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 animate-fade-in">
          <div className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">User Acquisition</h3>
            <p className="text-gray-600 text-sm">Strategic approaches to attract and convert the right users for sustainable growth</p>
          </div>
          <div className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Growth Strategies</h3>
            <p className="text-gray-600 text-sm">Data-driven frameworks for scaling products and maximizing market impact</p>
          </div>
          <div className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Optimization</h3>
            <p className="text-gray-600 text-sm">Systematic approaches to enhance product performance and user experience</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto animate-fade-in">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
            <div className="text-gray-600 text-sm">Essential Tools</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-gray-600 text-sm">Free Access</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">5min</div>
            <div className="text-gray-600 text-sm">Quick Start</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">∞</div>
            <div className="text-gray-600 text-sm">Community Impact</div>
          </div>
        </div>
      </div>
    </section>
  );
};
