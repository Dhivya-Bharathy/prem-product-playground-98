
import { Link } from "react-router-dom";
import { Linkedin, Mail, Sparkles, Instagram } from "lucide-react";

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
    <footer className="bg-white border-t border-gray-200" role="contentinfo">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Product Practice
              </h3>
            </div>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed max-w-xs">
              Tools and frameworks by Prem Pradeep for product excellence, strategy, and team empowerment.
            </p>
          </div>

          {/* Tools Links */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold mb-4 text-gray-900">
              Tools
            </h4>
            <nav className="space-y-2" role="navigation" aria-label="Tools navigation">
              {toolsLinks.slice(0, 5).map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-sm text-gray-600 hover:text-indigo-600 hover:translate-x-1 transition-all duration-200 focus:outline-none focus:text-indigo-600"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Assessments Links */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold mb-4 text-gray-900">
              Assessments
            </h4>
            <nav className="space-y-2" role="navigation" aria-label="Assessments navigation">
              {frameworkLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-sm text-gray-600 hover:text-indigo-600 hover:translate-x-1 transition-all duration-200 focus:outline-none focus:text-indigo-600"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* About Links */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold mb-4 text-gray-900">
              About
            </h4>
            <nav className="space-y-2" role="navigation" aria-label="About navigation">
              <Link 
                to="/about" 
                className="block text-sm text-gray-600 hover:text-indigo-600 hover:translate-x-1 transition-all duration-200 focus:outline-none focus:text-indigo-600"
              >
                About Prem
              </Link>
              <Link 
                to="/contact" 
                className="block text-sm text-gray-600 hover:text-indigo-600 hover:translate-x-1 transition-all duration-200 focus:outline-none focus:text-indigo-600"
              >
                Contact
              </Link>
              <Link 
                to="/prodz-slang" 
                className="block text-sm text-gray-600 hover:text-indigo-600 hover:translate-x-1 transition-all duration-200 focus:outline-none focus:text-indigo-600"
              >
                ProdZ Slang
              </Link>
              <a 
                href="https://www.linkedin.com/in/prempradeep/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-sm text-gray-600 hover:text-indigo-600 hover:translate-x-1 transition-all duration-200 focus:outline-none focus:text-indigo-600"
                aria-label="Visit Prem Pradeep's LinkedIn profile"
              >
                LinkedIn Profile
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 text-center sm:text-left">&copy; 2025 Prem Pradeep. All rights reserved.</p>
          <div className="flex gap-4" role="group" aria-label="Social media links">
            <a 
              href="https://www.linkedin.com/in/prempradeep/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Connect on LinkedIn" 
              className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:text-gray-600"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="https://www.instagram.com/prempradeep/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Follow on Instagram" 
              className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:text-gray-600"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <Link 
              to="/contact" 
              aria-label="Contact us" 
              className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:text-gray-600"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
