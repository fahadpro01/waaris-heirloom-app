import { DigiLockerDoc } from '../types';

export const SAMPLE_DIGILOCKER_DOCS: DigiLockerDoc[] = [
  {
    id: 'digi-1',
    name: 'Aadhaar Card (Govt of India Verified)',
    issuer: 'Unique Identification Authority of India (UIDAI)',
    doctype: 'ADHAR',
    date: '14-Mar-2024',
    uri: 'in.gov.uidai.aadhaar-9876XXXX1234',
    isLinkedToAsset: true
  },
  {
    id: 'digi-2',
    name: 'PAN Verification Record',
    issuer: 'Income Tax Department (CBDT)',
    doctype: 'PANCR',
    date: '10-Jan-2024',
    uri: 'in.gov.tax.pan-ABCDE1234F',
    isLinkedToAsset: true
  },
  {
    id: 'digi-3',
    name: 'LIC Jeevan Anand Policy Document',
    issuer: 'Life Insurance Corporation of India (LIC)',
    doctype: 'INPOL',
    date: '05-[#059669]-2025',
    uri: 'in.gov.lic.policy-4471XXXX89',
    isLinkedToAsset: true
  },
  {
    id: 'digi-4',
    name: 'EPFO UAN & Pension Certificate',
    issuer: 'Employees Provident Fund Organisation (EPFO)',
    doctype: 'EPFOUAN',
    date: '18-Feb-2025',
    uri: 'in.gov.epfindia.uan-100987XXXXXX',
    isLinkedToAsset: false
  }
];

export class DigiLockerService {
  private static instance: DigiLockerService;
  private isConnected: boolean = false;
  private userMobile: string = '';

  private constructor() {}

  public static getInstance(): DigiLockerService {
    if (!DigiLockerService.instance) {
      DigiLockerService.instance = new DigiLockerService();
    }
    return DigiLockerService.instance;
  }

  public async connectWithDigiLocker(mobileNumber: string, otp: string): Promise<boolean> {
    // Simulate DigiLocker MeitY OAuth 2.0 authentication
    await new Promise((r) => setTimeout(r, 1200));
    if (otp.length === 6 || otp === '123456' || otp.length >= 4) {
      this.isConnected = true;
      this.userMobile = mobileNumber;
      localStorage.setItem('waaris_digilocker_connected', 'true');
      localStorage.setItem('waaris_digilocker_mobile', mobileNumber);
      return true;
    }
    return false;
  }

  public isDigiLockerConnected(): boolean {
    return this.isConnected || localStorage.getItem('waaris_digilocker_connected') === 'true';
  }

  public getConnectedMobile(): string {
    return this.userMobile || localStorage.getItem('waaris_digilocker_mobile') || '+91 98765 XXXXX';
  }

  public disconnect() {
    this.isConnected = false;
    this.userMobile = '';
    localStorage.removeItem('waaris_digilocker_connected');
    localStorage.removeItem('waaris_digilocker_mobile');
  }

  public async fetchVerifiedDocuments(): Promise<DigiLockerDoc[]> {
    await new Promise((r) => setTimeout(r, 800));
    return SAMPLE_DIGILOCKER_DOCS;
  }
}
