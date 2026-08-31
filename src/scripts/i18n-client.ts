// src/scripts/i18n-client.ts
// Client-side i18n for Mausam

const en: Record<string, string> = {
  'nav.radar': 'Radar',
  'nav.forecasts': 'Forecasts',
  'nav.airQuality': 'Air Quality',
  'nav.climate': 'Climate',
  'nav.agriculture': 'Agriculture',
  'nav.alerts': 'Alerts',
  'nav.search': 'Search',
  'nav.savedDestinations': 'Saved Destinations',
  'lang.toggle': 'English → Hindi',
  'dashboard.title': 'Dashboard',
  'dashboard.searchPlaceholder': 'Search location...',
  'dashboard.currentLocation': 'Current Location',
  'dashboard.locating': 'Locating...',
  'dashboard.liveRadar': 'Live Radar',
  'hero.humidity': 'Humidity',
  'hero.windSpeed': 'Wind Speed',
  'hero.uvIndex': 'UV Index',
  'hero.loading': 'Loading weather...',
  'hero.detecting': 'Detecting location...',
  'hero.loadingData': 'Loading weather data...',
  'persona.personalize': 'Personalize Home:',
  'persona.health': 'Health-Conscious',
  'persona.fitness': 'Outdoor Fitness',
  'persona.marine': 'Beach & Surf',
  'persona.travel': 'Travelers',
  'persona.family': 'Parents & Families',
  'persona.agriculture': 'Agriculture',
  'persona.commute': 'Commuters',
  'persona.eventPlanning': 'Event Planning',
  'ai.title': 'Mausam AI Insights',
  'ai.selectProfile': 'Select a profile to load personalized insights...',
  'ai.analyzing': 'Analyzing weather parameters for personalized suggestions...',
  'ai.unavailable': 'AI insights could not be retrieved. Please check connection.',
  'section.health.title': 'Health-Conscious Outlook',
  'section.fitness.title': 'Outdoor Fitness Planner',
  'section.marine.title': 'Beachgoers & Surfers Portal',
  'section.travel.title': 'Travelers Navigator',
  'section.family.title': 'Parents & Families Planner',
  'section.agriculture.title': 'Agriculture & Gardening Hub',
  'section.commute.title': 'Commuter Transit Guide',
  'section.events.title': 'Event Planners Console',
  'card.aqi': 'Air Quality Index',
  'card.pollen': 'Pollen Counts',
  'card.uvRadiation': 'UV Radiation',
  'card.humidityComfort': 'Humidity & Comfort',
  'card.runningHours': 'Best Running Hours',
  'card.sunTimings': 'Sun Timings',
  'card.windVelocity': 'Wind Velocity',
  'card.heatAlert': 'Heat Alert Status',
  'card.seaConditions': 'Sea Conditions',
  'card.waveHeights': 'Wave Heights',
  'card.waterTemp': 'Water Temperature',
  'card.tideTimings': 'Tide Timings',
  'card.savedDest': 'Saved Destination Weather',
  'card.flightDelays': 'Flight Delays & Warnings',
  'card.packingAdvisor': 'Packing Advisor',
  'card.schoolCommute': 'School Commute Status',
  'card.rainAlerts': 'Rain Alerts Timeline',
  'card.severeWarnings': 'Severe Weather Bulletins',
  'card.soilMoisture': 'Soil Moisture',
  'card.rainfallForecast': 'Rainfall Forecast',
  'card.frostDanger': 'Frost Danger Index',
  'card.plantingGuide': 'Planting Guidance',
  'card.trafficIndex': 'Traffic Delays Index',
  'card.visibility': 'Road Visibility Range',
  'card.stormFog': 'Storm & Fog Alerts',
  'card.comfortIndex': 'Comfort Index Rating',
  'card.precipitation': 'Precipitation Probability',
  'card.outdoorSuitability': 'Outdoor Suitability',
  'loading.default': 'Loading...',
  'loading.weather': 'Loading weather context...',
  'search.noResults': 'No locations found',
  'footer.profiles': 'Mausam Profiles',
  'footer.sectors': 'Sectors',
  'footer.weatherScience': 'Weather Science',
  'footer.account': 'Account',
  'footer.savedLocations': 'Saved Locations',
  'footer.flightTrackers': 'Flight Trackers',
  'footer.devPortal': 'Developer Portal',
  'footer.feedback': 'Feedback & Support',
  'footer.disclaimer': 'Disclaimer: Weather forecasts, AI suggestions, air quality indices, and marine safety alerts provided on Mausam are for informational purposes only. Do not make critical navigation, flight, farming, or health decisions solely based on Mausam data.',
  'footer.copyright': 'All rights reserved.',
  'footer.privacy': 'Privacy Policy',
  'footer.terms': 'Terms of Use',
  'footer.legal': 'Legal Notices',
};

