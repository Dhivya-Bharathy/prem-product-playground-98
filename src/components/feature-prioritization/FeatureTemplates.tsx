
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Zap, Globe, Smartphone, Users, Star } from "lucide-react";
import { Feature } from "@/types/feature";

export interface FeatureTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  features: Omit<Feature, 'id' | 'riceScore' | 'priority'>[];
}

const featureTemplates: FeatureTemplate[] = [
  {
    id: "saas-features",
    name: "SaaS Product Features",
    description: "Common features for SaaS applications",
    category: "SaaS",
    features: [
      {
        name: "Single Sign-On (SSO)",
        reach: 5000,
        impact: 2,
        confidence: 80,
        effort: 4
      },
      {
        name: "Advanced Search & Filters",
        reach: 8000,
        impact: 1,
        confidence: 90,
        effort: 2
      },
      {
        name: "API Rate Limiting",
        reach: 1000,
        impact: 3,
        confidence: 100,
        effort: 3
      },
      {
        name: "Real-time Notifications",
        reach: 6000,
        impact: 1.5,
        confidence: 75,
        effort: 5
      },
      {
        name: "Custom Branding",
        reach: 2000,
        impact: 0.5,
        confidence: 90,
        effort: 1.5
      }
    ]
  },
  {
    id: "ecommerce-features",
    name: "E-commerce Features",
    description: "Essential features for online retail platforms",
    category: "E-commerce",
    features: [
      {
        name: "One-Click Checkout",
        reach: 10000,
        impact: 3,
        confidence: 85,
        effort: 3
      },
      {
        name: "Product Recommendations",
        reach: 8500,
        impact: 2,
        confidence: 70,
        effort: 4
      },
      {
        name: "Abandoned Cart Recovery",
        reach: 3000,
        impact: 2.5,
        confidence: 90,
        effort: 2
      },
      {
        name: "Inventory Alerts",
        reach: 1500,
        impact: 1,
        confidence: 95,
        effort: 1
      },
      {
        name: "Multi-language Support",
        reach: 4000,
        impact: 1.5,
        confidence: 60,
        effort: 6
      }
    ]
  },
  {
    id: "mobile-features",
    name: "Mobile App Features",
    description: "Key features for mobile applications",
    category: "Mobile",
    features: [
      {
        name: "Push Notifications",
        reach: 12000,
        impact: 2,
        confidence: 90,
        effort: 2
      },
      {
        name: "Offline Mode",
        reach: 8000,
        impact: 2.5,
        confidence: 70,
        effort: 5
      },
      {
        name: "Touch ID / Face ID",
        reach: 9000,
        impact: 1.5,
        confidence: 80,
        effort: 1.5
      },
      {
        name: "Dark Mode",
        reach: 6000,
        impact: 0.5,
        confidence: 100,
        effort: 1
      },
      {
        name: "Voice Commands",
        reach: 3000,
        impact: 1,
        confidence: 50,
        effort: 8
      }
    ]
  }
];

interface FeatureTemplatesProps {
  onUseTemplate: (template: FeatureTemplate) => void;
}

export const FeatureTemplates = ({ onUseTemplate }: FeatureTemplatesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(featureTemplates.map(t => t.category))];
  const filteredTemplates = selectedCategory 
    ? featureTemplates.filter(t => t.category === selectedCategory)
    : featureTemplates;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'SaaS': return Zap;
      case 'E-commerce': return Globe;
      case 'Mobile': return Smartphone;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
          <Star className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Feature Templates
          </h2>
          <p className="text-gray-600">Pre-configured feature sets for common scenarios</p>
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
                  <div className="text-sm font-medium text-gray-700">Included Features:</div>
                  <div className="space-y-1">
                    {template.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Users className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">{feature.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {feature.reach} users
                        </Badge>
                      </div>
                    ))}
                    {template.features.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{template.features.length - 3} more features
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
