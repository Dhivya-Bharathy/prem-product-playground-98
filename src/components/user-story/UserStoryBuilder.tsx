import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, User, Target, Heart } from "lucide-react";
import { UserStory, UserStoryTemplate } from "@/types/user-story";
import { useToast } from "@/hooks/use-toast";
import { useSecureForm } from "@/hooks/useSecureForm";

interface UserStoryBuilderProps {
  onSaveStory: (story: UserStory) => void;
  templateToUse: UserStoryTemplate | null;
  onTemplateUsed: () => void;
}

export const UserStoryBuilder = ({ onSaveStory, templateToUse, onTemplateUsed }: UserStoryBuilderProps) => {
  const [title, setTitle] = useState("");
  const [userType, setUserType] = useState("");
  const [goal, setGoal] = useState("");
  const [reason, setReason] = useState("");
  const [acceptanceCriteria, setAcceptanceCriteria] = useState<string[]>([""]);
  const [priority, setPriority] = useState<string>("medium");
  const [storyPoints, setStoryPoints] = useState<string>("3");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([""]);
  const [notes, setNotes] = useState("");
  
  const { toast } = useToast();
  const { validateField, sanitizeField, checkRateLimit, errors, hasErrors, clearErrors } = useSecureForm({
    rateLimitKey: 'user-story-creation',
    maxLength: 2000
  });

  useEffect(() => {
    if (templateToUse) {
      setTitle(templateToUse.name);
      setUserType(templateToUse.template.split("As ")[1]?.split(",")[0] || "");
      setGoal(
        templateToUse.template.split("I want ")[1]?.split(",")[0] ||
          templateToUse.template.split("I want ")[1]?.split(".")[0] ||
          ""
      );
      setReason(
        templateToUse.template.split("so that ")[1]?.split(".")[0] || ""
      );
      setAcceptanceCriteria(templateToUse.acceptanceCriteria || [""]);
      setPriority(templateToUse.priority);
      setCategory(templateToUse.category);
      onTemplateUsed();
    }
  }, [templateToUse, onTemplateUsed]);

  const handleSave = () => {
    // Clear previous errors
    clearErrors();

    // Check rate limiting
    if (!checkRateLimit()) {
      toast({
        title: "Rate Limit Exceeded",
        description: errors.rateLimit,
        variant: "destructive"
      });
      return;
    }

    // Validate required fields
    const titleValid = validateField('title', title, 'text');
    const userTypeValid = validateField('userType', userType, 'text');
    const goalValid = validateField('goal', goal, 'text');
    const reasonValid = validateField('reason', reason, 'text');

    if (!titleValid || !userTypeValid || !goalValid || !reasonValid || hasErrors) {
      toast({
        title: "Validation Error",
        description: "Please fix all form errors before saving",
        variant: "destructive"
      });
      return;
    }

    // Sanitize inputs
    const sanitizedStory: UserStory = {
      id: Date.now().toString(),
      title: sanitizeField(title),
      userType: sanitizeField(userType),
      goal: sanitizeField(goal),
      reason: sanitizeField(reason),
      acceptanceCriteria: acceptanceCriteria.map(criteria => sanitizeField(criteria)).filter(Boolean),
      priority,
      storyPoints: parseInt(storyPoints),
      category: sanitizeField(category),
      tags: tags.map(tag => sanitizeField(tag)).filter(Boolean),
      notes: sanitizeField(notes)
    };

    onSaveStory(sanitizedStory);
    
    // Reset form
    setTitle('');
    setUserType('');
    setGoal('');
    setReason('');
    setAcceptanceCriteria(['']);
    setPriority('medium');
    setStoryPoints('3');
    setCategory('');
    setTags(['']);
    setNotes('');
    clearErrors();

    toast({
      title: "Story Saved",
      description: "Your user story has been saved successfully"
    });
  };

  const handleAddAcceptanceCriteria = () => {
    setAcceptanceCriteria([...acceptanceCriteria, ""]);
  };

  const handleAcceptanceCriteriaChange = (index: number, value: string) => {
    const newCriteria = [...acceptanceCriteria];
    newCriteria[index] = value;
    setAcceptanceCriteria(newCriteria);
  };

  const handleRemoveAcceptanceCriteria = (index: number) => {
    if (acceptanceCriteria.length > 1) {
      const newCriteria = [...acceptanceCriteria];
      newCriteria.splice(index, 1);
      setAcceptanceCriteria(newCriteria);
    }
  };

  const handleAddTag = () => {
    setTags([...tags, ""]);
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const handleRemoveTag = (index: number) => {
    if (tags.length > 1) {
      const newTags = [...tags];
      newTags.splice(index, 1);
      setTags(newTags);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
          <PlusCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Create User Story</h3>
          <p className="text-gray-600">Build a well-structured user story with all necessary details</p>
        </div>
      </div>
      
      {/* Error display */}
      {hasErrors && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="py-4">
            <div className="space-y-2">
              {Object.entries(errors).map(([field, error]) => (
                <p key={field} className="text-red-600 text-sm">
                  <strong>{field}:</strong> {error}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Story Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Story Title
            </label>
            <Input
              id="title"
              placeholder="Enter a descriptive title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <Input
                id="category"
                placeholder="Feature area or module"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">
                    <div className="flex items-center">
                      <Badge className={getPriorityColor("high")}>High</Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center">
                      <Badge className={getPriorityColor("medium")}>Medium</Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="low">
                    <div className="flex items-center">
                      <Badge className={getPriorityColor("low")}>Low</Badge>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>As a...</span>
                </div>
              </label>
              <Input
                id="userType"
                placeholder="Type of user"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="storyPoints" className="block text-sm font-medium text-gray-700 mb-1">
                Story Points
              </label>
              <Select value={storyPoints} onValueChange={setStoryPoints}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 5, 8, 13].map((point) => (
                    <SelectItem key={point} value={point.toString()}>
                      {point}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                <span>I want to...</span>
              </div>
            </label>
            <Input
              id="goal"
              placeholder="What the user wants to accomplish"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>So that...</span>
              </div>
            </label>
            <Input
              id="reason"
              placeholder="Why the user wants this / value it provides"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Acceptance Criteria</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {acceptanceCriteria.map((criteria, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder={`Criteria ${index + 1}`}
                value={criteria}
                onChange={(e) => handleAcceptanceCriteriaChange(index, e.target.value)}
              />
              <Button
                variant="outline"
                size="icon"
                type="button"
                onClick={() => handleRemoveAcceptanceCriteria(index)}
                disabled={acceptanceCriteria.length === 1}
              >
                &times;
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            type="button"
            onClick={handleAddAcceptanceCriteria}
            className="w-full"
          >
            Add Criteria
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="space-y-2">
              {tags.map((tag, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={`Tag ${index + 1}`}
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    disabled={tags.length === 1}
                  >
                    &times;
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                type="button"
                onClick={handleAddTag}
                className="w-full"
              >
                Add Tag
              </Button>
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <Textarea
              id="notes"
              placeholder="Additional context, implementation details, or considerations"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          Save User Story
        </Button>
      </div>
    </div>
  );
};
