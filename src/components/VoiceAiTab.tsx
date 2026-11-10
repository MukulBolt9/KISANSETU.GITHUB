import React, { useState } from 'react';
import { Mic, Volume2, Plus, Sparkles, TrendingUp, ArrowUpRight, RefreshCw } from 'lucide-react';
import { Language, VoiceQueryResponse, ExpenseItem } from '../types';
import { saveExpense } from '../utils/offlineStore';
import { getT } from '../utils/translations';

interface VoiceAiTabProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  primaryCrop: string;
  budgetRemaining: number;
  totalBudget: number;
  onOpenCropTriage: () => void;
  onOpenSmsBridge: () => void;
  onExpenseAdded: (exp: ExpenseItem) => void;
  onNavigateToMarkets: () => void;
}

export const VoiceAiTab: React.FC<VoiceAiTabProps> = ({
  currentLanguage,
  onLanguageChange,
  primaryCrop,
  budgetRemaining,
  totalBudget,
  onOpenCropTriage,
  onOpenSmsBridge,
  onExpenseAdded,
  onNavigateToMarkets,
}) => {
  const t = getT(currentLanguage);

  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [processing, setProcessing] = useState(false);
  const [voiceResult, setVoiceResult] = useState<VoiceQueryResponse | null>(null);
  const [manualExpenseInput, setManualExpenseInput] = useState('');
  const [showQuickExpenseForm, setShowQuickExpenseForm] = useState(false);

  const languages: Language[] = ['Hindi', 'Hinglish', 'Marathi', 'Punjabi', 'English'];

  // Sample prompt chips for fast zero-friction voice simulation
  const samplePrompts = [
    { lang: 'Hindi', text: '₹800 में 2 बोरी यूरिया खाद खरीदी' },
    { lang: 'Hinglish', text: 'Bought 3 bags of certified wheat seed for 1200 rupees' },
    { lang: 'Marathi', text: 'गव्हासाठी ८०० रुपयांचे खत घेतले' },
    { lang: 'Punjabi', text: 'ਕਣਕ ਲਈ 1200 ਰੁਪਏ ਦਾ ਬੀਜ ਖਰੀਦਿਆ' },
    { lang: 'English', text: 'What is the wheat price forecast in Karnal Mandi?' },
  ];

  const startListening = () => {
    setIsListening(true);
    setSpokenText('');
    setVoiceResult(null);

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang =
        currentLanguage === 'Hindi'
          ? 'hi-IN'
          : currentLanguage === 'Marathi'
          ? 'mr-IN'
          : currentLanguage === 'Punjabi'
          ? 'pa-IN'
          : 'en-IN';
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');
        setSpokenText(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (spokenText) {
          handleVoiceSubmit(spokenText);
        }
      };

      recognition.start();
    } else {
      // Fallback demo simulation
      setTimeout(() => {
        const matchingSample = samplePrompts.find((p) => p.lang === currentLanguage) || samplePrompts[0];
        setSpokenText(matchingSample.text);
        setIsListening(false);
        handleVoiceSubmit(matchingSample.text);
      }, 1500);
    }
  };

  const handleVoiceSubmit = async (queryText: string) => {
    if (!queryText.trim()) return;
    setProcessing(true);
    try {
      const res = await fetch('/api/gemini/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          queryText,
          language: currentLanguage,
          crop: primaryCrop,
          budgetRemaining,
        }),
      });

      const data: VoiceQueryResponse = await res.json();
      setVoiceResult(data);

      if (data.intent === 'LOG_EXPENSE' && data.expenseData) {
        const saved = saveExpense({
          amount: data.expenseData.amount || 500,
          category: (data.expenseData.category as any) || 'Fertilizer',
          crop: data.expenseData.crop || primaryCrop,
          date: data.expenseData.date || new Date().toISOString().split('T')[0],
          note: data.expenseData.note || queryText,
        });
        onExpenseAdded(saved);
      }
    } catch (e) {
      console.error('Voice submit failed', e);
      setVoiceResult({
        intent: 'GENERAL',
        advisoryResponse: 'KisanSetu: High traffic. Showing regional crop benchmarks.',
        suggestedActions: ['Try again later', 'Check India Stats'],
        dataCompressedKB: 0.5,
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleQuickAddExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualExpenseInput) return;
    handleVoiceSubmit(manualExpenseInput);
    setManualExpenseInput('');
    setShowQuickExpenseForm(false);
  };

  const budgetPercent = Math.min(100, Math.round((budgetRemaining / totalBudget) * 100));

  return (
    <div className="space-y-4 pb-20 max-w-md mx-auto px-4 pt-3">
      {/* Language Selector Bar (Clean Segmented Tabs) */}
      <div className="bg-slate-200/80 dark:bg-slate-800 p-1 rounded-xl flex items-center justify-between text-xs overflow-x-auto no-scrollbar border border-slate-300/60 dark:border-slate-700">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => onLanguageChange(lang)}
            className={`px-2.5 py-1.5 font-semibold rounded-lg transition-all shrink-0 whitespace-nowrap ${
              currentLanguage === lang
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Hero Hold-to-Speak Mic Area */}
      <div className="bg-gradient-to-b from-emerald-800 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-emerald-700 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-200/90 mb-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Kisan AI • {currentLanguage}</span>
          </div>

          <h2 className="text-lg font-bold text-white mb-4">
            {isListening
              ? t.micListening
              : processing
              ? t.micProcessing
              : t.micHoldToSpeak}
          </h2>

          {/* Large Tactile Mic Button */}
          <button
            onClick={startListening}
            disabled={processing}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-2xl relative ${
              isListening
                ? 'bg-red-500 ring-8 ring-red-400/30 scale-105 animate-pulse'
                : processing
                ? 'bg-amber-600 ring-4 ring-amber-500/30'
                : 'bg-emerald-600 hover:bg-emerald-500 active:scale-95 ring-4 ring-emerald-400/20'
            }`}
          >
            {processing ? (
              <RefreshCw className="w-10 h-10 text-white animate-spin" />
            ) : (
              <Mic className="w-10 h-10 text-white" />
            )}
          </button>

          <p className="text-xs text-emerald-200/90 mt-4 max-w-xs font-medium">
            "{t.micPrompt}"
          </p>

          {/* Display Spoken Text Live */}
          {spokenText && (
            <div className="mt-3 px-3 py-1.5 bg-black/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-100 font-medium max-w-full truncate">
              "{spokenText}"
            </div>
          )}
        </div>

        {/* Quick Dialect Sample Prompts */}
        <div className="mt-4 pt-3 border-t border-emerald-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
          <span className="text-emerald-300/70 font-semibold shrink-0">{t.samplePromptLabel}</span>
          {samplePrompts
            .filter((p) => p.lang === currentLanguage)
            .map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSpokenText(sample.text);
                  handleVoiceSubmit(sample.text);
                }}
                className="px-2.5 py-1 bg-emerald-950/60 hover:bg-emerald-800 border border-emerald-600/40 rounded-full text-emerald-100 whitespace-nowrap shrink-0 transition-colors"
              >
                "{sample.text}"
              </button>
            ))}
        </div>
      </div>

      {/* Voice Result AI Output Card */}
      {voiceResult && (
        <div className="p-4 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900 rounded-2xl shadow-md space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold px-2.5 py-0.5 bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 rounded-full">
              {voiceResult.intent === 'LOG_EXPENSE'
                ? t.intentExpenseLogged
                : voiceResult.intent === 'MARKET_QUERY'
                ? t.intentMarketIntel
                : t.intentCropAdvisory}
            </span>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
              Payload: {voiceResult.dataCompressedKB} KB
            </span>
          </div>

          <div className="flex items-start gap-2">
            <Volume2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
              {voiceResult.advisoryResponse}
            </p>
          </div>

          {/* If expense logged */}
          {voiceResult.expenseData && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs font-bold text-emerald-950 dark:text-emerald-100">
              <div>
                <span>
                  {voiceResult.expenseData.category}: ₹{voiceResult.expenseData.amount}
                </span>
                <span className="text-slate-500 font-normal block text-[10px]">
                  {voiceResult.expenseData.crop} • {voiceResult.expenseData.date}
                </span>
              </div>
              <span className="text-emerald-700 dark:text-emerald-400 text-xs font-mono">
                {t.budgetSavedCheck}
              </span>
            </div>
          )}

          {/* Action pills */}
          {voiceResult.suggestedActions?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {voiceResult.suggestedActions.map((act, i) => (
                <button
                  key={i}
                  onClick={onNavigateToMarkets}
                  className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium flex items-center gap-1"
                >
                  <span>{act}</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TODAY'S SUMMARY CARD */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 tracking-tight">
            {t.todaysSummary}
          </h3>
          <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900">
            {primaryCrop} ({t.seasonPeak})
          </span>
        </div>

        {/* Budget Meter */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
            <span>{t.remainingBudget}</span>
            <span className="font-mono text-emerald-700 dark:text-emerald-400">
              ₹{budgetRemaining.toLocaleString()} / ₹{totalBudget.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                budgetPercent > 50 ? 'bg-emerald-600' : budgetPercent > 20 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${budgetPercent}%` }}
            />
          </div>
        </div>

        {/* Action Recommendation */}
        <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl flex items-start gap-2 text-xs">
          <TrendingUp className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-900 dark:text-amber-200">{t.recommendedAction}</span>
            <p className="text-amber-800 dark:text-amber-300 font-medium">
              {t.holdSaleRec}
            </p>
          </div>
        </div>
      </div>

      {/* QUICK LOGS (ONE TAP BUTTONS) */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          {t.quickLogsTitle}
        </h4>

        <div className="grid grid-cols-3 gap-2">
          {/* 1. Log Expense Button */}
          <button
            onClick={() => setShowQuickExpenseForm(!showQuickExpenseForm)}
            className="p-3 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white flex flex-col items-center justify-center gap-1 shadow-sm font-bold text-xs transition-transform active:scale-95"
          >
            <Plus className="w-5 h-5 text-amber-300" />
            <span className="text-[11px] text-center leading-tight">{t.btnLogExpense}</span>
          </button>

          {/* 2. Crop Triage Button */}
          <button
            onClick={onOpenCropTriage}
            className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white flex flex-col items-center justify-center gap-1 shadow-sm font-bold text-xs transition-transform active:scale-95"
          >
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span className="text-[11px] text-center leading-tight">{t.btnCropTriage}</span>
          </button>

          {/* 3. Price Check Button */}
          <button
            onClick={onNavigateToMarkets}
            className="p-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white flex flex-col items-center justify-center gap-1 shadow-sm font-bold text-xs transition-transform active:scale-95"
          >
            <TrendingUp className="w-5 h-5 text-white" />
            <span className="text-[11px] text-center leading-tight">{t.btnPriceCheck}</span>
          </button>
        </div>
      </div>

      {/* Inline Quick Add Expense Form */}
      {showQuickExpenseForm && (
        <form
          onSubmit={handleQuickAddExpenseSubmit}
          className="p-4 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 rounded-2xl shadow-md space-y-3 animate-in fade-in duration-200"
        >
          <div className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center justify-between">
            <span>{t.addExpenseTitle}</span>
            <button
              type="button"
              onClick={() => setShowQuickExpenseForm(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          </div>

          <input
            type="text"
            value={manualExpenseInput}
            onChange={(e) => setManualExpenseInput(e.target.value)}
            placeholder={currentLanguage === 'Hindi' ? 'जैसे 800 रुपये में खाद खरीदी' : 'e.g. Bought 2 bags urea for 800 rupees'}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
          />

          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs transition-colors shadow-xs"
          >
            {t.btnSubmitExpense}
          </button>
        </form>
      )}
    </div>
  );
};
