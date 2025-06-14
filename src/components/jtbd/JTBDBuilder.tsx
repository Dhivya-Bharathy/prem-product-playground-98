
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Wand2, Save, Download } from "lucide-react";
import { JTBDStatement } from "@/types/jtbd";
import { useToast } from "@/hooks/use-toast";

interface JTBDBuilderProps {
  onSaveStatement: (statement: JTBDStatement) => void;
}

export const JTBDBuilder = ({ onSaveStatement }: JTBDBuilderProps) => {
  const { toast } = useToast();
  const [situation, setSituation] = useState("");
  const [motivation, setMotivation] = useState("");
  const [outcome, setOutcome] = useState("");
  const [customerContext, setCustomerContext] = useState("");

  const generateStatement = () => {
    if (!situation.trim() || !motivation.trim() || !outcome.trim()) {
      return "";
    }

    return `When I ${situation.trim()}, I want to ${motivation.trim()}, so I can ${outcome.trim()}.`;
  };

  const fullStatement = generateStatement();
  const hasRequiredFields = situation.trim() && motivation.trim() && outcome.trim();

  const handleSave = () => {
    if (!fullStatement) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to generate a job statement.",
        variant: "destructive"
      });
      return;
    }

    const statement: JTBDStatement = {
      id: Date.now().toString(),
      customerContext: customerContext.trim(),
      job: motivation.trim(),
      outcome: outcome.trim(),
      situation: situation.trim(),
      fullStatement,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    onSaveStatement(statement);
    
    // Clear form
    setSituation("");
    setMotivation("");
    setOutcome("");
    setCustomerContext("");

    toast({
      title: "Statement Saved",
      description: "Your JTBD statement has been saved successfully."
    });
  };

  const handleExport = () => {
    if (!fullStatement) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before exporting.",
        variant: "destructive"
      });
      return;
    }

    const exportData = {
      statement: fullStatement,
      components: {
        situation,
        motivation,
        outcome,
        customerContext
      },
      createdAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jtbd-statement.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Statement Exported",
      description: "Your JTBD statement has been downloaded as JSON."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg">
          <Wand2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">JTBD Statement Builder</h3>
          <p className="text-gray-600">Create compelling job statements step by step</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Build Your Statement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customer-context">Customer Context (Optional)</Label>
              <Textarea
                id="customer-context"
                placeholder="Describe your target customer and their context..."
                value={customerContext}
                onChange={(e) => setCustomerContext(e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="situation">
                Situation <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="situation"
                placeholder="When I... (describe the triggering situation or context)"
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                rows={2}
              />
              <p className="text-xs text-gray-500">
                Example: "am commuting to work in the morning"
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation">
                Motivation <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="motivation"
                placeholder="I want to... (what they want to accomplish)"
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                rows={2}
              />
              <p className="text-xs text-gray-500">
                Example: "have something filling and convenient to consume"
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="outcome">
                Outcome <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="outcome"
                placeholder="So I can... (the desired end result or benefit)"
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                rows={2}
              />
              <p className="text-xs text-gray-500">
                Example: "stay satisfied until lunch without making a mess"
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Generated Statement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Generated Statement
              {hasRequiredFields && <Badge className="bg-green-100 text-green-800">Ready</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {customerContext && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <h5 className="text-sm font-semibold text-blue-700 mb-1">Customer Context:</h5>
                <p className="text-sm text-blue-800">{customerContext}</p>
              </div>
            )}

            <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg min-h-[120px] flex items-center">
              {hasRequiredFields ? (
                <p className="text-lg font-medium text-gray-800 italic">
                  "{fullStatement}"
                </p>
              ) : (
                <p className="text-gray-500 italic">
                  Fill in the required fields above to generate your JTBD statement...
                </p>
              )}
            </div>

            {hasRequiredFields && (
              <>
                <div className="text-xs text-gray-600 space-y-1">
                  <p><span className="font-semibold">Structure:</span></p>
                  <p>When I <span className="text-blue-600">[situation]</span>,</p>
                  <p>I want to <span className="text-green-600">[motivation]</span>,</p>
                  <p>so I can <span className="text-purple-600">[outcome]</span>.</p>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSave} className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Save Statement
                  </Button>
                  <Button onClick={handleExport} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
