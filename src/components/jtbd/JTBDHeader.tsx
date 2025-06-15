
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Download, Trash2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface JTBDHeaderProps {
  statementCount: number;
  onExportAll: () => void;
  onClearAll: () => void;
}

export const JTBDHeader = ({
  statementCount,
  onExportAll,
  onClearAll,
}: JTBDHeaderProps) => (
  <header className="bg-white/70 backdrop-blur-sm shadow-sm border-b border-white/20">
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <Button variant="ghost" size="sm" asChild className="px-2 sm:px-3">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Back to Tools</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-lg sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Jobs to be Done Framework
            </h1>
            <p className="text-xs sm:text-gray-600 mt-1">
              Understand customer needs using Clayton Christensen's methodology
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap sm:gap-3 sm:flex-nowrap overflow-x-auto -mx-1 sm:mx-0 pb-1">
          {statementCount > 0 && (
            <>
              <Badge variant="secondary" className="px-2 py-1 sm:px-3 sm:py-1">
                <Users className="w-4 h-4 mr-1" />
                {statementCount}
                <span className="hidden xs:inline">&nbsp;Statements</span>
              </Badge>
              <Button
                size="sm"
                variant="outline"
                onClick={onExportAll}
                className="bg-white/80 hover:bg-white min-w-[40px] px-2 sm:px-3"
              >
                <Download className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Export All</span>
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onClearAll}
                className="bg-white/80 hover:bg-white min-w-[40px] px-2 sm:px-3"
              >
                <Trash2 className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Clear All</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  </header>
);

