import { z } from 'zod';
import { CreditScoreFactor, AccountType, PaymentStatus } from './credit';

// Simulation Types
export enum SimulationType {
  PAY_OFF_DEBT = 'pay_off_debt',
  OPEN_NEW_ACCOUNT = 'open_new_account',
  CLOSE_ACCOUNT = 'close_account',
  REMOVE_DEROGATORY = 'remove_derogatory',
  CONSOLIDATE_LOANS = 'consolidate_loans',
  INCREASE_CREDIT_LIMIT = 'increase_credit_limit',
  PAYMENT_HISTORY_IMPROVEMENT = 'payment_history_improvement',
  CREDIT_MIX_CHANGE = 'credit_mix_change'
}

export enum SimulationStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export interface CreditSimulation {
  id: string;
  userId: string;
  name: string;
  description?: string;
  type: SimulationType;
  status: SimulationStatus;
  currentScore: number;
  projectedScore: number;
  scoreChange: number;
  factors: SimulationFactor[];
  actions: SimulationAction[];
  timeline: SimulationTimeline[];
  assumptions: SimulationAssumptions;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface SimulationFactor {
  factor: CreditScoreFactor;
  currentImpact: number;
  projectedImpact: number;
  change: number;
  explanation: string;
}

export interface SimulationAction {
  id: string;
  description: string;
  type: SimulationActionType;
  details: SimulationActionDetails;
  estimatedCost: number;
  estimatedTimeframe: number; // in months
  priority: ActionPriority;
}

export enum SimulationActionType {
  PAY_OFF_ACCOUNT = 'pay_off_account',
  OPEN_ACCOUNT = 'open_account',
  CLOSE_ACCOUNT = 'close_account',
  DISPUTE_ITEM = 'dispute_item',
  CONSOLIDATE_DEBT = 'consolidate_debt',
  INCREASE_LIMIT = 'increase_limit',
  PAYMENT_ARRANGEMENT = 'payment_arrangement'
}

export interface SimulationActionDetails {
  accountId?: string;
  accountType?: AccountType;
  amount?: number;
  creditor?: string;
  description: string;
  requirements?: string[];
  risks?: string[];
  benefits?: string[];
}

export enum ActionPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface SimulationTimeline {
  month: number;
  projectedScore: number;
  scoreChange: number;
  completedActions: string[];
  remainingActions: string[];
  estimatedCost: number;
  notes?: string;
}

export interface SimulationAssumptions {
  paymentHistoryImprovement: boolean;
  noNewInquiries: boolean;
  creditUtilizationTarget: number;
  accountAgeGrowth: boolean;
  disputeSuccessRate: number; // percentage
  marketConditions: MarketConditions;
}

export enum MarketConditions {
  FAVORABLE = 'favorable',
  NEUTRAL = 'neutral',
  UNFAVORABLE = 'unfavorable'
}

// Specific Simulation Scenarios
export interface PayOffDebtSimulation extends CreditSimulation {
  type: SimulationType.PAY_OFF_DEBT;
  targetAccounts: PayOffTargetAccount[];
  paymentStrategy: PaymentStrategy;
  fundingSource: FundingSource;
}

export interface PayOffTargetAccount {
  accountId: string;
  currentBalance: number;
  targetBalance: number;
  monthlyPayment: number;
  interestRate: number;
  priority: number;
}

export enum PaymentStrategy {
  SNOWBALL = 'snowball', // Smallest balance first
  AVALANCHE = 'avalanche', // Highest interest first
  HYBRID = 'hybrid', // Custom priority
  MINIMUM_PAYMENTS = 'minimum_payments'
}

export enum FundingSource {
  SAVINGS = 'savings',
  INCOME_INCREASE = 'income_increase',
  DEBT_CONSOLIDATION = 'debt_consolidation',
  ASSET_SALE = 'asset_sale',
  WINDfall = 'windfall'
}

export interface NewAccountSimulation extends CreditSimulation {
  type: SimulationType.OPEN_NEW_ACCOUNT;
  accountType: AccountType;
  creditLimit: number;
  utilization: number;
  paymentHistory: PaymentStatus;
  accountAge: number; // in months
}

export interface RemoveDerogatorySimulation extends CreditSimulation {
  type: SimulationType.REMOVE_DEROGATORY;
  derogatoryItems: DerogatoryItem[];
  disputeStrategy: DisputeStrategy;
  successProbability: number;
}

export interface DerogatoryItem {
  id: string;
  type: string;
  amount: number;
  dateReported: Date;
  creditor: string;
  disputeReason: string;
  evidence: string[];
}

export enum DisputeStrategy {
  FACTUAL_DISPUTE = 'factual_dispute',
  IDENTITY_THEFT = 'identity_theft',
  OUTDATED_INFORMATION = 'outdated_information',
  DUPLICATE_ENTRY = 'duplicate_entry',
  INCORRECT_AMOUNT = 'incorrect_amount'
}

export interface ConsolidateLoansSimulation extends CreditSimulation {
  type: SimulationType.CONSOLIDATE_LOANS;
  sourceAccounts: ConsolidationSourceAccount[];
  targetLoan: ConsolidationTargetLoan;
  savings: ConsolidationSavings;
}

export interface ConsolidationSourceAccount {
  accountId: string;
  currentBalance: number;
  interestRate: number;
  monthlyPayment: number;
  remainingTerm: number; // in months
}

export interface ConsolidationTargetLoan {
  newBalance: number;
  newInterestRate: number;
  newMonthlyPayment: number;
  newTerm: number; // in months
  lender: string;
  fees: number;
}

export interface ConsolidationSavings {
  monthlyPaymentReduction: number;
  totalInterestSavings: number;
  timeToPayoff: number; // in months
  breakEvenPoint: number; // in months
}

// Simulation Results
export interface SimulationResult {
  simulationId: string;
  summary: SimulationSummary;
  recommendations: SimulationRecommendation[];
  risks: SimulationRisk[];
  nextSteps: SimulationNextStep[];
}

export interface SimulationSummary {
  overallScore: number;
  scoreImprovement: number;
  timeframe: number; // in months
  totalCost: number;
  roi: number; // return on investment
  confidence: number; // percentage
}

export interface SimulationRecommendation {
  action: SimulationAction;
  impact: number;
  cost: number;
  timeframe: number;
  priority: ActionPriority;
  reasoning: string;
}

export interface SimulationRisk {
  description: string;
  probability: number; // percentage
  impact: number; // negative score change
  mitigation: string;
}

export interface SimulationNextStep {
  description: string;
  timeframe: number; // in days
  required: boolean;
  dependencies: string[];
}

// Zod Schemas
export const CreditSimulationSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  type: z.nativeEnum(SimulationType),
  status: z.nativeEnum(SimulationStatus),
  currentScore: z.number().min(300).max(850),
  projectedScore: z.number().min(300).max(850),
  scoreChange: z.number(),
  factors: z.array(z.any()), // Will define specific schema
  actions: z.array(z.any()), // Will define specific schema
  timeline: z.array(z.any()), // Will define specific schema
  assumptions: z.any(), // Will define specific schema
  createdAt: z.date(),
  updatedAt: z.date(),
  completedAt: z.date().optional()
});

export const SimulationResultSchema = z.object({
  simulationId: z.string().uuid(),
  summary: z.any(), // Will define specific schema
  recommendations: z.array(z.any()), // Will define specific schema
  risks: z.array(z.any()), // Will define specific schema
  nextSteps: z.array(z.any()) // Will define specific schema
});

export type CreditSimulationType = z.infer<typeof CreditSimulationSchema>;
export type SimulationResultType = z.infer<typeof SimulationResultSchema>;
