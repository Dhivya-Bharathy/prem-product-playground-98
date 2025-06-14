
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain } from "lucide-react";
import { DVFMatrix } from "./DVFMatrix";
import { DVFEvaluation } from "@/types/dvf";

interface DVFResultsSectionProps {
  evaluation: DVFEvaluation | null;
}

export const DVFResultsSection = ({ evaluation }: DVFResultsSectionProps) => {
  if (!evaluation) {
    return (
      <div className="text-center text-gray-500 py-12">
        <Brain className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p>Complete the evaluation to see your results</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Evaluation Results</CardTitle>
          <CardDescription>{evaluation.title}</CardDescription>
        </CardHeader>
        <CardContent>
          <DVFMatrix evaluation={evaluation} />
          <div className="mt-6 flex justify-between">
            <Button variant="outline" asChild>
              <Link to="/tools/dvf-framework">
                Learn More About DVF
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
