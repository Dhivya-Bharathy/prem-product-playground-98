
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useFeaturePrioritization } from "@/hooks/useFeaturePrioritization";
import FeatureResultsTable from "@/components/feature-prioritization/FeatureResultsTable";
import FeatureSummaryStats from "@/components/feature-prioritization/FeatureSummaryStats";
import FeatureForm from "@/components/feature-prioritization/FeatureForm";
import RiceFrameworkExplanation from "@/components/feature-prioritization/RiceFrameworkExplanation";

const FeaturePrioritization = () => {
  const {
    features,
    newFeature,
    updateFeatureField,
    addFeature,
    removeFeature
  } = useFeaturePrioritization();

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
        {/* Summary Statistics */}
        <FeatureSummaryStats features={features} />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form and Framework Info */}
          <div className="lg:col-span-1 space-y-6">
            <FeatureForm 
              newFeature={newFeature}
              onFeatureChange={updateFeatureField}
              onAddFeature={addFeature}
            />
            <RiceFrameworkExplanation />
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2">
            <Card className="h-fit">
              <CardContent className="p-6">
                <FeatureResultsTable 
                  features={features} 
                  onRemoveFeature={removeFeature} 
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturePrioritization;
