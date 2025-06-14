
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { ArrowLeft, Brain, Download, RefreshCw } from "lucide-react";
import { DVFScoreCard } from "@/components/dvf/DVFScoreCard";
import { DVFMatrix } from "@/components/dvf/DVFMatrix";
import { DVFEvaluation, DVFScore } from "@/types/dvf";
import { useToast } from "@/hooks/use-toast";

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
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">DVF Exercise</h1>
              <p className="text-gray-600">Evaluate your ideas using Desirability, Viability, Feasibility framework</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Idea Details
                </CardTitle>
                <CardDescription>
                  Describe your product idea or feature to evaluate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Idea Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter your idea title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your idea in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* DVF Scoring */}
            <div className="space-y-4">
              <DVFScoreCard
                dimension="desirability"
                score={scores.desirability}
                onChange={(value) => handleScoreChange('desirability', value)}
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
                onChange={(value) => handleScoreChange('viability', value)}
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
                onChange={(value) => handleScoreChange('feasibility', value)}
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

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional thoughts or considerations..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleEvaluate} className="flex-1">
                Evaluate Idea
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {evaluation ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Evaluation Results</CardTitle>
                    <CardDescription>{evaluation.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DVFMatrix evaluation={evaluation} />
                    <div className="mt-6 flex justify-between">
                      <Button variant="outline" onClick={handleExport}>
                        <Download className="w-4 h-4 mr-2" />
                        Export Results
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/tools/dvf-framework">
                          Learn More About DVF
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Brain className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Complete the evaluation to see your results</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DVFExercise;
