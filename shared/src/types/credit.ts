import { z } from 'zod';

// Credit Bureau Types
export enum CreditBureau {
  EQUIFAX = 'equifax',
  EXPERIAN = 'experian',
  TRANSUNION = 'transunion'
}

export enum BusinessCreditProvider {
  DUN_BRADSTREET = 'dun_bradstreet',
  EQUIFAX_BUSINESS = 'equifax_business',
  EXPERIAN_BUSINESS = 'experian_business'
}

// Credit Score Types
export enum CreditScoreRange {
  EXCELLENT = 'excellent', // 800-850
  VERY_GOOD = 'very_good', // 740-799
  GOOD = 'good', // 670-739
  FAIR = 'fair', // 580-669
  POOR = 'poor' // 300-579
}

export enum CreditScoreFactor {
  PAYMENT_HISTORY = 'payment_history',
  CREDIT_UTILIZATION = 'credit_utilization',
  ACCOUNT_AGE = 'account_age',
  CREDIT_MIX = 'credit_mix',
  NEW_INQUIRIES = 'new_inquiries'
}

// Credit Report Types
export interface CreditReport {
  id: string;
  userId: string;
  bureau: CreditBureau;
  pullDate: Date;
  creditScore: number;
  scoreRange: CreditScoreRange;
  factors: CreditScoreFactor[];
  tradelines: Tradeline[];
  inquiries: Inquiry[];
  derogatoryMarks: DerogatoryMark[];
  publicRecords: PublicRecord[];
  summary: CreditSummary;
}

export interface CreditSummary {
  totalAccounts: number;
  openAccounts: number;
  closedAccounts: number;
  totalBalance: number;
  availableCredit: number;
  creditUtilization: number;
  oldestAccount: Date;
  newestAccount: Date;
  paymentHistory: PaymentHistorySummary;
}

export interface PaymentHistorySummary {
  onTime: number;
  late30Days: number;
  late60Days: number;
  late90Days: number;
  collections: number;
}

// Tradeline Types
export interface Tradeline {
  id: string;
  accountNumber: string;
  accountType: AccountType;
  creditor: string;
  balance: number;
  creditLimit: number;
  monthlyPayment: number;
  paymentStatus: PaymentStatus;
  openDate: Date;
  lastActivityDate: Date;
  accountStatus: AccountStatus;
  paymentHistory: PaymentHistory[];
}

export enum AccountType {
  CREDIT_CARD = 'credit_card',
  MORTGAGE = 'mortgage',
  AUTO_LOAN = 'auto_loan',
  PERSONAL_LOAN = 'personal_loan',
  STUDENT_LOAN = 'student_loan',
  BUSINESS_LOAN = 'business_loan'
}

export enum PaymentStatus {
  CURRENT = 'current',
  LATE_30_DAYS = 'late_30_days',
  LATE_60_DAYS = 'late_60_days',
  LATE_90_DAYS = 'late_90_days',
  COLLECTION = 'collection',
  CHARGE_OFF = 'charge_off'
}

export enum AccountStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  PAID = 'paid',
  DEFAULTED = 'defaulted'
}

export interface PaymentHistory {
  date: Date;
  status: PaymentStatus;
  amount: number;
}

// Inquiry Types
export interface Inquiry {
  id: string;
  date: Date;
  creditor: string;
  inquiryType: InquiryType;
  impact: 'hard' | 'soft';
}

export enum InquiryType {
  CREDIT_CARD_APPLICATION = 'credit_card_application',
  LOAN_APPLICATION = 'loan_application',
  MORTGAGE_APPLICATION = 'mortgage_application',
  AUTO_LOAN_APPLICATION = 'auto_loan_application',
  EMPLOYMENT = 'employment',
  INSURANCE = 'insurance',
  UTILITY = 'utility'
}

// Derogatory Mark Types
export interface DerogatoryMark {
  id: string;
  type: DerogatoryMarkType;
  creditor: string;
  amount: number;
  dateReported: Date;
  dateResolved?: Date;
  status: DerogatoryMarkStatus;
  description: string;
}

