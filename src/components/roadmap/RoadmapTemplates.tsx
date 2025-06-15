
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, Zap, Globe, Smartphone } from "lucide-react";
import { RoadmapItem } from "@/types/roadmap";

export interface RoadmapTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  items: Omit<RoadmapItem, 'id'>[];
}

const roadmapTemplates: RoadmapTemplate[] = [
  {
    id: "saas-startup",
    name: "SaaS Startup Roadmap",
    description: "Essential features for a new SaaS product launch",
    category: "Startup",
    items: [
      {
        title: "User Authentication System",
        quarter: "Q1",
        status: "Planning",
        priority: "High",
        description: "Secure login, registration, and password reset functionality"
      },
      {
        title: "Core Dashboard",
        quarter: "Q1",
        status: "Planning",
        priority: "High",
        description: "Main user interface with key metrics and navigation"
      },
      {
        title: "Payment Integration",
        quarter: "Q2",
        status: "Planning",
        priority: "High",
        description: "Stripe integration for subscription management"
      },
      {
        title: "Advanced Analytics",
        quarter: "Q2",
        status: "Planning",
        priority: "Medium",
        description: "Detailed reporting and data visualization"
      },
      {
        title: "Mobile App",
        quarter: "Q3",
        status: "Planning",
        priority: "Medium",
        description: "iOS and Android companion apps"
      },
      {
        title: "API & Integrations",
        quarter: "Q4",
        status: "Planning",
        priority: "Low",
        description: "RESTful API and third-party integrations"
      }
    ]
  },
  {
    id: "ecommerce-platform",
    name: "E-commerce Platform",
    description: "Feature roadmap for online retail platform",
    category: "E-commerce",
    items: [
      {
        title: "Product Catalog Enhancement",
        quarter: "Q1",
        status: "In Progress",
        priority: "High",
        description: "Improved search, filters, and product recommendations"
      },
      {
        title: "Checkout Optimization",
        quarter: "Q1",
        status: "Planning",
        priority: "High",
        description: "Streamlined checkout process and payment options"
      },
      {
        title: "Inventory Management",
        quarter: "Q2",
        status: "Planning",
        priority: "High",
        description: "Real-time inventory tracking and automated reordering"
      },
      {
        title: "Customer Support Chat",
        quarter: "Q2",
        status: "Planning",
        priority: "Medium",
        description: "Live chat support integration"
      },
      {
        title: "Loyalty Program",
        quarter: "Q3",
        status: "Planning",
        priority: "Medium",
        description: "Points-based rewards and customer retention program"
      },
      {
        title: "AR Product Visualization",
        quarter: "Q4",
        status: "Planning",
        priority: "Low",
        description: "Augmented reality for product preview"
      }
    ]
  },
  {
    id: "mobile-app",
    name: "Mobile App Development",
    description: "Cross-platform mobile application roadmap",
    category: "Mobile",
    items: [
      {
        title: "MVP Core Features",
        quarter: "Q1",
        status: "In Progress",
        priority: "High",
        description: "Essential user flows and basic functionality"
      },
      {
        title: "User Onboarding",
        quarter: "Q1",
        status: "Planning",
        priority: "High",
        description: "Tutorial and guided first-time user experience"
      },
      {
        title: "Push Notifications",
        quarter: "Q2",
        status: "Planning",
        priority: "High",
        description: "Real-time notifications and engagement features"
      },
      {
        title: "Offline Functionality",
        quarter: "Q2",
        status: "Planning",
        priority: "Medium",
        description: "Core features work without internet connection"
      },
      {
        title: "Social Features",
        quarter: "Q3",
        status: "Planning",
        priority: "Medium",
        description: "Sharing, comments, and user-generated content"
      },
      {
        title: "Advanced Personalization",
        quarter: "Q4",
        status: "Planning",
        priority: "Low",
        description: "AI-powered content and feature recommendations"
      }
    ]
  }
];

interface RoadmapTemplatesProps {
  onUseTemplate: (template: RoadmapTemplate) => void;
}

export const RoadmapTemplates = ({ onUseTemplate }: RoadmapTemplatesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(roadmapTemplates.map(t => t.category))];
  const filteredTemplates = selectedCategory 
    ? roadmapTemplates.filter(t => t.category === selectedCategory)
    : roadmapTemplates;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Startup': return Zap;
      case 'E-commerce': return Globe;
      case 'Mobile': return Smartphone;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Roadmap Templates
          </h2>
          <p className="text-gray-600">Pre-built roadmaps for common product scenarios</p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          size="sm"
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
        >
          All Categories
        </Button>
        {categories.map(category => (
          <Button
            key={category}
            size="sm"
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => {
          const IconComponent = getCategoryIcon(template.category);
          return (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{template.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="text-sm font-medium text-gray-700">Included Items:</div>
                  <div className="space-y-1">
                    {template.items.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">{item.title}</span>
                        <Badge variant="outline" className="text-xs">
                          {item.quarter}
                        </Badge>
                      </div>
                    ))}
                    {template.items.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{template.items.length - 3} more items
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  onClick={() => onUseTemplate(template)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Use This Template
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
