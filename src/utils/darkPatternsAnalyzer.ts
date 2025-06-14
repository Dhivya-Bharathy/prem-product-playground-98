
import { AnalysisResults, AnalysisProgress } from "@/types/darkPatterns";
import { analyzeWebsite as realAnalyzeWebsite } from "./realDarkPatternsAnalyzer";

// Main export now uses only real analysis
export const analyzeWebsite = async (
  url: string, 
  onProgress: (progress: AnalysisProgress) => void
): Promise<AnalysisResults> => {
  return await realAnalyzeWebsite(url, onProgress);
};
