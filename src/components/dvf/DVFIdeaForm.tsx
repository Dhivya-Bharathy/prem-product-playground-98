
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb } from "lucide-react";

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
  onNotesChange
}: DVFIdeaFormProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-900">Idea Details</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-sm font-medium text-gray-700 mb-2 block">
            Idea Title *
          </Label>
          <Input
            id="title"
            placeholder="Enter your brilliant idea..."
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <Label htmlFor="description" className="text-sm font-medium text-gray-700 mb-2 block">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Describe what your idea is about..."
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            rows={3}
            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
          />
        </div>
        
        <div>
          <Label htmlFor="notes" className="text-sm font-medium text-gray-700 mb-2 block">
            Additional Notes
          </Label>
          <Textarea
            id="notes"
            placeholder="Any additional thoughts or considerations..."
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            rows={2}
            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
          />
        </div>
      </div>
    </div>
  );
};
