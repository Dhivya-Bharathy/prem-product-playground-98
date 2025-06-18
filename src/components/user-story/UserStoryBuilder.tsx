import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSecureForm } from '@/hooks/useSecureForm';

export const UserStoryBuilder = () => {
  const [userType, setUserType] = useState('');
  const [action, setAction] = useState('');
  const [benefit, setBenefit] = useState('');
  const [priority, setPriority] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();
  
  const { validateField, sanitizeField, errors: securityErrors } = useSecureForm({
    rateLimitKey: 'user-story-form',
    maxLength: 500
  });

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
          <div>
            <Label htmlFor="priority">Priority (Optional)</Label>
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
              <Button
                variant="ghost"
                onClick={handleCopyClick}
                className="absolute right-2 top-2 h-8 w-8 rounded-full hover:bg-gray-100"
              >
                {isCopied ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
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
