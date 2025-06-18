
import { useState } from 'react';
import { sanitizeTextInput, validateContent, formRateLimit } from '@/utils/securityUtils';

interface UseSecureFormOptions {
  rateLimitKey?: string;
  maxLength?: number;
}

export const useSecureForm = (options: UseSecureFormOptions = {}) => {
  const { rateLimitKey = 'default-form', maxLength = 1000 } = options;
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string, type: 'email' | 'url' | 'text' = 'text') => {
    const validation = validateContent(value, type);
    
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, [name]: validation.error || 'Invalid input' }));
      return false;
    }
    
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
    return true;
  };

  const sanitizeField = (value: string) => {
    return sanitizeTextInput(value, maxLength);
  };

  const checkRateLimit = (): boolean => {
    if (!formRateLimit.isAllowed(rateLimitKey)) {
      const cooldown = formRateLimit.getRemainingCooldown(rateLimitKey);
      setErrors(prev => ({ 
        ...prev, 
        rateLimit: `Please wait ${cooldown} seconds before submitting again` 
      }));
      return false;
    }
    
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.rateLimit;
      return newErrors;
    });
    return true;
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    errors,
    validateField,
    sanitizeField,
    checkRateLimit,
    clearErrors,
    hasErrors: Object.keys(errors).length > 0
  };
};
