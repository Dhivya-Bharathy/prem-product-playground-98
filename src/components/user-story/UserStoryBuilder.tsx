import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, CheckCircle, AlertCircle, Plus, Sparkles, Key, Wand2, RotateCcw, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSecureForm } from '@/hooks/useSecureForm';
import { UserStory, UserStoryTemplate } from "@/types/user-story";
import { openaiService } from '@/services/openaiService';
import { AIApiKeyDialog } from './AIApiKeyDialog';
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  
  // AI-related state
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [activeTab, setActiveTab] = useState('manual');
  
  const { toast } = useToast();
  
  const { validateField, sanitizeField, errors: securityErrors } = useSecureForm({
    rateLimitKey: 'user-story-form',
    maxLength: 500
  });

  // Initialize API key from localStorage
  useEffect(() => {
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      openaiService.initialize(savedApiKey);
    }
  }, []);

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

  const handleApiKeySet = (newApiKey: string) => {
    setApiKey(newApiKey);
    if (newApiKey) {
      openaiService.initialize(newApiKey);
    }
  };

  const generateWithAI = async () => {
    if (!openaiService.isInitialized()) {
      setShowApiKeyDialog(true);
      return;
    }

    if (!aiPrompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a description for the user story you want to generate.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingAI(true);
    
    try {
      const aiResult = await openaiService.generateUserStory(aiPrompt);
      
      // Populate the form with AI-generated data
      setUserType(aiResult.userType);
      setAction(aiResult.action);
      setBenefit(aiResult.benefit);
      setPriority(aiResult.priority);
      setComplexity(aiResult.complexity);
      setAcceptanceCriteria(aiResult.acceptanceCriteria);
      setNotes(aiResult.notes);
      
      // Generate the full story
      const story = `As a ${aiResult.userType}, I want ${aiResult.action} so that ${aiResult.benefit}.`;
      setGeneratedStory(story);

      toast({
        title: "User Story Generated!",
        description: "AI has generated a comprehensive user story for you.",
      });

      // Switch to manual tab to show the generated content
      setActiveTab('manual');
      
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate user story with AI.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const improveWithAI = async () => {
    if (!openaiService.isInitialized()) {
      setShowApiKeyDialog(true);
      return;
    }

    if (!generatedStory) {
      toast({
        title: "Error",
        description: "Please generate a user story first.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingAI(true);
    
    try {
      const improvement = await openaiService.improveUserStory(generatedStory);
      
      // Parse the improved story
      const parts = improvement.improvedStory.match(/As a (.+?), I want (.+?) so that (.+?)\./);
      if (parts) {
        setUserType(parts[1]);
        setAction(parts[2]);
        setBenefit(parts[3]);
      }
      
      setGeneratedStory(improvement.improvedStory);
      setAcceptanceCriteria(improvement.acceptanceCriteria);
      setNotes(prev => `${prev}\n\nAI Suggestions: ${improvement.suggestions.join(', ')}`);

      toast({
        title: "Story Improved!",
        description: "AI has enhanced your user story with suggestions.",
      });
      
    } catch (error) {
      toast({
        title: "Improvement Failed",
        description: error instanceof Error ? error.message : "Failed to improve user story with AI.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingAI(false);
    }
  };

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
    setAiPrompt('');

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

  const resetForm = () => {
    setUserType('');
    setAction('');
    setBenefit('');
    setPriority('');
    setComplexity('');
    setAcceptanceCriteria(['']);
    setNotes('');
    setGeneratedStory('');
    setAiPrompt('');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Sparkles className="h-6 w-6 text-blue-600" />
          AI-Powered User Story Builder
        </CardTitle>
        <p className="text-gray-600">
          Create comprehensive user stories manually or with AI assistance.
        </p>
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Wand2 className="h-4 w-4" />
              AI Generator
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Manual Builder
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai" className="space-y-4">
            <div className="space-y-4">
              {!openaiService.isInitialized() && (
                <Alert>
                  <Key className="h-4 w-4" />
                  <AlertDescription>
                    Configure your OpenAI API key to enable AI-powered user story generation.
                    <Button
                      variant="link"
                      className="p-0 ml-1 h-auto"
                      onClick={() => setShowApiKeyDialog(true)}
                    >
                      Set up API key
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="aiPrompt">Describe your feature or requirement</Label>
                <Textarea
                  id="aiPrompt"
                  placeholder="e.g., A mobile app feature that allows users to track their daily water intake and set reminders"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button 
                  onClick={generateWithAI}
                  disabled={isGeneratingAI || !openaiService.isInitialized()}
                  className="flex items-center gap-2"
                >
                  {isGeneratingAI ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate with AI
                    </>
                  )}
                </Button>

                {!openaiService.isInitialized() && (
                  <Button
                    variant="outline"
                    onClick={() => setShowApiKeyDialog(true)}
                    className="flex items-center gap-2"
                  >
                    <Key className="h-4 w-4" />
                    Setup API Key
                  </Button>
                )}
              </div>

              <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                <strong>💡 Pro Tips:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Be specific about the user type and context</li>
                  <li>Include the problem you're trying to solve</li>
                  <li>Mention any constraints or requirements</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="userType">User Type</Label>
                  <Input
                    type="text"
                    id="userType"
                    placeholder="e.g., a marketing manager"
                    value={userType}
                    onChange={handleUserTypeChange}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="action">Action</Label>
                  <Input
                    type="text"
                    id="action"
                    placeholder="e.g., view campaign statistics"
                    value={action}
                    onChange={handleActionChange}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="benefit">Benefit</Label>
                <Input
                  type="text"
                  id="benefit"
                  placeholder="e.g., I can optimize our ad spend"
                  value={benefit}
                  onChange={handleBenefitChange}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={priority} onValueChange={handlePriorityChange}>
                    <SelectTrigger>
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

              <div>
                <Label>Acceptance Criteria</Label>
                {acceptanceCriteria.map((criteria, index) => (
                  <div key={index} className="flex items-center gap-2 mt-2">
                    <Input
                      placeholder={`Criterion ${index + 1}`}
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
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addAcceptanceCriteria}
                  className="mt-2 flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Add Criterion
                </Button>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional context, assumptions, or implementation notes..."
                  value={notes}
                  onChange={handleNotesChange}
                  className="min-h-[80px]"
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button type="submit" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Generate Story
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={resetForm}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>

                {generatedStory && openaiService.isInitialized() && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={improveWithAI}
                    disabled={isGeneratingAI}
                    className="flex items-center gap-2"
                  >
                    {isGeneratingAI ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                    ) : (
                      <Lightbulb className="h-4 w-4" />
                    )}
                    Improve with AI
                  </Button>
                )}
              </div>
            </form>
          </TabsContent>
        </Tabs>

        {/* Generated Story Display */}
        {generatedStory && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Generated User Story:</h3>
            <p className="text-green-700 font-medium mb-4">{generatedStory}</p>
            
            {acceptanceCriteria.some(criteria => criteria.trim() !== '') && (
              <div className="mt-3">
                <h4 className="font-medium text-green-800 mb-1">Acceptance Criteria:</h4>
                <ul className="list-disc list-inside text-green-700 text-sm space-y-1">
                  {acceptanceCriteria
                    .filter(criteria => criteria.trim() !== '')
                    .map((criteria, index) => (
                      <li key={index}>{criteria}</li>
                    ))}
                </ul>
              </div>
            )}
            
            <div className="flex gap-2 mt-4">
              <Button
                onClick={handleCopyClick}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                {isCopied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {isCopied ? 'Copied!' : 'Copy'}
              </Button>
              
              {onSaveStory && (
                <Button
                  onClick={handleSaveStory}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Save Story
                </Button>
              )}
            </div>
          </div>
        )}

        {/* API Key Dialog */}
        <AIApiKeyDialog
          open={showApiKeyDialog}
          onOpenChange={setShowApiKeyDialog}
          onApiKeySet={handleApiKeySet}
          currentApiKey={apiKey}
        />
      </CardContent>
    </Card>
  );
};
