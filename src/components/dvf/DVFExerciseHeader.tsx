import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, RefreshCw } from "lucide-react";
import { DVFEvaluation } from "@/types/dvf";

interface DVFExerciseHeaderProps {
  onReset: () => void;
  onExport: () => void;
  evaluation: DVFEvaluation | null;
}

// Mobile-friendly header for DVF exercise
export const DVFExerciseHeader = ({ onReset, onExport, evaluation }: DVFExerciseHeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Left section with Home link and titles */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center gap-2">
              {/* Make back button shrink on small screens */}
              <Button variant="outline" size="sm" asChild className="px-2 sm:px-3 bg-[#22325F]">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2 text-teal-400" />
                  <span className="hidden xs:inline">Back to Home</span>
                </Link>
              </Button>
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900">DVF Exercise</h1>
              <p className="text-xs sm:text-base text-gray-600">
                Evaluate your ideas using Desirability, Viability, Feasibility framework
              </p>
            </div>
          </div>
          {/* Actions - make them scroll and wrap on mobile */}
          <div className="flex gap-2 flex-wrap sm:flex-nowrap overflow-x-auto -mx-1 sm:mx-0 pb-1">
            <Button
              variant="outline"
              onClick={onReset}
              size="sm"
              className="min-w-[40px] px-2 sm:px-3 bg-[#22325F]"
              aria-label="Reset"
            >
              <RefreshCw className="w-4 h-4 mr-1 sm:mr-2 text-teal-400" />
              <span className="hidden xs:inline">Reset</span>
            </Button>
            {evaluation && (
              <Button
                variant="outline"
                onClick={onExport}
                size="sm"
                className="min-w-[40px] px-2 sm:px-3 bg-[#22325F]"
                aria-label="Export"
              >
                <Download className="w-4 h-4 mr-1 sm:mr-2 text-teal-400" />
                <span className="hidden xs:inline">Export</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
