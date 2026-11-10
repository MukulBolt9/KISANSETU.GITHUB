import React, { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, MapMouseEvent, useMap } from '@vis.gl/react-google-maps';
import { MapPin, Navigation, Store, Plus, Trash2, RefreshCw, Phone, ShieldCheck, Filter, MapPinned } from 'lucide-react';
import { Language, AgriStore } from '../types';
import { getT } from '../utils/translations';
import { IndianState } from '../utils/indianDistricts';

interface MapTabProps {
  currentLanguage: Language;
  currentDistrict: string;
  currentState: string;
  districtCoords: { lat: number; lng: number };
  activeState: IndianState;
  onOpenLocationModal: () => void;
}

interface CustomFarmHub {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: string;
  speciality: string;
  isCustom?: boolean;
}

const STORAGE_KEY = 'kisansetu_custom_farm_hubs';

// Component to handle auto-panning when user selects an area or GPS coordinates
const MapCenterController: React.FC<{ coords: { lat: number; lng: number } }> = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (map && coords) {
      map.panTo(coords);
      map.setZoom(12);
    }
  }, [map, coords.lat, coords.lng]);

  return null;
};

export const MapTab: React.FC<MapTabProps> = ({
  currentLanguage,
  currentDistrict,
  currentState,
  districtCoords,
  activeState,
  onOpenLocationModal,
}) => {
  const t = getT(currentLanguage);
  const [apiKey, setApiKey] = useState<string>('');
  const [loadingConfig, setLoadingConfig] = useState(true);

  // Stores & Mandis fetched from backend with Google Search Grounding for current district
  const [stores, setStores] = useState<AgriStore[]>([]);
  const [loadingStores, setLoadingStores] = useState(false);

  // User-added custom farm pins
  const [customHubs, setCustomHubs] = useState<CustomFarmHub[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedHub, setSelectedHub] = useState<AgriStore | CustomFarmHub | null>(null);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Mandi' | 'Fertilizer' | 'Seeds' | 'KrishiSeva'>('All');

  // Modal to add custom farm pin
  const [showAddModal, setShowAddModal] = useState(false);
  const [clickCoords, setClickCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [newHubName, setNewHubName] = useState('');
  const [newHubType, setNewHubType] = useState('Farm Plot');
  const [newHubNote, setNewHubNote] = useState('');

  // 1. Fetch Maps API Key
  useEffect(() => {
    fetch('/api/config')
      .then((res) => res.json())
      .then((data) => {
        if (data.googleMapsApiKey) {
          setApiKey(data.googleMapsApiKey);
        }
      })
      .catch((err) => console.error('Failed to load Maps config', err))
      .finally(() => setLoadingConfig(false));
  }, []);

  // 2. Fetch Real Stores & Mandis whenever District or State changes
  useEffect(() => {
    fetchDistrictStores(currentDistrict, currentState);
  }, [currentDistrict, currentState]);

  const fetchDistrictStores = async (district: string, state: string) => {
    setLoadingStores(true);
    try {
      const res = await fetch('/api/gemini/stores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ district, state }),
      });
      const data = await res.json();
      const rawStores = Array.isArray(data) ? data : (data.stores || []);
      const formatted = rawStores.map((s: any) => ({
        ...s,
        speciality: s.speciality || s.highlights || 'Subsidized inputs & certified stocks',
        verified: s.verified ?? s.isVerified ?? true,
      }));
      setStores(formatted);
      if (formatted.length > 0) {
        setSelectedHub(formatted[0]);
      }
    } catch (err) {
      console.error('Failed to load district stores', err);
    } finally {
      setLoadingStores(false);
    }
  };

  const handleMapClick = (e: MapMouseEvent) => {
    if (e.detail && e.detail.latLng) {
      setClickCoords({ lat: e.detail.latLng.lat, lng: e.detail.latLng.lng });
      setShowAddModal(true);
    }
  };

  const handleAddHubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clickCoords || !newHubName.trim()) return;

    const newHub: CustomFarmHub = {
      id: 'custom-' + Date.now(),
      name: newHubName,
      lat: clickCoords.lat,
      lng: clickCoords.lng,
      category: newHubType,
      speciality: newHubNote || 'Farmer Custom Point of Interest',
      isCustom: true,
    };

    const updated = [newHub, ...customHubs];
    setCustomHubs(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSelectedHub(newHub);
    setShowAddModal(false);
    setNewHubName('');
    setNewHubNote('');
  };

  const handleDeleteCustomHub = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customHubs.filter((h) => h.id !== id);
    setCustomHubs(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (selectedHub && 'id' in selectedHub && selectedHub.id === id) {
      setSelectedHub(stores[0] || null);
    }
  };

  // Combine real district stores + custom hubs
  const allLocations = [
    ...stores,
    ...customHubs.map((h) => ({
      id: h.id,
      name: h.name,
      category: (h.category.includes('Mandi')
        ? 'Mandi'
        : h.category.includes('Fertilizer')
        ? 'Fertilizer'
        : h.category.includes('Seed')
        ? 'Seeds'
        : 'KrishiSeva') as AgriStore['category'],
      address: `${currentDistrict}, ${currentState}`,
      lat: h.lat,
      lng: h.lng,
      speciality: h.speciality,
      verified: false,
      isCustom: true,
    })),
  ];

  const filteredLocations = allLocations.filter((item) => {
    if (activeFilter === 'All') return true;
    return item.category === activeFilter;
  });

  if (loadingConfig) {
    return (
      <div className="py-20 text-center flex flex-col items-center gap-2">
        <RefreshCw className="w-6 h-6 animate-spin text-emerald-600" />
        <span className="text-xs text-slate-500">Loading Google Maps Platform...</span>
      </div>
    );
  }

  const effectiveApiKey = apiKey || '';

  return (
    <div className="space-y-3 pb-20 max-w-md mx-auto px-4 pt-2 text-xs">
      {/* Area Selector Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 shadow-xs border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
            <MapPinned className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                {currentDistrict}, {currentState}
              </span>
              <span className="text-[9px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded-full font-bold">
                🇮🇳 Auto-Centered
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Live Mandis, IFFCO Fertilizers & Seed Stores
            </p>
          </div>
        </div>

        <button
          onClick={onOpenLocationModal}
          className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl font-bold text-[11px] shadow-xs transition-transform active:scale-95 shrink-0"
        >
          Change Area
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] no-scrollbar">
        <button
          onClick={() => setActiveFilter('All')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
            activeFilter === 'All'
              ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
          }`}
        >
          All Locations ({allLocations.length})
        </button>
        <button
          onClick={() => setActiveFilter('Mandi')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
            activeFilter === 'Mandi'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-slate-200 dark:border-slate-700'
          }`}
        >
          🏛️ APMC Mandis
        </button>
        <button
          onClick={() => setActiveFilter('Fertilizer')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
            activeFilter === 'Fertilizer'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 text-amber-700 dark:text-amber-300 border border-slate-200 dark:border-slate-700'
          }`}
        >
          🧪 Fertilizers (Urea/DAP)
        </button>
        <button
          onClick={() => setActiveFilter('Seeds')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
            activeFilter === 'Seeds'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 border border-slate-200 dark:border-slate-700'
          }`}
        >
          🌱 Seeds & Krishi Seva
        </button>
      </div>

      {/* Map Viewport Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800 relative">
        <div className="h-[340px] w-full relative">
          <APIProvider apiKey={effectiveApiKey}>
            <Map
              defaultCenter={districtCoords}
              defaultZoom={11}
              mapId="DEMO_MAP_ID"
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              style={{ width: '100%', height: '100%' }}
              onClick={handleMapClick}
              restriction={{
                latLngBounds: activeState.bounds,
                strictBounds: true,
              }}
            >
              <MapCenterController coords={districtCoords} />

              {filteredLocations.map((item) => {
                const isSelected = selectedHub?.name === item.name;
                const pinColor =
                  item.category === 'Mandi'
                    ? '#166534'
                    : item.category === 'Fertilizer'
                    ? '#D97706'
                    : item.category === 'Seeds'
                    ? '#2563EB'
                    : '#7C3AED';

                return (
                  <AdvancedMarker
                    key={item.id}
                    position={{ lat: item.lat, lng: item.lng }}
                    onClick={() => setSelectedHub(item)}
                  >
                    <Pin
                      background={pinColor}
                      glyphColor="#ffffff"
                      borderColor={isSelected ? '#facc15' : '#0f172a'}
                      scale={isSelected ? 1.25 : 1.0}
                    />
                  </AdvancedMarker>
                );
              })}
            </Map>
          </APIProvider>

          {/* Quick Map Action Badge */}
          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 rounded-full text-[10px] font-medium flex items-center gap-1 shadow-sm">
            <span>Tap map to add custom farm plot</span>
          </div>

          {loadingStores && (
            <div className="absolute top-2 right-2 bg-emerald-950/80 backdrop-blur-xs text-emerald-200 px-2 py-1 rounded-lg text-[10px] font-mono flex items-center gap-1">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>Updating Indian Hubs...</span>
            </div>
          )}
        </div>

        {/* Selected Location / Store Details Card */}
        {selectedHub && (
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/90 border-t border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">
                    {selectedHub.name}
                  </span>
                  {'verified' in selectedHub && selectedHub.verified && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded text-[9px] font-bold">
                      <ShieldCheck className="w-3 h-3" />
                      Govt / Certified
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {'address' in selectedHub ? selectedHub.address : `${currentDistrict}, ${currentState}`}
                </p>
              </div>

              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap ${
                  selectedHub.category === 'Mandi'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : selectedHub.category === 'Fertilizer'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                }`}
              >
                {selectedHub.category}
              </span>
            </div>

            {/* Speciality / Stock info */}
            <div className="bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px]">
              <span className="text-slate-500 font-semibold">Live Info / Stock: </span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {selectedHub.speciality}
              </span>
            </div>

            {/* Navigation & Contact Buttons */}
            <div className="flex items-center gap-2 pt-0.5">
              {'phone' in selectedHub && selectedHub.phone && (
                <a
                  href={`tel:${selectedHub.phone}`}
                  className="py-2 px-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-100 font-bold rounded-xl flex items-center justify-center gap-1 transition-colors text-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Store</span>
                </a>
              )}

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  `${selectedHub.name}, ${currentDistrict}, ${currentState}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs text-xs"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Navigate in Google Maps</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* List of Verified Stores & Mandis */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <span>Verified Local Agri Centers ({filteredLocations.length})</span>
          </h4>
          <span className="text-[10px] text-slate-400">Click to view on map</span>
        </div>

        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
          {filteredLocations.map((item) => {
            const isSelected = selectedHub?.name === item.name;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedHub(item)}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 dark:text-slate-100 truncate text-xs">
                      {item.name}
                    </span>
                    {'verified' in item && item.verified && (
                      <span className="text-[9px] text-emerald-700 dark:text-emerald-400 font-bold">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1.5 mt-0.5 truncate">
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                      {item.category}
                    </span>
                    <span>•</span>
                    <span className="truncate">{item.speciality}</span>
                  </div>
                </div>

                {'isCustom' in item && item.isCustom ? (
                  <button
                    onClick={(e) => handleDeleteCustomHub(item.id, e)}
                    className="text-slate-400 hover:text-red-500 p-1 shrink-0"
                    title="Delete Custom Area"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-800 dark:text-emerald-300 shrink-0">
                    <Navigation className="w-3 h-3" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal to Add Custom Farm Area Pin */}
      {showModalForAdd(
        showAddModal,
        setShowAddModal,
        clickCoords,
        newHubName,
        setNewHubName,
        newHubType,
        setNewHubType,
        newHubNote,
        setNewHubNote,
        handleAddHubSubmit,
        currentDistrict,
        currentState
      )}
    </div>
  );
};

function showModalForAdd(
  isOpen: boolean,
  onClose: (val: boolean) => void,
  coords: { lat: number; lng: number } | null,
  name: string,
  setName: (v: string) => void,
  type: string,
  setType: (v: string) => void,
  note: string,
  setNote: (v: string) => void,
  onSubmit: (e: React.FormEvent) => void,
  district: string,
  state: string
) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-4 space-y-3 shadow-2xl border border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-600" />
            <h3 className="font-extrabold text-slate-900 dark:text-slate-100">
              Add Farm Plot / Collection Point
            </h3>
          </div>
          <button onClick={() => onClose(false)} className="text-slate-400 hover:text-slate-600 font-bold">
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Area / Farm Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. 5-Acre Wheat Plot #1"
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-800 font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-800 font-semibold"
            >
              <option value="Farm Plot">Farm Plot / Field</option>
              <option value="Grain Storage">Grain Storage / Godown</option>
              <option value="Mandi Hub">Collection Center</option>
              <option value="Fertilizer Depot">Fertilizer / Tubewell Spot</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Notes (Crop, Acreage, etc.)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Sown with HD-2967, 45 bags expected"
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-800"
            />
          </div>

          {coords && (
            <div className="text-[10px] text-slate-400 font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
              Lat: {coords.lat.toFixed(5)}, Lng: {coords.lng.toFixed(5)} ({district}, {state})
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="flex-1 py-2.5 rounded-xl border font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:border-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-emerald-700 text-white font-bold hover:bg-emerald-600 shadow-xs"
            >
              Save Pin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
