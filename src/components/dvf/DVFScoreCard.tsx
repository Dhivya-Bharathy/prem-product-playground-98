
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface DVFScoreCardProps {
  dimension: 'desirability' | 'viability' | 'feasibility';
  score: number;
  onChange: (value: number) => void;
  title: string;
  description: string;
  factors: string[];
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
  factors 
}: DVFScoreCardProps) => {
  const color = getDimensionColor(dimension);
  const scoreLabel = getScoreLabel(score);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge className={scoreLabel.color} variant="secondary">
            {scoreLabel.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <Label>Score: {score}/10</Label>
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
        
        <div>
          <Label className="text-sm font-medium mb-2 block">Key Factors to Consider:</Label>
          <ul className="text-sm text-gray-600 space-y-1">
            {factors.map((factor, index) => (
              <li key={index}>• {factor}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
