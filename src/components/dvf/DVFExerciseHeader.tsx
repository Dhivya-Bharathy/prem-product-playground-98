
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, RefreshCw } from "lucide-react";
import { DVFEvaluation } from "@/types/dvf";

interface DVFExerciseHeaderProps {
  onReset: () => void;
  onExport: () => void;
  evaluation: DVFEvaluation | null;
}

export const DVFExerciseHeader = ({ onReset, onExport, evaluation }: DVFExerciseHeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">DVF Exercise</h1>
              <p className="text-gray-600">Evaluate your ideas using Desirability, Viability, Feasibility framework</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onReset} size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            {evaluation && (
              <Button variant="outline" onClick={onExport} size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
