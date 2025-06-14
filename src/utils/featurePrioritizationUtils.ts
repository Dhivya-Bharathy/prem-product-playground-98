
import { Feature } from "@/types/feature";

export const calculateRICE = (reach: number, impact: number, confidence: number, effort: number): number => {
  if (effort === 0) return 0;
  const confidenceDecimal = confidence / 100;
  return (reach * impact * confidenceDecimal) / effort;
};

export const getPriorityLevel = (score: number): string => {
  if (score >= 10) return "High";
  if (score >= 5) return "Medium";
  return "Low";
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case "High": return "bg-red-100 text-red-800 border-red-200";
    case "Medium": return "bg-orange-100 text-orange-800 border-orange-200";
    case "Low": return "bg-blue-100 text-blue-800 border-blue-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getScoreColor = (score: number): string => {
  if (score >= 10) return "text-red-600";
  if (score >= 5) return "text-orange-600";
  return "text-blue-600";
};

export const downloadAsExcel = async (features: Feature[], toast: any) => {
  if (features.length === 0) {
    toast({
      title: "No Features",
      description: "Add features to your prioritization matrix before downloading.",
      variant: "destructive"
    });
    return;
  }

  try {
    const headers = ['Rank', 'Feature Name', 'RICE Score', 'Priority', 'Reach', 'Impact', 'Confidence (%)', 'Effort (months)'];
    const csvContent = [
      headers.join(','),
      ...features.map((feature, index) => [
        index + 1,
        `"${feature.name.replace(/"/g, '""')}"`,
        feature.riceScore,
        feature.priority,
        feature.reach,
        feature.impact,
        feature.confidence,
        feature.effort
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'feature-prioritization-matrix.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download Complete",
      description: "Feature prioritization matrix has been exported to Excel format."
    });
  } catch (error) {
    console.error('Error generating Excel file:', error);
    toast({
      title: "Download Failed",
      description: "Could not generate Excel file. Please try again.",
      variant: "destructive"
    });
  }
};
