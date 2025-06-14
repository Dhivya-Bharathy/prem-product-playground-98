
import { DVFScoreCard } from "./DVFScoreCard";
import { DVFScore } from "@/types/dvf";

interface DVFScoringSectionProps {
  scores: DVFScore;
  onScoreChange: (dimension: keyof DVFScore, value: number) => void;
}

export const DVFScoringSection = ({ scores, onScoreChange }: DVFScoringSectionProps) => {
  return (
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
      />
    </div>
  );
};
