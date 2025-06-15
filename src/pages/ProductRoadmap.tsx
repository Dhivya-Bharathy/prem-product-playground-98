import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  FileSpreadsheet,
  Calendar,
  GitBranch,
  Users,
  Download,
  Trash2,
  BookOpen,
  ClipboardList,
  LayoutTemplate,
  BarChart3,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RoadmapItem } from "@/types/roadmap";
import { downloadAsExcel } from "@/utils/roadmapUtils";
import RoadmapItemForm from "@/components/roadmap/RoadmapItemForm";
import RoadmapTimeline from "@/components/roadmap/RoadmapTimeline";
import RoadmapTips from "@/components/roadmap/RoadmapTips";
import { RoadmapGuide } from "@/components/roadmap/RoadmapGuide";
import { RoadmapTemplates, RoadmapTemplate } from "@/components/roadmap/RoadmapTemplates";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const ROADMAP_TABS = [
  { value: "guide", label: "Framework Guide", Icon: BookOpen },
  { value: "builder", label: "Roadmap Builder", Icon: ClipboardList },
  { value: "templates", label: "Templates", Icon: LayoutTemplate },
  { value: "roadmap", label: "My Roadmap", Icon: BarChart3 },
];

const ProductRoadmap = () => {
  const { toast } = useToast();
  const roadmapRef = useRef<HTMLDivElement>(null);
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([]);
  const [activeTab, setActiveTab] = useState("guide");
  const [templateToUse, setTemplateToUse] = useState<RoadmapTemplate | null>(null);

  // Load roadmap items from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('roadmap-items');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setRoadmapItems(parsed);
      } catch (error) {
        console.error('Failed to load roadmap items:', error);
      }
    }
  }, []);

  // Save roadmap items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('roadmap-items', JSON.stringify(roadmapItems));
  }, [roadmapItems]);

  const addRoadmapItem = (newItem: Omit<RoadmapItem, 'id'>) => {
    if (!newItem.title || !newItem.quarter || !newItem.status || !newItem.priority) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const item: RoadmapItem = {
      id: Date.now().toString(),
      ...newItem
    };

    setRoadmapItems(prev => [...prev, item]);

    toast({
      title: "Item Added",
      description: `${item.title} has been added to the roadmap.`
    });
  };

  const handleUseTemplate = (template: RoadmapTemplate) => {
    const templateItems = template.items.map((item, index) => ({
      id: `${Date.now()}-${index}`,
      ...item
    }));

    setRoadmapItems(prev => [...templateItems, ...prev]);
    setActiveTab("roadmap");

    toast({
      title: "Template Applied",
      description: `${template.name} template has been added to your roadmap.`
    });
  };

  const handleDownloadExcel = () => downloadAsExcel(roadmapItems, toast);

  const handleExportAll = () => {
    if (roadmapItems.length === 0) {
      toast({
        title: "No Data",
        description: "No roadmap items to export.",
        variant: "destructive"
      });
      return;
    }

    const exportData = {
      roadmapItems,
      exportDate: new Date().toISOString(),
      totalCount: roadmapItems.length
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `product-roadmap-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `${roadmapItems.length} items exported successfully.`
    });
  };

  const handleClearAll = () => {
    setRoadmapItems([]);
    localStorage.removeItem('roadmap-items');
    toast({
      title: "All Cleared",
      description: "All roadmap items have been removed."
    });
  };

  // Quick Stats for roadmap items
  const totalItems = roadmapItems.length;
  const highPriorityItems = roadmapItems.filter(item => item.priority === 'High').length;
  const inProgressItems = roadmapItems.filter(item => item.status === 'In Progress').length;
  const completedItems = roadmapItems.filter(item => item.status === 'Completed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-sm shadow-sm border-b border-white/20">
        <div className="container mx-auto px-1 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row items-start sm:items-center justify-between">
            <div className="flex items-center gap-4 w-full">
              <Button variant="ghost" size="sm" asChild className="px-2">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  <span className="hidden xs:inline">Back to Tools</span>
                </Link>
              </Button>
              <div className="flex flex-col">
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Product Roadmap Planner
                </h1>
                <p className="text-gray-600 mt-0.5 text-xs sm:text-base">
                  Strategic planning and visualization for product development
                </p>
              </div>
            </div>
            {roadmapItems.length > 0 && (
              // Horizontal scroll wrap for actions on mobile
              <div className="w-full sm:w-auto mt-2 sm:mt-0">
                <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1 px-0.5 sm:p-0">
                  <Badge variant="secondary" className="px-3 py-1 flex-shrink-0">
                    <Users className="w-4 h-4 mr-1" />
                    <span className="hidden xs:inline">{roadmapItems.length} Items</span>
                    <span className="inline xs:hidden">{roadmapItems.length}</span>
                  </Badge>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm" variant="outline" onClick={handleDownloadExcel} className="bg-white/80 hover:bg-white flex-shrink-0 px-2 sm:px-4">
                        <FileSpreadsheet className="w-4 h-4" />
                        <span className="hidden sm:inline ml-2">Excel</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Download as Excel</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm" variant="outline" onClick={handleExportAll} className="bg-white/80 hover:bg-white flex-shrink-0 px-2 sm:px-4">
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline ml-2">Export All</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Export All (JSON)</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm" variant="outline" onClick={handleClearAll} className="bg-white/80 hover:bg-white flex-shrink-0 px-2 sm:px-4">
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline ml-2">Clear All</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Remove all roadmap items</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Quick Stats Bar */}
      {roadmapItems.length > 0 && (
        <div className="bg-white/50 backdrop-blur-sm border-b border-white/20">
          <div className="container mx-auto px-1 sm:px-4 py-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                    <GitBranch className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{totalItems}</div>
                    <div className="text-xs text-gray-600">Total Items</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                  <div className="p-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{highPriorityItems}</div>
                    <div className="text-xs text-gray-600">High Priority</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{inProgressItems}</div>
                    <div className="text-xs text-gray-600">In Progress</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{completedItems}</div>
                    <div className="text-xs text-gray-600">Completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-1 sm:px-4 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Mobile-friendly horizontally scrollable tabs with icons */}
          <div className="overflow-x-auto hide-scrollbar mb-4 -mx-2 sm:mx-0 px-1 sm:px-0">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList
                className="flex w-full min-w-[320px] gap-1 sm:gap-0 border rounded-lg bg-slate-100 flex-nowrap"
                style={{ minWidth: 260 }}
              >
                {ROADMAP_TABS.map(({ value, label, Icon }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="flex-1 min-w-[62px] sm:min-w-[150px] flex flex-col items-center justify-center py-2 px-1 text-xs sm:text-sm focus-visible:outline-none"
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center justify-center">
                          <Icon className="w-5 h-5 sm:mr-2 text-blue-600" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">{label}</TooltipContent>
                    </Tooltip>
                    <span className="hidden sm:block mt-1">{label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Tab contents */}
              <TabsContent value="guide">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4 sm:p-6">
                  <RoadmapGuide />
                </div>
              </TabsContent>
              <TabsContent value="builder">
                <div className="grid lg:grid-cols-4 gap-8">
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
                    <RoadmapItemForm onAddItem={addRoadmapItem} />
                  </div>
                  <div className="lg:col-span-3">
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
                      <RoadmapTimeline roadmapItems={roadmapItems} ref={roadmapRef} />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="templates">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4 sm:p-6">
                  <RoadmapTemplates onUseTemplate={handleUseTemplate} />
                </div>
              </TabsContent>
              <TabsContent value="roadmap">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
                  <RoadmapTimeline roadmapItems={roadmapItems} ref={roadmapRef} />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Roadmap Tips */}
          {activeTab === "guide" && (
            <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4 sm:p-6">
              <RoadmapTips />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductRoadmap;
