import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Key, ExternalLink, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApiKeySet: (apiKey: string) => void;
  currentApiKey?: string;
}

export const AIApiKeyDialog = ({ open, onOpenChange, onApiKeySet, currentApiKey }: AIApiKeyDialogProps) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (currentApiKey) {
      setApiKey(currentApiKey);
    }
  }, [currentApiKey]);

  const handleSave = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter an OpenAI API key.",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey.startsWith('sk-')) {
      toast({
        title: "Invalid API Key",
        description: "OpenAI API keys should start with 'sk-'.",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);
    
    try {
      // Save to localStorage for persistence (consider more secure storage in production)
      localStorage.setItem('openai_api_key', apiKey);
      onApiKeySet(apiKey);
      
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved securely.",
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save API key. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemove = () => {
    localStorage.removeItem('openai_api_key');
    setApiKey('');
    onApiKeySet('');
    toast({
      title: "API Key Removed",
      description: "Your OpenAI API key has been removed.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-blue-600" />
            OpenAI API Configuration
          </DialogTitle>
          <DialogDescription>
            Configure your OpenAI API key to enable AI-powered user story generation using GPT-4o-mini.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Your API key is stored locally in your browser and never sent to our servers. 
              It's only used to communicate directly with OpenAI's API.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="apiKey">OpenAI API Key</Label>
            <div className="relative">
              <Input
                id="apiKey"
                type={showApiKey ? "text" : "password"}
                placeholder="sk-proj-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="rounded-lg bg-blue-50 p-3 text-sm">
            <p className="font-medium text-blue-900 mb-1">How to get your OpenAI API key:</p>
            <ol className="text-blue-800 space-y-1 list-decimal list-inside">
              <li>Visit the OpenAI API platform</li>
              <li>Create an account or sign in</li>
              <li>Navigate to API Keys section</li>
              <li>Generate a new secret key</li>
            </ol>
            <Button
              variant="link"
              size="sm"
              className="p-0 h-auto mt-2 text-blue-600"
              onClick={() => window.open('https://platform.openai.com/api-keys', '_blank')}
            >
              Open OpenAI API Keys <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </div>

          <Alert>
            <AlertDescription className="text-xs text-gray-600">
              <strong>Cost Info:</strong> This tool uses GPT-4o-mini, which is very cost-effective. 
              Generating user stories typically costs less than $0.01 per request. 
              Check OpenAI's pricing page for current rates.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter className="flex justify-between">
          <div>
            {currentApiKey && (
              <Button
                variant="outline"
                onClick={handleRemove}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                Remove Key
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isValidating}>
              {isValidating ? "Saving..." : "Save Key"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 