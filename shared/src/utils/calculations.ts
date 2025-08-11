import { CreditScoreRange, CreditScoreFactor, PaymentStatus } from '../types/credit';

// Credit Score Calculations
export const calculateCreditScoreRange = (score: number): CreditScoreRange => {
  if (score >= 800) return CreditScoreRange.EXCELLENT;
  if (score >= 740) return CreditScoreRange.VERY_GOOD;
  if (score >= 670) return CreditScoreRange.GOOD;
  if (score >= 580) return CreditScoreRange.FAIR;
  return CreditScoreRange.POOR;
};

export const calculateCreditUtilization = (totalBalance: number, totalCreditLimit: number): number => {
  if (totalCreditLimit === 0) return 0;
  return (totalBalance / totalCreditLimit) * 100;
};

export const calculatePaymentHistoryScore = (paymentHistory: PaymentStatus[]): number => {
  if (paymentHistory.length === 0) return 0;
  
  let score = 100;
  const weights = {
    [PaymentStatus.CURRENT]: 0,
    [PaymentStatus.LATE_30_DAYS]: -10,
    [PaymentStatus.LATE_60_DAYS]: -25,
    [PaymentStatus.LATE_90_DAYS]: -50,
    [PaymentStatus.COLLECTION]: -75,
    [PaymentStatus.CHARGE_OFF]: -100
  };
  
  paymentHistory.forEach(status => {
    score += weights[status] || 0;
  });
  
  return Math.max(0, Math.min(100, score));
};

export const calculateAccountAgeScore = (oldestAccount: Date, newestAccount: Date): number => {
  const now = new Date();
  const oldestAge = (now.getTime() - oldestAccount.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  const averageAge = oldestAge / 2;
  
  if (averageAge >= 10) return 100;
  if (averageAge >= 7) return 85;
  if (averageAge >= 5) return 70;
  if (averageAge >= 3) return 55;
  if (averageAge >= 1) return 40;
  return 20;
};

export const calculateCreditMixScore = (accountTypes: string[]): number => {
  const uniqueTypes = new Set(accountTypes).size;
  
  if (uniqueTypes >= 5) return 100;
  if (uniqueTypes >= 4) return 85;
  if (uniqueTypes >= 3) return 70;
  if (uniqueTypes >= 2) return 50;
  return 25;
};

export const calculateInquiryScore = (inquiries: number, months: number = 12): number => {
  if (months === 0) return 100;
  
  const inquiriesPerMonth = inquiries / months;
  
  if (inquiriesPerMonth === 0) return 100;
  if (inquiriesPerMonth <= 0.5) return 85;
  if (inquiriesPerMonth <= 1) return 70;
  if (inquiriesPerMonth <= 2) return 50;
  return 25;
};

// Budget Calculations
export const calculateDebtToIncomeRatio = (monthlyDebtPayments: number, monthlyIncome: number): number => {
  if (monthlyIncome === 0) return 0;
  return (monthlyDebtPayments / monthlyIncome) * 100;
};

export const calculateSavingsRate = (monthlySavings: number, monthlyIncome: number): number => {
  if (monthlyIncome === 0) return 0;
  return (monthlySavings / monthlyIncome) * 100;
};

export const calculateNetWorth = (assets: number, liabilities: number): number => {
  return assets - liabilities;
};

export const calculateMonthlyPayment = (principal: number, annualRate: number, termMonths: number): number => {
  if (termMonths === 0 || annualRate === 0) return principal;
  
  const monthlyRate = annualRate / 100 / 12;
  const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths);
  const denominator = Math.pow(1 + monthlyRate, termMonths) - 1;
  
  return numerator / denominator;
};

export const calculateTotalInterest = (principal: number, monthlyPayment: number, termMonths: number): number => {
  const totalPayments = monthlyPayment * termMonths;
  return totalPayments - principal;
};

export const calculatePayoffTime = (balance: number, monthlyPayment: number, annualRate: number): number => {
  if (monthlyPayment <= 0) return Infinity;
  
  const monthlyRate = annualRate / 100 / 12;
  const numerator = Math.log(monthlyPayment / (monthlyPayment - balance * monthlyRate));
  const denominator = Math.log(1 + monthlyRate);
  
  return numerator / denominator;
};

