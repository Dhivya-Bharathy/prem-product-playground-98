
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Trash2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { JTBDStatement, JTBDTemplate } from "@/types/jtbd";
import { JTBDGuide } from "@/components/jtbd/JTBDGuide";
import { JTBDBuilder } from "@/components/jtbd/JTBDBuilder";
import { JTBDTemplates } from "@/components/jtbd/JTBDTemplates";
import { useToast } from "@/hooks/use-toast";

const JobsToBeDone = () => {
  const { toast } = useToast();
  const [statements, setStatements] = useState<JTBDStatement[]>([]);
  const [activeTab, setActiveTab] = useState("guide");

  // Load statements from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('jtbd-statements');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const statementsWithDates = parsed.map((statement: any) => ({
          ...statement,
          createdAt: new Date(statement.createdAt),
          updatedAt: new Date(statement.updatedAt)
        }));
        setStatements(statementsWithDates);
      } catch (error) {
        console.error('Failed to load statements:', error);
      }
    }
  }, []);

  // Save statements to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('jtbd-statements', JSON.stringify(statements));
  }, [statements]);

  const handleSaveStatement = (statement: JTBDStatement) => {
    setStatements(prev => [statement, ...prev]);
  };

  const handleUseTemplate = (template: JTBDTemplate) => {
    // Switch to builder tab and populate with template
    setActiveTab("builder");
    
    toast({
      title: "Template Applied",
      description: `${template.name} template is ready to customize in the builder.`
    });
  };

  const handleDeleteStatement = (id: string) => {
    setStatements(prev => prev.filter(statement => statement.id !== id));
    toast({
      title: "Statement Deleted",
      description: "The JTBD statement has been removed."
    });
  };

  const handleExportAll = () => {
    if (statements.length === 0) {
      toast({
        title: "No Data",
        description: "No statements to export.",
        variant: "destructive"
      });
      return;
    }

    const exportData = {
      statements,
      exportDate: new Date().toISOString(),
      totalCount: statements.length
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jtbd-statements-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `${statements.length} statements exported successfully.`
    });
  };

  const handleClearAll = () => {
    setStatements([]);
    localStorage.removeItem('jtbd-statements');
    toast({
      title: "All Cleared",
      description: "All JTBD statements have been removed."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Tools
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Jobs to be Done Framework</h1>
                <p className="text-gray-600 mt-1">
                  Understand customer needs using Clayton Christensen's methodology
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {statements.length > 0 && (
                <>
                  <Badge variant="secondary" className="px-3 py-1">
                    <Users className="w-4 h-4 mr-1" />
                    {statements.length} Statements
                  </Badge>
                  <Button size="sm" variant="outline" onClick={handleExportAll}>
                    <Download className="w-4 h-4 mr-2" />
                    Export All
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleClearAll}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="guide">Framework Guide</TabsTrigger>
              <TabsTrigger value="builder">Statement Builder</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="statements">My Statements</TabsTrigger>
            </TabsList>

            <TabsContent value="guide">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                <JTBDGuide />
              </div>
            </TabsContent>

            <TabsContent value="builder">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                <JTBDBuilder onSaveStatement={handleSaveStatement} />
              </div>
            </TabsContent>

            <TabsContent value="templates">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                <JTBDTemplates onUseTemplate={handleUseTemplate} />
              </div>
            </TabsContent>

            <TabsContent value="statements">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">My JTBD Statements</h2>
                    <p className="text-gray-600">Your saved job statements and insights</p>
                  </div>
                  {statements.length > 0 && (
                    <Badge className="bg-blue-100 text-blue-800">
                      {statements.length} Statements
                    </Badge>
                  )}
                </div>

                {statements.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Statements Yet</h3>
                    <p className="text-gray-500 mb-6">
                      Create your first JTBD statement using the builder or templates.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button onClick={() => setActiveTab("builder")}>
                        Start Building
                      </Button>
                      <Button variant="outline" onClick={() => setActiveTab("templates")}>
                        Browse Templates
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {statements.map((statement) => (
                      <Card key={statement.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg text-gray-900 mb-2">
                                "{statement.fullStatement}"
                              </CardTitle>
                              {statement.customerContext && (
                                <div className="p-2 bg-blue-50 rounded text-sm text-blue-800 mb-2">
                                  <strong>Context:</strong> {statement.customerContext}
                                </div>
                              )}
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteStatement(statement.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-3 gap-3 text-sm">
                            <div className="p-2 bg-blue-50 rounded">
                              <strong className="text-blue-700">Situation:</strong>
                              <p className="text-blue-800">{statement.situation}</p>
                            </div>
                            <div className="p-2 bg-green-50 rounded">
                              <strong className="text-green-700">Motivation:</strong>
                              <p className="text-green-800">{statement.job}</p>
                            </div>
                            <div className="p-2 bg-purple-50 rounded">
                              <strong className="text-purple-700">Outcome:</strong>
                              <p className="text-purple-800">{statement.outcome}</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                            <span>Created: {statement.createdAt.toLocaleDateString()}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default JobsToBeDone;
