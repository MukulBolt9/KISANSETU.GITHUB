import React, { useState, useEffect } from 'react';
import { TrendingUp, RefreshCw, ChevronRight, BarChart3, Clock, Globe } from 'lucide-react';
import { Language, IndiaStatsData, NationalCommodity } from '../types';
import { getT } from '../utils/translations';

interface IndiaStatsTabProps {
  currentLanguage: Language;
}

export const IndiaStatsTab: React.FC<IndiaStatsTabProps> = ({ currentLanguage }) => {
  const t = getT(currentLanguage);
  const [data, setData] = useState<IndiaStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedCat, setExpandedCat] = useState<string | null>('Vegetables');

  useEffect(() => {
    fetch('/api/gemini/india-stats')
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch((err) => console.error('India Stats Fetch Error:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center flex flex-col items-center gap-3">
        <RefreshCw className="w-8 h-8 animate-spin text-emerald-600" />
        <span className="text-sm font-semibold text-slate-500">Aggregating National Mandi Data...</span>
      </div>
    );
  }

  const categories = data?.categories || {};

  return (
    <div className="space-y-4 pb-20 max-w-md mx-auto px-4 pt-2 text-xs">
      {/* Hero Stats Card */}
      <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl p-5 shadow-md space-y-4 relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-300" />
            <h2 className="font-extrabold text-lg tracking-tight">{t.indiaStatsTitle}</h2>
          </div>
          <span className="bg-emerald-700/50 text-[10px] px-2 py-1 rounded-full font-bold border border-emerald-500/30">
            {t.lastDailyUpdate}: {data?.lastUpdated}
          </span>
        </div>
        
        <p className="text-emerald-100/80 text-xs font-medium relative z-10 leading-relaxed">
          {t.indiaStatsSubtitle}
        </p>

        <div className="grid grid-cols-2 gap-3 relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <div className="text-[10px] uppercase font-bold text-emerald-300 mb-1">Items Tracked</div>
            <div className="text-2xl font-black font-mono">60+</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <div className="text-[10px] uppercase font-bold text-emerald-300 mb-1">Mandi Feeds</div>
            <div className="text-2xl font-black font-mono">542</div>
          </div>
        </div>

        {/* Decorative background icon */}
        <BarChart3 className="absolute -bottom-4 -right-4 w-24 h-24 text-emerald-400/10 rotate-12" />
      </div>

      {/* Categorized List */}
      <div className="space-y-2">
        {Object.keys(categories).map((catName) => (
          <div key={catName} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <button
              onClick={() => setExpandedCat(expandedCat === catName ? null : catName)}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span className="font-extrabold text-sm text-slate-800 dark:text-slate-200 tracking-tight">{catName}</span>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded font-bold">
                  {categories[catName].length}
                </span>
              </div>
              <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${expandedCat === catName ? 'rotate-90' : ''}`} />
            </button>

            {expandedCat === catName && (
              <div className="px-4 pb-4 space-y-1.5 border-t border-slate-100 dark:border-slate-800 pt-3">
                {categories[catName].map((item: NationalCommodity) => (
                  <div key={item.name} className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800/60">
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="font-bold text-slate-900 dark:text-slate-100 truncate">{item.name}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] text-slate-500 font-medium">India Avg</span>
                        <div className={`flex items-center gap-0.5 text-[10px] font-bold ${
                          item.trend === 'UP' ? 'text-emerald-600' : item.trend === 'DOWN' ? 'text-red-600' : 'text-slate-500'
                        }`}>
                          {item.trend === 'UP' ? '↑' : item.trend === 'DOWN' ? '↓' : '•'}
                          {Math.abs(item.changePercent)}%
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-black font-mono text-slate-950 dark:text-slate-100">
                        ₹{item.avgPrice.toLocaleString()}
                      </div>
                      <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Per Qtl</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Data Source Notice */}
      <div className="flex items-center gap-2 justify-center py-4 opacity-60">
        <Clock className="w-3 h-3 text-slate-400" />
        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">
          Daily Refresh Powered by Grounded AI
        </span>
      </div>
    </div>
  );
};
