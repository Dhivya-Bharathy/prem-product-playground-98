
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, FileImage, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RoadmapItem } from "@/types/roadmap";
import { downloadAsImage, downloadAsWord } from "@/utils/roadmapUtils";
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

  const handleDownloadImage = () => downloadAsImage(roadmapRef, roadmapItems, toast);
  const handleDownloadWord = () => downloadAsWord(roadmapItems, toast);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Product Roadmap Planner</h1>
                <p className="text-gray-600">Plan and visualize your product roadmap with priorities</p>
              </div>
            </div>
            
            {roadmapItems.length > 0 && (
              <div className="flex gap-2">
                <Button onClick={handleDownloadImage} variant="outline" size="sm">
                  <FileImage className="w-4 h-4 mr-2" />
                  Download Image
                </Button>
                <Button onClick={handleDownloadWord} variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Download Word
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Add Item Form */}
          <RoadmapItemForm onAddItem={addRoadmapItem} />

          {/* Roadmap Timeline */}
          <div className="lg:col-span-3">
            <RoadmapTimeline roadmapItems={roadmapItems} ref={roadmapRef} />
          </div>
        </div>

        {/* Roadmap Tips */}
        <div className="mt-8">
          <RoadmapTips />
        </div>
      </div>
    </div>
  );
};

export default ProductRoadmap;
