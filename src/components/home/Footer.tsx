
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Linkedin, Mail, Target, CheckSquare, TrendingUp, Globe, Shield, Sparkles } from "lucide-react";

export const Footer = () => {
  const toolsLinks = [
    { name: "User Story Generator", href: "/tools/user-story-generator" },
    { name: "Feature Prioritization", href: "/tools/feature-prioritization" },
    { name: "Product Roadmap", href: "/tools/product-roadmap" },
    { name: "Metrics Dashboard", href: "/tools/metrics-dashboard" },
    { name: "PM Competency", href: "/tools/pm-competency" },
    { name: "Dark Patterns Assessment", href: "/tools/dark-patterns-assessment" },
  ];

  const frameworkLinks = [
    { name: "DVF Framework", href: "/tools/dvf-framework" },
    { name: "DVF Exercise", href: "/tools/dvf-exercise" },
    { name: "Jobs to be Done", href: "/tools/jobs-to-be-done" },
    { name: "Idea Validator", href: "/tools/idea-validator" },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Product Practice
              </h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Empowering product professionals with ethical frameworks and practical tools for sustainable innovation.
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                asChild 
                className="text-gray-600 border-gray-300 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-200"
              >
                <a href="https://www.linkedin.com/in/prempradeep/" target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                asChild 
                className="text-gray-600 border-gray-300 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-200"
              >
                <Link to="/contact" aria-label="Contact us">
                  <Mail className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Product Tools */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-900 flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-600" />
              Product Tools
            </h4>
            <nav className="space-y-3">
              {toolsLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Frameworks */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-900 flex items-center">
              <CheckSquare className="w-5 h-5 mr-2 text-purple-600" />
              Frameworks
            </h4>
            <nav className="space-y-3">
              {frameworkLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-gray-600 hover:text-purple-600 hover:translate-x-1 transition-all duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Resources
            </h4>
            <nav className="space-y-3">
              <Link to="/contact" className="block text-gray-600 hover:text-green-600 hover:translate-x-1 transition-all duration-200">
                Contact Support
              </Link>
              <a 
                href="https://www.linkedin.com/in/prempradeep/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-600 hover:text-green-600 hover:translate-x-1 transition-all duration-200"
              >
                About the Creator
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 mb-4 md:mb-0">
              <p>&copy; 2024 Product Practice Excellence. Built by <span className="text-gray-700 font-semibold">Prem Pradeep</span>.</p>
              <p className="mt-1 text-sm">Empowering product professionals worldwide through ethical innovation.</p>
            </div>
            <div className="flex items-center gap-6 text-gray-500">
              <span className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4 text-green-500" />
                Free & Open Access
              </span>
              <span className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-blue-500" />
                Privacy Focused
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
