
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Linkedin, Mail, Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-md">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Prem Pradeep
              </h1>
              <p className="text-xs font-medium text-gray-500">Product Excellence</p>
            </div>
          </Link>
          <nav className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              asChild
            >
              <a href="https://www.linkedin.com/in/prempradeep/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4 text-gray-500" />
                <span className="hidden sm:inline ml-2 text-gray-700 font-medium">LinkedIn</span>
              </a>
            </Button>
            <Button 
              size="sm" 
              asChild 
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 font-medium text-white transition-all duration-300 hover:from-indigo-600 hover:to-purple-600 hover:shadow-lg"
            >
              <Link to="/contact">
                <Mail className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Contact</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
