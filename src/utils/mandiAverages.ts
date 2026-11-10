export interface CommodityBenchmark {
  name: string;
  category: 'Vegetables' | 'Grains' | 'Fruits' | 'Spices' | 'Oilseeds' | 'Other';
  avgPrice: number;
  unit: string;
}

export const COMMODITY_CATEGORIES = ['Vegetables', 'Grains', 'Fruits', 'Spices', 'Oilseeds', 'Other'] as const;

export const MANDI_BENCHMARKS: CommodityBenchmark[] = [
  // Vegetables
  { name: 'Bhindi (Ladies Finger)', category: 'Vegetables', avgPrice: 2450, unit: 'Qtl' },
  { name: 'Potato', category: 'Vegetables', avgPrice: 1680, unit: 'Qtl' },
  { name: 'Onion', category: 'Vegetables', avgPrice: 2200, unit: 'Qtl' },
  { name: 'Tomato', category: 'Vegetables', avgPrice: 1850, unit: 'Qtl' },
  { name: 'Brinjal', category: 'Vegetables', avgPrice: 1550, unit: 'Qtl' },
  { name: 'Cabbage', category: 'Vegetables', avgPrice: 1200, unit: 'Qtl' },
  { name: 'Cauliflower', category: 'Vegetables', avgPrice: 2100, unit: 'Qtl' },
  { name: 'Carrot', category: 'Vegetables', avgPrice: 1900, unit: 'Qtl' },
  { name: 'Green Chilli', category: 'Vegetables', avgPrice: 3200, unit: 'Qtl' },
  { name: 'Ginger', category: 'Vegetables', avgPrice: 8500, unit: 'Qtl' },
  { name: 'Bottle Gourd', category: 'Vegetables', avgPrice: 1400, unit: 'Qtl' },
  { name: 'Bitter Gourd', category: 'Vegetables', avgPrice: 2800, unit: 'Qtl' },

  // Grains
  { name: 'Wheat', category: 'Grains', avgPrice: 2275, unit: 'Qtl' },
  { name: 'Paddy (Basmati)', category: 'Grains', avgPrice: 3850, unit: 'Qtl' },
  { name: 'Paddy (Common)', category: 'Grains', avgPrice: 2320, unit: 'Qtl' },
  { name: 'Maize', category: 'Grains', avgPrice: 2100, unit: 'Qtl' },
  { name: 'Bajra (Pearl Millet)', category: 'Grains', avgPrice: 2350, unit: 'Qtl' },
  { name: 'Barley (Jau)', category: 'Grains', avgPrice: 2050, unit: 'Qtl' },
  { name: 'Jowar (Sorghum)', category: 'Grains', avgPrice: 2900, unit: 'Qtl' },
  { name: 'Ragi (Finger Millet)', category: 'Grains', avgPrice: 3500, unit: 'Qtl' },

  // Pulses
  { name: 'Gram (Chana)', category: 'Grains', avgPrice: 5800, unit: 'Qtl' },
  { name: 'Arhar (Tur)', category: 'Grains', avgPrice: 9500, unit: 'Qtl' },
  { name: 'Moong (Green Gram)', category: 'Grains', avgPrice: 8200, unit: 'Qtl' },
  { name: 'Urad (Black Gram)', category: 'Grains', avgPrice: 7800, unit: 'Qtl' },
  { name: 'Masur (Lentil)', category: 'Grains', avgPrice: 6400, unit: 'Qtl' },

  // Fruits
  { name: 'Apple', category: 'Fruits', avgPrice: 7500, unit: 'Qtl' },
  { name: 'Banana', category: 'Fruits', avgPrice: 2200, unit: 'Qtl' },
  { name: 'Mango', category: 'Fruits', avgPrice: 4500, unit: 'Qtl' },
  { name: 'Grapes', category: 'Fruits', avgPrice: 5200, unit: 'Qtl' },
  { name: 'Pomegranate', category: 'Fruits', avgPrice: 8500, unit: 'Qtl' },
  { name: 'Orange', category: 'Fruits', avgPrice: 3800, unit: 'Qtl' },
  { name: 'Guava', category: 'Fruits', avgPrice: 2500, unit: 'Qtl' },
  { name: 'Papaya', category: 'Fruits', avgPrice: 1800, unit: 'Qtl' },
  { name: 'Watermelon', category: 'Fruits', avgPrice: 1200, unit: 'Qtl' },

  // Spices
  { name: 'Garlic', category: 'Spices', avgPrice: 12500, unit: 'Qtl' },
  { name: 'Dry Chillies', category: 'Spices', avgPrice: 18000, unit: 'Qtl' },
  { name: 'Turmeric', category: 'Spices', avgPrice: 14200, unit: 'Qtl' },
  { name: 'Coriander Seed', category: 'Spices', avgPrice: 7800, unit: 'Qtl' },
  { name: 'Cumin Seed (Jeera)', category: 'Spices', avgPrice: 28500, unit: 'Qtl' },
  { name: 'Black Pepper', category: 'Spices', avgPrice: 52000, unit: 'Qtl' },

  // Oilseeds
  { name: 'Mustard', category: 'Oilseeds', avgPrice: 5450, unit: 'Qtl' },
  { name: 'Soybean', category: 'Oilseeds', avgPrice: 4480, unit: 'Qtl' },
  { name: 'Groundnut', category: 'Oilseeds', avgPrice: 6200, unit: 'Qtl' },
  { name: 'Sunflower', category: 'Oilseeds', avgPrice: 5100, unit: 'Qtl' },
  { name: 'Sesamum (Til)', category: 'Oilseeds', avgPrice: 14500, unit: 'Qtl' },
  { name: 'Castor Seed', category: 'Oilseeds', avgPrice: 5600, unit: 'Qtl' },

  // Other
  { name: 'Cotton', category: 'Other', avgPrice: 7120, unit: 'Qtl' },
  { name: 'Sugarcane', category: 'Other', avgPrice: 315, unit: 'Qtl' },
  { name: 'Jute', category: 'Other', avgPrice: 6500, unit: 'Qtl' },
  { name: 'Tobacco', category: 'Other', avgPrice: 14000, unit: 'Qtl' },
  { name: 'Coffee', category: 'Other', avgPrice: 28000, unit: 'Qtl' },
  { name: 'Tea', category: 'Other', avgPrice: 22000, unit: 'Qtl' },
];

export const getCategorizedBenchmarks = () => {
  const categories: Record<string, CommodityBenchmark[]> = {};
  COMMODITY_CATEGORIES.forEach((cat) => {
    categories[cat] = MANDI_BENCHMARKS.filter((b) => b.category === cat).sort((a, b) => a.name.localeCompare(b.name));
  });
  return categories;
};
