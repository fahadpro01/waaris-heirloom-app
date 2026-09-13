import { AssetItem } from '../types';

export interface DiscoveredAccount {
  id: string;
  name: string;
  category: 'bank_fd' | 'insurance' | 'epf_ppf' | 'mutual_fund';
  institution: string;
  accountNumberMasked: string;
  estimatedValue: string;
  nomineeStatus: 'confirmed' | 'unassigned';
  nomineeName?: string;
  suggestedLocation: string;
}

export class PhoneDiscoveryService {
  private static instance: PhoneDiscoveryService;

  private constructor() {}

  public static getInstance(): PhoneDiscoveryService {
    if (!PhoneDiscoveryService.instance) {
      PhoneDiscoveryService.instance = new PhoneDiscoveryService();
    }
    return PhoneDiscoveryService.instance;
  }

  /**
   * Generates realistic initial assets customized specifically to the user's phone number
   */
  public getInitialAssetsForPhone(phone: string): AssetItem[] {
    const last4 = phone.slice(-4) || '9876';
    const first4 = phone.slice(0, 4) || '9876';

    return [
      {
        id: `asset-${phone}-1`,
        name: 'SBI Savings Account & Fixed Deposit',
        category: 'bank_fd',
        institution: 'State Bank of India',
        referenceNo: `SBI-3098${first4}${last4}`,
        documentLocation: 'Master File: Green Binder, Almirah Shelf 2',
        nomineeStatus: 'confirmed',
        nomineeName: 'Lakshmi Kumar (Spouse)',
        estimatedValue: `Rs ${(parseInt(last4) * 50 + 250000).toLocaleString('en-IN')}`,
        notes: 'Passbook and FD certificates kept in iron safe.',
        isDigiLockerVerified: true
      },
      {
        id: `asset-${phone}-2`,
        name: 'LIC Jeevan Anand Life Insurance',
        category: 'insurance',
        institution: 'LIC of India',
        referenceNo: `LIC-4471${last4}89`,
        documentLocation: 'DigiLocker Verified Vault (Policy #4471XXXX89)',
        nomineeStatus: 'confirmed',
        nomineeName: 'Lakshmi Kumar (Spouse)',
        estimatedValue: 'Rs 10,00,000',
        notes: 'Original policy bond in DigiLocker MeitY Vault.',
        isDigiLockerVerified: true,
        digiLockerDocUri: `in.gov.lic.policy-4471${last4}89`
      },
      {
        id: `asset-${phone}-3`,
        name: 'EPF Accumulated Balance',
        category: 'epf_ppf',
        institution: 'EPFO (Employees Provident Fund)',
        referenceNo: `UAN-1009${first4}${last4}`,
        documentLocation: 'Digital Cloud Drive / Printed Salary Slip',
        nomineeStatus: 'unassigned',
        estimatedValue: `Rs ${(parseInt(last4) * 40 + 320000).toLocaleString('en-IN')}`,
        notes: 'WARNING: e-Nomination pending on EPFO Member portal!',
        isDigiLockerVerified: true
      },
      {
        id: `asset-${phone}-4`,
        name: 'Zerodha Stocks & Demat Holdings',
        category: 'mutual_fund',
        institution: 'Zerodha Broking Ltd',
        referenceNo: `12081600${last4}01`,
        documentLocation: 'Passwords file in physical notebook',
        nomineeStatus: 'confirmed',
        nomineeName: 'Arun Kumar (Son)',
        estimatedValue: `Rs ${(parseInt(last4) * 30 + 150000).toLocaleString('en-IN')}`,
        notes: 'Nominee updated on Console portal.'
      }
    ];
  }

  public async discoverAssetsByPhone(mobileNumber: string): Promise<DiscoveredAccount[]> {
    await new Promise((r) => setTimeout(r, 1200));

    const last4 = mobileNumber.slice(-4) || '9876';
    const first4 = mobileNumber.slice(0, 4) || '9876';

    return [
      {
        id: 'disc-1',
        name: 'SBI Savings & Fixed Deposit',
        category: 'bank_fd',
        institution: 'State Bank of India (SBI)',
        accountNumberMasked: `SBI-3098${first4}${last4}`,
        estimatedValue: `Rs ${(parseInt(last4) * 50 + 250000).toLocaleString('en-IN')}`,
        nomineeStatus: 'confirmed',
        nomineeName: 'Spouse (Confirmed)',
        suggestedLocation: 'Master Bedroom Almirah, Green Passbook Binder'
      },
      {
        id: 'disc-2',
        name: 'HDFC Salary & Fixed Deposit',
        category: 'bank_fd',
        institution: 'HDFC Bank',
        accountNumberMasked: `HDFC-5010${last4}90`,
        estimatedValue: `Rs ${(parseInt(last4) * 35 + 200000).toLocaleString('en-IN')}`,
        nomineeStatus: 'confirmed',
        nomineeName: 'Spouse (Confirmed)',
        suggestedLocation: 'Study Desk Drawer, HDFC Cheque Book File'
      },
      {
        id: 'disc-3',
        name: 'ICICI Direct Mutual Funds',
        category: 'mutual_fund',
        institution: 'ICICI Bank / Mutual Fund',
        accountNumberMasked: `ICICI-FOLIO-${last4}`,
        estimatedValue: `Rs ${(parseInt(last4) * 45 + 400000).toLocaleString('en-IN')}`,
        nomineeStatus: 'confirmed',
        nomineeName: 'Son (Confirmed)',
        suggestedLocation: 'Digital Statement in Email'
      },
      {
        id: 'disc-4',
        name: 'LIC Jeevan Anand Policy',
        category: 'insurance',
        institution: 'LIC of India',
        accountNumberMasked: `LIC-4471${last4}89`,
        estimatedValue: 'Rs 10,00,000',
        nomineeStatus: 'confirmed',
        nomineeName: 'Spouse (Confirmed)',
        suggestedLocation: 'Home Locker Safe, Original Bond Certificate'
      },
      {
        id: 'disc-5',
        name: 'EPFO Employee Provident Fund',
        category: 'epf_ppf',
        institution: 'EPFO (Employees Provident Fund)',
        accountNumberMasked: `UAN-1009${first4}${last4}`,
        estimatedValue: `Rs ${(parseInt(last4) * 40 + 320000).toLocaleString('en-IN')}`,
        nomineeStatus: 'unassigned',
        suggestedLocation: 'Printed Salary Slip in Study Drawer'
      }
    ];
  }
}
