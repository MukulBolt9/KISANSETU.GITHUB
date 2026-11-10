import React, { useState } from 'react';
import { X, MapPin, Navigation, Check, Sparkles, RefreshCw } from 'lucide-react';
import { INDIAN_AGRICULTURAL_REGIONS, findClosestDistrict, IndianDistrict } from '../utils/indianDistricts';
import { Language } from '../types';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDistrict: string;
  currentState: string;
  onSelectLocation: (district: string, state: string, lat: number, lng: number) => void;
  currentLanguage: Language;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentDistrict,
  currentState,
  onSelectLocation,
}) => {
  const [selectedState, setSelectedState] = useState(currentState);
  const [selectedDistrictName, setSelectedDistrictName] = useState(currentDistrict);
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [gpsMessage, setGpsMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const activeStateObj =
    INDIAN_AGRICULTURAL_REGIONS.find((s) => s.state.toLowerCase() === selectedState.toLowerCase()) ||
    INDIAN_AGRICULTURAL_REGIONS[0];

  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    const stateObj = INDIAN_AGRICULTURAL_REGIONS.find((s) => s.state === stateName);
    if (stateObj && stateObj.districts.length > 0) {
      setSelectedDistrictName(stateObj.districts[0].district);
    }
  };

  const handleConfirmSelection = () => {
    const districtObj = activeStateObj.districts.find(
      (d) => d.district.toLowerCase() === selectedDistrictName.toLowerCase()
    ) || activeStateObj.districts[0];

    onSelectLocation(districtObj.district, districtObj.state, districtObj.lat, districtObj.lng);
    onClose();
  };

  const handleDetectGps = () => {
    if (!('geolocation' in navigator)) {
      setGpsMessage('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetectingGps(true);
    setGpsMessage(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const closest: IndianDistrict = findClosestDistrict(latitude, longitude);

        setSelectedState(closest.state);
        setSelectedDistrictName(closest.district);
        setIsDetectingGps(false);
        setGpsMessage(`📍 GPS Locked: ${closest.district}, ${closest.state}`);

        setTimeout(() => {
          onSelectLocation(closest.district, closest.state, closest.lat, closest.lng);
          onClose();
        }, 800);
      },
      (error) => {
        setIsDetectingGps(false);
        console.warn('GPS location error', error);
        // Default to regional hub gracefully
        setGpsMessage('GPS signal unavailable. Please pick your state & district below.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-700/80 border border-emerald-500/40 flex items-center justify-center text-amber-300">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Select Your Farm Area (India)</h3>
              <p className="text-[10px] text-emerald-200">Auto-centers Google Maps & live Mandi rates</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-950/60 hover:bg-emerald-950 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4 text-xs">
          {/* Active Location Display */}
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block">
                Active Region
              </span>
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5 mt-0.5">
                <span>🇮🇳 {currentDistrict}, {currentState}</span>
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-emerald-300 dark:border-emerald-800">
              Active
            </span>
          </div>

          {/* GPS Auto-Detect Button */}
          <button
            onClick={handleDetectGps}
            disabled={isDetectingGps}
            className="w-full py-3 px-4 rounded-2xl bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-xs"
          >
            {isDetectingGps ? (
              <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
            ) : (
              <Navigation className="w-4 h-4 text-emerald-400 dark:text-white" />
            )}
            <span>{isDetectingGps ? 'Detecting Local GPS Coordinates...' : 'Detect Current GPS Location'}</span>
          </button>

          {gpsMessage && (
            <div className="text-center font-medium text-[11px] text-emerald-700 dark:text-emerald-300 bg-emerald-100/60 dark:bg-emerald-950/60 p-2 rounded-xl">
              {gpsMessage}
            </div>
          )}

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink mx-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Or Choose Indian District
            </span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          {/* State Dropdown */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Select State:
            </label>
            <select
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
            >
              {INDIAN_AGRICULTURAL_REGIONS.map((st) => (
                <option key={st.state} value={st.state}>
                  {st.state}
                </option>
              ))}
            </select>
          </div>

          {/* District Dropdown */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Select Agricultural District:
            </label>
            <select
              value={selectedDistrictName}
              onChange={(e) => setSelectedDistrictName(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
            >
              {activeStateObj.districts.map((d) => (
                <option key={d.district} value={d.district}>
                  {d.district} ({d.mandiName})
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmSelection}
              className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Set Location & Center Map</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
