export type AssetCategory = 
  | 'bank_fd' 
  | 'mutual_fund' 
  | 'insurance' 
  | 'epf_ppf' 
  | 'real_estate' 
  | 'gold_vault' 
  | 'digital_crypto';

export type NomineeStatus = 'confirmed' | 'unassigned' | 'needs_update';

export interface AssetItem {
  id: string;
  name: string;
  category: AssetCategory;
  institution: string;
  referenceNo?: string;
  documentLocation: string; // e.g. "Bedroom Almirah, Red Binder #2" or "DigiLocker Verified Vault"
  nomineeStatus: NomineeStatus;
  nomineeName?: string;
  estimatedValue?: string;
  notes?: string;
  isDigiLockerVerified?: boolean;
  digiLockerDocUri?: string;
}

export interface ReadinessAnswer {
  questionId: number;
  score: number;
  answerText: string;
}

export interface DeceasedProfile {
  fullName: string;
  dateOfPassing: string;
  state: string;
  applicantName: string;
  applicantRelation: string;
}

export interface ClaimGuide {
  institution: string;
  category: AssetCategory;
  nomineePath: string[];
  nonNomineePath: string[];
  requiredDocs: string[];
  estimatedDays: number;
  officialPortalUrl?: string;
}

export interface LocalLLMPerformance {
  engineName: string;
  deviceAcceleration: 'Snapdragon NPU / WebGPU' | 'Wasm SIMD Multi-Core';
  tokensPerSec: number;
  memoryUsedMB: number;
  isPrivacyModeActive: boolean;
  modelSize: string;
}

export interface DigiLockerDoc {
  id: string;
  name: string;
  issuer: string;
  doctype: string;
  date: string;
  uri: string;
  isLinkedToAsset: boolean;
}
