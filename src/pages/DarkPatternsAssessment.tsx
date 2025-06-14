import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, CheckCircle, Download, ExternalLink, Zap } from "lucide-react";
import { AnalysisResults, AnalysisProgress } from "@/types/darkPatterns";
import { analyzeWebsite } from "@/utils/darkPatternsAnalyzer";
import { generateDarkPatternsPDF } from "@/utils/darkPatternsPdfGenerator";
import { useToast } from "@/hooks/use-toast";

const DarkPatternsAssessment = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState<AnalysisProgress | null>(null);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [useMockAnalysis, setUseMockAnalysis] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a valid URL to analyze",
        variant: "destructive"
      });
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (e.g., https://example.com)",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setResults(null);

    try {
      const analysisResults = await analyzeWebsite(url, setProgress, useMockAnalysis);
      setResults(analysisResults);
      toast({
        title: "Analysis Complete",
        description: `Found ${analysisResults.patterns_detected.length} patterns to review`
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze the website. Please check the URL and try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
      setProgress(null);
    }
  };

  const handleDownloadPDF = () => {
    if (results) {
      generateDarkPatternsPDF(results);
      toast({
        title: "PDF Downloaded",
        description: "Your dark patterns analysis report has been downloaded"
      });
    }
  };

  const getPatternTypeIcon = (type: string) => {
    switch (type) {
      case 'dark': return AlertTriangle;
      case 'grey': return Shield;
      case 'white': return CheckCircle;
      default: return Shield;
    }
  };

  const getPatternTypeColor = (type: string) => {
    switch (type) {
      case 'dark': return 'bg-red-100 text-red-800 border-red-200';
      case 'grey': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'white': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dark Patterns Assessment</h1>
              <p className="text-gray-600">Analyze websites for deceptive design patterns and user manipulation</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Input Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Website URL Analysis
            </CardTitle>
            <CardDescription>
              Enter a website URL to analyze for dark patterns, grey patterns, and ethical design practices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isAnalyzing}
                className="flex-1"
              />
              <Button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing}
                className="px-8"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Website'}
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="mock-analysis"
                checked={useMockAnalysis}
                onChange={(e) => setUseMockAnalysis(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="mock-analysis" className="text-sm text-gray-600">
                Use demo mode (mock analysis)
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Progress Section */}
        {progress && (
          <Card className="mb-8">
            <CardContent className="py-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{progress.message}</span>
                  <span className="text-sm text-gray-500">{progress.progress}%</span>
                </div>
                <Progress value={progress.progress} className="w-full" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Section */}
        {results && (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-red-200 bg-red-50">
                <CardContent className="py-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-600 text-sm font-medium">Dark Patterns</p>
                      <p className="text-2xl font-bold text-red-800">
                        {results.overall_score.dark_patterns}
                      </p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200 bg-gray-50">
                <CardContent className="py-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Grey Patterns</p>
                      <p className="text-2xl font-bold text-gray-800">
                        {results.overall_score.grey_patterns}
                      </p>
                    </div>
                    <Shield className="w-8 h-8 text-gray-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="py-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">White Patterns</p>
                      <p className="text-2xl font-bold text-green-800">
                        {results.overall_score.white_patterns}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="py-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Overall Score</p>
                      <p className="text-2xl font-bold text-blue-800">
                        {results.overall_score.total_score}/100
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {Math.round(results.overall_score.total_score / 10)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analysis Summary */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Analysis Summary</CardTitle>
                  <CardDescription>
                    Analyzed: <a href={results.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1">
                      {results.url} <ExternalLink className="w-3 h-3" />
                    </a>
                  </CardDescription>
                </div>
                <Button onClick={handleDownloadPDF} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{results.summary}</p>
              </CardContent>
            </Card>

            {/* Detected Patterns */}
            <div className="space-y-6">
              {['dark', 'grey', 'white'].map((patternType) => {
                const patternsOfType = results.patterns_detected.filter(p => p.pattern_type === patternType);
                if (patternsOfType.length === 0) return null;

                const typeConfig = {
                  dark: { title: 'Dark Patterns', description: 'Deceptive or coercive design elements', icon: AlertTriangle, color: 'text-red-700' },
                  grey: { title: 'Grey Patterns', description: 'Ethically ambiguous design choices', icon: Shield, color: 'text-gray-700' },
                  white: { title: 'White Patterns', description: 'Ethical and transparent design elements', icon: CheckCircle, color: 'text-green-700' }
                };

                const config = typeConfig[patternType as keyof typeof typeConfig];
                const IconComponent = config.icon;

                return (
                  <Card key={patternType}>
                    <CardHeader>
                      <CardTitle className={`flex items-center gap-3 ${config.color}`}>
                        <IconComponent className="w-6 h-6" />
                        {config.title} ({patternsOfType.length})
                      </CardTitle>
                      <CardDescription>{config.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {patternsOfType.map((pattern) => (
                          <div key={pattern.id} className="border rounded-lg p-4 space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="font-semibold text-gray-900">{pattern.name}</h4>
                                  <Badge className={getPatternTypeColor(pattern.pattern_type)}>
                                    {pattern.category}
                                  </Badge>
                                  <Badge variant="outline">
                                    {pattern.confidence}% confidence
                                  </Badge>
                                </div>
                                <p className="text-gray-600 text-sm mb-2">{pattern.description}</p>
                                {pattern.recommendation && (
                                  <div className="bg-blue-50 p-3 rounded-lg">
                                    <p className="text-blue-800 text-sm">
                                      <strong>💡 Recommendation:</strong> {pattern.recommendation}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">
                              Element: <code className="bg-gray-100 px-1 rounded">{pattern.element_selector}</code>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DarkPatternsAssessment;
