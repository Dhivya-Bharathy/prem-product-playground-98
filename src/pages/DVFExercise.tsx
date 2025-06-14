
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, BarChart3 } from "lucide-react";
import { DVFEvaluation, DVFScore } from "@/types/dvf";
import { useToast } from "@/hooks/use-toast";
import { DVFExerciseHeader } from "@/components/dvf/DVFExerciseHeader";
import { DVFIdeaForm } from "@/components/dvf/DVFIdeaForm";
import { DVFScoringSection } from "@/components/dvf/DVFScoringSection";
import { DVFResultsSection } from "@/components/dvf/DVFResultsSection";

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
  const [evaluation, setEvaluation] = useState<DVFEvaluation | null>(null);

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

    setEvaluation(newEvaluation);
    toast({
      title: "Evaluation Complete",
      description: `Your idea scored ${totalScore}/10 with a "${newEvaluation.recommendation}" recommendation.`
    });
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setScores({ desirability: 5, viability: 5, feasibility: 5 });
    setNotes("");
    setEvaluation(null);
  };

  const handleExport = () => {
    if (!evaluation) return;
    
    const exportData = {
      ...evaluation,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dvf-evaluation-${evaluation.title.replace(/\s+/g, '-').toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Exported Successfully",
      description: "Your DVF evaluation has been downloaded."
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DVFExerciseHeader 
        onReset={handleReset}
        onExport={handleExport}
        evaluation={evaluation}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="evaluate" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="evaluate" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Evaluate Idea
              </TabsTrigger>
              <TabsTrigger value="results" className="flex items-center gap-2" disabled={!evaluation}>
                <BarChart3 className="w-4 h-4" />
                Results
              </TabsTrigger>
            </TabsList>

            <TabsContent value="evaluate" className="space-y-6 mt-6">
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
            </TabsContent>

            <TabsContent value="results" className="mt-6">
              <DVFResultsSection evaluation={evaluation} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DVFExercise;
