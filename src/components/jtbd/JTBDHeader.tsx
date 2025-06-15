
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
  <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-white/20">
    <div className="container mx-auto px-2 py-2 sm:px-4 sm:py-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4 min-w-0">
          <Button variant="ghost" size="sm" asChild className="px-1 sm:px-3">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline text-xs sm:text-base">Back to Tools</span>
            </Link>
          </Button>
          <div className="min-w-0">
            <h1 className="text-base xs:text-lg sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent truncate">
              Jobs to be Done Framework
            </h1>
            {/* Tagline removed for clarity and to save space on mobile */}
          </div>
        </div>
        <div className="flex gap-1 flex-wrap sm:gap-3 sm:flex-nowrap overflow-x-auto -mx-1 sm:mx-0 pb-1">
          {statementCount > 0 && (
            <>
              <Badge variant="secondary" className="px-2 py-1 sm:px-3 sm:py-1 flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {statementCount}
                <span className="hidden xs:inline">&nbsp;Statements</span>
              </Badge>
              <Button
                size="sm"
                variant="outline"
                onClick={onExportAll}
                className="bg-white/80 hover:bg-white min-w-[36px] px-2 sm:px-3"
              >
                <Download className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Export All</span>
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onClearAll}
                className="bg-white/80 hover:bg-white min-w-[36px] px-2 sm:px-3"
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
