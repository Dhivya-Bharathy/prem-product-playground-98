
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Linkedin, Mail, Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Prem Pradeep
              </h1>
              <p className="text-xs text-gray-500 font-medium">Product Excellence</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              asChild 
              className="border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
            >
              <a href="https://www.linkedin.com/in/prempradeep/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 mr-2 text-blue-600" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </Button>
            <Button 
              size="sm" 
              asChild 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-200"
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
