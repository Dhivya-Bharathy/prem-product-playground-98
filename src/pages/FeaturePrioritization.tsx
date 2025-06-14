
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Target, BarChart3, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Feature {
  id: string;
  name: string;
  reach: number;
  impact: number;
  confidence: number;
  effort: number;
  riceScore: number;
  priority: string;
}

const FeaturePrioritization = () => {
  const { toast } = useToast();
  const [features, setFeatures] = useState<Feature[]>([]);
  const [newFeature, setNewFeature] = useState({
    name: "",
    reach: 0,
    impact: 0,
    confidence: 0,
    effort: 0
  });

  const calculateRICE = (reach: number, impact: number, confidence: number, effort: number) => {
    if (effort === 0) return 0;
    return (reach * impact * confidence) / effort;
  };

  const getPriorityLevel = (score: number) => {
    if (score >= 100) return "High";
    if (score >= 50) return "Medium";
    return "Low";
  };

  const addFeature = () => {
    if (!newFeature.name) {
      toast({
        title: "Missing Information",
        description: "Please enter a feature name.",
        variant: "destructive"
      });
      return;
    }

    const riceScore = calculateRICE(
      newFeature.reach,
      newFeature.impact,
      newFeature.confidence,
      newFeature.effort
    );

    const feature: Feature = {
      id: Date.now().toString(),
      name: newFeature.name,
      reach: newFeature.reach,
      impact: newFeature.impact,
      confidence: newFeature.confidence,
      effort: newFeature.effort,
      riceScore,
      priority: getPriorityLevel(riceScore)
    };

    setFeatures(prev => [...prev, feature].sort((a, b) => b.riceScore - a.riceScore));
    setNewFeature({ name: "", reach: 0, impact: 0, confidence: 0, effort: 0 });

    toast({
      title: "Feature Added",
      description: `${feature.name} has been added with a RICE score of ${riceScore.toFixed(1)}.`
    });
  };

  const removeFeature = (id: string) => {
    setFeatures(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
              <h1 className="text-2xl font-bold text-gray-900">Feature Prioritization Matrix</h1>
              <p className="text-gray-600">Prioritize features using the RICE framework</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add Feature Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Feature
              </CardTitle>
              <CardDescription>
                Enter feature details to calculate RICE score
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="featureName">Feature Name</Label>
                <Input
                  id="featureName"
                  placeholder="e.g., Dark mode toggle"
                  value={newFeature.name}
                  onChange={(e) => setNewFeature(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="reach">Reach (users affected per month)</Label>
                <Input
                  id="reach"
                  type="number"
                  placeholder="1000"
                  value={newFeature.reach || ""}
                  onChange={(e) => setNewFeature(prev => ({ ...prev, reach: Number(e.target.value) }))}
                />
              </div>

              <div>
                <Label htmlFor="impact">Impact (1-3 scale)</Label>
                <Select onValueChange={(value) => setNewFeature(prev => ({ ...prev, impact: Number(value) }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select impact" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Minimal</SelectItem>
                    <SelectItem value="2">2 - Moderate</SelectItem>
                    <SelectItem value="3">3 - High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="confidence">Confidence (% as decimal)</Label>
                <Select onValueChange={(value) => setNewFeature(prev => ({ ...prev, confidence: Number(value) }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select confidence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5">50% - Low confidence</SelectItem>
                    <SelectItem value="0.8">80% - Medium confidence</SelectItem>
                    <SelectItem value="1.0">100% - High confidence</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="effort">Effort (person-months)</Label>
                <Input
                  id="effort"
                  type="number"
                  step="0.5"
                  placeholder="2"
                  value={newFeature.effort || ""}
                  onChange={(e) => setNewFeature(prev => ({ ...prev, effort: Number(e.target.value) }))}
                />
              </div>

              <Button onClick={addFeature} className="w-full">
                <Target className="w-4 h-4 mr-2" />
                Calculate & Add
              </Button>
            </CardContent>
          </Card>

          {/* RICE Explanation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                RICE Framework
              </CardTitle>
              <CardDescription>
                Understanding the RICE scoring model
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-blue-600">Reach</h4>
                <p className="text-sm text-gray-600">How many users will be affected by this feature per time period?</p>
              </div>
              <div>
                <h4 className="font-semibold text-green-600">Impact</h4>
                <p className="text-sm text-gray-600">How much will this impact each user? (1=minimal, 2=moderate, 3=high)</p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-600">Confidence</h4>
                <p className="text-sm text-gray-600">How confident are you in your estimates? (0.5-1.0)</p>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600">Effort</h4>
                <p className="text-sm text-gray-600">How much work will this require? (person-months)</p>
              </div>
              <div className="pt-4 border-t">
                <h4 className="font-semibold">Formula</h4>
                <p className="text-sm text-gray-600">RICE Score = (Reach × Impact × Confidence) ÷ Effort</p>
              </div>
            </CardContent>
          </Card>

          {/* Features List */}
          <Card>
            <CardHeader>
              <CardTitle>Prioritized Features</CardTitle>
              <CardDescription>
                Features ranked by RICE score
              </CardDescription>
            </CardHeader>
            <CardContent>
              {features.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Add features to see them prioritized here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={feature.id} className="p-4 border rounded-lg bg-white">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">#{index + 1}</Badge>
                          <h4 className="font-semibold">{feature.name}</h4>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFeature(feature.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        <div>Reach: {feature.reach}</div>
                        <div>Impact: {feature.impact}</div>
                        <div>Confidence: {(feature.confidence * 100).toFixed(0)}%</div>
                        <div>Effort: {feature.effort}m</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant={feature.priority === "High" ? "default" : feature.priority === "Medium" ? "secondary" : "outline"}
                        >
                          {feature.priority} Priority
                        </Badge>
                        <div className="text-lg font-bold text-blue-600">
                          {feature.riceScore.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FeaturePrioritization;
