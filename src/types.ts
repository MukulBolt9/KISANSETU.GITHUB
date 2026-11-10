export type Language = 'Hindi' | 'Hinglish' | 'Marathi' | 'Punjabi' | 'English';

export type TabType = 'voice' | 'markets' | 'map' | 'chat' | 'india-stats';

export interface ExpenseItem {
  id: string;
  amount: number;
  category: 'Fertilizer' | 'Seeds' | 'Pesticides' | 'Labor' | 'Equipment' | 'Diesel' | 'Irrigation' | 'Other';
  crop: string;
  date: string;
  note: string;
  synced: boolean;
}

export interface VoiceQueryResponse {
  intent: 'LOG_EXPENSE' | 'MARKET_QUERY' | 'CROP_ADVISORY' | 'GENERAL';
  expenseData?: {
    amount: number;
    category: string;
    crop: string;
    date: string;
    note: string;
  };
  advisoryResponse: string;
  suggestedActions: string[];
  marketImpact?: string;
  dataCompressedKB: number;
}

export interface CropDiagnostic {
  cropType: string;
  infectionName: string;
  confidence: number;
  vectorBytesKB: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  treatment: string[];
  preventativeSteps: string;
  budgetImpact: number;
  advisoryNote: string;
}

export interface NeighboringMandi {
  mandiName: string;
  name?: string;
  distanceKm: number;
  price: number;
  netAdvantage?: string;
}

export interface MandiForecast {
  crop: string;
  district: string;
  state: string;
  mandiName: string;
  currentPriceQuintal: number; // Modal price
  minPrice?: number;
  minPriceQuintal?: number;
  maxPrice?: number;
  maxPriceQuintal?: number;
  arrivalsQuintal?: number;
  arrivalsQuintals?: number | string;
  reportingDate?: string;
  dateOfPrice?: string;
  sourceVerification?: string;
  sourceVerified?: boolean;
  predictedPeakPrice: number;
  daysToPeak?: number;
  trend?: 'RISING' | 'FALLING' | 'STABLE';
  recommendation?: 'HOLD_SALE' | 'SELL_NOW' | 'SELL_PARTIAL';
  rationale?: string;
  recentPrices?: { date: string; price: number }[];
  neighboringMandis?: NeighboringMandi[];
}

export type RealtimeMandiData = MandiForecast;

export interface AgriStore {
  id: string;
  name: string;
  category: 'Fertilizer' | 'Seeds' | 'Krishi Seva' | 'Equipment' | 'Pesticides' | 'Mandi' | 'KrishiSeva';
  address: string;
  phone?: string;
  lat: number;
  lng: number;
  highlights?: string;
  speciality?: string;
  isVerified?: boolean;
  verified?: boolean;
  distanceKm?: number;
  rating?: number;
  isCustom?: boolean;
}

export interface SubsidizedFertilizer {
  name: string;
  hindiName?: string;
  mrpINR: number;
  officialPrice?: number;
  bagWeightKg: number;
  packSize?: string;
  subsidyNote?: string;
  keyUse?: string;
  subsidized?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface IndiaStatsData {
  lastUpdated: string;
  categories: Record<string, NationalCommodity[]>;
}

export interface NationalCommodity {
  name: string;
  avgPrice: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
  changePercent: number;
  mandiCount: number;
}
