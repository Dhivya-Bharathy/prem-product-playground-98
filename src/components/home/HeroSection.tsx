
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
      </div>
    </section>
  );
};
