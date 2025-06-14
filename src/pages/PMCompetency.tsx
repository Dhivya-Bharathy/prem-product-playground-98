
import { useState } from "react";
import { CompetencyIntro } from "@/components/competency/CompetencyIntro";
import { AssessmentForm } from "@/components/competency/AssessmentForm";
import { ShapeVisualization } from "@/components/competency/ShapeVisualization";
import { ArchetypeResults } from "@/components/competency/ArchetypeResults";
import { InsightsPanel } from "@/components/competency/InsightsPanel";
import { CompetencyRating, AssessmentResults } from "@/types/competency";
import { analyzeCompetencies } from "@/utils/competencyAnalysis";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

type Step = 'intro' | 'assessment' | 'results';

const PMCompetency = () => {
  const [currentStep, setCurrentStep] = useState<Step>('intro');
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const { toast } = useToast();

  const handleStartAssessment = () => {
    setCurrentStep('assessment');
  };

  const handleAssessmentComplete = (ratings: CompetencyRating[]) => {
    const analysisResults = analyzeCompetencies(ratings);
    setResults(analysisResults);
    setCurrentStep('results');
    
    toast({
      title: "Assessment Complete!",
      description: `You've been identified as ${analysisResults.archetype.name}. Explore your detailed results below.`
    });
  };

  const handleBackToIntro = () => {
    setCurrentStep('intro');
  };

  const handleReset = () => {
    setResults(null);
    setCurrentStep('intro');
  };

  const handleExport = () => {
    if (!results) return;

    const exportData = {
      archetype: results.archetype.name,
      shapePattern: results.shapePattern.description,
      competencyScores: results.shape,
      topStrengths: results.topStrengths,
      developmentAreas: results.developmentAreas,
      recommendations: results.recommendations,
      completedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pm-competency-assessment-results.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Results Exported",
      description: "Your competency assessment results have been downloaded."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link to="/">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Tools
            </Link>
          </Button>
        </div>

        {currentStep === 'intro' && (
          <CompetencyIntro onStart={handleStartAssessment} />
        )}

        {currentStep === 'assessment' && (
          <AssessmentForm 
            onComplete={handleAssessmentComplete}
            onBack={handleBackToIntro}
          />
        )}

        {currentStep === 'results' && results && (
          <div className="space-y-8">
            <ArchetypeResults 
              archetype={results.archetype}
              shapePattern={results.shapePattern}
            />
            
            <ShapeVisualization shape={results.shape} />
            
            <InsightsPanel 
              results={results}
              onExport={handleExport}
              onReset={handleReset}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PMCompetency;
