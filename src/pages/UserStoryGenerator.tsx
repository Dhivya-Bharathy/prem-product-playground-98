
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
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-sm shadow-sm border-b border-white/20">
        <div className="container mx-auto px-2 sm:px-4 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Tools
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  User Story Generator
                </h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  Create well-structured user stories using industry standards
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {stories.length > 0 && (
                <>
                  <Badge variant="secondary" className="px-2 sm:px-3 py-1">
                    <Users className="w-4 h-4 mr-1" />
                    {stories.length} Stories
                  </Badge>
                  <Button size="sm" variant="outline" onClick={handleExportAll} className="bg-white/80 hover:bg-white w-full sm:w-auto">
                    <Download className="w-4 h-4 mr-2" />
                    Export All
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleClearAll} className="bg-white/80 hover:bg-white w-full sm:w-auto">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-2 sm:px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* Responsive TabsList */}
            <div className="overflow-x-auto hide-scrollbar mb-4 -mx-2 px-2">
              <TabsList
                className="flex w-full min-w-[350px] md:min-w-0 sm:grid sm:grid-cols-4 gap-2 sm:gap-0 border rounded-lg bg-slate-100"
                style={{ minWidth: 330 }}
              >
                <TabsTrigger value="guide" className="flex-1 min-w-[120px] text-xs sm:text-sm">
                  Framework Guide
                </TabsTrigger>
                <TabsTrigger value="builder" className="flex-1 min-w-[120px] text-xs sm:text-sm">
                  Story Builder
                </TabsTrigger>
                <TabsTrigger value="templates" className="flex-1 min-w-[120px] text-xs sm:text-sm">
                  Templates
                </TabsTrigger>
                <TabsTrigger value="stories" className="flex-1 min-w-[120px] text-xs sm:text-sm">
                  My Stories
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="guide">
              <div className="bg-white/90 rounded-xl shadow-lg border border-white/20 p-4 sm:p-6">
                <UserStoryGuide />
              </div>
            </TabsContent>

            <TabsContent value="builder">
              <div className="bg-white/90 rounded-xl shadow-lg border border-white/20 p-4 sm:p-6">
                <UserStoryBuilder 
                  onSaveStory={handleSaveStory} 
                  templateToUse={templateToUse}
                  onTemplateUsed={handleTemplateUsed}
                />
              </div>
            </TabsContent>

            <TabsContent value="templates">
              <div className="bg-white/90 rounded-xl shadow-lg border border-white/20 p-4 sm:p-6">
                <UserStoryTemplates onUseTemplate={handleUseTemplate} />
              </div>
            </TabsContent>

            <TabsContent value="stories">
              <div className="bg-white/90 rounded-xl shadow-lg border border-white/20 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">My User Stories</h2>
                    <p className="text-gray-600 text-sm">Your saved user stories and specifications</p>
                  </div>
                  {stories.length > 0 && (
                    <Badge className="bg-blue-100 text-blue-800">
                      {stories.length} Stories
                    </Badge>
                  )}
                </div>
                {stories.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">No Stories Yet</h3>
                    <p className="text-gray-500 mb-6">
                      Create your first user story using the builder or templates.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button onClick={() => setActiveTab("builder")}>
                        Start Building
                      </Button>
                      <Button variant="outline" onClick={() => setActiveTab("templates")}>
                        Browse Templates
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {stories.map((story) => (
                      <Card key={story.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex flex-col md:flex-row items-start justify-between gap-2">
                            <div className="flex-1">
                              <CardTitle className="text-base sm:text-lg text-gray-900 mb-2">
                                "{story.fullStory}"
                              </CardTitle>
                              <div className="flex flex-wrap gap-2 mb-2">
                                <Badge className={getPriorityColor(story.priority)}>
                                  {story.priority}
                                </Badge>
                                <Badge variant="outline">
                                  {story.complexity}
                                </Badge>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteStory(story.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mb-4">
                            <div className="p-2 bg-blue-50 rounded">
                              <strong className="text-blue-700">User:</strong>
                              <p className="text-blue-800 break-words">{story.userType}</p>
                            </div>
                            <div className="p-2 bg-green-50 rounded">
                              <strong className="text-green-700">Goal:</strong>
                              <p className="text-green-800 break-words">{story.goal}</p>
                            </div>
                            <div className="p-2 bg-purple-50 rounded">
                              <strong className="text-purple-700">Benefit:</strong>
                              <p className="text-purple-800 break-words">{story.benefit}</p>
                            </div>
                          </div>
                          {story.acceptanceCriteria.length > 0 && (
                            <div className="mb-4">
                              <strong className="text-sm text-gray-700">Acceptance Criteria:</strong>
                              <ul className="text-sm text-gray-600 mt-1 space-y-1">
                                {story.acceptanceCriteria.map((criteria, index) => (
                                  <li key={index} className="flex items-start">
                                    <span className="text-green-600 mr-2">•</span>
                                    <span className="break-words">{criteria}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {story.notes && (
                            <div className="mb-4 p-2 bg-yellow-50 rounded">
                              <strong className="text-sm text-yellow-700">Notes:</strong>
                              <p className="text-sm text-yellow-600 mt-1 break-words">{story.notes}</p>
                            </div>
                          )}
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span>Created: {story.createdAt.toLocaleDateString()}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserStoryGenerator;
