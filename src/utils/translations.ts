import { Language } from '../types';

export interface Translations {
  // Header
  subTitle: string;
  kbSaved: string;
  mode2g: string;
  mode4g: string;
  smsBridge: string;
  sync: string;

  // Bottom Nav
  navVoice: string;
  navBudget: string;
  navMarkets: string;
  navMap: string;
  navChat: string;
  navLive: string;
  navIndiaStats: string;

  // Voice AI Tab
  micListening: string;
  micProcessing: string;
  micHoldToSpeak: string;
  micPrompt: string;
  todaysSummary: string;
  seasonPeak: string;
  remainingBudget: string;
  total: string;
  recommendedAction: string;
  holdSaleRec: string;
  quickLogsTitle: string;
  btnLogExpense: string;
  btnCropTriage: string;
  btnPriceCheck: string;
  addExpenseTitle: string;
  btnSubmitExpense: string;
  samplePromptLabel: string;
  intentExpenseLogged: string;
  intentMarketIntel: string;
  intentCropAdvisory: string;
  budgetSavedCheck: string;

  // Budget Tab
  seasonalLedgerTitle: string;
  editBudget: string;
  cancel: string;
  save: string;
  totalOutflow: string;
  roiTitle: string;
  acres: string;
  yieldQ: string;
  targetPrice: string;
  projectedNetRoi: string;
  breakEvenPrice: string;
  expenseRecordsTitle: string;
  searchPlaceholder: string;
  addLogBtn: string;
  syncedLabel: string;
  amountLabel: string;
  categoryLabel: string;
  noteLabel: string;
  catAll: string;
  catFertilizer: string;
  catSeeds: string;
  catPesticides: string;
  catLabor: string;
  catEquipment: string;
  catDiesel: string;
  catIrrigation: string;

  // Markets Tab
  mandiTitle: string;
  selectCrop: string;
  regionalMandi: string;
  currentPrice: string;
  projectedPeak: string;
  perQuintal: string;
  recEngine: string;
  btnHoldSale: string;
  btnSellNow: string;
  trend5Day: string;
  creditScoreTitle: string;
  creditPassTag: string;
  verifiedCreditRating: string;
  ratingLabel: string;
  microLoanLabel: string;
  btnDownloadCert: string;
  certTitle: string;
  certShare: string;
  certDone: string;

  // Map Tab
  mapTitle: string;
  mapDesc: string;
  mandiHubsTitle: string;

  // Chat Tab
  chatTitle: string;
  chatSubtitle: string;
  chatPlaceholder: string;
  chatSend: string;

  // Live Voice Tab
  liveTitle: string;
  liveSubtitle: string;
  liveStart: string;
  liveStop: string;
  liveStatusListening: string;

  // SMS Bridge
  smsTitle: string;
  smsDesc: string;
  smsInputLabel: string;
  smsInputPlaceholder: string;
  smsEncodedLabel: string;
  smsCopy: string;
  smsCopied: string;
  smsSend: string;
  smsNote: string;

  // Triage
  triageTitle: string;
  triageDesc: string;
  triageUploadText: string;
  triageSelectPhoto: string;
  triageDemoScan: string;
  triageVectorLabel: string;
  triageProcessing: string;
  triageRemediesTitle: string;
  triageEstCost: string;

  // India Stats Tab
  indiaStatsTitle: string;
  nationalAvg: string;
  indiaStatsSubtitle: string;
  lastDailyUpdate: string;
  trendUp: string;
  trendDown: string;
  trendStable: string;
}

