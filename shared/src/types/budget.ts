import { z } from 'zod';

// Budget Types
export enum BudgetCategory {
  HOUSING = 'housing',
  TRANSPORTATION = 'transportation',
  FOOD = 'food',
  UTILITIES = 'utilities',
  INSURANCE = 'insurance',
  HEALTHCARE = 'healthcare',
  ENTERTAINMENT = 'entertainment',
  PERSONAL_CARE = 'personal_care',
  EDUCATION = 'education',
  SAVINGS = 'savings',
  DEBT_PAYMENT = 'debt_payment',
  OTHER = 'other'
}

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
  TRANSFER = 'transfer'
}

export enum RecurrenceType {
  NONE = 'none',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  BI_WEEKLY = 'bi_weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly'
}

export interface Budget {
  id: string;
  userId: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  categories: BudgetCategory[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BudgetCategory {
  id: string;
  budgetId: string;
  category: BudgetCategory;
  plannedAmount: number;
  actualAmount: number;
  remainingAmount: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  userId: string;
  budgetCategoryId?: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: BudgetCategory;
  date: Date;
  recurrenceType: RecurrenceType;
  recurrenceEndDate?: Date;
  tags: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Income {
  id: string;
  userId: string;
  source: string;
  amount: number;
  frequency: IncomeFrequency;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  notes?: string;
}

export interface Expense {
  id: string;
  userId: string;
  description: string;
  amount: number;
  category: BudgetCategory;
  date: Date;
  isRecurring: boolean;
  recurrenceType?: RecurrenceType;
  recurrenceEndDate?: Date;
  tags: string[];
  notes?: string;
}

export interface SavingsGoal {
  id: string;
  userId: string;
  name: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  priority: GoalPriority;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum GoalPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface DebtRepaymentPlan {
  id: string;
  userId: string;
  name: string;
  description?: string;
  totalDebt: number;
  currentBalance: number;
  interestRate: number;
  minimumPayment: number;
  targetPayment: number;
  targetDate: Date;
  strategy: DebtRepaymentStrategy;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum DebtRepaymentStrategy {
  SNOWBALL = 'snowball', // Pay smallest debts first
  AVALANCHE = 'avalanche', // Pay highest interest first
  BLENDED = 'blended', // Custom approach
  MINIMUM_PAYMENTS = 'minimum_payments' // Just minimum payments
}

export interface BudgetSummary {
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  netWorth: number;
  debtToIncomeRatio: number;
  savingsRate: number;
  categoryBreakdown: CategoryBreakdown[];
  monthlyTrends: MonthlyTrend[];
}

export interface CategoryBreakdown {
  category: BudgetCategory;
  plannedAmount: number;
  actualAmount: number;
  remainingAmount: number;
  percentageOfTotal: number;
}

export interface MonthlyTrend {
  month: string;
  income: number;
  expenses: number;
  savings: number;
  netWorth: number;
}

// Zod Schemas
export const BudgetSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  totalIncome: z.number().min(0),
  totalExpenses: z.number().min(0),
  totalSavings: z.number().min(0),
  categories: z.array(z.nativeEnum(BudgetCategory)),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const TransactionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  budgetCategoryId: z.string().uuid().optional(),
  description: z.string().min(1),
  amount: z.number(),
  type: z.nativeEnum(TransactionType),
  category: z.nativeEnum(BudgetCategory),
  date: z.date(),
  recurrenceType: z.nativeEnum(RecurrenceType),
  recurrenceEndDate: z.date().optional(),
  tags: z.array(z.string()),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const SavingsGoalSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  targetAmount: z.number().min(0),
  currentAmount: z.number().min(0),
  targetDate: z.date(),
  priority: z.nativeEnum(GoalPriority),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const DebtRepaymentPlanSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  totalDebt: z.number().min(0),
  currentBalance: z.number().min(0),
  interestRate: z.number().min(0).max(100),
  minimumPayment: z.number().min(0),
  targetPayment: z.number().min(0),
  targetDate: z.date(),
  strategy: z.nativeEnum(DebtRepaymentStrategy),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type BudgetType = z.infer<typeof BudgetSchema>;
export type TransactionType = z.infer<typeof TransactionSchema>;
export type SavingsGoalType = z.infer<typeof SavingsGoalSchema>;
export type DebtRepaymentPlanType = z.infer<typeof DebtRepaymentPlanSchema>;
