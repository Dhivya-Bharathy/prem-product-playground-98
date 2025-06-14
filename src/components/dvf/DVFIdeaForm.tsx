
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
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Brain className="w-5 h-5" />
          Idea Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Idea Title *</Label>
          <Input
            id="title"
            placeholder="Enter your idea title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your idea..."
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            rows={3}
          />
        </div>
        <div>
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            placeholder="Any additional thoughts..."
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            rows={2}
          />
        </div>
        <Button onClick={onEvaluate} className="w-full">
          Evaluate Idea
        </Button>
      </CardContent>
    </Card>
  );
};