export const dictionary: Record<Language, Translations> = {
  Hindi: {
    subTitle: 'माइक्रो-डेटा सलाहकार',
    kbSaved: 'केबी बचत',
    mode2g: '2G मोड',
    mode4g: '4G/3G',
    smsBridge: 'SMS ब्रिज',
    sync: 'सिंक: 100%',

    navVoice: 'वॉयस AI',
    navBudget: 'बजट',
    navMarkets: 'मंडी',
    navMap: 'मानचित्र',
    navChat: 'चैट',
    navLive: 'लाइव वॉयस',
    navIndiaStats: 'भारत आंकड़े',

    micListening: 'आपकी आवाज सुनी जा रही है...',
    micProcessing: 'डेटा प्रोसेस हो रहा है...',
    micHoldToSpeak: 'बोलने के लिए दबाएं',
    micPrompt: 'खाद, बीज या मंडी भाव का सवाल पूछें',
    todaysSummary: 'आज का सारांश',
    seasonPeak: 'फसल पीक: 14 दिन',
    remainingBudget: 'शेष मौसमी बजट',
    total: 'कुल',
    recommendedAction: 'अनुशंसित सलाह:',
    holdSaleRec: 'मंगलवार तक गेहूं की बिक्री रोकें। मंडी भाव ₹2,420 तक पहुंचने की संभावना है।',
    quickLogsTitle: 'क्विक लॉग (एक टैप)',
    btnLogExpense: '+ खर्च दर्ज करें',
    btnCropTriage: '+ फसल जांच',
    btnPriceCheck: 'मंडी भाव जांच',
    addExpenseTitle: 'खर्च दर्ज करें',
    btnSubmitExpense: 'खर्च जमा करें',
    samplePromptLabel: 'उदाहरण:',

    intentExpenseLogged: '✓ खर्च दर्ज किया गया',
    intentMarketIntel: '📈 मंडी बाजार जानकारी',
    intentCropAdvisory: '🌾 फसल स्वास्थ्य सलाह',
    budgetSavedCheck: 'बजट दर्ज हुआ ✓',

    seasonalLedgerTitle: 'मौसमी खेत खाता (लेजर)',
    editBudget: 'बजट बदलें',
    cancel: 'रद्द करें',
    save: 'सहेजें',
    totalOutflow: 'कुल लागत खर्च',
    roiTitle: 'ऑन-डिवाइस फसल ROI कैलकुलेटर',
    acres: 'एकड़',
    yieldQ: 'पैदावार (कुंतल)',
    targetPrice: 'लक्ष्य ₹/कुंतल',
    projectedNetRoi: 'अनुमानित शुद्ध लाभ',
    breakEvenPrice: 'लागत ब्रेक-इवेन भाव',
    expenseRecordsTitle: 'खर्च रिकॉर्ड',
    searchPlaceholder: 'विवरण या श्रेणी खोजें...',
    addLogBtn: 'नया जोड़ें',
    syncedLabel: 'सिंक हुआ',
    amountLabel: 'राशि (रुपये ₹)',
    categoryLabel: 'श्रेणी',
    noteLabel: 'विवरण',

    catAll: 'सभी',
    catFertilizer: 'खाद (यूरिया)',
    catSeeds: 'बीज',
    catPesticides: 'कीटनाशक',
    catLabor: 'मजदूरी',
    catEquipment: 'उपकरण / किराए',
    catDiesel: 'डीजल',
    catIrrigation: 'सिंचाई',

    mandiTitle: 'क्षेत्रीय मंडी भाव पूर्वानुमान',
    selectCrop: 'फसल चुनें',
    regionalMandi: 'क्षेत्रीय मंडी',
    currentPrice: 'वर्तमान भाव',
    projectedPeak: '14-दिन का अनुमानित पीक',
    perQuintal: '/ कुंतल',
    recEngine: 'बिक्री सलाह इंजन',
    btnHoldSale: 'बिक्री रोकें',
    btnSellNow: 'अभी बेचें',
    trend5Day: '5-दिवसीय मंडी भाव ट्रेंड',
    creditScoreTitle: 'डिजिटल फार्म क्रेडिट स्कोर',
    creditPassTag: 'क्रेडिट पास',
    verifiedCreditRating: 'सत्यापित क्रेडिट रेटिंग',
    ratingLabel: 'रेटिंग',
    microLoanLabel: 'पात्र ऋण',
    btnDownloadCert: 'क्रेडिट प्रमाण पत्र डाउनलोड करें',
    certTitle: 'डिजिटल क्रेडिट प्रमाण पत्र',
    certShare: 'शेयर करें',
    certDone: 'हो गया',

    mapTitle: 'Google Maps Mandi & Hub Locator',
    mapDesc: 'Find APMC grain markets, seed stores, and fertilizer centers near you.',
    mandiHubsTitle: 'Nearby Agricultural Hubs',

    chatTitle: 'KisanSetu Expert Chatbot',
    chatSubtitle: 'Powered by Gemini • Agronomist & Finance Expert',
    chatPlaceholder: 'Ask crop or ledger questions...',
    chatSend: 'Send',

    liveTitle: 'Gemini Live Voice Conversation',
    liveSubtitle: 'Real-time speech-to-speech agricultural advisory',
    liveStart: 'Start Live Conversation',
    liveStop: 'Disconnect Live Session',
    liveStatusListening: 'Listening live in regional dialect...',

    smsTitle: 'SMS / USSD ऑफलाइन ब्रिज',
    smsDesc: 'बिना 3G/4G इंटरनेट के किसानसेतु आपके सवाल को 140-अक्षर के SMS कोड में बदल देता है।',
    smsInputLabel: 'बोलकर या लिखकर बताएं:',
    smsInputPlaceholder: 'जैसे 800 रुपये में खाद खरीदी',
    smsEncodedLabel: 'एन्कोडेड USSD कोड (0 KB डेटा)',
    smsCopy: 'कोड कॉपी करें',
    smsCopied: 'कॉपी हो गया',
    smsSend: 'SMS भेजें',
    smsNote: '💡 उत्तर आपके फोन पर 5 सेकंड में SMS द्वारा आ जाएगा।',

    triageTitle: 'पत्ती रोग स्कैनर',
    triageDesc: 'पत्ती के फोटो को 12 KB वेक्टर मैप में बदलकर डेटा बचाता है।',
    triageUploadText: 'पत्ती की फोटो खींचें या अपलोड करें',
    triageSelectPhoto: 'फोटो चुनें / खींचें',
    triageDemoScan: 'डेमो स्कैन करें',
    triageVectorLabel: 'वेक्टर मैप: 11.8 KB',
    triageProcessing: 'रोग की जांच की जा रही है...',
    triageRemediesTitle: 'किफायती उपचार समाधान',
    triageEstCost: 'अनुमानित उपचार लागत:',

    indiaStatsTitle: 'अखिल भारतीय मंडी आंकड़े',
    nationalAvg: 'राष्ट्रीय औसत भाव',
    indiaStatsSubtitle: '500+ मंडियों से एकत्रित लाइव डेटा',
    lastDailyUpdate: 'अंतिम अपडेट',
    trendUp: 'बढ़त',
    trendDown: 'गिरावट',
    trendStable: 'स्थिर',
  },

  Hinglish: {
    subTitle: 'Micro-Data Advisory',
    kbSaved: 'KB Saved',
    mode2g: '2G Mode',
    mode4g: '4G/3G',
    smsBridge: 'SMS Bridge',
    sync: 'Sync: 100%',

    navVoice: 'Voice AI',
    navBudget: 'Budget',
    navMarkets: 'Markets',
    navMap: 'Maps',
    navChat: 'Chatbot',
    navLive: 'Live Voice',
    navIndiaStats: 'India Stats',

    micListening: 'Listening to spoken query...',
    micProcessing: 'Processing intent & compressed data...',
    micHoldToSpeak: 'Hold or Tap to Speak',
    micPrompt: 'Ask about market prices or log spent',
    todaysSummary: "TODAY'S SUMMARY",
    seasonPeak: 'Season Peak: 14 Days',
    remainingBudget: 'Remaining Seasonal Budget',
    total: 'Total',
    recommendedAction: 'Recommended Action:',
    holdSaleRec: 'Hold grain sale until Tuesday. Mandi prices projected to peak at ₹2,420/quintal.',
    quickLogsTitle: 'QUICK LOGS (ONE TAP)',
    btnLogExpense: '+ Log Expense',
    btnCropTriage: '+ Crop Triage',
    btnPriceCheck: 'Price Check',
    addExpenseTitle: 'Add Farm Expense',
    btnSubmitExpense: 'Submit Expense',
    samplePromptLabel: 'Try:',

    intentExpenseLogged: '✓ Financial Expense Logged',
    intentMarketIntel: '📈 Market Intelligence',
    intentCropAdvisory: '🌾 Crop Advisory',
    budgetSavedCheck: 'Budget Saved ✓',

    seasonalLedgerTitle: 'Seasonal Farm Ledger',
    editBudget: 'Edit Budget',
    cancel: 'Cancel',
    save: 'Save',
    totalOutflow: 'Total Outflow',
    roiTitle: 'On-Device Micro Crop ROI Budgeter',
    acres: 'Acres',
    yieldQ: 'Yield (Q)',
    targetPrice: 'Target ₹/Q',
    projectedNetRoi: 'Projected Net ROI',
    breakEvenPrice: 'Break-Even Sales Price',
    expenseRecordsTitle: 'Expense Records',
    searchPlaceholder: 'Search notes or categories...',
    addLogBtn: 'Add Log',
    syncedLabel: 'Synced',
    amountLabel: 'Amount (INR ₹)',
    categoryLabel: 'Category',
    noteLabel: 'Note / Description',

    catAll: 'All',
    catFertilizer: 'Fertilizer',
    catSeeds: 'Seeds',
    catPesticides: 'Pesticides',
    catLabor: 'Labor',
    catEquipment: 'Equipment',
    catDiesel: 'Diesel',
    catIrrigation: 'Irrigation',

    mandiTitle: 'Regional Mandi Price Forecast',
    selectCrop: 'Select Crop',
    regionalMandi: 'Regional Mandi',
    currentPrice: 'Current Price',
    projectedPeak: 'Projected 14-Day Peak',
    perQuintal: '/ quintal',
    recEngine: 'Recommendation Engine',
    btnHoldSale: 'HOLD SALE',
    btnSellNow: 'SELL NOW',
    trend5Day: '5-Day Mandi Price Trend',
    creditScoreTitle: 'Digital Farm Credit Score',
    creditPassTag: 'Formal Credit Pass',
    verifiedCreditRating: 'Verified Credit Rating',
    ratingLabel: 'Rating',
    microLoanLabel: 'Micro-Loan',
    btnDownloadCert: 'Download Digital Credit Certificate',
    certTitle: 'Digital Credit Certificate',
    certShare: 'Share Summary',
    certDone: 'Done',

    mapTitle: 'Google Maps Mandi & Hub Locator',
    mapDesc: 'Find APMC grain markets, seed stores, and fertilizer centers near you.',
    mandiHubsTitle: 'Nearby Agricultural Hubs',

    chatTitle: 'KisanSetu Expert Chatbot',
    chatSubtitle: 'Powered by Gemini • Agronomist & Finance Expert',
    chatPlaceholder: 'Ask crop or ledger questions...',
    chatSend: 'Send',

    liveTitle: 'Gemini Live Voice Conversation',
    liveSubtitle: 'Real-time speech-to-speech agricultural advisory',
    liveStart: 'Start Live Conversation',
    liveStop: 'Disconnect Live Session',
    liveStatusListening: 'Listening live in regional dialect...',

    smsTitle: 'SMS / USSD Offline Bridge',
    smsDesc: 'No 3G/4G internet? KisanSetu automatically encodes your query into a 140-character offline SMS payload.',
    smsInputLabel: 'Spoken or Typed Action:',
    smsInputPlaceholder: 'e.g. Spent 800 on Urea fertilizer',
    smsEncodedLabel: 'Encoded USSD Payload (0 KB Data)',
    smsCopy: 'Copy Code',
    smsCopied: 'Copied',
    smsSend: 'Send SMS',
    smsNote: '💡 Response will be delivered back to your phone via SMS within 5 seconds.',

    triageTitle: 'Leaf Vector Pathology Scan',
    triageDesc: 'KisanSetu compresses leaf photos into lightweight 12 KB vector maps to save mobile data.',
    triageUploadText: 'Upload or Snap Leaf Photo',
    triageSelectPhoto: 'Select / Snap Photo',
    triageDemoScan: 'Demo Leaf Scan',
    triageVectorLabel: 'Vector Map: 11.8 KB',
    triageProcessing: 'Executing Edge Vector Path Triage...',
    triageRemediesTitle: 'Recommended Low-Cost Remedies',
    triageEstCost: 'Est. Treatment Cost:',

    indiaStatsTitle: 'Whole India Mandi Stats',
    nationalAvg: 'National Average Rate',
    indiaStatsSubtitle: 'Live data aggregated from 500+ mandis',
    lastDailyUpdate: 'Last Update',
    trendUp: 'UP',
    trendDown: 'DOWN',
    trendStable: 'STABLE',
  },

  Marathi: {
    subTitle: 'मायक्रो-डेटा सल्लागार',
    kbSaved: 'केबी बचत',
    mode2g: '2G मोड',
    mode4g: '4G/3G',
    smsBridge: 'SMS ब्रिज',
    sync: 'सिंक: 100%',

    navVoice: 'व्हॉईस AI',
    navBudget: 'बजेट',
    navMarkets: 'बाजार',
    navMap: 'नकाशा',
    navChat: 'चॅटबॉट',
    navLive: 'लाइव वॉयस',
    navIndiaStats: 'भारत आकडेवारी',

    micListening: 'तुमचा आवाज ऐकला जात आहे...',
    micProcessing: 'डेटा प्रक्रियेत आहे...',
    micHoldToSpeak: 'बोलण्यासाठी दाबा',
    micPrompt: 'खत, बियाणे किंवा बाजार भावाबाबत विचारा',
    todaysSummary: 'आजचा सारांश',
    seasonPeak: 'पिकाचा उच्चांक: 14 दिवस',
    remainingBudget: 'उरलेले हंगामी बजेट',
    total: 'एकूण',
    recommendedAction: 'शिफारस केलेली कृती:',
    holdSaleRec: 'मंगळवारपर्यंत गहू विक्री थांबवा. बाजार भाव ₹2,420 पर्यंत वाढण्याची शक्यता आहे.',
    quickLogsTitle: 'क्विक लॉग (एक टॅप)',
    btnLogExpense: '+ खर्च नोंदवा',
    btnCropTriage: '+ पीक तपासणी',
    btnPriceCheck: 'बाजार भाव पहा',
    addExpenseTitle: 'खर्च नोंदवा',
    btnSubmitExpense: 'खर्च सबमिट करा',
    samplePromptLabel: 'उदा:',

    intentExpenseLogged: '✓ खर्च नोंदवला गेला',
    intentMarketIntel: '📈 बाजार भाव माहिती',
    intentCropAdvisory: '🌾 पीक आरोग्य सल्ला',
    budgetSavedCheck: 'बजेट सेव्ह झाले ✓',

    seasonalLedgerTitle: 'हंगामी शेत खाते पुस्तक (लेजर)',
    editBudget: 'बजट बदला',
    cancel: 'रद्द करा',
    save: 'जतन करा',
    totalOutflow: 'एकूण खर्च',
    roiTitle: 'ऑन-डिव्हाइस पीक ROI कॅल्क्युलेटर',
    acres: 'एकर',
    yieldQ: 'उत्पादन (क्विंटल)',
    targetPrice: 'लक्ष्य ₹/क्विंटल',
    projectedNetRoi: 'अंदाजित निव्वळ नफा',
    breakEvenPrice: 'ब्रेक-इव्हन विक्री भाव',
    expenseRecordsTitle: 'खर्च नोंदी',
    searchPlaceholder: 'शोध घ्या...',
    addLogBtn: 'नवीन जोडा',
    syncedLabel: 'सिंक झाले',
    amountLabel: 'रक्कम (रुपये ₹)',
    categoryLabel: 'वर्गवारी',
    noteLabel: 'तपशील',

    catAll: 'सर्व',
    catFertilizer: 'खते',
    catSeeds: 'बियाणे',
    catPesticides: 'कीटकनाशके',
    catLabor: 'मजुरी',
    catEquipment: 'अवजारे / भाडे',
    catDiesel: 'डिझेल',
    catIrrigation: 'सिंचन',

    mandiTitle: 'प्रादेशिक बाजार भाव अंदाज',
    selectCrop: 'पीक निवडा',
    regionalMandi: 'प्रादेशिक बाजार समिती',
    currentPrice: 'सध्याचा भाव',
    projectedPeak: '14-दिवसांतील संभाव्य उच्चांक',
    perQuintal: '/ क्विंटल',
    recEngine: 'विक्री सल्ला',
    btnHoldSale: 'विक्री थांबवा',
    btnSellNow: 'आत्ता विका',
    trend5Day: '5-दिवसांचा बाजार ट्रेंड',
    creditScoreTitle: 'डिजिटल फार्म क्रेडिट स्कोर',
    creditPassTag: 'क्रेडिट पास',
    verifiedCreditRating: 'प्रमाणित क्रेडिट रेटिंग',
    ratingLabel: 'रेटिंग',
    microLoanLabel: 'पात्र कर्ज',
    btnDownloadCert: 'क्रेडिट प्रमाणपत्र डाउनलोड करा',
    certTitle: 'डिजिटल क्रेडिट प्रमाणपत्र',
    certShare: 'शेअर करा',
    certDone: 'पूर्ण',

    mapTitle: 'Google Maps Mandi & Hub Locator',
    mapDesc: 'Find APMC grain markets, seed stores, and fertilizer centers near you.',
    mandiHubsTitle: 'Nearby Agricultural Hubs',

    chatTitle: 'KisanSetu Expert Chatbot',
    chatSubtitle: 'Powered by Gemini • Agronomist & Finance Expert',
    chatPlaceholder: 'Ask crop or ledger questions...',
    chatSend: 'Send',

    liveTitle: 'Gemini Live Voice Conversation',
    liveSubtitle: 'Real-time speech-to-speech agricultural advisory',
    liveStart: 'Start Live Conversation',
    liveStop: 'Disconnect Live Session',
    liveStatusListening: 'Listening live in regional dialect...',

    smsTitle: 'SMS / USSD ऑफलाइन ब्रिज',
    smsDesc: 'इंटरनेट नसेल तरी किसानसेतू तुमचा प्रश्न 140-अक्षरांच्या SMS कोडमध्ये रूपांतरित करतो.',
    smsInputLabel: 'प्रश्न किंवा खर्च प्रविष्ट करा:',
    smsInputPlaceholder: 'उदा. ८०० रुपयांचे खत घेतले',
    smsEncodedLabel: 'एनकोड केलेला USSD कोड (0 KB डेटा)',
    smsCopy: 'कोड कॉपी करा',
    smsCopied: 'कॉपी झाले',
    smsSend: 'SMS पाठवा',
    smsNote: '💡 ५ सेकंदात SMS द्वारे उत्तर प्राप्त होईल.',

    triageTitle: 'पानाचा आजार तपासणी',
    triageDesc: 'पानाचा फोटो १२ KB व्हेक्टर मॅपमध्ये बदलून डेटा वाचवतो.',
    triageUploadText: 'पानाचा फोटो काढा किंवा अपलोड करा',
    triageSelectPhoto: 'फोटो निवडा',
    triageDemoScan: 'डेमो स्कॅन',
    triageVectorLabel: 'व्हेक्टर मॅप: 11.8 KB',
    triageProcessing: 'तपासणी सुरू आहे...',
    triageRemediesTitle: 'कमी खर्चातील उपाय',
    triageEstCost: 'अंदाजित उपचार खर्च:',

    indiaStatsTitle: 'अखिल भारतीय मंडी आकडेवारी',
    nationalAvg: 'राष्ट्रीय सरासरी दर',
    indiaStatsSubtitle: '५००+ मंडयांमधून एकत्रित केलेला लाइव्ह डेटा',
    lastDailyUpdate: 'शेवटचे अपडेट',
    trendUp: 'वाढ',
    trendDown: 'घसरण',
    trendStable: 'स्थिर',
  },

  Punjabi: {
    subTitle: 'ਮਾਈਕ੍ਰੋ-ਡੇਟਾ ਸਲਾਹਕਾਰ',
    kbSaved: 'ਕੇ.ਬੀ ਬਚਤ',
    mode2g: '2G ਮੋਡ',
    mode4g: '4G/3G',
    smsBridge: 'SMS ਬ੍ਰਿਜ',
    sync: 'ਸਿੰਕ: 100%',

    navVoice: 'ਵੌਇਸ AI',
    navBudget: 'ਬਜਟ',
    navMarkets: 'ਮੰਡੀ',
    navMap: 'ਨਕਸ਼ਾ',
    navChat: 'ਚੈਟ',
    navLive: 'ਲਾਈਵ ਵੌਇਸ',
    navIndiaStats: 'ਭਾਰਤ ਅੰਕੜੇ',

    micListening: 'ਤੁਹਾਡੀ ਆਵਾਜ਼ ਸੁਣੀ ਜਾ ਰਹੀ ਹੈ...',
    micProcessing: 'ਡੇਟਾ ਪ੍ਰੋਸੈਸ ਹੋ ਰਿਹਾ ਹੈ...',
    micHoldToSpeak: 'ਬੋਲਣ ਲਈ ਦਬਾਓ',
    micPrompt: 'ਖਾਦ, ਬੀਜ ਜਾਂ ਮੰਡੀ ਭਾਅ ਬਾਰੇ ਪੁੱਛੋ',
    todaysSummary: 'ਅੱਜ ਦਾ ਸਾਰ',
    seasonPeak: 'ਫਸਲ ਪੀਕ: 14 ਦਿਨ',
    remainingBudget: 'ਬਾਕੀ ਸੀਜ਼ਨਲ ਬਜਟ',
    total: 'ਕੁਲ',
    recommendedAction: 'ਸਿਫਾਰਸ਼ ਕੀਤੀ ਕਾਰਵਾਈ:',
    holdSaleRec: 'ਮੰਗਲਵਾਰ ਤੱਕ ਕਣਕ ਦੀ ਵੇਚ ਰੋਕੋ। ਮੰਡੀ ਭਾਅ ₹2,420 ਤੱਕ ਪਹੁੰਚਣ ਦੀ ਸੰਭਾਵਨਾ ਹੈ।',
    quickLogsTitle: 'ਕੁਇੱਕ ਲੌਗ (ਇੱਕ ਟੈਪ)',
    btnLogExpense: '+ ਖਰਚਾ ਦਰਜ ਕਰੋ',
    btnCropTriage: '+ ਫਸਲ ਜਾਂਚ',
    btnPriceCheck: 'ਮੰਡੀ ਭਾਅ ਦੇਖੋ',
    addExpenseTitle: 'ਖਰਚਾ ਦਰਜ ਕਰੋ',
    btnSubmitExpense: 'ਜਮ੍ਹਾਂ ਕਰੋ',
    samplePromptLabel: 'ਉਦਾਹਰਣ:',

    intentExpenseLogged: '✓ ਖਰਚਾ ਦਰਜ ਹੋ ਗਿਆ',
    intentMarketIntel: '📈 ਮੰਡੀ ਬਾਜ਼ਾਰ ਜਾਣਕਾਰੀ',
    intentCropAdvisory: '🌾 ਫਸਲ ਸਿਹਤ ਸਲਾਹ',
    budgetSavedCheck: 'ਬਜਟ ਸੇਵ ਹੋਇਆ ✓',

    seasonalLedgerTitle: 'ਸੀਜ਼ਨਲ ਖੇਤ ਖਾਤਾ (ਲੇਜਰ)',
    editBudget: 'ਬਜਟ ਬਦਲੋ',
    cancel: 'ਰੱਦ ਕਰੋ',
    save: 'ਸੰਭਾਲੋ',
    totalOutflow: 'ਕੁਲ ਖਰਚਾ',
    roiTitle: 'ਆਨ-ਡਿਵਾਈਸ ਫਸਲ ROI ਕੈਲਕੁਲੇਟਰ',
    acres: 'ਏਕੜ',
    yieldQ: 'ਪੈਦਾਵਾਰ (ਕੁਇੰਟਲ)',
    targetPrice: 'ਟਾਰਗੇਟ ₹/ਕੁਇੰਟਲ',
    projectedNetRoi: 'ਅਨੁਮਾਨਿਤ ਮੁਨਾਫਾ',
    breakEvenPrice: 'ਬ੍ਰੇਕ-ਈਵਨ ਵੇਚ ਭਾਅ',
    expenseRecordsTitle: 'ਖਰਚਾ ਰਿਕਾਰਡ',
    searchPlaceholder: 'ਖੋਜ ਕਰੋ...',
    addLogBtn: 'ਨਵਾਂ ਜੋੜੋ',
    syncedLabel: 'ਸਿੰਕ ਹੋਇਆ',
    amountLabel: 'ਰਕਮ (ਰੁਪਏ ₹)',
    categoryLabel: 'ਸ਼੍ਰੇਣੀ',
    noteLabel: 'ਵੇਰਵਾ',

    catAll: 'ਸਭ',
    catFertilizer: 'ਖਾਦ',
    catSeeds: 'ਬੀਜ',
    catPesticides: 'ਕੀਟਨਾਸ਼ਕ',
    catLabor: 'ਮਜ਼ਦੂਰੀ',
    catEquipment: 'ਸੰਦ / ਕਿਰਾਇਆ',
    catDiesel: 'ਡੀਜ਼ਲ',
    catIrrigation: 'ਸਿੰਚਾਈ',

    mandiTitle: 'ਖੇਤਰੀ ਮੰਡੀ ਭਾਅ ਭਵਿੱਖਬਾਣੀ',
    selectCrop: 'ਫਸਲ ਚੁਣੋ',
    regionalMandi: 'ਖੇਤਰੀ ਮੰਡੀ',
    currentPrice: 'ਮੌਜੂਦਾ ਭਾਅ',
    projectedPeak: '14-ਦਿਨ ਦਾ ਅਨੁਮਾਨਿਤ ਪੀਕ',
    perQuintal: '/ ਕੁਇੰਟਲ',
    recEngine: 'ਵੇਚਣ ਦੀ ਸਲਾਹ',
    btnHoldSale: 'ਵੇਚ ਰੋਕੋ',
    btnSellNow: 'ਹੁਣੇ ਵੇਚੋ',
    trend5Day: '5-ਦਿਨਾਂ ਦਾ ਮੰਡੀ ਟਰੈਂਡ',
    creditScoreTitle: 'ਡਿਜੀਟਲ ਫਾਰਮ ਕ੍ਰੈਡਿਟ ਸਕੋਰ',
    creditPassTag: 'ਕ੍ਰੈਡਿਟ ਪਾਸ',
    verifiedCreditRating: 'ਤਸਦੀਕਸ਼ੁਦਾ ਰੇਟਿੰਗ',
    ratingLabel: 'ਰੇਟਿੰਗ',
    microLoanLabel: 'ਯੋਗ ਕਰਜ਼ਾ',
    btnDownloadCert: 'ਕ੍ਰੈਡਿਟ ਸਰਟੀਫਿਕੇਟ ਡਾਊਨਲੋਡ ਕਰੋ',
    certTitle: 'ਡਿਜੀਟਲ ਕ੍ਰੈਡਿਟ ਸਰਟੀਫਿਕੇਟ',
    certShare: 'ਸ਼ੇਅਰ ਕਰੋ',
    certDone: 'ਪੂਰਾ',

    mapTitle: 'Google Maps Mandi & Hub Locator',
    mapDesc: 'Find APMC grain markets, seed stores, and fertilizer centers near you.',
    mandiHubsTitle: 'Nearby Agricultural Hubs',

    chatTitle: 'KisanSetu Expert Chatbot',
    chatSubtitle: 'Powered by Gemini • Agronomist & Finance Expert',
    chatPlaceholder: 'Ask crop or ledger questions...',
    chatSend: 'Send',

    liveTitle: 'Gemini Live Voice Conversation',
    liveSubtitle: 'Real-time speech-to-speech agricultural advisory',
    liveStart: 'Start Live Conversation',
    liveStop: 'Disconnect Live Session',
    liveStatusListening: 'Listening live in regional dialect...',

    smsTitle: 'SMS / USSD ਆਫਲਾਈਨ ਬ੍ਰਿਜ',
    smsDesc: 'ਇੰਟਰਨੈੱਟ ਤੋਂ ਬਿਨਾਂ ਕਿਸਾਨਸੇਤੂ ਤੁਹਾਡੇ ਸਵਾਲ ਨੂੰ 140-ਅੱਖਰਾਂ ਦੇ SMS ਕੋਡ ਵਿੱਚ ਬਦਲਦਾ ਹੈ।',
    smsInputLabel: 'ਸਵਾਲ ਦਰਜ ਕਰੋ:',
    smsInputPlaceholder: 'ਜਿਵੇਂ 1200 ਰੁਪਏ ਦਾ ਬੀਜ ਖਰੀਦਿਆ',
    smsEncodedLabel: 'ਐਨਕੋਡ ਕੀਤਾ USSD ਕੋਡ (0 KB ਡੇਟਾ)',
    smsCopy: 'ਕੋਡ ਕਾਪੀ ਕਰੋ',
    smsCopied: 'ਕਾਪੀ ਹੋ ਗਿਆ',
    smsSend: 'SMS ਭੇਜੋ',
    smsNote: '💡 5 ਸੈਕਿੰਡ ਵਿੱਚ SMS ਰਾਹੀਂ ਜਵਾਬ ਮਿਲੇਗਾ।',

    triageTitle: 'ਪੱਤੇ ਦੀ ਬਿਮਾਰੀ ਜਾਂਚ',
    triageDesc: 'ਫੋਟੋ ਨੂੰ 12 KB ਵੈਕਟਰ ਮੈਪ ਵਿੱਚ ਬਦਲ ਕੇ ਡੇਟਾ ਬਚਾਉਂਦਾ ਹੈ।',
    triageUploadText: 'ਪੱਤੇ ਦੀ ਫੋਟੋ ਖਿੱਚੋ ਜਾਂ ਅੱਪਲੋਡ ਕਰੋ',
    triageSelectPhoto: 'ਫੋਟੋ ਚੁਣੋ',
    triageDemoScan: 'ਡੇਮੋ ਸਕੈਨ',
    triageVectorLabel: 'ਵੈਕਟਰ ਮੈਪ: 11.8 KB',
    triageProcessing: 'ਜਾਂਚ ਚੱਲ ਰਹੀ ਹੈ...',
    triageRemediesTitle: 'ਸਸਤੇ ਇਲਾਜ ਉਪਾਅ',
    triageEstCost: 'ਅਨੁਮਾਨਿਤ ਇਲਾਜ ਖਰਚਾ:',

    indiaStatsTitle: 'ਸਮੁੱਚੇ ਭਾਰਤ ਦੇ ਮੰਡੀ ਅੰਕੜੇ',
    nationalAvg: 'ਰਾਸ਼ਟਰੀ ਔਸਤ ਦਰ',
    indiaStatsSubtitle: '500+ ਮੰਡੀਆਂ ਤੋਂ ਇਕੱਤਰ ਕੀਤਾ ਲਾਈਵ ਡੇਟਾ',
    lastDailyUpdate: 'ਆਖਰੀ ਅਪਡੇਟ',
    trendUp: 'ਵਾਧਾ',
    trendDown: 'ਘਾਟਾ',
    trendStable: 'ਸਥਿਰ',
  },

  English: {
    subTitle: 'Micro-Data Advisory',
    kbSaved: 'KB Saved',
    mode2g: '2G Mode',
    mode4g: '4G/3G',
    smsBridge: 'SMS Bridge',
    sync: 'Sync: 100%',

    navVoice: 'Voice AI',
    navBudget: 'Budget',
    navMarkets: 'Markets',
    navMap: 'Maps',
    navChat: 'Chatbot',
    navLive: 'Live Voice',
    navIndiaStats: 'India Stats',

    micListening: 'Listening to spoken query...',
    micProcessing: 'Processing intent & compressed data...',
    micHoldToSpeak: 'Hold or Tap to Speak',
    micPrompt: 'Ask about market prices or log spent',
    todaysSummary: "TODAY'S SUMMARY",
    seasonPeak: 'Season Peak: 14 Days',
    remainingBudget: 'Remaining Seasonal Budget',
    total: 'Total',
    recommendedAction: 'Recommended Action:',
    holdSaleRec: 'Hold grain sale until Tuesday. Mandi prices projected to peak at ₹2,420/quintal.',
    quickLogsTitle: 'QUICK LOGS (ONE TAP)',
    btnLogExpense: '+ Log Expense',
    btnCropTriage: '+ Crop Triage',
    btnPriceCheck: 'Price Check',
    addExpenseTitle: 'Add Farm Expense',
    btnSubmitExpense: 'Submit Expense',
    samplePromptLabel: 'Try:',

    intentExpenseLogged: '✓ Financial Expense Logged',
    intentMarketIntel: '📈 Market Intelligence',
    intentCropAdvisory: '🌾 Crop Advisory',
    budgetSavedCheck: 'Budget Saved ✓',

    seasonalLedgerTitle: 'Seasonal Farm Ledger',
    editBudget: 'Edit Budget',
    cancel: 'Cancel',
    save: 'Save',
    totalOutflow: 'Total Outflow',
    roiTitle: 'On-Device Micro Crop ROI Budgeter',
    acres: 'Acres',
    yieldQ: 'Yield (Q)',
    targetPrice: 'Target ₹/Q',
    projectedNetRoi: 'Projected Net ROI',
    breakEvenPrice: 'Break-Even Sales Price',
    expenseRecordsTitle: 'Expense Records',
    searchPlaceholder: 'Search notes or categories...',
    addLogBtn: 'Add Log',
    syncedLabel: 'Synced',
    amountLabel: 'Amount (INR ₹)',
    categoryLabel: 'Category',
    noteLabel: 'Note / Description',

    catAll: 'All',
    catFertilizer: 'Fertilizer',
    catSeeds: 'Seeds',
    catPesticides: 'Pesticides',
    catLabor: 'Labor',
    catEquipment: 'Equipment',
    catDiesel: 'Diesel',
    catIrrigation: 'Irrigation',

    mandiTitle: 'Regional Mandi Price Forecast',
    selectCrop: 'Select Crop',
    regionalMandi: 'Regional Mandi',
    currentPrice: 'Current Price',
    projectedPeak: 'Projected 14-Day Peak',
    perQuintal: '/ quintal',
    recEngine: 'Recommendation Engine',
    btnHoldSale: 'HOLD SALE',
    btnSellNow: 'SELL NOW',
    trend5Day: '5-Day Mandi Price Trend',
    creditScoreTitle: 'Digital Farm Credit Score',
    creditPassTag: 'Formal Credit Pass',
    verifiedCreditRating: 'Verified Credit Rating',
    ratingLabel: 'Rating',
    microLoanLabel: 'Micro-Loan',
    btnDownloadCert: 'Download Digital Credit Certificate',
    certTitle: 'Digital Credit Certificate',
    certShare: 'Share Summary',
    certDone: 'Done',

    mapTitle: 'Google Maps Mandi & Hub Locator',
    mapDesc: 'Find APMC grain markets, seed stores, and fertilizer centers near you.',
    mandiHubsTitle: 'Nearby Agricultural Hubs',

    chatTitle: 'KisanSetu Expert Chatbot',
    chatSubtitle: 'Powered by Gemini • Agronomist & Finance Expert',
    chatPlaceholder: 'Ask crop or ledger questions...',
    chatSend: 'Send',

    liveTitle: 'Gemini Live Voice Conversation',
    liveSubtitle: 'Real-time speech-to-speech agricultural advisory',
    liveStart: 'Start Live Conversation',
    liveStop: 'Disconnect Live Session',
    liveStatusListening: 'Listening live in regional dialect...',

    smsTitle: 'SMS / USSD Offline Bridge',
    smsDesc: 'No 3G/4G internet? KisanSetu automatically encodes your query into a 140-character offline SMS payload.',
    smsInputLabel: 'Spoken or Typed Action:',
    smsInputPlaceholder: 'e.g. Spent 800 on Urea fertilizer',
    smsEncodedLabel: 'Encoded USSD Payload (0 KB Data)',
    smsCopy: 'Copy Code',
    smsCopied: 'Copied',
    smsSend: 'Send SMS',
    smsNote: '💡 Response will be delivered back to your phone via SMS within 5 seconds.',

    triageTitle: 'Leaf Vector Pathology Scan',
    triageDesc: 'KisanSetu compresses leaf photos into lightweight 12 KB vector maps to save mobile data.',
    triageUploadText: 'Upload or Snap Leaf Photo',
    triageSelectPhoto: 'Select / Snap Photo',
    triageDemoScan: 'Demo Leaf Scan',
    triageVectorLabel: 'Vector Marker: 11.8 KB',
    triageProcessing: 'Executing Edge Vector Path Triage...',
    triageRemediesTitle: 'Recommended Low-Cost Remedies',
    triageEstCost: 'Est. Treatment Cost:',

    indiaStatsTitle: 'Whole India Mandi Stats',
    nationalAvg: 'National Average Rate',
    indiaStatsSubtitle: 'Live data aggregated from 500+ mandis',
    lastDailyUpdate: 'Last Update',
    trendUp: 'UP',
    trendDown: 'DOWN',
    trendStable: 'STABLE',
  },
};

export const getT = (lang: Language): Translations => {
  return dictionary[lang] || dictionary.Hindi;
};
