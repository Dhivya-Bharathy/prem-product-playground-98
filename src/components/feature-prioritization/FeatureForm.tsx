
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface FeatureFormProps {
  newFeature: {
    name: string;
    reach: string;
    impact: string;
    confidence: string;
    effort: string;
  };
  onFeatureChange: (field: string, value: string) => void;
  onAddFeature: () => void;
}

const FeatureForm = ({ newFeature, onFeatureChange, onAddFeature }: FeatureFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Feature
        </CardTitle>
        <CardDescription>
          Enter feature details to calculate RICE score
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="featureName">Feature Name</Label>
          <Input
            id="featureName"
            placeholder="e.g., Dark mode toggle"
            value={newFeature.name}
            onChange={(e) => onFeatureChange('name', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="reach">Reach (users per time period)</Label>
          <Input
            id="reach"
            type="number"
            min="1"
            placeholder="1000"
            value={newFeature.reach}
            onChange={(e) => onFeatureChange('reach', e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">How many users will this impact in a given time period?</p>
        </div>

        <div>
          <Label htmlFor="impact">Impact</Label>
          <Select 
            value={newFeature.impact} 
            onValueChange={(value) => onFeatureChange('impact', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select impact level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3 - Massive impact</SelectItem>
              <SelectItem value="2">2 - High impact</SelectItem>
              <SelectItem value="1">1 - Medium impact</SelectItem>
              <SelectItem value="0.5">0.5 - Low impact</SelectItem>
              <SelectItem value="0.25">0.25 - Minimal impact</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-1">How much will this impact each user when they encounter it?</p>
        </div>

        <div>
          <Label htmlFor="confidence">Confidence (%)</Label>
          <Select 
            value={newFeature.confidence} 
            onValueChange={(value) => onFeatureChange('confidence', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select confidence level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="100">100% - High confidence</SelectItem>
              <SelectItem value="80">80% - Medium confidence</SelectItem>
              <SelectItem value="50">50% - Low confidence</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-1">How confident are you in your Reach and Impact estimates?</p>
        </div>

        <div>
          <Label htmlFor="effort">Effort (person-months)</Label>
          <Input
            id="effort"
            type="number"
            min="0.1"
            step="0.1"
            placeholder="2.5"
            value={newFeature.effort}
            onChange={(e) => onFeatureChange('effort', e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">How much work will this require from your team?</p>
        </div>

        <Button onClick={onAddFeature} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Calculate & Add
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureForm;
