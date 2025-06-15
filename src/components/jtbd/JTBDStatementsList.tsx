
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Trash2 } from "lucide-react";
import { JTBDStatement } from "@/types/jtbd";

interface JTBDStatementsListProps {
  statements: JTBDStatement[];
  onDelete: (id: string) => void;
  onSetActiveTab: (tab: string) => void;
}

export const JTBDStatementsList = ({
  statements,
  onDelete,
  onSetActiveTab,
}: JTBDStatementsListProps) => {
  return (
    <div>
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
            <Button onClick={() => onSetActiveTab("builder")}>
              Start Building
            </Button>
            <Button variant="outline" onClick={() => onSetActiveTab("templates")}>
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
                    onClick={() => onDelete(statement.id)}
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
  );
};

