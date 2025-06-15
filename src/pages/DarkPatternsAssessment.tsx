
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, CheckCircle, Download, ExternalLink, Zap, Info, Home, BookOpen, Scale, Globe } from "lucide-react";
import { AnalysisResults, AnalysisProgress } from "@/types/darkPatterns";
import { analyzeWebsite } from "@/utils/darkPatternsAnalyzer";
import { generateDarkPatternsPDF } from "@/utils/darkPatternsPdfGenerator";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";

const getPatternTypeColor = (patternType: string) => {
  switch (patternType) {
    case 'dark':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'grey':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'white':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const DarkPatternsAssessment = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState<AnalysisProgress | null>(null);
  const [results, setResults] = useState<AnalysisResults | null>(null);
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
      const analysisResults = await analyzeWebsite(url, setProgress);
      setResults(analysisResults);
      
      if (analysisResults.patterns_detected.length === 0) {
        toast({
          title: "No Results Available",
          description: "Unable to analyze website. Real analysis requires server-side implementation.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Analysis Complete",
          description: `Found ${analysisResults.patterns_detected.length} patterns to review`
        });
      }
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze the website. Real analysis requires server-side implementation.",
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

  const hasNoResults = results && results.patterns_detected.length === 0;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Dark Patterns Assessment Tool",
    "description": "Analyze websites for deceptive design patterns and user manipulation. Identify dark patterns, grey patterns, and white patterns.",
    "url": "https://www.prempradeep.com/tools/dark-patterns-assessment",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Web Browser"
  };

  return (
    <>
      <SEOHead
        title="Dark Patterns Assessment Tool - Analyze UX Design Ethics"
        description="Comprehensive dark patterns analysis tool. Identify deceptive design patterns, evaluate UX ethics, and ensure compliance with EU regulations and industry standards."
        keywords="dark patterns, UX ethics, deceptive design, GDPR compliance, user manipulation, ethical design, white patterns, grey patterns"
        canonical="https://www.prempradeep.com/tools/dark-patterns-assessment"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Back to Homepage Navigation */}
        <div className="bg-white/80 backdrop-blur-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <Button variant="outline" size="sm" asChild className="rounded-xl mb-2">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Back to Homepage
              </Link>
            </Button>
          </div>
        </div>

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
          {/* Guide Section - Always Visible */}
          <div className="mb-8 space-y-6">
            {/* Dark Patterns Guide */}
            <Card className="border-red-200">
              <CardHeader className="bg-red-50">
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <AlertTriangle className="w-5 h-5" />
                  Dark Patterns - Deceptive Design
                </CardTitle>
                <CardDescription>
                  Intentionally deceptive UX practices designed to manipulate users into unintended actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">Common Examples:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong>Bait and Switch:</strong> Promising one outcome but delivering another</li>
                      <li>• <strong>Hidden Costs:</strong> Revealing additional charges at checkout</li>
                      <li>• <strong>Roach Motel:</strong> Easy to get in, hard to get out (subscriptions)</li>
                      <li>• <strong>Privacy Zuckering:</strong> Tricking users into sharing personal data</li>
                      <li>• <strong>Forced Continuity:</strong> Auto-renewal without clear consent</li>
                      <li>• <strong>Friend Spam:</strong> Requesting contacts then spamming them</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">Industry Standards & Regulations:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong>EU GDPR:</strong> Explicit consent requirements</li>
                      <li>• <strong>Digital Services Act (DSA):</strong> Prohibits dark patterns</li>
                      <li>• <strong>California CPRA:</strong> Transparent data practices</li>
                      <li>• <strong>FTC Guidelines:</strong> No deceptive practices</li>
                      <li>• <strong>ISO 9241-11:</strong> Usability standards</li>
                      <li>• <strong>WCAG 2.1:</strong> Accessibility compliance</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Grey Patterns Guide */}
            <Card className="border-gray-200">
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center gap-2 text-gray-700">
                  <Shield className="w-5 h-5" />
                  Grey Patterns - Ethically Ambiguous
                </CardTitle>
                <CardDescription>
                  Design practices that aren't clearly deceptive but may still influence user behavior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Common Examples:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong>Social Proof:</strong> Showing popularity metrics to influence decisions</li>
                      <li>• <strong>Urgency/Scarcity:</strong> Limited time offers or stock counters</li>
                      <li>• <strong>Default Settings:</strong> Pre-selected options that favor the business</li>
                      <li>• <strong>Nudging:</strong> Subtle guidance toward preferred actions</li>
                      <li>• <strong>Progress Indicators:</strong> Making tasks seem shorter than they are</li>
                      <li>• <strong>Gamification:</strong> Using game elements to increase engagement</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Evaluation Criteria:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Does it benefit the user or just the business?</li>
                      <li>• Is the intent clearly communicated?</li>
                      <li>• Can users easily reverse their actions?</li>
                      <li>• Are alternatives clearly presented?</li>
                      <li>• Does it respect user autonomy?</li>
                      <li>• Is the information truthful and accurate?</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* White Patterns Guide */}
            <Card className="border-green-200">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  White Patterns - Ethical Design
                </CardTitle>
                <CardDescription>
                  Transparent, honest design practices that prioritize user needs and well-being
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Best Practices:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong>Clear Pricing:</strong> Transparent cost breakdown upfront</li>
                      <li>• <strong>Easy Cancellation:</strong> Simple unsubscribe/cancel processes</li>
                      <li>• <strong>Honest Marketing:</strong> Accurate product descriptions</li>
                      <li>• <strong>Privacy First:</strong> Minimal data collection with clear consent</li>
                      <li>• <strong>User Control:</strong> Easy settings and preference management</li>
                      <li>• <strong>Accessible Design:</strong> Inclusive for all users</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Industry Recognition:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong>B Corp Certification:</strong> Ethical business practices</li>
                      <li>• <strong>Privacy by Design:</strong> GDPR compliance framework</li>
                      <li>• <strong>Ethical Design Handbook:</strong> Industry guidelines</li>
                      <li>• <strong>Humane Technology:</strong> User well-being focus</li>
                      <li>• <strong>Fair Trade UX:</strong> Equitable design principles</li>
                      <li>• <strong>Sustainable UX:</strong> Environmental responsibility</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Regulatory Compliance */}
            <Card className="border-blue-200">
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Scale className="w-5 h-5" />
                  Regulatory Compliance & Standards
                </CardTitle>
                <CardDescription>
                  Latest legal requirements and industry standards for ethical design
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      EU Regulations
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong>GDPR (2018):</strong> Data protection and consent</li>
                      <li>• <strong>Digital Services Act (2024):</strong> Dark patterns prohibition</li>
                      <li>• <strong>Digital Markets Act (2024):</strong> Platform fairness</li>
                      <li>• <strong>ePrivacy Directive:</strong> Cookie consent</li>
                      <li>• <strong>Consumer Rights Directive:</strong> Clear information</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-3">US Regulations</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong>FTC Act:</strong> No deceptive practices</li>
                      <li>• <strong>CCPA/CPRA:</strong> California privacy rights</li>
                      <li>• <strong>ADA Compliance:</strong> Digital accessibility</li>
                      <li>• <strong>COPPA:</strong> Children's privacy protection</li>
                      <li>• <strong>Section 508:</strong> Federal accessibility</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-3">Industry Standards</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong>ISO 9241:</strong> Human-centered design</li>
                      <li>• <strong>WCAG 2.1:</strong> Web accessibility</li>
                      <li>• <strong>IEEE 2857:</strong> Privacy engineering</li>
                      <li>• <strong>ISO 27001:</strong> Information security</li>
                      <li>• <strong>NIST Framework:</strong> Cybersecurity standards</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Banner */}
          <Card className="mb-8 border-amber-200 bg-amber-50">
            <CardContent className="py-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-amber-800 text-sm">
                    <strong>Note:</strong> Real web scraping and analysis requires server-side implementation. 
                    This tool currently cannot bypass browser security restrictions to analyze external websites.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

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
              <div className="flex flex-col gap-3 md:flex-row md:gap-4">
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
                  className="md:px-8 w-full md:w-auto"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Website'}
                </Button>
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

          {/* No Results Section */}
          {hasNoResults && (
            <Card className="text-center py-12">
              <CardContent>
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-gray-100 rounded-full">
                    <Shield className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Available</h3>
                    <p className="text-gray-600 max-w-md">
                      Unable to analyze the website. Real dark patterns analysis requires server-side implementation 
                      to bypass browser security restrictions and perform actual web scraping.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results Section - Only show if we have actual patterns */}
          {results && results.patterns_detected.length > 0 && (
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
    </>
  );
};

export default DarkPatternsAssessment;
