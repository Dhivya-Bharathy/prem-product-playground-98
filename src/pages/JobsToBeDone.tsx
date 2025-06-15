
import { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { JTBDGuide } from "@/components/jtbd/JTBDGuide";
import { JTBDBuilder } from "@/components/jtbd/JTBDBuilder";
import { JTBDTemplates } from "@/components/jtbd/JTBDTemplates";
import { useToast } from "@/hooks/use-toast";
import { JTBDMainTabs } from "@/components/jtbd/JTBDMainTabs";
import { JTBDHeader } from "@/components/jtbd/JTBDHeader";
import { JTBDStatementsList } from "@/components/jtbd/JTBDStatementsList";
import { JTBDStatement, JTBDTemplate } from "@/types/jtbd";

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
      <JTBDHeader
        statementCount={statements.length}
        onExportAll={handleExportAll}
        onClearAll={handleClearAll}
      />

      <div className="container mx-auto px-2 py-6 sm:px-4 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <JTBDMainTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              statementCount={statements.length}
            />

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
                <JTBDStatementsList
                  statements={statements}
                  onDelete={handleDeleteStatement}
                  onSetActiveTab={setActiveTab}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default JobsToBeDone;
