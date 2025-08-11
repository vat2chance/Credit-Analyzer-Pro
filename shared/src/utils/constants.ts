// Application Constants
export const APP_CONFIG = {
  NAME: 'Credit Analyzer Pro',
  VERSION: '1.0.0',
  DESCRIPTION: 'Comprehensive credit analysis and financial guidance application',
  AUTHOR: 'Avery Lyndell Fuller',
  WEBSITE: 'https://creditanalyzerpro.com',
  SUPPORT_EMAIL: 'support@creditanalyzerpro.com'
};

// Credit Score Constants
export const CREDIT_SCORE_RANGES = {
  EXCELLENT: { min: 800, max: 850, color: '#00C851' },
  VERY_GOOD: { min: 740, max: 799, color: '#007E33' },
  GOOD: { min: 670, max: 739, color: '#FF8800' },
  FAIR: { min: 580, max: 669, color: '#FF6F00' },
  POOR: { min: 300, max: 579, color: '#CC0000' }
};

export const CREDIT_SCORE_FACTOR_WEIGHTS = {
  PAYMENT_HISTORY: 35,
  CREDIT_UTILIZATION: 30,
  ACCOUNT_AGE: 15,
  CREDIT_MIX: 10,
  NEW_INQUIRIES: 10
};

// Business Credit Score Constants
export const BUSINESS_CREDIT_SCORE_RANGES = {
  EXCELLENT: { min: 80, max: 100, color: '#00C851' },
  GOOD: { min: 50, max: 79, color: '#007E33' },
  FAIR: { min: 25, max: 49, color: '#FF8800' },
  POOR: { min: 0, max: 24, color: '#CC0000' }
};

// Financial Constants
export const FINANCIAL_CONSTANTS = {
  MAX_CREDIT_UTILIZATION: 30, // Recommended max credit utilization percentage
  MIN_CREDIT_UTILIZATION: 1, // Minimum recommended credit utilization
  MAX_DEBT_TO_INCOME_RATIO: 43, // Maximum recommended debt-to-income ratio
  RECOMMENDED_SAVINGS_RATE: 20, // Recommended savings rate percentage
  EMERGENCY_FUND_MONTHS: 6, // Recommended emergency fund in months of expenses
  MAX_HOUSING_RATIO: 28, // Maximum recommended housing expense ratio
  MAX_TOTAL_DEBT_RATIO: 36 // Maximum recommended total debt ratio
};

// Subscription Tiers
export const SUBSCRIPTION_TIERS = {
  FREE: {
    name: 'Free',
    price: 0,
    features: [
      'Basic credit score monitoring',
      'Credit education resources',
      'Monthly credit score updates',
      'Basic credit tips'
    ],
    limitations: [
      'Limited to one credit bureau',
      'No credit simulators',
      'No budgeting tools',
      'No business credit features'
    ]
  },
  PREMIUM: {
    name: 'Premium',
    price: 19.99,
    features: [
      'All three credit bureaus',
      'Credit simulators',
      'Advanced analytics',
      'Budgeting tools',
      'Debt repayment calculators',
      'Priority support',
      'Credit monitoring alerts'
    ],
    limitations: [
      'No business credit features',
      'Limited partner integrations'
    ]
  },
  BUSINESS: {
    name: 'Business',
    price: 49.99,
    features: [
      'All Premium features',
      'Business credit analysis',
      'Business credit building tools',
      'Advanced reporting',
      'API access',
      'White-label options',
      'Dedicated account manager'
    ],
    limitations: [
      'No enterprise features'
    ]
  }
};

// API Constants
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    VERIFY_EMAIL: '/api/auth/verify-email',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    TWO_FACTOR_SETUP: '/api/auth/2fa/setup',
    TWO_FACTOR_VERIFY: '/api/auth/2fa/verify'
  },
  CREDIT: {
    REPORTS: '/api/credit/reports',
    SCORES: '/api/credit/scores',
    SIMULATE: '/api/credit/simulate',
    DISPUTE: '/api/credit/dispute',
    MONITORING: '/api/credit/monitoring'
  },
  BUSINESS: {
    REPORTS: '/api/business/credit-reports',
    BUILDING: '/api/business/credit-building',
    ANALYSIS: '/api/business/analysis'
  },
  BUDGET: {
    OVERVIEW: '/api/budget/overview',
    CATEGORIES: '/api/budget/categories',
    TRANSACTIONS: '/api/budget/transactions',
    GOALS: '/api/budget/goals',
    DEBT_PLANS: '/api/budget/debt-plans'
  },
  NOTIFICATIONS: {
    SETTINGS: '/api/notifications/settings',
    PREFERENCES: '/api/notifications/preferences',
    HISTORY: '/api/notifications/history'
  }
};

