import { useState, useEffect } from "react";
import { Brain, TrendingUp, Target, Zap } from "lucide-react";
import { DVFEvaluation, DVFScore } from "@/types/dvf";
import { useToast } from "@/hooks/use-toast";
import { DVFExerciseHeader } from "@/components/dvf/DVFExerciseHeader";
import { DVFIdeaForm } from "@/components/dvf/DVFIdeaForm";
import { DVFScoringSection } from "@/components/dvf/DVFScoringSection";
import { DVFResultsSection } from "@/components/dvf/DVFResultsSection";
import { DVFLiveScore } from "@/components/dvf/DVFLiveScore";
import { DVFQuickStats } from "@/components/dvf/DVFQuickStats";
import { DVFGuide } from "@/components/dvf/DVFGuide";
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
        const evaluationsWithDates = parsed.map((evaluation: any) => ({
          ...evaluation,
          createdAt: new Date(evaluation.createdAt),
          updatedAt: new Date(evaluation.updatedAt)
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
    setEvaluations(prev => prev.filter(evaluation => evaluation.id !== id));
    toast({
      title: "Evaluation Deleted",
      description: "The evaluation has been removed."
    });
  };

  const currentTotalScore = calculateTotalScore(scores);
  const currentRecommendation = getRecommendation(currentTotalScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <DVFExerciseHeader 
        onReset={handleReset}
        onExport={handleExport}
        evaluation={evaluations.length > 0 ? evaluations[0] : null}
      />

      {/* Quick Stats Bar */}
      {evaluations.length > 0 && (
        <DVFQuickStats evaluations={evaluations} />
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Dashboard Layout */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left Panel - Form & Scoring */}
            <div className="lg:col-span-8 space-y-6">
              {/* Current Evaluation Card */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      Evaluate New Idea
                    </h2>
                    <p className="text-sm text-gray-600">Score your idea across the three key dimensions</p>
                  </div>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-6">
                  <DVFIdeaForm
                    title={title}
                    description={description}
                    notes={notes}
                    onTitleChange={setTitle}
                    onDescriptionChange={setDescription}
                    onNotesChange={setNotes}
                    onEvaluate={handleEvaluate}
                  />
                  
                  <DVFScoringSection
                    scores={scores}
                    onScoreChange={handleScoreChange}
                  />
                </div>
              </div>

              {/* Results Section */}
              <DVFResultsSection 
                evaluations={evaluations} 
                onDeleteEvaluation={handleDeleteEvaluation}
              />
            </div>

            {/* Right Panel - Live Score & Quick Actions */}
            <div className="lg:col-span-4">
              <div className="sticky top-6 space-y-6">
                <DVFLiveScore
                  scores={scores}
                  totalScore={currentTotalScore}
                  recommendation={currentRecommendation}
                  hasTitle={title.trim().length > 0}
                  onEvaluate={handleEvaluate}
                />
                
                {/* Recent Evaluations Preview */}
                {evaluations.length > 0 && (
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Recent Evaluations</h3>
                    <div className="space-y-3">
                      {evaluations.slice(0, 3).map((evaluation) => (
                        <div key={evaluation.id} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{evaluation.title}</p>
                            <p className="text-xs text-gray-500">Score: {evaluation.totalScore}/10</p>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            evaluation.recommendation === 'proceed' ? 'bg-green-100 text-green-800' :
                            evaluation.recommendation === 'improve' ? 'bg-yellow-100 text-yellow-800' :
                            evaluation.recommendation === 'pause' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {evaluation.recommendation}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* DVF Framework Guide Section */}
          <div className="mt-12 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
            <DVFGuide />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DVFExercise;
