import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, Save, Download, Plus, Trash2 } from "lucide-react";
import { UserStory } from "@/types/user-story";
import { useToast } from "@/hooks/use-toast";

interface UserStoryBuilderProps {
  onSaveStory: (story: UserStory) => void;
}

export const UserStoryBuilder = ({ onSaveStory }: UserStoryBuilderProps) => {
  const { toast } = useToast();
  const [userType, setUserType] = useState("");
  const [goal, setGoal] = useState("");
  const [benefit, setBenefit] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low" | "">("");
  const [complexity, setComplexity] = useState<"simple" | "moderate" | "complex" | "">("");
  const [acceptanceCriteria, setAcceptanceCriteria] = useState<string[]>([""]);
  const [notes, setNotes] = useState("");

  const generateStory = () => {
    if (!userType.trim() || !goal.trim() || !benefit.trim()) {
      return "";
    }

    return `As a ${userType.trim()}, I want to ${goal.trim()}, so that ${benefit.trim()}.`;
  };

  const fullStory = generateStory();
  const hasRequiredFields = userType.trim() && goal.trim() && benefit.trim();

  const addAcceptanceCriteria = () => {
    setAcceptanceCriteria([...acceptanceCriteria, ""]);
  };

  const updateAcceptanceCriteria = (index: number, value: string) => {
    const updated = [...acceptanceCriteria];
    updated[index] = value;
    setAcceptanceCriteria(updated);
  };

  const removeAcceptanceCriteria = (index: number) => {
    setAcceptanceCriteria(acceptanceCriteria.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!fullStory) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to generate a user story.",
        variant: "destructive"
      });
      return;
    }

    const story: UserStory = {
      id: Date.now().toString(),
      userType: userType.trim(),
      goal: goal.trim(),
      benefit: benefit.trim(),
      fullStory,
      priority: priority || "medium",
      complexity: complexity || "moderate",
      acceptanceCriteria: acceptanceCriteria.filter(criteria => criteria.trim()),
      notes: notes.trim(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    onSaveStory(story);
    
    // Clear form
    setUserType("");
    setGoal("");
    setBenefit("");
    setPriority("");
    setComplexity("");
    setAcceptanceCriteria([""]);
    setNotes("");

    toast({
      title: "Story Saved",
      description: "Your user story has been saved successfully."
    });
  };

  const handleExport = () => {
    if (!fullStory) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before exporting.",
        variant: "destructive"
      });
      return;
    }

    const exportData = {
      story: fullStory,
      components: {
        userType,
        goal,
        benefit,
        priority,
        complexity,
        acceptanceCriteria: acceptanceCriteria.filter(criteria => criteria.trim()),
        notes
      },
      createdAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user-story.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Story Exported",
      description: "Your user story has been downloaded as JSON."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg">
          <Wand2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">User Story Builder</h3>
          <p className="text-gray-600">Create well-structured user stories step by step</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Build Your Story</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="user-type">
                User Type <span className="text-red-500">*</span>
              </Label>
              <Input
                id="user-type"
                placeholder="e.g., customer, admin, new user, mobile user"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Who is this story for? Be specific about the user persona.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">
                Goal/Action <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="goal"
                placeholder="e.g., search for products by category, reset my password"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                rows={2}
              />
              <p className="text-xs text-gray-500">
                What does the user want to accomplish? Focus on the action.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="benefit">
                Benefit/Value <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="benefit"
                placeholder="e.g., I can quickly find what I'm looking for"
                value={benefit}
                onChange={(e) => setBenefit(e.target.value)}
                rows={2}
              />
              <p className="text-xs text-gray-500">
                Why is this valuable? What's the business or user benefit?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select onValueChange={(value: "high" | "medium" | "low") => setPriority(value)}>
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

              <div className="space-y-2">
                <Label htmlFor="complexity">Complexity</Label>
                <Select onValueChange={(value: "simple" | "moderate" | "complex") => setComplexity(value)}>
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

            <div className="space-y-2">
              <Label>Acceptance Criteria</Label>
              {acceptanceCriteria.map((criteria, index) => (
                <div key={index} className="flex gap-2">
                  <Textarea
                    placeholder={`Acceptance criteria ${index + 1}...`}
                    value={criteria}
                    onChange={(e) => updateAcceptanceCriteria(index, e.target.value)}
                    rows={2}
                    className="flex-1"
                  />
                  {acceptanceCriteria.length > 1 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeAcceptanceCriteria(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button size="sm" variant="outline" onClick={addAcceptanceCriteria}>
                <Plus className="w-4 h-4 mr-2" />
                Add Criteria
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Additional context, assumptions, or dependencies..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Generated Story */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Generated User Story
              {hasRequiredFields && <Badge className="bg-green-100 text-green-800">Ready</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg min-h-[100px] flex items-center">
              {hasRequiredFields ? (
                <p className="text-lg font-medium text-gray-800 italic">
                  "{fullStory}"
                </p>
              ) : (
                <p className="text-gray-500 italic">
                  Fill in the required fields above to generate your user story...
                </p>
              )}
            </div>

            {hasRequiredFields && (
              <>
                <div className="flex gap-2">
                  {priority && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-800">
                      Priority: {priority}
                    </Badge>
                  )}
                  {complexity && (
                    <Badge variant="outline" className="bg-purple-50 text-purple-800">
                      Complexity: {complexity}
                    </Badge>
                  )}
                </div>

                {acceptanceCriteria.some(criteria => criteria.trim()) && (
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Acceptance Criteria:</Label>
                    {acceptanceCriteria
                      .filter(criteria => criteria.trim())
                      .map((criteria, index) => (
                        <div key={index} className="p-2 bg-green-50 rounded text-sm">
                          {index + 1}. {criteria}
                        </div>
                      ))}
                  </div>
                )}

                {notes && (
                  <div className="p-3 bg-yellow-50 rounded">
                    <Label className="text-sm font-semibold text-yellow-800">Notes:</Label>
                    <p className="text-sm text-yellow-700 mt-1">{notes}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button onClick={handleSave} className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Save Story
                  </Button>
                  <Button onClick={handleExport} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