const hi: Record<string, string> = {
  'nav.radar': 'रडार',
  'nav.forecasts': 'पूर्वानुमान',
  'nav.airQuality': 'वायु गुणवत्ता',
  'nav.climate': 'जलवायु',
  'nav.agriculture': 'कृषि',
  'nav.alerts': 'अलर्ट',
  'nav.search': 'खोजें',
  'nav.savedDestinations': 'सहेजे गए स्थान',
  'lang.toggle': 'हिन्दी → English',
  'dashboard.title': 'डैशबोर्ड',
  'dashboard.searchPlaceholder': 'स्थान खोजें...',
  'dashboard.currentLocation': 'वर्तमान स्थान',
  'dashboard.locating': 'स्थान पता लगा रहे हैं...',
  'dashboard.liveRadar': 'लाइव रडार',
  'hero.humidity': 'आर्द्रता',
  'hero.windSpeed': 'हवा की गति',
  'hero.uvIndex': 'UV इंडेक्स',
  'hero.loading': 'मौसम लोड हो रहा है...',
  'hero.detecting': 'स्थान का पता लगा रहे हैं...',
  'hero.loadingData': 'मौसम डेटा लोड हो रहा है...',
  'persona.personalize': 'होम को व्यक्तिगत बनाएं:',
  'persona.health': 'स्वास्थ्य-सचेत',
  'persona.fitness': 'आउटडोर फिटनेस',
  'persona.marine': 'बीच और सर्फ',
  'persona.travel': 'यात्री',
  'persona.family': 'माता-पिता और परिवार',
  'persona.agriculture': 'कृषि',
  'persona.commute': 'यातायात',
  'persona.eventPlanning': 'इवेंट प्लानिंग',
  'ai.title': 'मौसम AI अंतर्दृष्टि',
  'ai.selectProfile': 'व्यक्तिगत अंतर्दृष्टि लोड करने के लिए एक प्रोफ़ाइल चुनें...',
  'ai.analyzing': 'व्यक्तिगत सुझावों के लिए मौसम मापदंडों का विश्लेषण हो रहा है...',
  'ai.unavailable': 'AI अंतर्दृष्टि प्राप्त नहीं हो सकी। कृपया कनेक्शन जांचें।',
  'section.health.title': 'स्वास्थ्य-सचेत दृष्टिकोण',
  'section.fitness.title': 'आउटडोर फिटनेस प्लानर',
  'section.marine.title': 'बीचगोअर्स और सर्फर्स पोर्टल',
  'section.travel.title': 'यात्री नेविगेटर',
  'section.family.title': 'माता-पिता और परिवार योजनाकार',
  'section.agriculture.title': 'कृषि और बागवानी केंद्र',
  'section.commute.title': 'यातायात ट्रांज़िट गाइड',
  'section.events.title': 'इवेंट प्लानर्स कंसोल',
  'card.aqi': 'वायु गुणवत्ता सूचकांक',
  'card.pollen': 'पराग गिनती',
  'card.uvRadiation': 'UV विकिरण',
  'card.humidityComfort': 'आर्द्रता और आराम',
  'card.runningHours': 'सर्वोत्तम दौड़ने का समय',
  'card.sunTimings': 'सूर्य समय',
  'card.windVelocity': 'हवा की गति',
  'card.heatAlert': 'गर्मी अलर्ट स्थिति',
  'card.seaConditions': 'समुद्र की स्थिति',
  'card.waveHeights': 'लहर की ऊंचाई',
  'card.waterTemp': 'पानी का तापमान',
  'card.tideTimings': 'ज्वार का समय',
  'card.savedDest': 'सहेजा गया गंतव्य मौसम',
  'card.flightDelays': 'उड़ान विलंब और चेतावनी',
  'card.packingAdvisor': 'पैकिंग सलाहकार',
  'card.schoolCommute': 'स्कूल आवागमन स्थिति',
  'card.rainAlerts': 'बारिश अलर्ट टाइमलाइन',
  'card.severeWarnings': 'गंभीर मौसम बुलेटिन',
  'card.soilMoisture': 'मिट्टी की नमी',
  'card.rainfallForecast': 'वर्षा पूर्वानुमान',
  'card.frostDanger': 'पाला खतरा सूचकांक',
  'card.plantingGuide': 'रोपण मार्गदर्शन',
  'card.trafficIndex': 'यातायात विलंब सूचकांक',
  'card.visibility': 'सड़क दृश्यता सीमा',
  'card.stormFog': 'तूफान और कोहरा अलर्ट',
  'card.comfortIndex': 'आराम सूचकांक रेटिंग',
  'card.precipitation': 'वर्षा की संभावना',
  'card.outdoorSuitability': 'आउटडोर उपयुक्तता',
  'loading.default': 'लोड हो रहा है...',
  'loading.weather': 'मौसम संदर्भ लोड हो रहा है...',
  'search.noResults': 'कोई स्थान नहीं मिला',
  'footer.profiles': 'मौसम प्रोफ़ाइल',
  'footer.sectors': 'क्षेत्र',
  'footer.weatherScience': 'मौसम विज्ञान',
  'footer.account': 'खाता',
  'footer.savedLocations': 'सहेजे गए स्थान',
  'footer.flightTrackers': 'उड़ान ट्रैकर',
  'footer.devPortal': 'डेवलपर पोर्टल',
  'footer.feedback': 'प्रतिक्रिया और सहायता',
  'footer.disclaimer': 'अस्वीकरण: मौसम पर प्रदान किए गए मौसम पूर्वानुमान, AI सुझाव, वायु गुणवत्ता सूचकांक और समुद्री सुरक्षा अलर्ट केवल सूचना उद्देश्यों के लिए हैं।',
  'footer.copyright': 'सर्वाधिकार सुरक्षित।',
  'footer.privacy': 'गोपनीयता नीति',
  'footer.terms': 'उपयोग की शर्तें',
  'footer.legal': 'कानूनी सूचनाएं',
};

