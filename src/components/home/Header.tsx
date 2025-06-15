
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Linkedin, Mail, Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Prem Pradeep
              </h1>
              <p className="text-xs text-gray-500 hidden md:block">Product Practice Excellence</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              asChild 
              className="bg-white/80 backdrop-blur-sm border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <a href="https://www.linkedin.com/in/prempradeep/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 mr-2 text-blue-600" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </Button>
            <Button 
              size="sm" 
              asChild 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
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
