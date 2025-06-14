
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Linkedin, Mail } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Prem Pradeep</h1>
            <p className="text-lg text-gray-600 mt-1">Product Practice Excellence</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" size="sm" asChild>
              <a href="https://www.linkedin.com/in/prempradeep/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </a>
            </Button>
            <Button size="sm" asChild>
              <Link to="/contact">
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
