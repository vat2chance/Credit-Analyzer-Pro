import { z } from 'zod';

// User Types
export enum UserType {
  INDIVIDUAL = 'individual',
  BUSINESS = 'business',
  ENTERPRISE = 'enterprise'
}

export enum SubscriptionTier {
  FREE = 'free',
  PREMIUM = 'premium',
  BUSINESS = 'business'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING_VERIFICATION = 'pending_verification'
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  subscriptionTier: SubscriptionTier;
  status: UserStatus;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  preferences: UserPreferences;
  profile: UserProfile;
}

export interface UserProfile {
  dateOfBirth?: Date;
  phoneNumber?: string;
  address: Address;
  ssn?: string; // Encrypted
  employmentInfo?: EmploymentInfo;
  incomeInfo?: IncomeInfo;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface EmploymentInfo {
  employer: string;
  jobTitle: string;
  employmentLength: number; // in months
  income: number;
  incomeFrequency: IncomeFrequency;
}

export enum IncomeFrequency {
  WEEKLY = 'weekly',
  BI_WEEKLY = 'bi_weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

export interface IncomeInfo {
  primaryIncome: number;
  secondaryIncome?: number;
  otherIncome?: number;
  totalIncome: number;
  incomeFrequency: IncomeFrequency;
}

export interface UserPreferences {
  notifications: NotificationPreferences;
  privacy: PrivacyPreferences;
  display: DisplayPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  creditScoreChanges: boolean;
  newInquiries: boolean;
  paymentReminders: boolean;
  securityAlerts: boolean;
  marketing: boolean;
}

export interface PrivacyPreferences {
  shareDataWithPartners: boolean;
  allowAnalytics: boolean;
  dataRetentionPeriod: number; // in months
}

export interface DisplayPreferences {
  theme: 'light' | 'dark' | 'auto';
  currency: string;
  language: string;
  timezone: string;
}

// Business User Types
export interface BusinessUser extends Omit<User, 'userType' | 'profile'> {
  userType: UserType.BUSINESS;
  profile: BusinessProfile;
  businessInfo: BusinessInfo;
}

export interface BusinessProfile extends UserProfile {
  businessName: string;
  businessType: BusinessType;
  businessAddress: Address;
  ein?: string; // Encrypted
  businessPhone: string;
  website?: string;
  industry: string;
  yearsInBusiness: number;
  numberOfEmployees: number;
  annualRevenue: number;
}

export enum BusinessType {
  SOLE_PROPRIETORSHIP = 'sole_proprietorship',
  PARTNERSHIP = 'partnership',
  LLC = 'llc',
  CORPORATION = 'corporation',
  S_CORPORATION = 's_corporation',
  NONPROFIT = 'nonprofit'
}

export interface BusinessInfo {
  businessId: string;
  dunsNumber?: string;
  businessCreditScore?: number;
  businessRiskLevel?: string;
  industryCode: string;
  businessDescription: string;
}

// Authentication Types
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  token: string;
  newPassword: string;
}

export interface TwoFactorSetup {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

export interface TwoFactorVerify {
  code: string;
  rememberDevice?: boolean;
}

// Zod Schemas
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  userType: z.nativeEnum(UserType),
  subscriptionTier: z.nativeEnum(SubscriptionTier),
  status: z.nativeEnum(UserStatus),
  emailVerified: z.boolean(),
  twoFactorEnabled: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  lastLoginAt: z.date().optional(),
  preferences: z.any(), // Will define specific schema
  profile: z.any() // Will define specific schema
});

export const BusinessUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  userType: z.literal(UserType.BUSINESS),
  subscriptionTier: z.nativeEnum(SubscriptionTier),
  status: z.nativeEnum(UserStatus),
  emailVerified: z.boolean(),
  twoFactorEnabled: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  lastLoginAt: z.date().optional(),
  preferences: z.any(), // Will define specific schema
  profile: z.any(), // Will define specific schema
  businessInfo: z.any() // Will define specific schema
});

export const AuthCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const PasswordResetSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(8)
});

export type UserType = z.infer<typeof UserSchema>;
export type BusinessUserType = z.infer<typeof BusinessUserSchema>;
export type AuthCredentialsType = z.infer<typeof AuthCredentialsSchema>;
export type PasswordResetType = z.infer<typeof PasswordResetSchema>;
