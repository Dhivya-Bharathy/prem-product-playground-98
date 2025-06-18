
/**
 * Security utilities for input validation and sanitization
 */

// Enhanced URL validation with security checks
export const validateAndSanitizeURL = (url: string): { isValid: boolean; sanitizedUrl?: string; error?: string } => {
  try {
    // Basic format validation
    if (!url || typeof url !== 'string') {
      return { isValid: false, error: 'URL is required and must be a string' };
    }

    // Remove potential script injections and normalize
    const sanitizedInput = url.trim()
      .replace(/javascript:/gi, '')
      .replace(/data:/gi, '')
      .replace(/vbscript:/gi, '')
      .replace(/file:/gi, '');

    // Create URL object for validation
    const urlObj = new URL(sanitizedInput);
    
    // Only allow HTTP and HTTPS protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { isValid: false, error: 'Only HTTP and HTTPS URLs are supported' };
    }

    // Check for suspicious patterns
    const suspiciousPatterns = [
      /localhost/i,
      /127\.0\.0\.1/,
      /0\.0\.0\.0/,
      /192\.168\./,
      /10\./,
      /172\.(1[6-9]|2[0-9]|3[0-1])\./,
      /@/,
      /[<>'"]/
    ];

    const hasSuspiciousPattern = suspiciousPatterns.some(pattern => pattern.test(sanitizedInput));
    if (hasSuspiciousPattern) {
      return { isValid: false, error: 'URL contains potentially unsafe patterns' };
    }

    // Length validation
    if (sanitizedInput.length > 2048) {
      return { isValid: false, error: 'URL is too long (max 2048 characters)' };
    }

    return { isValid: true, sanitizedUrl: urlObj.toString() };
  } catch (error) {
    return { isValid: false, error: 'Invalid URL format' };
  }
};

// Input sanitization for text fields
export const sanitizeTextInput = (input: string, maxLength: number = 1000): string => {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>'"&]/g, (char) => {
      const entityMap: { [key: string]: string } = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      };
      return entityMap[char] || char;
    });
};

// Rate limiting for client-side form submissions
class ClientRateLimit {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(key: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Remove old attempts outside the time window
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }

    // Add current attempt
    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);
    
    return true;
  }

  getRemainingCooldown(key: string): number {
    const attempts = this.attempts.get(key) || [];
    if (attempts.length < this.maxAttempts) return 0;
    
    const oldestAttempt = Math.min(...attempts);
    const cooldownEnd = oldestAttempt + this.windowMs;
    const remaining = Math.max(0, cooldownEnd - Date.now());
    
    return Math.ceil(remaining / 1000); // Return seconds
  }
}

export const formRateLimit = new ClientRateLimit(5, 60000); // 5 attempts per minute

// Content validation
export const validateContent = (content: string, type: 'email' | 'url' | 'text' = 'text'): { isValid: boolean; error?: string } => {
  if (!content || typeof content !== 'string') {
    return { isValid: false, error: 'Content is required' };
  }

  const sanitized = sanitizeTextInput(content);
  
  switch (type) {
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(sanitized)) {
        return { isValid: false, error: 'Invalid email format' };
      }
      break;
    case 'url':
      return validateAndSanitizeURL(content);
    case 'text':
      if (sanitized.length < 1) {
        return { isValid: false, error: 'Content cannot be empty' };
      }
      break;
  }

  return { isValid: true };
};