// Debt Snowball vs Avalanche Calculations
export const calculateSnowballPayoff = (debts: Array<{ balance: number; monthlyPayment: number; interestRate: number }>): {
  totalPayments: number;
  totalInterest: number;
  payoffOrder: Array<{ balance: number; monthlyPayment: number; interestRate: number; payoffMonth: number }>;
} => {
  const sortedDebts = [...debts].sort((a, b) => a.balance - b.balance);
  let remainingPayment = 0;
  let currentMonth = 0;
  const payoffOrder: Array<{ balance: number; monthlyPayment: number; interestRate: number; payoffMonth: number }> = [];
  
  for (const debt of sortedDebts) {
    let currentBalance = debt.balance;
    let monthsToPayoff = 0;
    
    while (currentBalance > 0) {
      currentBalance = currentBalance * (1 + debt.interestRate / 100 / 12) - debt.monthlyPayment;
      monthsToPayoff++;
    }
    
    payoffOrder.push({
      ...debt,
      payoffMonth: currentMonth + monthsToPayoff
    });
    
    currentMonth += monthsToPayoff;
    remainingPayment += debt.monthlyPayment * monthsToPayoff;
  }
  
  const totalInterest = remainingPayment - debts.reduce((sum, debt) => sum + debt.balance, 0);
  
  return {
    totalPayments: remainingPayment,
    totalInterest,
    payoffOrder
  };
};

export const calculateAvalanchePayoff = (debts: Array<{ balance: number; monthlyPayment: number; interestRate: number }>): {
  totalPayments: number;
  totalInterest: number;
  payoffOrder: Array<{ balance: number; monthlyPayment: number; interestRate: number; payoffMonth: number }>;
} => {
  const sortedDebts = [...debts].sort((a, b) => b.interestRate - a.interestRate);
  let remainingPayment = 0;
  let currentMonth = 0;
  const payoffOrder: Array<{ balance: number; monthlyPayment: number; interestRate: number; payoffMonth: number }> = [];
  
  for (const debt of sortedDebts) {
    let currentBalance = debt.balance;
    let monthsToPayoff = 0;
    
    while (currentBalance > 0) {
      currentBalance = currentBalance * (1 + debt.interestRate / 100 / 12) - debt.monthlyPayment;
      monthsToPayoff++;
    }
    
    payoffOrder.push({
      ...debt,
      payoffMonth: currentMonth + monthsToPayoff
    });
    
    currentMonth += monthsToPayoff;
    remainingPayment += debt.monthlyPayment * monthsToPayoff;
  }
  
  const totalInterest = remainingPayment - debts.reduce((sum, debt) => sum + debt.balance, 0);
  
  return {
    totalPayments: remainingPayment,
    totalInterest,
    payoffOrder
  };
};

// Investment and Savings Calculations
export const calculateCompoundInterest = (principal: number, annualRate: number, years: number, compoundsPerYear: number = 12): number => {
  const rate = annualRate / 100;
  const n = compoundsPerYear;
  const t = years;
  
  return principal * Math.pow(1 + rate / n, n * t);
};

export const calculateFutureValue = (principal: number, monthlyContribution: number, annualRate: number, years: number): number => {
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  
  const futureValueOfPrincipal = principal * Math.pow(1 + monthlyRate, months);
  const futureValueOfContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  
  return futureValueOfPrincipal + futureValueOfContributions;
};

export const calculateRequiredMonthlySavings = (targetAmount: number, currentSavings: number, annualRate: number, years: number): number => {
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  
  const futureValueOfCurrent = currentSavings * Math.pow(1 + monthlyRate, months);
  const requiredFutureValue = targetAmount - futureValueOfCurrent;
  
  if (requiredFutureValue <= 0) return 0;
  
  return requiredFutureValue / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
};

// Utility Functions
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

export const formatPercentage = (value: number, decimals: number = 2): string => {
  return `${value.toFixed(decimals)}%`;
};

export const formatNumber = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals);
};

export const roundToNearest = (value: number, nearest: number): number => {
  return Math.round(value / nearest) * nearest;
};
