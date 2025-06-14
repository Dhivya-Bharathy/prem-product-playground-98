
import { AnalysisResults, AnalysisProgress } from "@/types/darkPatterns";
import { WebScrapingService } from "@/services/webScrapingService";
import { PatternDetectionService } from "@/services/patternDetectionService";

export const analyzeWebsite = async (
  url: string, 
  onProgress: (progress: AnalysisProgress) => void
): Promise<AnalysisResults> => {
  const webScrapingService = new WebScrapingService();
  const patternDetectionService = new PatternDetectionService();

  try {
    // Stage 1: Initialize
    onProgress({
      stage: 'initializing',
      progress: 10,
      message: 'Initializing browser and security checks...'
    });

    // Validate URL
    const urlObj = new URL(url);
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      throw new Error('Only HTTP and HTTPS URLs are supported');
    }

    // Stage 2: Scraping
    onProgress({
      stage: 'scraping',
      progress: 30,
      message: 'Loading and rendering webpage...'
    });

    const scrapedData = await webScrapingService.scrapeWebsite(url);

    onProgress({
      stage: 'scraping',
      progress: 50,
      message: 'Extracting page elements and content...'
    });

    // Stage 3: Analysis
    onProgress({
      stage: 'analyzing',
      progress: 70,
      message: 'Analyzing design patterns and user experience...'
    });

    const detectedPatterns = patternDetectionService.detectPatterns(scrapedData.elements);

    onProgress({
      stage: 'analyzing',
      progress: 90,
      message: 'Calculating ethics score and generating recommendations...'
    });

    const overallScore = patternDetectionService.calculateOverallScore(detectedPatterns);
    const summary = patternDetectionService.generateSummary(overallScore);

    // Stage 4: Complete
    onProgress({
      stage: 'completed',
      progress: 100,
      message: 'Analysis complete!'
    });

    return {
      url,
      screenshot: scrapedData.screenshot,
      timestamp: new Date().toISOString(),
      patterns_detected: detectedPatterns,
      overall_score: overallScore,
      summary
    };

  } catch (error) {
    console.error('Analysis error:', error);
    
    onProgress({
      stage: 'error',
      progress: 0,
      message: `Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    });

    throw error;
  } finally {
    await webScrapingService.cleanup();
  }
};
