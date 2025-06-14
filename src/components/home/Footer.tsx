
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Linkedin, Mail, Target, CheckSquare, TrendingUp, Globe, Shield, FileText } from "lucide-react";

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
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Product Practice
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Master product management with practical tools, frameworks, and assessments designed for modern product professionals.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" asChild className="text-white border-gray-600 hover:bg-white hover:text-gray-900">
                <a href="https://www.linkedin.com/in/prempradeep/" target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild className="text-white border-gray-600 hover:bg-white hover:text-gray-900">
                <Link to="/contact" aria-label="Contact us">
                  <Mail className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Product Tools */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-400" />
              Product Tools
            </h4>
            <nav className="space-y-2">
              {toolsLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Frameworks */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white flex items-center">
              <CheckSquare className="w-5 h-5 mr-2 text-green-400" />
              Frameworks
            </h4>
            <nav className="space-y-2">
              {frameworkLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
              Resources
            </h4>
            <nav className="space-y-2">
              <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                Contact Support
              </Link>
              <a 
                href="https://www.linkedin.com/in/prempradeep/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm"
              >
                About the Creator
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              <p>&copy; 2024 Product Practice Excellence. Built by Prem Pradeep.</p>
              <p className="mt-1">Empowering product professionals worldwide.</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Free & Open Access
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Privacy Focused
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