// Credit Bureau Constants
export const CREDIT_BUREAUS = {
  EQUIFAX: {
    name: 'Equifax',
    website: 'https://www.equifax.com',
    phone: '1-800-685-1111',
    address: 'P.O. Box 740256, Atlanta, GA 30374-0256'
  },
  EXPERIAN: {
    name: 'Experian',
    website: 'https://www.experian.com',
    phone: '1-888-397-3742',
    address: 'P.O. Box 4500, Allen, TX 75013'
  },
  TRANSUNION: {
    name: 'TransUnion',
    website: 'https://www.transunion.com',
    phone: '1-800-916-8800',
    address: 'P.O. Box 2000, Chester, PA 19016-2000'
  }
};

// Business Credit Providers
export const BUSINESS_CREDIT_PROVIDERS = {
  DUN_BRADSTREET: {
    name: 'Dun & Bradstreet',
    website: 'https://www.dnb.com',
    phone: '1-800-234-3867'
  },
  EQUIFAX_BUSINESS: {
    name: 'Equifax Business',
    website: 'https://www.equifax.com/business',
    phone: '1-800-685-1111'
  },
  EXPERIAN_BUSINESS: {
    name: 'Experian Business',
    website: 'https://www.experian.com/small-business',
    phone: '1-888-397-3742'
  }
};

// Security Constants
export const SECURITY_CONFIG = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REQUIREMENTS: [
    'At least 8 characters',
    'At least one uppercase letter',
    'At least one lowercase letter',
    'At least one number',
    'At least one special character'
  ],
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes in milliseconds
  TWO_FACTOR_BACKUP_CODES: 10
};

// Notification Constants
export const NOTIFICATION_TYPES = {
  CREDIT_SCORE_CHANGE: 'credit_score_change',
  NEW_INQUIRY: 'new_inquiry',
  NEW_ACCOUNT: 'new_account',
  PAYMENT_DUE: 'payment_due',
  PAYMENT_OVERDUE: 'payment_overdue',
  CREDIT_LIMIT_CHANGE: 'credit_limit_change',
  ACCOUNT_CLOSED: 'account_closed',
  SECURITY_ALERT: 'security_alert'
};

// Error Messages
export const ERROR_MESSAGES = {
  VALIDATION: {
    REQUIRED_FIELD: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid phone number',
    INVALID_SSN: 'Please enter a valid SSN',
    INVALID_EIN: 'Please enter a valid EIN',
    PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
    PASSWORDS_DONT_MATCH: 'Passwords do not match',
    INVALID_CREDIT_SCORE: 'Credit score must be between 300 and 850'
  },
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    ACCOUNT_LOCKED: 'Account is temporarily locked due to multiple failed attempts',
    EMAIL_NOT_VERIFIED: 'Please verify your email address before logging in',
    TWO_FACTOR_REQUIRED: 'Two-factor authentication is required',
    SESSION_EXPIRED: 'Your session has expired. Please log in again'
  },
  CREDIT: {
    REPORT_NOT_FOUND: 'Credit report not found',
    BUREAU_UNAVAILABLE: 'Credit bureau is currently unavailable',
    INSUFFICIENT_PERMISSIONS: 'You do not have permission to access this credit report',
    SIMULATION_FAILED: 'Credit simulation failed to complete'
  },
  GENERAL: {
    NETWORK_ERROR: 'Network error. Please check your connection and try again',
    SERVER_ERROR: 'Server error. Please try again later',
    UNKNOWN_ERROR: 'An unknown error occurred. Please try again'
  }
};

// Success Messages
export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: 'Successfully logged in',
    REGISTRATION_SUCCESS: 'Account created successfully. Please check your email to verify your account.',
    PASSWORD_RESET_SENT: 'Password reset instructions have been sent to your email',
    PASSWORD_RESET_SUCCESS: 'Password has been reset successfully',
    EMAIL_VERIFIED: 'Email verified successfully',
    TWO_FACTOR_ENABLED: 'Two-factor authentication enabled successfully'
  },
  CREDIT: {
    REPORT_GENERATED: 'Credit report generated successfully',
    SIMULATION_COMPLETED: 'Credit simulation completed successfully',
    DISPUTE_SUBMITTED: 'Dispute submitted successfully'
  },
  BUDGET: {
    BUDGET_CREATED: 'Budget created successfully',
    TRANSACTION_ADDED: 'Transaction added successfully',
    GOAL_CREATED: 'Savings goal created successfully'
  }
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  SHORT: 'MM/dd/yyyy',
  LONG: 'EEEE, MMMM dd, yyyy',
  TIME: 'MMM dd, yyyy HH:mm',
  ISO: 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx'
};

// Currency Formats
export const CURRENCY_FORMATS = {
  USD: {
    symbol: '$',
    position: 'before',
    decimals: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.'
  },
  EUR: {
    symbol: '€',
    position: 'before',
    decimals: 2,
    thousandsSeparator: '.',
    decimalSeparator: ','
  },
  GBP: {
    symbol: '£',
    position: 'before',
    decimals: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.'
  }
};
