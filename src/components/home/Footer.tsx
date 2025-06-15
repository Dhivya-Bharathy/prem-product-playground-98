
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Linkedin, Mail, Target, CheckSquare, TrendingUp, Globe, Shield, Zap } from "lucide-react";

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
    <footer className="bg-black/30 backdrop-blur-xl border-t border-white/10 text-white relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Product Practice
              </h3>
            </div>
            <p className="text-white/70 mb-8 leading-relaxed">
              Master product management with cutting-edge tools, frameworks, and assessments designed for the modern digital era.
            </p>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                asChild 
                className="text-white/70 border-white/20 hover:bg-violet-500/20 hover:text-white hover:border-violet-400 transition-all duration-300 backdrop-blur-sm rounded-xl"
              >
                <a href="https://www.linkedin.com/in/prempradeep/" target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                asChild 
                className="text-white/70 border-white/20 hover:bg-cyan-500/20 hover:text-white hover:border-cyan-400 transition-all duration-300 backdrop-blur-sm rounded-xl"
              >
                <Link to="/contact" aria-label="Contact us">
                  <Mail className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Product Tools */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white flex items-center">
              <Target className="w-5 h-5 mr-3 text-violet-400" />
              Product Tools
            </h4>
            <nav className="space-y-3">
              {toolsLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Frameworks */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white flex items-center">
              <CheckSquare className="w-5 h-5 mr-3 text-cyan-400" />
              Frameworks
            </h4>
            <nav className="space-y-3">
              {frameworkLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-3 text-fuchsia-400" />
              Resources
            </h4>
            <nav className="space-y-3">
              <Link to="/contact" className="block text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200">
                Contact Support
              </Link>
              <a 
                href="https://www.linkedin.com/in/prempradeep/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200"
              >
                About the Creator
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-16 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/60 mb-6 md:mb-0">
              <p>&copy; 2024 Product Practice Excellence. Built by <span className="text-white font-semibold">Prem Pradeep</span>.</p>
              <p className="mt-2 text-sm">Empowering product professionals worldwide through ethical innovation.</p>
            </div>
            <div className="flex items-center gap-8 text-white/60">
              <span className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4 text-emerald-400" />
                Free & Open Access
              </span>
              <span className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-blue-400" />
                Privacy Focused
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
