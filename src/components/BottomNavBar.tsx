import React from 'react';
import { Mic, PieChart, TrendingUp, MapPin, MessageSquare, Radio, BarChart3 } from 'lucide-react';
import { TabType, Language } from '../types';
import { getT } from '../utils/translations';

interface BottomNavBarProps {
  currentLanguage: Language;
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentLanguage,
  activeTab,
  onSelectTab,
}) => {
  const t = getT(currentLanguage);

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'voice', label: t.navVoice, icon: <Mic className="w-4 h-4" /> },
    { id: 'markets', label: t.navMarkets, icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'india-stats', label: t.navIndiaStats, icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'map', label: t.navMap, icon: <MapPin className="w-4 h-4" /> },
    { id: 'chat', label: t.navChat, icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <nav aria-label="Bottom Navigation" className="absolute bottom-3 left-2 right-2 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl overflow-hidden">
      <div className="max-w-xl mx-auto grid grid-cols-5 h-16 items-center px-0.5">
        {tabs.map((tItem) => {
          const isActive = activeTab === tItem.id;
          return (
            <button
              key={tItem.id}
              onClick={() => onSelectTab(tItem.id)}
              className={`flex flex-col items-center justify-center h-full min-h-[48px] px-1 transition-all relative ${
                isActive
                  ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-medium'
              }`}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-emerald-600 rounded-b-full" />
              )}
              <div className={`transition-transform ${isActive ? 'scale-110' : ''}`}>
                {tItem.icon}
              </div>
              <span className="text-[9px] tracking-tight mt-1 truncate w-full text-center">
                {tItem.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
