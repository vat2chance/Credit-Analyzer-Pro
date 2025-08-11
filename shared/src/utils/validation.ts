import { z } from 'zod';

// Common validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]{10,}$/,
  SSN: /^\d{3}-?\d{2}-?\d{4}$/,
  EIN: /^\d{2}-?\d{7}$/,
  ZIP_CODE: /^\d{5}(-\d{4})?$/,
  CREDIT_CARD: /^\d{4}[\s\-]?\d{4}[\s\-]?\d{4}[\s\-]?\d{4}$/,
  ACCOUNT_NUMBER: /^[\d\w\-]{8,20}$/
};

// Validation schemas
export const CommonSchemas = {
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(VALIDATION_PATTERNS.PHONE, 'Invalid phone number'),
  ssn: z.string().regex(VALIDATION_PATTERNS.SSN, 'Invalid SSN format'),
  ein: z.string().regex(VALIDATION_PATTERNS.EIN, 'Invalid EIN format'),
  zipCode: z.string().regex(VALIDATION_PATTERNS.ZIP_CODE, 'Invalid ZIP code'),
  creditCard: z.string().regex(VALIDATION_PATTERNS.CREDIT_CARD, 'Invalid credit card number'),
  accountNumber: z.string().regex(VALIDATION_PATTERNS.ACCOUNT_NUMBER, 'Invalid account number'),
  
  // Financial validations
  amount: z.number().positive('Amount must be positive'),
  percentage: z.number().min(0, 'Percentage must be 0 or greater').max(100, 'Percentage cannot exceed 100'),
  creditScore: z.number().min(300, 'Credit score must be at least 300').max(850, 'Credit score cannot exceed 850'),
  
  // Date validations
  futureDate: z.date().refine((date) => date > new Date(), 'Date must be in the future'),
  pastDate: z.date().refine((date) => date < new Date(), 'Date must be in the past'),
  
  // String validations
  requiredString: z.string().min(1, 'This field is required'),
  optionalString: z.string().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters')
};

// Custom validation functions
export const validateCreditScore = (score: number): boolean => {
  return score >= 300 && score <= 850;
};

export const validateCreditUtilization = (utilization: number): boolean => {
  return utilization >= 0 && utilization <= 100;
};

export const validateSSN = (ssn: string): boolean => {
  return VALIDATION_PATTERNS.SSN.test(ssn);
};

export const validateEIN = (ein: string): boolean => {
  return VALIDATION_PATTERNS.EIN.test(ein);
};

export const validatePhoneNumber = (phone: string): boolean => {
  return VALIDATION_PATTERNS.PHONE.test(phone);
};

export const validateEmail = (email: string): boolean => {
  return VALIDATION_PATTERNS.EMAIL.test(email);
};

// Sanitization functions
export const sanitizeSSN = (ssn: string): string => {
  return ssn.replace(/[^\d]/g, '');
};

export const sanitizePhone = (phone: string): string => {
  return phone.replace(/[^\d]/g, '');
};

export const sanitizeEIN = (ein: string): string => {
  return ein.replace(/[^\d]/g, '');
};

export const formatSSN = (ssn: string): string => {
  const clean = sanitizeSSN(ssn);
  if (clean.length === 9) {
    return `${clean.slice(0, 3)}-${clean.slice(3, 5)}-${clean.slice(5)}`;
  }
  return ssn;
};

export const formatPhone = (phone: string): string => {
  const clean = sanitizePhone(phone);
  if (clean.length === 10) {
    return `(${clean.slice(0, 3)}) ${clean.slice(3, 6)}-${clean.slice(6)}`;
  }
  return phone;
};

export const formatEIN = (ein: string): string => {
  const clean = sanitizeEIN(ein);
  if (clean.length === 9) {
    return `${clean.slice(0, 2)}-${clean.slice(2)}`;
  }
  return ein;
};

// Error message helpers
export const getValidationErrorMessage = (error: z.ZodError): string => {
  if (error.errors.length > 0) {
    return error.errors[0].message;
  }
  return 'Validation failed';
};

export const getFieldValidationError = (error: z.ZodError, fieldName: string): string | undefined => {
  const fieldError = error.errors.find(err => err.path.includes(fieldName));
  return fieldError?.message;
};
