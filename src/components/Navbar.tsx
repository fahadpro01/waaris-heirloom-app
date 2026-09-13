import { Shield, FileText, HeartHandshake, Home, Bot, CheckCircle, Landmark, LogOut, Smartphone, Sparkles, Download, RotateCcw, Mic } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, setShowDigiLockerModal, setShowAITutorialModal, setShowDownloadAppModal, setShowVoiceSecurityModal, isDigiLockerConnected, userPhone, logout, resetApp } = useApp();

  return (
    <>
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-3 sm:px-6 py-2.5">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('landing')}
            className="flex cursor-pointer items-center gap-2.5 active:scale-95 transition-transform"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 shadow-md text-white">
              <Shield className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900">Waaris</span>
              <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[11px] font-extrabold text-emerald-800 border border-emerald-200">
                वारिस
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-stone-200 bg-stone-50 p-1 text-xs font-extrabold">
            <button
              onClick={() => setActiveTab('landing')}
              className={`rounded-full px-3.5 py-1.5 transition ${activeTab === 'landing' ? 'bg-emerald-600 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900 hover:bg-white'}`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('asset_mapper')}
              className={`rounded-full px-3.5 py-1.5 transition ${activeTab === 'asset_mapper' ? 'bg-emerald-600 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900 hover:bg-white'}`}
            >
              My Map
            </button>
            <button
              onClick={() => setActiveTab('recover_dashboard')}
              className={`rounded-full px-3.5 py-1.5 transition ${activeTab === 'recover_dashboard' ? 'bg-emerald-600 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900 hover:bg-white'}`}
            >
              Claims
            </button>
            <button
              onClick={() => setActiveTab('protect_test')}
              className={`rounded-full px-3.5 py-1.5 transition ${activeTab === 'protect_test' ? 'bg-emerald-600 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900 hover:bg-white'}`}
            >
              Quiz
            </button>
            <button
              onClick={() => setActiveTab('letter_generator')}
              className={`rounded-full px-3.5 py-1.5 transition ${activeTab === 'letter_generator' ? 'bg-emerald-600 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900 hover:bg-white'}`}
            >
              Letters
            </button>
            <button
              onClick={() => setActiveTab('local_ai_chat')}
              className={`rounded-full px-3.5 py-1.5 transition ${activeTab === 'local_ai_chat' ? 'bg-emerald-600 text-white shadow-xs' : 'text-stone-700 hover:text-stone-900 hover:bg-white'}`}
            >
              Ask AI
            </button>
          </nav>

          {/* Ultra-Clean Right Side Controls */}
          <div className="flex items-center gap-1 rounded-full border border-stone-200 bg-stone-50 p-1">
            <button
              onClick={resetApp}
              title="Reset App to initial setup screen"
              className="rounded-full p-1 text-stone-600 hover:bg-amber-100 hover:text-amber-800 transition"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            <button
              onClick={logout}
              title="Log Out"
              className="rounded-full p-1 text-stone-600 hover:bg-rose-100 hover:text-rose-700 transition"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t-2 border-amber-200 bg-white/95 backdrop-blur-xl px-2 py-2 lg:hidden shadow-2xl safe-area-pb">
        <button
          onClick={() => setActiveTab('landing')}
          className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-3 py-1.5 text-xs font-bold transition-all ${
            activeTab === 'landing' ? 'bg-emerald-100 text-emerald-900 font-extrabold scale-105 shadow-xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-[11px]">Home</span>
        </button>

        <button
          onClick={() => setActiveTab('asset_mapper')}
          className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-3 py-1.5 text-xs font-bold transition-all ${
            activeTab === 'asset_mapper' ? 'bg-emerald-100 text-emerald-900 font-extrabold scale-105 shadow-xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Shield className="h-5 w-5" />
          <span className="text-[11px]">My Map</span>
        </button>

        <button
          onClick={() => setActiveTab('recover_dashboard')}
          className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-3 py-1.5 text-xs font-bold transition-all ${
            activeTab === 'recover_dashboard' ? 'bg-amber-100 text-amber-900 font-extrabold scale-105 shadow-xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <HeartHandshake className="h-5 w-5" />
          <span className="text-[11px]">Claims</span>
        </button>

        <button
          onClick={() => setActiveTab('protect_test')}
          className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-3 py-1.5 text-xs font-bold transition-all ${
            activeTab === 'protect_test' ? 'bg-emerald-100 text-emerald-900 font-extrabold scale-105 shadow-xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <CheckCircle className="h-5 w-5" />
          <span className="text-[11px]">Quiz</span>
        </button>

        <button
          onClick={() => setActiveTab('local_ai_chat')}
          className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-3 py-1.5 text-xs font-bold transition-all ${
            activeTab === 'local_ai_chat' ? 'bg-emerald-100 text-emerald-900 font-extrabold scale-105 shadow-xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Bot className="h-5 w-5" />
          <span className="text-[11px]">Ask AI</span>
        </button>
      </div>
    </>
  );
};
