import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Trash2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { UserStory, UserStoryTemplate } from "@/types/user-story";
import { UserStoryGuide } from "@/components/user-story/UserStoryGuide";
import { UserStoryBuilder } from "@/components/user-story/UserStoryBuilder";
import { UserStoryTemplates } from "@/components/user-story/UserStoryTemplates";
import { useToast } from "@/hooks/use-toast";
import { userStoryTabIcons } from "@/components/user-story/UserStoryTabsIconMap";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { UserStoryHeader } from "@/components/user-story/UserStoryHeader";
import { UserStoryTabs } from "@/components/user-story/UserStoryTabs";

const UserStoryGenerator = () => {
  const { toast } = useToast();
  const [stories, setStories] = useState<UserStory[]>([]);
  const [activeTab, setActiveTab] = useState("guide");
  const [templateToUse, setTemplateToUse] = useState<UserStoryTemplate | null>(null);

  // Load stories from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('user-stories');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const storiesWithDates = parsed.map((story: any) => ({
          ...story,
          createdAt: new Date(story.createdAt),
          updatedAt: new Date(story.updatedAt)
        }));
        setStories(storiesWithDates);
      } catch (error) {
        console.error('Failed to load stories:', error);
      }
    }
  }, []);

  // Save stories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('user-stories', JSON.stringify(stories));
  }, [stories]);

  const handleSaveStory = (story: UserStory) => {
    setStories(prev => [story, ...prev]);
  };

  const handleUseTemplate = (template: UserStoryTemplate) => {
    // Set the template data and switch to builder tab
    setTemplateToUse(template);
    setActiveTab("builder");
  };

  const handleTemplateUsed = () => {
    // Clear the template after it's been used
    setTemplateToUse(null);
  };

  const handleDeleteStory = (id: string) => {
    setStories(prev => prev.filter(story => story.id !== id));
    toast({
      title: "Story Deleted",
      description: "The user story has been removed."
    });
  };

  const handleExportAll = () => {
    if (stories.length === 0) {
      toast({
        title: "No Data",
        description: "No stories to export.",
        variant: "destructive"
      });
      return;
    }

    const exportData = {
      stories,
      exportDate: new Date().toISOString(),
      totalCount: stories.length
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `user-stories-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `${stories.length} stories exported successfully.`
    });
  };

  const handleClearAll = () => {
    setStories([]);
    localStorage.removeItem('user-stories');
    toast({
      title: "All Cleared",
      description: "All user stories have been removed."
    });
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <UserStoryHeader
        storiesLength={stories.length}
        handleExportAll={handleExportAll}
        handleClearAll={handleClearAll}
      />

      <div className="container mx-auto px-1 sm:px-4 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto">
          <UserStoryTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            stories={stories}
            handleSaveStory={handleSaveStory}
            templateToUse={templateToUse}
            handleTemplateUsed={handleTemplateUsed}
            handleUseTemplate={handleUseTemplate}
            handleDeleteStory={handleDeleteStory}
            getPriorityColor={getPriorityColor}
          />
        </div>
      </div>
    </div>
  );
};

export default UserStoryGenerator;
