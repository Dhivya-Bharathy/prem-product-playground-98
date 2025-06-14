
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

interface DVFIdeaFormProps {
  title: string;
  description: string;
  notes: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  onEvaluate: () => void;
}

export const DVFIdeaForm = ({
  title,
  description,
  notes,
  onTitleChange,
  onDescriptionChange,
  onNotesChange,
  onEvaluate
}: DVFIdeaFormProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Idea Details</h3>
      </div>
      
      <div className="space-y-3">
        <div>
          <Label htmlFor="title" className="text-sm font-medium">Idea Title *</Label>
          <Input
            id="title"
            placeholder="Enter your idea title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="description" className="text-sm font-medium">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your idea..."
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            rows={2}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="notes" className="text-sm font-medium">Notes</Label>
          <Textarea
            id="notes"
            placeholder="Additional thoughts..."
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            rows={2}
            className="mt-1"
          />
        </div>
        
        <Button onClick={onEvaluate} className="w-full">
          Evaluate Idea
        </Button>
      </div>
    </div>
  );
};
