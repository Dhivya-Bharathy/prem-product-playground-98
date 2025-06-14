
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
    reach: "",
    impact: "",
    confidence: "",
    effort: ""
  });

  const calculateRICE = (reach: number, impact: number, confidence: number, effort: number) => {
    if (effort === 0) return 0;
    const confidenceDecimal = confidence / 100;
    return (reach * impact * confidenceDecimal) / effort;
  };

  const getPriorityLevel = (score: number) => {
    if (score >= 10) return "High";
    if (score >= 5) return "Medium";
    return "Low";
  };

  const resetForm = () => {
    setNewFeature({
      name: "",
      reach: "",
      impact: "",
      confidence: "",
      effort: ""
    });
  };

  const addFeature = () => {
    console.log("Adding feature with data:", newFeature);

    // Validate name
    if (!newFeature.name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a feature name.",
        variant: "destructive"
      });
      return;
    }

    // Convert strings to numbers and validate
    const reach = parseFloat(newFeature.reach);
    const impact = parseFloat(newFeature.impact);
    const confidence = parseFloat(newFeature.confidence);
    const effort = parseFloat(newFeature.effort);

    console.log("Parsed values:", { reach, impact, confidence, effort });

    if (isNaN(reach) || reach <= 0) {
      toast({
        title: "Invalid Reach",
        description: "Please enter a valid reach value greater than 0.",
        variant: "destructive"
      });
      return;
    }

    if (isNaN(impact) || impact <= 0) {
      toast({
        title: "Invalid Impact",
        description: "Please select an impact level.",
        variant: "destructive"
      });
      return;
    }

    if (isNaN(confidence) || confidence <= 0) {
      toast({
        title: "Invalid Confidence",
        description: "Please select a confidence level.",
        variant: "destructive"
      });
      return;
    }

    if (isNaN(effort) || effort <= 0) {
      toast({
        title: "Invalid Effort",
        description: "Please enter a valid effort value greater than 0.",
        variant: "destructive"
      });
      return;
    }

    const riceScore = calculateRICE(reach, impact, confidence, effort);
    console.log("Calculated RICE score:", riceScore);

    const feature: Feature = {
      id: Date.now().toString(),
      name: newFeature.name.trim(),
      reach: reach,
      impact: impact,
      confidence: confidence,
      effort: effort,
      riceScore: Number(riceScore.toFixed(2)),
      priority: getPriorityLevel(riceScore)
    };

    console.log("Created feature:", feature);

    setFeatures(prev => {
      const updated = [...prev, feature];
      const sorted = updated.sort((a, b) => b.riceScore - a.riceScore);
      console.log("Updated features list:", sorted);
      return sorted;
    });
    
    resetForm();

    toast({
      title: "Feature Added Successfully",
      description: `${feature.name} has been added with a RICE score of ${riceScore.toFixed(2)}.`
    });
  };

  const removeFeature = (id: string) => {
    setFeatures(prev => prev.filter(f => f.id !== id));
    toast({
      title: "Feature Removed",
      description: "Feature has been removed from the list."
    });
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
                <Label htmlFor="reach">Reach (users per time period)</Label>
                <Input
                  id="reach"
                  type="number"
                  min="1"
                  placeholder="1000"
                  value={newFeature.reach}
                  onChange={(e) => setNewFeature(prev => ({ ...prev, reach: e.target.value }))}
                />
                <p className="text-xs text-gray-500 mt-1">How many users will this impact in a given time period?</p>
              </div>

              <div>
                <Label htmlFor="impact">Impact</Label>
                <Select 
                  value={newFeature.impact} 
                  onValueChange={(value) => setNewFeature(prev => ({ ...prev, impact: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select impact level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 - Massive impact</SelectItem>
                    <SelectItem value="2">2 - High impact</SelectItem>
                    <SelectItem value="1">1 - Medium impact</SelectItem>
                    <SelectItem value="0.5">0.5 - Low impact</SelectItem>
                    <SelectItem value="0.25">0.25 - Minimal impact</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">How much will this impact each user when they encounter it?</p>
              </div>

              <div>
                <Label htmlFor="confidence">Confidence (%)</Label>
                <Select 
                  value={newFeature.confidence} 
                  onValueChange={(value) => setNewFeature(prev => ({ ...prev, confidence: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select confidence level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">100% - High confidence</SelectItem>
                    <SelectItem value="80">80% - Medium confidence</SelectItem>
                    <SelectItem value="50">50% - Low confidence</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">How confident are you in your Reach and Impact estimates?</p>
              </div>

              <div>
                <Label htmlFor="effort">Effort (person-months)</Label>
                <Input
                  id="effort"
                  type="number"
                  min="0.1"
                  step="0.1"
                  placeholder="2.5"
                  value={newFeature.effort}
                  onChange={(e) => setNewFeature(prev => ({ ...prev, effort: e.target.value }))}
                />
                <p className="text-xs text-gray-500 mt-1">How much work will this require from your team?</p>
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
                Understanding the RICE scoring methodology
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-blue-600">Reach</h4>
                <p className="text-sm text-gray-600">How many people will this feature reach within a time period? Example: 2,000 customers per quarter.</p>
              </div>
              <div>
                <h4 className="font-semibold text-green-600">Impact</h4>
                <p className="text-sm text-gray-600">How much will this feature impact each person when they encounter it?</p>
                <ul className="text-xs text-gray-500 mt-1 ml-4">
                  <li>• 3 = Massive impact</li>
                  <li>• 2 = High impact</li>
                  <li>• 1 = Medium impact</li>
                  <li>• 0.5 = Low impact</li>
                  <li>• 0.25 = Minimal impact</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-600">Confidence</h4>
                <p className="text-sm text-gray-600">How confident are you about your Reach and Impact estimates?</p>
                <ul className="text-xs text-gray-500 mt-1 ml-4">
                  <li>• 100% = High confidence</li>
                  <li>• 80% = Medium confidence</li>
                  <li>• 50% = Low confidence</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600">Effort</h4>
                <p className="text-sm text-gray-600">How much work will this require from your team? Estimate in person-months.</p>
              </div>
              <div className="pt-4 border-t">
                <h4 className="font-semibold">Formula</h4>
                <p className="text-sm text-gray-600">RICE Score = (Reach × Impact × Confidence%) ÷ Effort</p>
                <p className="text-xs text-gray-500 mt-1">Higher score = Higher priority</p>
              </div>
            </CardContent>
          </Card>

          {/* Features List */}
          <Card>
            <CardHeader>
              <CardTitle>Prioritized Features</CardTitle>
              <CardDescription>
                Features ranked by RICE score ({features.length} feature{features.length !== 1 ? 's' : ''})
              </CardDescription>
            </CardHeader>
            <CardContent>
              {features.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Add features to see them prioritized here</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {features.map((feature, index) => (
                    <div key={feature.id} className="p-4 border rounded-lg bg-white shadow-sm">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">#{index + 1}</Badge>
                          <h4 className="font-semibold text-sm">{feature.name}</h4>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFeature(feature.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs mb-3 text-gray-600">
                        <div>Reach: {feature.reach.toLocaleString()}</div>
                        <div>Impact: {feature.impact}</div>
                        <div>Confidence: {feature.confidence}%</div>
                        <div>Effort: {feature.effort} months</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant={feature.priority === "High" ? "default" : feature.priority === "Medium" ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {feature.priority} Priority
                        </Badge>
                        <div className="text-lg font-bold text-blue-600">
                          {feature.riceScore}
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
