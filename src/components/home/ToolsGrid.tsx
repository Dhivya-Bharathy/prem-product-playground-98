
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Users, Target, BarChart3, Brain, Shield } from "lucide-react";

export const ToolsGrid = () => {
  const tools = [
    {
      id: "user-story-generator",
      title: "User Story Generator",
      description: "Create well-structured user stories with acceptance criteria",
      href: "/tools/user-story-generator",
      icon: Zap,
      category: "Tools",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: "feature-prioritization",
      title: "Feature Prioritization Matrix",
      description: "Prioritize features using RICE, MoSCoW, and other frameworks",
      href: "/tools/feature-prioritization",
      icon: Target,
      category: "Tools",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: "product-roadmap",
      title: "Product Roadmap Planner",
      description: "Plan and visualize your product roadmap with priorities",
      href: "/tools/product-roadmap",
      icon: BarChart3,
      category: "Tools",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: "metrics-dashboard",
      title: "Product Metrics Dashboard",
      description: "Track and analyze key product metrics and KPIs",
      href: "/tools/metrics-dashboard",
      icon: BarChart3,
      category: "Tools",
      gradient: "from-orange-500 to-red-500"
    },
    {
      id: "pm-competency",
      title: "PM Competency Assessment",
      description: "Evaluate PM skills across key competency areas",
      href: "/tools/pm-competency",
      icon: Users,
      category: "Assessments",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      id: "dark-patterns-assessment",
      title: "Dark Patterns Assessment",
      description: "Analyze and identify dark patterns in digital products",
      href: "/tools/dark-patterns-assessment",
      icon: Shield,
      category: "Assessments",
      gradient: "from-red-500 to-pink-500"
    },
    {
      id: "dvf-exercise",
      title: "DVF Exercise",
      description: "Evaluate ideas using Desirability, Viability, Feasibility framework",
      href: "/tools/dvf-exercise",
      icon: Brain,
      category: "Assessments",
      gradient: "from-teal-500 to-green-500"
    },
    {
      id: "jobs-to-be-done",
      title: "Jobs to be Done Framework",
      description: "Understand customer needs using Clayton Christensen's JTBD methodology",
      href: "/tools/jobs-to-be-done",
      icon: Target,
      category: "Assessments",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  const toolsSection = tools.filter(tool => tool.category === "Tools");
  const assessmentsSection = tools.filter(tool => tool.category === "Assessments");

  const ToolCard = ({ tool }) => {
    const IconComponent = tool.icon;
    
    return (
      <Card className="group relative overflow-hidden border-gray-200 bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg hover:-translate-y-1">
        <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />
        <CardHeader className="relative">
          <div className="mb-4 flex items-center justify-between">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.gradient} shadow-md`}>
              <IconComponent className="h-6 w-6 text-white" />
            </div>
            <Badge variant="secondary" className="text-xs font-medium">
              {tool.category}
            </Badge>
          </div>
          <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-800">
            {tool.title}
          </CardTitle>
          <CardDescription className="text-gray-600 leading-relaxed">
            {tool.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative pt-0">
          <Button 
            asChild 
            variant="ghost" 
            className="group/button w-full justify-between p-0 h-auto font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Link 
              to={tool.href}
              className="flex items-center justify-between w-full py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              aria-label={`Open ${tool.title} tool`}
            >
              <span>Explore Tool</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden" aria-labelledby="tools-heading">
      <div className="container mx-auto px-4 relative">
        {/* Tools Section */}
        <div id="tools" className="mb-20">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 mb-6 border-0">
              <Zap className="w-4 h-4 mr-2" />
              Product Tools
            </Badge>
            <h2 id="tools-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Essential Product Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Streamline your product development process with these practical, easy-to-use tools designed for modern product teams.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {toolsSection.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>

        {/* Assessments Section */}
        <div id="assessments">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-700 text-sm font-medium px-4 py-2 mb-6 border-0">
              <Brain className="w-4 h-4 mr-2" />
              Strategic Assessments
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Strategic Assessments
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Evaluate your product strategy and team capabilities with comprehensive assessment frameworks.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {assessmentsSection.map((assessment) => (
              <ToolCard key={assessment.id} tool={assessment} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
