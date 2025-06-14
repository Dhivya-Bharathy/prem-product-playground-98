import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Info } from "lucide-react";
import { useState } from "react";

interface DVFScoreCardProps {
  dimension: 'desirability' | 'viability' | 'feasibility';
  score: number;
  onChange: (value: number) => void;
  title: string;
  description: string;
  factors: string[];
  compact?: boolean;
}

const getDimensionColor = (dimension: string) => {
  switch (dimension) {
    case 'desirability': return 'blue';
    case 'viability': return 'green';
    case 'feasibility': return 'purple';
    default: return 'gray';
  }
};

const getScoreLabel = (score: number) => {
  if (score >= 9) return { label: 'Excellent', color: 'bg-green-100 text-green-800' };
  if (score >= 7) return { label: 'Good', color: 'bg-blue-100 text-blue-800' };
  if (score >= 5) return { label: 'Average', color: 'bg-yellow-100 text-yellow-800' };
  if (score >= 3) return { label: 'Poor', color: 'bg-orange-100 text-orange-800' };
  return { label: 'Very Poor', color: 'bg-red-100 text-red-800' };
};

export const DVFScoreCard = ({ 
  dimension, 
  score, 
  onChange, 
  title, 
  description, 
  factors,
  compact = false
}: DVFScoreCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const color = getDimensionColor(dimension);
  const scoreLabel = getScoreLabel(score);

  if (compact) {
    return (
      <div className="p-4 bg-gray-50/50 rounded-lg border border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-gray-900">{title}</h4>
              <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger asChild>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Info className="w-4 h-4" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-2 p-2 bg-white rounded text-xs text-gray-600">
                    <p className="mb-2">{description}</p>
                    <ul className="space-y-1">
                      {factors.map((factor, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={scoreLabel.color} variant="secondary">
              {score}/10
            </Badge>
          </div>
        </div>
        
        <Slider
          value={[score]}
          onValueChange={(values) => onChange(values[0])}
          max={10}
          min={1}
          step={0.5}
          className="w-full"
        />
      </div>
    );
  }

  return (
    <div className="hover:shadow-md transition-shadow bg-white rounded-lg border p-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h4 className="text-lg font-semibold">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <Badge className={scoreLabel.color} variant="secondary">
          {scoreLabel.label}
        </Badge>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-medium">Score: {score}/10</Label>
        </div>
        <Slider
          value={[score]}
          onValueChange={(values) => onChange(values[0])}
          max={10}
          min={1}
          step={0.5}
          className="w-full"
        />
      </div>
      
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <div className="mt-4 cursor-pointer">
            <div className="flex items-center justify-between text-sm text-gray-600 hover:text-gray-800">
              <span>Key Factors to Consider</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-3">
            <ul className="text-sm text-gray-600 space-y-1">
              {factors.map((factor, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
