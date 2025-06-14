import { ScrapedElement } from './webScrapingService';
import { DarkPattern } from '@/types/darkPatterns';

export class PatternDetectionService {
  detectPatterns(elements: ScrapedElement[]): DarkPattern[] {
    // If no elements were scraped (empty array), return no patterns
    if (!elements || elements.length === 0) {
      return [];
    }

    // Real pattern detection would analyze the scraped elements
    // Since we have no real data, return empty array
    return [];
  }

  calculateOverallScore(patterns: DarkPattern[]): {
    dark_patterns: number;
    grey_patterns: number;
    white_patterns: number;
    total_score: number;
  } {
    const darkCount = patterns.filter(p => p.pattern_type === 'dark').length;
    const greyCount = patterns.filter(p => p.pattern_type === 'grey').length;
    const whiteCount = patterns.filter(p => p.pattern_type === 'white').length;

    // If no patterns detected, return neutral score
    const score = patterns.length === 0 ? 0 : Math.max(0, 100 - (darkCount * 20) - (greyCount * 8) + (whiteCount * 3));

    return {
      dark_patterns: darkCount,
      grey_patterns: greyCount,
      white_patterns: whiteCount,
      total_score: Math.round(score)
    };
  }

  generateSummary(score: any): string {
    if (score.dark_patterns === 0 && score.grey_patterns === 0 && score.white_patterns === 0) {
      return "No analysis results available. Real web scraping requires server-side implementation to bypass browser security restrictions.";
    }

    if (score.total_score >= 80) {
      return "This website demonstrates excellent ethical design practices with transparent user interfaces and clear consent mechanisms.";
    } else if (score.total_score >= 60) {
      return "This website has room for improvement in ethical design. Some patterns may confuse or mislead users.";
    } else if (score.total_score >= 40) {
      return "This website contains several concerning design patterns that may manipulate user behavior and decision-making.";
    } else {
      return "This website exhibits multiple dark patterns that deliberately deceive and manipulate users. Significant redesign is recommended.";
    }
  }
}
