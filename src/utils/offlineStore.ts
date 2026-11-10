import { ExpenseItem } from '../types';

const STORAGE_KEYS = {
  EXPENSES: 'kisansetu_expenses',
  TOTAL_BUDGET: 'kisansetu_total_budget',
  KB_SAVED: 'kisansetu_kb_saved',
  IS_2G_SIMULATED: 'kisansetu_2g_simulated',
  PRIMARY_CROP: 'kisansetu_primary_crop',
  SELECTED_LANG: 'kisansetu_selected_lang',
  ACTIVE_DISTRICT: 'kisansetu_active_district',
  ACTIVE_STATE: 'kisansetu_active_state',
};

const DEFAULT_EXPENSES: ExpenseItem[] = [
  {
    id: 'exp-1',
    amount: 800,
    category: 'Fertilizer',
    crop: 'Wheat',
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    note: 'Bought 2 bags of Urea',
    synced: true,
  },
  {
    id: 'exp-2',
    amount: 1200,
    category: 'Seeds',
    crop: 'Wheat',
    date: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0],
    note: 'HD-2967 Certified Wheat Seeds',
    synced: true,
  },
  {
    id: 'exp-3',
    amount: 450,
    category: 'Diesel',
    crop: 'Wheat',
    date: new Date(Date.now() - 86400000 * 8).toISOString().split('T')[0],
    note: 'Tractor field leveling 15L diesel',
    synced: true,
  },
];

export const getStoredExpenses = (): ExpenseItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(DEFAULT_EXPENSES));
      return DEFAULT_EXPENSES;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_EXPENSES;
  }
};

export const saveExpense = (expense: Omit<ExpenseItem, 'id' | 'synced'>): ExpenseItem => {
  const current = getStoredExpenses();
  const newItem: ExpenseItem = {
    ...expense,
    id: 'exp-' + Date.now(),
    synced: true,
  };
  const updated = [newItem, ...current];
  localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(updated));
  addKbSaved(0.95);
  return newItem;
};

export const deleteExpense = (id: string): ExpenseItem[] => {
  const current = getStoredExpenses();
  const updated = current.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(updated));
  return updated;
};

export const getTotalBudget = (): number => {
  const raw = localStorage.getItem(STORAGE_KEYS.TOTAL_BUDGET);
  return raw ? parseFloat(raw) : 35000;
};

export const saveTotalBudget = (amount: number) => {
  localStorage.setItem(STORAGE_KEYS.TOTAL_BUDGET, amount.toString());
};

export const getKbSaved = (): number => {
  const raw = localStorage.getItem(STORAGE_KEYS.KB_SAVED);
  return raw ? parseFloat(raw) : 142.8;
};

export const addKbSaved = (kb: number) => {
  const current = getKbSaved();
  const updated = parseFloat((current + kb).toFixed(1));
  localStorage.setItem(STORAGE_KEYS.KB_SAVED, updated.toString());
  return updated;
};

export const getPrimaryCrop = (): string => {
  return localStorage.getItem(STORAGE_KEYS.PRIMARY_CROP) || 'Wheat';
};

export const savePrimaryCrop = (crop: string) => {
  localStorage.setItem(STORAGE_KEYS.PRIMARY_CROP, crop);
};

export const getSelectedLang = (): string => {
  return localStorage.getItem(STORAGE_KEYS.SELECTED_LANG) || 'Hindi';
};

export const saveSelectedLang = (lang: string) => {
  localStorage.setItem(STORAGE_KEYS.SELECTED_LANG, lang);
};

export const getActiveDistrict = (): string => {
  return localStorage.getItem(STORAGE_KEYS.ACTIVE_DISTRICT) || 'Karnal';
};

export const saveActiveDistrict = (district: string) => {
  localStorage.setItem(STORAGE_KEYS.ACTIVE_DISTRICT, district);
};

export const getActiveState = (): string => {
  return localStorage.getItem(STORAGE_KEYS.ACTIVE_STATE) || 'Haryana';
};

export const saveActiveState = (state: string) => {
  localStorage.setItem(STORAGE_KEYS.ACTIVE_STATE, state);
};
