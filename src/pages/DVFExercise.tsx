
import { useState, useEffect } from "react";
import { Brain } from "lucide-react";
import { DVFEvaluation, DVFScore } from "@/types/dvf";
import { useToast } from "@/hooks/use-toast";
import { DVFExerciseHeader } from "@/components/dvf/DVFExerciseHeader";
import { DVFIdeaForm } from "@/components/dvf/DVFIdeaForm";
import { DVFScoringSection } from "@/components/dvf/DVFScoringSection";
import { DVFResultsSection } from "@/components/dvf/DVFResultsSection";
import { exportToExcel } from "@/utils/dvfExport";

const DVFExercise = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scores, setScores] = useState<DVFScore>({
    desirability: 5,
    viability: 5,
    feasibility: 5
  });
  const [notes, setNotes] = useState("");
  const [evaluations, setEvaluations] = useState<DVFEvaluation[]>([]);

  // Load evaluations from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('dvf-evaluations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const evaluationsWithDates = parsed.map((eval: any) => ({
          ...eval,
          createdAt: new Date(eval.createdAt),
          updatedAt: new Date(eval.updatedAt)
        }));
        setEvaluations(evaluationsWithDates);
      } catch (error) {
        console.error('Failed to load evaluations:', error);
      }
    }
  }, []);

  // Save evaluations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dvf-evaluations', JSON.stringify(evaluations));
  }, [evaluations]);

  const calculateTotalScore = (scores: DVFScore) => {
    return Math.round((scores.desirability + scores.viability + scores.feasibility) / 3 * 10) / 10;
  };

  const getRecommendation = (totalScore: number): DVFEvaluation['recommendation'] => {
    if (totalScore >= 8) return 'proceed';
    if (totalScore >= 6) return 'improve';
    if (totalScore >= 4) return 'pause';
    return 'stop';
  };

  const handleScoreChange = (dimension: keyof DVFScore, value: number) => {
    setScores(prev => ({ ...prev, [dimension]: value }));
  };

  const handleEvaluate = () => {
    if (!title.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a title for your idea.",
        variant: "destructive"
      });
      return;
    }

    const totalScore = calculateTotalScore(scores);
    const newEvaluation: DVFEvaluation = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      scores,
      totalScore,
      recommendation: getRecommendation(totalScore),
      notes: notes.trim(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setEvaluations(prev => [newEvaluation, ...prev]);
    
    // Clear form for next evaluation
    setTitle("");
    setDescription("");
    setScores({ desirability: 5, viability: 5, feasibility: 5 });
    setNotes("");

    toast({
      title: "Evaluation Complete",
      description: `"${newEvaluation.title}" scored ${totalScore}/10 with a "${newEvaluation.recommendation}" recommendation.`
    });
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setScores({ desirability: 5, viability: 5, feasibility: 5 });
    setNotes("");
    setEvaluations([]);
    localStorage.removeItem('dvf-evaluations');
  };

  const handleExport = () => {
    if (evaluations.length === 0) {
      toast({
        title: "No Data",
        description: "No evaluations to export.",
        variant: "destructive"
      });
      return;
    }
    
    exportToExcel(evaluations);
    
    toast({
      title: "Exported Successfully",
      description: "Your DVF evaluations have been downloaded as CSV."
    });
  };

  const handleDeleteEvaluation = (id: string) => {
    setEvaluations(prev => prev.filter(eval => eval.id !== id));
    toast({
      title: "Evaluation Deleted",
      description: "The evaluation has been removed."
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DVFExerciseHeader 
        onReset={handleReset}
        onExport={handleExport}
        evaluation={evaluations.length > 0 ? evaluations[0] : null}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Evaluation Form Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-2 mb-6">
              <Brain className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold">Evaluate New Idea</h2>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <DVFIdeaForm
                  title={title}
                  description={description}
                  notes={notes}
                  onTitleChange={setTitle}
                  onDescriptionChange={setDescription}
                  onNotesChange={setNotes}
                  onEvaluate={handleEvaluate}
                />
              </div>

              <div className="lg:col-span-2">
                <DVFScoringSection
                  scores={scores}
                  onScoreChange={handleScoreChange}
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <DVFResultsSection 
            evaluations={evaluations} 
            onDeleteEvaluation={handleDeleteEvaluation}
          />
        </div>
      </div>
    </div>
  );
};

export default DVFExercise;
