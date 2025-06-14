
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, FileSpreadsheet, Calendar, GitBranch } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RoadmapItem } from "@/types/roadmap";
import { downloadAsExcel } from "@/utils/roadmapUtils";
import RoadmapItemForm from "@/components/roadmap/RoadmapItemForm";
import RoadmapTimeline from "@/components/roadmap/RoadmapTimeline";
import RoadmapTips from "@/components/roadmap/RoadmapTips";

const ProductRoadmap = () => {
  const { toast } = useToast();
  const roadmapRef = useRef<HTMLDivElement>(null);
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([]);

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

  const handleDownloadExcel = () => downloadAsExcel(roadmapItems, toast);

  // Quick Stats for roadmap items
  const totalItems = roadmapItems.length;
  const highPriorityItems = roadmapItems.filter(item => item.priority === 'High').length;
  const inProgressItems = roadmapItems.filter(item => item.status === 'In Progress').length;
  const completedItems = roadmapItems.filter(item => item.status === 'Completed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-sm shadow-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild className="bg-white/80 hover:bg-white">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Product Roadmap Planner
                </h1>
                <p className="text-gray-600">Plan and visualize your product roadmap with priorities</p>
              </div>
            </div>
            
            {roadmapItems.length > 0 && (
              <Button onClick={handleDownloadExcel} variant="outline" size="sm" className="bg-white/80 hover:bg-white">
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Download Excel
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Quick Stats Bar */}
      {roadmapItems.length > 0 && (
        <div className="bg-white/50 backdrop-blur-sm border-b border-white/20">
          <div className="container mx-auto px-4 py-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Add Item Form */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
              <RoadmapItemForm onAddItem={addRoadmapItem} />
            </div>

            {/* Roadmap Timeline */}
            <div className="lg:col-span-3">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
                <RoadmapTimeline roadmapItems={roadmapItems} ref={roadmapRef} />
              </div>
            </div>
          </div>

          {/* Roadmap Tips */}
          <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
            <RoadmapTips />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRoadmap;
