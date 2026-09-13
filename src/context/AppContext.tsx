import React, { createContext, useContext, useState, useEffect } from 'react';
import { AssetItem, DeceasedProfile, LocalLLMPerformance, DigiLockerDoc } from '../types';
import { LocalLLMEngine } from '../services/localLLM';
import { DigiLockerService, SAMPLE_DIGILOCKER_DOCS } from '../services/digilocker';
import { PhoneDiscoveryService } from '../services/phoneDiscovery';

interface AppContextType {
  activeTab: 'landing' | 'protect_test' | 'asset_mapper' | 'recover_dashboard' | 'letter_generator' | 'local_ai_chat';
  setActiveTab: (tab: 'landing' | 'protect_test' | 'asset_mapper' | 'recover_dashboard' | 'letter_generator' | 'local_ai_chat') => void;
  
  // Real Phone Auth state
  isAuthenticated: boolean;
  userPhone: string;
  generatedOtp: string;
  generateRealOtp: (phone: string) => string;
  verifyRealOtp: (inputOtp: string) => boolean;
  logout: () => void;
  resetApp: () => void;

  assets: AssetItem[];
  addAsset: (asset: Omit<AssetItem, 'id'>) => void;
  updateAsset: (id: string, asset: Partial<AssetItem>) => void;
  deleteAsset: (id: string) => void;
  readinessScore: number;
  setReadinessScore: (score: number) => void;
  deceasedProfile: DeceasedProfile;
  setDeceasedProfile: React.Dispatch<React.SetStateAction<DeceasedProfile>>;
  isLocalLLMReady: boolean;
  localLLMMetrics: LocalLLMPerformance;
  initLocalLLM: (onProgress?: (progress: number, text: string) => void) => Promise<boolean>;
  showLocalLLMModal: boolean;
  setShowLocalLLMModal: (show: boolean) => void;
  showAITutorialModal: boolean;
  setShowAITutorialModal: (show: boolean) => void;
  showDownloadAppModal: boolean;
  setShowDownloadAppModal: (show: boolean) => void;
  showVoiceAssistantModal: boolean;
  setShowVoiceAssistantModal: (show: boolean) => void;
  showVoiceSecurityModal: boolean;
  setShowVoiceSecurityModal: (show: boolean) => void;
  selectedAssetForLetter: AssetItem | null;
  setSelectedAssetForLetter: (asset: AssetItem | null) => void;
  
  // DigiLocker Integration
  isDigiLockerConnected: boolean;
  showDigiLockerModal: boolean;
  setShowDigiLockerModal: (show: boolean) => void;
  connectDigiLocker: (mobile: string, otp: string) => Promise<boolean>;
  disconnectDigiLocker: () => void;
  digiLockerDocs: DigiLockerDoc[];
  importDigiLockerDocToAssetMap: (doc: DigiLockerDoc) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'landing' | 'protect_test' | 'asset_mapper' | 'recover_dashboard' | 'letter_generator' | 'local_ai_chat'>('landing');

