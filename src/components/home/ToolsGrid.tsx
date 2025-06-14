
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { productTools, assessmentTools } from "@/data/tools";

export const ToolsGrid = () => {
  const renderToolCard = (tool: any) => {
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
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Product Management Tools Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Product Management Tools
          </h3>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Essential tools and frameworks for product managers to plan, execute, and optimize their product strategy.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productTools.map(renderToolCard)}
          </div>
        </div>

        {/* Assessment Tools Section */}
        <div>
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Assessment Tools
          </h3>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Evaluate your skills, competencies, and analyze design patterns to improve your product management practice.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessmentTools.map(renderToolCard)}
          </div>
        </div>
      </div>
    </section>
  );
};
