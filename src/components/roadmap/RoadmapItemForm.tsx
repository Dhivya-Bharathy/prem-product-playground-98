
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Roadmap Item
        </CardTitle>
        <CardDescription>
          Add new features or initiatives to your roadmap
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            placeholder="e.g., Mobile app redesign"
            value={newItem.title}
            onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
          />
        </div>

        <div>
          <Label htmlFor="quarter">Quarter *</Label>
          <Select onValueChange={(value) => setNewItem(prev => ({ ...prev, quarter: value }))}>
            <SelectTrigger>
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
          <Label htmlFor="status">Status *</Label>
          <Select onValueChange={(value) => setNewItem(prev => ({ ...prev, status: value }))}>
            <SelectTrigger>
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
          <Label htmlFor="priority">Priority *</Label>
          <Select onValueChange={(value) => setNewItem(prev => ({ ...prev, priority: value }))}>
            <SelectTrigger>
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
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            placeholder="Brief description..."
            value={newItem.description}
            onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>

        <Button onClick={handleSubmit} className="w-full">
          <GitBranch className="w-4 h-4 mr-2" />
          Add to Roadmap
        </Button>
      </CardContent>
    </Card>
  );
};

export default RoadmapItemForm;
