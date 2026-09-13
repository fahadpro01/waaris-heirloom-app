import React, { useState } from 'react';
import { Bot, Send, User, ShieldCheck, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LocalLLMEngine } from '../services/localLLM';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export const LocalAIChat: React.FC = () => {
  const { localLLMMetrics, isLocalLLMReady, initLocalLLM, resetApp } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Namaste! I am your Waaris Private AI Assistant. Ask me any question in simple terms about Indian bank claim rules, nominee vs legal heir laws, or state succession papers. Type "reset" anytime to reset the app.'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  const engine = LocalLLMEngine.getInstance();

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isReplying) return;

    setMessages(prev => [...prev, { sender: 'user', text: textToSend }]);
    setInputQuery('');

    if (textToSend.trim().toLowerCase() === 'reset' || textToSend.trim().toLowerCase().includes('reset app')) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Resetting app session and clearing login state...' }]);
      setTimeout(() => {
        resetApp();
      }, 1000);
      return;
    }

    setIsReplying(true);

    if (!isLocalLLMReady) {
      await initLocalLLM();
    }

    setMessages(prev => [...prev, { sender: 'ai', text: '...' }]);

    await engine.streamAnswerQuery(textToSend, (chunkText) => {
      setMessages(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = { sender: 'ai', text: chunkText };
        return copy;
      });
    });

    setIsReplying(false);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8 pb-28 space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-stone-200 pb-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-stone-900 sm:text-3xl">Ask AI Bank & Legal Advisor</h1>
          <p className="text-xs sm:text-sm text-stone-600 font-semibold">
            Simple answers for Indian family bank claims.
          </p>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border-2 border-emerald-300 bg-emerald-50 px-3.5 py-1 text-xs font-extrabold text-emerald-900">
          <ShieldCheck className="h-4 w-4 text-emerald-700" />
          <span>Private On Your Phone</span>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
        <span className="text-stone-700 font-extrabold flex items-center gap-1">
          <HelpCircle className="h-4 w-4 text-amber-700" /> Tap to ask:
        </span>
        {[
          "Nominee vs Legal Heir in India?",
          "How to claim SBI deposit without password?",
          "EPFO Form 20 EDLI claim rules",
          "Legal Heir Certificate in Tamil Nadu or Delhi"
        ].map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="rounded-2xl border-2 border-stone-200 bg-white px-3 py-1.5 font-extrabold text-stone-800 hover:border-amber-400 hover:bg-amber-50 transition shadow-sm"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Box */}
      <div className="rounded-3xl border-2 border-stone-200 bg-white p-5 space-y-4 min-h-[380px] max-h-[500px] overflow-y-auto shadow-sm">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-amber-100 border-2 border-amber-300 text-amber-900">
                <Bot className="h-5 w-5" />
              </div>
            )}

            <div
              className={`rounded-3xl p-4 text-xs sm:text-sm leading-relaxed max-w-[85%] sm:max-w-md font-semibold ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white font-extrabold shadow'
                  : 'bg-stone-50 border-2 border-stone-200 text-stone-900'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>

            {msg.sender === 'user' && (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-stone-200 text-stone-800 font-bold">
                <User className="h-5 w-5" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-3"
      >
        <input
          type="text"
          placeholder="Ask any question about bank claims or legal papers..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          className="flex-1 rounded-2xl border-2 border-stone-200 bg-white px-4 py-3 text-xs sm:text-sm font-semibold text-stone-900 focus:border-emerald-600 focus:outline-none shadow-sm"
        />
        <button
          type="submit"
          disabled={isReplying || !inputQuery.trim()}
          className="flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-xs sm:text-sm font-extrabold text-white hover:bg-emerald-700 transition disabled:opacity-50 shadow"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>

    </div>
  );
};