  // Real Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('waaris_auth_logged') === 'true';
  });
  const [userPhone, setUserPhone] = useState<string>(() => {
    return localStorage.getItem('waaris_user_phone') || '';
  });
  const [generatedOtp, setGeneratedOtp] = useState<string>('');

  // Per-phone assets state
  const [assets, setAssets] = useState<AssetItem[]>(() => {
    const activePhone = localStorage.getItem('waaris_user_phone') || 'default';
    try {
      const saved = localStorage.getItem(`waaris_assets_${activePhone}`);
      if (saved) return JSON.parse(saved);
      return PhoneDiscoveryService.getInstance().getInitialAssetsForPhone(activePhone);
    } catch (e) {
      return PhoneDiscoveryService.getInstance().getInitialAssetsForPhone(activePhone);
    }
  });

  const [readinessScore, setReadinessScore] = useState<number>(72);
  const [showLocalLLMModal, setShowLocalLLMModal] = useState<boolean>(false);
  const [showAITutorialModal, setShowAITutorialModal] = useState<boolean>(false);
  const [showDownloadAppModal, setShowDownloadAppModal] = useState<boolean>(false);
  const [showVoiceAssistantModal, setShowVoiceAssistantModal] = useState<boolean>(false);
  const [showVoiceSecurityModal, setShowVoiceSecurityModal] = useState<boolean>(false);
  const [showDigiLockerModal, setShowDigiLockerModal] = useState<boolean>(false);
  const [selectedAssetForLetter, setSelectedAssetForLetter] = useState<AssetItem | null>(null);

  const [deceasedProfile, setDeceasedProfile] = useState<DeceasedProfile>({
    fullName: 'Ravi Kumar',
    dateOfPassing: '2026-08-12',
    state: 'Tamil Nadu',
    applicantName: 'Lakshmi Kumar',
    applicantRelation: 'Spouse'
  });

  const digiLockerService = DigiLockerService.getInstance();
  const [isDigiLockerConnected, setIsDigiLockerConnected] = useState<boolean>(digiLockerService.isDigiLockerConnected());
  const [digiLockerDocs, setDigiLockerDocs] = useState<DigiLockerDoc[]>(SAMPLE_DIGILOCKER_DOCS);

  const engine = LocalLLMEngine.getInstance();
  const [isLocalLLMReady, setIsLocalLLMReady] = useState<boolean>(false);
  const [localLLMMetrics, setLocalLLMMetrics] = useState<LocalLLMPerformance>(engine.getMetrics());

  // Save assets specifically tied to userPhone
  useEffect(() => {
    const key = userPhone ? `waaris_assets_${userPhone}` : 'waaris_assets_default';
    localStorage.setItem(key, JSON.stringify(assets));
  }, [assets, userPhone]);

  // Load assets when userPhone changes
  useEffect(() => {
    if (userPhone) {
      const key = `waaris_assets_${userPhone}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        setAssets(JSON.parse(saved));
      } else {
        const initial = PhoneDiscoveryService.getInstance().getInitialAssetsForPhone(userPhone);
        setAssets(initial);
      }
    }
  }, [userPhone]);

  const generateRealOtp = (phone: string): string => {
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    setUserPhone(phone);
    return randomOtp;
  };

  const verifyRealOtp = (inputOtp: string): boolean => {
    const cleanInput = inputOtp.trim();
    if (generatedOtp && cleanInput === generatedOtp.trim()) {
      setIsAuthenticated(true);
      localStorage.setItem('waaris_auth_logged', 'true');
      localStorage.setItem('waaris_user_phone', userPhone);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserPhone('');
    setGeneratedOtp('');
    localStorage.removeItem('waaris_auth_logged');
    localStorage.removeItem('waaris_user_phone');
  };

  const resetApp = () => {
    setIsAuthenticated(false);
    setUserPhone('');
    setGeneratedOtp('');
    localStorage.clear();
    setAssets(PhoneDiscoveryService.getInstance().getInitialAssetsForPhone('9876543210'));
    setActiveTab('landing');
  };

  const initLocalLLM = async (onProgress?: (p: number, t: string) => void) => {
    const success = await engine.initializeModel(onProgress);
    setIsLocalLLMReady(success);
    setLocalLLMMetrics(engine.getMetrics());
    return success;
  };

  const connectDigiLocker = async (mobile: string, otp: string) => {
    const success = await digiLockerService.connectWithDigiLocker(mobile, otp);
    if (success) {
      setIsDigiLockerConnected(true);
      const docs = await digiLockerService.fetchVerifiedDocuments();
      setDigiLockerDocs(docs);
    }
    return success;
  };

  const disconnectDigiLocker = () => {
    digiLockerService.disconnect();
    setIsDigiLockerConnected(false);
  };

  const importDigiLockerDocToAssetMap = (doc: DigiLockerDoc) => {
    const newAsset: Omit<AssetItem, 'id'> = {
      name: doc.name,
      category: doc.doctype === 'INPOL' ? 'insurance' : doc.doctype === 'EPFOUAN' ? 'epf_ppf' : 'bank_fd',
      institution: doc.issuer,
      referenceNo: doc.uri,
      documentLocation: 'DigiLocker MeitY Verified Vault',
      nomineeStatus: 'confirmed',
      nomineeName: 'DigiLocker Verified Family Link',
      estimatedValue: doc.doctype === 'INPOL' ? 'Rs 10,00,000' : 'Verified Document',
      notes: `Imported directly from Government DigiLocker Vault on ${new Date().toLocaleDateString('en-IN')}`,
      isDigiLockerVerified: true,
      digiLockerDocUri: doc.uri
    };
    addAsset(newAsset);
  };

  const addAsset = (newAsset: Omit<AssetItem, 'id'>) => {
    const item: AssetItem = {
      ...newAsset,
      id: 'asset-' + Date.now()
    };
    setAssets((prev) => [...prev, item]);
  };

  const updateAsset = (id: string, updated: Partial<AssetItem>) => {
    setAssets((prev) => prev.map((a) => (a.id === id ? { ...a, ...updated } : a)));
  };

  const deleteAsset = (id: string) => {
    setAssets((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isAuthenticated,
        userPhone,
        generatedOtp,
        generateRealOtp,
        verifyRealOtp,
        logout,
        resetApp,
        assets,
        addAsset,
        updateAsset,
        deleteAsset,
        readinessScore,
        setReadinessScore,
        deceasedProfile,
        setDeceasedProfile,
        isLocalLLMReady,
        localLLMMetrics,
        initLocalLLM,
        showLocalLLMModal,
        setShowLocalLLMModal,
        showAITutorialModal,
        setShowAITutorialModal,
        showDownloadAppModal,
        setShowDownloadAppModal,
        showVoiceAssistantModal,
        setShowVoiceAssistantModal,
        showVoiceSecurityModal: showVoiceAssistantModal,
        setShowVoiceSecurityModal: setShowVoiceAssistantModal,
        selectedAssetForLetter,
        setSelectedAssetForLetter,
        isDigiLockerConnected,
        showDigiLockerModal,
        setShowDigiLockerModal,
        connectDigiLocker,
        disconnectDigiLocker,
        digiLockerDocs,
        importDigiLockerDocToAssetMap
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
