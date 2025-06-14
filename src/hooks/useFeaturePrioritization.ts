
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Feature } from "@/types/feature";
import { calculateRICE, getPriorityLevel } from "@/utils/featurePrioritizationUtils";

export const useFeaturePrioritization = () => {
  const { toast } = useToast();
  const [features, setFeatures] = useState<Feature[]>([]);
  const [newFeature, setNewFeature] = useState({
    name: "",
    reach: "",
    impact: "",
    confidence: "",
    effort: ""
  });

  const resetForm = () => {
    setNewFeature({
      name: "",
      reach: "",
      impact: "",
      confidence: "",
      effort: ""
    });
  };

  const updateFeatureField = (field: string, value: string) => {
    setNewFeature(prev => ({ ...prev, [field]: value }));
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

  return {
    features,
    newFeature,
    updateFeatureField,
    addFeature,
    removeFeature
  };
};
