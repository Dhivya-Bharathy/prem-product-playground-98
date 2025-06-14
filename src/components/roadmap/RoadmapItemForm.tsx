
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, GitBranch } from "lucide-react";
import { RoadmapItem, QUARTERS, STATUSES, PRIORITIES } from "@/types/roadmap";

interface RoadmapItemFormProps {
  onAddItem: (item: Omit<RoadmapItem, 'id'>) => void;
}

const RoadmapItemForm = ({ onAddItem }: RoadmapItemFormProps) => {
  const [newItem, setNewItem] = useState({
    title: "",
    quarter: "",
    status: "",
    priority: "",
    description: ""
  });

  const handleSubmit = () => {
    if (!newItem.title || !newItem.quarter || !newItem.status || !newItem.priority) {
      return;
    }

    onAddItem(newItem);
    setNewItem({ title: "", quarter: "", status: "", priority: "", description: "" });
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
            <Plus className="w-5 h-5 text-white" />
          </div>
          Add Roadmap Item
        </CardTitle>
        <CardDescription>
          Add new features or initiatives to your roadmap
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-sm font-medium text-gray-700 mb-2 block">
            Title *
          </Label>
          <Input
            id="title"
            placeholder="e.g., Mobile app redesign"
            value={newItem.title}
            onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <Label htmlFor="quarter" className="text-sm font-medium text-gray-700 mb-2 block">
            Quarter *
          </Label>
          <Select value={newItem.quarter} onValueChange={(value) => setNewItem(prev => ({ ...prev, quarter: value }))}>
            <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Select quarter" />
            </SelectTrigger>
            <SelectContent>
              {QUARTERS.map(quarter => (
                <SelectItem key={quarter} value={quarter}>{quarter}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="status" className="text-sm font-medium text-gray-700 mb-2 block">
            Status *
          </Label>
          <Select value={newItem.status} onValueChange={(value) => setNewItem(prev => ({ ...prev, status: value }))}>
            <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="priority" className="text-sm font-medium text-gray-700 mb-2 block">
            Priority *
          </Label>
          <Select value={newItem.priority} onValueChange={(value) => setNewItem(prev => ({ ...prev, priority: value }))}>
            <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              {PRIORITIES.map(priority => (
                <SelectItem key={priority} value={priority}>{priority}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="description" className="text-sm font-medium text-gray-700 mb-2 block">
            Description
          </Label>
          <Input
            id="description"
            placeholder="Brief description..."
            value={newItem.description}
            onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <Button 
          onClick={handleSubmit} 
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          <GitBranch className="w-4 h-4 mr-2" />
          Add to Roadmap
        </Button>
      </CardContent>
    </>
  );
};

export default RoadmapItemForm;
