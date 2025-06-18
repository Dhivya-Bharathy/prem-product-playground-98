
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, CheckCircle, AlertCircle, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSecureForm } from '@/hooks/useSecureForm';
import { UserStory, UserStoryTemplate } from "@/types/user-story";

interface UserStoryBuilderProps {
  onSaveStory?: (story: UserStory) => void;
  templateToUse?: UserStoryTemplate | null;
  onTemplateUsed?: () => void;
}

export const UserStoryBuilder = ({ onSaveStory, templateToUse, onTemplateUsed }: UserStoryBuilderProps) => {
  const [userType, setUserType] = useState('');
  const [action, setAction] = useState('');
  const [benefit, setBenefit] = useState('');
  const [priority, setPriority] = useState('');
  const [complexity, setComplexity] = useState('');
  const [acceptanceCriteria, setAcceptanceCriteria] = useState<string[]>(['']);
  const [notes, setNotes] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();
  
  const { validateField, sanitizeField, errors: securityErrors } = useSecureForm({
    rateLimitKey: 'user-story-form',
    maxLength: 500
  });

  // Load template data when templateToUse changes
  useEffect(() => {
    if (templateToUse) {
      const parts = templateToUse.template.match(/As a (.+?), I want (.+?) so that (.+?)\./);
      if (parts) {
        setUserType(parts[1]);
        setAction(parts[2]);
        setBenefit(parts[3]);
      }
      setPriority(templateToUse.priority);
      setComplexity(templateToUse.complexity);
      setAcceptanceCriteria(templateToUse.acceptanceCriteria.length > 0 ? templateToUse.acceptanceCriteria : ['']);
      setNotes(`Template: ${templateToUse.name} (${templateToUse.category})`);
      
      // Generate the story immediately
      const story = `As a ${parts?.[1] || templateToUse.template}, I want ${parts?.[2] || ''} so that ${parts?.[3] || ''}.`;
      setGeneratedStory(story);
      
      // Call the callback to clear the template
      if (onTemplateUsed) {
        onTemplateUsed();
      }
    }
  }, [templateToUse, onTemplateUsed]);

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(sanitizeField(e.target.value));
  };

  const handleActionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAction(sanitizeField(e.target.value));
  };

  const handleBenefitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBenefit(sanitizeField(e.target.value));
  };

  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };

  const handleComplexityChange = (value: string) => {
    setComplexity(value);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(sanitizeField(e.target.value));
  };

  const addAcceptanceCriteria = () => {
    setAcceptanceCriteria([...acceptanceCriteria, '']);
  };

  const updateAcceptanceCriteria = (index: number, value: string) => {
    const updated = [...acceptanceCriteria];
    updated[index] = sanitizeField(value);
    setAcceptanceCriteria(updated);
  };

  const removeAcceptanceCriteria = (index: number) => {
    setAcceptanceCriteria(acceptanceCriteria.filter((_, i) => i !== index));
  };

  const generateUserStory = () => {
    if (!userType || !action || !benefit) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const story = `As a ${userType}, I want ${action} so that ${benefit}.`;
    setGeneratedStory(story);
  };

  const handleCopyClick = () => {
    if (generatedStory) {
      navigator.clipboard.writeText(generatedStory);
      setIsCopied(true);
      toast({
        title: "Copied!",
        description: "User story copied to clipboard.",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } else {
      toast({
        title: "Error",
        description: "No user story generated yet.",
        variant: "destructive",
      });
    }
  };

  const handleSaveStory = () => {
    if (!generatedStory || !onSaveStory) return;

    const story: UserStory = {
      id: Date.now().toString(),
      userType,
      goal: action,
      benefit,
      fullStory: generatedStory,
      priority: (priority as 'high' | 'medium' | 'low') || 'medium',
      complexity: (complexity as 'simple' | 'moderate' | 'complex') || 'moderate',
      acceptanceCriteria: acceptanceCriteria.filter(criteria => criteria.trim() !== ''),
      notes,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    onSaveStory(story);
    
    // Reset form
    setUserType('');
    setAction('');
    setBenefit('');
    setPriority('');
    setComplexity('');
    setAcceptanceCriteria(['']);
    setNotes('');
    setGeneratedStory('');

    toast({
      title: "Story Saved!",
      description: "Your user story has been saved successfully.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Security validation
    if (!validateField('userType', userType) || 
        !validateField('action', action) || 
        !validateField('benefit', benefit)) {
      return;
    }

    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      return;
    }

    if (complexity && !['simple', 'moderate', 'complex'].includes(complexity)) {
      return;
    }

    generateUserStory();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-md">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">User Story Builder</h2>
        <p className="text-gray-600 mb-6">
          Create clear and concise user stories using the standard template.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="userType">User Type</Label>
            <Input
              type="text"
              id="userType"
              placeholder="e.g., a marketing manager"
              value={userType}
              onChange={handleUserTypeChange}
              className={securityErrors.userType ? "border-red-500" : ""}
            />
            {securityErrors.userType && <p className="text-red-500 text-sm mt-1">{securityErrors.userType}</p>}
          </div>
          <div>
            <Label htmlFor="action">Action</Label>
            <Input
              type="text"
              id="action"
              placeholder="e.g., view campaign statistics"
              value={action}
              onChange={handleActionChange}
              className={securityErrors.action ? "border-red-500" : ""}
            />
            {securityErrors.action && <p className="text-red-500 text-sm mt-1">{securityErrors.action}</p>}
          </div>
          <div>
            <Label htmlFor="benefit">Benefit</Label>
            <Input
              type="text"
              id="benefit"
              placeholder="e.g., I can optimize our ad spend"
              value={benefit}
              onChange={handleBenefitChange}
              className={securityErrors.benefit ? "border-red-500" : ""}
            />
            {securityErrors.benefit && <p className="text-red-500 text-sm mt-1">{securityErrors.benefit}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={handlePriorityChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="complexity">Complexity</Label>
              <Select value={complexity} onValueChange={handleComplexityChange}>
                <SelectTrigger className="w-full">
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
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Acceptance Criteria</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addAcceptanceCriteria}
                className="flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {acceptanceCriteria.map((criteria, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={`Acceptance criteria ${index + 1}`}
                    value={criteria}
                    onChange={(e) => updateAcceptanceCriteria(index, e.target.value)}
                    className="flex-1"
                  />
                  {acceptanceCriteria.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeAcceptanceCriteria(index)}
                      className="px-2"
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes or context..."
              value={notes}
              onChange={handleNotesChange}
              className="resize-none"
              rows={3}
            />
          </div>

          <div>
            <Button type="submit" className="w-full">
              Generate User Story
            </Button>
          </div>
        </form>
        {generatedStory && (
          <div className="mt-8">
            <Label>Generated User Story</Label>
            <div className="relative">
              <Textarea
                readOnly
                value={generatedStory}
                className="resize-none"
              />
              <div className="absolute right-2 top-2 flex gap-2">
                <Button
                  variant="ghost"
                  onClick={handleCopyClick}
                  className="h-8 w-8 rounded-full hover:bg-gray-100"
                >
                  {isCopied ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                {onSaveStory && (
                  <Button
                    variant="ghost"
                    onClick={handleSaveStory}
                    className="h-8 px-3 rounded-full hover:bg-gray-100 text-xs"
                  >
                    Save
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
        {securityErrors.rateLimit && (
          <div className="mt-4 p-3 rounded-md bg-red-50 text-red-500 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            {securityErrors.rateLimit}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
