import { ClaimGuide } from '../types';

export const INDIAN_BANKS_LIST = [
  'State Bank of India (SBI)',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Punjab National Bank (PNB)',
  'Bank of Baroda (BOB)',
  'Canara Bank',
  'Union Bank of India',
  'IDFC FIRST Bank',
  'Federal Bank',
  'IndusInd Bank',
  'Post Office Savings Bank (POSB)',
  'LIC of India',
  'EPFO (Employees Provident Fund)',
  'Zerodha / Upstox Demat'
];

export const INSTITUTION_CLAIM_GUIDES: ClaimGuide[] = [
  {
    institution: 'State Bank of India (SBI)',
    category: 'bank_fd',
    nomineePath: [
      'Submit Form Annexure-4 (Claim Form for Nominee / Survivor)',
      'Attach Original Passbook / Fixed Deposit Receipt (FDR)',
      'Attach Original Death Certificate + Certified Copy',
      'Attach Nominee Aadhaar & PAN Card for KYC verification',
      'Submit cancelled cheque / bank details for fund transfer'
    ],
    nonNomineePath: [
      'Submit Form Annexure-A (Claim form for Legal Heirs without nomination)',
      'Submit Legal Heir Certificate / Surviving Member Certificate from Tahsildar/SDM',
      'Submit Affidavit cum Indemnity Bond on Stamp Paper (Annexure-C) signed by all legal heirs',
      'Submit Letter of Disclaimer (Annexure-B) from heirs relinquishing claim in favor of primary applicant',
      'Two Surety holders with independent net worth verification'
    ],
    requiredDocs: [
      'Death Certificate (Original + Notarized)',
      'Aadhaar & PAN of Nominee/Claimant',
      'SBI Deposit Receipt / Passbook',
      'Cancelled Cheque of Claimant Bank Account',
      'Form 15G / 15H (to avoid TDS on accrued interest)'
    ],
    estimatedDays: 7,
    officialPortalUrl: 'https://sbi.co.in'
  },
  {
    institution: 'HDFC Bank',
    category: 'bank_fd',
    nomineePath: [
      'Submit Deceased Claim Form for Nominee (Form 21)',
      'Attach Original FD Certificate / Passbook',
      'Submit Death Certificate issued by Municipal Corporation',
      'Submit KYC of Nominee (Aadhaar & PAN)',
      'Fund transfer via NEFT to nominee account'
    ],
    nonNomineePath: [
      'Submit Deceased Claim Form for Legal Heirs (Form 22)',
      'Submit Indemnity Bond on Rs 500 Stamp Paper attested by Notary',
      'Submit Legal Heir Certificate from Tehsildar or Revenue Dept'
    ],
    requiredDocs: [
      'HDFC Deceased Claim Form',
      'Death Certificate (Attested)',
      'KYC Proofs of Claimant',
      'Cancelled Cheque for NEFT transfer'
    ],
    estimatedDays: 7,
    officialPortalUrl: 'https://hdfcbank.com'
  },
  {
    institution: 'ICICI Bank',
    category: 'bank_fd',
    nomineePath: [
      'Submit Nominee Claim Settlement Application Form',
      'Submit Original Deposit Receipt / Passbook',
      'Submit Notarized Death Certificate',
      'Submit Nominee PAN & Aadhaar'
    ],
    nonNomineePath: [
      'Submit Application Form for Settlement without Nomination',
      'Submit Legal Heirship Certificate or Succession Certificate',
      'Submit Joint Indemnity Bond signed by all Class-1 heirs'
    ],
    requiredDocs: [
      'ICICI Bank Claim Form',
      'Death Certificate',
      'Claimant Aadhaar & PAN',
      'Bank Passbook Copy'
    ],
    estimatedDays: 7,
    officialPortalUrl: 'https://icicibank.com'
  },
  {
    institution: 'LIC of India (Life Insurance)',
    category: 'insurance',
    nomineePath: [
      'Submit LIC Form No. 3783 (Claimant Statement)',
      'Submit Original Policy Document',
      'Submit Death Certificate issued by Registrar of Births & Deaths',
      'Submit Medical Attendant Statement (Form 3801) if death within 3 years of policy',
      'Submit NEFT Mandate Form with cancelled cheque'
    ],
    nonNomineePath: [
      'Submit Legal Heir Certificate / Succession Certificate issued by District Court',
      'Submit Indemnity Bond on prescribed Judicial Stamp Paper',
      'NOC Deed from all other legal class-1 heirs'
    ],
    requiredDocs: [
      'Original LIC Policy Bond',
      'Death Certificate',
      'Claimant KYC (Aadhaar, PAN)',
      'NEFT Mandate + Bank Passbook Copy',
      'Employer Certificate (if applicable)'
    ],
    estimatedDays: 14,
    officialPortalUrl: 'https://licindia.in'
  },
  {
    institution: 'EPFO (Employees Provident Fund)',
    category: 'epf_ppf',
    nomineePath: [
      'Submit Composite Claim Form (Death Cases): Form 20 (EPF) & Form 10D (Pension)',
      'Attach Form 5IF for Employees Deposit Linked Insurance (EDLI) benefit up to Rs 7 Lakhs',
      'Attach attested copy of Death Certificate',
      'Employer attestation (or Bank Manager attestation if company closed)'
    ],
    nonNomineePath: [
      'Submit Legal Heirship Certificate from Revenue Officer',
      'Submit Joint Affidavit by all class-1 heirs',
      'EPF Commissioner verification enquiry'
    ],
    requiredDocs: [
      'Form 20, 10D, and 5IF',
      'Member Death Certificate',
      'Nominee / Family Member Aadhaar & Bank Cheque',
      'Joint photograph of claimants with employer attestation'
    ],
    estimatedDays: 21,
    officialPortalUrl: 'https://unifiedportal-mem.epfindia.gov.in'
  }
];