export enum DerogatoryMarkType {
  COLLECTION = 'collection',
  CHARGE_OFF = 'charge_off',
  BANKRUPTCY = 'bankruptcy',
  FORECLOSURE = 'foreclosure',
  REPOSSESSION = 'repossession',
  JUDGMENT = 'judgment',
  TAX_LIEN = 'tax_lien'
}

export enum DerogatoryMarkStatus {
  ACTIVE = 'active',
  DISPUTED = 'disputed',
  RESOLVED = 'resolved',
  EXPIRED = 'expired'
}

// Public Record Types
export interface PublicRecord {
  id: string;
  type: PublicRecordType;
  court: string;
  dateFiled: Date;
  amount: number;
  status: PublicRecordStatus;
}

export enum PublicRecordType {
  BANKRUPTCY = 'bankruptcy',
  FORECLOSURE = 'foreclosure',
  JUDGMENT = 'judgment',
  TAX_LIEN = 'tax_lien',
  CIVIL_SUIT = 'civil_suit'
}

export enum PublicRecordStatus {
  ACTIVE = 'active',
  DISCHARGED = 'discharged',
  SATISFIED = 'satisfied',
  EXPIRED = 'expired'
}

// Business Credit Types
export interface BusinessCreditReport {
  id: string;
  businessId: string;
  provider: BusinessCreditProvider;
  pullDate: Date;
  businessCreditScore: number;
  businessRisk: BusinessRiskLevel;
  tradelines: BusinessTradeline[];
  publicRecords: BusinessPublicRecord[];
  summary: BusinessCreditSummary;
}

export enum BusinessRiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high'
}

export interface BusinessTradeline extends Omit<Tradeline, 'accountType'> {
  accountType: BusinessAccountType;
  businessGuarantee: boolean;
  personalGuarantee: boolean;
}

export enum BusinessAccountType {
  BUSINESS_CREDIT_CARD = 'business_credit_card',
  BUSINESS_LOAN = 'business_loan',
  BUSINESS_LINE_OF_CREDIT = 'business_line_of_credit',
  EQUIPMENT_FINANCING = 'equipment_financing',
  INVOICE_FACTORING = 'invoice_factoring'
}

export interface BusinessPublicRecord extends PublicRecord {
  businessName: string;
  businessAddress: string;
}

export interface BusinessCreditSummary {
  totalBusinessAccounts: number;
  totalBusinessBalance: number;
  averageAccountAge: number;
  paymentHistory: PaymentHistorySummary;
  businessRiskFactors: string[];
}

// Zod Schemas for Validation
export const CreditReportSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  bureau: z.nativeEnum(CreditBureau),
  pullDate: z.date(),
  creditScore: z.number().min(300).max(850),
  scoreRange: z.nativeEnum(CreditScoreRange),
  factors: z.array(z.nativeEnum(CreditScoreFactor)),
  tradelines: z.array(z.any()), // Will define specific schema
  inquiries: z.array(z.any()), // Will define specific schema
  derogatoryMarks: z.array(z.any()), // Will define specific schema
  publicRecords: z.array(z.any()), // Will define specific schema
  summary: z.any() // Will define specific schema
});

export const BusinessCreditReportSchema = z.object({
  id: z.string().uuid(),
  businessId: z.string().uuid(),
  provider: z.nativeEnum(BusinessCreditProvider),
  pullDate: z.date(),
  businessCreditScore: z.number().min(0).max(100),
  businessRisk: z.nativeEnum(BusinessRiskLevel),
  tradelines: z.array(z.any()), // Will define specific schema
  publicRecords: z.array(z.any()), // Will define specific schema
  summary: z.any() // Will define specific schema
});

export type CreditReportType = z.infer<typeof CreditReportSchema>;
export type BusinessCreditReportType = z.infer<typeof BusinessCreditReportSchema>;
