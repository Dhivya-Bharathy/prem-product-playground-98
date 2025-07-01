import { AnalysisResults, AnalysisProgress } from "@/types/darkPatterns";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export const analyzeWebsite = async (
  url: string, 
  onProgress: (progress: AnalysisProgress) => void
): Promise<AnalysisResults> => {
  try {
    // Stage 1: Initialize
    onProgress({
      stage: 'initializing',
      progress: 10,
      message: 'Initializing real website analysis...'
    });

    // Validate URL
    const urlObj = new URL(url);
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      throw new Error('Only HTTP and HTTPS URLs are supported');
    }

    // Stage 2: Send request to backend
    onProgress({
      stage: 'scraping',
      progress: 30,
      message: 'Scraping website content with Puppeteer...'
    });

    const response = await fetch(`${BACKEND_URL}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    onProgress({
      stage: 'analyzing',
      progress: 70,
      message: 'Analyzing design patterns and user experience...'
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Analysis failed');
    }

    onProgress({
      stage: 'analyzing',
      progress: 90,
      message: 'Calculating ethics score and generating recommendations...'
    });

    // Transform backend response to match frontend expectations
    const analysisResults: AnalysisResults = {
      url: result.data.url,
      screenshot: result.data.screenshot,
      timestamp: result.data.timestamp,
      patterns_detected: result.data.patterns_detected,
      overall_score: result.data.overall_score,
      summary: result.data.summary
    };

    // Stage 4: Complete
    onProgress({
      stage: 'completed',
      progress: 100,
      message: 'Real analysis complete!'
    });

    return analysisResults;

  } catch (error) {
    console.error('Real analysis error:', error);
    
    // If backend is not available, show helpful error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Backend server is not running. Please start the backend with: cd backend && npm install && npm start');
    }
    
    throw error;
  }
}; 