
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Target, 
  Users, 
  BarChart3, 
  CheckSquare, 
  Lightbulb, 
  GitBranch,
  Clock,
  Star,
  ArrowRight,
  Linkedin,
  Mail
} from "lucide-react";

const tools = [
  {
    id: "user-story-generator",
    title: "User Story Generator",
    description: "Create well-structured user stories with acceptance criteria",
    icon: Users,
    path: "/tools/user-story-generator",
    category: "Requirements",
    difficulty: "Beginner"
  },
  {
    id: "product-roadmap",
    title: "Product Roadmap Planner",
    description: "Plan and visualize your product roadmap with priorities",
    icon: GitBranch,
    path: "/tools/product-roadmap",
    category: "Planning",
    difficulty: "Intermediate"
  },
  {
    id: "feature-prioritization",
    title: "Feature Prioritization Matrix",
    description: "Prioritize features using RICE, MoSCoW, and other frameworks",
    icon: Target,
    path: "/tools/feature-prioritization",
    category: "Strategy",
    difficulty: "Advanced"
  },
  {
    id: "metrics-dashboard",
    title: "Product Metrics Dashboard",
    description: "Track and analyze key product metrics and KPIs",
    icon: BarChart3,
    path: "/tools/metrics-dashboard",
    category: "Analytics",
    difficulty: "Intermediate"
  },
  {
    id: "sprint-planner",
    title: "Sprint Planning Tool",
    description: "Plan and manage your agile sprints effectively",
    icon: CheckSquare,
    path: "/tools/sprint-planner",
    category: "Agile",
    difficulty: "Beginner"
  },
  {
    id: "idea-validator",
    title: "Product Idea Validator",
    description: "Validate product ideas using proven frameworks",
    icon: Lightbulb,
    path: "/tools/idea-validator",
    category: "Innovation",
    difficulty: "Advanced"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
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

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Master Product Management
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your go-to destination for understanding and practicing product management. 
            Access powerful tools, frameworks, and resources to elevate your product practice.
          </p>
          <div className="flex justify-center gap-4 mb-12">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Star className="w-4 h-4 mr-2" />
              6 Essential Tools
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Clock className="w-4 h-4 mr-2" />
              Always Updated
            </Badge>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Product Management Tools
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Card key={tool.id} className="hover:shadow-lg transition-shadow duration-300 group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                      <Badge variant="outline">{tool.difficulty}</Badge>
                    </div>
                    <CardTitle className="text-xl">{tool.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{tool.category}</Badge>
                      <Button asChild size="sm">
                        <Link to={tool.path}>
                          Try Tool
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              About Product Practice Excellence
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              This platform is designed to help product managers, entrepreneurs, and teams 
              practice and refine their product management skills. Each tool is built based 
              on industry best practices and proven frameworks used by successful product teams.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Practical Tools</h4>
                <p className="text-gray-600">Ready-to-use tools for real product challenges</p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CheckSquare className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Best Practices</h4>
                <p className="text-gray-600">Based on proven frameworks and methodologies</p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Lightbulb className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Continuous Learning</h4>
                <p className="text-gray-600">Evolving content to match industry trends</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
};

export default Index;
