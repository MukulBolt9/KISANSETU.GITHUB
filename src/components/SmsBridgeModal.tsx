import React, { useState } from 'react';
import { X, Smartphone, Copy, Check, Send } from 'lucide-react';
import { Language } from '../types';
import { getT } from '../utils/translations';

interface SmsBridgeModalProps {
  currentLanguage: Language;
  isOpen: boolean;
  onClose: () => void;
  crop: string;
}

export const SmsBridgeModal: React.FC<SmsBridgeModalProps> = ({
  currentLanguage,
  isOpen,
  onClose,
  crop,
}) => {
  const t = getT(currentLanguage);

  const [queryInput, setQueryInput] = useState(
    currentLanguage === 'Hindi'
      ? '800 रुपये में खाद खरीदी'
      : currentLanguage === 'Marathi'
      ? '८०० रुपयांचे खत घेतले'
      : currentLanguage === 'Punjabi'
      ? '800 ਰੁਪਏ ਦੀ ਖਾਦ ਖਰੀਦੀ'
      : 'Spent 800 on Urea fertilizer'
  );

  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateSmsCode = (text: string) => {
    const clean = text.toUpperCase();
    let code = 'KS';
    if (clean.includes('UREA') || clean.includes('FERTILIZER') || clean.includes('खाद') || clean.includes('ਖਾਦ')) code += '*FERT';
    else if (clean.includes('SEED') || clean.includes('बीज') || clean.includes('ਬੀਜ')) code += '*SEED';
    else if (clean.includes('PESTICIDE') || clean.includes('कीटनाशक')) code += '*PEST';
    else if (clean.includes('PRICE') || clean.includes('MANDI') || clean.includes('भाव') || clean.includes('ਭਾਅ')) code += '*PRICE';
    else code += '*EXP';

    code += `*${crop.toUpperCase().substring(0, 4)}`;

    const numMatch = text.match(/(\d+)/);
    if (numMatch) {
      code += `*${numMatch[0]}`;
    } else {
      code += '*0';
    }

    code += '#';
    return code;
  };

  const currentCode = generateSmsCode(queryInput);
  const targetSmsNumber = '56161';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-base">{t.smsTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-900/60 hover:bg-emerald-900 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 text-xs">
          <p className="text-slate-600 dark:text-slate-300">{t.smsDesc}</p>

          {/* Quick Query Input */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t.smsInputLabel}
            </label>
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder={t.smsInputPlaceholder}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
            />
          </div>

          {/* Compressed USSD Code Display */}
          <div className="bg-slate-950 text-amber-400 p-3 rounded-xl font-mono text-center relative border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">
              {t.smsEncodedLabel}
            </div>
            <div className="text-xl font-bold tracking-wider py-1 select-all">{currentCode}</div>
            <div className="text-[10px] text-slate-400 mt-1">Gateway: {targetSmsNumber} (Toll-Free)</div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t.smsCopied : t.smsCopy}</span>
            </button>

            <a
              href={`sms:${targetSmsNumber}?body=${encodeURIComponent(currentCode)}`}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold shadow-sm transition-colors text-center"
            >
              <Send className="w-4 h-4" />
              <span>{t.smsSend}</span>
            </a>
          </div>

          {/* Info footer */}
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 p-2.5 rounded-lg text-amber-900 dark:text-amber-200 text-[11px]">
            {t.smsNote}
          </div>
        </div>
      </div>
    </div>
  );
};
