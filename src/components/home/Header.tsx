
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Linkedin, Mail, Zap } from "lucide-react";

export const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-xl blur opacity-30"></div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-white via-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
                Prem Pradeep
              </h1>
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              asChild 
              className="bg-white/5 backdrop-blur-sm border-white/20 hover:border-violet-400 hover:bg-violet-500/20 transition-all duration-300 text-white hover:text-white rounded-xl"
            >
              <a href="https://www.linkedin.com/in/prempradeep/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 mr-2 text-cyan-400" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </Button>
            <Button 
              size="sm" 
              asChild 
              className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0 rounded-xl"
            >
              <Link to="/contact">
                <Mail className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Contact</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
