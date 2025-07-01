export class DarkPatternDetector {
  constructor() {
    this.patterns = {
      dark: this.initializeDarkPatterns(),
      grey: this.initializeGreyPatterns(),
      white: this.initializeWhitePatterns()
    };
  }

  async analyzeWebsite(scrapedData) {
    const startTime = Date.now();
    console.log('🔍 Starting real dark pattern analysis...');

    const detectedPatterns = [];

    // Real analysis of actual website elements
    detectedPatterns.push(...this.analyzeCookieConsent(scrapedData));
    detectedPatterns.push(...this.analyzeFormManipulation(scrapedData));
    detectedPatterns.push(...this.analyzeButtonDesign(scrapedData));
    detectedPatterns.push(...this.analyzePricingTactics(scrapedData));
    detectedPatterns.push(...this.analyzeSubscriptionPatterns(scrapedData));
    detectedPatterns.push(...this.analyzeNavigationPatterns(scrapedData));
    detectedPatterns.push(...this.analyzeContentPatterns(scrapedData));
    detectedPatterns.push(...this.analyzeAccessibilityCompliance(scrapedData));
    detectedPatterns.push(...this.analyzePrivacyCompliance(scrapedData));
    detectedPatterns.push(...this.analyzePositiveDesignPatterns(scrapedData));

    // Calculate overall score
    const overallScore = this.calculateOverallScore(detectedPatterns);
    const summary = this.generateSummary(overallScore, detectedPatterns);

    console.log(`✅ Real analysis complete. Found ${detectedPatterns.length} patterns`);

    return {
      patterns_detected: detectedPatterns,
      overall_score: overallScore,
      summary,
      performance: {
        analysis_time_ms: Date.now() - startTime
      }
    };
  }

  analyzeCookieConsent(data) {
    const patterns = [];
    const buttons = data.buttons || [];
    const cookieNotices = data.cookieNotices || [];
    
    if (cookieNotices.length > 0) {
      // Check button balance for cookie consent
      const acceptButtons = buttons.filter(btn => {
        const text = btn.text.toLowerCase();
        return text.includes('accept') || text.includes('allow') || text.includes('ok') || text.includes('agree');
      });
      
      const rejectButtons = buttons.filter(btn => {
        const text = btn.text.toLowerCase();
        return text.includes('reject') || text.includes('decline') || text.includes('deny') || 
               text.includes('necessary only') || text.includes('essential only');
      });

      // Dark pattern: Only accept button visible, no reject option
      if (acceptButtons.length > 0 && rejectButtons.length === 0) {
        patterns.push({
          name: 'Forced Cookie Acceptance',
          category: 'Privacy Zuckering',
          pattern_type: 'dark',
          confidence: 95,
          description: `Found ${acceptButtons.length} accept button(s) but no clear rejection option for cookies.`,
          element_selector: '.cookie, .consent',
          recommendation: 'Provide equally prominent "Accept" and "Reject All" options.',
          impact: 'high'
        });
      }

      // Analyze cookie banner blocking content
      const cookieTexts = cookieNotices.map(n => n.text.toLowerCase()).join(' ');
      if (cookieTexts.includes('continue') && !cookieTexts.includes('reject')) {
        patterns.push({
          name: 'Cookie Wall',
          category: 'Forced Action',
          pattern_type: 'dark',
          confidence: 85,
          description: 'Website blocks access until cookies are accepted.',
          element_selector: '.cookie, .consent',
          recommendation: 'Allow users to access content with essential cookies only.',
          impact: 'high'
        });
      }
    }

    return patterns;
  }

  analyzeFormManipulation(data) {
    const patterns = [];
    const forms = data.forms || [];

    forms.forEach((form, formIndex) => {
      // Check for pre-checked marketing checkboxes
      const preCheckedMarketing = form.inputs.filter(input => 
        input.type === 'checkbox' && 
        input.checked && 
        (input.name.toLowerCase().includes('newsletter') || 
         input.name.toLowerCase().includes('marketing') ||
         input.name.toLowerCase().includes('promo') ||
         input.name.toLowerCase().includes('offer') ||
         input.name.toLowerCase().includes('email'))
      );

      if (preCheckedMarketing.length > 0) {
        patterns.push({
          name: 'Pre-checked Marketing Consent',
          category: 'Privacy Zuckering',
          pattern_type: 'dark',
          confidence: 100,
          description: `Form has ${preCheckedMarketing.length} pre-checked marketing subscription(s).`,
          element_selector: `form:nth-child(${formIndex + 1})`,
          recommendation: 'Use opt-in (unchecked) by default for all marketing communications.',
          impact: 'high'
        });
      }

      // Check for unclear required fields
      const requiredFields = form.inputs.filter(input => input.required);
      const markedRequired = form.inputs.filter(input => 
        input.placeholder && (input.placeholder.includes('*') || input.placeholder.includes('required'))
      );

      if (requiredFields.length > 0 && markedRequired.length < requiredFields.length) {
        patterns.push({
          name: 'Unclear Required Fields',
          category: 'Poor UX Design',
          pattern_type: 'grey',
          confidence: 80,
          description: `${requiredFields.length - markedRequired.length} required fields not clearly marked.`,
          element_selector: `form:nth-child(${formIndex + 1})`,
          recommendation: 'Mark all required fields with asterisks (*) or "required" labels.',
          impact: 'medium'
        });
      }

      // Check for excessive data collection
      const sensitiveFields = form.inputs.filter(input => {
        const name = input.name.toLowerCase();
        return name.includes('phone') || name.includes('address') || 
               name.includes('birth') || name.includes('age') || 
               name.includes('income') || name.includes('ssn');
      });

      if (sensitiveFields.length > 3) {
        patterns.push({
          name: 'Excessive Data Collection',
          category: 'Privacy Zuckering',
          pattern_type: 'grey',
          confidence: 75,
          description: `Form requests ${sensitiveFields.length} sensitive personal data points.`,
          element_selector: `form:nth-child(${formIndex + 1})`,
          recommendation: 'Only collect data essential for the service provided.',
          impact: 'medium'
        });
      }
    });

    return patterns;
  }

  analyzeButtonDesign(data) {
    const patterns = [];
    const buttons = data.buttons || [];

    // Analyze button text for manipulation
    buttons.forEach((button, index) => {
      const text = button.text.toLowerCase().trim();
      
      // Check for confirm-shaming language
      const shamingPhrases = [
        'no thanks', 'skip', 'maybe later', 'not interested',
        'continue without', 'no, i prefer', 'i don\'t want'
      ];

      const hasShamingLanguage = shamingPhrases.some(phrase => {
        return text.includes(phrase) && (
          text.includes('save') || text.includes('deal') || 
          text.includes('offer') || text.includes('discount') ||
          text.includes('free') || text.includes('premium')
        );
      });

      if (hasShamingLanguage) {
        patterns.push({
          name: 'Confirm-shaming Language',
          category: 'Emotional Manipulation',
          pattern_type: 'dark',
          confidence: 90,
          description: `Button uses guilt-inducing language: "${button.text}"`,
          element_selector: `button:nth-child(${index + 1})`,
          recommendation: 'Use neutral language for decline options.',
          impact: 'high'
        });
      }

      // Check for urgency manipulation in buttons
      const urgencyWords = ['now', 'today', 'hurry', 'limited', 'expires', 'last chance'];
      const hasUrgency = urgencyWords.some(word => text.includes(word));
      
      if (hasUrgency) {
        patterns.push({
          name: 'Urgency Pressure in CTA',
          category: 'Scarcity and Urgency',
          pattern_type: 'grey',
          confidence: 70,
          description: `Button creates urgency pressure: "${button.text}"`,
          element_selector: `button:nth-child(${index + 1})`,
          recommendation: 'Only use urgency when there\'s a genuine time constraint.',
          impact: 'medium'
        });
      }
    });

    return patterns;
  }

  analyzePricingTactics(data) {
    const patterns = [];
    const bodyText = data.bodyText || '';
    const pricingElements = data.pricingElements || [];

    // Check for price anchoring (crossed-out prices)
    const hasStrikethrough = bodyText.match(/was \$\d+|originally \$\d+|\$\d+.*\$\d+/i);
    if (hasStrikethrough || pricingElements.some(el => el.includes('was') || el.includes('save'))) {
      patterns.push({
        name: 'Price Anchoring',
        category: 'Nudging',
        pattern_type: 'grey',
        confidence: 80,
        description: 'Uses high "original" prices to make current price appear as a better deal.',
        element_selector: '.price, .pricing',
        recommendation: 'Ensure original prices were genuinely offered for a reasonable period.',
        impact: 'medium'
      });
    }

    // Check for hidden fees indicators
    const hiddenFeeIndicators = [
      'additional fees', 'taxes not included', 'shipping not included',
      'processing fee', 'service charge', 'plus tax', 'excluding'
    ];
    
    const hasHiddenFees = hiddenFeeIndicators.some(indicator => 
      bodyText.toLowerCase().includes(indicator)
    );

    if (hasHiddenFees) {
      patterns.push({
        name: 'Hidden Additional Costs',
        category: 'Bait and Switch',
        pattern_type: 'dark',
        confidence: 95,
        description: 'Additional costs not clearly displayed upfront in main pricing.',
        element_selector: '.price, .pricing',
        recommendation: 'Show total cost including all fees in primary price display.',
        impact: 'high'
      });
    }

    // Check for fake scarcity
    const scarcityWords = ['only.*left', 'limited.*available', 'almost sold out', 'last.*items'];
    const hasScarcity = scarcityWords.some(pattern => 
      bodyText.toLowerCase().match(new RegExp(pattern))
    );

    if (hasScarcity) {
      patterns.push({
        name: 'Artificial Scarcity Claims',
        category: 'Scarcity and Urgency',
        pattern_type: 'grey',
        confidence: 75,
        description: 'Claims of limited availability that may be artificially created.',
        element_selector: 'body',
        recommendation: 'Only show scarcity indicators when inventory is genuinely limited.',
        impact: 'medium'
      });
    }

    return patterns;
  }

  analyzeSubscriptionPatterns(data) {
    const patterns = [];
    const bodyText = data.bodyText.toLowerCase();
    const forms = data.forms || [];

    // Check for subscription-related dark patterns
    if (bodyText.includes('free trial') || bodyText.includes('trial')) {
      // Check if credit card is required for free trial
      const requiresPayment = bodyText.includes('credit card') || 
                             bodyText.includes('payment method') ||
                             bodyText.includes('billing') ||
                             bodyText.includes('card required');

      if (requiresPayment) {
        patterns.push({
          name: 'Payment Required for Free Trial',
          category: 'Forced Continuity',
          pattern_type: 'dark',
          confidence: 90,
          description: 'Free trial requires payment information upfront.',
          element_selector: 'form, .trial',
          recommendation: 'Offer genuine free trials without requiring payment details.',
          impact: 'high'
        });
      }

      // Check for unclear cancellation process
      const hasClearCancellation = bodyText.includes('cancel anytime') ||
                                   bodyText.includes('easy cancellation') ||
                                   bodyText.includes('no commitment');

      if (!hasClearCancellation) {
        patterns.push({
          name: 'Unclear Trial Cancellation',
          category: 'Roach Motel',
          pattern_type: 'grey',
          confidence: 70,
          description: 'Free trial signup doesn\'t clearly explain cancellation process.',
          element_selector: '.trial, .subscription',
          recommendation: 'Clearly explain how to cancel before trial ends.',
          impact: 'medium'
        });
      }
    }

    return patterns;
  }

  analyzeNavigationPatterns(data) {
    const patterns = [];
    const links = data.links || [];
    const bodyText = data.bodyText.toLowerCase();

    // Check for hard-to-find unsubscribe links
    if (bodyText.includes('subscription') || bodyText.includes('newsletter') || bodyText.includes('email')) {
      const unsubscribeLinks = links.filter(link => {
        const text = link.text.toLowerCase();
        return text.includes('unsubscribe') || text.includes('cancel') || 
               text.includes('stop emails') || text.includes('opt out');
      });

      if (unsubscribeLinks.length === 0) {
        patterns.push({
          name: 'Missing Unsubscribe Option',
          category: 'Roach Motel',
          pattern_type: 'dark',
          confidence: 85,
          description: 'No clear unsubscribe or opt-out option found.',
          element_selector: 'body',
          recommendation: 'Provide easily accessible unsubscribe options.',
          impact: 'high'
        });
      }
    }

    // Check for account deletion accessibility
    if (bodyText.includes('account') || bodyText.includes('profile')) {
      const deletionLinks = links.filter(link => {
        const text = link.text.toLowerCase();
        return text.includes('delete') || text.includes('remove') || 
               text.includes('close account') || text.includes('deactivate');
      });

      if (deletionLinks.length === 0) {
        patterns.push({
          name: 'Hidden Account Deletion',
          category: 'Roach Motel',
          pattern_type: 'grey',
          confidence: 70,
          description: 'No easily accessible account deletion option found.',
          element_selector: 'body',
          recommendation: 'Provide clear account deletion options in settings.',
          impact: 'medium'
        });
      }
    }

    return patterns;
  }

  analyzeContentPatterns(data) {
    const patterns = [];
    const bodyText = data.bodyText.toLowerCase();
    const socialProofElements = data.socialProofElements || [];

    // Check for vague social proof claims
    const vagueProofPatterns = [
      /\d+k?\+?\s*customers?/gi,
      /millions?\s+of\s+users?/gi,
      /thousands?\s+of\s+customers?/gi,
      /#1\s+choice/gi,
      /most\s+popular/gi,
      /best\s+seller/gi
    ];

    vagueProofPatterns.forEach(pattern => {
      const matches = bodyText.match(pattern);
      if (matches) {
        patterns.push({
          name: 'Unverified Social Proof',
          category: 'Social Proof Manipulation',
          pattern_type: 'grey',
          confidence: 65,
          description: `Makes unverifiable claims: "${matches[0]}"`,
          element_selector: 'body',
          recommendation: 'Provide specific, verifiable social proof with sources.',
          impact: 'medium'
        });
      }
    });

    // Check for fake activity notifications
    const activityPatterns = [
      /\d+\s+people\s+(viewing|looking|bought)/gi,
      /someone\s+(just\s+)?bought/gi,
      /\d+\s+others\s+viewing/gi
    ];

    activityPatterns.forEach(pattern => {
      const matches = bodyText.match(pattern);
      if (matches) {
        patterns.push({
          name: 'Questionable Activity Claims',
          category: 'Social Proof Manipulation',
          pattern_type: 'grey',
          confidence: 80,
          description: `Shows potentially fake activity: "${matches[0]}"`,
          element_selector: '.notification, .activity',
          recommendation: 'Only show genuine, real-time activity data.',
          impact: 'medium'
        });
      }
    });

    return patterns;
  }

  analyzeAccessibilityCompliance(data) {
    const patterns = [];
    const accessibility = data.accessibilityElements || {};

    // Check image accessibility
    if (accessibility.missingAltTexts > 0) {
      const severity = accessibility.missingAltTexts > 5 ? 'high' : 'medium';
      patterns.push({
        name: 'Poor Image Accessibility',
        category: 'Accessibility Violation',
        pattern_type: 'grey',
        confidence: 100,
        description: `${accessibility.missingAltTexts} images missing alt text for screen readers.`,
        element_selector: 'img',
        recommendation: 'Add descriptive alt text to all images.',
        impact: severity
      });
    }

    // Check heading structure
    const headings = accessibility.headingStructure || {};
    if (headings.h1 === 0) {
      patterns.push({
        name: 'Missing Main Heading',
        category: 'Accessibility Violation',
        pattern_type: 'grey',
        confidence: 90,
        description: 'Page lacks proper H1 heading structure.',
        element_selector: 'body',
        recommendation: 'Add a single, descriptive H1 heading.',
        impact: 'medium'
      });
    }

    if (headings.h1 > 1) {
      patterns.push({
        name: 'Multiple Main Headings',
        category: 'Accessibility Violation',
        pattern_type: 'grey',
        confidence: 85,
        description: `Page has ${headings.h1} H1 headings, should have only one.`,
        element_selector: 'h1',
        recommendation: 'Use only one H1 heading per page.',
        impact: 'medium'
      });
    }

    return patterns;
  }

  analyzePrivacyCompliance(data) {
    const patterns = [];
    const links = data.links || [];
    const bodyText = data.bodyText.toLowerCase();

    // Check for privacy policy accessibility
    const privacyLinks = links.filter(link => {
      const text = link.text.toLowerCase();
      return text.includes('privacy') || text.includes('data protection');
    });

    if (privacyLinks.length === 0) {
      patterns.push({
        name: 'Missing Privacy Policy',
        category: 'Privacy Violation',
        pattern_type: 'dark',
        confidence: 95,
        description: 'No accessible privacy policy link found.',
        element_selector: 'body',
        recommendation: 'Provide clear, accessible privacy policy links.',
        impact: 'high'
      });
    }

    // Check for GDPR compliance indicators
    const hasGDPRCompliance = bodyText.includes('gdpr') || 
                              bodyText.includes('data protection') ||
                              bodyText.includes('your rights');

    if (!hasGDPRCompliance && privacyLinks.length === 0) {
      patterns.push({
        name: 'Potential GDPR Non-compliance',
        category: 'Privacy Violation',
        pattern_type: 'grey',
        confidence: 70,
        description: 'No clear GDPR compliance or user rights information found.',
        element_selector: 'body',
        recommendation: 'Ensure GDPR compliance with clear user rights information.',
        impact: 'medium'
      });
    }

    return patterns;
  }

  analyzePositiveDesignPatterns(data) {
    const patterns = [];
    const accessibility = data.accessibilityElements || {};
    const bodyText = data.bodyText.toLowerCase();
    const forms = data.forms || [];

    // Good accessibility practices
    if (accessibility.altTexts > 0 && accessibility.missingAltTexts === 0) {
      patterns.push({
        name: 'Excellent Image Accessibility',
        category: 'Accessibility Excellence',
        pattern_type: 'white',
        confidence: 100,
        description: `All ${accessibility.altTexts} images have descriptive alt text.`,
        element_selector: 'img',
        recommendation: 'Continue maintaining excellent accessibility standards.',
        impact: 'positive'
      });
    }

    // Clear privacy communication
    const privacyPositiveWords = [
      'we respect your privacy', 'protect your data', 'transparent',
      'your privacy matters', 'secure your information'
    ];
    
    const hasPrivacyPositives = privacyPositiveWords.some(phrase => 
      bodyText.includes(phrase)
    );

    if (hasPrivacyPositives) {
      patterns.push({
        name: 'Clear Privacy Communication',
        category: 'Privacy Transparency',
        pattern_type: 'white',
        confidence: 85,
        description: 'Website clearly communicates privacy practices and user data protection.',
        element_selector: 'body',
        recommendation: 'Continue transparent privacy communication.',
        impact: 'positive'
      });
    }

    // Honest pricing practices
    const hasTransparentPricing = bodyText.includes('no hidden fees') ||
                                  bodyText.includes('all inclusive') ||
                                  bodyText.includes('transparent pricing');

    if (hasTransparentPricing) {
      patterns.push({
        name: 'Transparent Pricing',
        category: 'Honest Marketing',
        pattern_type: 'white',
        confidence: 90,
        description: 'Website promotes transparent pricing without hidden costs.',
        element_selector: '.pricing, .price',
        recommendation: 'Continue honest pricing practices.',
        impact: 'positive'
      });
    }

    return patterns;
  }

  calculateOverallScore(patterns) {
    const darkPatterns = patterns.filter(p => p.pattern_type === 'dark').length;
    const greyPatterns = patterns.filter(p => p.pattern_type === 'grey').length;
    const whitePatterns = patterns.filter(p => p.pattern_type === 'white').length;
    
    // Calculate score (100 = best, 0 = worst)
    const darkPenalty = darkPatterns * 15;
    const greyPenalty = greyPatterns * 8;
    const whiteBonus = whitePatterns * 5;
    
    const totalScore = Math.max(0, Math.min(100, 100 - darkPenalty - greyPenalty + whiteBonus));
    
    return {
      dark_patterns: darkPatterns,
      grey_patterns: greyPatterns,
      white_patterns: whitePatterns,
      total_score: totalScore
    };
  }

  generateSummary(score, patterns) {
    const darkCount = score.dark_patterns;
    const greyCount = score.grey_patterns;
    const whiteCount = score.white_patterns;
    const totalScore = score.total_score;

    // Get specific pattern names for detailed summary
    const darkPatterns = patterns.filter(p => p.pattern_type === 'dark').map(p => p.name);
    const greyPatterns = patterns.filter(p => p.pattern_type === 'grey').map(p => p.name);
    const whitePatterns = patterns.filter(p => p.pattern_type === 'white').map(p => p.name);

    let summary = `Analysis found ${darkCount} dark patterns, ${greyCount} grey patterns, and ${whiteCount} positive patterns. Score: ${totalScore}/100.\n\n`;

    if (darkPatterns.length > 0) {
      summary += `🚨 DARK PATTERNS DETECTED:\n${darkPatterns.map(p => `• ${p}`).join('\n')}\n\n`;
    }

    if (greyPatterns.length > 0) {
      summary += `⚠️ CONCERNING PATTERNS:\n${greyPatterns.map(p => `• ${p}`).join('\n')}\n\n`;
    }

    if (whitePatterns.length > 0) {
      summary += `✅ POSITIVE PATTERNS:\n${whitePatterns.map(p => `• ${p}`).join('\n')}\n\n`;
    }

    // Overall assessment
    if (totalScore >= 80) {
      summary += `ASSESSMENT: Good ethical design with minor issues to address.`;
    } else if (totalScore >= 60) {
      summary += `ASSESSMENT: Moderate ethical concerns - improvements recommended.`;
    } else if (totalScore >= 40) {
      summary += `ASSESSMENT: Significant ethical issues - major changes needed.`;
    } else {
      summary += `ASSESSMENT: Poor ethical design - complete redesign recommended.`;
    }

    return summary;
  }

  initializeDarkPatterns() {
    return [
      'Bait and Switch', 'Roach Motel', 'Privacy Zuckering', 'Price Comparison Prevention',
      'Misdirection', 'Hidden Costs', 'Sneak into Basket', 'Friend Spam',
      'Forced Continuity', 'Confirm-shaming', 'Disguised Ads', 'Trick Questions'
    ];
  }

  initializeGreyPatterns() {
    return [
      'Social Proof', 'Scarcity and Urgency', 'Default Settings', 'Nudging',
      'Progress Indicators', 'Gamification', 'Attention Grabbing', 'Interface Interference'
    ];
  }

  initializeWhitePatterns() {
    return [
      'Clear Privacy Policy', 'Easy Unsubscribe', 'Transparent Pricing', 'Accessible Design',
      'User Control', 'Honest Marketing', 'Clear Navigation', 'Respectful Notifications'
    ];
  }
} 