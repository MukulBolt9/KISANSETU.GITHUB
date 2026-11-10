import React, { useState, useEffect } from 'react';
import { TabType, Language, ExpenseItem } from './types';
import { TopLowDataBar } from './components/TopLowDataBar';
import { BottomNavBar } from './components/BottomNavBar';
import { VoiceAiTab } from './components/VoiceAiTab';
import { MarketsTab } from './components/MarketsTab';
import { MapTab } from './components/MapTab';
import { ChatTab } from './components/ChatTab';
import { IndiaStatsTab } from './components/IndiaStatsTab';
import { CropTriageModal } from './components/CropTriageModal';
import { SmsBridgeModal } from './components/SmsBridgeModal';
import { AndroidInstallModal } from './components/AndroidInstallModal';
import { LocationModal } from './components/LocationModal';
import { AndroidDeviceShell } from './components/AndroidDeviceShell';
import { INDIAN_AGRICULTURAL_REGIONS } from './utils/indianDistricts';
import {
  getStoredExpenses,
  saveExpense,
  deleteExpense,
  getTotalBudget,
  saveTotalBudget,
  getKbSaved,
  getPrimaryCrop,
  getSelectedLang,
  saveSelectedLang,
  getActiveDistrict,
  saveActiveDistrict,
  getActiveState,
  saveActiveState,
} from './utils/offlineStore';

