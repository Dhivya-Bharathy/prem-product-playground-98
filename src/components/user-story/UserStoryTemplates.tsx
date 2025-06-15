
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Briefcase } from "lucide-react";
import { UserStoryTemplate } from "@/types/user-story";
import { useToast } from "@/hooks/use-toast";

const templates: UserStoryTemplate[] = [
  {
    id: "user-registration",
    name: "User Registration",
    category: "Authentication",
    industry: "General",
    priority: "high",
    complexity: "moderate",
    template: "As a new visitor, I want to create an account, so that I can access personalized features and save my preferences.",
    example: "As a new visitor to the e-learning platform, I want to create an account with my email and password, so that I can enroll in courses and track my progress.",
    acceptanceCriteria: [
      "User can register with valid email and password",
      "Email verification is sent and required",
      "User receives welcome message after registration",
      "User is automatically logged in after verification"
    ],
    description: "Essential for platforms requiring user accounts and personalization"
  },
  {
    id: "search-functionality",
    name: "Search & Filter",
    category: "Navigation",
    industry: "E-commerce",
    priority: "high",
    complexity: "moderate",
    template: "As a customer, I want to search and filter products, so that I can quickly find items that match my specific needs.",
    example: "As a customer shopping for electronics, I want to search for 'wireless headphones' and filter by price range and brand, so that I can quickly find headphones within my budget.",
    acceptanceCriteria: [
      "Search returns relevant results within 2 seconds",
      "Filters can be applied and combined",
      "Search suggestions appear as user types",
      "Results show total count and can be sorted"
    ],
    description: "Critical for e-commerce and content-heavy platforms"
  },
  {
    id: "mobile-responsive",
    name: "Mobile Optimization",
    category: "Accessibility",
    industry: "General",
    priority: "high",
    complexity: "moderate",
    template: "As a mobile user, I want the interface to be optimized for my device, so that I can easily navigate and complete tasks on the go.",
    example: "As a mobile banking customer, I want the app interface to be touch-friendly with large buttons, so that I can safely transfer money while commuting.",
    acceptanceCriteria: [
      "All features work on mobile devices",
      "Touch targets are at least 44px",
      "Text is readable without zooming",
      "Navigation is thumb-friendly"
    ],
    description: "Essential for modern web applications with mobile users"
  },
  {
    id: "data-export",
    name: "Data Export",
    category: "Data Management",
    industry: "SaaS",
    priority: "medium",
    complexity: "simple",
    template: "As a user, I want to export my data, so that I can back it up or use it in other applications.",
    example: "As a project manager using a task management tool, I want to export my project data as CSV, so that I can create reports in Excel.",
    acceptanceCriteria: [
      "User can select data range for export",
      "Multiple export formats available (CSV, PDF, JSON)",
      "Export completes within reasonable time",
      "User receives confirmation when export is ready"
    ],
    description: "Important for data portability and compliance requirements"
  },
  {
    id: "notification-preferences",
    name: "Notification Settings",
    category: "User Preferences",
    industry: "General",
    priority: "medium",
    complexity: "moderate",
    template: "As a user, I want to control my notification preferences, so that I only receive relevant updates without being overwhelmed.",
    example: "As a social media user, I want to choose which types of notifications I receive via email, so that I stay informed about important interactions without inbox clutter.",
    acceptanceCriteria: [
      "User can enable/disable notification types",
      "Preferences are saved and remembered",
      "Changes take effect immediately",
      "User can choose delivery methods (email, SMS, in-app)"
    ],
    description: "Critical for user retention and engagement management"
  },
  {
    id: "payment-processing",
    name: "Secure Payment",
    category: "E-commerce",
    industry: "E-commerce",
    priority: "high",
    complexity: "complex",
    template: "As a customer, I want to make secure payments, so that I can complete purchases with confidence.",
    example: "As an online shopper, I want to pay using my preferred method (credit card, PayPal, Apple Pay), so that I can complete my purchase quickly and securely.",
    acceptanceCriteria: [
      "Multiple payment methods supported",
      "SSL encryption for all transactions",
      "Payment confirmation sent immediately",
      "Stored payment methods for returning customers"
    ],
    description: "Essential for any platform handling financial transactions"
  },
  {
    id: "admin-dashboard",
    name: "Admin Analytics",
    category: "Administration",
    industry: "SaaS",
    priority: "medium",
    complexity: "complex",
    template: "As an administrator, I want to view analytics and reports, so that I can make data-driven decisions about the platform.",
    example: "As a SaaS platform admin, I want to see user engagement metrics and feature usage, so that I can identify areas for improvement and growth opportunities.",
    acceptanceCriteria: [
      "Dashboard shows key metrics at a glance",
      "Data can be filtered by date range",
      "Reports can be exported",
      "Real-time data updates available"
    ],
    description: "Important for platform management and business intelligence"
  },
  {
    id: "password-reset",
    name: "Password Recovery",
    category: "Authentication",
    industry: "General",
    priority: "high",
    complexity: "simple",
    template: "As a user who forgot my password, I want to reset it securely, so that I can regain access to my account.",
    example: "As a returning user who forgot my password, I want to receive a secure reset link via email, so that I can create a new password and access my account.",
    acceptanceCriteria: [
      "Reset link sent to registered email",
      "Link expires after reasonable time",
      "User can set new password meeting requirements",
      "Account access restored immediately after reset"
    ],
    description: "Critical for user account management and security"
  }
];

interface UserStoryTemplatesProps {
  onUseTemplate: (template: UserStoryTemplate) => void;
}

export const UserStoryTemplates = ({ onUseTemplate }: UserStoryTemplatesProps) => {
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
      case 'Authentication': return 'bg-blue-100 text-blue-800';
      case 'Navigation': return 'bg-green-100 text-green-800';
      case 'E-commerce': return 'bg-purple-100 text-purple-800';
      case 'Accessibility': return 'bg-orange-100 text-orange-800';
      case 'Data Management': return 'bg-teal-100 text-teal-800';
      case 'User Preferences': return 'bg-pink-100 text-pink-800';
      case 'Administration': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
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
          <h3 className="text-xl font-bold text-gray-900">User Story Templates</h3>
          <p className="text-gray-600">Industry-standard templates to jumpstart your story writing</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <Badge className={getCategoryColor(template.category)}>
                      {template.category}
                    </Badge>
                    <Badge variant="outline">{template.industry}</Badge>
                    <Badge className={getPriorityColor(template.priority)}>
                      {template.priority}
                    </Badge>
                    <Badge variant="secondary">{template.complexity}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{template.description}</p>
              
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h5 className="text-sm font-semibold text-gray-700 mb-1">Template:</h5>
                  <p className="text-sm text-gray-800 italic">"{template.template}"</p>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h5 className="text-sm font-semibold text-blue-700 mb-1">Example:</h5>
                  <p className="text-sm text-blue-800 italic">"{template.example}"</p>
                </div>

                <div className="p-3 bg-green-50 rounded-lg">
                  <h5 className="text-sm font-semibold text-green-700 mb-1">Acceptance Criteria:</h5>
                  <ul className="text-xs text-green-800 space-y-1">
                    {template.acceptanceCriteria.slice(0, 2).map((criteria, index) => (
                      <li key={index}>• {criteria}</li>
                    ))}
                    {template.acceptanceCriteria.length > 2 && (
                      <li className="text-green-600">+ {template.acceptanceCriteria.length - 2} more criteria</li>
                    )}
                  </ul>
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
