
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
    <footer className="bg-black/50 backdrop-blur-xl border-t border-white/10 text-white relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-3xl font-black mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Product Practice
            </h3>
            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
              Master product management with cutting-edge tools, frameworks, and assessments designed for the modern digital era.
            </p>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                asChild 
                className="text-gray-300 border-white/20 hover:bg-purple-500/20 hover:text-white hover:border-purple-400 transition-all duration-300 backdrop-blur-sm"
              >
                <a href="https://www.linkedin.com/in/prempradeep/" target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                asChild 
                className="text-gray-300 border-white/20 hover:bg-cyan-500/20 hover:text-white hover:border-cyan-400 transition-all duration-300 backdrop-blur-sm"
              >
                <Link to="/contact" aria-label="Contact us">
                  <Mail className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Product Tools */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white flex items-center">
              <Target className="w-6 h-6 mr-3 text-purple-400" />
              Product Tools
            </h4>
            <nav className="space-y-3">
              {toolsLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-base"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Frameworks */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white flex items-center">
              <CheckSquare className="w-6 h-6 mr-3 text-cyan-400" />
              Frameworks
            </h4>
            <nav className="space-y-3">
              {frameworkLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-base"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-pink-400" />
              Resources
            </h4>
            <nav className="space-y-3">
              <Link to="/contact" className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-base">
                Contact Support
              </Link>
              <a 
                href="https://www.linkedin.com/in/prempradeep/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-base"
              >
                About the Creator
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-16 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-6 md:mb-0">
              <p className="text-lg">&copy; 2024 Product Practice Excellence. Built by <span className="text-white font-semibold">Prem Pradeep</span>.</p>
              <p className="mt-2 text-base">Empowering product professionals worldwide through ethical innovation.</p>
            </div>
            <div className="flex items-center gap-8 text-gray-400">
              <span className="flex items-center gap-3 text-base">
                <Globe className="w-5 h-5 text-green-400" />
                Free & Open Access
              </span>
              <span className="flex items-center gap-3 text-base">
                <Shield className="w-5 h-5 text-blue-400" />
                Privacy Focused
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
