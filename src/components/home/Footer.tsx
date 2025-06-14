
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <h4 className="text-2xl font-bold mb-4">Prem Pradeep</h4>
        <p className="text-gray-400 mb-6">Product Practice Excellence</p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="sm" asChild className="text-white border-white hover:bg-white hover:text-gray-900">
            <a href="https://www.linkedin.com/in/prempradeep/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-4 h-4 mr-2" />
              Connect
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild className="text-white border-white hover:bg-white hover:text-gray-900">
            <Link to="/contact">
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
};
