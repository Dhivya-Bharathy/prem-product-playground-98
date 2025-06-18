
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Linkedin, Mail } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/95 backdrop-blur-md">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex h-16 items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 min-w-0 flex-shrink-0 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg p-1"
            aria-label="Prem Pradeep - Product Practice Excellence, go to homepage"
          >
            <div className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-md" aria-hidden="true">
              <span className="text-white font-bold text-xs sm:text-sm">PP</span>
            </div>
            <div className="min-w-0 hidden xs:block">
              <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 truncate">
                Prem Pradeep
              </h1>
              <p className="text-xs font-medium text-gray-500 hidden sm:block">Product Excellence</p>
            </div>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2" role="navigation" aria-label="Main navigation">
            <Button 
              variant="ghost" 
              size="sm" 
              asChild
              className="px-2 sm:px-3"
            >
              <a 
                href="https://www.linkedin.com/in/prempradeep/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Connect with Prem Pradeep on LinkedIn (opens in new tab)"
                className="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Linkedin className="h-4 w-4 text-gray-500" />
                <span className="hidden md:inline ml-2 text-gray-700 font-medium">LinkedIn</span>
              </a>
            </Button>
            <Button 
              size="sm" 
              asChild 
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 font-medium text-white transition-all duration-300 hover:from-indigo-600 hover:to-purple-600 hover:shadow-lg focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 px-2 sm:px-4"
            >
              <Link to="/contact" aria-label="Contact Prem Pradeep">
                <Mail className="mr-1 sm:mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Contact</span>
                <span className="sm:hidden text-xs">Chat</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
