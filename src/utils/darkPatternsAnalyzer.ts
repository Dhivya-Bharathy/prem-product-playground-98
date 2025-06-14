
import { AnalysisResults, AnalysisProgress, DarkPattern } from "@/types/darkPatterns";

const mockPatterns: DarkPattern[] = [
  {
    id: "1",
    pattern_type: "dark",
    name: "Confirmshaming",
    element_selector: "#newsletter-decline",
    description: "Uses guilt-tripping language like 'No, I don't want to save money' for opt-out options",
    confidence: 92,
    recommendation: "Use neutral language like 'No thanks' or 'Skip for now'",
    category: "Emotional Manipulation"
  },
  {
    id: "2",
    pattern_type: "dark",
    name: "Hidden Costs",
    element_selector: ".checkout-summary",
    description: "Additional fees and charges are only revealed at the final checkout step",
    confidence: 88,
    recommendation: "Display all costs upfront and provide a clear pricing breakdown",
    category: "Pricing Deception"
  },
  {
    id: "3",
    pattern_type: "grey",
    name: "Pre-checked Boxes",
    element_selector: "#marketing-consent",
    description: "Marketing consent checkbox is pre-selected, requiring users to actively opt-out",
    confidence: 76,
    recommendation: "Use unchecked boxes by default and require explicit consent",
    category: "Default Settings"
  },
  {
    id: "4",
    pattern_type: "grey",
    name: "Fake Urgency",
    element_selector: ".countdown-timer",
    description: "Countdown timer creates false sense of urgency without real deadline",
    confidence: 82,
    recommendation: "Only use timers for genuine limited-time offers with real deadlines",
    category: "Artificial Scarcity"
  },
  {
    id: "5",
    pattern_type: "white",
    name: "Clear Privacy Controls",
    element_selector: ".privacy-settings",
    description: "Privacy settings are easily accessible with clear explanations",
    confidence: 95,
    category: "Transparency"
  },
  {
    id: "6",
    pattern_type: "white",
    name: "Accessible Design",
    element_selector: "main",
    description: "Website follows accessibility guidelines with proper contrast and navigation",
    confidence: 89,
    category: "Accessibility"
  }
];

export const mockAnalyzeWebsite = async (
  url: string, 
  onProgress: (progress: AnalysisProgress) => void
): Promise<AnalysisResults> => {
  const stages = [
    { stage: 'initializing' as const, progress: 10, message: 'Initializing analysis...' },
    { stage: 'scraping' as const, progress: 30, message: 'Scraping website content...' },
    { stage: 'analyzing' as const, progress: 70, message: 'Analyzing design patterns...' },
    { stage: 'completed' as const, progress: 100, message: 'Analysis complete!' }
  ];

  for (const stage of stages) {
    onProgress(stage);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Simulate different results based on URL
  const isDemoSite = url.includes('example') || url.includes('demo');
  const patternsToShow = isDemoSite 
    ? mockPatterns 
    : mockPatterns.filter((_, index) => Math.random() > 0.3); // Random subset

  const darkPatterns = patternsToShow.filter(p => p.pattern_type === 'dark').length;
  const greyPatterns = patternsToShow.filter(p => p.pattern_type === 'grey').length;
  const whitePatterns = patternsToShow.filter(p => p.pattern_type === 'white').length;

  // Calculate overall score (lower is better for dark patterns)
  const totalScore = Math.max(0, 100 - (darkPatterns * 25) - (greyPatterns * 10) + (whitePatterns * 5));

  const getSummary = () => {
    if (totalScore >= 80) {
      return "This website demonstrates excellent ethical design practices with transparent user interfaces and clear consent mechanisms.";
    } else if (totalScore >= 60) {
      return "This website has room for improvement in ethical design. Some patterns may confuse or mislead users.";
    } else if (totalScore >= 40) {
      return "This website contains several concerning design patterns that may manipulate user behavior and decision-making.";
    } else {
      return "This website exhibits multiple dark patterns that deliberately deceive and manipulate users. Significant redesign is recommended.";
    }
  };

  return {
    url,
    screenshot: "/placeholder.svg",
    timestamp: new Date().toISOString(),
    patterns_detected: patternsToShow,
    overall_score: {
      dark_patterns: darkPatterns,
      grey_patterns: greyPatterns,
      white_patterns: whitePatterns,
      total_score: Math.round(totalScore)
    },
    summary: getSummary()
  };
};
