
export interface ProdZTerm {
  id: string;
  name: string;
  pronunciation: string;
  definition: string;
  examples: string[];
  category: 'deceptive' | 'design' | 'behavioral';
  tags: string[];
  howToSpot?: string;
  whenToUse?: string;
}

export const prodzSlangTerms: ProdZTerm[] = [
  // Deceptive or Manipulative UX Concepts
  {
    id: 'enshittification',
    name: 'Enshittification',
    pronunciation: 'en-SHIT-ih-fi-KAY-shun',
    definition: 'The gradual degradation of a platform or service as it prioritizes profits over user experience, typically following a pattern of being good to users, then abusing users to benefit business customers, then abusing business customers to benefit shareholders.',
    examples: [
      'Social media platforms reducing organic reach to push paid promotion',
      'Streaming services removing content while increasing subscription prices',
      'Free apps becoming unusable without premium subscriptions'
    ],
    category: 'deceptive',
    tags: ['platform decay', 'profit maximization', 'user exploitation'],
    howToSpot: 'Look for platforms that were once user-friendly becoming increasingly restrictive, expensive, or ad-heavy over time.'
  },
  {
    id: 'confirmshaming',
    name: 'Confirmshaming',
    pronunciation: 'kuhn-FURM-shay-ming',
    definition: 'A dark pattern that uses guilt, shame, or fear to manipulate users into taking a desired action by making the alternative option sound negative or embarrassing.',
    examples: [
      '"No thanks, I don\'t want to save money" vs "Yes, show me deals"',
      '"Skip this step, I don\'t care about security" on 2FA setup',
      '"No, I prefer paying full price" on discount popups'
    ],
    category: 'deceptive',
    tags: ['emotional manipulation', 'guilt tripping', 'conversion optimization'],
    howToSpot: 'The decline option is written in a way that makes you feel bad, stupid, or irresponsible for choosing it.'
  },
  {
    id: 'assumeshit',
    name: 'Assumeshit',
    pronunciation: 'uh-SOOM-shit',
    definition: 'Making assumptions about user behavior, preferences, or needs without proper research or validation, often leading to poor product decisions and user experience failures.',
    examples: [
      'Designing features based on what the team thinks users want without user research',
      'Assuming all users have fast internet connections when building heavy interfaces',
      'Building complex workflows because "power users will love the control"'
    ],
    category: 'behavioral',
    tags: ['user research', 'assumptions', 'validation failure'],
    howToSpot: 'When product decisions are made based on internal opinions rather than user data or research.'
  },
  {
    id: 'confirmload',
    name: 'Confirmload',
    pronunciation: 'kuhn-FURM-lohd',
    definition: 'Overwhelming users with excessive confirmation dialogs, pop-ups, and decision points that create cognitive overload and decision fatigue.',
    examples: [
      'Multiple confirmation steps for simple actions like deleting a photo',
      'Pop-ups asking to confirm every small preference change',
      'Endless cookie consent banners with dozens of toggle options'
    ],
    category: 'deceptive',
    tags: ['decision fatigue', 'cognitive overload', 'confirmation dialogs'],
    howToSpot: 'When users face multiple confirmation steps for routine actions, causing frustration and abandonment.'
  },
  {
    id: 'nagging',
    name: 'Nagging',
    pronunciation: 'NAG-ing',
    definition: 'Persistently bothering users with repetitive notifications, prompts, or requests to perform actions they\'ve already declined or ignored.',
    examples: [
      'Daily push notifications asking to rate the app after dismissing multiple times',
      'Constant pop-ups to upgrade to premium after saying "not now"',
      'Repeated email requests to complete profile setup'
    ],
    category: 'deceptive',
    tags: ['user harassment', 'persistent prompts', 'notification spam'],
    howToSpot: 'When the same request or notification keeps appearing despite user dismissal or rejection.'
  },
  {
    id: 'dark-patterns',
    name: 'Dark Patterns',
    pronunciation: 'dahrk PAT-urnz',
    definition: 'User interfaces designed to trick users into doing things they didn\'t intend to do, often for the benefit of the company at the user\'s expense.',
    examples: [
      'Hidden subscription fees in checkout flows',
      'Making unsubscribe buttons hard to find or non-functional',
      'Pre-checked boxes for additional purchases'
    ],
    category: 'deceptive',
    tags: ['UX manipulation', 'user deception', 'conversion tricks'],
    howToSpot: 'If you feel confused, frustrated, or tricked while using an interface, it might be employing dark patterns.'
  },
  {
    id: 'zombie-features',
    name: 'Zombie Features',
    pronunciation: 'ZOM-bee FEE-churz',
    definition: 'Features that should be dead (removed) but continue to exist in a product, consuming resources and cluttering the user experience without providing real value.',
    examples: [
      'Outdated social sharing buttons that nobody uses',
      'Legacy integrations maintained for a handful of users',
      'Complex settings that 99% of users never touch'
    ],
    category: 'design',
    tags: ['feature bloat', 'technical debt', 'product maintenance'],
    howToSpot: 'Features with extremely low usage metrics that still require maintenance and confuse new users.'
  },
  {
    id: 'consent-theater',
    name: 'Consent Theater',
    pronunciation: 'kuhn-SENT THEE-uh-ter',
    definition: 'The practice of creating an illusion of user choice and control over data privacy while actually making it difficult or impossible to meaningfully opt out.',
    examples: [
      'Cookie banners with 200+ vendor toggles buried in submenus',
      'Privacy settings that reset after updates',
      'Reject all buttons that don\'t actually reject all cookies'
    ],
    category: 'deceptive',
    tags: ['privacy washing', 'fake consent', 'compliance theater'],
    howToSpot: 'When privacy controls are overly complex, reset frequently, or don\'t actually prevent data collection.'
  },
  {
    id: 'ux-washing',
    name: 'UX Washing',
    pronunciation: 'YOO-eks WASH-ing',
    definition: 'Superficial design changes that make a product appear more user-friendly without addressing underlying usability issues or user needs.',
    examples: [
      'Adding trendy animations to a fundamentally broken workflow',
      'Redesigning the interface while ignoring core functionality problems',
      'Using design thinking buzzwords without actual user research'
    ],
    category: 'deceptive',
    tags: ['surface-level design', 'fake UX', 'design theater'],
    howToSpot: 'When visual improvements mask rather than solve actual user problems.'
  },
  {
    id: 'roach-motel',
    name: 'Roach Motel',
    pronunciation: 'rohch moh-TEL',
    definition: 'A design pattern that makes it easy to get into a situation but difficult or impossible to get out of it.',
    examples: [
      'Easy one-click subscription signup but complex cancellation process',
      'Hotel booking sites that save your payment info automatically',
      'Free trials that require credit card and are hard to cancel'
    ],
    category: 'deceptive',
    tags: ['user trapping', 'cancellation friction', 'subscription traps'],
    howToSpot: 'When the entry process is smooth but the exit process is deliberately complicated.'
  },
  {
    id: 'bait-and-switch',
    name: 'Bait and Switch',
    pronunciation: 'bayt and swich',
    definition: 'Advertising one thing but delivering another, often used in digital interfaces to mislead users about what they\'re clicking or buying.',
    examples: [
      'Download buttons that lead to ads instead of actual downloads',
      'Free trial buttons that immediately charge without clear warning',
      'Product images that don\'t match the actual item description'
    ],
    category: 'deceptive',
    tags: ['false advertising', 'misleading CTAs', 'user deception'],
    howToSpot: 'When what you expected to happen differs significantly from what actually happens.'
  },
  {
    id: 'sneak-into-basket',
    name: 'Sneak into Basket',
    pronunciation: 'sneek IN-too BAS-ket',
    definition: 'Adding additional items or services to a user\'s cart without their explicit consent, often during checkout.',
    examples: [
      'Insurance automatically added to travel bookings',
      'Extended warranties pre-selected on electronics purchases',
      'Service fees added at the last step of checkout'
    ],
    category: 'deceptive',
    tags: ['hidden costs', 'unwanted additions', 'checkout manipulation'],
    howToSpot: 'Extra charges or items appearing in your cart that you didn\'t deliberately add.'
  },
  {
    id: 'dynamic-discrimination',
    name: 'Dynamic Discrimination',
    pronunciation: 'dahy-NAM-ik dih-skrim-uh-NAY-shuhn',
    definition: 'Using algorithms to show different prices, content, or experiences to different users based on their perceived ability to pay or other characteristics.',
    examples: [
      'Higher prices shown to users on expensive devices',
      'Different loan rates based on zip code or browsing history',
      'Premium content access varying by user demographics'
    ],
    category: 'deceptive',
    tags: ['algorithmic bias', 'price discrimination', 'personalized exploitation'],
    howToSpot: 'When prices or options change based on your location, device, or browsing behavior.'
  },

  // UX & Product Design Concepts
  {
    id: 'bright-patterns',
    name: 'Bright Patterns',
    pronunciation: 'brahyt PAT-urnz',
    definition: 'User interface design patterns that are transparent, honest, and genuinely helpful to users, prioritizing user needs over business metrics.',
    examples: [
      'Clear, honest pricing with no hidden fees',
      'Easy unsubscribe options prominently displayed',
      'Transparent data usage and privacy controls'
    ],
    category: 'design',
    tags: ['ethical design', 'user advocacy', 'transparent UX'],
    whenToUse: 'When building trust and long-term user relationships is more important than short-term conversions.'
  },
  {
    id: 'friction-as-feature',
    name: 'Friction as a Feature',
    pronunciation: 'FRIK-shuhn az uh FEE-chur',
    definition: 'Intentionally adding steps or resistance to prevent users from making hasty decisions they might regret, especially for irreversible actions.',
    examples: [
      'Confirmation dialogs for deleting important data',
      'Cooling-off periods for large purchases',
      'Multi-step verification for account deletion'
    ],
    category: 'design',
    tags: ['intentional friction', 'user protection', 'decision architecture'],
    whenToUse: 'For high-stakes actions where user protection outweighs convenience.'
  },
  {
    id: 'ux-friction',
    name: 'UX Friction',
    pronunciation: 'YOO-eks FRIK-shuhn',
    definition: 'Any point in the user experience that slows down or impedes the user from completing their intended task.',
    examples: [
      'Loading screens that take too long',
      'Complex multi-step forms for simple tasks',
      'Too many confirmation prompts for routine actions'
    ],
    category: 'design',
    tags: ['usability barriers', 'user flow', 'conversion killers'],
    howToSpot: 'Points where users commonly drop off, hesitate, or express frustration.'
  },
  {
    id: 'banner-blindness',
    name: 'Banner Blindness',
    pronunciation: 'BAN-er BLAHYND-nis',
    definition: 'The tendency for users to ignore banner-like information or advertisements, often extending to important interface elements that look like ads.',
    examples: [
      'Users missing important notifications styled like ads',
      'Call-to-action buttons ignored because they look promotional',
      'Help text formatted like banner ads being overlooked'
    ],
    category: 'behavioral',
    tags: ['attention patterns', 'ad avoidance', 'visual hierarchy'],
    howToSpot: 'When important interface elements are consistently ignored by users.'
  },
  {
    id: 'decoy-option',
    name: 'Decoy Option',
    pronunciation: 'DEE-koi OP-shuhn',
    definition: 'A pricing or feature option deliberately made less attractive to make another option seem like better value by comparison.',
    examples: [
      'Movie theater pricing: Small $6, Medium $6.50, Large $7',
      'Software plans where the middle tier makes premium look cheap',
      'Subscription tiers designed to push users toward the most expensive option'
    ],
    category: 'behavioral',
    tags: ['pricing psychology', 'choice architecture', 'anchoring effect'],
    whenToUse: 'In pricing strategies to guide users toward preferred options.'
  },
  {
    id: 'skeuomorphism',
    name: 'Skeuomorphism',
    pronunciation: 'skyoo-uh-MAWR-fizm',
    definition: 'Design approach that makes digital interfaces resemble their real-world counterparts to help users understand functionality.',
    examples: [
      'Trash can icons for delete functions',
      'Calendar apps that look like physical calendars',
      'Note-taking apps with paper and pen aesthetics'
    ],
    category: 'design',
    tags: ['visual metaphors', 'familiarity', 'interface design'],
    whenToUse: 'When introducing users to new digital concepts that have physical analogs.'
  },
  {
    id: 'recognition-over-recall',
    name: 'Recognition Over Recall',
    pronunciation: 'rek-uhg-NISH-uhn OH-ver ri-KAWL',
    definition: 'Design principle that suggests showing users options to recognize rather than making them remember information from memory.',
    examples: [
      'Dropdown menus instead of text input fields',
      'Visual icons with labels rather than text-only menus',
      'Recently used items lists instead of search-only interfaces'
    ],
    category: 'design',
    tags: ['cognitive load', 'usability principles', 'memory aids'],
    whenToUse: 'For improving usability in interfaces with many options or complex workflows.'
  },
  {
    id: 'ikea-effect',
    name: 'IKEA Effect',
    pronunciation: 'eye-KEE-uh ih-FEKT',
    definition: 'The tendency for people to value things more highly when they\'ve contributed effort to creating or customizing them.',
    examples: [
      'User onboarding that involves setup choices',
      'Customizable dashboards and interfaces',
      'Profile creation and personalization features'
    ],
    category: 'behavioral',
    tags: ['user investment', 'customization', 'ownership psychology'],
    whenToUse: 'To increase user engagement and product attachment through customization.'
  },
  {
    id: 'microinteractions',
    name: 'Microinteractions',
    pronunciation: 'MAHY-kroh-in-ter-AK-shuhnz',
    definition: 'Small, functional animations or design elements that provide feedback, guide tasks, or enhance the overall user experience.',
    examples: [
      'Button hover states and click animations',
      'Form field validation feedback',
      'Loading animations and progress indicators'
    ],
    category: 'design',
    tags: ['interaction design', 'user feedback', 'interface polish'],
    whenToUse: 'To provide immediate feedback and make interfaces feel more responsive and engaging.'
  },

  // Psychological & Behavioral Principles
  {
    id: 'survivorship-bias',
    name: 'Survivorship Bias',
    pronunciation: 'ser-VAHY-ver-ship BAHY-uhs',
    definition: 'The logical error of concentrating on entities that survived a selection process while overlooking those that didn\'t, leading to false conclusions.',
    examples: [
      'Only featuring successful user testimonials on landing pages',
      'Startup advice based only on successful companies',
      'Product decisions based only on active user feedback'
    ],
    category: 'behavioral',
    tags: ['cognitive bias', 'data interpretation', 'selection bias'],
    howToSpot: 'When conclusions are drawn from incomplete data that excludes failures or dropouts.'
  },
  {
    id: 'juxtaposition',
    name: 'Juxtaposition',
    pronunciation: 'juhk-stuh-puh-ZISH-uhn',
    definition: 'Placing two contrasting elements side by side to highlight their differences and influence user perception or decision-making.',
    examples: [
      'Before/after images in product demos',
      'Free vs. premium feature comparisons',
      'Competitor pricing tables highlighting advantages'
    ],
    category: 'behavioral',
    tags: ['contrast effect', 'comparison', 'visual rhetoric'],
    whenToUse: 'To highlight benefits, differences, or improvements through strategic contrast.'
  },
  {
    id: 'occams-razor',
    name: 'Occam\'s Razor',
    pronunciation: 'OK-uhmz RAY-zer',
    definition: 'The principle that the simplest explanation or solution is usually the correct one, applied in design to favor simplicity over complexity.',
    examples: [
      'Choosing simple navigation over complex mega-menus',
      'Single-step checkout instead of multi-page flows',
      'Clear error messages instead of technical jargon'
    ],
    category: 'design',
    tags: ['simplicity principle', 'design philosophy', 'problem-solving'],
    whenToUse: 'When deciding between multiple design solutions, favor the simplest effective option.'
  },
  {
    id: 'streisand-effect',
    name: 'Streisand Effect',
    pronunciation: 'STRAHY-zand ih-FEKT',
    definition: 'The phenomenon where attempting to hide, remove, or censor information causes it to become more widely known than it would have been otherwise.',
    examples: [
      'Trying to remove negative reviews leading to more attention',
      'Blocking content that then goes viral because of the blocking',
      'Over-aggressive content moderation backfiring publicly'
    ],
    category: 'behavioral',
    tags: ['unintended consequences', 'viral mechanics', 'reverse psychology'],
    howToSpot: 'When attempts to suppress information result in increased attention and spread.'
  }
];

export const categories = [
  { id: 'all', name: 'All Terms', count: prodzSlangTerms.length },
  { id: 'deceptive', name: 'Dark Patterns', count: prodzSlangTerms.filter(t => t.category === 'deceptive').length },
  { id: 'design', name: 'Design Concepts', count: prodzSlangTerms.filter(t => t.category === 'design').length },
  { id: 'behavioral', name: 'Psychology', count: prodzSlangTerms.filter(t => t.category === 'behavioral').length }
];
