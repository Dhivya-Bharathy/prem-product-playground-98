
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Briefcase } from "lucide-react";
import { JTBDTemplate } from "@/types/jtbd";
import { useToast } from "@/hooks/use-toast";

const templates: JTBDTemplate[] = [
  {
    id: "saas-onboarding",
    name: "SaaS User Onboarding",
    industry: "SaaS",
    category: "functional",
    template: "When I [start using a new software tool], I want to [understand how to use it quickly], so I can [start getting value without wasting time]",
    example: "When I start using a new project management tool, I want to understand how to create and organize projects quickly, so I can start managing my team's work without wasting time on tutorials.",
    description: "For software products focusing on user onboarding and time-to-value"
  },
  {
    id: "ecommerce-purchase",
    name: "E-commerce Purchase Decision",
    industry: "E-commerce",
    category: "functional",
    template: "When I [need to buy a specific product], I want to [find the best option quickly], so I can [make a confident purchase decision]",
    example: "When I need to buy running shoes online, I want to find the best fit and style quickly, so I can make a confident purchase without worrying about returns.",
    description: "For online retail and marketplace platforms"
  },
  {
    id: "healthcare-appointment",
    name: "Healthcare Appointment",
    industry: "Healthcare",
    category: "functional",
    template: "When I [have a health concern], I want to [get professional care conveniently], so I can [address my health issue with minimal disruption]",
    example: "When I have a minor health concern, I want to get professional medical advice conveniently, so I can address my health issue without taking time off work.",
    description: "For healthcare and telemedicine services"
  },
  {
    id: "financial-planning",
    name: "Financial Planning",
    industry: "Finance",
    category: "emotional",
    template: "When I [think about my financial future], I want to [feel confident about my decisions], so I can [achieve financial security]",
    example: "When I think about retirement planning, I want to feel confident about my investment decisions, so I can achieve financial security without constant worry.",
    description: "For financial services and investment platforms"
  },
  {
    id: "learning-skill",
    name: "Skill Development",
    industry: "Education",
    category: "functional",
    template: "When I [want to advance my career], I want to [learn new skills efficiently], so I can [become more valuable in my field]",
    example: "When I want to advance my career in marketing, I want to learn digital marketing skills efficiently, so I can become more valuable and get promoted.",
    description: "For educational platforms and career development"
  },
  {
    id: "social-sharing",
    name: "Social Sharing",
    industry: "Social Media",
    category: "social",
    template: "When I [experience something noteworthy], I want to [share it with my network], so I can [maintain my social connections and identity]",
    example: "When I achieve a professional milestone, I want to share it with my network, so I can maintain my professional reputation and celebrate with colleagues.",
    description: "For social media and community platforms"
  }
];

interface JTBDTemplatesProps {
  onUseTemplate: (template: JTBDTemplate) => void;
}

export const JTBDTemplates = ({ onUseTemplate }: JTBDTemplatesProps) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Template copied successfully"
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'functional': return 'bg-blue-100 text-blue-800';
      case 'emotional': return 'bg-green-100 text-green-800';
      case 'social': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
          <Briefcase className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">JTBD Templates</h3>
          <p className="text-gray-600">Pre-built templates to get you started</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">{template.industry}</Badge>
                    <Badge className={getCategoryColor(template.category)}>
                      {template.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{template.description}</p>
              
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h5 className="text-sm font-semibold text-gray-700 mb-1">Template:</h5>
                  <p className="text-sm font-mono text-gray-800">{template.template}</p>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h5 className="text-sm font-semibold text-blue-700 mb-1">Example:</h5>
                  <p className="text-sm text-blue-800 italic">{template.example}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => onUseTemplate(template)}
                  className="flex-1"
                >
                  Use Template
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => copyToClipboard(template.template)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
