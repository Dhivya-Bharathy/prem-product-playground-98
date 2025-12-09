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
            className="flex items-center gap-3 min-w-0 flex-shrink-0 hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg p-1"
            aria-label="Prem Pradeep - Product Practice Excellence, go to homepage"
          >
            <div className="flex items-center gap-3" aria-hidden="true">
              <img 
                src="/lovable-uploads/4cc61976-ba63-4fee-8c99-1ad76011fb54.png" 
                alt="Prem Pradeep" 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-[#1E40AF]/20 shadow-sm"
              />
              <div className="flex flex-col min-w-0">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl sm:text-2xl font-bold text-[#1E40AF] leading-none">Prem</span>
                  <span className="text-lg sm:text-xl font-semibold text-[#059669] leading-none">Pradeep</span>
                </div>
                <span className="text-xs font-medium text-gray-600 hidden sm:block">Product Strategy & Growth</span>
              </div>
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
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-[#1E40AF] font-medium text-white transition-all duration-300 hover:bg-[#1E3A8A] hover:shadow-lg focus:ring-2 focus:ring-[#1E40AF] focus:ring-offset-2 px-2 sm:px-4"
            >
              <Link to="/contact" aria-label="Contact Prem Pradeep">
                <Mail className="mr-1 sm:mr-2 h-4 w-4 text-emerald-400" />
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
