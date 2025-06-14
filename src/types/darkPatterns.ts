
export interface DarkPattern {
  id: string;
  pattern_type: 'dark' | 'grey' | 'white';
  name: string;
  element_selector: string;
  description: string;
  confidence: number;
  recommendation?: string;
  screenshot?: string;
  category: string;
}

export interface AnalysisResults {
  url: string;
  screenshot: string;
  timestamp: string;
  patterns_detected: DarkPattern[];
  overall_score: {
    dark_patterns: number;
    grey_patterns: number;
    white_patterns: number;
    total_score: number;
  };
  summary: string;
}

export interface AnalysisProgress {
  stage: 'initializing' | 'scraping' | 'analyzing' | 'completed' | 'error';
  progress: number;
  message: string;
}
