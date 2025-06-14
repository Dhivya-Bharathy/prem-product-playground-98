
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Download, Users, Target, CheckSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UserStoryGenerator = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    userType: "",
    goal: "",
    benefit: "",
    priority: "",
    complexity: ""
  });
  const [generatedStory, setGeneratedStory] = useState("");
  const [acceptanceCriteria, setAcceptanceCriteria] = useState<string[]>([]);

  const handleGenerate = () => {
    if (!formData.userType || !formData.goal || !formData.benefit) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least User Type, Goal, and Benefit fields.",
        variant: "destructive"
      });
      return;
    }

    const story = `As a ${formData.userType}, I want to ${formData.goal}, so that ${formData.benefit}.`;
    setGeneratedStory(story);

    // Generate acceptance criteria based on the goal
    const criteria = [
      `Given that I am a ${formData.userType}`,
      `When I ${formData.goal}`,
      `Then I should be able to ${formData.benefit}`,
      "And the system should provide appropriate feedback",
      "And the action should be completed within reasonable time"
    ];
    setAcceptanceCriteria(criteria);

    toast({
      title: "User Story Generated!",
      description: "Your user story and acceptance criteria are ready."
    });
  };

  const copyToClipboard = () => {
    const fullText = `${generatedStory}\n\nAcceptance Criteria:\n${acceptanceCriteria.map((criteria, index) => `${index + 1}. ${criteria}`).join('\n')}`;
    navigator.clipboard.writeText(fullText);
    toast({
      title: "Copied!",
      description: "User story copied to clipboard."
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Story Generator</h1>
              <p className="text-gray-600">Create well-structured user stories with acceptance criteria</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Story Details
              </CardTitle>
              <CardDescription>
                Fill in the details to generate a user story following the "As a... I want... So that..." format
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="userType">User Type *</Label>
                <Input
                  id="userType"
                  placeholder="e.g., customer, admin, new user"
                  value={formData.userType}
                  onChange={(e) => setFormData(prev => ({ ...prev, userType: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="goal">Goal/Action *</Label>
                <Textarea
                  id="goal"
                  placeholder="e.g., search for products by category"
                  value={formData.goal}
                  onChange={(e) => setFormData(prev => ({ ...prev, goal: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="benefit">Benefit/Value *</Label>
                <Textarea
                  id="benefit"
                  placeholder="e.g., I can quickly find what I'm looking for"
                  value={formData.benefit}
                  onChange={(e) => setFormData(prev => ({ ...prev, benefit: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="complexity">Complexity</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, complexity: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select complexity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple">Simple</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="complex">Complex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleGenerate} className="w-full">
                <Target className="w-4 h-4 mr-2" />
                Generate User Story
              </Button>
            </CardContent>
          </Card>

          {/* Generated Output */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5" />
                Generated User Story
              </CardTitle>
              <CardDescription>
                Your formatted user story and acceptance criteria
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {generatedStory ? (
                <>
                  <div>
                    <Label className="text-sm font-medium">User Story</Label>
                    <div className="mt-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-blue-900 font-medium">{generatedStory}</p>
                    </div>
                    {formData.priority && (
                      <Badge variant="outline" className="mt-2">
                        Priority: {formData.priority}
                      </Badge>
                    )}
                    {formData.complexity && (
                      <Badge variant="outline" className="mt-2 ml-2">
                        Complexity: {formData.complexity}
                      </Badge>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Acceptance Criteria</Label>
                    <div className="mt-2 space-y-2">
                      {acceptanceCriteria.map((criteria, index) => (
                        <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-green-900">{criteria}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={copyToClipboard} variant="outline">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy All
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Fill in the story details and click generate to see your user story here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>User Story Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Keep it Simple</h4>
                <p className="text-sm text-gray-600">Write stories in plain language that everyone can understand.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Focus on Value</h4>
                <p className="text-sm text-gray-600">Always explain the benefit or value the user will get.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Be Specific</h4>
                <p className="text-sm text-gray-600">Include clear acceptance criteria to define "done".</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserStoryGenerator;
