
/**
 * Security configuration and monitoring utilities
 */

// Security configuration constants
export const SECURITY_CONFIG = {
  MAX_URL_LENGTH: 2048,
  MAX_INPUT_LENGTH: 1000,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  RATE_LIMIT_WINDOW: 60000, // 1 minute
  RATE_LIMIT_MAX_ATTEMPTS: 5,
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  BLOCKED_DOMAINS: ['localhost', '127.0.0.1', '0.0.0.0'],
  CSP_VIOLATIONS_ENDPOINT: '/api/csp-violations' // Future endpoint for CSP violation reporting
};

// Security monitoring functions
export const logSecurityEvent = (event: string, details: any) => {
  // In production, this would send to a security monitoring service
  console.warn(`Security Event: ${event}`, details);
};

// Content validation helpers
export const validateFileUpload = (file: File): { isValid: boolean; error?: string } => {
  if (file.size > SECURITY_CONFIG.MAX_FILE_SIZE) {
    return { isValid: false, error: 'File size exceeds maximum allowed size' };
  }

  if (!SECURITY_CONFIG.ALLOWED_FILE_TYPES.includes(file.type)) {
    return { isValid: false, error: 'File type not allowed' };
  }

  return { isValid: true };
};

// XSS prevention utilities
export const stripHTMLTags = (input: string): string => {
  return input.replace(/<[^>]*>/g, '');
};

export const escapeHTML = (input: string): string => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};
