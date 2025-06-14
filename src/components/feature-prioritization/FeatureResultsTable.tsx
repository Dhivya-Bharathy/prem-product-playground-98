
import { Feature } from "@/types/feature";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Download } from "lucide-react";
import { getPriorityColor, getScoreColor, downloadAsExcel } from "@/utils/featurePrioritizationUtils";
import { useToast } from "@/hooks/use-toast";

interface FeatureResultsTableProps {
  features: Feature[];
  onRemoveFeature: (id: string) => void;
}

const FeatureResultsTable = ({ features, onRemoveFeature }: FeatureResultsTableProps) => {
  const { toast } = useToast();

  const handleDownload = () => {
    downloadAsExcel(features, toast);
  };

  const getMaxScore = () => {
    return Math.max(...features.map(f => f.riceScore), 1);
  };

  const getScoreBarWidth = (score: number) => {
    return (score / getMaxScore()) * 100;
  };

  if (features.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 rounded"></div>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No features added yet</h3>
        <p className="text-gray-500">Add features using the form to see them prioritized here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Prioritized Features</h3>
          <p className="text-sm text-gray-600">{features.length} feature{features.length !== 1 ? 's' : ''} ranked by RICE score</p>
        </div>
        <Button onClick={handleDownload} size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          Export to Excel
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-16">Rank</TableHead>
              <TableHead>Feature</TableHead>
              <TableHead className="w-24">RICE Score</TableHead>
              <TableHead className="w-24">Priority</TableHead>
              <TableHead className="w-20">Reach</TableHead>
              <TableHead className="w-20">Impact</TableHead>
              <TableHead className="w-24">Confidence</TableHead>
              <TableHead className="w-20">Effort</TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature, index) => (
              <TableRow key={feature.id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="flex items-center justify-center">
                    <Badge variant="outline" className="w-8 h-8 rounded-full p-0 flex items-center justify-center">
                      {index + 1}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{feature.name}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getScoreBarWidth(feature.riceScore)}%` }}
                      ></div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`text-lg font-bold ${getScoreColor(feature.riceScore)}`}>
                    {feature.riceScore}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(feature.priority)}>
                    {feature.priority}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {feature.reach.toLocaleString()}
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {feature.impact}
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {feature.confidence}%
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {feature.effort}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveFeature(feature.id)}
                    className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FeatureResultsTable;
