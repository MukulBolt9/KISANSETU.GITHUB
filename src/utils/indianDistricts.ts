export interface IndianDistrict {
  district: string;
  state: string;
  lat: number;
  lng: number;
  mandiName: string;
}

export interface IndianState {
  state: string;
  center: { lat: number; lng: number };
  zoom: number;
  bounds: { north: number; south: number; east: number; west: number };
  districts: IndianDistrict[];
}

export const INDIAN_AGRICULTURAL_REGIONS: IndianState[] = [
  {
    state: 'Haryana',
    center: { lat: 29.0588, lng: 76.0856 },
    zoom: 8,
    bounds: { north: 31.0, south: 27.5, east: 77.6, west: 74.4 },
    districts: [
      { district: 'Karnal', state: 'Haryana', lat: 29.6857, lng: 76.9905, mandiName: 'Karnal APMC Grain Market' },
      { district: 'Kurukshetra', state: 'Haryana', lat: 29.9695, lng: 76.8783, mandiName: 'Thanesar Kurukshetra Mandi' },
      { district: 'Panipat', state: 'Haryana', lat: 29.3909, lng: 76.9638, mandiName: 'Panipat APMC Mandi' },
      { district: 'Ambala', state: 'Haryana', lat: 30.3782, lng: 76.7767, mandiName: 'Ambala City Grain Market' },
      { district: 'Hisar', state: 'Haryana', lat: 29.1492, lng: 75.7217, mandiName: 'Hisar Cotton & Grain Mandi' },
      { district: 'Sirsa', state: 'Haryana', lat: 29.5349, lng: 75.0298, mandiName: 'Sirsa Grain & Cotton Mandi' },
      { district: 'Rohtak', state: 'Haryana', lat: 28.8955, lng: 76.6066, mandiName: 'Rohtak APMC Market' },
      { district: 'Kaithal', state: 'Haryana', lat: 29.8015, lng: 76.3996, mandiName: 'Kaithal New Grain Market' },
    ],
  },
  {
    state: 'Punjab',
    center: { lat: 31.1471, lng: 75.3412 },
    zoom: 8,
    bounds: { north: 32.5, south: 29.5, east: 76.9, west: 73.8 },
    districts: [
      { district: 'Ludhiana', state: 'Punjab', lat: 30.9010, lng: 75.8573, mandiName: 'Ludhiana Grain Market' },
      { district: 'Amritsar', state: 'Punjab', lat: 31.6340, lng: 74.8723, mandiName: 'Bhagtanwala Amritsar Mandi' },
      { district: 'Bathinda', state: 'Punjab', lat: 30.2110, lng: 74.9455, mandiName: 'Bathinda Cotton & Wheat Mandi' },
      { district: 'Jalandhar', state: 'Punjab', lat: 31.3260, lng: 75.5762, mandiName: 'Jalandhar City Grain Mandi' },
      { district: 'Patiala', state: 'Punjab', lat: 30.3398, lng: 76.3869, mandiName: 'Patiala APMC Grain Market' },
      { district: 'Sangrur', state: 'Punjab', lat: 30.2458, lng: 75.8421, mandiName: 'Sangrur Main Grain Market' },
      { district: 'Moga', state: 'Punjab', lat: 30.8165, lng: 75.1715, mandiName: 'Moga APMC Market' },
      { district: 'Firozpur', state: 'Punjab', lat: 30.9237, lng: 74.6122, mandiName: 'Firozpur Cantt Grain Mandi' },
    ],
  },
  {
    state: 'Uttar Pradesh',
    center: { lat: 26.8467, lng: 80.9462 },
    zoom: 7,
    bounds: { north: 30.4, south: 23.8, east: 84.8, west: 77.0 },
    districts: [
      { district: 'Aligarh', state: 'Uttar Pradesh', lat: 27.8974, lng: 78.0880, mandiName: 'Aligarh Dhaniapur Mandi' },
      { district: 'Meerut', state: 'Uttar Pradesh', lat: 28.9845, lng: 77.7064, mandiName: 'Meerut Delhi Road Mandi' },
      { district: 'Agra', state: 'Uttar Pradesh', lat: 27.1767, lng: 78.0081, mandiName: 'Agra Sikandra Krishi Mandi' },
      { district: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lng: 82.9739, mandiName: 'Varanasi Pahariya Mandi' },
      { district: 'Gorakhpur', state: 'Uttar Pradesh', lat: 26.7606, lng: 83.3732, mandiName: 'Gorakhpur Mahewa Mandi' },
      { district: 'Bareilly', state: 'Uttar Pradesh', lat: 28.3670, lng: 79.4304, mandiName: 'Bareilly Delapeer Mandi' },
      { district: 'Muzaffarnagar', state: 'Uttar Pradesh', lat: 29.4727, lng: 77.7085, mandiName: 'Muzaffarnagar Gur & Grain Mandi' },
      { district: 'Mathura', state: 'Uttar Pradesh', lat: 27.4924, lng: 77.6737, mandiName: 'Mathura APMC Mandi' },
    ],
  },
  {
    state: 'Madhya Pradesh',
    center: { lat: 23.2599, lng: 77.4126 },
    zoom: 7,
    bounds: { north: 26.9, south: 21.0, east: 82.8, west: 74.0 },
    districts: [
      { district: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lng: 75.8577, mandiName: 'Indore Chhavani Krishi Upaj Mandi' },
      { district: 'Bhopal', state: 'Madhya Pradesh', lat: 23.2599, lng: 77.4126, mandiName: 'Bhopal Karond Mandi' },
      { district: 'Ujjain', state: 'Madhya Pradesh', lat: 23.1765, lng: 75.7885, mandiName: 'Ujjain Chimanganj Mandi' },
      { district: 'Jabalpur', state: 'Madhya Pradesh', lat: 23.1815, lng: 79.9864, mandiName: 'Jabalpur Krishi Upaj Mandi' },
      { district: 'Gwalior', state: 'Madhya Pradesh', lat: 26.2183, lng: 78.1828, mandiName: 'Gwalior Lashkar Mandi' },
      { district: 'Sehore', state: 'Madhya Pradesh', lat: 23.2032, lng: 77.0844, mandiName: 'Sehore Soya & Wheat Mandi' },
      { district: 'Dewas', state: 'Madhya Pradesh', lat: 22.9676, lng: 76.0534, mandiName: 'Dewas Krishi Mandi' },
    ],
  },
  {
    state: 'Maharashtra',
    center: { lat: 19.7515, lng: 75.7139 },
    zoom: 7,
    bounds: { north: 22.0, south: 15.6, east: 80.9, west: 72.6 },
    districts: [
      { district: 'Nashik', state: 'Maharashtra', lat: 19.9975, lng: 73.7898, mandiName: 'Lasalgaon Onion & Grain Mandi' },
      { district: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567, mandiName: 'Pune Market Yard APMC' },
      { district: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lng: 79.0882, mandiName: 'Nagpur Kalamna APMC Mandi' },
      { district: 'Ahmednagar', state: 'Maharashtra', lat: 19.0952, lng: 74.7496, mandiName: 'Ahmednagar APMC Market' },
      { district: 'Kolhapur', state: 'Maharashtra', lat: 16.7050, lng: 74.2433, mandiName: 'Kolhapur Jaggery & Grain Mandi' },
      { district: 'Solapur', state: 'Maharashtra', lat: 17.6599, lng: 75.9064, mandiName: 'Solapur APMC Market' },
      { district: 'Amravati', state: 'Maharashtra', lat: 20.9374, lng: 77.7796, mandiName: 'Amravati Cotton & Soybean Mandi' },
    ],
  },
  {
    state: 'Rajasthan',
    center: { lat: 27.0238, lng: 74.2179 },
    zoom: 7,
    bounds: { north: 30.2, south: 23.0, east: 78.3, west: 69.4 },
    districts: [
      { district: 'Kota', state: 'Rajasthan', lat: 25.2138, lng: 75.8648, mandiName: 'Kota Bhamashah Krishi Upaj Mandi' },
      { district: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873, mandiName: 'Jaipur Muhana Mandi' },
      { district: 'Sri Ganganagar', state: 'Rajasthan', lat: 29.9038, lng: 73.8772, mandiName: 'Sri Ganganagar Grain Mandi' },
      { district: 'Alwar', state: 'Rajasthan', lat: 27.5530, lng: 76.6346, mandiName: 'Alwar Kherli Krishi Mandi' },
      { district: 'Bikaner', state: 'Rajasthan', lat: 28.0229, lng: 73.3119, mandiName: 'Bikaner Grain & Wool Mandi' },
      { district: 'Jodhpur', state: 'Rajasthan', lat: 26.2389, lng: 73.0243, mandiName: 'Jodhpur Krishi Mandi' },
    ],
  },
  {
    state: 'Gujarat',
    center: { lat: 22.2587, lng: 71.1924 },
    zoom: 7,
    bounds: { north: 24.7, south: 20.1, east: 74.5, west: 68.1 },
    districts: [
      { district: 'Rajkot', state: 'Gujarat', lat: 22.3039, lng: 70.8022, mandiName: 'Rajkot Bedi APMC Market' },
      { district: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714, mandiName: 'Ahmedabad Jamalpur APMC' },
      { district: 'Surat', state: 'Gujarat', lat: 21.1702, lng: 72.8311, mandiName: 'Surat APMC Mandi' },
      { district: 'Mehsana', state: 'Gujarat', lat: 23.5880, lng: 72.3693, mandiName: 'Unjha Cumin & Mustard APMC' },
      { district: 'Junagadh', state: 'Gujarat', lat: 21.5222, lng: 70.4579, mandiName: 'Junagadh Groundnut APMC' },
    ],
  },
  {
    state: 'Bihar',
    center: { lat: 25.0961, lng: 85.3131 },
    zoom: 7,
    bounds: { north: 27.5, south: 23.8, east: 88.3, west: 83.3 },
    districts: [
      { district: 'Patna', state: 'Bihar', lat: 25.5941, lng: 85.1376, mandiName: 'Patna Musallahpur Mandi' },
      { district: 'Muzaffarpur', state: 'Bihar', lat: 26.1209, lng: 85.3647, mandiName: 'Muzaffarpur Bazar Samiti' },
      { district: 'Purnia', state: 'Bihar', lat: 25.7771, lng: 87.4753, mandiName: 'Purnia Gulabbagh Mandi' },
      { district: 'Bhagalpur', state: 'Bihar', lat: 25.2425, lng: 86.9842, mandiName: 'Bhagalpur Krishi Mandi' },
    ],
  },
  {
    state: 'West Bengal',
    center: { lat: 22.9868, lng: 87.855 },
    zoom: 7,
    bounds: { north: 27.2, south: 21.5, east: 89.8, west: 85.8 },
    districts: [
      { district: 'Burdwan', state: 'West Bengal', lat: 23.2324, lng: 87.8615, mandiName: 'Burdwan Rice & Potato Mandi' },
      { district: 'Hooghly', state: 'West Bengal', lat: 22.9037, lng: 88.3970, mandiName: 'Hooghly Sheoraphuli Market' },
      { district: 'Nadia', state: 'West Bengal', lat: 23.4710, lng: 88.5565, mandiName: 'Nadia Krishnanagar Mandi' },
      { district: 'Malda', state: 'West Bengal', lat: 25.0108, lng: 88.1411, mandiName: 'Malda Mango & Grain Mandi' },
    ],
  },
];

export const getAllDistricts = (): IndianDistrict[] => {
  return INDIAN_AGRICULTURAL_REGIONS.flatMap((s) => s.districts);
};

export const findDistrictByName = (districtName: string): IndianDistrict | undefined => {
  const norm = districtName.trim().toLowerCase();
  return getAllDistricts().find((d) => d.district.toLowerCase() === norm);
};

export const calculateDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
};

export const findClosestDistrict = (lat: number, lng: number): IndianDistrict => {
  const all = getAllDistricts();
  let closest = all[0];
  let minDistance = Infinity;

  for (const d of all) {
    const dist = calculateDistanceKm(lat, lng, d.lat, d.lng);
    if (dist < minDistance) {
      minDistance = dist;
      closest = d;
    }
  }

  return closest;
};
