
export interface ProdZTerm {
  id: string;
  name: string;
  pronunciation: string;
  category: 'deceptive' | 'design' | 'behavioral';
  definition: string;
  examples: string[];
  howToSpot?: string;
  whenToUse?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

export const prodzSlangTerms: ProdZTerm[] = [
  // Deceptive or Manipulative UX Concepts
  {
    id: 'enshittification',
    name: 'Enshittification',
    pronunciation: 'en-SHIT-uh-fuh-KAY-shuhn',
    category: 'deceptive',
    definition: 'The gradual degradation of a platform\'s quality as it prioritizes profit over user experience.',
    examples: [
      'Social media platforms reducing organic reach to push paid content',
      'Streaming services removing content while raising subscription prices',
      'Free apps adding intrusive ads and premium features behind paywalls'
    ],
    howToSpot: 'Look for platforms that were once great but now feel bloated, ad-heavy, or feature-limited unless you pay.',
    difficulty: 'intermediate',
    tags: ['platform', 'monetization', 'user-experience']
  },
  {
    id: 'confirmshaming',
    name: 'Confirmshaming',
    pronunciation: 'kuhn-FURM-shay-ming',
    category: 'deceptive',
    definition: 'Using guilt or shame to manipulate users into taking a desired action through emotionally loaded language.',
    examples: [
      '"No thanks, I don\'t want to save money" button',
      '"Skip this step and miss out on exclusive deals"',
      '"No, I prefer to stay uninformed" for newsletter signups'
    ],
    howToSpot: 'Decline buttons that make you feel bad about saying no or imply you\'re missing out.',
    difficulty: 'beginner',
    tags: ['manipulation', 'psychology', 'cta']
  },
  {
    id: 'dark-patterns',
    name: 'Dark Patterns',
    pronunciation: 'dahrk PAT-ernz',
    category: 'deceptive',
    definition: 'Deceptive UX design tricks that manipulate users into doing things they didn\'t intend to do.',
    examples: [
      'Hidden subscription fees',
      'Making it hard to cancel subscriptions',
      'Pre-checked boxes for unwanted services'
    ],
    howToSpot: 'Any design that feels deliberately confusing or makes you do something you didn\'t want to do.',
    difficulty: 'beginner',
    tags: ['manipulation', 'ethics', 'design']
  },
  {
    id: 'zombie-features',
    name: 'Zombie Features',
    pronunciation: 'ZOM-bee FEE-cherz',
    category: 'deceptive',
    definition: 'Product features that are technically alive but essentially dead - unused by most users but still maintained.',
    examples: [
      'Google+ integration that nobody used',
      'Facebook\'s Poke feature',
      'Complex enterprise software modules gathering dust'
    ],
    howToSpot: 'Features that exist in the product but feel outdated, confusing, or completely ignored by users.',
    difficulty: 'intermediate',
    tags: ['product-management', 'feature-bloat', 'maintenance']
  },
  {
    id: 'consent-theater',
    name: 'Consent Theater',
    pronunciation: 'kuhn-SENT THEE-uh-ter',
    category: 'deceptive',
    definition: 'Cookie banners and privacy notices designed to look compliant but actually manipulate users into accepting all tracking.',
    examples: [
      'Cookie banners with huge "Accept All" buttons and tiny "Manage Preferences"',
      'Privacy settings buried deep in menus',
      'Pre-selected consent checkboxes'
    ],
    howToSpot: 'Privacy controls that make it way easier to accept everything than to customize your preferences.',
    difficulty: 'intermediate',
    tags: ['privacy', 'compliance', 'manipulation']
  },
  {
    id: 'ux-washing',
    name: 'UX Washing',
    pronunciation: 'YOO-eks WASH-ing',
    category: 'deceptive',
    definition: 'Superficial design improvements that mask underlying problems without actually fixing user experience issues.',
    examples: [
      'Beautiful UI redesigns that don\'t improve functionality',
      'Adding animations to distract from slow loading times',
      'Trendy design elements that make navigation harder'
    ],
    howToSpot: 'Products that look modern and sleek but still feel frustrating or confusing to use.',
    difficulty: 'advanced',
    tags: ['design', 'superficial', 'user-experience']
  },
  {
    id: 'roach-motel',
    name: 'Roach Motel',
    pronunciation: 'rohch moh-TEL',
    category: 'deceptive',
    definition: 'Easy to get into, hard to get out of - making sign-up simple but cancellation nearly impossible.',
    examples: [
      'Gym memberships requiring in-person cancellation',
      'Subscription services with no online cancellation option',
      'Software trials that auto-renew with hidden cancellation processes'
    ],
    howToSpot: 'Services where signing up takes one click but canceling requires calling customer service.',
    difficulty: 'beginner',
    tags: ['subscription', 'cancellation', 'friction']
  },
  {
    id: 'bait-and-switch',
    name: 'Bait and Switch',
    pronunciation: 'bayt and swich',
    category: 'deceptive',
    definition: 'Advertising one thing to attract users, then presenting them with something different or less valuable.',
    examples: [
      'Free trial that requires credit card and immediately starts charging',
      'Job postings for remote work that turn out to be office-based',
      'Sale prices that require purchasing multiple items'
    ],
    howToSpot: 'When the actual offering doesn\'t match what was initially advertised or promised.',
    difficulty: 'beginner',
    tags: ['advertising', 'deception', 'marketing']
  },
  {
    id: 'sneak-into-basket',
    name: 'Sneak into Basket',
    pronunciation: 'sneek IN-too BAS-kit',
    category: 'deceptive',
    definition: 'Adding unwanted items, insurance, or services to a user\'s cart without clear consent.',
    examples: [
      'Travel insurance automatically added to flight bookings',
      'Extended warranties pre-selected during checkout',
      'Donation amounts added to online purchases'
    ],
    howToSpot: 'Extra charges in your cart that you didn\'t explicitly add yourself.',
    difficulty: 'beginner',
    tags: ['ecommerce', 'checkout', 'manipulation']
  },
  {
    id: 'dynamic-discrimination',
    name: 'Dynamic Discrimination',
    pronunciation: 'dahy-NAM-ik dih-skrim-uh-NAY-shuhn',
    category: 'deceptive',
    definition: 'Showing different prices or content to different users based on their data profile or perceived value.',
    examples: [
      'Higher prices shown to users with expensive devices',
      'Different mortgage rates based on browsing history',
      'Targeted ads for predatory financial products'
    ],
    howToSpot: 'When you and your friends see different prices for the same product or service.',
    difficulty: 'advanced',
    tags: ['pricing', 'discrimination', 'personalization']
  },

  // UX & Product Design Concepts
  {
    id: 'bright-patterns',
    name: 'Bright Patterns',
    pronunciation: 'brahyt PAT-ernz',
    category: 'design',
    definition: 'Ethical design patterns that genuinely help users achieve their goals without manipulation.',
    examples: [
      'Clear unsubscribe links in emails',
      'Honest progress indicators',
      'Transparent pricing with no hidden fees'
    ],
    whenToUse: 'Always! These should be the default approach to UX design.',
    difficulty: 'beginner',
    tags: ['ethics', 'design', 'user-friendly']
  },
  {
    id: 'friction-as-feature',
    name: 'Friction as a Feature',
    pronunciation: 'FRIK-shuhn az uh FEE-cher',
    category: 'design',
    definition: 'Intentionally adding steps or delays to prevent impulsive actions and encourage thoughtful decisions.',
    examples: [
      'Confirmation dialogs before deleting important data',
      'Cooling-off periods for large purchases',
      'Two-factor authentication for security'
    ],
    whenToUse: 'For high-stakes actions where users benefit from taking a moment to think.',
    difficulty: 'intermediate',
    tags: ['intentional', 'safety', 'user-protection']
  },
  {
    id: 'ux-friction',
    name: 'UX Friction',
    pronunciation: 'YOO-eks FRIK-shuhn',
    category: 'design',
    definition: 'Any element in the user experience that slows down or complicates the user\'s journey.',
    examples: [
      'Too many form fields',
      'Confusing navigation menus',
      'Slow loading times'
    ],
    howToSpot: 'Moments where you feel stuck, confused, or frustrated while using a product.',
    difficulty: 'beginner',
    tags: ['usability', 'obstacles', 'user-journey']
  },
  {
    id: 'banner-blindness',
    name: 'Banner Blindness',
    pronunciation: 'BAN-er BLAHYND-nis',
    category: 'design',
    definition: 'Users\' tendency to ignore banner-like information, whether it\'s ads or important site content.',
    examples: [
      'Users ignoring website headers',
      'Missing important notifications that look like ads',
      'Overlooking promotional content'
    ],
    howToSpot: 'When users consistently miss important information placed in banner-like locations.',
    difficulty: 'intermediate',
    tags: ['attention', 'visual-hierarchy', 'ads']
  },
  {
    id: 'decoy-option',
    name: 'Decoy Option',
    pronunciation: 'DEE-koi OP-shuhn',
    category: 'design',
    definition: 'A pricing option designed to make another option look more attractive by comparison.',
    examples: [
      'Movie theater pricing: Small $6, Medium $6.50, Large $7',
      'Software plans where the middle tier is barely cheaper than premium',
      'Subscription tiers designed to push users toward the most expensive option'
    ],
    whenToUse: 'In pricing strategies to guide user choice toward preferred options.',
    difficulty: 'intermediate',
    tags: ['pricing', 'psychology', 'choice-architecture']
  },
  {
    id: 'skeuomorphism',
    name: 'Skeuomorphism',
    pronunciation: 'skyoo-uh-MAWR-fiz-uhm',
    category: 'design',
    definition: 'Design that mimics real-world objects to help users understand digital interfaces.',
    examples: [
      'Trash can icons for delete functions',
      'Folder icons for file organization',
      'Leather textures in early iOS apps'
    ],
    whenToUse: 'When introducing completely new digital concepts that benefit from real-world metaphors.',
    difficulty: 'intermediate',
    tags: ['visual-design', 'metaphor', 'familiarity']
  },
  {
    id: 'recognition-over-recall',
    name: 'Recognition Over Recall',
    pronunciation: 'rek-uhg-NISH-uhn OH-ver ri-KAWL',
    category: 'design',
    definition: 'Making it easier for users to recognize options rather than remember them from scratch.',
    examples: [
      'Dropdown menus instead of requiring typed input',
      'Recently used files lists',
      'Auto-complete search suggestions'
    ],
    whenToUse: 'Whenever you can show users their options instead of making them remember.',
    difficulty: 'beginner',
    tags: ['usability', 'memory', 'interface-design']
  },
  {
    id: 'ikea-effect',
    name: 'IKEA Effect',
    pronunciation: 'eye-KEE-uh ih-FEKT',
    category: 'design',
    definition: 'Users value products more when they\'ve participated in creating or customizing them.',
    examples: [
      'Profile setup wizards',
      'Customizable dashboards',
      'Build-your-own pricing plans'
    ],
    whenToUse: 'In onboarding flows or product customization to increase user investment.',
    difficulty: 'intermediate',
    tags: ['psychology', 'engagement', 'customization']
  },
  {
    id: 'microinteractions',
    name: 'Microinteractions',
    pronunciation: 'MAHY-kroh-in-ter-AK-shuhnz',
    category: 'design',
    definition: 'Small, functional animations that provide feedback and enhance the user experience.',
    examples: [
      'Button hover effects',
      'Pull-to-refresh animations',
      'Like button animations on social media'
    ],
    whenToUse: 'To provide feedback, guide attention, or add delight to routine interactions.',
    difficulty: 'beginner',
    tags: ['animation', 'feedback', 'delight']
  },

  // Psychological & Behavioral Principles
  {
    id: 'survivorship-bias',
    name: 'Survivorship Bias',
    pronunciation: 'ser-VAHY-ver-ship BAHY-uhs',
    category: 'behavioral',
    definition: 'Focusing on successful examples while ignoring failures, leading to false conclusions.',
    examples: [
      'Only showcasing successful user testimonials',
      'Startup advice based only on unicorn companies',
      'Product decisions based on power users only'
    ],
    howToSpot: 'When data or examples seem too good to be true or only show positive outcomes.',
    difficulty: 'advanced',
    tags: ['bias', 'data', 'decision-making']
  },
  {
    id: 'juxtaposition',
    name: 'Juxtaposition',
    pronunciation: 'juhk-stuh-puh-ZISH-uhn',
    category: 'behavioral',
    definition: 'Placing contrasting elements side by side to highlight differences and influence perception.',
    examples: [
      'Before/after product comparisons',
      'Free vs. premium feature lists',
      'Competitor comparison charts'
    ],
    whenToUse: 'To highlight value propositions or demonstrate product benefits clearly.',
    difficulty: 'beginner',
    tags: ['comparison', 'contrast', 'messaging']
  },
  {
    id: 'occams-razor',
    name: 'Occam\'s Razor',
    pronunciation: 'OK-uhmz RAY-zer',
    category: 'behavioral',
    definition: 'The simplest solution is usually the best one - prefer simple explanations over complex ones.',
    examples: [
      'Choosing simple user flows over complex ones',
      'Minimal feature sets for MVP launches',
      'Clear, straightforward copy over clever messaging'
    ],
    whenToUse: 'When deciding between multiple solutions or trying to simplify complex problems.',
    difficulty: 'beginner',
    tags: ['simplicity', 'problem-solving', 'design-philosophy']
  },
  {
    id: 'streisand-effect',
    name: 'Streisand Effect',
    pronunciation: 'STRAHY-sand ih-FEKT',
    category: 'behavioral',
    definition: 'Attempts to hide or remove information backfire and instead draw more attention to it.',
    examples: [
      'Trying to delete viral negative reviews',
      'Removing user-generated content that then gets reposted everywhere',
      'Legal threats that create more publicity'
    ],
    howToSpot: 'When efforts to suppress information make it spread even more widely.',
    difficulty: 'intermediate',
    tags: ['viral', 'publicity', 'crisis-management']
  }
];

export const categories = [
  { id: 'all', name: 'All Terms', count: prodzSlangTerms.length },
  { id: 'deceptive', name: 'Dark Patterns', count: prodzSlangTerms.filter(t => t.category === 'deceptive').length },
  { id: 'design', name: 'Design Concepts', count: prodzSlangTerms.filter(t => t.category === 'design').length },
  { id: 'behavioral', name: 'Behavioral Principles', count: prodzSlangTerms.filter(t => t.category === 'behavioral').length }
];
