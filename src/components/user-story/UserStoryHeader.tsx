
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface UserStoryHeaderProps {
  storiesLength: number;
  handleExportAll: () => void;
  handleClearAll: () => void;
}

export const UserStoryHeader = ({
  storiesLength,
  handleExportAll,
  handleClearAll,
}: UserStoryHeaderProps) => (
  <header className="bg-white/70 backdrop-blur-sm shadow-sm border-b border-white/20">
    <div className="container mx-auto px-2 sm:px-4 py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="sm" asChild className="px-2">
            <Link to="/" className="flex items-center">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline ml-2">Back to Tools</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              User Story Generator
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Create well-structured user stories using industry standards
            </p>
          </div>
        </div>
        {storiesLength > 0 && (
          <>
            <div className="flex flex-row gap-2 sm:hidden w-full mt-2">
              <Badge variant="secondary" className="px-2 py-1">
                <Users className="w-4 h-4 mr-1" />
                {storiesLength}
              </Badge>
              <Button
                size="icon"
                variant="outline"
                onClick={handleExportAll}
                className="bg-white/80 hover:bg-white"
                aria-label="Export All"
              >
                <Download className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={handleClearAll}
                className="bg-white/80 hover:bg-white"
                aria-label="Clear All"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
            <div className="hidden sm:flex flex-wrap items-center gap-2 sm:gap-3">
              <Badge variant="secondary" className="px-2 sm:px-3 py-1">
                <Users className="w-4 h-4 mr-1" />
                {storiesLength} Stories
              </Badge>
              <Button size="sm" variant="outline" onClick={handleExportAll} className="bg-white/80 hover:bg-white w-full sm:w-auto">
                <Download className="w-4 h-4 mr-2" />
                <span className="hidden xs:inline">Export All</span>
              </Button>
              <Button size="sm" variant="outline" onClick={handleClearAll} className="bg-white/80 hover:bg-white w-full sm:w-auto">
                <Trash2 className="w-4 h-4 mr-2" />
                <span className="hidden xs:inline">Clear All</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  </header>
);
