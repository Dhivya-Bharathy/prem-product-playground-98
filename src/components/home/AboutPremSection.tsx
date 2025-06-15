
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Linkedin, Mail, Award, User } from "lucide-react";

export const AboutPremSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 mb-6 border-0">
              <User className="w-4 h-4 mr-2" />
              About the Creator
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Prem Pradeep
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Portrait */}
            <div className="text-center">
              <div className="w-64 h-64 mx-auto rounded-full overflow-hidden mb-6 shadow-lg">
                <img
                  src="https://media.licdn.com/dms/image/v2/D5603AQHVg6Cdm2EaWQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1723381410713"
                  alt="Prem Pradeep"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Side - Bio and CTA */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Prem Pradeep helps product teams scale their practice through structured tools and strategic clarity. Former Product Head, coach, and practice enabler.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Through years of building and scaling products, Prem has developed a comprehensive toolkit designed to accelerate product excellence and team outcomes.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                    <Link to="/about">
                      More About Prem
                      <Award className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="https://www.linkedin.com/in/prempradeep/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4 mr-2" />
                      Connect on LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