const conditionMap: Record<string, string> = {
  'Sunny': 'धूप',
  'Clear': 'साफ',
  'Partly Cloudy': 'आंशिक बादल',
  'Mostly Cloudy': 'अधिकतर बादल',
  'Cloudy': 'बादल',
  'Overcast': 'बादल छाए',
  'Light Drizzle': 'हल्की बूंदाबांदी',
  'Drizzle': 'बूंदाबांदी',
  'Heavy Drizzle': 'तेज बूंदाबांदी',
  'Light Rain': 'हल्की बारिश',
  'Rain': 'बारिश',
  'Moderate Rain': 'मध्यम बारिश',
  'Heavy Rain': 'तेज बारिश',
  'Passing Showers': 'गुजरती बौछारें',
  'Light Showers': 'हल्की बौछारें',
  'Showers': 'बौछारें',
  'Thunderstorm': 'तूफान',
  'Snow': 'बर्फ़',
  'Fog': 'कोहरा',
  'Mist': 'कोहरा',
  'Haze': 'धुंध',
  'Windy': 'तेज़ हवा',
  'Hot': 'गर्म',
  'Cold': 'ठंड',
  'Humid': 'उमस',
  'Sunny and Warm': 'धूप और गर्म',
  'Clear and Crisp': 'साफ और ताज़ा',
  'Hazy Sunshine': 'धुंधली धूप',
};

const dicts: Record<string, Record<string, string>> = { en, hi };
let currentLang = (localStorage.getItem('mausam_lang') as string) || 'en';

export function t(key: string): string {
  return dicts[currentLang]?.[key] || dicts.en[key] || key;
}

export function getLang(): string {
  return currentLang;
}

export function setLang(lang: string): void {
  currentLang = lang;
  localStorage.setItem('mausam_lang', lang);
  document.documentElement.lang = lang;
}

export function translatePage(): void {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    const translated = t(key);
    if ((el as HTMLInputElement).tagName === 'INPUT') {
      (el as HTMLInputElement).placeholder = translated;
    } else {
      el.textContent = translated;
    }
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    if (key) el.setAttribute('aria-label', t(key));
  });
}

export function translateCondition(condition: string): string {
  if (currentLang === 'en') return condition;
  return conditionMap[condition] || condition;
}
