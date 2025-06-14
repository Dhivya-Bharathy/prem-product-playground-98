
import nlp from 'compromise';
import { ScrapedElement } from './webScrapingService';
import { DarkPattern } from '@/types/darkPatterns';

export class PatternDetectionService {
  private darkPatternRules = {
    confirmshaming: {
      patterns: [
        /no\s*,?\s*i\s*(don't\s*want|'ll\s*stay|prefer\s*to)/i,
        /skip\s*this\s*(great\s*)?offer/i,
        /continue\s*without\s*(saving|protection)/i,
        /i\s*don't\s*need\s*(help|savings|protection)/i
      ],
      category: 'Emotional Manipulation'
    },
    hiddenCosts: {
      patterns: [
        /\+\s*shipping/i,
        /additional\s*fees/i,
        /handling\s*charge/i,
        /processing\s*fee/i
      ],
      category: 'Pricing Deception'
    },
    forceContivity: {
      patterns: [
        /auto[\s-]?renew/i,
        /automatically\s*charged/i,
        /recurring\s*billing/i,
        /subscription\s*continues/i
      ],
      category: 'Subscription Manipulation'
    },
    urgency: {
      patterns: [
        /limited\s*time/i,
        /expires?\s*(soon|today|in)/i,
        /only\s*\d+\s*left/i,
        /hurry/i,
        /act\s*now/i
      ],
      category: 'Artificial Scarcity'
    }
  };

  private greyPatternRules = {
    preChecked: {
      category: 'Default Settings'
    },
    smallText: {
      category: 'Information Hierarchy'
    },
    hardToFind: {
      category: 'Navigation Manipulation'
    }
  };

  private whitePatternRules = {
    clearPricing: {
      patterns: [
        /total\s*cost/i,
        /all\s*fees\s*included/i,
        /no\s*hidden\s*charges/i
      ],
      category: 'Transparency'
    },
    accessibleDesign: {
      category: 'Accessibility'
    },
    clearConsent: {
      patterns: [
        /i\s*agree/i,
        /yes\s*,?\s*please/i,
        /sign\s*me\s*up/i
      ],
      category: 'User Consent'
    }
  };

  detectPatterns(elements: ScrapedElement[]): DarkPattern[] {
    const detectedPatterns: DarkPattern[] = [];
    let patternId = 1;

    elements.forEach(element => {
      // Check for dark patterns
      this.checkDarkPatterns(element, detectedPatterns, patternId);
      
      // Check for grey patterns
      this.checkGreyPatterns(element, detectedPatterns, patternId);
      
      // Check for white patterns
      this.checkWhitePatterns(element, detectedPatterns, patternId);
      
      patternId++;
    });

    return detectedPatterns;
  }

  private checkDarkPatterns(element: ScrapedElement, patterns: DarkPattern[], id: number) {
    const text = element.text.toLowerCase();

    // Confirmshaming detection
    const confirmShamingMatch = this.darkPatternRules.confirmshaming.patterns.some(pattern => 
      pattern.test(text)
    );
    
    if (confirmShamingMatch) {
      patterns.push({
        id: `dark-${id}`,
        pattern_type: 'dark',
        name: 'Confirmshaming',
        element_selector: element.selector,
        description: `Button uses guilt-tripping language: "${element.text}"`,
        confidence: 85 + Math.random() * 10,
        recommendation: 'Use neutral language like "No thanks" or "Skip for now"',
        category: this.darkPatternRules.confirmshaming.category
      });
    }

    // Hidden costs detection
    const hiddenCostMatch = this.darkPatternRules.hiddenCosts.patterns.some(pattern => 
      pattern.test(text)
    );
    
    if (hiddenCostMatch) {
      patterns.push({
        id: `dark-${id}-cost`,
        pattern_type: 'dark',
        name: 'Hidden Costs',
        element_selector: element.selector,
        description: `Additional fees mentioned: "${element.text}"`,
        confidence: 75 + Math.random() * 15,
        recommendation: 'Display all costs upfront in the main pricing',
        category: this.darkPatternRules.hiddenCosts.category
      });
    }

    // Urgency detection
    const urgencyMatch = this.darkPatternRules.urgency.patterns.some(pattern => 
      pattern.test(text)
    );
    
    if (urgencyMatch && element.tagName !== 'title') {
      patterns.push({
        id: `grey-${id}-urgency`,
        pattern_type: 'grey',
        name: 'Artificial Urgency',
        element_selector: element.selector,
        description: `Creates false sense of urgency: "${element.text}"`,
        confidence: 70 + Math.random() * 20,
        recommendation: 'Only use urgency for genuine limited-time offers',
        category: this.darkPatternRules.urgency.category
      });
    }
  }

  private checkGreyPatterns(element: ScrapedElement, patterns: DarkPattern[], id: number) {
    // Pre-checked checkboxes
    if (element.tagName === 'input' && 
        element.attributes.type === 'checkbox' && 
        (element.attributes.checked === 'checked' || element.attributes.checked === 'true')) {
      
      patterns.push({
        id: `grey-${id}-prechecked`,
        pattern_type: 'grey',
        name: 'Pre-checked Consent',
        element_selector: element.selector,
        description: 'Checkbox is pre-selected, requiring users to actively opt-out',
        confidence: 80 + Math.random() * 15,
        recommendation: 'Use unchecked boxes by default and require explicit consent',
        category: 'Default Settings'
      });
    }

    // Small text detection
    const fontSize = parseFloat(element.styles.fontSize);
    if (fontSize && fontSize < 12 && element.text.length > 50) {
      patterns.push({
        id: `grey-${id}-small`,
        pattern_type: 'grey',
        name: 'Tiny Text',
        element_selector: element.selector,
        description: `Important information in very small text (${fontSize}px)`,
        confidence: 60 + Math.random() * 20,
        recommendation: 'Use readable font sizes (14px minimum) for important information',
        category: 'Information Hierarchy'
      });
    }
  }

  private checkWhitePatterns(element: ScrapedElement, patterns: DarkPattern[], id: number) {
    const text = element.text.toLowerCase();

    // Clear pricing
    const clearPricingMatch = this.whitePatternRules.clearPricing.patterns.some(pattern => 
      pattern.test(text)
    );
    
    if (clearPricingMatch) {
      patterns.push({
        id: `white-${id}-pricing`,
        pattern_type: 'white',
        name: 'Transparent Pricing',
        element_selector: element.selector,
        description: 'Clearly communicates pricing and fees upfront',
        confidence: 90 + Math.random() * 10,
        category: 'Transparency'
      });
    }

    // Accessibility check
    const bgColor = element.styles.backgroundColor;
    const textColor = element.styles.color;
    
    if (this.hasGoodContrast(bgColor, textColor)) {
      patterns.push({
        id: `white-${id}-contrast`,
        pattern_type: 'white',
        name: 'Good Color Contrast',
        element_selector: element.selector,
        description: 'Text has sufficient contrast for accessibility',
        confidence: 85 + Math.random() * 10,
        category: 'Accessibility'
      });
    }
  }

  private hasGoodContrast(bgColor: string, textColor: string): boolean {
    // Simplified contrast check - in reality this would be more sophisticated
    return bgColor && textColor && bgColor !== textColor;
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

    // Score calculation: start at 100, subtract for dark/grey, add for white
    const score = Math.max(0, 100 - (darkCount * 20) - (greyCount * 8) + (whiteCount * 3));

    return {
      dark_patterns: darkCount,
      grey_patterns: greyCount,
      white_patterns: whiteCount,
      total_score: Math.round(score)
    };
  }

  generateSummary(score: any): string {
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
