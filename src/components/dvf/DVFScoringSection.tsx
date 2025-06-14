
import { DVFScoreCard } from "./DVFScoreCard";
import { DVFScore } from "@/types/dvf";
import { Target } from "lucide-react";

interface DVFScoringSectionProps {
  scores: DVFScore;
  onScoreChange: (dimension: keyof DVFScore, value: number) => void;
}

export const DVFScoringSection = ({ scores, onScoreChange }: DVFScoringSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900">Score Your Idea</h3>
      </div>
      
      <div className="space-y-4">
        <DVFScoreCard
          dimension="desirability"
          score={scores.desirability}
          onChange={(value) => onScoreChange('desirability', value)}
          title="Desirability"
          description="How much do users want this?"
          factors={[
            "User demand and interest",
            "Problem-solution fit",
            "User experience quality",
            "Emotional appeal"
          ]}
          compact={true}
        />
        
        <DVFScoreCard
          dimension="viability"
          score={scores.viability}
          onChange={(value) => onScoreChange('viability', value)}
          title="Viability"
          description="Can this be a sustainable business?"
          factors={[
            "Revenue potential",
            "Business model clarity",
            "Market size and growth",
            "Competitive advantage"
          ]}
          compact={true}
        />
        
        <DVFScoreCard
          dimension="feasibility"
          score={scores.feasibility}
          onChange={(value) => onScoreChange('feasibility', value)}
          title="Feasibility"
          description="Can we actually build this?"
          factors={[
            "Technical complexity",
            "Resource availability",
            "Timeline realistic",
            "Risk assessment"
          ]}
          compact={true}
        />
      </div>
    </div>
  );
};