const QuotaBanner = () => {
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    const handler = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handler);
    return () => window.removeEventListener('gmp-quota-exceeded', handler);
  }, []);

  if (!quotaExceeded) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs text-center sticky top-0 z-50 shadow-sm animate-in fade-in slide-in-from-top duration-300">
      <span>
        Google Maps Platform quota reached. If you are the app owner, visit{' '}
        <a
          href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-semibold text-amber-950 hover:text-amber-800"
        >
          maps developer site
        </a>{' '}
        for instructions to update your account.
      </span>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('voice');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('Hindi');
  const [primaryCrop, setPrimaryCrop] = useState('Wheat');

  // Indian Geographic Area State
  const [currentDistrict, setCurrentDistrict] = useState(getActiveDistrict());
  const [currentState, setCurrentState] = useState(getActiveState());
  const [districtCoords, setDistrictCoords] = useState<{ lat: number; lng: number }>({
    lat: 29.6857,
    lng: 76.9905,
  });

  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [totalBudget, setTotalBudget] = useState(35000);
  const [kbSaved, setKbSaved] = useState(142.8);
  const [is2gMode, setIs2gMode] = useState(false);

  // Modals state
  const [isCropTriageOpen, setIsCropTriageOpen] = useState(false);
  const [isSmsBridgeOpen, setIsSmsBridgeOpen] = useState(false);
  const [isAndroidInstallOpen, setIsAndroidInstallOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  useEffect(() => {
    setExpenses(getStoredExpenses());
    setTotalBudget(getTotalBudget());
    setKbSaved(getKbSaved());
    setPrimaryCrop(getPrimaryCrop());
    setCurrentLanguage((getSelectedLang() as Language) || 'Hindi');

    const savedDist = getActiveDistrict();
    const savedState = getActiveState();
    setCurrentDistrict(savedDist);
    setCurrentState(savedState);

    // Find initial coords
    const stateObj = INDIAN_AGRICULTURAL_REGIONS.find(
      (s) => s.state.toLowerCase() === savedState.toLowerCase()
    );
    if (stateObj) {
      const distObj = stateObj.districts.find(
        (d) => d.district.toLowerCase() === savedDist.toLowerCase()
      );
      if (distObj) {
        setDistrictCoords({ lat: distObj.lat, lng: distObj.lng });
      }
    }
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
    saveSelectedLang(lang);
  };

  const handleToggle2g = () => {
    setIs2gMode((prev) => !prev);
  };

  const handleSelectLocation = (district: string, state: string, lat: number, lng: number) => {
    setCurrentDistrict(district);
    setCurrentState(state);
    setDistrictCoords({ lat, lng });
    saveActiveDistrict(district);
    saveActiveState(state);
  };

  const handleAddExpense = (newExp: Omit<ExpenseItem, 'id' | 'synced'>) => {
    saveExpense(newExp);
    setExpenses(getStoredExpenses());
    setKbSaved(getKbSaved());
  };

  const handleDeleteExpense = (id: string) => {
    const updated = deleteExpense(id);
    setExpenses(updated);
  };

  const handleUpdateTotalBudget = (amount: number) => {
    saveTotalBudget(amount);
    setTotalBudget(amount);
  };

  const activeState = INDIAN_AGRICULTURAL_REGIONS.find(s => s.state === currentState) || INDIAN_AGRICULTURAL_REGIONS[0];
  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const budgetRemaining = Math.max(0, totalBudget - totalSpent);

  return (
    <AndroidDeviceShell
      currentLanguage={currentLanguage}
      onOpenSmsBridge={() => setIsSmsBridgeOpen(true)}
    >
      <div className="h-full bg-[#F6F8F5] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col relative overflow-hidden">
        {/* Google Maps Quota Banner */}
        <QuotaBanner />

        {/* Persistent Low-Data Header with Indian District Picker */}
        <TopLowDataBar
          currentLanguage={currentLanguage}
          kbSaved={kbSaved}
          is2gMode={is2gMode}
          onToggle2g={handleToggle2g}
          onOpenSmsBridge={() => setIsSmsBridgeOpen(true)}
          onOpenAndroidInstall={() => setIsAndroidInstallOpen(true)}
          currentDistrict={currentDistrict}
          currentState={currentState}
          onOpenLocationModal={() => setIsLocationModalOpen(true)}
        />

        {/* Main Container - This is now the scrollable area */}
        <main className="flex-1 w-full max-w-xl mx-auto pb-24 pt-2 px-2 overflow-y-auto no-scrollbar">
          {activeTab === 'voice' && (
            <VoiceAiTab
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
              primaryCrop={primaryCrop}
              budgetRemaining={budgetRemaining}
              totalBudget={totalBudget}
              onOpenCropTriage={() => setIsCropTriageOpen(true)}
              onOpenSmsBridge={() => setIsSmsBridgeOpen(true)}
              onExpenseAdded={() => {
                setExpenses(getStoredExpenses());
                setKbSaved(getKbSaved());
              }}
              onNavigateToMarkets={() => setActiveTab('markets')}
            />
          )}

          {activeTab === 'markets' && (
            <MarketsTab
              currentLanguage={currentLanguage}
              primaryCrop={primaryCrop}
              expenses={expenses}
              currentDistrict={currentDistrict}
              currentState={currentState}
              onOpenLocationModal={() => setIsLocationModalOpen(true)}
            />
          )}

          {activeTab === 'map' && (
            <MapTab
              currentLanguage={currentLanguage}
              currentDistrict={currentDistrict}
              currentState={currentState}
              districtCoords={districtCoords}
              activeState={activeState}
              onOpenLocationModal={() => setIsLocationModalOpen(true)}
            />
          )}

          {activeTab === 'india-stats' && (
            <IndiaStatsTab currentLanguage={currentLanguage} />
          )}

          {activeTab === 'chat' && <ChatTab currentLanguage={currentLanguage} />}
        </main>

        {/* Bottom Fixed Navigation Bar */}
        <BottomNavBar
          currentLanguage={currentLanguage}
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
        />

      {/* Modals */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentDistrict={currentDistrict}
        currentState={currentState}
        onSelectLocation={handleSelectLocation}
        currentLanguage={currentLanguage}
      />

      <CropTriageModal
        currentLanguage={currentLanguage}
        isOpen={isCropTriageOpen}
        onClose={() => setIsCropTriageOpen(false)}
        cropName={primaryCrop}
      />

      <SmsBridgeModal
        currentLanguage={currentLanguage}
        isOpen={isSmsBridgeOpen}
        onClose={() => setIsSmsBridgeOpen(false)}
        crop={primaryCrop}
      />

      <AndroidInstallModal
        currentLanguage={currentLanguage}
        isOpen={isAndroidInstallOpen}
        onClose={() => setIsAndroidInstallOpen(false)}
      />
      </div>
    </AndroidDeviceShell>
  );
}
