
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Linkedin, Mail, Award, Heart, Lightbulb, Target } from "lucide-react";

export const AboutPremSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m0 0h100v100h-100z' fill='none'/%3E%3Cpath d='m0 0 50 50-50 50z' fill='none' stroke='%23e5e7eb' stroke-width='0.5'/%3E%3Cpath d='m50 0 50 50-50 50z' fill='none' stroke='%23e5e7eb' stroke-width='0.5'/%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-4">
              <Award className="w-4 h-4" />
              About the Creator
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Prem Pradeep
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A passionate advocate for ethical product management and sustainable value creation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Professional Story */}
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Excellence</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  I'm a <strong>Results-Driven Professional</strong> with deep expertise in <strong>User Acquisition</strong>, 
                  <strong> Growth Strategies</strong>, and <strong>Product Optimization</strong>. My approach is rooted in 
                  ethical problem-solving and creating sustainable value that benefits both businesses and users.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">User Acquisition</Badge>
                  <Badge className="bg-purple-100 text-purple-700 border-purple-200">Growth Strategies</Badge>
                  <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">Product Optimization</Badge>
                  <Badge className="bg-green-100 text-green-700 border-green-200">Ethical Problem-Solving</Badge>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Mission & Values</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  I believe in empowering teams to identify root causes and develop commercially viable solutions that truly matter. 
                  By fostering thoughtful, value-driven product development frameworks, I help organizations solve the 
                  <em> right</em> problems, not just any problems.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  This platform represents my commitment to <strong>giving back to the community</strong> — sharing practical 
                  tools and frameworks that have proven effective in real-world product management scenarios.
                </p>
              </div>
            </div>

            {/* Values & Approach */}
            <div className="space-y-6">
              <div className="grid gap-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900">Root Cause Focus</h4>
                  </div>
                  <p className="text-gray-600">
                    I help teams dig deeper to understand the underlying issues, ensuring solutions address real problems rather than symptoms.
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-green-100 rounded-xl">
                      <Heart className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900">Ethical Approach</h4>
                  </div>
                  <p className="text-gray-600">
                    Every framework and tool is designed with ethics in mind, promoting sustainable value creation over short-term gains.
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <Lightbulb className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900">Community Impact</h4>
                  </div>
                  <p className="text-gray-600">
                    These tools represent my commitment to elevating the entire product management community through shared knowledge and best practices.
                  </p>
                </div>
              </div>

              {/* Connect Section */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h4 className="text-xl font-bold mb-4">Let's Connect</h4>
                <p className="mb-6 opacity-90">
                  Interested in discussing product management, sharing insights, or exploring collaboration opportunities?
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
          </div>
        </div>
      </div>
    </section>
  );
};
