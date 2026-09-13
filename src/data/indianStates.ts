export interface StateLegalInfo {
  code: string;
  name: string;
  legalHeirAuthority: string;
  onlinePortal?: string;
  avgCertificateDays: number;
  stampDutyNote: string;
  specialRules: string[];
}

export const INDIAN_STATES: StateLegalInfo[] = [
  {
    code: 'TN',
    name: 'Tamil Nadu',
    legalHeirAuthority: 'Tahsildar / Revenue Department (e-Sevai Portal)',
    onlinePortal: 'https://tnesevai.tn.gov.in',
    avgCertificateDays: 15,
    stampDutyNote: 'Minimal stamp duty for immediate family legal heir claims under Rs 5 Lakhs.',
    specialRules: [
      'G.O. Ms. No. 478 allows Tahsildar to issue Legal Heir Certificates to Class-I heirs directly.',
      'Married daughters have equal rights as per Hindu Succession (Amendment) Act.',
      'Ration card copy & Death certificate required for online e-Sevai application.'
    ]
  },
  {
    code: 'MH',
    name: 'Maharashtra',
    legalHeirAuthority: 'Tehsildar Office / Aaple Sarkar Portal or Civil Court (Warisa Certificate)',
    onlinePortal: 'https://aaplesarkar.maharashtra.gov.in',
    avgCertificateDays: 30,
    stampDutyNote: 'Affidavit requires Rs 100 or Rs 500 stamp paper as per Bombay Stamp Act.',
    specialRules: [
      'Heirship Certificate (Waris Certificate) issued under Bombay Regulation VIII of 1827 for higher bank balances (> Rs 5L without nominee).',
      'Property succession in Municipal Corporation areas requires Property Card update via City Survey Office.'
    ]
  },
  {
    code: 'KA',
    name: 'Karnataka',
    legalHeirAuthority: 'Nada Kacheri / Revenue Department (Seva Sindhu Portal)',
    onlinePortal: 'https://sevasindhu.karnataka.gov.in',
    avgCertificateDays: 21,
    stampDutyNote: 'Rs 100 e-Stamp for Indemnity Bond and Family Tree Affidavit.',
    specialRules: [
      'Family Tree (Vamshawruksha) certified by Village Accountant / Revenue Inspector is required alongside Legal Heir Certificate.',
      'BBMP Khata Transfer required for real estate assets in Bangalore.'
    ]
  },
  {
    code: 'DL',
    name: 'Delhi NCR',
    legalHeirAuthority: 'Sub-Divisional Magistrate (SDM) / e-District Delhi Portal',
    onlinePortal: 'https://edistrict.delhigovt.nic.in',
    avgCertificateDays: 30,
    stampDutyNote: 'Rs 10 e-Stamp for Affidavit attested by Oath Commissioner/Notary Public.',
    specialRules: [
      'Surviving Member Certificate issued by SDM office acts as fast-track proof of heirs for bank claims upto Rs 10 Lakhs.',
      'Publication of public notice in 2 local newspapers (English + Hindi) required for non-nominee claims exceeding Rs 5 Lakhs.'
    ]
  },
  {
    code: 'UP',
    name: 'Uttar Pradesh',
    legalHeirAuthority: 'Tehsildar / eDistrict UP Portal or Civil Court',
    onlinePortal: 'https://edistrict.up.gov.in',
    avgCertificateDays: 25,
    stampDutyNote: 'Rs 100 non-judicial stamp paper for Indemnity Bond.',
    specialRules: [
      'Varasat (Succession) registration online for agricultural and rural land.',
      'NOC from other legal heirs required on notarized affidavit for single-account claim.'
    ]
  },
  {
    code: 'WB',
    name: 'West Bengal',
    legalHeirAuthority: 'Municipality Councillor / BDO / BL&LRO',
    onlinePortal: 'https://edistrict.wb.gov.in',
    avgCertificateDays: 20,
    stampDutyNote: 'Court fee stamp as per WB Court Fees Act for civil court succession applications.',
    specialRules: [
      'Local Ward Councillor / Panchayat Pradhan Certificate acts as initial heir verification for local bank branches.'
    ]
  },
  {
    code: 'TS',
    name: 'Telangana',
    legalHeirAuthority: 'MRO (Mandal Revenue Officer) / Meeseva Portal',
    onlinePortal: 'https://ts.meeseva.telangana.gov.in',
    avgCertificateDays: 15,
    stampDutyNote: 'Rs 100 Non-Judicial Stamp Paper.',
    specialRules: [
      'Family Member Certificate issued by MRO is universally accepted by banks in Hyderabad & Telangana districts.'
    ]
  },
  {
    code: 'KL',
    name: 'Kerala',
    legalHeirAuthority: 'Village Officer / Tahsildar / e-District Kerala',
    onlinePortal: 'https://edistrict.kerala.gov.in',
    avgCertificateDays: 30,
    stampDutyNote: 'Gazette publication required for final Legal Heir Certificate release.',
    specialRules: [
      'Provisional certificate issued first, followed by mandatory Kerala Government Gazette notification.'
    ]
  }
];
