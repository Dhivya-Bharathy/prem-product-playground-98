
import { useState } from "react";
import { CompetencyIntro } from "@/components/competency/CompetencyIntro";
import { AssessmentForm } from "@/components/competency/AssessmentForm";
import { ShapeVisualization } from "@/components/competency/ShapeVisualization";
import { ArchetypeResults } from "@/components/competency/ArchetypeResults";
import { InsightsPanel } from "@/components/competency/InsightsPanel";
import { CompetencyRating, AssessmentResults } from "@/types/competency";
import { analyzeCompetencies } from "@/utils/competency";
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
      title: "Assessment Complete! 🎉",
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

  // This function is now handled within InsightsPanel component
  const handleExport = () => {
    // Legacy function - now handled by InsightsPanel
    console.log('Export handled by InsightsPanel component');
  };

  return (
    <div className="min-h-screen">
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <div className="container mx-auto px-6 py-8">
            <div className="mb-8">
              <Button variant="outline" size="sm" asChild className="rounded-xl">
                <Link to="/">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back to Tools
                </Link>
              </Button>
            </div>

            <div className="space-y-12">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default PMCompetency;
