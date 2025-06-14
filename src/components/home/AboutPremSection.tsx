
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Linkedin, Mail, Award, Heart, Lightbulb, Target } from "lucide-react";

export const AboutPremSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <Badge className="bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 mb-6 border-0">
              <Award className="w-4 h-4 mr-2" />
              About the Creator
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Prem Pradeep
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A passionate advocate for ethical product management and sustainable value creation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Professional Story */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Excellence</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  I'm a <strong>Results-Driven Professional</strong> with deep expertise in helping teams solve the right problems through ethical frameworks and sustainable value creation.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">User Acquisition</Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">Growth Strategies</Badge>
                  <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">Product Optimization</Badge>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
                <h4 className="text-xl font-bold mb-4">Community Impact</h4>
                <p className="opacity-90 leading-relaxed mb-6">
                  These tools represent my commitment to giving back — helping you solve the <em>right</em> problems, not just any problems.
                </p>
                <div className="flex gap-4">
                  <Button variant="secondary" size="sm" asChild>
                    <a href="https://www.linkedin.com/in/prempradeep/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="border-white/20 text-white hover:bg-white/10">
                    <Link to="/contact">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Side - Values */}
            <div className="grid gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">Root Cause Focus</h4>
                </div>
                <p className="text-gray-600">
                  Tools that help identify and solve underlying issues, not just symptoms.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">Ethical Approach</h4>
                </div>
                <p className="text-gray-600">
                  Every framework promotes sustainable value creation over short-term gains.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Lightbulb className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">Community Impact</h4>
                </div>
                <p className="text-gray-600">
                  Elevating the product management community through shared knowledge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
