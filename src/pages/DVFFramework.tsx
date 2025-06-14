
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Brain, Target, DollarSign, Wrench, CheckSquare } from "lucide-react";
import { DVFGuide } from "@/components/dvf/DVFGuide";

const DVFFramework = () => {
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
              <h1 className="text-2xl font-bold text-gray-900">DVF Framework Guide</h1>
              <p className="text-gray-600">Master the Desirability, Viability, Feasibility methodology</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-4">The DVF Framework</CardTitle>
            <CardDescription className="text-lg max-w-3xl mx-auto">
              The DVF (Desirability, Viability, Feasibility) framework helps you systematically evaluate 
              product ideas by examining three critical dimensions that determine success.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Desirability</h3>
                <p className="text-gray-600">Do people want this?</p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Viability</h3>
                <p className="text-gray-600">Can it be a business?</p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Wrench className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Feasibility</h3>
                <p className="text-gray-600">Can we build it?</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button asChild size="lg">
                <Link to="/tools/dvf-exercise">
                  <Brain className="w-4 h-4 mr-2" />
                  Try DVF Exercise
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="desirability">Desirability</TabsTrigger>
            <TabsTrigger value="viability">Viability</TabsTrigger>
            <TabsTrigger value="feasibility">Feasibility</TabsTrigger>
            <TabsTrigger value="process">Process</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <DVFGuide />
            
            <Card>
              <CardHeader>
                <CardTitle>When to Use DVF</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-green-600">✅ Best Used For:</h4>
                    <ul className="space-y-2">
                      <li>• New product ideas</li>
                      <li>• Feature prioritization</li>
                      <li>• Early stage validation</li>
                      <li>• Portfolio decisions</li>
                      <li>• Innovation projects</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-red-600">❌ Not Ideal For:</h4>
                    <ul className="space-y-2">
                      <li>• Minor UI improvements</li>
                      <li>• Bug fixes</li>
                      <li>• Regulatory requirements</li>
                      <li>• Technical debt</li>
                      <li>• Maintenance tasks</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="desirability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Desirability Deep Dive
                </CardTitle>
                <CardDescription>Understanding what makes products desirable to users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Key Questions:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Is there genuine user demand for this solution?</li>
                    <li>• Does it solve a real, meaningful problem?</li>
                    <li>• How strong is the emotional connection?</li>
                    <li>• Would users choose this over alternatives?</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Evaluation Methods:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h5 className="font-medium mb-2">User Research</h5>
                      <p className="text-sm text-gray-600">Interviews, surveys, focus groups</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h5 className="font-medium mb-2">Market Analysis</h5>
                      <p className="text-sm text-gray-600">Trends, demand signals, competition</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h5 className="font-medium mb-2">Prototyping</h5>
                      <p className="text-sm text-gray-600">Test concepts with real users</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h5 className="font-medium mb-2">Analytics</h5>
                      <p className="text-sm text-gray-600">Behavioral data and usage patterns</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="viability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Viability Deep Dive
                </CardTitle>
                <CardDescription>Assessing business sustainability and market opportunity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Key Questions:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Is there a clear path to revenue?</li>
                    <li>• What's the total addressable market?</li>
                    <li>• Can we achieve sustainable unit economics?</li>
                    <li>• How strong is our competitive position?</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Business Model Elements:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h5 className="font-medium mb-2">Revenue Streams</h5>
                      <p className="text-sm text-gray-600">Subscription, transaction, advertising</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h5 className="font-medium mb-2">Cost Structure</h5>
                      <p className="text-sm text-gray-600">Development, operations, marketing</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h5 className="font-medium mb-2">Market Size</h5>
                      <p className="text-sm text-gray-600">TAM, SAM, SOM analysis</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h5 className="font-medium mb-2">Competition</h5>
                      <p className="text-sm text-gray-600">Direct and indirect competitors</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feasibility" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-purple-600" />
                  Feasibility Deep Dive
                </CardTitle>
                <CardDescription>Evaluating technical and operational capability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Key Questions:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Do we have the technical expertise?</li>
                    <li>• Are the required resources available?</li>
                    <li>• Is the timeline realistic?</li>
                    <li>• What are the major risks and blockers?</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Assessment Areas:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h5 className="font-medium mb-2">Technical</h5>
                      <p className="text-sm text-gray-600">Architecture, scalability, complexity</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h5 className="font-medium mb-2">Resources</h5>
                      <p className="text-sm text-gray-600">Team, budget, time, tools</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h5 className="font-medium mb-2">Dependencies</h5>
                      <p className="text-sm text-gray-600">External APIs, partnerships, compliance</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h5 className="font-medium mb-2">Risks</h5>
                      <p className="text-sm text-gray-600">Technical, operational, market risks</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="process" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="w-5 h-5" />
                  DVF Evaluation Process
                </CardTitle>
                <CardDescription>Step-by-step guide to conducting DVF evaluations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Badge variant="secondary" className="mt-1">1</Badge>
                    <div>
                      <h4 className="font-semibold mb-2">Define the Idea</h4>
                      <p className="text-gray-600">Clearly articulate the product concept, target users, and core value proposition.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Badge variant="secondary" className="mt-1">2</Badge>
                    <div>
                      <h4 className="font-semibold mb-2">Gather Information</h4>
                      <p className="text-gray-600">Collect data for each dimension through research, analysis, and stakeholder input.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Badge variant="secondary" className="mt-1">3</Badge>
                    <div>
                      <h4 className="font-semibold mb-2">Score Each Dimension</h4>
                      <p className="text-gray-600">Rate desirability, viability, and feasibility on a 1-10 scale based on evidence.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Badge variant="secondary" className="mt-1">4</Badge>
                    <div>
                      <h4 className="font-semibold mb-2">Analyze Results</h4>
                      <p className="text-gray-600">Review overall score and identify strengths, weaknesses, and improvement areas.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Badge variant="secondary" className="mt-1">5</Badge>
                    <div>
                      <h4 className="font-semibold mb-2">Make Decision</h4>
                      <p className="text-gray-600">Use the evaluation to proceed, improve, pause, or stop the idea development.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold mb-2">💡 Pro Tips</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Involve diverse stakeholders in the evaluation</li>
                    <li>• Document assumptions and evidence</li>
                    <li>• Re-evaluate periodically as conditions change</li>
                    <li>• Use it alongside other frameworks (RICE, ICE, etc.)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DVFFramework;
