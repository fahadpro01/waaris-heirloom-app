import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingHero } from './components/LandingHero';
import { ReadinessTest } from './components/ReadinessTest';
import { AssetMapper } from './components/AssetMapper';
import { RecoveryRoadmap } from './components/RecoveryRoadmap';
import { LetterGenerator } from './components/LetterGenerator';
import { LocalAIChat } from './components/LocalAIChat';
import { LocalLLMModal } from './components/LocalLLMModal';
import { DigiLockerModal } from './components/DigiLockerModal';
import { AuthGate } from './components/AuthGate';
import { SmsToastBanner } from './components/SmsToastBanner';
import { InstallAppBanner } from './components/InstallAppBanner';
import { AITutorialModal } from './components/AITutorialModal';
import { DownloadAppModal } from './components/DownloadAppModal';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { PitchDeckModal } from './components/PitchDeckModal';

const AppContent: React.FC = () => {
  const { isAuthenticated, activeTab } = useApp();

  if (!isAuthenticated) {
    return (
      <>
        <SmsToastBanner />
        <AuthGate />
        <InstallAppBanner />
        <AITutorialModal />
        <DownloadAppModal />
        <VoiceAssistantModal />
        <PitchDeckModal />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 font-sans">
      <SmsToastBanner />
      <Navbar />
      <main className="min-h-[calc(100vh-140px)] pb-28 lg:pb-8">
        {activeTab === 'landing' && <LandingHero />}
        {activeTab === 'protect_test' && <ReadinessTest />}
        {activeTab === 'asset_mapper' && <AssetMapper />}
        {activeTab === 'recover_dashboard' && <RecoveryRoadmap />}
        {activeTab === 'letter_generator' && <LetterGenerator />}
        {activeTab === 'local_ai_chat' && <LocalAIChat />}
      </main>
      <Footer />
      <LocalLLMModal />
      <DigiLockerModal />
      <AITutorialModal />
      <DownloadAppModal />
      <VoiceAssistantModal />
      <PitchDeckModal />
      <InstallAppBanner />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
