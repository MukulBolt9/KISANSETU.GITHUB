import React from 'react';
import { Wifi, WifiOff, Smartphone, ShieldCheck, Zap, Download } from 'lucide-react';
import { Language } from '../types';
import { getT } from '../utils/translations';

interface TopLowDataBarProps {
  currentLanguage: Language;
  kbSaved: number;
  is2gMode: boolean;
  onToggle2g: () => void;
  onOpenSmsBridge: () => void;
  onOpenAndroidInstall: () => void;
  syncPercent?: number;
  currentDistrict: string;
  currentState: string;
  onOpenLocationModal: () => void;
}

export const TopLowDataBar: React.FC<TopLowDataBarProps> = ({
  currentLanguage,
  kbSaved,
  is2gMode,
  onToggle2g,
  onOpenSmsBridge,
  onOpenAndroidInstall,
  syncPercent = 100,
  currentDistrict,
  currentState,
  onOpenLocationModal,
}) => {
  const t = getT(currentLanguage);

  return (
    <header className="sticky top-0 z-40 bg-[#166534] text-white shadow-sm border-b border-emerald-800">
      {/* Primary Brand & Status Row */}
      <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between gap-2 text-xs">
        {/* Brand Lockup */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center font-bold text-emerald-200 text-sm shadow-inner">
            🌾
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-extrabold text-sm tracking-tight text-white">KISANSETU AI</span>
            <span className="text-[10px] text-emerald-200 font-medium hidden sm:inline">
              {t.subTitle}
            </span>
          </div>
        </div>

        {/* Indian Area / District Selector Pill */}
        <button
          onClick={onOpenLocationModal}
          className="flex items-center gap-1.5 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/70 hover:border-amber-400 px-2.5 py-1 rounded-full text-[11px] font-bold text-emerald-100 transition-all active:scale-95 shadow-xs"
          title="Change Indian district / Auto-locate with GPS"
        >
          <span className="text-amber-400">📍</span>
          <span className="truncate max-w-[100px] sm:max-w-[150px] font-semibold text-white">
            {currentDistrict}, {currentState}
          </span>
          <span className="text-[9px] bg-emerald-800 text-amber-200 px-1 py-0.2 rounded font-mono font-bold">
            🇮🇳 Change
          </span>
        </button>

        {/* Live Low-Data Metrics & Network Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Data Savings Chip */}
          <div
            title="Total network payload saved compared to traditional visual agritech apps"
            className="hidden sm:flex items-center gap-1.5 bg-emerald-900/70 border border-emerald-600/50 px-2.5 py-1 rounded-full text-[11px] font-mono text-emerald-100"
          >
            <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
            <span className="font-bold">{kbSaved} KB</span>
            <span className="text-[10px] text-emerald-300/80 hidden xs:inline">{t.kbSaved}</span>
          </div>

          {/* Android App Button */}
          <button
            onClick={onOpenAndroidInstall}
            className="flex items-center gap-1 bg-emerald-900/90 hover:bg-emerald-800 text-amber-300 border border-amber-400/50 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs transition-transform active:scale-95 shrink-0"
          >
            <Download className="w-3 h-3 text-amber-300" />
            <span className="hidden xs:inline">Android</span>
            <span>App</span>
          </button>

          {/* 2G Simulation Toggle */}
          <button
            onClick={onToggle2g}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-semibold transition-all ${
              is2gMode
                ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-sm'
                : 'bg-emerald-900/40 border-emerald-600/40 text-emerald-200 hover:bg-emerald-900/70'
            }`}
          >
            {is2gMode ? (
              <>
                <WifiOff className="w-3 h-3 text-amber-300" />
                <span>{t.mode2g}</span>
              </>
            ) : (
              <>
                <Wifi className="w-3 h-3 text-emerald-300" />
                <span>{t.mode4g}</span>
              </>
            )}
          </button>

          {/* SMS Bridge Button */}
          <button
            onClick={onOpenSmsBridge}
            className="flex items-center gap-1 bg-amber-600 hover:bg-amber-500 text-white px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm transition-transform active:scale-95 shrink-0 hidden sm:flex"
          >
            <Smartphone className="w-3 h-3" />
            <span>{t.smsBridge}</span>
          </button>

          {/* Sync Indicator */}
          <div className="hidden md:flex items-center gap-1 text-[10px] text-emerald-200 bg-emerald-900/50 px-2 py-1 rounded">
            <ShieldCheck className="w-3 h-3 text-emerald-300" />
            <span>{t.sync}</span>
          </div>
        </div>
      </div>

      {/* 2G Throttling Alert Strip if 2G Mode is active */}
      {is2gMode && (
        <div className="bg-amber-600 text-slate-950 px-4 py-1 text-[11px] font-semibold text-center flex items-center justify-center gap-2">
          <span>⚡ {t.mode2g} Active (Micro JSON Stream Mode &lt; 1.5 KB)</span>
        </div>
      )}
    </header>
  );
};
