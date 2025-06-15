
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3, Users, Star, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFeaturePrioritization } from "@/hooks/useFeaturePrioritization";
import { Feature } from "@/types/feature";
import { calculateRICE, getPriorityLevel, downloadAsExcel } from "@/utils/featurePrioritizationUtils";
import FeatureResultsTable from "@/components/feature-prioritization/FeatureResultsTable";
import FeatureSummaryStats from "@/components/feature-prioritization/FeatureSummaryStats";
import FeatureForm from "@/components/feature-prioritization/FeatureForm";
import RiceFrameworkExplanation from "@/components/feature-prioritization/RiceFrameworkExplanation";
import { RiceFrameworkGuide } from "@/components/feature-prioritization/RiceFrameworkGuide";
import { FeatureTemplates, FeatureTemplate } from "@/components/feature-prioritization/FeatureTemplates";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const featureTabIcons = [
  { key: "guide", label: "Framework Guide", Icon: BarChart3 },
  { key: "builder", label: "Feature Builder", Icon: Users },
  { key: "templates", label: "Templates", Icon: Star },
  { key: "prioritization", label: "My Features", Icon: Download },
  { key: "storage", label: "Saved Sets", Icon: Trash2 }
];

const FeaturePrioritization = () => {
  const { toast } = useToast();
  const {
    features,
    newFeature,
    updateFeatureField,
    addFeature,
    removeFeature
  } = useFeaturePrioritization();

  const [activeTab, setActiveTab] = useState("guide");
  const [savedFeatureSets, setSavedFeatureSets] = useState<Array<{
    id: string;
    name: string;
    features: Feature[];
    createdAt: string;
  }>>([]);

  // Load saved feature sets from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('saved-feature-sets');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSavedFeatureSets(parsed);
      } catch (error) {
        console.error('Failed to load saved feature sets:', error);
      }
    }
  }, []);

  // Save feature sets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('saved-feature-sets', JSON.stringify(savedFeatureSets));
  }, [savedFeatureSets]);

  const handleUseTemplate = (template: FeatureTemplate) => {
    const templateFeatures = template.features.map((feature, index) => {
      const riceScore = calculateRICE(feature.reach, feature.impact, feature.confidence, feature.effort);
      return {
        id: `${Date.now()}-${index}`,
        ...feature,
        riceScore: Number(riceScore.toFixed(2)),
        priority: getPriorityLevel(riceScore)
      };
    });

    features.push(...templateFeatures);
    features.sort((a, b) => b.riceScore - a.riceScore);
    setActiveTab("builder");

    toast({
      title: "Template Applied",
      description: `${template.name} template has been added to your feature list.`
    });
  };

  const handleSaveFeatureSet = () => {
    if (features.length === 0) {
      toast({
        title: "No Features",
        description: "Add some features before saving.",
        variant: "destructive"
      });
      return;
    }

    const name = prompt("Enter a name for this feature set:");
    if (!name) return;

    const newSet = {
      id: Date.now().toString(),
      name,
      features: [...features],
      createdAt: new Date().toISOString()
    };

    setSavedFeatureSets(prev => [newSet, ...prev]);

    toast({
      title: "Feature Set Saved",
      description: `"${name}" has been saved successfully.`
    });
  };

  const handleLoadFeatureSet = (featureSet: typeof savedFeatureSets[0]) => {
    features.length = 0;
    features.push(...featureSet.features);
    setActiveTab("prioritization");

    toast({
      title: "Feature Set Loaded",
      description: `"${featureSet.name}" has been loaded.`
    });
  };

  const handleDeleteFeatureSet = (id: string) => {
    setSavedFeatureSets(prev => prev.filter(set => set.id !== id));
    toast({
      title: "Feature Set Deleted",
      description: "Feature set has been removed."
    });
  };

  const handleDownloadExcel = () => downloadAsExcel(features, toast);

  const handleClearAll = () => {
    features.length = 0;
    toast({
      title: "All Cleared",
      description: "All features have been removed."
    });
  };

  // Quick Stats
  const totalFeatures = features.length;
  const highPriorityFeatures = features.filter(f => f.priority === 'High').length;
  const avgScore = features.length > 0 ? features.reduce((sum, f) => sum + f.riceScore, 0) / features.length : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-sm shadow-sm border-b border-white/20">
        <div className="container mx-auto px-2 sm:px-4 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" size="sm" asChild className="px-2">
                <Link to="/" className="flex items-center">
                  <ArrowLeft className="w-5 h-5" />
                  <span className="hidden sm:inline ml-2">Back to Tools</span>
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Feature Prioritization Matrix
                </h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  Prioritize features using the RICE framework
                </p>
              </div>
            </div>
            {features.length > 0 && (
              <>
                {/* Mobile: actions row */}
                <div className="flex flex-row gap-2 sm:hidden w-full mt-2">
                  <Badge variant="secondary" className="px-2 py-1">
                    <BarChart3 className="w-4 h-4 mr-1" />
                    {features.length}
                  </Badge>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={handleSaveFeatureSet}
                    className="bg-white/80 hover:bg-white"
                    aria-label="Save"
                  >
                    <Star className="w-5 h-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={handleDownloadExcel}
                    className="bg-white/80 hover:bg-white"
                    aria-label="Export"
                  >
                    <Download className="w-5 h-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={handleClearAll}
                    className="bg-white/80 hover:bg-white"
                    aria-label="Clear All"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
                {/* Desktop: actions */}
                <div className="hidden sm:flex flex-wrap items-center gap-2 sm:gap-3">
                  <Badge variant="secondary" className="px-2 sm:px-3 py-1">
                    <BarChart3 className="w-4 h-4 mr-1" />
                    {features.length} Features
                  </Badge>
                  <Button size="sm" variant="outline" onClick={handleSaveFeatureSet} className="bg-white/80 hover:bg-white w-full sm:w-auto">
                    <Star className="w-4 h-4 mr-2" />
                    <span className="hidden xs:inline">Save Set</span>
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleDownloadExcel} className="bg-white/80 hover:bg-white w-full sm:w-auto">
                    <Download className="w-4 h-4 mr-2" />
                    <span className="hidden xs:inline">Export</span>
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleClearAll} className="bg-white/80 hover:bg-white w-full sm:w-auto">
                    <Trash2 className="w-4 h-4 mr-2" />
                    <span className="hidden xs:inline">Clear All</span>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Quick Stats Bar */}
      {features.length > 0 && (
        <div className="bg-white/50 backdrop-blur-sm border-b border-white/20">
          <div className="container mx-auto px-2 sm:px-4 py-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                    <BarChart3 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{totalFeatures}</div>
                    <div className="text-xs text-gray-600">Total Features</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                  <div className="p-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{highPriorityFeatures}</div>
                    <div className="text-xs text-gray-600">High Priority</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">{avgScore.toFixed(1)}</div>
                    <div className="text-xs text-gray-600">Avg Score</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-1 sm:px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* Mobile optimized tab bar */}
            <div className="overflow-x-auto hide-scrollbar mb-4 -mx-2 px-1 sm:px-2">
              <TabsList
                className="flex w-full min-w-[320px] sm:min-w-0 gap-1 sm:gap-0 border rounded-lg bg-slate-100"
                style={{ minWidth: 260 }}
              >
                {featureTabIcons.map(({ key, label, Icon }) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="flex-1 min-w-[60px] sm:min-w-[120px] text-xs sm:text-sm flex flex-col items-center justify-center py-2"
                  >
                    <div className="flex justify-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <Icon className="w-5 h-5 sm:mr-2 text-blue-600" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          {label}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <span className="hidden sm:block mt-1">{label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="guide">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                <RiceFrameworkGuide />
              </div>
            </TabsContent>

            <TabsContent value="builder">
              <div className="grid lg:grid-cols-4 gap-8">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
                  <FeatureForm 
                    newFeature={newFeature}
                    onFeatureChange={updateFeatureField}
                    onAddFeature={addFeature}
                  />
                </div>
                <div className="lg:col-span-3">
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
                    <div className="p-6">
                      <FeatureResultsTable 
                        features={features} 
                        onRemoveFeature={removeFeature} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="templates">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                <FeatureTemplates onUseTemplate={handleUseTemplate} />
              </div>
            </TabsContent>

            <TabsContent value="prioritization">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
                <div className="p-6">
                  <FeatureResultsTable 
                    features={features} 
                    onRemoveFeature={removeFeature} 
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="storage">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        Saved Feature Sets
                      </h2>
                      <p className="text-gray-600">Your saved feature prioritization sets</p>
                    </div>
                  </div>

                  {savedFeatureSets.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                        <Star className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No saved sets yet</h3>
                      <p className="text-gray-500">Create and save feature sets to access them later</p>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {savedFeatureSets.map((featureSet) => (
                        <div key={featureSet.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-semibold text-gray-900">{featureSet.name}</h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteFeatureSet(featureSet.id)}
                              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="space-y-2 mb-4">
                            <div className="text-sm text-gray-600">
                              {featureSet.features.length} features
                            </div>
                            <div className="text-xs text-gray-500">
                              Saved: {new Date(featureSet.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <Button
                            onClick={() => handleLoadFeatureSet(featureSet)}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                            size="sm"
                          >
                            Load Feature Set
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FeaturePrioritization;
