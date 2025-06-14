
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Linkedin, MessageCircle, Users, TrendingUp, Target, Lightbulb } from "lucide-react";

const Contact = () => {
  const expertiseAreas = [
    { icon: Users, label: "User Acquisition", color: "bg-blue-100 text-blue-600" },
    { icon: TrendingUp, label: "Growth Strategies", color: "bg-purple-100 text-purple-600" },
    { icon: Target, label: "Product Optimization", color: "bg-indigo-100 text-indigo-600" },
    { icon: Lightbulb, label: "Ethical Problem-Solving", color: "bg-green-100 text-green-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white/70 backdrop-blur-sm shadow-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild className="bg-white/80 hover:bg-white">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Connect with Prem Pradeep
              </h1>
              <p className="text-gray-600">Product Management Expert & Community Advocate</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Professional Introduction */}
          <div className="text-center mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Let's Discuss Product Excellence</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                As a <strong>Results-Driven Professional</strong> with expertise in User Acquisition, Growth Strategies, 
                and Product Optimization, I'm passionate about helping teams solve the right problems through ethical, 
                sustainable approaches to product development.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {expertiseAreas.map((area) => {
                  const IconComponent = area.icon;
                  return (
                    <div key={area.label} className={`flex items-center gap-2 px-4 py-2 rounded-full ${area.color}`}>
                      <IconComponent className="w-4 h-4" />
                      <span className="text-sm font-medium">{area.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Engagement Types */}
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  Consulting & Advisory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Strategic guidance on product management challenges, growth initiatives, and optimization strategies.
                </p>
                <div className="space-y-1 text-xs text-gray-500">
                  <p>• Product strategy development</p>
                  <p>• Growth framework implementation</p>
                  <p>• Team process optimization</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  Mentoring & Coaching
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  One-on-one mentoring for product managers and teams looking to enhance their skills and impact.
                </p>
                <div className="space-y-1 text-xs text-gray-500">
                  <p>• Career development guidance</p>
                  <p>• Skill-building workshops</p>
                  <p>• Performance improvement</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-green-600" />
                  </div>
                  Speaking & Workshops
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Engaging presentations and workshops on ethical product management and sustainable growth.
                </p>
                <div className="space-y-1 text-xs text-gray-500">
                  <p>• Conference presentations</p>
                  <p>• Team workshops</p>
                  <p>• Industry events</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Email</CardTitle>
                    <CardDescription>Direct professional communication</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  For detailed project discussions, consulting inquiries, or professional collaboration opportunities.
                </p>
                <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <a href="mailto:prempradeep@live.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Email prempradeep@live.com
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Linkedin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">LinkedIn</CardTitle>
                    <CardDescription>Professional networking & insights</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Connect for industry discussions, networking, and to stay updated on product management insights and best practices.
                </p>
                <Button asChild variant="outline" className="w-full border-blue-200 hover:bg-blue-50">
                  <a href="https://www.linkedin.com/in/prempradeep/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    Connect on LinkedIn
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Mission Statement */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-semibold mb-4">Let's Create Sustainable Value Together</h3>
              <p className="text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
                Whether you're looking to optimize your product strategy, need guidance on ethical growth approaches, 
                or want to explore how to solve the <em>right</em> problems in your organization — I'm here to help. 
                Let's discuss how we can create meaningful impact together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
