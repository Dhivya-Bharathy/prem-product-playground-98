
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Download, Users, Target, CheckSquare, Lightbulb, Sparkles } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
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
                User Story Generator
              </h1>
              <p className="text-gray-600">Create well-structured user stories with acceptance criteria</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  Story Details
                </CardTitle>
                <CardDescription>
                  Fill in the details to generate a user story following the "As a... I want... So that..." format
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-0">
                <div>
                  <Label htmlFor="userType" className="text-sm font-medium text-gray-700 mb-2 block">
                    User Type *
                  </Label>
                  <Input
                    id="userType"
                    placeholder="e.g., customer, admin, new user"
                    value={formData.userType}
                    onChange={(e) => setFormData(prev => ({ ...prev, userType: e.target.value }))}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="goal" className="text-sm font-medium text-gray-700 mb-2 block">
                    Goal/Action *
                  </Label>
                  <Textarea
                    id="goal"
                    placeholder="e.g., search for products by category"
                    value={formData.goal}
                    onChange={(e) => setFormData(prev => ({ ...prev, goal: e.target.value }))}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="benefit" className="text-sm font-medium text-gray-700 mb-2 block">
                    Benefit/Value *
                  </Label>
                  <Textarea
                    id="benefit"
                    placeholder="e.g., I can quickly find what I'm looking for"
                    value={formData.benefit}
                    onChange={(e) => setFormData(prev => ({ ...prev, benefit: e.target.value }))}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priority" className="text-sm font-medium text-gray-700 mb-2 block">
                      Priority
                    </Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                      <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
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
                    <Label htmlFor="complexity" className="text-sm font-medium text-gray-700 mb-2 block">
                      Complexity
                    </Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, complexity: value }))}>
                      <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
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

                <Button 
                  onClick={handleGenerate} 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Generate User Story
                </Button>
              </CardContent>
            </div>

            {/* Generated Output */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                    <CheckSquare className="w-5 h-5 text-white" />
                  </div>
                  Generated User Story
                </CardTitle>
                <CardDescription>
                  Your formatted user story and acceptance criteria
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-0">
                {generatedStory ? (
                  <>
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">User Story</Label>
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
                        <p className="text-gray-900 font-medium">{generatedStory}</p>
                      </div>
                      <div className="flex gap-2 mt-3">
                        {formData.priority && (
                          <Badge variant="outline" className="bg-white/50">
                            Priority: {formData.priority}
                          </Badge>
                        )}
                        {formData.complexity && (
                          <Badge variant="outline" className="bg-white/50">
                            Complexity: {formData.complexity}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Acceptance Criteria</Label>
                      <div className="space-y-2">
                        {acceptanceCriteria.map((criteria, index) => (
                          <div key={index} className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                            <p className="text-gray-900">{criteria}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={copyToClipboard} variant="outline" className="bg-white/80 hover:bg-white">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy All
                      </Button>
                      <Button variant="outline" className="bg-white/80 hover:bg-white">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-gray-500 py-12">
                    <div className="p-4 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Lightbulb className="w-8 h-8 text-white" />
                    </div>
                    <p>Fill in the story details and click generate to see your user story here.</p>
                  </div>
                )}
              </CardContent>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                User Story Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                  <h4 className="font-semibold mb-2 text-blue-900">Keep it Simple</h4>
                  <p className="text-sm text-blue-700">Write stories in plain language that everyone can understand.</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
                  <h4 className="font-semibold mb-2 text-green-900">Focus on Value</h4>
                  <p className="text-sm text-green-700">Always explain the benefit or value the user will get.</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                  <h4 className="font-semibold mb-2 text-purple-900">Be Specific</h4>
                  <p className="text-sm text-purple-700">Include clear acceptance criteria to define "done".</p>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStoryGenerator;
