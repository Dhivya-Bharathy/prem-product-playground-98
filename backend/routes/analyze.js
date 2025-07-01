import express from 'express';
import validator from 'validator';
import { WebScrapingService } from '../services/WebScrapingService.js';
import { DarkPatternDetector } from '../services/DarkPatternDetector.js';

const router = express.Router();
const webScrapingService = new WebScrapingService();
const darkPatternDetector = new DarkPatternDetector();

// POST /api/analyze - Analyze a website for dark patterns
router.post('/analyze', async (req, res) => {
  try {
    const { url } = req.body;

    // Validate input
    if (!url) {
      return res.status(400).json({
        error: 'Missing URL',
        message: 'Please provide a URL to analyze'
      });
    }

    // Sanitize and validate URL
    const normalizedUrl = url.trim();
    
    if (!validator.isURL(normalizedUrl, { 
      protocols: ['http', 'https'],
      require_protocol: true,
      require_valid_protocol: true,
      allow_underscores: true
    })) {
      return res.status(400).json({
        error: 'Invalid URL',
        message: 'Please provide a valid HTTP or HTTPS URL'
      });
    }

    // Security checks
    const urlObj = new URL(normalizedUrl);
    
    // Block private/internal networks
    const hostname = urlObj.hostname.toLowerCase();
    if (hostname === 'localhost' || 
        hostname.startsWith('192.168.') ||
        hostname.startsWith('10.') ||
        hostname.startsWith('172.') ||
        hostname === '127.0.0.1' ||
        hostname.includes('internal')) {
      return res.status(400).json({
        error: 'Invalid URL',
        message: 'Cannot analyze internal or private network URLs'
      });
    }

    console.log(`🔍 Starting analysis for: ${normalizedUrl}`);

    // Step 1: Scrape website
    console.log('📄 Scraping website content...');
    const scrapedData = await webScrapingService.scrapeWebsite(normalizedUrl);
    
    if (!scrapedData.success) {
      return res.status(400).json({
        error: 'Scraping failed',
        message: scrapedData.error || 'Unable to access the website'
      });
    }

    // Step 2: Analyze for dark patterns
    console.log('🕵️ Detecting dark patterns...');
    const analysisResults = await darkPatternDetector.analyzeWebsite(scrapedData.data);

    // Step 3: Return results
    console.log(`✅ Analysis complete. Found ${analysisResults.patterns_detected.length} patterns`);
    
    res.json({
      success: true,
      data: {
        url: normalizedUrl,
        timestamp: new Date().toISOString(),
        screenshot: scrapedData.data.screenshot || '',
        patterns_detected: analysisResults.patterns_detected,
        overall_score: analysisResults.overall_score,
        summary: analysisResults.summary,
        performance: {
          scraping_time_ms: scrapedData.performance?.scraping_time_ms || 0,
          analysis_time_ms: analysisResults.performance?.analysis_time_ms || 0
        }
      }
    });

  } catch (error) {
    console.error('❌ Analysis error:', error);
    
    // Handle specific error types
    if (error.name === 'TimeoutError') {
      return res.status(408).json({
        error: 'Request timeout',
        message: 'The website took too long to respond. Please try again.'
      });
    }
    
    if (error.message.includes('net::ERR_NAME_NOT_RESOLVED')) {
      return res.status(400).json({
        error: 'Website not found',
        message: 'The website could not be found. Please check the URL.'
      });
    }

    if (error.message.includes('net::ERR_CONNECTION_REFUSED')) {
      return res.status(400).json({
        error: 'Connection refused',
        message: 'The website refused the connection. It may be down or blocking requests.'
      });
    }

    // Generic error response
    res.status(500).json({
      error: 'Analysis failed',
      message: 'An error occurred while analyzing the website. Please try again later.'
    });
  }
});

// GET /api/analyze/health - Health check for analysis service
router.get('/analyze/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Dark Pattern Analysis',
    timestamp: new Date().toISOString(),
    capabilities: [
      'Web scraping with Puppeteer',
      'Dark pattern detection',
      'Gray pattern analysis', 
      'White pattern identification',
      'Accessibility evaluation',
      'Privacy compliance check'
    ]
  });
});

export { router as analyzeWebsiteRoute }; 